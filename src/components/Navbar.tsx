import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Heart,
  Bell,
  Sun,
  Moon,
  Compass,
  Navigation,
  Sparkles,
  LogOut,
  Shield,
  Layers,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, switchDemoUser, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { count: wishlistCount } = useWishlist();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/70 dark:bg-[#0f0c1c]/80 backdrop-blur-2xl border-b border-white/60 dark:border-white/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full px-4 sm:px-6 md:px-8 max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Left Telemetry Cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col">
            <span className="font-sora text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 font-bold">
              Cockpit Telemetry
            </span>
            <span className="font-sora text-sm md:text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user ? user.name.split(' ')[0] : 'Collector'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-slate-200 shadow-[0_0_12px_rgba(124,58,237,0.06)] border border-slate-200/50 dark:border-white/5">
            <Navigation className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 fill-violet-600/20" />
            <span className="font-sora text-[11px] font-semibold">21°C • Neo-City</span>
          </div>
        </div>

        {/* Center Brand Identity */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sora text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#630ED4] via-[#7C3AED] to-[#9333EA] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              ReLoop
            </span>
            <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 font-sora text-[10px] uppercase font-bold tracking-wider border border-violet-200/60 dark:border-violet-800/40">
              Ver. 3.2
            </span>
          </Link>
        </div>

        {/* Right Actions Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={() => navigate('/browse')}
            aria-label="Search telemetry"
            className="w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-white/15 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-slate-200/80 dark:hover:bg-white/15 transition-all"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white dark:ring-[#0f0c1c]" />
            )}
          </Link>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-violet-600 hover:bg-slate-200/80 dark:hover:bg-white/15 transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#0f0c1c]" />
            </button>

            {/* Notifications Menu */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel-elevated p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                  <span className="font-sora text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Live Telemetry Feeds
                  </span>
                  <span className="text-[10px] font-mono-telemetry text-cyan-600 dark:text-cyan-400">
                    3 Unread
                  </span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-xl bg-violet-50/70 dark:bg-white/5 text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Price Delta Detected
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Leica M6 Classic is now 18% below median valuation.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/70 dark:bg-white/5 text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Radar Proximity Ping
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Herman Miller Aeron available 2.1 km from current hub.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50/70 dark:bg-white/5 text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      ISO Certification Logged
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Horologist team signed off on Omega Speedmaster caliber.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full bg-slate-100/80 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-200/80 dark:hover:bg-white/15 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Google Sign In for Guests */}
          {!user && (
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#1f1b33] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-sora text-xs font-semibold hover:border-violet-500 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}

          {/* Profile & Demo Switcher */}
          <div className="relative pl-1">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 focus:outline-hidden cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/40 shadow-[0_0_12px_rgba(124,58,237,0.25)]"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  {user ? user.name.charAt(0) : 'U'}
                </div>
              )}
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel-elevated p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="pb-3 border-b border-slate-200/60 dark:border-white/10">
                  <p className="font-sora text-sm font-bold text-slate-900 dark:text-white truncate">
                    {user?.name || 'Guest User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || 'Not logged in'}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-sora text-[10px] font-bold uppercase">
                      {user?.role || 'Guest'}
                    </span>
                    {user?.googleAccount && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-sora text-[10px] font-bold uppercase flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Google Verified
                      </span>
                    )}
                    {user?.kycVerified && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-sora text-[10px] font-bold uppercase">
                        KYC Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Navigation links */}
                <div className="py-2 space-y-1">
                  <Link
                    to="/seller"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-violet-500" />
                    <span>Seller Dashboard</span>
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Admin Control Center</span>
                  </Link>
                </div>

                {/* Google Sign-in action in Dropdown */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      loginWithGoogle();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{user?.googleAccount ? 'Re-auth with Google' : 'Continue with Google'}</span>
                  </button>
                </div>

                {/* Quick Switch Demo Roles */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <span className="font-sora text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5 px-1">
                    Quick Role Switch
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        switchDemoUser('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-violet-50 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-white/10 text-violet-700 dark:text-violet-300 cursor-pointer"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchDemoUser('seller');
                        setProfileDropdownOpen(false);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-violet-50 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-white/10 text-violet-700 dark:text-violet-300 cursor-pointer"
                    >
                      Seller
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchDemoUser('buyer');
                        setProfileDropdownOpen(false);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-violet-50 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-white/10 text-violet-700 dark:text-violet-300 cursor-pointer"
                    >
                      Buyer
                    </button>
                  </div>
                </div>

                {/* Auth actions */}
                <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
                  {user ? (
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Sign In / Register</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
