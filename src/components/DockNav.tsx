import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus, Home, Compass, Bookmark, MessageSquare, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

interface DockNavProps {
  onOpenSellModal?: () => void;
}

export const DockNav: React.FC<DockNavProps> = ({ onOpenSellModal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { count: wishlistCount } = useWishlist();

  const handleSellClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenSellModal) {
      onOpenSellModal();
    } else {
      navigate('/seller?new=true');
    }
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `px-3.5 sm:px-4 py-2 rounded-full font-sora text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]'
        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
    }`;

  return (
    <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-[#120e24]/90 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-[0_12px_36px_-4px_rgba(30,26,46,0.18),0_4px_20px_rgba(124,58,237,0.15)]">
        {/* Left Nav Group */}
        <nav className="flex items-center gap-1" aria-label="Main Navigation">
          <NavLink to="/" end className={navItemClass}>
            <Home className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/browse" className={navItemClass}>
            <Compass className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Browse</span>
          </NavLink>
        </nav>

        {/* Center Glowing "+ Sell" Trigger */}
        <div className="relative -my-5 px-1.5">
          <button
            type="button"
            onClick={handleSellClick}
            aria-label="List new product for sale"
            className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#630ED4] via-[#7C3AED] to-[#A78BFA] text-white shadow-[0_0_24px_rgba(124,58,237,0.55)] hover:shadow-[0_0_36px_rgba(124,58,237,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-white/60 dark:ring-[#120e24]/80 group"
          >
            <Plus className="w-6 h-6 stroke-[2.5] transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Right Nav Group */}
        <nav className="flex items-center gap-1" aria-label="Secondary Navigation">
          <NavLink to="/wishlist" className={navItemClass}>
            <div className="relative">
              <Bookmark className="w-4 h-4 sm:hidden" />
              {wishlistCount > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-violet-500" />
              )}
            </div>
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="hidden sm:inline px-1.5 py-0.2 rounded-full bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-[10px] tabular-nums font-bold">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/messages" className={navItemClass}>
            <MessageSquare className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Messages</span>
          </NavLink>

          <NavLink to={user?.role === 'admin' ? '/admin' : '/seller'} className={navItemClass}>
            <UserCheck className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">
              {user?.role === 'admin' ? 'Admin' : 'Dashboard'}
            </span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
