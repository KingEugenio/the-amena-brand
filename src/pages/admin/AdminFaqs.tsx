import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FaqItem } from '../../types';
import { Button } from '../../components/common/Buttons';
import { IconPlus, IconEdit, IconTrash, IconClose } from '../../components/icons/Icons';

export const AdminFaqs: React.FC = () => {
  const { data, createFaq, updateFaq, deleteFaq, showToast } = useApp();
  const { faqs } = data;

  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingFaq({
      id: `faq-${Date.now()}`,
      category: 'Ordering',
      question: '',
      answer: '',
      order: faqs.length + 1
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      showToast('Question and answer are required.', 'error');
      return;
    }

    const payload = {
      ...editingFaq
    } as FaqItem;

    if (isNew) {
      await createFaq(payload);
    } else {
      await updateFaq(payload);
    }

    setEditingFaq(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      await deleteFaq(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            CLIENT ASSISTANCE KNOWLEDGE
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Manage Client FAQ
          </h1>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<IconPlus size={14} />}
          className="bg-[#FAF9F5] text-[#121110]"
        >
          New Question
        </Button>
      </div>

      <div className="bg-[#1C1A18] border border-[#2C2926] divide-y divide-[#2C2926]">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-4 flex items-start justify-between gap-4 hover:bg-[#22201D] transition-colors">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#9A5B32] font-mono">
                {faq.category}
              </span>
              <h4 className="font-serif-heading text-base text-[#FAF9F5]">{faq.question}</h4>
              <p className="text-xs text-[#A69F91] leading-relaxed line-clamp-2">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 pt-1">
              <button
                onClick={() => {
                  setIsNew(false);
                  setEditingFaq(faq);
                }}
                className="p-1.5 text-[#D4CEBF] hover:text-white"
              >
                <IconEdit size={15} />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 text-[#B93838] hover:text-red-400"
              >
                <IconTrash size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2C2926] pb-3">
              <h3 className="font-serif-heading text-lg text-[#FAF9F5]">
                {isNew ? 'Create New FAQ' : 'Edit FAQ'}
              </h3>
              <button onClick={() => setEditingFaq(null)} className="text-[#A69F91] hover:text-white">
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingFaq.category || 'Ordering'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  placeholder="e.g. Ordering, Sizing, Delivery"
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingFaq(null)} className="px-4 py-2 text-xs uppercase text-[#A69F91]">
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="sm" className="bg-[#FAF9F5] text-[#121110]">
                  Save Question
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
