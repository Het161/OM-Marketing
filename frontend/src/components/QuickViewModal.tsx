// // frontend/src/components/QuickViewModal.tsx

// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import Image from 'next/image'
// import Link from 'next/link'
// import { FiX, FiShoppingCart, FiEye } from 'react-icons/fi'
// import { productApi } from '@/services/api'
// import { useCartStore } from '@/store/cartStore'

// interface QuickViewModalProps {
//   productId: number
//   onClose: () => void
// }

// export default function QuickViewModal({ productId, onClose }: QuickViewModalProps) {
//   const [product, setProduct] = useState<any>(null)
//   const [loading, setLoading] = useState(true)
//   const [quantity, setQuantity] = useState(1)
//   const [isAdding, setIsAdding] = useState(false)
  
//   const addItem = useCartStore((state) => state.addItem)
  
//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         setLoading(true)
//         const data = await productApi.getById(productId)
//         setProduct(data)
//       } catch (err) {
//         console.error('Error fetching product:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchProduct()
//   }, [productId])
  
//   const handleAddToCart = () => {
//     if (!product) return
    
//     setIsAdding(true)
    
//     for (let i = 0; i < quantity; i++) {
//       addItem({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//         image_url: product.image_url,
//         category: product.category,
//       })
//     }
    
//     setTimeout(() => {
//       setIsAdding(false)
//       onClose()
//     }, 1000)
//   }
  
//   const specifications = product?.specifications 
//     ? JSON.parse(product.specifications) 
//     : {}
  
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//           >
//             <FiX size={24} />
//           </button>
          
//           {loading ? (
//             <div className="flex items-center justify-center p-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
//             </div>
//           ) : product ? (
//             <div className="grid md:grid-cols-2 gap-8 p-8">
//               {/* Product Image */}
//               <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
//                 <Image
//                   src={product.image_url || '/images/placeholder.jpg'}
//                   alt={product.name}
//                   fill
//                   className="object-contain p-4"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
                
//                 {/* Stock Badge */}
//                 {product.stock_quantity === 0 && (
//                   <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
//                     Out of Stock
//                   </div>
//                 )}
                
//                 {product.stock_quantity > 0 && product.stock_quantity < 10 && (
//                   <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                     Only {product.stock_quantity} left!
//                   </div>
//                 )}
//               </div>
              
//               {/* Product Info */}
//               <div className="flex flex-col">
//                 {/* Category */}
//                 <div className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 self-start uppercase">
//                   {product.category.replace('_', ' ')}
//                 </div>
                
//                 <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                
//                 {/* Price */}
//                 <div className="flex items-baseline gap-3 mb-6">
//                   <span className="text-4xl font-bold text-cyan-600">
//                     ₹{product.price.toLocaleString('en-IN')}
//                   </span>
//                   <span className="text-gray-400 line-through text-lg">
//                     ₹{(product.price * 1.2).toLocaleString('en-IN')}
//                   </span>
//                   <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
//                     Save 20%
//                   </span>
//                 </div>
                
//                 {/* Description */}
//                 <p className="text-gray-600 mb-6 line-clamp-3">
//                   {product.description || 'No description available.'}
//                 </p>
                
//                 {/* Specifications (if any) */}
//                 {Object.keys(specifications).length > 0 && (
//                   <div className="mb-6">
//                     <h4 className="font-semibold mb-2">Key Specifications:</h4>
//                     <div className="space-y-2">
//                       {Object.entries(specifications).slice(0, 3).map(([key, value]) => (
//                         <div key={key} className="flex justify-between text-sm">
//                           <span className="text-gray-600 capitalize">
//                             {key.replace('_', ' ')}:
//                           </span>
//                           <span className="font-medium">{value as string}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Quantity Selector */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold mb-2">Quantity</label>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-cyan-500 transition-colors font-bold"
//                       disabled={product.stock_quantity === 0}
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       min="1"
//                       max={product.stock_quantity}
//                       value={quantity}
//                       onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                       className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none font-semibold"
//                       disabled={product.stock_quantity === 0}
//                     />
//                     <button
//                       onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
//                       className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-cyan-500 transition-colors font-bold"
//                       disabled={product.stock_quantity === 0}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Action Buttons */}
//                 <div className="flex gap-3 mt-auto">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleAddToCart}
//                     disabled={product.stock_quantity === 0 || isAdding}
//                     className="flex-1 bg-cyan-500 text-white py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isAdding ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <FiShoppingCart />
//                         Add to Cart
//                       </>
//                     )}
//                   </motion.button>
                  
//                   <Link href={`/products/${product.id}`}>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
//                     >
//                       <FiEye />
//                       Details
//                     </motion.button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="p-12 text-center">
//               <p className="text-gray-600">Product not found</p>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   )
// }









// frontend/src/components/QuickViewModal.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiX, FiEye, FiMessageCircle, FiPhone } from 'react-icons/fi'
import { productApi } from '@/services/api'

interface QuickViewModalProps {
  productId: number
  onClose: () => void
}

export default function QuickViewModal({ productId, onClose }: QuickViewModalProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const data = await productApi.getById(productId)
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [productId])
  
  const specifications = product?.specifications 
    ? JSON.parse(product.specifications) 
    : {}
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <FiX size={24} />
          </button>
          
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
            </div>
          ) : product ? (
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={product.image_url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Stock Badge */}
                {product.stock_quantity === 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                    Out of Stock
                  </div>
                )}
                
                {product.stock_quantity > 0 && product.stock_quantity < 10 && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Only {product.stock_quantity} left!
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="flex flex-col">
                {/* Category */}
                <div className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 self-start uppercase">
                  {product.category.replace('_', ' ')}
                </div>
                
                <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                
                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-cyan-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    ₹{(product.price * 1.2).toLocaleString('en-IN')}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                    Save 20%
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {product.description || 'No description available.'}
                </p>
                
                {/* Specifications (if any) */}
                {Object.keys(specifications).length > 0 && (
                  <div className="mb-6 flex-1">
                    <h4 className="font-semibold mb-3 text-lg">Key Specifications:</h4>
                    <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                      {Object.entries(specifications).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm border-b border-gray-200 pb-2">
                          <span className="text-gray-600 capitalize font-medium">
                            {key.replace('_', ' ')}:
                          </span>
                          <span className="font-semibold text-gray-900">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* WhatsApp Inquiry */}
                  <a
                    href={`https://wa.me/919825247312?text=${encodeURIComponent(
                      `Hi! I'm interested in ${product.name}. Can you provide more details?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle size={20} />
                      Inquire on WhatsApp
                    </motion.button>
                  </a>
                  
                  <div className="flex gap-3">
                    {/* Call Button */}
                    <a href="tel:9825247312" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-cyan-500 text-white py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiPhone size={18} />
                        Call Now
                      </motion.button>
                    </a>
                    
                    {/* View Details */}
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiEye size={18} />
                        Details
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600">Product not found</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
