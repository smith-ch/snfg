# Configuración de EmailJS para SNG SERVIMAX

Este documento explica cómo configurar EmailJS para el envío de correos electrónicos en el sitio web de SNG SERVIMAX.

## ¿Qué es EmailJS?

EmailJS es un servicio gratuito que permite enviar correos electrónicos directamente desde JavaScript sin necesidad de un servidor backend. El plan gratuito incluye:

- ✅ 200 emails por mes
- ✅ 2 plantillas de email
- ✅ Soporte para adjuntos (hasta 5MB)
- ✅ Sin necesidad de servidor

## Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" (Registrarse)
3. Crea una cuenta gratuita con tu email

## Paso 2: Conectar tu servicio de email

1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail" (recomendado)
4. Sigue las instrucciones para conectar tu cuenta de Gmail (`sngservimax@gmail.com`)
5. Copia el **Service ID** que aparece (ejemplo: `service_abc123`)

## Paso 3: Crear plantilla para el formulario de contacto

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Nombra la plantilla: "Contacto Web"
4. En el contenido del template, usa este formato:

\`\`\`
Subject: Nueva consulta desde la web - {{subject}}

Hola,

Has recibido un nuevo mensaje desde el formulario de contacto de SNG SERVIMAX:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 DATOS DEL CLIENTE

Nombre: {{name}}
Email: {{email}}
Teléfono: {{phone}}
Servicio de interés: {{service}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MENSAJE:

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este mensaje fue enviado desde el formulario de contacto de www.sngservimax.com
\`\`\`

5. En "Settings", establece:
   - **To Email**: `sngservimax@gmail.com`
   - **From Name**: SNG SERVIMAX - Web
   - **Reply To**: `{{email}}`
6. Guarda y copia el **Template ID** (ejemplo: `template_xyz789`)

## Paso 4: Crear plantilla para postulaciones (CVs)

1. Crea otra plantilla nueva
2. Nombra la plantilla: "Postulación Empleo"
3. Usa este formato:

\`\`\`
Subject: 📋 Nueva postulación - {{puesto}}

Hola,

Has recibido una nueva postulación desde la web de SNG SERVIMAX:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMACIÓN DEL CANDIDATO

Nombre completo: {{nombre}} {{apellidos}}
Email: {{email}}
Teléfono: {{telefono}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 DETALLES DE LA POSTULACIÓN

Puesto: {{puesto}}
Experiencia: {{experiencia}}
Disponibilidad: {{disponibilidad}}

LinkedIn: {{linkedin}}
Portafolio: {{portfolio}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MENSAJE DEL CANDIDATO:

{{mensaje}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📎 CURRÍCULUM ADJUNTO

El CV del candidato está adjunto en este email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este mensaje fue enviado desde el formulario de empleo de www.sngservimax.com
\`\`\`

4. En "Settings":
   - **To Email**: `sngservimax@gmail.com`
   - **From Name**: SNG SERVIMAX - Empleo
   - **Reply To**: `{{email}}`
   - **Enable attachments**: ✅ Activar
5. Guarda y copia el **Template ID** (ejemplo: `template_cv123`)

## Paso 5: Obtener tu Public Key

1. Ve a "Account" en el menú
2. En la sección "API Keys", copia tu **Public Key** (ejemplo: `abcdef123456`)

## Paso 6: Configurar las variables de entorno

1. En la raíz del proyecto, crea un archivo `.env.local`
2. Agrega tus credenciales:

\`\`\`bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE=tu_contact_template_id_aqui
NEXT_PUBLIC_EMAILJS_CV_TEMPLATE=tu_cv_template_id_aqui
\`\`\`

3. Reemplaza los valores con tus credenciales reales de EmailJS

## Paso 7: Probar el envío

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Ve a la página de contacto: `http://localhost:3000/contacto`
3. Completa el formulario y envía un mensaje de prueba
4. Revisa tu bandeja de entrada en `sngservimax@gmail.com`

## Importante: Límites del plan gratuito

- 📧 **200 emails/mes** gratis
- 📎 **Adjuntos**: máximo 5MB por archivo
- ⚡ **Rate limit**: máximo 10 emails por minuto

Si necesitas más emails, considera actualizar a un plan de pago de EmailJS.

## Solución de problemas

### El email no llega

1. Verifica que las credenciales en `.env.local` sean correctas
2. Revisa la carpeta de spam en Gmail
3. Verifica en el dashboard de EmailJS si hay errores
4. Asegúrate de que el servicio de Gmail esté correctamente conectado

### Error de CORS

EmailJS maneja automáticamente CORS, pero asegúrate de que tu dominio esté en la lista blanca en EmailJS si estás en producción.

### Adjuntos no se envían

1. Verifica que la opción "Enable attachments" esté activada en la plantilla
2. Asegúrate de que el archivo sea menor a 5MB
3. Verifica que el formato sea PDF o Word

## Despliegue a producción

Cuando despliegues a Vercel, no olvides agregar las variables de entorno en:

Settings → Environment Variables

Y agrega todas las variables `NEXT_PUBLIC_EMAILJS_*` con sus valores correspondientes.

## Soporte

Si tienes problemas, consulta la documentación oficial de EmailJS: https://www.emailjs.com/docs/
