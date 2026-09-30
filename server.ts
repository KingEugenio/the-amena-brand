import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { initialData } from './src/data/initialData';
import { AppDataPayload, ContactSubmission, AnalyticsEvent, MediaAsset } from './src/types';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5005;
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const MEDIA_FILE = path.join(DATA_DIR, 'media.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

// Helper to safely load JSON
function loadJson<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err);
  }
  return fallback;
}

// Helper to safely write JSON
function saveJson(filePath: string, data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
  }
}

// Initialize database if not exists
let db: AppDataPayload = loadJson<AppDataPayload>(DB_FILE, initialData);
// Enquiries are managed in their own store (ENQUIRIES_FILE); never carry or
// serve them as part of CMS content, so they can't leak via GET /api/content.
db.enquiries = [];
if (!fs.existsSync(DB_FILE)) {
  saveJson(DB_FILE, db);
}

// Initialize Admin Credentials
interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin';
}

function hashPassword(pwd: string): string {
  return crypto.createHash('sha256').update(pwd + '_amena_salt_ghana_2026').digest('hex');
}

let adminUser: AdminUser = loadJson<AdminUser>(ADMIN_FILE, {
  id: 'admin-1',
  email: 'admin@theamenabrand.com',
  passwordHash: hashPassword('AmenaAtelier2026!'),
  name: 'THE AMENA BRAND Administrator',
  role: 'admin'
});
if (!fs.existsSync(ADMIN_FILE)) {
  saveJson(ADMIN_FILE, adminUser);
}

// Active session tokens
const activeSessions = new Map<string, { userId: string; expiresAt: number }>();

function createSession(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  // 7 days expiration
  activeSessions.set(token, {
    userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  });
  return token;
}

function verifySession(req: Request): boolean {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-admin-token'] as string;
  let token = customHeader;
  if (!token && authHeader?.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// Middleware for parsing JSON with generous limit for image uploads
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!verifySession(req)) {
    return res.status(401).json({ error: 'Unauthorized. Admin credentials required.' });
  }
  next();
}

// ----------------------------------------------------
// 1. AUTHENTICATION ROUTES
// ----------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const hashedInput = hashPassword(password);
  if (email.toLowerCase().trim() === adminUser.email.toLowerCase().trim() && hashedInput === adminUser.passwordHash) {
    const token = createSession(adminUser.id);
    return res.json({
      success: true,
      token,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });
  }

  return res.status(401).json({ error: 'Invalid email or password.' });
});

app.post('/api/auth/logout', (req, res) => {
  const customHeader = req.headers['x-admin-token'] as string;
  const authHeader = req.headers.authorization;
  const token = customHeader || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);
  if (token) {
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/me', (req, res) => {
  if (verifySession(req)) {
    return res.json({
      authenticated: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });
  }
  res.status(401).json({ authenticated: false });
});

