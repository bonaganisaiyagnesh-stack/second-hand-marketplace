import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  DollarSign,
  Camera,
  Upload,
  AlertCircle,
  Check,
  Loader2,
  Tag,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { Product, ConditionType, Category } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ConditionBadge } from './ConditionBadge';
import { formatINR } from '../utils/currency';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (product: Product) => void;
  initialProduct?: Product | null;
}

export const ListingModal: React.FC<ListingModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  initialProduct,
}) => {
  const { user } = useAuth();
  const { success, error, info } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [marketPrice, setMarketPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState<ConditionType>('Like New');
  const [location, setLocation] = useState('Neo-City Central');
  const [negotiable, setNegotiable] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // AI Loading States
  const [aiGeneratingDesc, setAiGeneratingDesc] = useState(false);
  const [aiSuggestingPrice, setAiSuggestingPrice] = useState(false);
  const [aiAnalyzingPhoto, setAiAnalyzingPhoto] = useState(false);
  const [priceRationale, setPriceRationale] = useState<string | null>(null);

  // Submitting
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getCategories().then((cats) => {
      setCategories(cats);
      if (!category && cats.length > 0) {
        setCategory(cats[0].name);
      }
    });
  }, []);

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title);
      setDescription(initialProduct.description);
      setPrice(initialProduct.price);
      setMarketPrice(initialProduct.marketPrice || '');
      setCategory(initialProduct.category);
      setCondition(initialProduct.condition);
      setLocation(initialProduct.location);
      setNegotiable(initialProduct.negotiable);
      setImageUrls(initialProduct.images || []);
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
      setMarketPrice('');
      setCondition('Like New');
      setLocation(user?.city || 'Neo-City Central');
      setNegotiable(true);
      setImageUrls([]);
      setPriceRationale(null);
    }
  }, [initialProduct, user, isOpen]);

  if (!isOpen) return null;

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageUrls((prev) => [base64, ...prev]);
      info('Image Loaded', 'Analyzing photo with AI telemetry...');
      analyzePhotoWithAI(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  // AI FEATURE 1: Analyze Photo
  const analyzePhotoWithAI = async (base64: string, mimeType: string) => {
    setAiAnalyzingPhoto(true);
    try {
      const res = await fetch('/api/ai/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (data.category) setCategory(data.category);
      if (data.condition) setCondition(data.condition as ConditionType);
      if (data.estimatedPrice && !price) setPrice(data.estimatedPrice);
      if (data.cosmeticInspectionNotes && !description) {
        setDescription(`Inspected Condition: ${data.cosmeticInspectionNotes}\n\nFeatures: ${data.keyFeatures || ''}`);
      }
      success('AI Photo Analyzed', `Detected: ${data.title} (${data.condition})`);
    } catch (err: any) {
      console.error(err);
      error('Photo Analysis Notice', 'Manual entry available. Continuing with listing.');
    } finally {
      setAiAnalyzingPhoto(false);
    }
  };

  // AI FEATURE 2: Generate Description with AI
  const handleGenerateDescription = async () => {
    if (!title.trim()) {
      error('Input Required', 'Please enter a product title first so Gemini can generate a tailored description.');
      return;
    }

    setAiGeneratingDesc(true);
    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          price,
          features: 'Inspected for full cosmetic & technical authenticity.',
        }),
      });
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
        success('AI Description Generated', 'Polished listing copy created with Gemini.');
      }
    } catch (err: any) {
      console.error(err);
      error('Description Generator Notice', 'Using default template description.');
      setDescription(`Carefully preserved ${title} in ${condition} condition. Inspected and verified under ReLoop quality standards. Packaged with original accessories.`);
    } finally {
      setAiGeneratingDesc(false);
    }
  };

  // AI FEATURE 3: Suggest a Price with AI
  const handleSuggestPrice = async () => {
    if (!title.trim()) {
      error('Input Required', 'Please enter a product title first so Gemini can calculate secondary market pricing.');
      return;
    }

    setAiSuggestingPrice(true);
    try {
      const res = await fetch('/api/ai/suggest-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition,
          originalPrice: marketPrice || 0,
        }),
      });
      const data = await res.json();
      if (data.suggestedPrice) {
        setPrice(data.suggestedPrice);
        if (data.marketMedian && !marketPrice) {
          setMarketPrice(data.marketMedian);
        }
        if (data.rationale) {
          setPriceRationale(data.rationale);
        }
        success('AI Price Calculated', `Suggested: ${formatINR(data.suggestedPrice)} (Range: ${formatINR(data.minPrice)} - ${formatINR(data.maxPrice)})`);
      }
    } catch (err: any) {
      console.error(err);
      error('Price Telemetry Notice', 'Estimated based on standard condition ratio.');
      setPrice(28000);
    } finally {
      setAiSuggestingPrice(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImageUrls((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      error('Title Required', 'Please provide a title for the product.');
      return;
    }
    if (price === '' || Number(price) <= 0) {
      error('Price Required', 'Please provide a valid listing price.');
      return;
    }

    setSaving(true);
    try {
      const imagesToSave = imageUrls.length > 0
        ? imageUrls
        : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'];

      const numericPrice = Number(price);
      const numericMarket = marketPrice ? Number(marketPrice) : Math.round(numericPrice * 1.25);
      const deltaPercent = Math.round(((numericMarket - numericPrice) / numericMarket) * 100);
      const dealScore = Math.min(Math.max(70 + deltaPercent, 72), 99);

      if (initialProduct) {
        const updated = await api.updateProduct(initialProduct.id, {
          title,
          description,
          price: numericPrice,
          marketPrice: numericMarket,
          dealScore,
          category,
          condition,
          location,
          negotiable,
          images: imagesToSave,
        });
        success('Listing Updated', `Changes to "${title}" were saved successfully.`);
        onSaved(updated);
      } else {
        const created = await api.createProduct({
          title,
          description,
          price: numericPrice,
          marketPrice: numericMarket,
          dealScore,
          category,
          condition,
          location,
          negotiable,
          sellerId: user?.id || 'user-seller',
          sellerName: user?.name || 'Julian V. (Private Collector)',
          sellerRating: user?.rating || 4.98,
          status: 'available',
          images: imagesToSave,
          sku: `RL-${Math.floor(1000 + Math.random() * 9000)}`,
        });
        success('Item Listed!', `"${title}" is now active in the ReLoop catalog.`);
        onSaved(created);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      error('Failed to save listing', err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-elevated p-6 sm:p-8 my-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              {initialProduct ? 'Edit Catalog Asset' : 'New Circular Listing'}
            </span>
            <h2 className="font-sora text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {initialProduct ? 'Update Product Details' : 'List Second-Hand Item'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Photos & AI Photo Analyzer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-violet-500" />
                <span>Photos & Visual Telemetry</span>
              </label>
              {aiAnalyzingPhoto && (
                <span className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 font-semibold animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Gemini inspecting image...
                </span>
              )}
            </div>

            {/* Photo Previews */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 group">
                  <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Upload Trigger Button */}
              <label className="aspect-square rounded-2xl border-2 border-dashed border-violet-400/40 hover:border-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span className="text-[11px] font-sora font-semibold text-slate-600 dark:text-slate-300 text-center px-1">
                  Upload Photo
                </span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Manual Image URL input */}
            <div className="flex gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Or paste external image URL (e.g. Unsplash)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              >
                Add URL
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Leica M6 Classic (1984)"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="dark:bg-[#1a1530]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition Grading Selector */}
          <div>
            <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              Verified Condition Tier
            </label>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {(['New', 'Like New', 'Good', 'Fair', 'Poor'] as ConditionType[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`py-2 px-1 rounded-xl text-xs font-sora font-semibold transition-all cursor-pointer text-center ${
                    condition === c
                      ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-md shadow-violet-500/20'
                      : 'bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Row with "Suggest a Price" Gemini Feature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Asking Price (₹ INR) *
                </label>
                {/* AI Price Suggester Trigger */}
                <button
                  type="button"
                  disabled={aiSuggestingPrice}
                  onClick={handleSuggestPrice}
                  className="flex items-center gap-1 text-[11px] font-sora font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 disabled:opacity-50 cursor-pointer"
                >
                  {aiSuggestingPrice ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  <span>Suggest a price with AI</span>
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-sora">₹</span>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="45000"
                  className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white tabular-nums placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {priceRationale && (
                <p className="text-[11px] text-cyan-700 dark:text-cyan-300 mt-1.5 font-medium leading-tight">
                  ⚡ AI Valuation: {priceRationale}
                </p>
              )}
            </div>

            <div>
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                Original Retail / Market (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-sora">₹</span>
                <input
                  type="number"
                  min={1}
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="62000"
                  className="w-full pl-8 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white tabular-nums placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Description & "Generate with AI" button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Listing Description
              </label>
              {/* AI Description Generator Trigger */}
              <button
                type="button"
                disabled={aiGeneratingDesc}
                onClick={handleGenerateDescription}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-[11px] font-sora font-bold hover:bg-violet-200 dark:hover:bg-violet-900 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {aiGeneratingDesc ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>Generate description with AI</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail cosmetic wear, mechanical integrity, included cables or cases..."
              className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 leading-relaxed"
            />
          </div>

          {/* Location & Negotiable Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                Pickup Hub / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Neo-City Central"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 sm:pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-white/10 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
              <span className="font-sora text-xs font-semibold text-slate-700 dark:text-slate-300">
                Open to Telemetric Offers & Bids
              </span>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-full text-xs font-sora font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{initialProduct ? 'Save Modifications' : 'Publish to Catalog'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
