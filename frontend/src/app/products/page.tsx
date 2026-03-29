'use client'

import { useState, useEffect, Suspense, memo, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { Scale, Package, Wrench, Box, ArrowRight, SlidersHorizontal, Factory, Gauge, Settings, Anchor, Award } from 'lucide-react'
import Link from 'next/link'
import { productApi } from '@/services/api'

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  stock_quantity: number
  image_url: string
  specifications: string
}

interface Subcategory {
  id: string
  name: string
  description: string
  icon: any
  colorClass: string
}

interface Category {
  id: string
  name: string
  description: string
  icon: any
  color: string
  bgLight: string
  subcategories?: Subcategory[]
}

const categories: Category[] = [
  {
    id: 'weighing_scale',
    name: 'Weighing Scales',
    description: 'All types of scales',
    icon: Scale,
    color: 'bg-gradient-to-br from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    subcategories: [
      { id: 'table top', name: 'Table Top Scales', description: 'Compact & precise', icon: Scale, colorClass: 'bg-[#0080FF] text-white' },
      { id: 'platform', name: 'Platform Scales', description: 'Heavy-duty weighing', icon: Package, colorClass: 'bg-[#00A35C] text-white' },
      { id: 'industrial', name: 'Industrial Scales', description: 'Large-scale operations', icon: Factory, colorClass: 'bg-[#8A2BE2] text-white' },
      { id: 'digital', name: 'Digital Weighing', description: 'Advanced digital tech', icon: Gauge, colorClass: 'bg-[#FF6B00] text-white' },
      { id: 'mechanical', name: 'Mechanical Scales', description: 'Reliable & durable', icon: Settings, colorClass: 'bg-[#556B2F] text-white' },
      { id: 'crane', name: 'Crane Scales', description: 'Hanging weight systems', icon: Anchor, colorClass: 'bg-[#DAA520] text-white' },
      { id: 'accessories', name: 'Accessories', description: 'Parts & components', icon: Award, colorClass: 'bg-[#008B8B] text-white' },
    ]
  },
  {
    id: 'note_counter',
    name: 'Note Counters',
    description: 'Currency counting machines',
    icon: Package,
    color: 'bg-gradient-to-br from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50'
  },
  {
    id: 'mobile_accessory',
    name: 'Mobile Accessories',
    description: 'Parts & components',
    icon: Wrench,
    color: 'bg-gradient-to-br from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50'
  }
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

const ProductCard = memo(({ product, index }: { product: Product; index: number }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay: Math.min(index * 0.03, 0.2) }}
  >
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer h-full flex flex-col"
      >
        {/* Product Image */}
        <div className="relative h-52 bg-gray-50">
          <Image
            src={product.image_url || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3}
            loading={index < 6 ? 'eager' : 'lazy'}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <span className="inline-block px-2.5 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded-lg mb-2.5 w-fit">
            {product.category.replace('_', ' ').toUpperCase()}
          </span>

          <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem] group-hover:text-teal-700 transition-colors">
            {product.name}
          </h3>

          <p className="hidden sm:block text-xs text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400 ml-1.5">
                Stock: {product.stock_quantity}
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  </motion.div>
))

