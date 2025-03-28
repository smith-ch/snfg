"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  phone: z.string().min(7, {
    message: "Por favor ingrese un número de teléfono válido.",
  }),
  subject: z.string().min(5, {
    message: "El asunto debe tener al menos 5 caracteres.",
  }),
  service: z.string().optional(),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      service: "",
      message: "",
    },
  })

  // Pre-fill the service field if it's in the URL
  useEffect(() => {
    const service = searchParams.get("service")
    if (service) {
      form.setValue("service", service)
      form.setValue("subject", `Consulta sobre ${service}`)
    }
  }, [searchParams, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      form.reset()
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Nos pondremos en contacto con usted pronto.",
      })
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Su nombre"
                    className="bg-white/50 dark:bg-gray-800/50 input-focus-effect"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Su email"
                    type="email"
                    className="bg-white/50 dark:bg-gray-800/50 input-focus-effect"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Su teléfono"
                    className="bg-white/50 dark:bg-gray-800/50 input-focus-effect"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio de interés</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                      <SelectValue placeholder="Seleccione un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="impermeabilizacion">Impermeabilización</SelectItem>
                    <SelectItem value="corte">Corte y demolición</SelectItem>
                    <SelectItem value="concreto">Colocación de concreto</SelectItem>
                    <SelectItem value="maquinaria">Alquiler de maquinaria</SelectItem>
                    <SelectItem value="planta">Construcción de planta</SelectItem>
                    <SelectItem value="residuos">Gestión de residuos</SelectItem>
                    <SelectItem value="asesoria">Asesoría empresarial</SelectItem>
                    <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input
                  placeholder="Asunto del mensaje"
                  className="bg-white/50 dark:bg-gray-800/50 input-focus-effect"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escriba su mensaje aquí"
                  className="min-h-[120px] bg-white/50 dark:bg-gray-800/50 input-focus-effect"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full btn-gradient shadow-blue btn-shine" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Mensaje"
          )}
        </Button>
      </form>
    </Form>
  )
}

