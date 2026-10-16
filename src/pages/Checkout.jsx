import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ArrowLeft, 
  ShoppingBag,
  Sparkles,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    shippingCost, 
    taxAmount, 
    cartTotal, 
    appliedPromo,
    addOrder,
    brand
  } = useStore();

  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex.lifter@ironpulse.io',
    phone: '512-555-0199',
    address: '742 Barbell Blvd, Suite 400',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    cardName: 'Alex Vance'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const selectedShippingFee = formData.shippingMethod === 'express' ? 19.99 : shippingCost;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + selectedShippingFee + taxAmount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillDemoData = () => {
    setFormData({
      firstName: 'Marcus',
      lastName: 'Stone',
      email: 'm.stone@powerlifting.org',
      phone: '512-555-4422',
      address: '108 Olympic Way, Iron Quarter',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
      country: 'United States',
      shippingMethod: 'standard',
      cardNumber: '4242 •••• •••• 4242',
      cardExp: '08/29',
      cardCvc: '321',
      cardName: 'Marcus Stone'
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = addOrder({
        items: [...cart],
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingFee: selectedShippingFee,
        tax: taxAmount,
        total: finalTotal,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        promoCode: appliedPromo?.code || null
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 1200);
  };

  // If order completed, show Confirmation View
  if (completedOrder) {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16">
        <Helmet>
          <title>Order Confirmed | {brand.name}</title>
        </Helmet>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-lime-400/20 text-lime-400 border-2 border-lime-400/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                Payment Authorized & Dispatched
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
                ORDER CONFIRMED!
              </h1>
              <p className="text-sm text-zinc-300 max-w-lg mx-auto">
                Thank you, <strong>{completedOrder.customerName}</strong>! Your order reference is{' '}
                <strong className="text-orange-400 font-mono">{completedOrder.id}</strong>. A receipt has been sent to{' '}
                <strong className="text-white">{completedOrder.email}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Order ID</span>
                  <div className="font-mono font-bold text-white text-sm">{completedOrder.id}</div>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Order Date</span>
                  <div className="font-semibold text-white text-sm">{completedOrder.date}</div>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Total Paid</span>
                  <div className="font-display font-bold text-orange-400 text-base">
                    ${completedOrder.total.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Status</span>
                  <div className="font-semibold text-lime-400 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-lime-400" />
                    <span>Processing</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 uppercase font-bold text-[10px]">Shipping Destination</span>
                <p className="font-medium text-zinc-300 text-sm mt-0.5">
                  {completedOrder.shippingAddress}
                </p>
              </div>

              {/* Items summary */}
              <div className="pt-2 space-y-2">
                <span className="text-zinc-500 uppercase font-bold text-[10px]">Purchased Gear & Nutrition</span>
                <div className="divide-y divide-zinc-800">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover bg-zinc-900"
                        />
                        <div>
                          <div className="font-bold text-white line-clamp-1">{item.name}</div>
                          <div className="text-[11px] text-zinc-400">
                            {item.variant} &bull; {item.size} &bull; Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="font-display font-bold text-white text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-sm uppercase tracking-wider shadow-glow-orange transition-all"
              >
                Continue Shopping
              </Link>
              <Link
                to="/auth"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm uppercase tracking-wider transition-all"
              >
                View in Account Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no completed order, redirect to cart
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-4">
          YOUR ARSENAL CART IS EMPTY
        </h2>
        <p className="text-zinc-400 mb-6 text-sm">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-zinc-950 font-bold uppercase text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-10">
      <Helmet>
        <title>Secure Checkout | {brand.name}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
              SECURE CHECKOUT
            </h1>
          </div>

          <button
            type="button"
            onClick={handleFillDemoData}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500 text-xs font-bold text-orange-400 transition-colors"
          >
            ⚡ Auto-Fill Demo Athlete Data
          </button>
        </div>

        {/* Checkout Form & Sidebar */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Customer & Shipping Address */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-zinc-950 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
                  Shipping & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">City</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase">State / Prov</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-zinc-300 uppercase">ZIP / Postal</label>
                  <input
                    type="text"
                    required
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-zinc-950 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
                  Shipping Speed
                </h2>
              </div>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.shippingMethod === 'standard'
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="accent-orange-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Standard Ground Freight (3-5 Days)</div>
                      <div className="text-[11px] text-zinc-400">Tracked with liftgate service for heavy steel</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.shippingMethod === 'express'
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="accent-orange-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">IronPulse Express Air (1-2 Days)</div>
                      <div className="text-[11px] text-zinc-400">Priority packaging and express dispatch</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-400">$19.99</span>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-zinc-950 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    <span>Credit / Debit Card</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">Demo Mode (Safe)</span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase">Card Number</label>
                  <input
                    type="text"
                    required
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 uppercase">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      name="cardExp"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-400 uppercase">CVV Security</label>
                    <input
                      type="text"
                      required
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-zinc-400 uppercase">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 space-y-6 sticky top-28 shadow-xl">
              <h3 className="text-base font-display font-bold text-white uppercase tracking-wider pb-3 border-b border-zinc-800">
                Order Review ({cart.length} Products)
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2 divide-y divide-zinc-800/60">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-zinc-950 flex-shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{item.name}</div>
                        <div className="text-[11px] text-zinc-400">
                          {item.variant} &bull; Qty {item.quantity}
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-zinc-800 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-lime-400 font-semibold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-300">
                  <span>Shipping</span>
                  <span className="font-semibold text-white">
                    {selectedShippingFee === 0 ? 'FREE' : `$${selectedShippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-zinc-300">
                  <span>Sales Tax</span>
                  <span className="font-semibold text-white">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-base font-display font-bold text-white uppercase">Final Amount</span>
                  <span className="text-2xl font-display font-black text-orange-400">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-zinc-950 font-display font-bold text-base uppercase tracking-wider shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Authorizing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-zinc-500 text-center leading-relaxed">
                By completing your order, you agree to IronPulse's Terms of Service and 30-day return policy.
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
