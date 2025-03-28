"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

type OptimizedImageProps = Omit<ImageProps, "onLoadingComplete"> & {
  fadeIn?: boolean
  lowQualityPlaceholder?: boolean
  blurEffect?: boolean
  containerClassName?: string
}

export default function OptimizedImage({
  fadeIn = true,
  lowQualityPlaceholder = true,
  blurEffect = true,
  containerClassName,
  className,
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generar un placeholder para blur
  const blurDataUrl =
    !props.blurDataURL && blurEffect
      ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
      : props.blurDataURL

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        {...props}
        alt={alt}
        loading={props.priority ? "eager" : "lazy"}
        quality={props.quality || 80}
        blurDataURL={blurDataUrl}
        placeholder={lowQualityPlaceholder ? "blur" : undefined}
        className={cn(
          className,
          "transition-all duration-500 ease-in-out",
          fadeIn && !isLoaded && "opacity-0 scale-105",
          fadeIn && isLoaded && "opacity-100 scale-100",
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

