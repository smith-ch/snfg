"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellidos: z.string().min(2, {
    message: "Los apellidos deben tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  telefono: z.string().min(7, {
    message: "Por favor ingrese un número de teléfono válido.",
  }),
  puesto: z.string().min(1, {
    message: "Por favor seleccione un puesto.",
  }),
  experiencia: z.string().min(1, {
    message: "Por favor seleccione su nivel de experiencia.",
  }),
  disponibilidad: z.string().min(1, {
    message: "Por favor seleccione su disponibilidad.",
  }),
  mensaje: z.string().optional(),
  curriculum: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Por favor adjunte su currículum.")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "El archivo es demasiado grande. El tamaño máximo es 5MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Formato de archivo no válido. Por favor adjunte un archivo PDF o Word.",
    ),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  privacidad: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar la política de privacidad para continuar.",
  }),
})

interface CurriculumFormProps {
  selectedPosition?: string
}

export default function CurriculumForm({ selectedPosition }: CurriculumFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      email: "",
      telefono: "",
      puesto: selectedPosition || "",
      experiencia: "",
      disponibilidad: "",
      mensaje: "",
      linkedin: "",
      portfolio: "",
      privacidad: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // En un entorno real, aquí enviaríamos los datos a un endpoint de API
      // que manejaría el envío del CV a sngservimax@gmail.com

      console.log("Enviando CV a sngservimax@gmail.com", values)

      // Simulamos una espera para la respuesta del servidor
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar mensaje de éxito
      toast({
        title: "Postulación enviada",
        description: "Hemos recibido su postulación. Nos pondremos en contacto con usted pronto.",
      })

      // Resetear el formulario
      form.reset()
      setFileName(null)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      toast({
        title: "Error al enviar",
        description: "Ha ocurrido un error al enviar su postulación. Por favor, inténtelo de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFileName(files[0].name)
      form.setValue("curriculum", files)
    } else {
      setFileName(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl>
                  <Input placeholder="Su nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos*</FormLabel>
                <FormControl>
                  <Input placeholder="Sus apellidos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input placeholder="Su email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono*</FormLabel>
                <FormControl>
                  <Input placeholder="Su teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="puesto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto al que aplica*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un puesto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Técnico de Mantenimiento">Técnico de Mantenimiento</SelectItem>
                  <SelectItem value="Especialista en Laboratorio">Especialista en Laboratorio</SelectItem>
                  <SelectItem value="Asesor Financiero">Asesor Financiero</SelectItem>
                  <SelectItem value="Supervisor de Obra">Supervisor de Obra</SelectItem>
                  <SelectItem value="Asistente Administrativo">Asistente Administrativo</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="experiencia"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Experiencia*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Sin experiencia" />
                      </FormControl>
                      <FormLabel className="font-normal">Sin experiencia</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1-2 años" />
                      </FormControl>
                      <FormLabel className="font-normal">1-2 años</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3-5 años" />
                      </FormControl>
                      <FormLabel className="font-normal">3-5 años</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Más de 5 años" />
                      </FormControl>
                      <FormLabel className="font-normal">Más de 5 años</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disponibilidad"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Disponibilidad*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Inmediata" />
                      </FormControl>
                      <FormLabel className="font-normal">Inmediata</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2 semanas" />
                      </FormControl>
                      <FormLabel className="font-normal">2 semanas</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1 mes" />
                      </FormControl>
                      <FormLabel className="font-normal">1 mes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Más de 1 mes" />
                      </FormControl>
                      <FormLabel className="font-normal">Más de 1 mes</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="URL de su perfil de LinkedIn" {...field} />
                </FormControl>
                <FormDescription>Comparta su perfil profesional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portafolio/Sitio web (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="URL de su portafolio o sitio web" {...field} />
                </FormControl>
                <FormDescription>Comparta ejemplos de su trabajo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntenos por qué está interesado en esta posición y por qué sería un buen candidato"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="curriculum"
          render={() => (
            <FormItem>
              <FormLabel>Currículum*</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 border-muted-foreground/20 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                      {fileName ? (
                        <p className="text-sm text-muted-foreground">
                          Archivo seleccionado: <span className="font-medium text-primary">{fileName}</span>
                        </p>
                      ) : (
                        <>
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Haga clic para cargar</span> o arrastre y suelte
                          </p>
                          <p className="text-xs text-muted-foreground">PDF o Word (Máx. 5MB)</p>
                        </>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacidad"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-muted/50">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Acepto la{" "}
                  <Link href="/privacidad" className="text-primary hover:underline">
                    política de privacidad
                  </Link>{" "}
                  y el tratamiento de mis datos personales.
                </FormLabel>
                <FormDescription>
                  Sus datos serán tratados con confidencialidad y únicamente para el proceso de selección.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Postulación"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Su postulación será enviada a sngservimax@gmail.com
        </p>
      </form>
    </Form>
  )
}

// Componente Link para los enlaces
function Link({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  )
}
