"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User } from "lucide-react"

const teamMembers = [
  {
    name: "Angel Guillermo Gimenez",
    role: "Director General",
    icon: true,
  },
  {
    name: "Berenice Peguero",
    role: "Gerente de Operaciones",
    image: "/images/team/berenice-peguero.jpeg",
  },
  {
    name: "Smith Rodriguez",
    role: "Supervisor de Proyectos",
    image: "/images/team/favicon.png",
  },
  {
    name: "Luis Peguero",
    role: "Coordinador Técnico",
    icon: true,
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Equipo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profesionales comprometidos con la excelencia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#1a3a52] to-[#2d5a7b]">
                {member.icon ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-24 w-24 text-white/80" />
                  </div>
                ) : (
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
