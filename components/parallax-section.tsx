"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  baseVelocity?: number
  direction?: "up" | "down"
  overflow?: boolean
}

export default function ParallaxSection({
  children,
  className,
  baseVelocity = 0.2,
  direction = "up",
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const velocity = direction === "up" ? -baseVelocity : baseVelocity
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${velocity * 100}%`])

  return (
    <section ref={ref} className={cn("relative", !overflow && "overflow-hidden", className)}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </section>
  )
}
