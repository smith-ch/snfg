"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type OptimizedImageProps = {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  priority?: boolean
  quality?: number
  fadeIn?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  quality = 75,
  fadeIn = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const isExternal = typeof src === "string" && src.startsWith("http")

  // Función para manejar errores de carga de imágenes
  const handleError = () => {
    setHasError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Color de fondo como respaldo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20" />

      {hasError ? (
        // Mostrar un gradiente colorido si la imagen falla
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 to-purple-600/70" />
      ) : isExternal ? (
        // Usar etiqueta img nativa para URLs externas
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn(
            className,
            "transition-opacity duration-500",
            fill && "absolute inset-0 w-full h-full object-cover",
            fadeIn && !isLoaded && "opacity-0",
            fadeIn && isLoaded && "opacity-100",
          )}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        // Usar Next.js Image para imágenes locales
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          loading={priority ? "eager" : "lazy"}
          quality={quality}
          className={cn(
            className,
            "transition-opacity duration-500",
            fadeIn && !isLoaded && "opacity-0",
            fadeIn && isLoaded && "opacity-100",
          )}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
        />
      )}
    </div>
  )
}

