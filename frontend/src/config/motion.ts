// ✅ Optimized Framer Motion settings for 60-120fps

export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3, // Faster transitions
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1
      delayChildren: 0,
    },
  },
}

export const reducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
}

// ✅ Disable layout animations (they cause lag)
export const layoutTransition = {
  layout: false,
}
