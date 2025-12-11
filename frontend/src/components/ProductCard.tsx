// // frontend/src/components/ProductCard.tsx

// /**
//  * Product Card Component with Animations
//  * This displays a single product with hover effects and animations
//  * Think of it as a 'component class' that can be reused everywhere!
//  */

// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
// import { FiShoppingCart, FiEye } from 'react-icons/fi';
// import { useCartStore } from '@/store/cartStore';
// import { useState } from 'react';

// interface ProductCardProps {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image_url: string;
//   description?: string;
//   stock_quantity: number;
//   priority?: boolean;
// }

// /**
//  * Individual Product Card Component
//  */
// export default function ProductCard({
//   id,
//   name,
//   category,
//   price,
//   image_url,
//   description,
//   stock_quantity,
//   priority = false,
// }: ProductCardProps) {
//   const addItem = useCartStore((state) => state.addItem);
//   const [isAdding, setIsAdding] = useState(false);
  
//   // Handle add to cart with animation feedback
//   const handleAddToCart = async () => {
//     setIsAdding(true);
    
//     addItem({
//       id,
//       name,
//       price,
//       quantity: 1,
//       image_url,
//       category,
//     });
    
//     // Reset animation after 1 second
//     setTimeout(() => setIsAdding(false), 1000);
//   };
  
//   // Category badge color
//   const getCategoryColor = (cat: string) => {
//     switch (cat) {
//       case 'weighing_scale':
//         return 'bg-primary-500';
//       case 'note_counter':
//         return 'bg-accent-500';
//       case 'mobile_accessory':
//         return 'bg-purple-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       whileHover={{ y: -8 }}
//        className="card group h-full flex flex-col overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 transition-all"
//     >
//       {/* Stock Badge */}
//       {stock_quantity === 0 && (
//         <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//           Out of Stock
//         </div>
//       )}
      
//       {/* Category Badge */}
//       <div className={`absolute top-4 right-4 z-10 ${getCategoryColor(category)} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
//         {category.replace('_', ' ')}
//       </div>
      
//       {/* Product Image */}
//       <div className="relative h-64 overflow-hidden bg-gray-100">
//         <Image
//           src={image_url || '/images/placeholder.jpg'}
//           alt={name}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//           priority={priority}
//           className="object-contain transition-transform duration-500 group-hover:scale-110"
//         />
        
//         {/* Hover overlay with action buttons */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileHover={{ opacity: 1 }}
//           className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
//         >
//           <Link href={`/products/${id}`}>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-primary-500 p-3 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
//             >
//               <FiEye size={20} />
//             </motion.button>
//           </Link>
          
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleAddToCart}
//             disabled={stock_quantity === 0 || isAdding}
//             className="bg-accent-500 text-white p-3 rounded-full hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isAdding ? (
//               <div className="spinner w-5 h-5 border-2" />
//             ) : (
//               <FiShoppingCart size={20} />
//             )}
//           </motion.button>
//         </motion.div>
//       </div>
      
//       {/* Product Details */}
//       <div className="p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
//           {name}
//         </h3>
        
//         {description && (
//           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//             {description}
//           </p>
//         )}
        
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-primary-500">
//             ₹{price.toLocaleString('en-IN')}
//           </div>
          
//           {stock_quantity > 0 && stock_quantity < 10 && (
//             <div className="text-sm text-red-500 font-medium">
//               Only {stock_quantity} left!
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Add to Cart Success Animation */}
//       {isAdding && (
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0, opacity: 0 }}
//           className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl"
//         >
//           <div className="text-center">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl mb-2"
//             >
//               ✓
//             </motion.div>
//             <p className="font-semibold text-primary-500">Added to Cart!</p>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }









// frontend/src/components/ProductCard.tsx

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiEye } from 'react-icons/fi'
import QuickViewModal from './QuickViewModal'

interface ProductCardProps {
  id: number
  name: string
  category: string
  price: number
  image_url: string
  description?: string
  stock_quantity: number
  priority?: boolean
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image_url,
  description,
  stock_quantity,
  priority = false,
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getPlaceholderDataURL = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzlhYTBhNiI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4="
  }

  const displayImageUrl = imageError ? '/images/placeholder.jpg' : (image_url || '/images/placeholder.jpg')

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -8 }}
        className="group h-full flex flex-col overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 transition-all relative"
      >
        {/* Category Badge */}
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full uppercase">
          {category.replace('_', ' ')}
        </div>
        
        {/* Stock Badge */}
        {stock_quantity === 0 && (
          <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}
        
        {/* Low Stock Badge */}
        {stock_quantity > 0 && stock_quantity < 10 && (
          <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Only {stock_quantity} left!
          </div>
        )}
        
        <Link href={`/products/${id}`} className="block">
          {/* Product Image */}
          <div className="relative h-64 overflow-hidden bg-gray-100">
            <Image
              src={displayImageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              quality={95}
              placeholder="blur"
              blurDataURL={getPlaceholderDataURL()}
              onError={() => setImageError(true)}
            />
            
            {/* Quick View Button - Only action button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                setShowQuickView(true)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-cyan-600 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-cyan-500 hover:text-white z-20"
              aria-label="Quick View"
            >
              <FiEye size={24} />
            </motion.button>
          </div>
          
          {/* Product Details */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-cyan-500 transition-colors">
              {name}
            </h3>
            
            {description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                {description}
              </p>
            )}
            
            {/* Price Section */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-cyan-600">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-gray-400 line-through text-sm">
                ₹{(price * 1.2).toLocaleString('en-IN')}
              </span>
              <span className="ml-auto bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                Save 20%
              </span>
            </div>
            
            {/* View Details Text */}
            <div className="text-cyan-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
              View Details
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          productId={id}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  )
}
