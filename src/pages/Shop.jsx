import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  Search, 
  Check, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { products, brand, wishlist } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Local filter states
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  const wishlistParam = searchParams.get('wishlist') === 'true';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [maxPrice, setMaxPrice] = useState(600);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);
  const [onlyWishlist, setOnlyWishlist] = useState(wishlistParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with searchParams changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
    setSearchTerm(searchParams.get('search') || '');
    setOnlyWishlist(searchParams.get('wishlist') === 'true');
    setSortBy(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  // Categories list
  const categories = ['All', 'Supplements', 'Equipment', 'Accessories', 'Apparel'];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand?.toLowerCase().includes(query);
        const matchesDesc = p.shortDesc?.toLowerCase().includes(query);
        const matchesVariants = p.variants?.some((v) => v.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesVariants) {
          return false;
        }
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      // In stock
      if (onlyInStock && p.stock <= 0) {
        return false;
      }

      // Best sellers
      if (onlyBestSellers && !p.isBestSeller) {
        return false;
      }

      // Wishlist
      if (onlyWishlist && !wishlist.includes(p.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0; // featured
    });
  }, [products, selectedCategory, searchTerm, maxPrice, onlyInStock, onlyBestSellers, onlyWishlist, wishlist, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setMaxPrice(600);
    setOnlyInStock(false);
    setOnlyBestSellers(false);
    setOnlyWishlist(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-8">
      <Helmet>
        <title>Shop The Arsenal | {brand.name}</title>
        <meta name="description" content="Browse our complete catalog of Olympic barbells, hydrolyzed whey, lever belts, and elite fitness gear." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
              <span>{brand.name} Catalog</span>
              <span>&bull;</span>
              <span>{filteredProducts.length} Items Found</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase tracking-tight">
              THE ARSENAL
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Battle-grade barbell equipment, clinically pure supplements, and tactical accessories.
            </p>
          </div>

          {/* Quick Category Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-orange-500 text-zinc-950 shadow-glow-orange scale-105'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/80 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter name, flavor, brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const active = selectedCategory.toLowerCase() === cat.toLowerCase();
                  const count = cat === 'All' 
                    ? products.length 
                    : products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-300 uppercase tracking-wider">Max Price</span>
                <span className="font-display font-bold text-orange-400 text-sm">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer bg-zinc-800 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>$20</span>
                <span>$300</span>
                <span>$600</span>
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-3 pt-3 border-t border-zinc-800 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={(e) => setOnlyWishlist(e.target.checked)}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-0 accent-orange-500 w-4 h-4 cursor-pointer"
                />
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Saved Wishlist ({wishlist.length})</span>
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={onlyBestSellers}
                  onChange={(e) => setOnlyBestSellers(e.target.checked)}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-0 accent-orange-500 w-4 h-4 cursor-pointer"
                />
                <span>Best Sellers Only</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-zinc-700 text-orange-500 focus:ring-0 accent-orange-500 w-4 h-4 cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>
            </div>

          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Controls Bar: Mobile filter button + Sort dropdown */}
            <div className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-200"
              >
                <Filter className="w-3.5 h-3.5 text-orange-500" />
                <span>Filters ({selectedCategory !== 'All' || onlyWishlist ? 'Active' : 'All'})</span>
              </button>

              <div className="text-xs text-zinc-400 hidden sm:block">
                Showing <strong className="text-white">{filteredProducts.length}</strong> items
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-zinc-400 font-medium hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 font-semibold focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="featured">Featured (Default)</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  NO BATTLE GEAR MATCHES YOUR CRITERIA
                </h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Try adjusting your price range, clearing your search query, or resetting filters to view all products.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-glow-orange hover:bg-orange-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

          </main>

        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-xs bg-zinc-950 h-full p-6 overflow-y-auto space-y-6 border-l border-zinc-800 animate-in slide-in-from-right">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <h3 className="text-lg font-display font-bold text-white uppercase">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter content */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Categories</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => handleCategoryClick(c)}
                        className={`p-2 rounded text-xs font-bold ${
                          selectedCategory.toLowerCase() === c.toLowerCase()
                            ? 'bg-orange-500 text-zinc-950'
                            : 'bg-zinc-900 text-zinc-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Max Price</span>
                    <span className="font-bold text-orange-400">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={onlyWishlist}
                      onChange={(e) => setOnlyWishlist(e.target.checked)}
                      className="accent-orange-500"
                    />
                    <span>Saved Wishlist ({wishlist.length})</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={onlyBestSellers}
                      onChange={(e) => setOnlyBestSellers(e.target.checked)}
                      className="accent-orange-500"
                    />
                    <span>Best Sellers</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="accent-orange-500"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full py-3 rounded-xl bg-orange-500 text-zinc-950 font-bold text-xs uppercase"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={() => {
                      handleResetFilters();
                      setMobileFilterOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-400 text-xs font-bold"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