app.post('/api/auth/update-credentials', requireAdmin, (req, res) => {
  const { email, name, currentPassword, newPassword } = req.body;
  
  if (email) adminUser.email = email.trim();
  if (name) adminUser.name = name.trim();
  
  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required to change password.' });
    }
    if (hashPassword(currentPassword) !== adminUser.passwordHash) {
      return res.status(400).json({ error: 'Current password does not match.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }
    adminUser.passwordHash = hashPassword(newPassword);
  }

  saveJson(ADMIN_FILE, adminUser);
  res.json({ success: true, message: 'Admin profile updated successfully.' });
});

// ----------------------------------------------------
// 2. PUBLIC CONTENT API
// ----------------------------------------------------
app.get('/api/content', (req, res) => {
  const isAuthorized = verifySession(req) || req.query.preview === 'true';

  // If authorized admin or preview mode, return everything including drafts
  if (isAuthorized) {
    return res.json(db);
  }

  // Filter only published items for public visitors
  const publicData: AppDataPayload = {
    ...db,
    products: db.products.filter(p => p.status === 'published'),
    collections: db.collections.filter(c => c.status === 'published'),
    journal: db.journal.filter(j => j.status === 'published'),
    faqs: db.faqs.filter(f => f.status === 'published'),
    services: db.services.filter(s => s.status === 'published')
  };

  res.json(publicData);
});

// ----------------------------------------------------
// 3. ADMIN CONTENT API (CRUD & SITE CONFIGURATION)
// ----------------------------------------------------
app.get('/api/admin/content', requireAdmin, (req, res) => {
  res.json(db);
});

app.put('/api/admin/content', requireAdmin, (req, res) => {
  try {
    const updated = req.body as Partial<AppDataPayload>;
    db = {
      ...db,
      ...updated,
      settings: { ...db.settings, ...(updated.settings || {}) },
      homepage: { ...db.homepage, ...(updated.homepage || {}) },
      about: { ...db.about, ...(updated.about || {}) },
      seo: { ...db.seo, ...(updated.seo || {}) },
      enquiries: [] // enquiries never live in CMS content
    };
    saveJson(DB_FILE, db);
    res.json({ success: true, message: 'Content saved successfully.', data: db });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save content: ' + err.message });
  }
});

// Products CRUD
app.post('/api/admin/products', requireAdmin, (req, res) => {
  const newProduct = req.body;
  if (!newProduct.name) {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = 'prod-' + Date.now();
  const created = {
    id,
    slug,
    shortDescription: '',
    fullDescription: '',
    category: 'Lifestyle',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    images: [],
    currency: db.settings.currency || 'GHS',
    availability: 'Made to Order',
    stockStatus: 'Available upon inquiry',
    featured: false,
    newArrival: true,
    bestseller: false,
    tags: [],
    details: [],
    status: 'draft',
    sortOrder: db.products.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...newProduct
  };

  db.products.unshift(created);
  saveJson(DB_FILE, db);
  res.json({ success: true, product: created });
});

app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  db.products[index] = {
    ...db.products[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveJson(DB_FILE, db);
  res.json({ success: true, product: db.products[index] });
});

app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  db.products = db.products.filter(p => p.id !== id);
  saveJson(DB_FILE, db);
  res.json({ success: true, message: 'Product deleted.' });
});

// Collections CRUD
app.post('/api/admin/collections', requireAdmin, (req, res) => {
  const newCol = req.body;
  const id = 'col-' + Date.now();
  const slug = newCol.slug || newCol.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const collection = {
    id,
    slug,
    title: newCol.title || 'Untitled Collection',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    sortOrder: db.collections.length + 1,
    status: 'draft',
    ...newCol
  };
  db.collections.push(collection);
  saveJson(DB_FILE, db);
  res.json({ success: true, collection });
});

app.put('/api/admin/collections/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = db.collections.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Collection not found.' });
  db.collections[index] = { ...db.collections[index], ...req.body };
  saveJson(DB_FILE, db);
  res.json({ success: true, collection: db.collections[index] });
});

app.delete('/api/admin/collections/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  db.collections = db.collections.filter(c => c.id !== id);
  saveJson(DB_FILE, db);
  res.json({ success: true, message: 'Collection deleted.' });
});

// Journal Posts CRUD
app.post('/api/admin/journal', requireAdmin, (req, res) => {
  const newPost = req.body;
  const id = 'post-' + Date.now();
  const slug = newPost.slug || newPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const post = {
    id,
    slug,
    title: newPost.title || 'Untitled Journal Story',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    author: 'THE AMENA BRAND Atelier',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    category: 'Brand Story',
    excerpt: '',
    bodyContent: '',
    status: 'draft',
    featured: false,
    readingTimeMinutes: 3,
    ...newPost
  };
  db.journal.unshift(post);
  saveJson(DB_FILE, db);
  res.json({ success: true, post });
});

app.put('/api/admin/journal/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = db.journal.findIndex(j => j.id === id);
  if (index === -1) return res.status(404).json({ error: 'Post not found.' });
  db.journal[index] = { ...db.journal[index], ...req.body };
  saveJson(DB_FILE, db);
  res.json({ success: true, post: db.journal[index] });
});

app.delete('/api/admin/journal/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  db.journal = db.journal.filter(j => j.id !== id);
  saveJson(DB_FILE, db);
  res.json({ success: true, message: 'Story deleted.' });
});

// FAQ CRUD
app.post('/api/admin/faqs', requireAdmin, (req, res) => {
  const item = req.body;
  const id = 'faq-' + Date.now();
  const created = {
    id,
    question: item.question || 'New Question',
    answer: item.answer || 'Answer placeholder.',
    category: item.category || 'General',
    sortOrder: db.faqs.length + 1,
    status: 'published',
    ...item
  };
  db.faqs.push(created);
  saveJson(DB_FILE, db);
  res.json({ success: true, faq: created });
});

