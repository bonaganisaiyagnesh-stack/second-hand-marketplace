import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string, title?: string) => Promise<void>;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { success, info } = useToast();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const loadWishlist = useCallback(async () => {
    if (!user) {
      setWishlistIds([]);
      return;
    }
    const ids = await api.getWishlist(user.id);
    setWishlistIds(ids);
  }, [user]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  const toggleWishlist = async (id: string, title?: string) => {
    if (!user) {
      info('Authentication required', 'Please sign in to save items to your wishlist');
      return;
    }

    try {
      const res = await api.toggleWishlist(user.id, id);
      setWishlistIds(res.productIds);
      if (res.inWishlist) {
        success('Saved to Vault', title ? `Added "${title}" to your wishlist` : 'Item added to wishlist');
      } else {
        info('Removed from Vault', title ? `Removed "${title}" from wishlist` : 'Item removed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        toggleWishlist,
        count: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
