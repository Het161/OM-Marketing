'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { Scale, Package, Wrench, Box } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  stock_quantity: number
  image_url: string
}

interface Category {
  id: string
  name: string
  description: string
  icon: any
  color: string
}

const categories: Category[] = [
  {
    id: 'weighing_scale',
    name: 'Weighing Scales',
    description: 'All types of scales',
    icon: Scale,
    color: 'bg-blue-500'
  },
  {
    id: 'note_counter',
    name: 'Note Counters',
    description: 'Currency counting machines',
    icon: Package,
    color: 'bg-green-500'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Parts & components',
    icon: Wrench,
    color: 'bg-purple-500'
  }
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Set category from URL on mount
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://127.0.0.1:8000/api/products/')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        setError('Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products when category, price, or sort changes
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sort products
    if (sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, priceRange, sortBy, products])

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Visible Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"
        />
        
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            style={{
              backgroundImage: `
                linear-gradient(to right, #3b82f6 1px, transparent 1px),
                linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="py-12 px-4 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
                Our Products
              </h1>
              <p className="text-gray-700 text-lg">
                {selectedCategory 
                  ? `Showing ${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`
                  : 'Browse our complete range of weighing solutions'
                }
              </p>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} product(s) found
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Sidebar - Categories */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-6">
                  
                  {/* Browse Categories */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                      <Box className="w-6 h-6 text-cyan-600" />
                      Browse Categories
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Find the perfect weighing solution
                    </p>
                    
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const Icon = category.icon
                        const isSelected = selectedCategory === category.id
                        
                        return (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : category.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-semibold">{category.name}</div>
                              <div className={`text-xs ${isSelected ? 'text-cyan-50' : 'text-gray-500'}`}>
                                {category.description}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* View All Products Button */}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      View All Products →
                    </button>
                  </div>

                  {/* Price Range Filter */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
                    <h4 className="font-semibold text-gray-700 mb-4">Price Range</h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="w-full accent-cyan-500"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">₹{priceRange[0].toLocaleString('en-IN')}</span>
                        <span className="font-medium text-gray-700">₹{priceRange[1].toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
                    <h4 className="font-semibold text-gray-700 mb-4">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/90 text-gray-700"
                    >
                      <option value="featured">Featured</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setPriceRange([0, 100000])
                        setSortBy('featured')
                      }}
                      className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </motion.aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500"></div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
                    <p className="text-xl font-semibold">{error}</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50"
                  >
                    <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">No Products Found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setPriceRange([0, 100000])
                        setSortBy('featured')
                      }}
                      className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard {...product} priority={index < 3} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 px-4 mt-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-7xl mb-6 filter drop-shadow-2xl"
                >
                  📦
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{
                  textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)'
                }}>
                  Can't Find What You Need?
                </h2>
                
                <p className="text-xl md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto" style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.4)'
                }}>
                  Contact us for custom orders and bulk pricing
                </p>
                
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-teal-700 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/40 transition-all flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </motion.button>
                  </Link>
                  
                  <a href="tel:9825247312">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teal-700 transition-all shadow-2xl flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: 98252 47312
                    </motion.button>
                  </a>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <a href="https://wa.me/919825247312?text=Hi%2C%20I'm%20interested%20in%20your%20products" target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-green-600 transition-all inline-flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat on WhatsApp
                    </motion.button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}













// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import ProductCard from '@/components/ProductCard'
// import { Scale, Package, Factory, Gauge, Wrench, Box, Cpu, Settings } from 'lucide-react'
// import Link from 'next/link'

// interface Product {
//   id: number
//   name: string
//   category: string
//   description: string
//   price: number
//   stock_quantity: number
//   image_url: string
// }

// interface Category {
//   id: string
//   name: string
//   description: string
//   icon: any
//   color: string
// }

// const categories: Category[] = [
//   {
//     id: 'table_top_scales',
//     name: 'Table Top Scales',
//     description: 'Compact & precise',
//     icon: Scale,
//     color: 'bg-blue-500'
//   },
//   {
//     id: 'platform_scales',
//     name: 'Platform Scales',
//     description: 'Heavy-duty weighing',
//     icon: Package,
//     color: 'bg-green-500'
//   },
//   {
//     id: 'industrial_scales',
//     name: 'Industrial Scales',
//     description: 'Large-scale operations',
//     icon: Factory,
//     color: 'bg-purple-500'
//   },
//   {
//     id: 'digital_weighing',
//     name: 'Digital Weighing',
//     description: 'Advanced digital tech',
//     icon: Cpu,
//     color: 'bg-orange-500'
//   },
//   {
//     id: 'mechanical_scales',
//     name: 'Mechanical Scales',
//     description: 'Reliable & durable',
//     icon: Settings,
//     color: 'bg-gray-600'
//   },
//   {
//     id: 'crane_scales',
//     name: 'Crane Scales',
//     description: 'Hanging weight systems',
//     icon: Gauge,
//     color: 'bg-yellow-500'
//   },
//   {
//     id: 'accessories',
//     name: 'Accessories',
//     description: 'Parts & components',
//     icon: Wrench,
//     color: 'bg-cyan-500'
//   }
// ]

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
//   const [sortBy, setSortBy] = useState<string>('featured')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('http://127.0.0.1:8000/api/products/')
//         if (!response.ok) throw new Error('Failed to fetch products')
//         const data = await response.json()
//         setProducts(data)
//         setFilteredProducts(data)
//       } catch (err) {
//         setError('Failed to load products')
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   // Filter products when category, price, or sort changes
//   useEffect(() => {
//     let filtered = products

//     // Filter by category
//     if (selectedCategory) {
//       filtered = filtered.filter(p => p.category === selectedCategory)
//     }

//     // Filter by price range
//     filtered = filtered.filter(
//       p => p.price >= priceRange[0] && p.price <= priceRange[1]
//     )

//     // Sort products
//     if (sortBy === 'price_low') {
//       filtered = [...filtered].sort((a, b) => a.price - b.price)
//     } else if (sortBy === 'price_high') {
//       filtered = [...filtered].sort((a, b) => b.price - a.price)
//     }

//     setFilteredProducts(filtered)
//   }, [selectedCategory, priceRange, sortBy, products])

//   // Handle category click
//   const handleCategoryClick = (categoryId: string) => {
//     if (selectedCategory === categoryId) {
//       setSelectedCategory(null)
//     } else {
//       setSelectedCategory(categoryId)
//     }
//   }

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Enhanced Visible Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50" />
        
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 50, 0],
//             y: [0, -30, 0],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute top-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full blur-3xl"
//         />
        
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{
//             duration: 18,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"
//         />
        
//         <div className="absolute inset-0 opacity-[0.03]">
//           <div 
//             style={{
//               backgroundImage: `
//                 linear-gradient(to right, #3b82f6 1px, transparent 1px),
//                 linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
//               `,
//               backgroundSize: '60px 60px'
//             }}
//             className="w-full h-full"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10">
//         {/* Header Section */}
//         <section className="py-12 px-4 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-sm">
//           <div className="max-w-7xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
//                 Our Products
//               </h1>
//               <p className="text-gray-700 text-lg">
//                 {selectedCategory 
//                   ? `Showing ${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`
//                   : 'Browse our complete range of weighing solutions'
//                 }
//               </p>
//               <p className="text-gray-600 mt-2">
//                 {filteredProducts.length} product(s) found
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <section className="py-12 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-4 gap-8">
              
//               {/* Sidebar - Categories */}
//               <motion.aside
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="lg:col-span-1"
//               >
//                 <div className="sticky top-24 space-y-6">
                  
//                   {/* Browse Categories */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
//                     <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
//                       <Box className="w-6 h-6 text-cyan-600" />
//                       Browse Categories
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-4">
//                       Find the perfect weighing solution
//                     </p>
                    
//                     <div className="space-y-2">
//                       {categories.map((category) => {
//                         const Icon = category.icon
//                         const isSelected = selectedCategory === category.id
                        
//                         return (
//                           <button
//                             key={category.id}
//                             onClick={() => handleCategoryClick(category.id)}
//                             className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
//                               isSelected
//                                 ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
//                                 : 'hover:bg-gray-100 text-gray-700'
//                             }`}
//                           >
//                             <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : category.color}`}>
//                               <Icon className="w-5 h-5 text-white" />
//                             </div>
//                             <div className="text-left flex-1">
//                               <div className="font-semibold">{category.name}</div>
//                               <div className={`text-xs ${isSelected ? 'text-cyan-50' : 'text-gray-500'}`}>
//                                 {category.description}
//                               </div>
//                             </div>
//                           </button>
//                         )
//                       })}
//                     </div>

//                     {/* View All Products Button */}
//                     <button
//                       onClick={() => setSelectedCategory(null)}
//                       className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
//                     >
//                       View All Products →
//                     </button>
//                   </div>

//                   {/* Price Range Filter */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
//                     <h4 className="font-semibold text-gray-700 mb-4">Price Range</h4>
//                     <div className="space-y-4">
//                       <input
//                         type="range"
//                         min="0"
//                         max="100000"
//                         step="1000"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//                         className="w-full accent-cyan-500"
//                       />
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="font-medium text-gray-700">₹{priceRange[0].toLocaleString('en-IN')}</span>
//                         <span className="font-medium text-gray-700">₹{priceRange[1].toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sort By */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
//                     <h4 className="font-semibold text-gray-700 mb-4">Sort By</h4>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/90 text-gray-700"
//                     >
//                       <option value="featured">Featured</option>
//                       <option value="price_low">Price: Low to High</option>
//                       <option value="price_high">Price: High to Low</option>
//                     </select>
//                   </div>

//                   {/* Clear Filters */}
//                   {selectedCategory && (
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(null)
//                         setPriceRange([0, 100000])
//                         setSortBy('featured')
//                       }}
//                       className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-semibold"
//                     >
//                       Clear Filters
//                     </button>
//                   )}
//                 </div>
//               </motion.aside>

//               {/* Products Grid */}
//               <div className="lg:col-span-3">
//                 {loading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500"></div>
//                   </div>
//                 ) : error ? (
//                   <div className="text-center text-red-500 py-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
//                     <p className="text-xl font-semibold">{error}</p>
//                   </div>
//                 ) : filteredProducts.length === 0 ? (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50"
//                   >
//                     <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold mb-2 text-gray-900">No Products Found</h3>
//                     <p className="text-gray-600 mb-6">Try adjusting your filters</p>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(null)
//                         setPriceRange([0, 100000])
//                         setSortBy('featured')
//                       }}
//                       className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
//                     >
//                       Clear All Filters
//                     </button>
//                   </motion.div>
//                 ) : (
//                   <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//                     {filteredProducts.map((product, index) => (
//                       <motion.div
//                         key={product.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <ProductCard {...product} priority={index < 3} />
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action Section */}
//         <section className="py-16 px-4 mt-12">
//           <div className="max-w-7xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl overflow-hidden"
//             >
//               <motion.div
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   rotate: [0, 90, 0],
//                 }}
//                 transition={{
//                   duration: 10,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"
//               />
//               <motion.div
//                 animate={{
//                   scale: [1, 1.3, 1],
//                   rotate: [0, -90, 0],
//                 }}
//                 transition={{
//                   duration: 12,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"
//               />
              
//               <div className="relative z-10">
//                 <motion.div
//                   animate={{
//                     y: [0, -10, 0],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                   className="text-7xl mb-6 filter drop-shadow-2xl"
//                 >
//                   📦
//                 </motion.div>

//                 <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{
//                   textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)'
//                 }}>
//                   Can't Find What You Need?
//                 </h2>
                
//                 <p className="text-xl md:text-2xl text-white font-medium mb-10 max-w-2xl mx-auto" style={{
//                   textShadow: '0 2px 20px rgba(0,0,0,0.4)'
//                 }}>
//                   Contact us for custom orders and bulk pricing
//                 </p>
                
//                 <div className="flex gap-4 justify-center flex-wrap">
//                   <Link href="/contact">
//                     <motion.button
//                       whileHover={{ scale: 1.05, y: -3 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-white text-teal-700 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/40 transition-all flex items-center gap-3"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Contact Us
//                     </motion.button>
//                   </Link>
                  
//                   <a href="tel:9825247312">
//                     <motion.button
//                       whileHover={{ scale: 1.05, y: -3 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teal-700 transition-all shadow-2xl flex items-center gap-3"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                       Call: 98252 47312
//                     </motion.button>
//                   </a>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-6"
//                 >
//                   <a href="https://wa.me/919825247312?text=Hi%2C%20I'm%20interested%20in%20your%20products" target="_blank" rel="noopener noreferrer">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-green-600 transition-all inline-flex items-center gap-2"
//                     >
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//                       </svg>
//                       Chat on WhatsApp
//                     </motion.button>
//                   </a>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }
