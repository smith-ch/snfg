"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser"
import { EMAILJS_CONFIG } from "@/lib/emailjs-config"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const now = new Date()
      const formattedTime = now.toLocaleString("es-DO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          title: `Solicitud de ${formData.service || "información"}`,
          time: formattedTime,
          message: formData.message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY,
      )

      if (result.status === 200) {
        setStatus("success")
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="Tu nombre"
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="tu@email.com"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="(809) 000-0000"
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="Nombre de tu empresa"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Servicio de Interés
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
            disabled={status === "loading"}
          >
            <option value="">Selecciona un servicio</option>
            <option value="construccion">Construcción</option>
            <option value="remodelacion">Remodelación</option>
            <option value="pintura">Pintura</option>
            <option value="plomeria">Plomería</option>
            <option value="electricidad">Electricidad</option>
            <option value="albañileria">Albañilería</option>
            <option value="carpinteria">Carpintería</option>
            <option value="techos">Techos</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all resize-none"
            placeholder="Cuéntanos sobre tu proyecto..."
            disabled={status === "loading"}
          />
        </div>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg"
          >
            <CheckCircle className="h-5 w-5" />
            <p>¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg"
          >
            <AlertCircle className="h-5 w-5" />
            <p>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#1a3a52] hover:bg-[#ff6b35] text-white py-6 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
