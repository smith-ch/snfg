"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Shield, Award, Target } from "lucide-react"
import Image from "next/image"

export default function QualityPolicy() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#ff6b35]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos animados */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-[#1a3a52]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 bg-[#ff6b35]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Comprometidos con la Excelencia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Tu confianza es nuestra prioridad
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#1a3a52]/20 to-[#ff6b35]/20 rounded-2xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/professional-team.jpg"
                alt="Equipo profesional SNG SERVIMAX"
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: Shield,
                title: "Seguridad Garantizada",
                description: "Protocolos estrictos en cada proyecto",
                color: "#1a3a52",
              },
              {
                icon: Award,
                title: "Calidad Premium",
                description: "Materiales de primera calidad",
                color: "#ff6b35",
              },
              {
                icon: Target,
                title: "Resultados Precisos",
                description: "Cumplimos tiempos y expectativas",
                color: "#1a3a52",
              },
              {
                icon: CheckCircle2,
                title: "Satisfacción Total",
                description: "Compromiso con cada cliente",
                color: "#ff6b35",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  x: 10,
                }}
                className="flex items-start gap-4 p-6 rounded-xl bg-card hover:bg-accent/50 border border-border hover:border-[#ff6b35]/50 transition-all duration-300 group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="p-3 rounded-lg relative overflow-hidden"
                  style={{ backgroundColor: `${item.color}15` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/30"
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <item.icon className="w-6 h-6 relative z-10" style={{ color: item.color }} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[#ff6b35] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#ff6b35]" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