app.put('/api/admin/faqs/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = db.faqs.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).json({ error: 'FAQ not found.' });
  db.faqs[index] = { ...db.faqs[index], ...req.body };
  saveJson(DB_FILE, db);
  res.json({ success: true, faq: db.faqs[index] });
});

app.delete('/api/admin/faqs/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  db.faqs = db.faqs.filter(f => f.id !== id);
  saveJson(DB_FILE, db);
  res.json({ success: true, message: 'FAQ deleted.' });
});

// ----------------------------------------------------
// 4. CONTACT ENQUIRIES API
// ----------------------------------------------------
let enquiries: ContactSubmission[] = loadJson<ContactSubmission[]>(ENQUIRIES_FILE, [
  {
    id: 'enq-1',
    name: 'Kofi Mensah',
    email: 'kmensah@example.com',
    phone: '0244123456',
    whatsapp: '0244123456',
    subject: 'Bespoke Eveningwear Commission',
    message: 'Hello Amena Atelier, I am interested in custom fittings for an upcoming gala in Accra. Kindly share availability for consultation.',
    date: '2026-09-12T14:30:00Z',
    status: 'NEW',
    notes: 'Followed up via WhatsApp consultation.'
  }
]);
if (!fs.existsSync(ENQUIRIES_FILE)) {
  saveJson(ENQUIRIES_FILE, enquiries);
}

// Public Submission
app.post('/api/enquiries', (req, res) => {
  const { name, email, phone, whatsapp, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const newEnquiry: ContactSubmission = {
    id: 'enq-' + Date.now(),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : undefined,
    whatsapp: whatsapp ? whatsapp.trim() : undefined,
    subject: subject ? subject.trim() : 'General Brand Inquiry',
    message: message.trim(),
    date: new Date().toISOString(),
    status: 'NEW'
  };

  enquiries.unshift(newEnquiry);
  saveJson(ENQUIRIES_FILE, enquiries);

  // Track analytics event
  trackEvent('contact_submit', '/contact', subject);

  res.json({
    success: true,
    message: 'Thank you for contacting THE AMENA BRAND. Our atelier will respond promptly.',
    enquiryId: newEnquiry.id
  });
});

// Admin Enquiries Management
app.get('/api/admin/enquiries', requireAdmin, (req, res) => {
  res.json(enquiries);
});

app.patch('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const index = enquiries.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Enquiry not found.' });

  if (status) enquiries[index].status = status;
  if (notes !== undefined) enquiries[index].notes = notes;

  saveJson(ENQUIRIES_FILE, enquiries);
  res.json({ success: true, enquiry: enquiries[index] });
});

app.delete('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  enquiries = enquiries.filter(e => e.id !== id);
  saveJson(ENQUIRIES_FILE, enquiries);
  res.json({ success: true, message: 'Enquiry deleted.' });
});

// ----------------------------------------------------
// 5. MEDIA ASSETS LIBRARY API
// ----------------------------------------------------
let mediaAssets: MediaAsset[] = loadJson<MediaAsset[]>(MEDIA_FILE, [
  {
    id: 'med-1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85',
    title: 'Hero Editorial Portrait',
    altText: 'Editorial portrait featuring contemporary Ghanaian creative lifestyle piece',
    caption: 'Inaugural campaign look 01',
    mimeType: 'image/jpeg',
    sizeBytes: 420000,
    uploadedAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'med-2',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
    title: 'Signature Kimono Look',
    altText: 'Model wearing signature oversized Amena kimono robe in natural warm light',
    caption: 'Studio drapery study',
    mimeType: 'image/jpeg',
    sizeBytes: 380000,
    uploadedAt: '2026-08-05T10:00:00Z'
  },
  {
    id: 'med-3',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    title: 'Collection 02 Linen Texture',
    altText: 'Linen and warm earth tones lifestyle collection cover',
    caption: 'Natural fiber study',
    mimeType: 'image/jpeg',
    sizeBytes: 310000,
    uploadedAt: '2026-08-10T10:00:00Z'
  }
]);
if (!fs.existsSync(MEDIA_FILE)) {
  saveJson(MEDIA_FILE, mediaAssets);
}

