"use client"

import type { Variant } from "framer-motion"

interface AnimationVariants {
  fadeIn: {
    hidden: Variant
    visible: Variant
  }
  fadeInUp: {
    hidden: Variant
    visible: Variant
  }
  fadeInDown: {
    hidden: Variant
    visible: Variant
  }
  fadeInLeft: {
    hidden: Variant
    visible: Variant
  }
  fadeInRight: {
    hidden: Variant
    visible: Variant
  }
  zoomIn: {
    hidden: Variant
    visible: Variant
  }
  staggerContainer: {
    hidden: Variant
    visible: (i?: number) => Variant
  }
  staggerItems: {
    hidden: Variant
    visible: (custom?: number) => Variant
  }
  slideIn: {
    hidden: Variant
    visible: Variant
  }
  pathAnimation: {
    hidden: Variant
    visible: Variant
  }
  draw: {
    hidden: Variant
    visible: Variant
  }
  rotateIn: {
    hidden: Variant
    visible: Variant
  }
  pulse: {
    hidden: Variant
    visible: Variant
  }
  float: {
    hidden: Variant
    visible: Variant
  }
}

export const animations: AnimationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: (i = 0.1) => ({
      opacity: 1,
      transition: { staggerChildren: i, delayChildren: 0.1 },
    }),
  },
  staggerItems: {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  },
  slideIn: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  },
  pathAnimation: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 },
      },
    },
  },
  draw: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  },
  pulse: {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  },
  float: {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        ease: "easeInOut",
      },
    },
  },
}

