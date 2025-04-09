"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageWithFallback from "@/components/image-with-fallback"

export default function ContactPageClient() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("form")

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    // Check if there's a hash in the URL to set the active tab
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash === "#mapa") {
        setActiveTab("map")
      } else if (hash === "#formulario") {
        setActiveTab("form")
      }

      // Check if there's a tab parameter in the URL
      const params = new URLSearchParams(window.location.search)
      const tab = params.get("tab")
      if (tab === "map") {
        setActiveTab("map")
      } else if (tab === "form") {
        setActiveTab("form")
      }
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Contacto"
            description="Estamos aquí para ayudarle con su próximo proyecto"
            className="text-center mb-12"
          />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form" id="formulario">
                Formulario de Contacto
              </TabsTrigger>
              <TabsTrigger value="map" id="mapa">
                Ubicación en Mapa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                  <ContactInfo />
                  <div className="mt-8">
                    <ImageWithFallback
                      src="/images/customer-service.jpg"
                      alt="Nuestro equipo de atención al cliente"
                      width={600}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6">Envíenos un Mensaje</h3>
                  <ContactForm />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="map">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-6">Nuestra Ubicación</h3>
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  )}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.9529122602193!2d-68.4191156!3d18.5705376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM0JzEzLjkiTiA2OMKwMjUnMDguOCJX!5e0!3m2!1ses!2sdo!4v1616593299000!5m2!1ses!2sdo"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className={`${mapLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                    onLoad={() => setMapLoaded(true)}
                    title="Ubicación de SNG SERVIMAX"
                  ></iframe>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-bold mb-2">Oficina Principal</h4>
                    <p className="text-muted-foreground mb-1">Manzana Q no. El casique de Veron</p>
                    <p className="text-muted-foreground mb-1">República Dominicana</p>
                    <p className="text-muted-foreground">
                      Tel:{" "}
                      <a href="tel:+18494608077" className="hover:text-primary transition-colors">
                        849 460 8077
                      </a>
                    </p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h4 className="font-bold mb-2">Horario de Atención</h4>
                    <p className="text-muted-foreground mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground mb-1">Sábados: 9:00 AM - 1:00 PM</p>
                    <p className="text-muted-foreground">Domingos: Cerrado</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                  <h4 className="font-bold mb-2">¿Cómo llegar?</h4>
                  <p className="text-muted-foreground">
                    Nuestra oficina está ubicada en Manzana Q no. El casique de Veron, República Dominicana. Puede
                    contactarnos para recibir indicaciones detalladas sobre cómo llegar a nuestras instalaciones.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">¿Prefiere llamarnos?</h3>
          <p className="text-lg text-muted-foreground mb-4">
            Nuestro equipo está disponible para atenderle de lunes a viernes de 8:00 AM a 6:00 PM
          </p>
          <a
            href="tel:+18494608077"
            className="inline-block px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-xl font-bold text-primary">849 460 8077</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
