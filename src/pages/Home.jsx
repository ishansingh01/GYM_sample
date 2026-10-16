import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Dumbbell, 
  Trophy, 
  Check, 
  Copy, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, brand, showToast } = useStore();
  const [copiedCode, setCopiedCode] = useState(false);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew || p.badge).slice(0, 4);

  const handleCopyPromo = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast(`Code "${code}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const categories = [
    {
      name: 'Supplements',
      desc: 'Cold-filtered whey isolates, high-stim pre-workouts & Creapure creatine.',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
      tag: 'CLINICAL PURITY',
      path: '/shop?category=Supplements'
    },
    {
      name: 'Equipment',
      desc: '215K PSI Olympic barbells, calibrated dumbbells & competition plates.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      tag: 'MILITARY STEEL',
      path: '/shop?category=Equipment'
    },
    {
      name: 'Accessories',
      desc: '13mm IPF lever belts, 7mm neoprene knee sleeves & Cordura tactical duffels.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      tag: 'MAX SUPPORT',
      path: '/shop?category=Accessories'
    },
    {
      name: 'Apparel',
      desc: 'AeroGrid sweat-wicking carbon compression wear and lifting tees.',
      image: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?auto=format&fit=crop&w=800&q=80',
      tag: 'ZERO CHAFE',
      path: '/shop?category=Apparel'
    }
  ];

  const testimonials = [
    {
      name: 'Marcus "The Anvil" Stone',
      role: 'USAPL Masters Powerlifter',
      quote: 'The 13mm Lever Belt is indestructible. Locked me in rock-solid for a 655 lb deadlift PR. The craftsmanship rivals gear twice the price.',
      pr: '655 lb Deadlift PR',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      name: 'Elena Rostova',
      role: 'CrossFit Games Regional Competitor',
      quote: 'Iso-Surge is the cleanest whey isolate I have ever tasted. Dissolves instantly with ice water, no chalkiness and zero bloating.',
      pr: 'Clean & Jerk 245 lb',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      name: 'Coach Darrell King',
      role: 'Head Strength Coach, Apex Athletics',
      quote: 'We outfitted our entire athlete facility with IronPulse Cerakote barbells. Smooth needle bearing rotation and crisp knurling.',
      pr: 'Facility Equipment Partner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 5
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      <Helmet>
        <title>{brand.name} | Elite Gym Equipment & Clinically Dosed Supplements</title>
        <meta name="description" content={brand.subTagline} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-mesh-gradient border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,85,0,0.22),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 animate-bounce text-orange-500" />
                <span>Next-Gen Heavy Iron & Tested Formulas</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.95]">
                FORGE YOUR <br />
                <span className="text-gradient-orange">UNSTOPPABLE</span> <br />
                PERFORMANCE
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-sans">
                {brand.subTagline} Built for lifters who measure progress in cold hard iron and personal records.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-zinc-950 font-display font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-glow-orange transition-all hover:scale-105 active:scale-95"
                >
                  <span>Explore The Arsenal</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Link>

                <Link
                  to="/shop?category=Supplements"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-display font-bold text-lg uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Fuel Up (Supplements)</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-800/80">
                <div>
                  <div className="text-2xl font-display font-bold text-white">50K+</div>
                  <div className="text-xs text-zinc-400 font-medium">Lifters Geared Up</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-orange-400">4.9 / 5</div>
                  <div className="text-xs text-zinc-400 font-medium">Verified Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">24h</div>
                  <div className="text-xs text-zinc-400 font-medium">Fast Dispatch</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-lime-400">100%</div>
                  <div className="text-xs text-zinc-400 font-medium">Informed Tested</div>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
                  alt="Elite Gym Equipment"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                
                {/* Floating promo badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                      Featured Equipment
                    </div>
                    <div className="text-base font-bold text-white">
                      Valkyrie 20kg Cerakote Barbell
                    </div>
                    <div className="text-sm font-display font-bold text-zinc-300">
                      $319.99 <span className="text-xs text-zinc-500 line-through">$379.99</span>
                    </div>
                  </div>
                  <Link
                    to="/product/ip-004"
                    className="p-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold rounded-xl transition-all hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Arsenal Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            EQUIP YOUR TRAINING LAB
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">
            EXPLORE THE BATTLE-READY ARSENAL
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every product is stress-tested under maximum load and rigorously third-party lab certified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 hover:shadow-glow-orange transition-all duration-300 flex flex-col h-96"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              
              <div className="relative mt-auto p-6 flex flex-col justify-end space-y-2">
                <span className="inline-block px-2.5 py-1 rounded bg-orange-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider w-max">
                  {cat.tag}
                </span>
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {cat.desc}
                </p>
                <div className="pt-2 flex items-center text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                  <span>Enter Collection</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-12 text-zinc-950 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 text-orange-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED ATHLETE DISCOUNT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-zinc-950 leading-tight">
              TAKE 20% OFF YOUR COMPLETE ORDER
            </h2>
            <p className="text-zinc-900 font-semibold text-sm sm:text-base max-w-xl">
              Use code <strong className="font-black text-black">IRON20</strong> at checkout to unlock instant athlete tier savings on all equipment and supplements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => handleCopyPromo('IRON20')}
              className="flex items-center gap-2 bg-zinc-950 text-white hover:bg-zinc-900 font-mono font-bold text-sm px-6 py-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              {copiedCode ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'COPIED TO CLIPBOARD' : 'CODE: IRON20'}</span>
            </button>
            <Link
              to="/shop"
              className="bg-white hover:bg-zinc-100 text-zinc-950 font-display font-bold text-base px-6 py-4 rounded-xl shadow-lg uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-16 bg-zinc-900/40 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                HEAVY HITTERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
                TOP-RATED ATHLETE FAVORITES
              </h2>
            </div>
            <Link
              to="/shop?sort=rating"
              className="inline-flex items-center text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IronPulse (Pillars of Quality) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
            UNCOMPROMISED STANDARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
            WHY THE STRONGEST CHOOSE IRONPULSE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            We don't manufacture budget gimmicks. Every gram and every weld is designed to survive maximum physical output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">215,000 PSI Steel</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Industrial precision-ground alloy shafts machined with dual snap-ring collars and smooth needle bearings that handle 2,000 lbs without permanent bend.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center border border-lime-400/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">100% Informed-Choice Tested</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Zero proprietary blends, zero filler carbs, and zero banned substances. Every single production batch is independently HPLC tested for label accuracy.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Lifetime Warranty Guarantee</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We stand behind our steel. Our barbells, power racks, and lever belts are backed by an unconditional lifetime guarantee against manufacturing defects.
            </p>
          </div>
        </div>
      </section>

      {/* Athlete Testimonials */}
      <section className="py-20 bg-zinc-900/50 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              VOICES FROM THE PLATFORM
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">
              TRUSTED BY WORLD-CLASS ATHLETES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/80">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-orange-400">{t.role}</p>
                    <span className="text-[10px] text-zinc-500 font-mono">{t.pr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
