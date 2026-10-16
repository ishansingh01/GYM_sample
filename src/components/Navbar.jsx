import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { cartCount, cartSubtotal, wishlistCount, user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Arsenal (Shop)', path: '/shop' },
    { name: 'Equipment', path: '/shop?category=Equipment' },
    { name: 'Supplements', path: '/shop?category=Supplements' },
    { name: 'Accessories', path: '/shop?category=Accessories' },
    { name: 'Apparel', path: '/shop?category=Apparel' },
    { name: 'About & Support', path: '/about-contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-zinc-950 text-xs font-bold py-1.5 px-4 flex items-center justify-between shadow-inner">
          <div className="flex-1 flex items-center justify-center gap-2 tracking-wide uppercase text-center text-[11px] sm:text-xs">
            <Flame className="w-3.5 h-3.5 animate-pulse hidden sm:inline" />
            <span>
              ⚡ ATHLETE FLASH DEAL: USE CODE <span className="bg-zinc-950 text-orange-400 px-1.5 py-0.5 rounded font-mono">IRON20</span> FOR 20% OFF &bull; FREE EXPRESS SHIPPING OVER $100
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-zinc-950/70 hover:text-zinc-950 p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Bar */}
      <nav className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300">
              <Dumbbell className="w-5 h-5 text-zinc-950 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-wider text-white flex items-center">
                IRON<span className="text-orange-500">PULSE</span>
              </span>
              <span className="text-[9px] font-bold text-zinc-400 tracking-[0.2em] uppercase -mt-1">
                Elite Performance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors rounded-lg ${
                    isActive
                      ? 'text-orange-500 bg-orange-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search barbells, whey, belts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm text-zinc-100 placeholder-zinc-500 rounded-full pl-9 pr-4 py-2 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Link */}
            <Link
              to="/shop?wishlist=true"
              className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-zinc-950 text-[11px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth */}
            <Link
              to="/auth"
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-2"
              aria-label="Account"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <div className="relative">
                <User className="w-5 h-5" />
                {user && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-lime-400 rounded-full border-2 border-zinc-950" />
                )}
              </div>
              {user && (
                <span className="hidden xl:inline text-xs font-semibold text-zinc-300 max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-zinc-950 font-bold px-3.5 py-2 rounded-xl transition-all shadow-glow-orange active:scale-95"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-zinc-950 text-orange-400 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-orange-500">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs tracking-tight">
                ${cartSubtotal.toFixed(2)}
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search gear & supplements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-sm text-zinc-100 placeholder-zinc-500 rounded-lg pl-9 pr-4 py-2 outline-none"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-base font-semibold text-zinc-200 hover:text-orange-400 hover:bg-zinc-900 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-sm">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-zinc-300 hover:text-orange-400"
              >
                <User className="w-4 h-4" />
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              </Link>
              <Link
                to="/shop?wishlist=true"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-zinc-300 hover:text-orange-400"
              >
                <Heart className="w-4 h-4" />
                <span>Saved Items ({wishlistCount})</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
