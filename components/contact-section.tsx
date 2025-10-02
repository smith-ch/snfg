"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactForm from "./contact-form"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Teléfono",
      details: "849 460 8077",
      link: "tel:+18494608077",
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      details: "sngservimax@gmail.com",
      link: "mailto:sngservimax@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Dirección",
      details: "Manzana Q no. El casique de Veron, República Dominicana",
      link: "https://maps.google.com",
    },
  ]

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctenos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarle con su próximo proyecto. Contáctenos para obtener más información o solicitar un
            presupuesto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background p-8 rounded-lg shadow-sm h-full">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">{item.icon}</div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <a
                        href={item.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target={item.title === "Dirección" ? "_blank" : undefined}
                        rel={item.title === "Dirección" ? "noopener noreferrer" : undefined}
                      >
                        {item.details}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-3">Horario de Atención</h4>
                <p className="text-muted-foreground mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground">Sábados: 9:00 AM - 1:00 PM</p>
              </div>

              <Button asChild className="mt-8">
                <Link href="/contacto" className="flex items-center gap-2">
                  Contacto Completo <ArrowRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={`tel:+18494608077`}>
                  <Phone className="h-4 w-4 mr-2" /> Llamar ahora
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-background p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Envíenos un Mensaje</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
