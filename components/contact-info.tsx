"use client"

import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactInfo() {
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
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 gradient-heading">Información de Contacto</h3>
        <p className="text-muted-foreground mb-8">
          Estamos disponibles para responder a sus consultas y proporcionarle la información que necesita. No dude en
          ponerse en contacto con nosotros a través de cualquiera de los siguientes medios.
        </p>
      </div>

      <div className="space-y-6">
        {contactInfo.map((item, index) => (
          <div key={index} className="flex items-start gap-4 group">
            <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
              {item.icon}
            </div>
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
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="font-medium mb-3">Horario de Atención</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lunes a Viernes:</span>
            <span className="font-medium">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sábados:</span>
            <span className="font-medium">9:00 AM - 1:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Domingos:</span>
            <span className="font-medium">Cerrado</span>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="font-medium mb-3">Síguenos en Redes Sociales</h4>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/share/1BLkdMK3zG/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="bg-muted/80 p-2 rounded-full hover:bg-primary/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/sng_servimax?igsh=MTAyMnhveTJrNGIzaQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="bg-muted/80 p-2 rounded-full hover:bg-primary/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
