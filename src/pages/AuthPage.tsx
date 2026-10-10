import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Sparkles, User, Mail, Lock, Building, Check, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

import { GoogleSignInButton } from '../components/GoogleSignInButton';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, switchDemoUser, user } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Neo-City');
  const [role, setRole] = useState<UserRole>('seller');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register({ name, email, role, city });
      }
      navigate('/seller');
    } catch {
      // Error handled by AuthContext via Toast
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (targetRole: 'admin' | 'seller' | 'buyer') => {
    await switchDemoUser(targetRole);
    navigate(targetRole === 'admin' ? '/admin' : '/seller');
  };

  return (
    <div className="w-full px-4 sm:px-6 max-w-xl mx-auto pb-24 pt-4">
      {/* Container Card */}
      <div className="rounded-3xl glass-panel-elevated p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 font-sora text-[10px] font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>ISO Telemetry Authenticated</span>
          </div>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'Cockpit Access' : 'Create Collector Profile'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sign in to manage luxury circular listings, inspect deal telemetry, and verify escrow exchanges.
          </p>
        </div>

        {/* Google Authentication Button */}
        <div className="mb-6">
          <GoogleSignInButton
            text="Sign in with Google"
            onSuccess={() => navigate('/seller')}
          />
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full border-t border-slate-200/60 dark:border-white/10" />
          <span className="absolute px-3 bg-white dark:bg-[#1a1530] text-[11px] font-sora font-semibold text-slate-400 uppercase tracking-wider">
            Or Demo Credentials
          </span>
        </div>

        {/* DEMO ACCOUNTS QUICK-LOGIN BAR */}
        <div className="mb-6 p-4 rounded-2xl bg-violet-50/80 dark:bg-white/5 border border-violet-200/60 dark:border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-sora text-[11px] font-bold uppercase text-violet-700 dark:text-violet-300">
              One-Click Demo Credentials
            </span>
            <span className="text-[10px] font-mono-telemetry text-slate-400">
              Pre-seeded
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('seller')}
              className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-violet-200 dark:border-white/10 hover:border-violet-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <span className="font-sora text-xs font-bold text-slate-900 dark:text-white block group-hover:text-violet-600">
                Seller Demo
              </span>
              <span className="text-[10px] text-slate-500 truncate block">
                seller@reloop.luxury
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('buyer')}
              className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-violet-200 dark:border-white/10 hover:border-violet-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <span className="font-sora text-xs font-bold text-slate-900 dark:text-white block group-hover:text-violet-600">
                Buyer Demo
              </span>
              <span className="text-[10px] text-slate-500 truncate block">
                buyer@reloop.luxury
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-violet-200 dark:border-white/10 hover:border-violet-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <span className="font-sora text-xs font-bold text-slate-900 dark:text-white block group-hover:text-violet-600">
                Admin Demo
              </span>
              <span className="text-[10px] text-slate-500 truncate block">
                admin@reloop.luxury
              </span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-sora font-bold transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Julian Vance"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Neo-City East"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                    Account Role
                  </label>
                  <select
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="seller" className="dark:bg-[#1a1530]">Seller (Collector)</option>
                    <option value="buyer" className="dark:bg-[#1a1530]">Buyer</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seller@reloop.luxury"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="font-sora text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-sora text-xs uppercase font-bold tracking-wider shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === 'login' ? 'Authenticate Session' : 'Create Verified Profile'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
