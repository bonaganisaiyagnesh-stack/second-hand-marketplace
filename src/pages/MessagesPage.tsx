import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, ShieldCheck, DollarSign, Clock, User, CheckCircle2 } from 'lucide-react';
import { ContactMessage } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/currency';

export const MessagesPage: React.FC = () => {
  const { success } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    api.getMessages().then((data) => {
      if (data.length === 0) {
        // Seed an initial demo message
        const sample: ContactMessage = {
          id: 'msg-seed-1',
          productId: 'prod-leica-m6',
          productTitle: 'Leica M6 Classic (1984)',
          senderName: 'Elena Rostova',
          senderEmail: 'buyer@reloop.luxury',
          message: 'Greetings Julian. Is the 0.72x viewfinder in factory alignment? Would you be available for an in-person curbside inspection at the Munich Old Town locker tomorrow at 14:00?',
          offerAmount: 195000,
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        };
        api.sendMessage(sample).then((created) => {
          setMessages([created]);
          setActiveMessage(created);
        });
      } else {
        setMessages(data);
        setActiveMessage(data[0]);
      }
    });
  }, []);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    success('Reply Transmitted', 'Your encrypted reply was dispatched to the collector.');
    setReplyText('');
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto pb-24">
      {/* Header */}
      <div className="mb-6">
        <span className="font-sora text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Encrypted HUD Messenger
        </span>
        <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Collector Transmissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Direct communication channels with verified buyers, sellers, and escrow coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left: Message Inquiries List (4 cols) */}
        <div className="md:col-span-4 rounded-3xl glass-panel p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-200/60 dark:border-white/10">
            <span className="font-sora text-xs font-bold uppercase text-slate-400">
              Active Inquiries
            </span>
            <span className="text-xs font-mono-telemetry font-bold text-violet-600 dark:text-violet-400">
              {messages.length} Threads
            </span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[600px]">
            {messages.map((m) => {
              const isSelected = activeMessage?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMessage(m)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#6D28D9]/15 to-[#8B5CF6]/20 border border-violet-500/40 shadow-sm'
                      : 'bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/5 hover:bg-white/80 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sora text-xs font-bold text-slate-900 dark:text-white truncate">
                      {m.senderName}
                    </span>
                    {m.offerAmount && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-sora text-[10px] font-bold tabular-nums">
                        Offer: {formatINR(m.offerAmount)}
                      </span>
                    )}
                  </div>
                  <p className="font-sora text-[11px] font-semibold text-violet-600 dark:text-violet-400 truncate">
                    {m.productTitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {m.message}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Message Detail & Reply Box (8 cols) */}
        <div className="md:col-span-8 rounded-3xl glass-panel-elevated p-6 flex flex-col justify-between">
          {activeMessage ? (
            <>
              <div>
                {/* Active Message Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 mb-5">
                  <div>
                    <span className="font-sora text-[10px] uppercase font-bold text-slate-400">
                      Channel Asset:
                    </span>
                    <h3 className="font-sora text-lg font-bold text-slate-900 dark:text-white">
                      {activeMessage.productTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>Sender: <strong>{activeMessage.senderName}</strong></span>
                      <span>• {activeMessage.senderEmail}</span>
                    </div>
                  </div>

                  {activeMessage.offerAmount && (
                    <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 text-right">
                      <span className="text-[10px] font-sora uppercase font-bold text-slate-400 block">
                        Active Telemetric Offer
                      </span>
                      <span className="font-sora text-xl font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                        {formatINR(activeMessage.offerAmount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message Body */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-2 text-xs font-sora font-semibold text-violet-600 dark:text-violet-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>Inquiry Logged</span>
                      <span className="text-slate-400 font-normal">
                        ({new Date(activeMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                      {activeMessage.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeMessage.senderName}...`}
                    className="flex-1 px-4 py-3 rounded-full bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-md shadow-violet-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Transmit</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              Select an inquiry thread to inspect telemetry details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
