import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { brand } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-zinc-900 text-orange-500 border border-zinc-800">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-zinc-400">On all orders over ${brand.freeShippingThreshold}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-zinc-900 text-orange-500 border border-zinc-800">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Ironclad Trial</h4>
              <p className="text-xs text-zinc-400">Hassle-free 100% money back</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-zinc-900 text-orange-500 border border-zinc-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Lab Tested & Certified</h4>
              <p className="text-xs text-zinc-400">WADA & Informed-Choice tested</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-zinc-900 text-orange-500 border border-zinc-800">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">256-Bit Encrypted</h4>
              <p className="text-xs text-zinc-400">Safe & secure checkout</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-zinc-950 font-black">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display text-2xl font-black tracking-wider text-white">
                IRON<span className="text-orange-500">PULSE</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {brand.subTagline}
            </p>

            <div className="space-y-2 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{brand.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{brand.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{brand.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Arsenal Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              The Arsenal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=Supplements" className="hover:text-orange-400 transition-colors">
                  Hydrolyzed Whey & Pre-Workouts
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Equipment" className="hover:text-orange-400 transition-colors">
                  Olympic Barbells & Weights
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-orange-400 transition-colors">
                  Lever Belts & Knee Sleeves
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Apparel" className="hover:text-orange-400 transition-colors">
                  Compression & Athletic Wear
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-orange-400 transition-colors font-medium text-orange-400">
                  Browse All Gear &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Athletes */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Lifter Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about-contact" className="hover:text-orange-400 transition-colors">
                  Contact Support & FAQ
                </Link>
              </li>
              <li>
                <Link to="/about-contact#warranty" className="hover:text-orange-400 transition-colors">
                  Lifetime Barbell Warranty
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-400 transition-colors">
                  View Cart & Checkout
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-orange-400 transition-colors">
                  Athlete Membership Account
                </Link>
              </li>
              <li>
                <Link to="/shop?wishlist=true" className="hover:text-orange-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Athlete Dispatch
            </h4>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Get 15% off your first purchase plus VIP drop alerts and training science.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>You're in! Welcome code: <strong>IRON20</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter athlete email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-glow-orange"
                >
                  <span>Claim 15% Off</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} {brand.name} Fitness Inc. All rights reserved. Forged for champions.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-300 cursor-pointer">Lab Testing Disclosure</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