ProductCard.displayName = 'ProductCard'

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false)

  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productApi.getAll()
      setProducts(data)
    } catch (err) {
      setError('Unable to load products. Please try again.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  useEffect(() => {
    if (error && !retrying && products.length === 0) {
      setRetrying(true)
      const timer = setTimeout(() => {
        fetchProducts().finally(() => setRetrying(false))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error, retrying, products.length])

  const filteredProducts = useMemo(() => {
    let filtered = products
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    // Subcategory search filtering
    if (selectedSubcategory) {
      const term = selectedSubcategory.toLowerCase();
      filtered = filtered.filter(p => 
        (p.name && p.name.toLowerCase().includes(term)) || 
        (p.description && p.description.toLowerCase().includes(term)) ||
        (p.specifications && p.specifications.toLowerCase().includes(term))
      );
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }
    return filtered
  }, [selectedCategory, selectedSubcategory, priceRange, sortBy, products])

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
    } else {
      setSelectedCategory(categoryId)
      setSelectedSubcategory(null)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-8 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block text-teal-600 font-semibold text-sm tracking-wider uppercase mb-2">
              Our Collection
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
                : 'All Products'
              }
            </h1>
            <p className="text-gray-400 text-sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">

                {/* Categories */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Box className="w-4 h-4 text-teal-500" />
                    Categories
                  </h3>

                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isSelected = selectedCategory === category.id

                      return (
                        <div key={category.id} className="space-y-1">
                          <button
                            onClick={() => handleCategoryClick(category.id)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                              isSelected
                                ? 'bg-teal-50 text-teal-700 shadow-sm'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-teal-500 text-white' : category.color + ' text-white'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="text-sm font-medium">{category.name}</div>
                              <div className="text-xs text-gray-400">{category.description}</div>
                            </div>
                            {category.subcategories && (
                              <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                            )}
                          </button>
                          
                          {/* Subcategories Dropdown */}
                          {isSelected && category.subcategories && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="pl-2 pr-1 space-y-1 pt-2 pb-1 border-l-2 border-teal-100 ml-4 max-h-80 overflow-y-auto custom-scrollbar"
                            >
                              {category.subcategories.map((sub) => {
                                const SubIcon = sub.icon;
                                const isSubSelected = selectedSubcategory === sub.id;
                                
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => setSelectedSubcategory(isSubSelected ? null : sub.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all border ${
                                      isSubSelected 
                                        ? 'bg-white border-teal-200 shadow-sm ring-1 ring-teal-500/10' 
                                        : 'bg-transparent border-transparent hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3 text-left">
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${sub.colorClass}`}>
                                        <SubIcon className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <div className={`text-sm font-semibold ${isSubSelected ? 'text-teal-700' : 'text-gray-900'}`}>{sub.name}</div>
                                        <div className="text-xs text-gray-500">{sub.description}</div>
                                      </div>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 ${isSubSelected ? 'text-teal-500' : 'text-gray-300'}`} />
                                  </button>
                                );
                              })}
                              
                              {/* View All Button for Subcategories */}
                              {selectedSubcategory && (
                                <button
                                  onClick={() => setSelectedSubcategory(null)}
                                  className="w-full mt-2 bg-teal-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                                >
                                  View All Categories
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="w-full mt-4 btn-primary py-2.5 text-sm"
                  >
                    View All →
                  </button>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <SlidersHorizontal className="w-4 h-4 text-teal-500" />
                    Price Range
                  </h4>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-teal-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Sort */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-700 text-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Mobile Filters */}
            <div className="lg:hidden col-span-full">
              <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4">
                <div className="flex gap-2">
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low → High</option>
                    <option value="price_high">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="h-52 skeleton-shimmer" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 skeleton-shimmer rounded-lg w-1/3" />
                        <div className="h-5 skeleton-shimmer rounded-lg w-3/4" />
                        <div className="h-4 skeleton-shimmer rounded-lg w-1/2" />
                        <div className="h-9 skeleton-shimmer rounded-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error && products.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <span className="text-3xl">⏳</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Connection Issue</h3>
                  <p className="text-gray-400 mb-6 text-sm">{error}</p>
                  <button
                    onClick={() => fetchProducts()}
                    className="btn-primary px-8 py-2.5 text-sm"
                  >
                    Retry Now
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">No Products Found</h3>
                  <p className="text-gray-400 mb-6 text-sm">Try adjusting your filters</p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setPriceRange([0, 100000])
                      setSortBy('featured')
                    }}
                    className="btn-primary px-6 py-2.5 text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #0e2f3c 30%, #0d5e52 70%, #0d9488 100%)',
          }}>
            <div className="relative z-10 text-center py-14 px-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                Can&apos;t Find What You Need?
              </h2>
              <p className="text-base text-white/60 mb-8 max-w-lg mx-auto">
                Contact us for custom orders and bulk pricing
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/contact">
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all">
                    Contact Us
                  </button>
                </Link>
                <a href="tel:9825247312">
                  <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-2xl font-semibold text-sm hover:bg-white/20 transition-all">
                    Call Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}