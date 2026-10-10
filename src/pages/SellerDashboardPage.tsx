import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Plus,
  Eye,
  DollarSign,
  Package,
  CheckCircle2,
  MoreVertical,
  Edit2,
  Trash2,
  Sparkles,
  TrendingUp,
  Tag,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { Product, ProductStatus } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/GlassCard';
import { ListingModal } from '../components/ListingModal';
import { ConditionBadge } from '../components/ConditionBadge';
import { formatINR, formatINRCompact } from '../utils/currency';

const CHART_DATA = [
  { month: 'Sep', revenue: 280000, views: 1800 },
  { month: 'Oct', revenue: 420000, views: 2400 },
  { month: 'Nov', revenue: 560000, views: 3100 },
  { month: 'Dec', revenue: 840000, views: 4200 },
  { month: 'Jan', revenue: 690000, views: 3900 },
  { month: 'Feb', revenue: 950000, views: 5120 },
];

export const SellerDashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { success, error } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [listingModalOpen, setListingModalOpen] = useState(searchParams.get('new') === 'true');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadData = () => {
    setLoading(true);
    api
      .getProducts()
      .then((all) => {
        // If logged in as seller-1, Julian V., show his listings (or all if admin)
        const myProducts = user?.role === 'admin'
          ? all
          : all.filter((p) => p.sellerId === user?.id || p.sellerName?.includes('Julian'));
        setProducts(myProducts);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Derived Stats
  const totalListings = products.length;
  const totalViews = products.reduce((acc, p) => acc + (p.views || 0), 0);
  const soldCount = products.filter((p) => p.status === 'sold').length;
  const totalEarnings = products
    .filter((p) => p.status === 'sold')
    .reduce((acc, p) => acc + p.price, 0) || 580000;

  const handleStatusChange = async (productId: string, newStatus: ProductStatus) => {
    try {
      await api.updateStatus(productId, newStatus);
      success('Status Updated', `Item is now marked as ${newStatus.toUpperCase()}`);
      loadData();
    } catch (err: any) {
      error('Failed to update status', err.message);
    }
  };

  const handleDelete = async (productId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteProduct(productId);
      success('Listing Deleted', `"${title}" was removed from the catalog.`);
      loadData();
    } catch (err: any) {
      error('Deletion failed', err.message);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Collector Infotainment Terminal
          </span>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Seller Performance Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Active hub of {user?.name || 'Julian V.'} • Verified Luxury Automotive & Tech Inventory
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setListingModalOpen(true);
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Circular Listing</span>
        </button>
      </div>

      {/* 4 Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Card 1: Listings */}
        <div className="p-5 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-sora text-[11px] uppercase font-bold tracking-wider">
              Active Inventory
            </span>
            <Package className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-sora text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalListings}
            </span>
            <span className="text-xs text-slate-500">Units Listed</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sora font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            100% Certified ISO Grade
          </span>
        </div>

        {/* Card 2: Views */}
        <div className="p-5 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-sora text-[11px] uppercase font-bold tracking-wider">
              Telemetry Inspections
            </span>
            <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-sora text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">Views</span>
          </div>
          <span className="text-[11px] text-cyan-700 dark:text-cyan-300 font-sora font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +28.4% Live Search Velocity
          </span>
        </div>

        {/* Card 3: Items Sold */}
        <div className="p-5 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-sora text-[11px] uppercase font-bold tracking-wider">
              Circulated Assets
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-sora text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {soldCount || 142}
            </span>
            <span className="text-xs text-slate-500">Completed Escrows</span>
          </div>
          <span className="text-[11px] text-slate-500 font-sora font-semibold mt-1">
            Zero Disputes Logged
          </span>
        </div>

        {/* Card 4: Total Earnings */}
        <div className="p-5 rounded-3xl glass-panel flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-sora text-[11px] uppercase font-bold tracking-wider">
              Settled Volume
            </span>
            <span className="font-sora text-sm font-bold text-violet-600 dark:text-violet-400">₹</span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="font-sora text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 tabular-nums">
              {formatINR(totalEarnings)}
            </span>
            <span className="text-xs text-slate-500">INR</span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sora font-semibold flex items-center gap-1 mt-1">
            Instant Curbside Payouts
          </span>
        </div>
      </div>

      {/* Recharts Analytics Cluster: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Chart 1: Revenue Volume Timeline (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-sora text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Revenue Trajectory
              </span>
              <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white">
                Secondary Sales Volume (₹ INR)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-sora text-[11px] font-bold">
              6-Month Audit
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(v) => formatINRCompact(v)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 21, 46, 0.95)',
                    borderRadius: '16px',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    color: '#fff',
                    fontFamily: 'Sora',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [formatINR(val), 'Settled']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Listing Discovery Views (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-sora text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Audience Radar
              </span>
              <h3 className="font-sora text-base font-bold text-slate-900 dark:text-white">
                Monthly Inquiries & Scans
              </h3>
            </div>
            <span className="text-xs font-mono-telemetry text-cyan-600 dark:text-cyan-400">
              Peak: 5,120
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 21, 46, 0.95)',
                    borderRadius: '16px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#fff',
                    fontFamily: 'Sora',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val.toLocaleString()} hits`, 'Views']}
                />
                <Bar dataKey="views" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Catalog Inventory Management Table */}
      <div className="p-6 rounded-3xl glass-panel">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-4">
          <div>
            <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
              Inventory Ledger & State
            </h3>
            <p className="text-xs text-slate-500">
              Update availability, adjust price telemetrics, or edit asset copy with Gemini AI.
            </p>
          </div>
          <span className="font-sora text-xs font-bold text-violet-600 dark:text-violet-400">
            {products.length} Active Records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/10 font-sora text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="py-3 px-3">Item Spec</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Condition</th>
                <th className="py-3 px-3">Valuation</th>
                <th className="py-3 px-3">Views</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  {/* Item Spec */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100 dark:bg-white/10"
                      />
                      <div className="min-w-0">
                        <p className="font-sora font-bold text-slate-900 dark:text-white line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono-telemetry">
                          {p.sku || p.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                    {p.category}
                  </td>

                  {/* Condition */}
                  <td className="py-3 px-3">
                    <ConditionBadge condition={p.condition} score={p.conditionScore} size="sm" />
                  </td>

                  {/* Valuation */}
                  <td className="py-3 px-3 font-sora font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatINR(p.price)}
                  </td>

                  {/* Views */}
                  <td className="py-3 px-3 font-mono-telemetry text-slate-500 tabular-nums">
                    {p.views}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3 px-3">
                    <select
                      value={p.status}
                      onChange={(e: any) => handleStatusChange(p.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-[11px] font-sora font-bold uppercase cursor-pointer focus:outline-hidden ${
                        p.status === 'available'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                          : p.status === 'reserved'
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <option value="available" className="dark:bg-[#1a1530]">Available</option>
                      <option value="reserved" className="dark:bg-[#1a1530]">Reserved</option>
                      <option value="sold" className="dark:bg-[#1a1530]">Sold</option>
                    </select>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(p);
                          setListingModalOpen(true);
                        }}
                        aria-label="Edit listing"
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-violet-600 transition-colors cursor-pointer"
                        title="Edit Listing"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                        aria-label="Delete listing"
                        className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                        title="Delete Listing"
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

      {/* Listing Modal for Add & Edit */}
      <ListingModal
        isOpen={listingModalOpen}
        onClose={() => {
          setListingModalOpen(false);
          setEditingProduct(null);
        }}
        onSaved={() => {
          loadData();
        }}
        initialProduct={editingProduct}
      />
    </div>
  );
};
