// Global Cart, Wishlist, Promo, Auth & Toast Context with localStorage persistence
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../utils/config';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('ironpulse_cart', []);
  const [wishlist, setWishlist] = useLocalStorage('ironpulse_wishlist', ['ip-001', 'ip-004']);
  const [user, setUser] = useLocalStorage('ironpulse_user', {
    name: 'Alex Vance',
    email: 'alex.lifter@ironpulse.io',
    membership: 'Pro Athlete Tier',
    points: 850
  });
  const [orders, setOrders] = useLocalStorage('ironpulse_orders', [
    {
      id: 'ORD-94821',
      date: '2026-09-28',
      status: 'Delivered',
      items: [
        {
          productId: 'ip-001',
          name: 'Iso-Surge 100% Hydrolyzed Whey Isolate',
          variant: 'Double Rich Chocolate',
          size: '5 lbs (75 Servings)',
          price: 64.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80'
        }
      ],
      total: 70.19,
      shippingAddress: '742 Barbell Blvd, Suite 400, Austin, TX 78701'
    }
  ]);
  const [appliedPromo, setAppliedPromo] = useLocalStorage('ironpulse_promo', null);
  const [toasts, setToasts] = useState([]);

  // Toast notifications helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart operations
  const addToCart = useCallback((product, quantity = 1, variant, size) => {
    if (!product) return;
    const selectedVariant = variant || product.variants?.[0] || 'Standard';
    const selectedSize = size || product.sizes?.[0] || 'Standard';

    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.variant === selectedVariant && i.size === selectedSize
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          quantity: copy[idx].quantity + quantity
        };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || '',
          variant: selectedVariant,
          size: selectedSize,
          quantity: quantity
        }
      ];
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`, 'success');
  }, [setCart, showToast]);

  const removeFromCart = useCallback((productId, variant, size) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variant === variant && i.size === size)
      )
    );
    showToast('Item removed from cart', 'info');
  }, [setCart, showToast]);

  const updateQuantity = useCallback((productId, variant, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, variant, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variant === variant && item.size === size) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, [removeFromCart, setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  // Wishlist operations
  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const p = PRODUCTS.find((item) => item.id === productId);
        showToast(`Saved ${p ? `"${p.name}"` : 'item'} to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  }, [setWishlist, showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Promo Code operations
  const applyPromo = useCallback((code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a promo code' };
    }
    const promo = BRAND_CONFIG.promoCodes[cleanCode];
    if (promo) {
      setAppliedPromo({ code: cleanCode, ...promo });
      showToast(`Promo "${cleanCode}" applied: ${promo.description}`, 'success');
      return { success: true, message: `Promo "${cleanCode}" applied successfully!` };
    } else {
      showToast(`Invalid promo code "${cleanCode}"`, 'error');
      return { success: false, message: 'Invalid or expired code. Try IRON20 or PULSE10' };
    }
  }, [setAppliedPromo, showToast]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  }, [setAppliedPromo, showToast]);

  // Financial calculations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo || cartSubtotal === 0) return 0;
    return cartSubtotal * appliedPromo.discount;
  }, [appliedPromo, cartSubtotal]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= BRAND_CONFIG.freeShippingThreshold ? 0 : 9.99;
  }, [cartSubtotal]);

  const taxAmount = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    const taxableBase = Math.max(0, cartSubtotal - discountAmount);
    return taxableBase * BRAND_CONFIG.taxRate;
  }, [cartSubtotal, discountAmount]);

  const cartTotal = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return Math.max(0, cartSubtotal - discountAmount + shippingCost + taxAmount);
  }, [cartSubtotal, discountAmount, shippingCost, taxAmount]);

  // Auth operations
  const login = useCallback((email, name = 'Valued Lifter') => {
    const newUser = {
      name: name || 'Valued Lifter',
      email: email,
      membership: 'Iron Pulse Elite Member',
      points: 250
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  }, [setUser, showToast]);

  const logout = useCallback(() => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  }, [setUser, showToast]);

  // Orders
  const addOrder = useCallback((orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  }, [setOrders, clearCart]);

  const value = {
    products: PRODUCTS,
    brand: BRAND_CONFIG,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    appliedPromo,
    applyPromo,
    removePromo,
    discountAmount,
    shippingCost,
    taxAmount,
    cartTotal,
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
    user,
    setUser,
    login,
    logout,
    orders,
    addOrder,
    toasts,
    showToast,
    removeToast
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
