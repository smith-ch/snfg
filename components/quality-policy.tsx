"use client"

import { motion } from "framer-motion"
import { Shield, Award, CheckCircle2, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function QualityPolicy() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Partículas flotantes decorativas */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#ff6b35] rounded-full opacity-20"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            Comprometidos con la Excelencia
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">Tu confianza es nuestra prioridad</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen profesional */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1a3a52] to-[#ff6b35] rounded-2xl blur-2xl opacity-50"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/professional-team.jpg"
                alt="Equipo profesional de SNG SERVIMAX"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/80 to-transparent" />
            </div>
          </motion.div>

          {/* Lista de compromisos */}
          <div className="space-y-6">
            {[
              {
                icon: Shield,
                title: "Seguridad Garantizada",
                description: "Protocolos de seguridad en cada proyecto",
              },
              {
                icon: Award,
                title: "Calidad Certificada",
                description: "Estándares de excelencia en todos nuestros servicios",
              },
              {
                icon: CheckCircle2,
                title: "Cumplimiento Garantizado",
                description: "Entrega en tiempo y forma según lo acordado",
              },
              {
                icon: TrendingUp,
                title: "Mejora Continua",
                description: "Innovación constante en nuestros procesos",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <motion.div
                  className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#1a3a52] to-[#ff6b35] rounded-lg flex items-center justify-center relative overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 1,
                    }}
                  />
                  <item.icon className="w-7 h-7 text-white relative z-10" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[#1a3a52] dark:text-white group-hover:text-[#ff6b35] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  <motion.div
                    className="mt-2 flex items-center gap-2 text-sm text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verificado</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#1a3a52] rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#ff6b35] rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </section>
  )
}
