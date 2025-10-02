"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, Loader2, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser"
import { EMAILJS_CONFIG } from "@/lib/emailjs-config"

export default function CurriculumForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    puesto: "",
    experiencia: "",
    disponibilidad: "",
    linkedin: "",
    portfolio: "",
    mensaje: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Inicializar EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

      // Convertir el archivo a base64 si existe
      let cvBase64 = ""
      let cvFileName = ""
      if (cvFile) {
        cvFileName = cvFile.name
        const reader = new FileReader()
        cvBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(cvFile)
        })
      }

      // Enviar el email con el CV adjunto
      const response = await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CV_TEMPLATE_ID, {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        puesto: formData.puesto,
        experiencia: formData.experiencia,
        disponibilidad: formData.disponibilidad,
        linkedin: formData.linkedin || "No proporcionado",
        portfolio: formData.portfolio || "No proporcionado",
        mensaje: formData.mensaje || "Sin mensaje adicional",
        to_email: "sngservimax@gmail.com",
        cv_file: cvBase64,
        cv_filename: cvFileName,
      })

      if (response.status === 200) {
        setSubmitStatus("success")
        // Limpiar el formulario
        setFormData({
          nombre: "",
          apellidos: "",
          email: "",
          telefono: "",
          puesto: "",
          experiencia: "",
          disponibilidad: "",
          linkedin: "",
          portfolio: "",
          mensaje: "",
        })
        setCvFile(null)

        // Resetear después de 5 segundos
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      }
    } catch (error) {
      console.error("Error al enviar la postulación:", error)
      setSubmitStatus("error")
      setErrorMessage("Hubo un problema al enviar tu postulación. Por favor, intenta nuevamente.")

      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("El archivo es demasiado grande. Máximo 5MB.")
        setSubmitStatus("error")
        setTimeout(() => {
          setSubmitStatus("idle")
          setErrorMessage("")
        }, 3000)
        return
      }
      // Validar tipo de archivo
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("Solo se permiten archivos PDF o Word.")
        setSubmitStatus("error")
        setTimeout(() => {
          setSubmitStatus("idle")
          setErrorMessage("")
        }, 3000)
        return
      }
      setCvFile(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-[#1a3a52]">Postula con Nosotros</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="Tu nombre"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium mb-2">
              Apellidos *
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              required
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="Tus apellidos"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="tu@email.com"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-2">
              Teléfono *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="+1 (809) 000-0000"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="puesto" className="block text-sm font-medium mb-2">
              Puesto de Interés *
            </label>
            <select
              id="puesto"
              name="puesto"
              required
              value={formData.puesto}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              <option value="">Selecciona un puesto</option>
              <option value="Ingeniero Civil">Ingeniero Civil</option>
              <option value="Técnico de Laboratorio">Técnico de Laboratorio</option>
              <option value="Supervisor de Obra">Supervisor de Obra</option>
              <option value="Administrador">Administrador</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label htmlFor="experiencia" className="block text-sm font-medium mb-2">
              Años de Experiencia *
            </label>
            <select
              id="experiencia"
              name="experiencia"
              required
              value={formData.experiencia}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              <option value="">Selecciona...</option>
              <option value="Sin experiencia">Sin experiencia</option>
              <option value="1-2 años">1-2 años</option>
              <option value="3-5 años">3-5 años</option>
              <option value="5+ años">5+ años</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="disponibilidad" className="block text-sm font-medium mb-2">
            Disponibilidad *
          </label>
          <select
            id="disponibilidad"
            name="disponibilidad"
            required
            value={formData.disponibilidad}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
            disabled={isSubmitting}
          >
            <option value="">Selecciona...</option>
            <option value="Inmediata">Inmediata</option>
            <option value="2 semanas">2 semanas</option>
            <option value="1 mes">1 mes</option>
            <option value="Más de 1 mes">Más de 1 mes</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
              LinkedIn (opcional)
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="https://linkedin.com/in/tu-perfil"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium mb-2">
              Portafolio/Web (opcional)
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all"
              placeholder="https://tu-portfolio.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-medium mb-2">
            Curriculum Vitae * (PDF o Word, máx. 5MB)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-input rounded-md hover:border-[#1a3a52] transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground">
                <label
                  htmlFor="cv"
                  className="relative cursor-pointer rounded-md font-medium text-[#1a3a52] hover:text-[#2d5a7b] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a3a52]"
                >
                  <span>Subir archivo</span>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    disabled={isSubmitting}
                  />
                </label>
                <p className="pl-1">o arrastra aquí</p>
              </div>
              <p className="text-xs text-muted-foreground">PDF, DOC hasta 5MB</p>
              {cvFile && (
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-[#1a3a52]">
                  <FileText className="h-4 w-4" />
                  <span>{cvFile.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
            Mensaje Adicional (opcional)
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition-all resize-none"
            placeholder="Cuéntanos por qué quieres trabajar con nosotros..."
            disabled={isSubmitting}
          />
        </div>

        {/* Mensajes de estado */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md text-green-800"
          >
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">¡Postulación enviada correctamente! Revisaremos tu CV pronto.</p>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-md text-red-800"
          >
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !cvFile}
          className="w-full bg-[#1a3a52] hover:bg-[#2d5a7b] text-white py-6 text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Enviar Postulación
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}
