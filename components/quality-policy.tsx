"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, ShieldCheck } from "lucide-react"

export default function QualityPolicy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const policies = [
    {
      icon: <CheckCircle2 className="h-12 w-12 text-primary" />,
      title: "Política de Calidad",
      description:
        "SNG SERVIMAX se compromete a ofrecer productos y servicios de alta calidad en el sector de la construcción, garantizando el cumplimiento de los estándares nacionales e internacionales. Utilizamos materiales certificados y aplicamos buenas prácticas para asegurar la durabilidad y resistencia de cada proyecto.",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary" />,
      title: "Política de Seguridad y Salud Ocupacional",
      description:
        "Nos comprometemos a proporcionar un entorno de trabajo seguro para nuestros empleados, clientes y aliados estratégicos. Cumplimos con las normativas de seguridad industrial y promovemos la prevención de riesgos en cada una de nuestras operaciones.",
    },
  ]

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-muted/30 skew-y-3 -z-10 transform-gpu"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            NUESTRAS POLÍTICAS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-heading">Comprometidos con la Excelencia</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprometidos con la excelencia, la seguridad y el bienestar de nuestros colaboradores y clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-6">{policy.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gradient">{policy.title}</h3>
                <p className="text-muted-foreground">{policy.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 border-primary"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-full flex-shrink-0">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Certificaciones y Estándares</h3>
              <p className="text-muted-foreground">
                Cumplimos con los más altos estándares de la industria y contamos con certificaciones que avalan nuestro
                compromiso con la calidad, la seguridad y el medio ambiente. Nuestros procesos están constantemente
                supervisados para garantizar el cumplimiento de todas las normativas aplicables.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

