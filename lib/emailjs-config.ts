// Configuración de EmailJS con credenciales reales
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: "kSs5McRqpYXgqYrsp",
  SERVICE_ID: "service_czyjbib",
  TEMPLATE_ID: "template_20s26of",
  CONTACT_TEMPLATE_ID: "template_20s26of",
  CV_TEMPLATE_ID: "template_20s26of", // Puedes crear un template separado para CV
}

// Email de destino
export const DESTINATION_EMAIL = "sngservimax@gmail.com"

// Plantilla para el formulario de contacto:
/*
Asunto: Nueva consulta desde la web - {{subject}}

Hola,

Has recibido un nuevo mensaje desde el formulario de contacto de SNG SERVIMAX:

Nombre: {{name}}
Email: {{email}}
Teléfono: {{phone}}
Servicio de interés: {{service}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de www.sngservimax.com
*/

// Plantilla para el formulario de CV:
/*
Asunto: Nueva postulación - {{puesto}}

Hola,

Has recibido una nueva postulación desde la web de SNG SERVIMAX:

Nombre completo: {{nombre}} {{apellidos}}
Email: {{email}}
Teléfono: {{telefono}}
Puesto: {{puesto}}
Experiencia: {{experiencia}}
Disponibilidad: {{disponibilidad}}

LinkedIn: {{linkedin}}
Portafolio: {{portfolio}}

Mensaje del candidato:
{{mensaje}}

NOTA: El CV está adjunto en el email.

---
Este mensaje fue enviado desde el formulario de empleo de www.sngservimax.com
*/
