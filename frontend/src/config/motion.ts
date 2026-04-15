// ✅ Framer Motion animation presets — 60-120fps optimised

export const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.35,
}

export const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
}

export const fadeInUp = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
}

export const fadeInUpVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeInRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const scaleInVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

export const cardHover = {
  rest:  { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  hover: { y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)" },
}

export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, y: -2 },
  tap:   { scale: 0.97 },
}

export const iconBounce = {
  rest:  { y: 0 },
  hover: { y: [-2, 2, -2], transition: { duration: 0.6, repeat: Infinity } },
}

/** Use inside whileInView or animate with viewport */
export const slideUpStagger = (index: number, base = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    duration: 0.5,
    delay: base + index * 0.09,
    ease: [0.16, 1, 0.3, 1],
  },
})

export const reducedMotion = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  transition: { duration: 0.2 },
}

// ✅ Disable layout animations (they cause lag)
export const layoutTransition = {
  layout: false,
}
