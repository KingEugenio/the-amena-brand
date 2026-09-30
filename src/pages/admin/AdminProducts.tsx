import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Button } from '../../components/common/Buttons';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconCheck,
  IconClose,
  IconSearch,
  IconEye
} from '../../components/icons/Icons';

export const AdminProducts: React.FC = () => {
  const { data, createProduct, updateProduct, deleteProduct, showToast } = useApp();
  const { products, collections } = data;

  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = products.filter((p) => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenCreate = () => {
    setIsNew(true);
    setEditingProduct({
      id: `p-${Date.now()}`,
      name: '',
      slug: '',
      category: 'Outerwear',
      collectionId: collections[0]?.id || '',
      price: 2500,
      currency: 'GHS',
      availability: 'Made to Order',
      shortDescription: '',
      fullDescription: '',
      mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
      ],
      tags: ['Accra', 'Atelier'],
      sizeOptions: ['S', 'M', 'L', 'Bespoke Fit'],
      details: ['Handcrafted in Accra', '100% Linen Blend', 'Dry Clean Only'],
      featured: false,
      newArrival: true,
      stockStatus: 'Made to order (7–14 days tailoring)'
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.mainImage) {
      showToast('Product name and primary image are required.', 'error');
      return;
    }

    const slug =
      editingProduct.slug ||
      editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productPayload = {
      ...editingProduct,
      slug,
      updatedAt: new Date().toISOString()
    } as Product;

    if (isNew) {
      productPayload.createdAt = new Date().toISOString();
      await createProduct(productPayload);
    } else {
      await updateProduct(productPayload);
    }

    setEditingProduct(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the atelier catalog?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            GARMENT INVENTORY
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Manage Products & Pieces
          </h1>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<IconPlus size={14} />}
          className="bg-[#FAF9F5] text-[#121110] hover:bg-[#E5E1D8]"
        >
          Add New Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#1C1A18] p-4 border border-[#2C2926]">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search piece name or category..."
            className="w-full bg-[#121110] border border-[#3E3B36] text-xs py-2 pl-8 pr-3 text-[#FAF9F5] placeholder-[#6E685E] focus:outline-none focus:border-[#FAF9F5]"
          />
          <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A69F91]" />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-[#121110] border border-[#3E3B36] text-xs py-2 px-3 text-[#FAF9F5] uppercase tracking-wider focus:outline-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="Outerwear">Outerwear</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Dresses">Dresses</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
      </div>

      {/* Products Table / List */}
      <div className="bg-[#1C1A18] border border-[#2C2926] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#D4CEBF]">
          <thead className="bg-[#121110] border-b border-[#2C2926] uppercase tracking-wider text-[10px] text-[#A69F91]">
            <tr>
              <th className="p-3.5">Piece</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Featured</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2926]">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-[#22201D] transition-colors">
                <td className="p-3.5 flex items-center gap-3">
                  <img
                    src={prod.mainImage}
                    alt={prod.name}
                    className="w-10 h-12 object-cover border border-[#2C2926]"
                  />
                  <div>
                    <span className="font-serif-heading text-sm text-[#FAF9F5] block">
                      {prod.name}
                    </span>
                    <span className="text-[10px] text-[#A69F91] font-mono">/{prod.slug}</span>
                  </div>
                </td>
                <td className="p-3.5 uppercase">{prod.category}</td>
                <td className="p-3.5 font-mono">
                  {prod.price ? `${prod.currency} ${prod.price.toLocaleString()}` : 'Inquiry'}
                </td>
                <td className="p-3.5">
                  <span
                    className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border ${
                      prod.availability === 'In Stock'
                        ? 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30'
                        : 'bg-[#9A5B32]/10 text-[#D4CEBF] border-[#9A5B32]/30'
                    }`}
                  >
                    {prod.availability}
                  </span>
                </td>
                <td className="p-3.5">
                  <button
                    onClick={() => updateProduct({ ...prod, featured: !prod.featured })}
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 cursor-pointer ${
                      prod.featured
                        ? 'bg-[#FAF9F5] text-black font-semibold'
                        : 'text-[#6E685E] hover:text-white'
                    }`}
                  >
                    {prod.featured ? 'Featured' : 'Standard'}
                  </button>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingProduct(prod);
                    }}
                    className="p-1.5 text-[#D4CEBF] hover:text-white cursor-pointer"
                    title="Edit Piece"
                  >
                    <IconEdit size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-1.5 text-[#B93838] hover:text-red-400 cursor-pointer"
                    title="Delete Piece"
                  >
                    <IconTrash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-xs text-[#A69F91]">
            No garments matching your search.
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2C2926] pb-4">
              <h3 className="font-serif-heading text-xl text-[#FAF9F5]">
                {isNew ? 'Create New Atelier Garment' : `Edit: ${editingProduct.name}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-[#A69F91] hover:text-white cursor-pointer"
              >
                <IconClose size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="Auto-generated from name if left empty"
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                    Category
                  </label>
                  <select
                    value={editingProduct.category || 'Outerwear'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                    Price (GHS)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                    Availability
                  </label>
                  <select
                    value={editingProduct.availability || 'Made to Order'}
                    onChange={(e: any) => setEditingProduct({ ...editingProduct, availability: e.target.value })}
                    className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                  >
                    <option value="Made to Order">Made to Order</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Pre-order">Pre-order</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Collection Association
                </label>
                <select
                  value={editingProduct.collectionId || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, collectionId: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                >
                  <option value="">None / Standalone Release</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Primary Editorial Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editingProduct.mainImage || ''}
                  onChange={(e) => {
                    const url = e.target.value;
                    const existingImgs = editingProduct.images || [];
                    setEditingProduct({
                      ...editingProduct,
                      mainImage: url,
                      images: existingImgs.length > 0 ? [url, ...existingImgs.slice(1)] : [url]
                    });
                  }}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Secondary Gallery Image URLs (one per line)
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.images ? editingProduct.images.slice(1).join('\n') : ''}
                  onChange={(e) => {
                    const secondary = e.target.value.split('\n').filter((x) => x.trim().length > 0);
                    setEditingProduct({
                      ...editingProduct,
                      images: [editingProduct.mainImage || '', ...secondary]
                    });
                  }}
                  placeholder="Paste additional image URLs, one per line..."
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Short Editorial Description
                </label>
                <input
                  type="text"
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Full Description / Textile Composition
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.fullDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Sizing Options (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProduct.sizeOptions ? editingProduct.sizeOptions.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sizeOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="S, M, L, XL, Bespoke Fit"
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                  Atelier Specifications Checklist (one per line)
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.details ? editingProduct.details.join('\n') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      details: e.target.value.split('\n').filter((x) => x.trim().length > 0)
                    })
                  }
                  placeholder="Handcrafted in Accra&#10;100% Cotton & Linen blend&#10;Dry clean recommended"
                  className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D4CEBF]">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="accent-[#FAF9F5]"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#D4CEBF]">
                  <input
                    type="checkbox"
                    checked={editingProduct.newArrival || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, newArrival: e.target.checked })}
                    className="accent-[#FAF9F5]"
                  />
                  <span>Mark as New Atelier Release</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#2C2926] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs uppercase text-[#A69F91] hover:text-white"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#FAF9F5] text-[#121110]"
                >
                  Save Piece Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
