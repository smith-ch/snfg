"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Share2,
  Smartphone,
  VolumeX,
  Volume2,
  Compass,
  Info,
  Sun,
  Palette,
  PanelLeft,
  PanelRight,
  Ruler,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de ejemplo para los proyectos 3D
const projects3D = [
  {
    id: "edificio-residencial",
    title: "Edificio Residencial Torres del Sol",
    description:
      "Explore este moderno complejo residencial de 120 apartamentos con áreas comunes y estacionamiento subterráneo.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    modelUrl: "/models/edificio-residencial.glb",
    category: "Residencial",
    features: ["120 apartamentos", "Áreas comunes", "Piscina", "Estacionamiento subterráneo"],
    hotspots: [
      {
        id: 1,
        title: "Entrada Principal",
        position: { x: 0, y: 1.5, z: -3 },
        info: "Acceso principal con seguridad 24/7",
      },
      {
        id: 2,
        title: "Área de Piscina",
        position: { x: 3, y: 0.5, z: 2 },
        info: "Piscina climatizada con zona de descanso",
      },
      {
        id: 3,
        title: "Estacionamiento",
        position: { x: -3, y: 0, z: -1 },
        info: "Estacionamiento subterráneo con 150 plazas",
      },
    ],
  },
  {
    id: "centro-comercial",
    title: "Centro Comercial Metropolis",
    description:
      "Recorra este moderno centro comercial de 50,000 m² con tiendas, restaurantes y áreas de entretenimiento.",
    thumbnail: "https://images.unsplash.com/photo-1604754742629-3e0498a7dc4d?q=80&w=800&auto=format&fit=crop",
    modelUrl: "/models/centro-comercial.glb",
    category: "Comercial",
    features: ["50,000 m²", "100 locales comerciales", "Food court", "Cines"],
    hotspots: [
      {
        id: 1,
        title: "Entrada Principal",
        position: { x: 0, y: 1, z: -5 },
        info: "Acceso principal con escaleras mecánicas",
      },
      {
        id: 2,
        title: "Food Court",
        position: { x: 5, y: 1, z: 0 },
        info: "Área de restaurantes con capacidad para 500 personas",
      },
      { id: 3, title: "Cines", position: { x: -5, y: 1, z: 0 }, info: "Complejo de cines con 8 salas" },
    ],
  },
  {
    id: "planta-industrial",
    title: "Planta Industrial Tecnova",
    description:
      "Visite esta moderna planta industrial con instalaciones de producción, almacenamiento y oficinas administrativas.",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
    modelUrl: "/models/planta-industrial.glb",
    category: "Industrial",
    features: [
      "10,000 m² de producción",
      "5,000 m² de almacenamiento",
      "Oficinas administrativas",
      "Planta de tratamiento",
    ],
    hotspots: [
      { id: 1, title: "Área de Producción", position: { x: 0, y: 1, z: 0 }, info: "Línea de producción automatizada" },
      { id: 2, title: "Almacén", position: { x: 5, y: 1, z: 5 }, info: "Almacén con sistema de gestión automatizado" },
      {
        id: 3,
        title: "Oficinas",
        position: { x: -5, y: 1, z: 5 },
        info: "Oficinas administrativas con capacidad para 100 personas",
      },
    ],
  },
  {
    id: "hospital",
    title: "Hospital Metropolitano",
    description: "Conozca este moderno hospital con instalaciones de última generación para el cuidado de la salud.",
    thumbnail: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
    modelUrl: "/models/hospital.glb",
    category: "Salud",
    features: ["200 camas", "20 quirófanos", "Unidad de cuidados intensivos", "Helipuerto"],
    hotspots: [
      {
        id: 1,
        title: "Entrada Principal",
        position: { x: 0, y: 1, z: -5 },
        info: "Acceso principal con área de emergencias",
      },
      {
        id: 2,
        title: "Quirófanos",
        position: { x: 5, y: 1, z: 0 },
        info: "Área de quirófanos con tecnología de punta",
      },
      { id: 3, title: "Helipuerto", position: { x: 0, y: 5, z: 0 }, info: "Helipuerto para emergencias" },
    ],
  },
]

