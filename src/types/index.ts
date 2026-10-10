export type ConditionType = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
export type ProductStatus = 'available' | 'reserved' | 'sold';
export type UserRole = 'buyer' | 'seller' | 'admin';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  marketPrice?: number;
  dealScore?: number; // 0 - 100 gauge score
  condition: ConditionType;
  conditionScore?: number; // e.g. 9.8 out of 10
  category: string;
  sellerId: string;
  sellerName?: string;
  sellerRating?: number;
  images: string[];
  location: string;
  distanceKm?: number;
  status: ProductStatus;
  negotiable: boolean;
  views: number;
  createdAt: string;
  sku?: string;
  featured?: boolean;
  specs?: Record<string, string>;
  inspectionNotes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  itemCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
  rating: number;
  avatar?: string;
  dealsCount?: number;
  kycVerified?: boolean;
  joinedDate?: string;
  walletBalance?: number;
  googleAccount?: boolean;
  googlePhotoUrl?: string;
}

export interface Wishlist {
  userId: string;
  productIds: string[];
}

export interface MarketplaceStats {
  totalInventory: number;
  inventoryGrowth: string;
  circularUnitsRecycled: number;
  co2TonsSaved: number;
  waterSavedLiters: number;
  activeNodes: number;
  liveLatencyMs: number;
}

export interface ContactMessage {
  id: string;
  productId: string;
  productTitle: string;
  senderName: string;
  senderEmail: string;
  message: string;
  offerAmount?: number;
  createdAt: string;
}
