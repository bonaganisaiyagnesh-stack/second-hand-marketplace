import React, { useState } from 'react';
import { X, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/currency';

interface ContactSellerModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  defaultOffer?: boolean;
}

export const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  product,
  isOpen,
  onClose,
  defaultOffer = false,
}) => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [message, setMessage] = useState(
    defaultOffer
      ? `Hello, I am interested in your ${product.title}. Would you consider a counter-offer?`
      : `Hello, is your ${product.title} still available for inspection or handover?`
  );
  const [offerAmount, setOfferAmount] = useState<number | ''>(
    defaultOffer ? Math.round(product.price * 0.92) : ''
  );
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      await api.sendMessage({
        productId: product.id,
        productTitle: product.title,
        senderName: user?.name || 'Julian Vance',
        senderEmail: user?.email || 'buyer@reloop.luxury',
        message: message.trim(),
        offerAmount: offerAmount ? Number(offerAmount) : undefined,
      });

      success(
        'Telemetry Dispatched',
        `Your message was sent to ${product.sellerName || 'the seller'}.`
      );
      onClose();
    } catch (err: any) {
      error('Transmission failed', err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-elevated p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Encrypted Channel
            </span>
            <h3 className="font-sora text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Contact {product.sellerName || 'Verified Collector'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product summary card */}
        <div className="my-4 p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-sora text-xs font-bold text-slate-900 dark:text-white truncate">
              {product.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-sora text-sm font-bold text-violet-600 dark:text-violet-400">
                {formatINR(product.price)}
              </span>
              <span className="text-[10px] text-slate-500 font-mono-telemetry">
                {product.condition}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Offer Amount (₹ INR - Optional)
            </label>
            <div className="relative">
              <span className="font-bold text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 font-sora text-sm">₹</span>
              <input
                type="number"
                min={1}
                value={offerAmount}
                onChange={(e) =>
                  setOfferAmount(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder={`Listing price is ${formatINR(product.price)}`}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Inquiry Message *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about cosmetic details, original box, local handover availability..."
              className="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-violet-50/70 dark:bg-violet-950/20 text-violet-800 dark:text-violet-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-violet-600 dark:text-violet-400" />
            <span>Encrypted via ReLoop Vault Protocol. Never wire money outside the app.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-sora font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sending ? 'Transmitting...' : 'Send Message'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