export default function VirtualRealityClient() {
  const [activeProject, setActiveProject] = useState(projects3D[0])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(50)
  const [activeTab, setActiveTab] = useState("explorar")
  const [showControls, setShowControls] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const viewerRef = useRef<HTMLDivElement>(null)
  const rotationInterval = useRef<NodeJS.Timeout | null>(null)

  // Simular carga del modelo 3D
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [activeProject])

  // Manejar rotación automática
  useEffect(() => {
    if (isPlaying) {
      rotationInterval.current = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360)
      }, 100)
    } else if (rotationInterval.current) {
      clearInterval(rotationInterval.current)
    }

    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current)
      }
    }
  }, [isPlaying])

  // Manejar pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen().catch((err) => {
        toast({
          title: "Error",
          description: `No se pudo activar el modo pantalla completa: ${err.message}`,
          variant: "destructive",
        })
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Cambiar proyecto
  const changeProject = (direction: "next" | "prev") => {
    setIsLoading(true)
    const currentIndex = projects3D.findIndex((p) => p.id === activeProject.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % projects3D.length
    } else {
      newIndex = (currentIndex - 1 + projects3D.length) % projects3D.length
    }

    setActiveProject(projects3D[newIndex])
  }

  // Compartir proyecto
  const shareProject = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `SNG SERVIMAX - ${activeProject.title}`,
          text: activeProject.description,
          url: window.location.href,
        })
        .catch((error) => {
          toast({
            title: "Error al compartir",
            description: "No se pudo compartir el proyecto",
            variant: "destructive",
          })
        })
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles",
      })
    }
  }

  // Reiniciar vista
  const resetView = () => {
    setRotation(0)
    setZoom(50)
    setActiveHotspot(null)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Explorador de Realidad Virtual"
            description="Visualice nuestros proyectos en 3D y realidad virtual"
            className="text-center mb-8"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Proyectos */}
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/4"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Proyectos</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)} className="lg:hidden">
                    <PanelLeft className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {projects3D.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        setIsLoading(true)
                        setActiveProject(project)
                      }}
                      className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                        activeProject.id === project.id
                          ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                          : "hover:shadow-md hover:scale-[1.01]"
                      }`}
                    >
                      <div className="relative h-32">
                        <Image
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <Badge className="absolute top-2 left-2 bg-primary/90">{project.category}</Badge>
                        <div className="absolute bottom-2 left-2 text-white font-medium text-sm">{project.title}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> Experiencia móvil
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Escanee el código QR para explorar este proyecto en su dispositivo móvil con realidad aumentada.
                    </p>
                    <div className="mt-3 bg-white p-2 rounded-lg w-32 h-32 mx-auto">
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">Código QR</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full btn-gradient shadow-blue btn-shine" asChild>
                    <Link href="/contacto#formulario">Solicitar visita virtual personalizada</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Visor 3D principal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${showSidebar ? "lg:w-3/4" : "w-full"} flex flex-col`}
          >
            <div
              className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
              ref={viewerRef}
            >
              {/* Barra superior de controles */}
              {showControls && (
                <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {!showSidebar && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowSidebar(true)}
                        className="text-white hover:bg-white/20"
                      >
                        <PanelRight className="h-5 w-5" />
                      </Button>
                    )}
                    <h3 className="text-white font-bold text-lg">{activeProject.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowControls(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Botón para mostrar controles si están ocultos */}
              {!showControls && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowControls(true)}
                  className="absolute top-4 right-4 z-10 bg-black/30 text-white hover:bg-black/50"
                >
                  <Layers className="h-5 w-5" />
                </Button>
              )}

              {/* Área principal del visor 3D */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    <p className="absolute text-sm font-medium">Cargando modelo 3D...</p>
                  </div>
                ) : (
                  <>
                    {/* Aquí iría el visor 3D real, por ahora simulamos con una imagen */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={activeProject.thumbnail || "/placeholder.svg"}
                        alt={activeProject.title}
                        fill
                        className="object-cover opacity-80"
                        style={{ transform: `rotate(${rotation}deg) scale(${zoom / 50})` }}
                      />

                      {/* Simulación de hotspots */}
                      {activeProject.hotspots.map((hotspot) => (
                        <div
                          key={hotspot.id}
                          className={`absolute w-6 h-6 rounded-full bg-primary/80 cursor-pointer shadow-lg pulse
                            ${activeHotspot === hotspot.id ? "ring-4 ring-white" : ""}
                          `}
                          style={{
                            left: `${50 + hotspot.position.x * 5}%`,
                            top: `${50 + hotspot.position.z * 5}%`,
                          }}
                          onClick={() => setActiveHotspot(hotspot.id)}
                        >
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></span>

                          {/* Información del hotspot */}
                          {activeHotspot === hotspot.id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20">
                              <h4 className="font-bold text-sm">{hotspot.title}</h4>
                              <p className="text-xs text-muted-foreground">{hotspot.info}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Controles de navegación */}
                {showControls && !isLoading && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => changeProject("prev")}
                      className="text-white hover:bg-white/20"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => changeProject("next")}
                      className="text-white hover:bg-white/20"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <div className="h-6 w-px bg-white/30 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.max(10, zoom - 10))}
                      className="text-white hover:bg-white/20"
                    >
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.min(100, zoom + 10))}
                      className="text-white hover:bg-white/20"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                    <div className="h-6 w-px bg-white/30 mx-1"></div>
                    <Button variant="ghost" size="icon" onClick={resetView} className="text-white hover:bg-white/20">
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowInfo(!showInfo)}
                      className="text-white hover:bg-white/20"
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Panel de información */}
              {showInfo && !isLoading && (
                <div className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{activeProject.title}</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowInfo(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{activeProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeProject.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={shareProject} className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" /> Compartir
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" /> Descargar planos
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs de opciones adicionales */}
            <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="explorar" className="flex items-center gap-2">
                    <Compass className="h-4 w-4" /> Explorar
                  </TabsTrigger>
                  <TabsTrigger value="configurar" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" /> Configurar
                  </TabsTrigger>
                  <TabsTrigger value="medidas" className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" /> Medidas
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="explorar" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Vista aérea</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                          <Image
                            src={activeProject.thumbnail || "/placeholder.svg"}
                            alt="Vista aérea"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full flex items-center gap-1">
                          <Eye className="h-4 w-4" /> Ver
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Vista interior</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                          <Image
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                            alt="Vista interior"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full flex items-center gap-1">
                          <Eye className="h-4 w-4" /> Ver
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recorrido virtual</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
                          <Image
                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
                            alt="Recorrido virtual"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                              <Play className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full flex items-center gap-1">
                          <Eye className="h-4 w-4" /> Ver
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="configurar" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Apariencia</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="theme-toggle">Modo oscuro</Label>
                          <Switch id="theme-toggle" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                        </div>

                        <div>
                          <Label>Calidad de renderizado</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Baja
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-primary/10">
                              Media
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              Alta
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label>Iluminación</Label>
                          <div className="flex items-center gap-4 mt-2">
                            <Sun className="h-5 w-5 text-muted-foreground" />
                            <Slider defaultValue={[75]} max={100} step={1} className="flex-1" />
                            <span className="text-sm text-muted-foreground">75%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Materiales</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                          <div className="w-full h-12 bg-gray-200 rounded-md mb-2"></div>
                          <span className="text-sm">Concreto estándar</span>
                        </div>
                        <div className="p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                          <div className="w-full h-12 bg-amber-100 rounded-md mb-2"></div>
                          <span className="text-sm">Madera clara</span>
                        </div>
                        <div className="p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                          <div className="w-full h-12 bg-amber-800 rounded-md mb-2"></div>
                          <span className="text-sm">Madera oscura</span>
                        </div>
                        <div className="p-3 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                          <div className="w-full h-12 bg-gray-800 rounded-md mb-2"></div>
                          <span className="text-sm">Metal oscuro</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          Restaurar materiales por defecto
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medidas" className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Herramientas de medición</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Ruler className="h-4 w-4" /> Distancia
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Maximize2 className="h-4 w-4" /> Área
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Medidas guardadas</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span className="text-sm">Ancho sala principal</span>
                          <Badge>6.5 m</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span className="text-sm">Altura techo</span>
                          <Badge>2.8 m</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span className="text-sm">Área total</span>
                          <Badge>120 m²</Badge>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button size="sm" className="w-full">
                          Exportar medidas
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Escala</h4>
                      <div className="flex items-center gap-4">
                        <Input type="number" placeholder="1" className="w-20" />
                        <span>:</span>
                        <Input type="number" placeholder="50" className="w-20" />
                        <Button variant="outline" size="sm">
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>

        {/* Sección de proyectos relacionados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-heading">Proyectos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects3D
              .filter((p) => p.id !== activeProject.id)
              .map((project) => (
                <Card key={project.id} className="hover-lift overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-2 left-2 bg-primary/90">{project.category}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <CardDescription className="line-clamp-2 text-xs">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full flex items-center gap-1"
                      onClick={() => {
                        setIsLoading(true)
                        setActiveProject(project)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      <Eye className="h-4 w-4" /> Explorar en 3D
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¿Quiere ver su proyecto en 3D?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Ofrecemos servicios de modelado 3D y realidad virtual para visualizar su proyecto antes de construirlo.
              Contáctenos para obtener más información.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-gradient shadow-blue btn-shine" asChild>
                <Link href="/contacto#formulario">Solicitar presupuesto</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/servicios">Ver todos los servicios</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Componentes adicionales para la simulación
const Pause = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
)

const Play = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
)

