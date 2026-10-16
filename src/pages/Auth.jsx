import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Trophy, 
  Package, 
  LogOut, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Auth() {
  const { user, login, logout, orders, brand, showToast } = useStore();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register') {
      login(email || 'athlete@ironpulse.io', name || 'Elite Lifter');
    } else {
      login(email || 'alex.lifter@ironpulse.io', name || 'Alex Vance');
    }
  };

  const handleQuickDemoLogin = () => {
    login('alex.lifter@ironpulse.io', 'Alex Vance');
  };

  // If user is logged in, show User Profile Dashboard
  if (user) {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12">
        <Helmet>
          <title>Athlete Dashboard | {brand.name}</title>
        </Helmet>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* User Profile Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-zinc-950 flex items-center justify-center font-display font-black text-2xl sm:text-3xl shadow-glow-orange flex-shrink-0">
                {user.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md bg-lime-400 text-zinc-950 text-[10px] font-black uppercase">
                    {user.membership || 'Pro Athlete Tier'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
                <div className="flex items-center gap-4 pt-1 text-xs text-zinc-300">
                  <span>⚡ <strong>{user.points || 850}</strong> Iron Pulse Points</span>
                  <span>&bull;</span>
                  <span>🏆 Tier Status: <strong>Diamond Lifter</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                to="/shop"
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-orange-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-glow-orange hover:bg-orange-600 transition-colors text-center"
              >
                Go to Arsenal
              </Link>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Past Orders History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  Order Management
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase mt-1">
                  ORDER HISTORY & SHIPMENTS ({orders.length})
                </h2>
              </div>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-orange-400">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-mono font-bold text-sm text-white">{order.id}</div>
                          <div className="text-xs text-zinc-500">Ordered on {order.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="px-2.5 py-1 rounded-md bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold">
                          {order.status || 'Delivered'}
                        </span>
                        <span className="font-display font-bold text-base text-white">
                          ${order.total ? order.total.toFixed(2) : '70.19'}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-zinc-800/60">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=100&q=80'}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-zinc-950"
                            />
                            <div>
                              <div className="font-bold text-white">{item.name}</div>
                              <div className="text-[11px] text-zinc-400">
                                {item.variant} &bull; {item.size} &bull; Qty {item.quantity}
                              </div>
                            </div>
                          </div>
                          <span className="font-semibold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[11px] text-zinc-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-zinc-800/60">
                      <span>Delivered to: <strong>{order.shippingAddress}</strong></span>
                      <span className="text-orange-400 hover:underline cursor-pointer">
                        Track Real-Time Ground Logistics &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400">
                You haven't placed any orders yet.
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // If user is not logged in, show Auth Login / Register form
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-12 flex items-center justify-center">
      <Helmet>
        <title>Athlete Sign In & Registration | {brand.name}</title>
      </Helmet>

      <div className="max-w-md w-full mx-auto px-4">
        
        {/* Card Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 text-zinc-950 font-black shadow-glow-orange mb-2">
            <User className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
            {mode === 'login' ? 'ATHLETE LOGIN' : 'JOIN THE RANKS'}
          </h1>
          <p className="text-xs text-zinc-400">
            {mode === 'login'
              ? 'Access your equipment warranty, order tracking, and member discounts.'
              : 'Create your account to unlock 20% off your initial order.'}
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
          
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'login' ? 'bg-orange-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg transition-all ${
                mode === 'register' ? 'bg-orange-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>⚡ 1-Click Demo Athlete Sign In</span>
          </button>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-zinc-300 uppercase">Full Name</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    required
                    placeholder="Marcus Stone"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase">Email Address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-display font-bold text-sm uppercase tracking-wider shadow-glow-orange transition-all hover:scale-105 active:scale-95"
            >
              {mode === 'login' ? 'Authorize & Enter' : 'Register Athlete Profile'}
            </button>
          </form>

          {/* Member perks list */}
          <div className="pt-4 border-t border-zinc-800 space-y-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Automatic 10% welcome bonus code PULSE10</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Lifetime Barbell Warranty registration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Priority warehouse dispatch and express tracking</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
