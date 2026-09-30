import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalPost } from '../../types';
import { Button } from '../../components/common/Buttons';
import { IconPlus, IconEdit, IconTrash, IconClose } from '../../components/icons/Icons';

export const AdminJournal: React.FC = () => {
  const { data, createJournalPost, updateJournalPost, deleteJournalPost, showToast } = useApp();
  const { journal } = data;

  const [editingPost, setEditingPost] = useState<Partial<JournalPost> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingPost({
      id: `j-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Design Notes',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: 'THE AMENA BRAND ATELIER',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
      readingTimeMinutes: 4,
      published: true,
      featured: false
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.content || !editingPost?.coverImage) {
      showToast('Title, content, and cover image are required.', 'error');
      return;
    }

    const slug =
      editingPost.slug ||
      editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      ...editingPost,
      slug,
      updatedAt: new Date().toISOString()
    } as JournalPost;

    if (isNew) {
      payload.createdAt = new Date().toISOString();
      await createJournalPost(payload);
    } else {
      await updateJournalPost(payload);
    }

    setEditingPost(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete journal dispatch "${title}"?`)) {
      await deleteJournalPost(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            EDITORIAL DISPATCHES
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Manage Journal & Stories
          </h1>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<IconPlus size={14} />}
          className="bg-[#FAF9F5] text-[#121110]"
        >
          New Article
        </Button>
      </div>

      <div className="bg-[#1C1A18] border border-[#2C2926] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D4CEBF]">
          <thead className="bg-[#121110] border-b border-[#2C2926] uppercase tracking-wider text-[10px] text-[#A69F91]">
            <tr>
              <th className="p-3.5">Article</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2926]">
            {journal.map((post) => (
              <tr key={post.id} className="hover:bg-[#22201D] transition-colors">
                <td className="p-3.5 flex items-center gap-3">
                  <img src={post.coverImage} alt={post.title} className="w-12 h-10 object-cover border border-[#2C2926]" />
                  <div>
                    <span className="font-serif-heading text-sm text-[#FAF9F5] block">{post.title}</span>
                    <span className="text-[10px] text-[#A69F91] font-mono">/{post.slug}</span>
                  </div>
                </td>
                <td className="p-3.5 uppercase">{post.category}</td>
                <td className="p-3.5">{post.date}</td>
                <td className="p-3.5">
                  <span className={`text-[9px] uppercase px-2 py-0.5 border ${post.published ? 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30' : 'bg-[#6E685E]/20 text-[#A69F91]'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingPost(post);
                    }}
                    className="p-1.5 text-[#D4CEBF] hover:text-white"
                  >
                    <IconEdit size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-1.5 text-[#B93838] hover:text-red-400"
                  >
                    <IconTrash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 max-w-2xl w-full my-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2C2926] pb-3">
              <h3 className="font-serif-heading text-lg text-[#FAF9F5]">
                {isNew ? 'Create New Journal Dispatch' : `Edit: ${editingPost.title}`}
              </h3>
              <button onClick={() => setEditingPost(null)} className="text-[#A69F91] hover:text-white">
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingPost.category || 'Design Notes'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingPost.coverImage || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Story Content *</label>
                <textarea
                  rows={8}
                  required
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D4CEBF]">
                  <input
                    type="checkbox"
                    checked={editingPost.published || false}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                    className="accent-[#FAF9F5]"
                  />
                  <span>Published (Visible to public)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D4CEBF]">
                  <input
                    type="checkbox"
                    checked={editingPost.featured || false}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="accent-[#FAF9F5]"
                  />
                  <span>Feature as Lead Dispatch</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#2C2926] flex justify-end gap-3">
                <button type="button" onClick={() => setEditingPost(null)} className="px-4 py-2 text-xs uppercase text-[#A69F91]">
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm" className="bg-[#FAF9F5] text-[#121110]">
                  Save Dispatch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
