"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
  style?: React.CSSProperties
}

export default function PlaceholderImage({
  width = 400,
  height = 300,
  text = "Imagen no disponible",
  className,
  style,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground rounded-md overflow-hidden",
        className,
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
    >
      <div className="text-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-2 opacity-50"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}
