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
    // Colores vibrantes y visibles
    const primaryColor = "rgb(59, 130, 246)" // Blue
    const secondaryColor = "rgb(168, 85, 247)" // Purple
    const accentColor = "rgb(236, 72, 153)" // Pink

    const connectionColors = [
      { main: "rgba(59, 130, 246, 0.4)", highlight: "rgba(59, 130, 246, 0.9)" },
      { main: "rgba(168, 85, 247, 0.4)", highlight: "rgba(168, 85, 247, 0.9)" },
      { main: "rgba(236, 72, 153, 0.4)", highlight: "rgba(236, 72, 153, 0.9)" },
    ]

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
            glowColor = "rgba(59, 130, 246, 0.6)"
            break
          case 1:
            nodeColor = secondaryColor
            glowColor = "rgba(168, 85, 247, 0.6)"
            break
          case 2:
            nodeColor = accentColor
            glowColor = "rgba(236, 72, 153, 0.6)"
            break
          default:
            nodeColor = primaryColor
            glowColor = "rgba(59, 130, 246, 0.6)"
        }

        newNodes.push({
          id: nodeId++,
          x: layerX,
          y: nodeSpacing * (i + 1),
          size: Math.random() * 4 + 8,
          color: nodeColor,
          glowColor: glowColor,
          pulseDelay: Math.random() * 3,
        })
      }
    })

    const newConnections: Connection[] = []

    for (let layer = 0; layer < layers.length - 1; layer++) {
      const currentLayerStart = layers.slice(0, layer).reduce((sum, nodes) => sum + nodes, 0)
      const nextLayerStart = currentLayerStart + layers[layer]

      for (let i = 0; i < layers[layer]; i++) {
        const fromNodeId = currentLayerStart + i
        const connectionsCount = Math.floor(Math.random() * 3) + 2
        const possibleTargets = Array.from({ length: layers[layer + 1] }, (_, i) => nextLayerStart + i)

        for (let j = 0; j < Math.min(connectionsCount, possibleTargets.length); j++) {
          const targetIndex = Math.floor(Math.random() * possibleTargets.length)
          const toNodeId = possibleTargets[targetIndex]
          possibleTargets.splice(targetIndex, 1)

          const colorIndex = (fromNodeId + toNodeId) % 3

          newConnections.push({
            from: fromNodeId,
            to: toNodeId,
            color: connectionColors[colorIndex].main,
            highlightColor: connectionColors[colorIndex].highlight,
            width: Math.random() * 1.5 + 1.5,
            animated: Math.random() > 0.4,
            delay: Math.random() * 3,
          })
        }
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)
  }

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
    } as React.CSSProperties
  }

  return (
    <motion.section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold mb-6 shadow-lg"
          >
            INNOVACIÓN TECNOLÓGICA
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Conectando Soluciones Inteligentes</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Nuestro enfoque interconectado asegura que todos los aspectos de su proyecto estén integrados de manera
            eficiente, creando soluciones sólidas y armoniosas.
          </p>
        </div>

        <div
          ref={ref}
          className="relative mx-auto w-full lg:w-[80%] rounded-2xl overflow-hidden shadow-2xl"
          style={{
            height: "500px",
            background: "linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)",
          }}
        >
          {/* Conexiones */}
          {connections.map((conn, idx) => (
            <div
              key={`conn-${idx}`}
              className={`absolute origin-left ${conn.animated ? "animate-pulse" : ""}`}
              style={getConnectionStyle(conn)}
            />
          ))}

          {/* Nodos */}
          {nodes.map((node) => (
            <div
              key={`node-${node.id}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: node.color,
                boxShadow: `0 0 20px ${node.glowColor}, 0 0 40px ${node.glowColor}`,
                opacity: isInView ? 1 : 0,
                animationDelay: `${node.pulseDelay}s`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Overlay con gradiente más sutil */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Nuestros servicios de construcción, mantenimiento y asistencia están interconectados y optimizados, como los
            nodos de una red neural. Cada actividad se coordina con precisión para alcanzar resultados excepcionales.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
