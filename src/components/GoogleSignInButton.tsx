import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Check, ChevronDown, User, ShieldCheck } from 'lucide-react';

interface GoogleSignInButtonProps {
  text?: string;
  className?: string;
  onSuccess?: () => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  text = 'Continue with Google',
  className = '',
  onSuccess,
}) => {
  const { loginWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [customEmail, setCustomEmail] = useState('bonaganisaiyagnesh@gmail.com');
  const [customName, setCustomName] = useState('Sai Yagnesh');

  const handleDirectGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle({
        email: 'bonaganisaiyagnesh@gmail.com',
        name: 'Sai Yagnesh',
        avatar:
          'https://lh3.googleusercontent.com/aida/AEtjO1Xgv3h8Hpm1nepXndxA1-7ejoFzpnF3eSXXdd2qywlNLM1AHwvcjD2r2CaXR3ajPBDmGg9tfiYeQNL7oZbRHiZ8UELpPL1qlgpXf8M1CkIYI9l8WJWIdXu22wdCHlP1ZeL0d8sWpF_FODBksYgiZsj1y_SDhY8slI7YfqVagUvnPjVr9X574ud7O1Re_DzSDktbgIajM_rri4jIg46C8WVE01hcLN7pFuGp0Q3jetta-glCGPa-0yphCHA',
      });
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleCustomGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    setLoading(true);
    try {
      await loginWithGoogle({
        email: customEmail,
        name: customName || customEmail.split('@')[0],
      });
      setShowAccountModal(false);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`relative flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={handleDirectGoogleLogin}
          disabled={loading}
          className="flex-1 py-3 px-4 rounded-full bg-white dark:bg-[#1f1b33] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-sora text-xs font-semibold hover:bg-slate-50 dark:hover:bg-[#282342] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
        >
          {/* Official Google G Logo SVG */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? 'Authenticating...' : text}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowAccountModal(true)}
          className="p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          title="Choose Google Account"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Account Switcher Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm rounded-3xl glass-panel-elevated p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <h3 className="font-sora text-sm font-bold text-slate-900 dark:text-white">
                Choose a Google Account
              </h3>
            </div>

            {/* Default User Tile */}
            <div
              onClick={handleDirectGoogleLogin}
              className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-violet-200/60 dark:border-white/10 hover:border-violet-500 flex items-center justify-between mb-3 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1Xgv3h8Hpm1nepXndxA1-7ejoFzpnF3eSXXdd2qywlNLM1AHwvcjD2r2CaXR3ajPBDmGg9tfiYeQNL7oZbRHiZ8UELpPL1qlgpXf8M1CkIYI9l8WJWIdXu22wdCHlP1ZeL0d8sWpF_FODBksYgiZsj1y_SDhY8slI7YfqVagUvnPjVr9X574ud7O1Re_DzSDktbgIajM_rri4jIg46C8WVE01hcLN7pFuGp0Q3jetta-glCGPa-0yphCHA"
                  alt="Sai Yagnesh"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30"
                />
                <div>
                  <p className="font-sora text-xs font-bold text-slate-900 dark:text-white">
                    Sai Yagnesh
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono-telemetry truncate max-w-[170px]">
                    bonaganisaiyagnesh@gmail.com
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-sora font-bold text-emerald-600 dark:text-emerald-400">
                Primary
              </span>
            </div>

            {/* Custom Google Account Form */}
            <form onSubmit={handleCustomGoogleLogin} className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-white/10">
              <span className="font-sora text-[10px] uppercase font-bold text-slate-400 block">
                Or Sign In with Another Account
              </span>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Google Email (e.g. name@gmail.com)"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAccountModal(false)}
                  className="flex-1 py-2 rounded-full text-xs font-sora font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-violet-600 text-white font-sora text-xs font-bold uppercase shadow-md hover:bg-violet-700 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
