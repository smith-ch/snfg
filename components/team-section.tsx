"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const team = [
  {
    name: "Carlos Mendoza",
    position: "Director General",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Con más de 20 años de experiencia en el sector de la construcción, Carlos lidera nuestra empresa con visión y compromiso.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Laura Sánchez",
    position: "Directora de Operaciones",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
    bio: "Especialista en gestión de proyectos y optimización de procesos, Laura garantiza la eficiencia en todas nuestras operaciones.",
    social: {
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    name: "Miguel Rodríguez",
    position: "Jefe de Ingeniería",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    bio: "Ingeniero civil con amplia experiencia en diseño y ejecución de proyectos complejos de construcción.",
    social: {
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Ana Martínez",
    position: "Directora de Sostenibilidad",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    bio: "Especialista en prácticas sostenibles y gestión ambiental en proyectos de construcción.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div ref={ref} className="py-8">
      <h3 className="text-2xl font-bold mb-8">Nuestro Equipo</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden card-glass hover-scale">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-primary font-medium">{member.position}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      aria-label="LinkedIn"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      aria-label="Twitter"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      aria-label="Facebook"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      aria-label="Instagram"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
