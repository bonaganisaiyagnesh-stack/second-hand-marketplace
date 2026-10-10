import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { DockNav } from './components/DockNav';
import { Footer } from './components/Footer';
import { ListingModal } from './components/ListingModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { WishlistPage } from './pages/WishlistPage';
import { MessagesPage } from './pages/MessagesPage';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [sellModalOpen, setSellModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <BrowserRouter>
              <div className="min-h-screen relative overflow-x-hidden selection:bg-violet-200 selection:text-violet-900 dark:selection:bg-violet-900 dark:selection:text-violet-100 flex flex-col justify-between transition-colors duration-300">
                {/* Ambient Lavender Mist & Glow Backdrops */}
                <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.12),transparent_70%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(6,182,212,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.22),transparent_70%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(6,182,212,0.10),transparent_60%)]" />

                {/* Faint Infotainment Wave & Circuit Grid */}
                <div className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20 bg-[linear-gradient(to_right,rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Top Cockpit Header */}
                <Navbar />

                {/* Main View Area */}
                <main className="relative z-10 w-full pt-20 flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/seller" element={<SellerDashboardPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>

                {/* Floating Bottom Cockpit Dock */}
                <DockNav onOpenSellModal={() => setSellModalOpen(true)} />

                {/* Global Listing Modal with Gemini AI */}
                <ListingModal
                  isOpen={sellModalOpen}
                  onClose={() => setSellModalOpen(false)}
                  onSaved={() => {
                    // Refresh or trigger state updates
                  }}
                />

                {/* Resale Maison Footer */}
                <Footer />
              </div>
            </BrowserRouter>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
