# 🚀 Guía de Inicio Rápido

## ⚡ Despliegue en 5 minutos

### 1️⃣ Preparación

Antes de empezar, necesitas:
- ✅ Token de WhatsApp Business API
- ✅ Phone Number ID de WhatsApp
- ✅ Cuenta en Vercel (gratis)

### 2️⃣ Obtener credenciales de WhatsApp

1. Ve a https://developers.facebook.com/
2. Selecciona tu aplicación (o crea una nueva)
3. En el menú lateral: **WhatsApp** > **Inicio rápido**
4. Copia:
   - **Token temporal** o genera uno permanente
   - **Phone Number ID** (debajo del número de teléfono)

### 3️⃣ Desplegar en Vercel

#### Opción A: Interfaz web (más fácil)

1. Sube este proyecto a GitHub
2. Ve a https://vercel.com/
3. Click en **"Add New Project"**
4. Importa tu repositorio
5. En **"Environment Variables"** añade:
   ```
   WHATSAPP_TOKEN=tu_token_aqui
   WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id_aqui
   ```
6. Click en **"Deploy"**
7. ¡Listo! 🎉

#### Opción B: Terminal

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Desplegar
vercel

# 4. Añadir variables de entorno
vercel env add WHATSAPP_TOKEN
vercel env add WHATSAPP_PHONE_NUMBER_ID

# 5. Desplegar en producción
vercel --prod
```

### 4️⃣ Probar la API

Copia la URL que te dio Vercel (ejemplo: `https://tu-proyecto.vercel.app`)

```bash
curl -X POST https://tu-proyecto.vercel.app/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "pedido": "Pizza Margherita",
    "telefono": "573001234567"
  }'
```

O usa Postman/Insomnia con los mismos datos.

### 5️⃣ Integrar con tu web app

```javascript
// En tu aplicación web
const response = await fetch('https://tu-proyecto.vercel.app/api/send-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Juan Pérez',
    pedido: 'Pizza Hawaiana',
    telefono: '573001234567'
  })
});

const data = await response.json();
console.log(data);
```

---

## 📝 Notas importantes

1. **Formato del teléfono**: Debe incluir código de país sin el símbolo +
   - ✅ Correcto: `573001234567` (Colombia)
   - ❌ Incorrecto: `+57 300 123 4567` o `3001234567`

2. **Seguridad**: Nunca expongas tu token públicamente

3. **Límites**: Vercel free tier tiene límites:
   - 100 GB bandwidth/mes
   - 100 horas de ejecución/mes
   - Suficiente para la mayoría de apps pequeñas

4. **Desarrollo local**:
   ```bash
   npm install
   vercel dev
   # API disponible en http://localhost:3000
   ```

---

## 🆘 Problemas comunes

**Error: Missing environment variables**
→ Configura las variables de entorno en Vercel Dashboard

**Error: Invalid phone number**
→ Asegúrate de incluir código de país (ej: 57 para Colombia)

**Error: Token expired**
→ Genera un nuevo token en Facebook Developers

**404 Not Found**
→ Verifica que la URL sea: `/api/send-message` (no `/send-message`)

---

## 📚 Más información

Ver el archivo completo: [README.md](README.md)