app.get('/api/admin/media', requireAdmin, (req, res) => {
  res.json(mediaAssets);
});

app.post('/api/admin/media', requireAdmin, (req, res) => {
  const { url, title, altText, caption } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Image URL or data is required.' });
  }

  const asset: MediaAsset = {
    id: 'med-' + Date.now(),
    url,
    title: title || 'Brand Image',
    altText: altText || 'THE AMENA BRAND editorial image',
    caption: caption || '',
    mimeType: url.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
    sizeBytes: Math.round(url.length * 0.75),
    uploadedAt: new Date().toISOString()
  };

  mediaAssets.unshift(asset);
  saveJson(MEDIA_FILE, mediaAssets);
  res.json({ success: true, asset });
});

app.delete('/api/admin/media/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  mediaAssets = mediaAssets.filter(m => m.id !== id);
  saveJson(MEDIA_FILE, mediaAssets);
  res.json({ success: true, message: 'Media asset deleted.' });
});

// ----------------------------------------------------
// 6. ANALYTICS & TELEMETRY API
// ----------------------------------------------------
let analyticsLog: AnalyticsEvent[] = loadJson<AnalyticsEvent[]>(ANALYTICS_FILE, []);

function trackEvent(eventType: AnalyticsEvent['eventType'], pathStr: string, target?: string) {
  const event: AnalyticsEvent = {
    id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    eventType,
    path: pathStr,
    target,
    timestamp: new Date().toISOString()
  };
  analyticsLog.push(event);
  if (analyticsLog.length > 2000) {
    analyticsLog = analyticsLog.slice(-1500); // cap size
  }
  saveJson(ANALYTICS_FILE, analyticsLog);
}

app.post('/api/analytics/track', (req, res) => {
  const { eventType, path: eventPath, target } = req.body;
  if (eventType && eventPath) {
    trackEvent(eventType, eventPath, target);
  }
  res.json({ success: true });
});

app.get('/api/admin/analytics', requireAdmin, (req, res) => {
  const pageViews = analyticsLog.filter(e => e.eventType === 'page_view').length;
  const whatsappClicks = analyticsLog.filter(e => e.eventType === 'whatsapp_click').length;
  const ctaClicks = analyticsLog.filter(e => e.eventType === 'cta_click').length;
  const contactSubmits = enquiries.length;

  // Group by path
  const viewsByPath: Record<string, number> = {};
  analyticsLog.filter(e => e.eventType === 'page_view').forEach(e => {
    viewsByPath[e.path] = (viewsByPath[e.path] || 0) + 1;
  });

  res.json({
    summary: {
      pageViews,
      whatsappClicks,
      ctaClicks,
      contactSubmits,
      publishedProductsCount: db.products.filter(p => p.status === 'published').length,
      draftProductsCount: db.products.filter(p => p.status === 'draft').length,
      journalPostsCount: db.journal.length,
      newEnquiriesCount: enquiries.filter(e => e.status === 'NEW').length
    },
    popularPaths: Object.entries(viewsByPath)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    recentEvents: analyticsLog.slice(-30).reverse()
  });
});

// ----------------------------------------------------
// 7. SEO: SITEMAP & ROBOTS.TXT
// ----------------------------------------------------
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = (process.env.APP_URL || 'https://theamenabrand.com').replace(/\/$/, '');
  
  const pages = [
    '',
    '/shop',
    '/about',
    '/journal',
    '/faq',
    '/contact',
    '/privacy',
    '/terms'
  ];

  if (db.settings.showServicesPage) {
    pages.push('/services');
  }

  const productUrls = db.products
    .filter(p => p.status === 'published')
    .map(p => `/shop/${p.slug}`);

  const journalUrls = db.journal
    .filter(j => j.status === 'published')
    .map(j => `/journal/${j.slug}`);

  const allUrls = [...pages, ...productUrls, ...journalUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/shop') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (req, res) => {
  const baseUrl = (process.env.APP_URL || 'https://theamenabrand.com').replace(/\/$/, '');
  const isIndexed = db.seo.robotsIndexingEnabled !== false;
  
  const robots = isIndexed
    ? `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`
    : `User-agent: *
Disallow: /`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// ----------------------------------------------------
// 8. VITE INTEGRATION & SERVER LAUNCH
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`THE AMENA BRAND server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
