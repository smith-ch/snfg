"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  id: string
  title: string
  description: string
  features: string[]
  image: string
  color: string
  icon: React.ReactNode
  href: string
  delay?: number
  priority?: boolean
  className?: string
}

export default function ServiceCard({
  id,
  title,
  description,
  features,
  image,
  color,
  icon,
  href,
  delay = 0,
  priority = false,
  className,
}: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "group h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm",
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          {/* Usar un div de color como fondo */}
          <div className={cn("absolute inset-0", color)} />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-2">
              {icon}
            </div>
            <h3 className="text-white text-xl font-bold truncate">{title}</h3>
          </div>

          <Badge className={cn("absolute top-3 right-3", color)}>{id.charAt(0).toUpperCase() + id.slice(1)}</Badge>
        </div>

        <CardContent className="p-4">
          <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
          <div className="space-y-2">
            {features.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
            {features.length > 2 && <p className="text-xs text-primary">+ {features.length - 2} características más</p>}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button asChild variant="ghost" className="px-0 hover:bg-transparent w-full justify-start group/btn">
            <Link href={href} className="flex items-center gap-2 text-primary">
              <span>Ver detalles</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

