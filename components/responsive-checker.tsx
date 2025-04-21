"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function ResponsiveChecker() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setViewport({
        width,
        height: window.innerHeight,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Solo mostrar en desarrollo y oculto con la clase para no interrumpir
  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 px-3 py-1 text-xs font-mono rounded-full shadow-lg",
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700",
        "hide-responsive-checker",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            viewport.isMobile && "bg-red-500",
            viewport.isTablet && "bg-yellow-500",
            viewport.isDesktop && "bg-green-500",
          )}
        ></span>
        <span>
          {viewport.width}x{viewport.height} | {viewport.isMobile ? "Mobile" : viewport.isTablet ? "Tablet" : "Desktop"}
        </span>
      </div>
    </div>
  )
}
