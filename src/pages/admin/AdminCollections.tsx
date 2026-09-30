import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Collection } from '../../types';
import { Button } from '../../components/common/Buttons';
import { IconPlus, IconEdit, IconTrash, IconClose } from '../../components/icons/Icons';

export const AdminCollections: React.FC = () => {
  const { data, createCollection, updateCollection, deleteCollection, showToast } = useApp();
  const { collections } = data;

  const [editingCollection, setEditingCollection] = useState<Partial<Collection> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingCollection({
      id: `col-${Date.now()}`,
      title: '',
      slug: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      featured: true,
      order: collections.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollection?.title || !editingCollection?.coverImage) {
      showToast('Collection title and cover image are required.', 'error');
      return;
    }

    const slug =
      editingCollection.slug ||
      editingCollection.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      ...editingCollection,
      slug,
      updatedAt: new Date().toISOString()
    } as Collection;

    if (isNew) {
      payload.createdAt = new Date().toISOString();
      await createCollection(payload);
    } else {
      await updateCollection(payload);
    }

    setEditingCollection(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Remove collection "${title}"? Associated products will remain in the catalog.`)) {
      await deleteCollection(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            LOOKBOOKS & SEASONS
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Manage Collections
          </h1>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<IconPlus size={14} />}
          className="bg-[#FAF9F5] text-[#121110]"
        >
          New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-[#1C1A18] border border-[#2C2926] overflow-hidden flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#121110]">
                <img src={col.coverImage} alt={col.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-[#9A5B32] font-mono uppercase">/{col.slug}</span>
                <h3 className="font-serif-heading text-lg text-[#FAF9F5]">{col.title}</h3>
                <p className="text-xs text-[#A69F91] line-clamp-2">{col.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-[#2C2926] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#6E685E]">
                {col.featured ? 'Featured on Home' : 'Standard'}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingCollection(col);
                  }}
                  className="p-1.5 text-[#D4CEBF] hover:text-white"
                >
                  <IconEdit size={15} />
                </button>
                <button
                  onClick={() => handleDelete(col.id, col.title)}
                  className="p-1.5 text-[#B93838] hover:text-red-400"
                >
                  <IconTrash size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingCollection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2C2926] pb-3">
              <h3 className="font-serif-heading text-lg text-[#FAF9F5]">
                {isNew ? 'Create New Collection' : `Edit: ${editingCollection.title}`}
              </h3>
              <button onClick={() => setEditingCollection(null)} className="text-[#A69F91] hover:text-white">
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingCollection.title || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, title: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Slug</label>
                <input
                  type="text"
                  value={editingCollection.slug || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, slug: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingCollection.coverImage || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, coverImage: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCollection.description || ''}
                  onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCollection(null)}
                  className="px-4 py-2 text-xs uppercase text-[#A69F91]"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm" className="bg-[#FAF9F5] text-[#121110]">
                  Save Collection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
