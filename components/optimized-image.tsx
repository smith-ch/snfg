"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  priority?: boolean
  quality?: number
  fallbackSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  quality = 75,
  fallbackSrc = "/placeholder.svg",
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoaded(false)
    setError(false)
  }, [src])

  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
  }

  // Determine if the image is external (starts with http/https)
  const isExternal = typeof imgSrc === "string" && (imgSrc.startsWith("http") || imgSrc.startsWith("https"))

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isExternal ? (
        // For external images, use a regular img tag with proper attributes
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            className,
            "transition-opacity duration-300",
            fill && "absolute inset-0 w-full h-full object-cover",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100",
          )}
          style={fill ? { objectFit: "cover" } : undefined}
        />
      ) : (
        // For internal images, use Next.js Image component
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          quality={quality}
          priority={priority}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            className,
            "transition-opacity duration-300",
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100",
          )}
        />
      )}

      {/* Show loading state */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Show error state if image failed to load and no fallback is available */}
      {error && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-2 text-muted-foreground"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <p className="text-sm text-muted-foreground">Imagen no disponible</p>
          </div>
        </div>
      )}
    </div>
  )
}
