import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-zinc-900/80 rounded-2xl border border-zinc-800/80 overflow-hidden hover:border-orange-500/40 hover:shadow-glow-orange transition-all duration-300 backdrop-blur-sm">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-orange-500 text-zinc-950 shadow-md">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && !product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-lime-400 text-zinc-950">
              -{discountPercent}%
            </span>
          )}
          {product.stock <= 10 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 scale-105'
              : 'bg-zinc-950/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800'
          }`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-zinc-950">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
          <span className="font-medium text-orange-400 uppercase tracking-wider text-[11px]">
            {product.category}
          </span>
          <span className="text-zinc-500 text-[11px] truncate max-w-[120px]">
            {product.brand}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-sans font-bold text-base text-zinc-100 hover:text-orange-400 transition-colors line-clamp-2 leading-snug mb-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Variants count snippet */}
        <div className="text-xs text-zinc-400 mb-4 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span>
            {product.variants?.length || 1} {product.variantType || 'Option'}s &bull; {product.sizes?.length || 1} Sizes
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="mt-auto pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-lime-400">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
              justAdded
                ? 'bg-lime-400 text-zinc-950 font-extrabold'
                : 'bg-zinc-800 hover:bg-orange-500 text-zinc-200 hover:text-zinc-950'
            }`}
            title="Quick add to cart"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
