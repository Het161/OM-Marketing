// 'use client'

// import { useState, useEffect, Suspense } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import { Scale, Package, Wrench, Box } from 'lucide-react'
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
//     id: 'weighing_scale',
//     name: 'Weighing Scales',
//     description: 'All types of scales',
//     icon: Scale,
//     color: 'bg-blue-500'
//   },
//   {
//     id: 'note_counter',
//     name: 'Note Counters',
//     description: 'Currency counting machines',
//     icon: Package,
//     color: 'bg-green-500'
//   },
//   {
//     id: 'accessories',
//     name: 'Accessories',
//     description: 'Parts & components',
//     icon: Wrench,
//     color: 'bg-purple-500'
//   }
// ]

// // Separate component that uses useSearchParams
// function ProductsContent() {
//   const searchParams = useSearchParams()
//   const categoryFromUrl = searchParams.get('category')
  
//   const [products, setProducts] = useState<Product[]>([])
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl)
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
//   const [sortBy, setSortBy] = useState<string>('featured')
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Set category from URL on mount
//   useEffect(() => {
//     if (categoryFromUrl) {
//       setSelectedCategory(categoryFromUrl)
//     }
//   }, [categoryFromUrl])

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true)
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
//         const response = await fetch(`${apiUrl}/api/products/`)
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch products: ${response.status}`)
//         }
        
//         const data = await response.json()
//         setProducts(data)
//         setFilteredProducts(data)
//       } catch (err) {
//         setError('Failed to load products. Please try again later.')
//         console.error('Error fetching products:', err)
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
//           className="absolute top-10 right-10 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full blur-3xl"
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
//           className="absolute bottom-10 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10">
//         {/* Header Section - Mobile Optimized */}
//         {/* Header Section - Mobile Optimized with navbar spacing */}
// <section className="pt-20 sm:pt-24 pb-6 sm:pb-12 px-4 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-sm">
//   <div className="max-w-7xl mx-auto">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900">
//         Our Products
//       </h1>
//       {/* Rest of content... */}

//               <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
//                 {selectedCategory 
//                   ? `Showing ${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`
//                   : 'Browse our complete range of weighing solutions'
//                 }
//               </p>
//               <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">
//                 {filteredProducts.length} product(s) found
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <section className="py-6 sm:py-12 px-4">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
              
//               {/* Sidebar - Hidden on Mobile, Drawer alternative recommended */}
//               <motion.aside
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="hidden lg:block lg:col-span-1"
//               >
//                 <div className="sticky top-24 space-y-6">
                  
//                   {/* Browse Categories */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
//                     <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
//                       <Box className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
//                       Browse Categories
//                     </h3>
                    
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
//                               <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                             </div>
//                             <div className="text-left flex-1">
//                               <div className="font-semibold text-sm sm:text-base">{category.name}</div>
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
//                       className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-xl transition-all text-sm sm:text-base"
//                     >
//                       View All Products →
//                     </button>
//                   </div>

//                   {/* Price Range Filter */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
//                     <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">Price Range</h4>
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
//                       <div className="flex items-center justify-between text-xs sm:text-sm">
//                         <span className="font-medium text-gray-700">₹{priceRange[0].toLocaleString('en-IN')}</span>
//                         <span className="font-medium text-gray-700">₹{priceRange[1].toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sort By */}
//                   <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
//                     <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">Sort By</h4>
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/90 text-gray-700 text-sm sm:text-base"
//                     >
//                       <option value="featured">Featured</option>
//                       <option value="price_low">Price: Low to High</option>
//                       <option value="price_high">Price: High to Low</option>
//                     </select>
//                   </div>
//                 </div>
//               </motion.aside>

//               {/* Mobile Filters - Shown only on mobile */}
//               <div className="lg:hidden col-span-full">
//                 <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-4 mb-4">
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     {/* Category Filter */}
//                     <select
//                       value={selectedCategory || ''}
//                       onChange={(e) => setSelectedCategory(e.target.value || null)}
//                       className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm"
//                     >
//                       <option value="">All Categories</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>{cat.name}</option>
//                       ))}
//                     </select>

//                     {/* Sort */}
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm"
//                     >
//                       <option value="featured">Featured</option>
//                       <option value="price_low">Price: Low to High</option>
//                       <option value="price_high">Price: High to Low</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Products Grid - Mobile Optimized */}
//               <div className="lg:col-span-3">
//                 {loading ? (
//                   <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-cyan-500"></div>
//                   </div>
//                 ) : error ? (
//                   <div className="text-center text-red-500 py-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
//                     <p className="text-lg sm:text-xl font-semibold px-4">{error}</p>
//                     <button
//                       onClick={() => window.location.reload()}
//                       className="mt-4 bg-cyan-500 text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-cyan-600 transition-colors text-sm sm:text-base"
//                     >
//                       Retry
//                     </button>
//                   </div>
//                 ) : filteredProducts.length === 0 ? (
//                   <div className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 px-4">
//                     <Box className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">No Products Found</h3>
//                     <p className="text-gray-600 mb-6 text-sm sm:text-base">Try adjusting your filters</p>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(null)
//                         setPriceRange([0, 100000])
//                         setSortBy('featured')
//                       }}
//                       className="bg-cyan-500 text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-cyan-600 transition-colors text-sm sm:text-base"
//                     >
//                       Clear All Filters
//                     </button>
//                   </div>
//                 ) : (
//                   /* Mobile-Responsive Product Grid */
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
//                     {filteredProducts.map((product, index) => (
//                       <motion.div
//                         key={product.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
//                       >
//                         {/* Product Image */}
//                         <div className="relative h-48 sm:h-56 bg-gray-100">
//                           <Image
//                             src={product.image_url || '/images/placeholder.jpg'}
//                             alt={product.name}
//                             fill
//                             className="object-contain p-4"
//                             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                             priority={index < 3}
//                           />
//                         </div>

//                         {/* Product Info */}
//                         <div className="p-3 sm:p-4 flex-1 flex flex-col">
//                           {/* Category Badge */}
//                           <span className="inline-block px-2 py-1 text-xs font-semibold text-cyan-600 bg-cyan-50 rounded-full mb-2 w-fit">
//                             {product.category.replace('_', ' ').toUpperCase()}
//                           </span>

//                           {/* Product Name - Fixed Overflow */}
//                           <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
//                             {product.name}
//                           </h3>

//                           {/* Product Description - Mobile Hidden, Tablet+ Visible */}
//                           <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
//                             {product.description}
//                           </p>

//                           {/* Price and Stock */}
//                           <div className="mt-auto space-y-2">
//                             <div className="flex items-center justify-between">
//                               <span className="text-lg sm:text-xl font-bold text-cyan-600">
//                                 ₹{product.price.toLocaleString('en-IN')}
//                               </span>
//                               <span className="text-xs sm:text-sm text-gray-500">
//                                 Stock: {product.stock_quantity}
//                               </span>
//                             </div>

//                             {/* View Details Button */}
//                             <Link href={`/products/${product.id}`}>
//                               <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 sm:py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base">
//                                 View Details
//                               </button>
//                             </Link>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action Section - Mobile Optimized */}
//         <section className="py-12 sm:py-16 px-4 mt-8 sm:mt-12">
//           <div className="max-w-7xl mx-auto">
//             <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
//               <div className="relative z-10">
//                 <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">
//                   📦
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 px-4">
//                   Can't Find What You Need?
//                 </h2>
                
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
//                   Contact us for custom orders and bulk pricing
//                 </p>
                
//                 <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
//                   <Link href="/contact">
//                     <button className="bg-white text-teal-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-2xl hover:shadow-white/40 transition-all">
//                       Contact Us
//                     </button>
//                   </Link>
                  
//                   <a href="tel:9825247312">
//                     <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:bg-white hover:text-teal-700 transition-all shadow-2xl">
//                       Call Us
//                     </button>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

// // Main page component with Suspense wrapper
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-cyan-500"></div>
//       </div>
//     }>
//       <ProductsContent />
//     </Suspense>
//   )
// }
































'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Scale, Package, Wrench, Box } from 'lucide-react'
import Link from 'next/link'
import { productApi } from '@/services/api' // ✅ Added

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
    id: 'mobile_accessory', // ✅ Fixed from 'accessories'
    name: 'Mobile Accessories',
    description: 'Parts & components',
    icon: Wrench,
    color: 'bg-purple-500'
  }
]

// Separate component that uses useSearchParams
function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [sortBy, setSortBy] = useState<string>('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false) // ✅ Added

  // Set category from URL on mount
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [categoryFromUrl])

  // ✅ Enhanced fetch with retry logic
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // ✅ Use productApi with built-in retry logic
      const data = await productApi.getAll({
        category: selectedCategory && selectedCategory !== 'all' ? selectedCategory : undefined,
      })
      
      setProducts(data)
      setFilteredProducts(data)
    } catch (err) {
      setError('Unable to load products. The server may be starting up...')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, []) // ✅ Only on mount

  // ✅ Auto-retry if initial load fails
  useEffect(() => {
    if (error && !retrying && products.length === 0) {
      setRetrying(true)
      const timer = setTimeout(() => {
        console.log('Auto-retrying product fetch...')
        fetchProducts().finally(() => setRetrying(false))
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [error, retrying, products.length])

  // Filter products when category, price, or sort changes
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
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
          className="absolute top-10 right-10 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full blur-3xl"
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
          className="absolute bottom-10 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section - Mobile Optimized with navbar spacing */}
        <section className="pt-20 sm:pt-24 pb-6 sm:pb-12 px-4 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900">
                Our Products
              </h1>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
                {selectedCategory 
                  ? `Showing ${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`
                  : 'Browse our complete range of weighing solutions'
                }
              </p>
              <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">
                {filteredProducts.length} product(s) found
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
              
              {/* Sidebar - Hidden on Mobile */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block lg:col-span-1"
              >
                <div className="sticky top-24 space-y-6">
                  
                  {/* Browse Categories */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                      <Box className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
                      Browse Categories
                    </h3>
                    
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
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-semibold text-sm sm:text-base">{category.name}</div>
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
                      className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                      View All Products →
                    </button>
                  </div>

                  {/* Price Range Filter */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
                    <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">Price Range</h4>
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
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">₹{priceRange[0].toLocaleString('en-IN')}</span>
                        <span className="font-medium text-gray-700">₹{priceRange[1].toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6">
                    <h4 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white/90 text-gray-700 text-sm sm:text-base"
                    >
                      <option value="featured">Featured</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </motion.aside>

              {/* Mobile Filters - Shown only on mobile */}
              <div className="lg:hidden col-span-full">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-4 mb-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Category Filter */}
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid - Mobile Optimized */}
              <div className="lg:col-span-3">
                {loading ? (
                  // ✅ Enhanced loading state
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-cyan-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 text-sm sm:text-base">Loading products...</p>
                      {retrying && (
                        <p className="text-cyan-600 text-xs sm:text-sm mt-2">
                          Server is waking up, please wait...
                        </p>
                      )}
                    </div>
                  </div>
                ) : error && products.length === 0 ? (
                  // ✅ Enhanced error state
                  <div className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 px-4">
                    <div className="text-6xl mb-4">⏳</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">Server is Starting Up</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">{error}</p>
                    <button
                      onClick={() => fetchProducts()}
                      className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors text-sm sm:text-base"
                    >
                      Retry Now
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 mt-4">
                      This usually takes 30-60 seconds on first load
                    </p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 sm:py-16 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 px-4">
                    <Box className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">No Products Found</h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">Try adjusting your filters</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setPriceRange([0, 100000])
                        setSortBy('featured')
                      }}
                      className="bg-cyan-500 text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-cyan-600 transition-colors text-sm sm:text-base"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  /* Mobile-Responsive Product Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
                      >
                        {/* Product Image */}
                        <div className="relative h-48 sm:h-56 bg-gray-100">
                          <Image
                            src={product.image_url || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index < 3}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-3 sm:p-4 flex-1 flex flex-col">
                          {/* Category Badge */}
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-cyan-600 bg-cyan-50 rounded-full mb-2 w-fit">
                            {product.category.replace('_', ' ').toUpperCase()}
                          </span>

                          {/* Product Name */}
                          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>

                          {/* Product Description - Mobile Hidden, Tablet+ Visible */}
                          <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          {/* Price and Stock */}
                          <div className="mt-auto space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-lg sm:text-xl font-bold text-cyan-600">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500">
                                Stock: {product.stock_quantity}
                              </span>
                            </div>

                            {/* View Details Button */}
                            <Link href={`/products/${product.id}`}>
                              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 sm:py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base">
                                View Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section - Mobile Optimized */}
        <section className="py-12 sm:py-16 px-4 mt-8 sm:mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">
                  📦
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 px-4">
                  Can't Find What You Need?
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
                  Contact us for custom orders and bulk pricing
                </p>
                
                <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
                  <Link href="/contact">
                    <button className="bg-white text-teal-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-2xl hover:shadow-white/40 transition-all">
                      Contact Us
                    </button>
                  </Link>
                  
                  <a href="tel:9825247312">
                    <button className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg hover:bg-white hover:text-teal-700 transition-all shadow-2xl">
                      Call Us
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Main page component with Suspense wrapper
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-cyan-500"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
