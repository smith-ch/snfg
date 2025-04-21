"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Node {
  id: number
  x: number
  y: number
  size: number
  color: string
  glowColor: string
  pulseDelay: number
}

interface Connection {
  from: number
  to: number
  color: string
  highlightColor: string
  width: number
  animated: boolean
  delay: number
}

export default function NeuralNetworkSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 500 })
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate nodes and connections
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setContainerSize({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (containerSize.width > 0 && !isInitialized) {
      initializeNetwork()
      setIsInitialized(true)
    }
  }, [containerSize, isInitialized])

  const initializeNetwork = () => {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

    // Colors for light/dark mode
    const primaryColor = isDarkMode ? "rgb(102, 169, 255)" : "rgb(12, 115, 228)"
    const secondaryColor = isDarkMode ? "rgb(157, 159, 255)" : "rgb(72, 79, 231)"
    const accentColor = isDarkMode ? "rgb(208, 144, 255)" : "rgb(162, 48, 230)"

    const connectionColors = [
      { main: "rgba(12, 115, 228, 0.3)", highlight: "rgba(12, 115, 228, 0.8)" },
      { main: "rgba(72, 79, 231, 0.3)", highlight: "rgba(72, 79, 231, 0.8)" },
      { main: "rgba(162, 48, 230, 0.3)", highlight: "rgba(162, 48, 230, 0.8)" },
    ]

    // Create nodes in layers
    const newNodes: Node[] = []
    const layers = [4, 6, 8, 6, 4]
    const layerWidth = containerSize.width / (layers.length + 1)
    let nodeId = 0

    layers.forEach((nodesInLayer, layerIndex) => {
      const layerX = layerWidth * (layerIndex + 1)
      const nodeSpacing = containerSize.height / (nodesInLayer + 1)

      for (let i = 0; i < nodesInLayer; i++) {
        const colorIndex = (layerIndex + i) % 3
        let nodeColor: string
        let glowColor: string

        switch (colorIndex) {
          case 0:
            nodeColor = primaryColor
            glowColor = "rgba(12, 115, 228, 0.5)"
            break
          case 1:
            nodeColor = secondaryColor
            glowColor = "rgba(72, 79, 231, 0.5)"
            break
          case 2:
            nodeColor = accentColor
            glowColor = "rgba(162, 48, 230, 0.5)"
            break
          default:
            nodeColor = primaryColor
            glowColor = "rgba(12, 115, 228, 0.5)"
        }

        newNodes.push({
          id: nodeId++,
          x: layerX,
          y: nodeSpacing * (i + 1),
          size: Math.random() * 5 + 5, // 5-10px
          color: nodeColor,
          glowColor: glowColor,
          pulseDelay: Math.random() * 3,
        })
      }
    })

    // Create connections between layers
    const newConnections: Connection[] = []

    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerStart = layers.slice(0, layer).reduce((sum, nodes) => sum + nodes, 0)
      const nextLayerStart = currentLayerStart + layers[layer]

      for (let i = 0; i < layers[layer]; i++) {
        const fromNodeId = currentLayerStart + i

        // Connect to some nodes in the next layer (not all to avoid too many connections)
        const connectionsCount = Math.floor(Math.random() * 3) + 1 // 1-3 connections
        const possibleTargets = Array.from({ length: layers[layer + 1] }, (_, i) => nextLayerStart + i)

        for (let j = 0; j < Math.min(connectionsCount, possibleTargets.length); j++) {
          const targetIndex = Math.floor(Math.random() * possibleTargets.length)
          const toNodeId = possibleTargets[targetIndex]
          possibleTargets.splice(targetIndex, 1) // Remove to avoid duplicates

          const colorIndex = (fromNodeId + toNodeId) % 3

          newConnections.push({
            from: fromNodeId,
            to: toNodeId,
            color: connectionColors[colorIndex].main,
            highlightColor: connectionColors[colorIndex].highlight,
            width: Math.random() * 1 + 1, // 1-2px
            animated: Math.random() > 0.5, // 50% chance of animation
            delay: Math.random() * 3,
          })
        }
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)
  }

  // Calculate connection properties
  const getConnectionStyle = (conn: Connection) => {
    const fromNode = nodes.find((n) => n.id === conn.from)
    const toNode = nodes.find((n) => n.id === conn.to)

    if (!fromNode || !toNode) return {}

    const deltaX = toNode.x - fromNode.x
    const deltaY = toNode.y - fromNode.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

    return {
      left: `${fromNode.x}px`,
      top: `${fromNode.y}px`,
      width: `${distance}px`,
      transform: `rotate(${angle}deg)`,
      backgroundColor: conn.color,
      height: `${conn.width}px`,
      opacity: isInView ? 1 : 0,
      transition: `opacity 0.5s ease ${conn.delay}s`,
      "--connection-start": conn.color,
      "--connection-end": conn.color,
      "--connection-highlight": conn.highlightColor,
    } as React.CSSProperties
  }

  return (
    <motion.section
      className="relative py-24 overflow-hidden bg-pattern"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            INNOVACIÓN TECNOLÓGICA
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">Conectando Soluciones Inteligentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestro enfoque interconectado asegura que todos los aspectos de su proyecto estén integrados de manera
            eficiente, creando soluciones sólidas y armoniosas.
          </p>
        </div>

        <div
          ref={ref}
          className="neural-network relative mx-auto w-full lg:w-[80%] rounded-xl overflow-hidden shadow-lg card-glass"
          style={{ height: "500px" }}
        >
          {/* Neural connections */}
          {connections.map((conn, idx) => (
            <div
              key={`conn-${idx}`}
              className={`neural-connection ${conn.animated ? "neural-connection-animated" : ""}`}
              style={getConnectionStyle(conn)}
            />
          ))}

          {/* Neural nodes */}
          {nodes.map((node) => (
            <div
              key={`node-${node.id}`}
              className="neural-node animate-pulse-slow"
              style={
                {
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  backgroundColor: node.color,
                  boxShadow: `0 0 15px ${node.glowColor}`,
                  opacity: isInView ? 1 : 0,
                  animationDelay: `${node.pulseDelay}s`,
                  "--node-color-light": node.color,
                  "--node-color-dark": `color-mix(in srgb, ${node.color}, black 30%)`,
                  "--node-glow": node.glowColor,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Overlay with gradient effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/30 to-white/0 dark:from-gray-900/30 dark:to-gray-900/0" />
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestros servicios de construcción, mantenimiento y asistencia están interconectados y optimizados, como los
            nodos de una red neural. Cada actividad se coordina con precisión para alcanzar resultados excepcionales.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
