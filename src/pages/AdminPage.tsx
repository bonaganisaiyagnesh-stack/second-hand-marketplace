import React, { useState, useEffect } from 'react';
import {
  Shield,
  Layers,
  Users,
  Package,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  X,
  AlertTriangle,
} from 'lucide-react';
import { Product, Category, User, UserRole } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ConditionBadge } from '../components/ConditionBadge';
import { ListingModal } from '../components/ListingModal';
import { formatINR } from '../utils/currency';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState<'listings' | 'categories' | 'users'>('listings');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Listing Edit Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [listingModalOpen, setListingModalOpen] = useState(false);

  // Category Add/Edit Modal
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catIcon, setCatIcon] = useState('box');
  const [catDesc, setCatDesc] = useState('');

  const loadAll = async () => {
    setLoading(true);
    try {
      const [p, c, u] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getUsers(),
      ]);
      setProducts(p);
      setCategories(c);
      setUsers(u);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Category Handlers
  const handleOpenCatModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCatName(cat.name);
      setCatSlug(cat.slug);
      setCatIcon(cat.icon);
      setCatDesc(cat.description || '');
    } else {
      setEditingCategory(null);
      setCatName('');
      setCatSlug('');
      setCatIcon('box');
      setCatDesc('');
    }
    setCatModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    try {
      const slug = catSlug.trim() || catName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, {
          name: catName,
          slug,
          icon: catIcon,
          description: catDesc,
        });
        success('Category Updated', `Updated "${catName}"`);
      } else {
        await api.createCategory({
          name: catName,
          slug,
          icon: catIcon,
          description: catDesc,
        });
        success('Category Created', `Added "${catName}" to taxonomy`);
      }
      setCatModalOpen(false);
      loadAll();
    } catch (err: any) {
      error('Failed to save category', err.message);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      await api.deleteCategory(id);
      success('Category Removed', `Deleted "${name}"`);
      loadAll();
    } catch (err: any) {
      error('Deletion failed', err.message);
    }
  };

  // Product Handlers
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Delete product "${title}" from the catalog?`)) return;
    try {
      await api.deleteProduct(id);
      success('Product Deleted', `Removed "${title}"`);
      loadAll();
    } catch (err: any) {
      error('Deletion failed', err.message);
    }
  };

  // User Handlers
  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    try {
      await api.updateUser(userId, { role: newRole });
      success('Role Updated', `User role modified to ${newRole.toUpperCase()}`);
      loadAll();
    } catch (err: any) {
      error('Role update failed', err.message);
    }
  };

  const handleToggleKYC = async (userId: string, current: boolean) => {
    try {
      await api.updateUser(userId, { kycVerified: !current });
      success('KYC Status Toggled', !current ? 'User identity verified' : 'Verification revoked');
      loadAll();
    } catch (err: any) {
      error('KYC toggle failed', err.message);
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Delete account for ${name}?`)) return;
    try {
      await api.deleteUser(userId);
      success('User Removed', `Account deleted`);
      loadAll();
    } catch (err: any) {
      error('Delete failed', err.message);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Maison Overseer Command
          </span>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Central Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Global catalog moderation, category taxonomy, and collector KYC credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset entire system database to initial demo state?')) {
                api.resetDemoData();
              }
            }}
            className="px-4 py-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 font-sora text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 mb-6 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('listings')}
          className={`flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'listings'
              ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Listings ({products.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: LISTINGS */}
      {activeTab === 'listings' && (
        <div className="p-6 rounded-3xl glass-panel">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-4">
            <div>
              <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white">
                Catalog Management
              </h3>
              <p className="text-xs text-slate-500">Inspect, edit or purge marketplace inventory.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setListingModalOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-violet-600 text-white font-sora text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Listing</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-white/10 font-sora text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-3 px-3">Item</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Score</th>
                  <th className="py-3 px-3">Seller</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                      {p.title}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{p.category}</td>
                    <td className="py-3 px-3">
                      <ConditionBadge condition={p.condition} score={p.conditionScore} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-sora font-bold tabular-nums">
                      {formatINR(p.price)}
                    </td>
                    <td className="py-3 px-3 font-mono-telemetry font-bold text-cyan-600 dark:text-cyan-400">
                      {p.dealScore}
                    </td>
                    <td className="py-3 px-3 text-slate-500">{p.sellerName || p.sellerId}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 font-sora text-[10px] uppercase font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(p);
                            setListingModalOpen(true);
                          }}
                          className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-violet-600 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id, p.title)}
                          className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="p-6 rounded-3xl glass-panel">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-4">
            <div>
              <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white">
                Category Taxonomy (8 Domains)
              </h3>
              <p className="text-xs text-slate-500">Configure marketplace sectors and icons.</p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCatModal()}
              className="px-4 py-2 rounded-full bg-cyan-600 text-white font-sora text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/25 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sora font-bold text-slate-900 dark:text-white text-sm">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono-telemetry text-slate-400">
                      {cat.slug}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {cat.description || 'Verified product category'}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => handleOpenCatModal(cat)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-violet-600 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: USERS */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl glass-panel">
          <div className="pb-4 border-b border-slate-200/60 dark:border-white/10 mb-4">
            <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white">
              Collector & Driver Registry
            </h3>
            <p className="text-xs text-slate-500">Manage KYC validation, user roles and ratings.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-white/10 font-sora text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-3 px-3">Collector</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">City</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3">KYC Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-sora font-semibold text-slate-900 dark:text-white">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono-telemetry text-slate-500">{u.email}</td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{u.city}</td>
                    <td className="py-3 px-3">
                      <select
                        value={u.role}
                        onChange={(e: any) => handleChangeRole(u.id, e.target.value)}
                        className="px-2 py-1 rounded-full bg-slate-100 dark:bg-white/10 font-sora text-[10px] font-bold uppercase cursor-pointer"
                      >
                        <option value="admin" className="dark:bg-[#1a1530]">ADMIN</option>
                        <option value="seller" className="dark:bg-[#1a1530]">SELLER</option>
                        <option value="buyer" className="dark:bg-[#1a1530]">BUYER</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 font-sora font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                      ★ {u.rating}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => handleToggleKYC(u.id, !!u.kycVerified)}
                        className={`px-2.5 py-0.5 rounded-full font-sora text-[10px] font-bold uppercase cursor-pointer ${
                          u.kycVerified
                            ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {u.kycVerified ? 'VERIFIED' : 'PENDING'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 inline-flex items-center justify-center cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Listing Modal */}
      <ListingModal
        isOpen={listingModalOpen}
        onClose={() => setListingModalOpen(false)}
        onSaved={loadAll}
        initialProduct={editingProduct}
      />

      {/* Category Modal */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
              <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setCatModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="mt-4 space-y-4">
              <div>
                <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Vintage Horology"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  placeholder="vintage-horology"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Short taxonomy summary..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-sora font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-violet-600 text-white font-sora text-xs font-bold uppercase shadow-md shadow-violet-500/25 hover:bg-violet-700 cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
