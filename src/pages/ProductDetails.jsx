import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  Zap, 
  Sparkles,
  Share2,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, brand, addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const product = products.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc' | 'reviews'
  
  // Custom reviews list state
  const [customReviews, setCustomReviews] = useState([
    {
      author: 'Marcus Vance (Verified Lifter)',
      date: '3 days ago',
      rating: 5,
      title: 'Built like an absolute tank',
      comment: 'Top tier craftsmanship. Knurling is sharp without tearing up my hands. Delivered in 48 hours.'
    },
    {
      author: 'Sarah Jenkins',
      date: '1 week ago',
      rating: 5,
      title: 'Exceeded all expectations',
      comment: 'Flavor profile is unbeatable and digest is super smooth. Will definitely be a recurring customer.'
    }
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedVariant(product.variants?.[0] || 'Standard');
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          PRODUCT NOT FOUND
        </h2>
        <p className="text-zinc-400 mb-6">
          The requested gym equipment or supplement does not exist or has been retired.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-zinc-950 font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Arsenal</span>
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedSize);
    navigate('/checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      author: `${newReviewAuthor.trim()} (Verified Athlete)`,
      date: 'Just now',
      rating: newReviewRating,
      title: 'Customer Feedback',
      comment: newReviewComment.trim()
    };
    setCustomReviews([newRev, ...customReviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('Thank you! Your athlete review was published.', 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-8">
      <Helmet>
        <title>{product.name} | {brand.name}</title>
        <meta name="description" content={product.shortDesc} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
          <Link to="/shop" className="hover:text-white transition-colors">Arsenal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors text-orange-400">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
          <span className="text-zinc-200 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero: Images & Purchase Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Left Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider bg-orange-500 text-zinc-950 shadow-lg">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-orange-500 shadow-glow-orange scale-105'
                        : 'border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span className="font-bold text-orange-400 uppercase tracking-widest">
                  {product.brand} &bull; {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white"
                  title="Share product link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
                <span className="text-zinc-600">|</span>
                <span className="text-xs font-bold text-lime-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-lime-400 mt-1 inline-block">
                    ⚡ Save ${(product.originalPrice - product.price).toFixed(2)} ({discountPercent}% OFF)
                  </span>
                )}
              </div>

              <span className="text-[11px] text-zinc-400 text-right">
                Taxes calculated at checkout<br />
                <strong className="text-zinc-300 font-semibold">Free shipping over ${brand.freeShippingThreshold}</strong>
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {product.shortDesc}
            </p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Select {product.variantType || 'Option'}:</span>
                  <span className="text-orange-400 font-semibold">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedVariant === v
                          ? 'bg-orange-500 text-zinc-950 font-bold shadow-glow-orange scale-105'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Size / Package:</span>
                  <span className="text-orange-400 font-semibold">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedSize === s
                          ? 'bg-orange-500 text-zinc-950 font-bold shadow-glow-orange scale-105'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 rounded-lg hover:bg-zinc-800 text-zinc-300 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-950 font-display font-bold text-base uppercase tracking-wider shadow-glow-orange flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  <span>Add to Arsenal</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800 hover:border-zinc-700'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-display font-bold text-base uppercase tracking-wider border border-zinc-700 hover:border-orange-500 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span>Instant Checkout</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Dispatch within 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>In Stock & Ready</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info Section: Specs, Full Description, Reviews */}
        <div className="bg-zinc-900/60 rounded-3xl border border-zinc-800 p-6 sm:p-10 mb-16">
          <div className="flex items-center gap-4 sm:gap-8 border-b border-zinc-800 pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm sm:text-base font-display font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Technical Specs & Composition
            </button>
            <button
              onClick={() => setActiveTab('desc')}
              className={`text-sm sm:text-base font-display font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'desc'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Engineering Overview
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm sm:text-base font-display font-bold uppercase tracking-wider pb-2 border-b-2 transition-all ${
                activeTab === 'reviews'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Athlete Reviews ({customReviews.length})
            </button>
          </div>

          {/* Specs Content */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Laboratory & Manufacturing Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs &&
                  Object.entries(product.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        {key}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {val}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Description Content */}
          {activeTab === 'desc' && (
            <div className="max-w-3xl space-y-4 text-zinc-300 leading-relaxed font-sans text-sm sm:text-base">
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Battle-Tested Formulation & Design
              </h3>
              <p>{product.description}</p>
              <p>
                Each component is crafted in certified cGMP facilities or precision CNC machining centers. Designed to withstand thousands of dropping cycles and high sweat environments.
              </p>
            </div>
          )}

          {/* Reviews Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Write a Review Box */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <h4 className="text-base font-display font-bold text-white uppercase">
                  Submit an Athlete Review
                </h4>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name / Athlete Tag"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">Rating:</span>
                      <StarRating
                        rating={newReviewRating}
                        interactive={true}
                        onRatingChange={setNewReviewRating}
                        size="md"
                      />
                    </div>
                  </div>
                  <textarea
                    required
                    rows="3"
                    placeholder="Share how this product performed in your training..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-orange-500 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-glow-orange"
                  >
                    Post Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {customReviews.map((rev, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{rev.author}</span>
                      <span className="text-xs text-zinc-500">{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} size="sm" />
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-2">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-display font-bold text-white uppercase">
                COMPLETE YOUR ARSENAL
              </h3>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-orange-400 hover:text-orange-300"
              >
                More in {product.category} &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
