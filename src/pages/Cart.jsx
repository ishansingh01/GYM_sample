import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  X, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { 
    cart, 
    cartSubtotal, 
    cartCount, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    appliedPromo,
    applyPromo,
    removePromo,
    discountAmount,
    shippingCost,
    taxAmount,
    cartTotal,
    brand
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMessage(result);
    if (result.success) {
      setPromoInput('');
    }
  };

  const freeShippingRemainder = Math.max(0, brand.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / brand.freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen py-24 flex items-center justify-center">
        <Helmet>
          <title>Your Cart is Empty | {brand.name}</title>
        </Helmet>
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto shadow-xl">
            <ShoppingBag className="w-12 h-12 text-zinc-600 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
              YOUR ARSENAL IS EMPTY
            </h1>
            <p className="text-sm text-zinc-400">
              You haven't equipped any gear or supplements yet. Fuel your training with our lab-tested collection.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-zinc-950 font-display font-bold text-base uppercase tracking-wider shadow-glow-orange transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore The Arsenal</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-10">
      <Helmet>
        <title>Shopping Cart ({cartCount}) | {brand.name}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cart Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-zinc-800 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              Review Selection
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              EQUIPMENT CART ({cartCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Entire Cart</span>
          </button>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="mb-8 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-200 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-orange-500" />
              {freeShippingRemainder === 0 ? (
                <span className="text-lime-400 font-extrabold">
                  🎉 YOU UNLOCKED FREE EXPRESS SHIPPING!
                </span>
              ) : (
                <span>
                  Add <strong className="text-orange-400">${freeShippingRemainder.toFixed(2)}</strong> more to get <strong className="text-white">FREE Express Shipping</strong>
                </span>
              )}
            </span>
            <span className="text-zinc-500 font-mono text-[11px]">
              Threshold: ${brand.freeShippingThreshold}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-lime-400 transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Cart Items List + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items Area */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={`${item.productId}-${item.variant}-${item.size}-${idx}`}
                className="p-4 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-zinc-700"
              >
                {/* Product info + thumbnail */}
                <div className="flex items-center gap-4 flex-1">
                  <Link
                    to={`/product/${item.productId}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0"
                  >
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                      {item.category || 'Gear'}
                    </span>
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-bold text-sm sm:text-base text-white hover:text-orange-400 transition-colors line-clamp-1 block"
                    >
                      {item.name}
                    </Link>
                    <div className="text-xs text-zinc-400 flex flex-wrap gap-2 pt-0.5">
                      <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 font-medium">
                        {item.variant}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 font-medium">
                        {item.size}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-400 sm:hidden pt-1">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>

                {/* Controls & Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-zinc-800">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.variant, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-white font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.variant, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <div className="text-right min-w-[80px]">
                    <div className="text-base sm:text-lg font-display font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-zinc-500 hidden sm:block">
                      ${item.price.toFixed(2)} / ea
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.variant, item.size)}
                    className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-zinc-950 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/shop"
                className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>&larr; Continue Exploring Arsenal</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 space-y-6 sticky top-28 shadow-xl">
              <h2 className="text-lg font-display font-bold text-white uppercase tracking-wider pb-3 border-b border-zinc-800">
                ORDER SUMMARY
              </h2>

              {/* Promo Code Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-orange-500" />
                  <span>Promo Code</span>
                </label>

                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs">
                    <div>
                      <span className="font-mono font-bold text-orange-400 mr-2">{appliedPromo.code}</span>
                      <span className="text-zinc-300">({Math.round(appliedPromo.discount * 100)}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-zinc-400 hover:text-rose-400"
                      title="Remove promo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. IRON20 or PULSE10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-orange-500 text-zinc-200 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && !appliedPromo && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    {promoMessage.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-lime-400 font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-300">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-white">
                    {shippingCost === 0 ? (
                      <span className="text-lime-400 font-bold uppercase">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-300">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="font-semibold text-white">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-base font-display font-bold text-white uppercase">Total</span>
                  <span className="text-2xl font-display font-black text-orange-400">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-zinc-950 font-display font-bold text-base uppercase tracking-wider shadow-glow-orange flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Security Badges */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>256-bit bank encrypted safe transaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>30-day money back guarantee</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
