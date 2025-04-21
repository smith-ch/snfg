"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ExternalImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
  fill?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function ExternalImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  fill = false,
  onLoad,
  onError,
}: ExternalImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = () => {
    setHasError(true)
    if (onError) onError()
  }

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  if (hasError) {
    return (
      <div
        className={cn("bg-gradient-to-br from-blue-500/70 to-purple-600/70", className)}
        style={{
          ...style,
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
        }}
      />
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cn(className, "transition-opacity duration-500", !isLoaded && "opacity-0", isLoaded && "opacity-100")}
      style={{
        ...style,
        objectFit: fill ? "cover" : undefined,
        width: fill ? "100%" : width,
        height: fill ? "100%" : height,
        position: fill ? "absolute" : undefined,
        inset: fill ? 0 : undefined,
      }}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
