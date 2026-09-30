import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminCollections } from './AdminCollections';
import { AdminJournal } from './AdminJournal';
import { AdminFaqs } from './AdminFaqs';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminContentSettings } from './AdminContentSettings';
import { AdminBrandSettings } from './AdminBrandSettings';

export const AdminPortal: React.FC = () => {
  const { adminToken } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  if (!adminToken) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {currentTab === 'dashboard' && <AdminDashboard onNavigateTab={setCurrentTab} />}
      {currentTab === 'products' && <AdminProducts />}
      {currentTab === 'collections' && <AdminCollections />}
      {currentTab === 'journal' && <AdminJournal />}
      {currentTab === 'faqs' && <AdminFaqs />}
      {currentTab === 'enquiries' && <AdminEnquiries />}
      {currentTab === 'homepage' && <AdminContentSettings section="homepage" />}
      {currentTab === 'about' && <AdminContentSettings section="about" />}
      {currentTab === 'settings' && <AdminBrandSettings />}
    </AdminLayout>
  );
};
