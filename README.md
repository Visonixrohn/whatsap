# 📱 WhatsApp Business API - Backend para Vercel

Backend serverless para enviar mensajes de WhatsApp usando la API de Meta Business Platform. Diseñado para desplegarse en Vercel.

## 🚀 Características

- ✅ Envío de mensajes de WhatsApp automáticos
- ✅ Serverless (sin servidor que mantener)
- ✅ Configuración de CORS incluida
- ✅ Validación de datos
- ✅ Manejo de errores robusto
- ✅ Variables de entorno seguras
- ✅ Fácil despliegue en Vercel

## 📋 Requisitos Previos

1. **Cuenta de WhatsApp Business**
   - Registro en [Meta for Developers](https://developers.facebook.com/)
   - Configurar WhatsApp Business API
   - Obtener token de acceso y Phone Number ID

2. **Cuenta de Vercel**
   - Crear cuenta en [Vercel](https://vercel.com/)

3. **Node.js**
   - Versión 14.x o superior (para pruebas locales)

## 🔧 Configuración

### 1. Clonar o descargar el proyecto

```bash
cd whatsap
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
WHATSAPP_TOKEN=tu_token_de_whatsapp_business
WHATSAPP_PHONE_NUMBER_ID=tu_numero_id_de_whatsapp
```

#### ¿Dónde conseguir estos datos?

**Token de WhatsApp (WHATSAPP_TOKEN):**

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Selecciona tu aplicación
3. En el panel lateral, busca "WhatsApp" > "Inicio rápido"
4. Copia el token temporal o genera uno permanente

**Phone Number ID (WHATSAPP_PHONE_NUMBER_ID):**

1. En la misma sección de WhatsApp en Meta for Developers
2. Encontrarás el "Phone number ID" junto a tu número de teléfono
3. Copia ese ID (solo números)

## 🧪 Pruebas en Local

Para probar el proyecto localmente con Vercel CLI:

```bash
# Instalar Vercel CLI globalmente (si no lo tienes)
npm install -g vercel

# Ejecutar en modo desarrollo
vercel dev
```

O usando el script npm:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Probar el endpoint

Puedes probar con cURL:

```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "pedido": "Pizza Margherita",
    "telefono": "573001234567"
  }'
```

O con Postman/Insomnia:

- **URL:** `http://localhost:3000/api/send-message`
- **Método:** POST
- **Headers:** `Content-Type: application/json`
- **Body:**

```json
{
  "nombre": "Juan",
  "pedido": "Pizza Margherita",
  "telefono": "573001234567"
}
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde la interfaz de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en "Add New..." > "Project"
3. Importa tu repositorio de Git o sube los archivos
4. Configura las variables de entorno:
   - `WHATSAPP_TOKEN`
   - `WHATSAPP_PHONE_NUMBER_ID`
5. Click en "Deploy"

### Opción 2: Desde la terminal

```bash
# Login en Vercel (solo la primera vez)
vercel login

# Desplegar
vercel --prod
```

Durante el proceso:

1. Te pedirá configurar el proyecto
2. Acepta los valores por defecto
3. Una vez desplegado, añade las variables de entorno:

```bash
vercel env add WHATSAPP_TOKEN
vercel env add WHATSAPP_PHONE_NUMBER_ID
```

## 📡 Uso de la API

### Endpoint

```
POST https://tu-proyecto.vercel.app/api/send-message
```

### Request Body

```json
{
  "nombre": "Nombre del cliente",
  "pedido": "Descripción del pedido",
  "telefono": "573001234567"
}
```

**Importante:** El teléfono debe incluir código de país (Ej: 57 para Colombia, 52 para México)

### Respuesta Exitosa (200)

```json
{
  "success": true,
  "message": "Mensaje enviado correctamente",
  "data": {
    "messaging_product": "whatsapp",
    "contacts": [...],
    "messages": [...]
  }
}
```

### Respuestas de Error

**400 - Datos faltantes:**

```json
{
  "error": "Faltan datos requeridos",
  "required": ["nombre", "pedido", "telefono"]
}
```

**400 - Teléfono inválido:**

```json
{
  "error": "El teléfono no tiene un formato válido"
}
```

**500 - Error del servidor:**

```json
{
  "error": "Error interno del servidor",
  "message": "Descripción del error"
}
```

## 🔗 Integración con tu Web App

### Ejemplo con JavaScript Vanilla

```javascript
async function enviarMensajeWhatsApp(nombre, pedido, telefono) {
  try {
    const response = await fetch(
      "https://tu-proyecto.vercel.app/api/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          pedido,
          telefono,
        }),
      },
    );

    const data = await response.json();

    if (data.success) {
      console.log("Mensaje enviado correctamente");
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}

// Usar la función
enviarMensajeWhatsApp("Juan Pérez", "Pizza Hawaiana", "573001234567");
```

### Ejemplo con React

```jsx
import { useState } from "react";

function EnviarMensaje() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://tu-proyecto.vercel.app/api/send-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            pedido: e.target.pedido.value,
            telefono: e.target.telefono.value,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setMensaje("¡Mensaje enviado correctamente!");
      } else {
        setMensaje("Error: " + data.error);
      }
    } catch (error) {
      setMensaje("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" required />
      <input name="pedido" placeholder="Pedido" required />
      <input name="telefono" placeholder="Teléfono" required />
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar WhatsApp"}
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
```

## 📁 Estructura del Proyecto

```
whatsap/
├── api/
│   └── send-message.js      # Función serverless principal
├── .env                      # Variables de entorno (no subir a Git)
├── .env.example              # Plantilla de variables de entorno
├── .gitignore                # Archivos a ignorar en Git
├── package.json              # Dependencias y scripts
├── vercel.json               # Configuración de Vercel
└── README.md                 # Este archivo
```

## 🔒 Seguridad

⚠️ **Importante:**

- **NUNCA** subas el archivo `.env` a Git
- **NUNCA** expongas tu token de WhatsApp públicamente
- Configura las variables de entorno directamente en Vercel Dashboard
- Considera implementar un sistema de autenticación (API key) para tu endpoint
- Valida y sanitiza todos los inputs del usuario

### Añadir autenticación básica (opcional)

Puedes agregar una API key simple editando `api/send-message.js`:

```javascript
const API_KEY = process.env.API_KEY;

if (req.headers["x-api-key"] !== API_KEY) {
  return res.status(401).json({ error: "No autorizado" });
}
```

Y configurar la variable `API_KEY` en Vercel.

## 🐛 Solución de Problemas

### El mensaje no se envía

1. Verifica que el token de WhatsApp sea válido
2. Asegúrate que el Phone Number ID sea correcto
3. Revisa que el número de teléfono incluya código de país
4. Verifica los logs en Vercel Dashboard

### Error 500

1. Revisa los logs en Vercel: `vercel logs`
2. Asegúrate que las variables de entorno estén configuradas
3. Verifica que tu token no haya expirado

### CORS errors

El código ya incluye configuración CORS. Si sigues teniendo problemas:

- Verifica que tu dominio esté permitido
- Considera configurar dominios específicos en lugar de `*`

## 📝 Logs

Ver logs en producción:

```bash
vercel logs [deployment-url]
```

O ve a Vercel Dashboard > Tu Proyecto > Deployments > Ver logs

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📞 Soporte

- [Documentación de WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Documentación de Vercel](https://vercel.com/docs)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.
