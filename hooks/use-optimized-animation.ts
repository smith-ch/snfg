"use client"

import { useEffect } from "react"
import { useAnimationControls } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface UseOptimizedAnimationProps {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useOptimizedAnimation({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = "0px",
}: UseOptimizedAnimationProps = {}) {
  const controls = useAnimationControls()
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!triggerOnce) {
      controls.start("hidden")
    }
  }, [controls, inView, triggerOnce])

  return { ref, controls, inView }
}
