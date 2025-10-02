"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
  particleCount?: number
  particleColor?: string
  speed?: number
  particleSize?: number
  variant?: "dots" | "circles" | "grid"
}

export default function AnimatedBackground({
  className,
  particleCount = 40,
  particleColor = "rgba(66, 153, 225, 0.2)",
  speed = 0.5,
  particleSize = 8,
  variant = "dots",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el canvas al tamaño de pantalla con pixel ratio para HiDPI
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Crear partículas
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.7 + 0.3,
      })
    }

    // Loop de animación
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar partículas según la variante
      particles.forEach((particle) => {
        const { x, y, size, opacity } = particle

        ctx.globalAlpha = opacity
        ctx.fillStyle = particleColor

        switch (variant) {
          case "circles":
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
            break
          case "grid":
            ctx.beginPath()
            ctx.rect(x, y, size * 1.5, size * 1.5)
            ctx.fill()
            break
          case "dots":
          default:
            ctx.beginPath()
            ctx.arc(x, y, size / 2, 0, Math.PI * 2)
            ctx.fill()
        }

        // Actualizar posición
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Reiniciar posición si sale del canvas
        if (particle.x < -size) particle.x = canvas.width + size
        if (particle.x > canvas.width + size) particle.x = -size
        if (particle.y < -size) particle.y = canvas.height + size
        if (particle.y > canvas.height + size) particle.y = -size
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [particleCount, particleColor, speed, particleSize, variant])

  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
    </div>
  )
}
