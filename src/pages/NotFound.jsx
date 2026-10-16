import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Dumbbell, ArrowLeft, Home, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../utils/config';

export default function NotFound() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-24 flex items-center justify-center">
      <Helmet>
        <title>404 — Rep Failed | {BRAND_CONFIG.name}</title>
      </Helmet>

      <div className="max-w-lg mx-auto px-4 text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 text-orange-500 flex items-center justify-center mx-auto shadow-2xl">
            <Dumbbell className="w-12 h-12 stroke-[1.8] transform -rotate-45" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-orange-500 text-zinc-950 font-black text-xs">
            404
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            MISSED REP &bull; PAGE NOT FOUND
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            REP FAILED!
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Looks like you went off the platform. The equipment or page you are looking for has been racked away, renamed, or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-800 hover:border-zinc-700 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse The Arsenal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
