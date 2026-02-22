/**
 * API de WhatsApp para Vercel
 *
 * Este endpoint recibe un POST con datos del pedido
 * y envía un mensaje de WhatsApp al cliente
 */

export default async function handler(req, res) {
  // Configurar CORS si es necesario
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Manejar preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { nombre, pedido, telefono } = req.body;

    // Validar datos requeridos
    if (!nombre || !pedido || !telefono) {
      return res.status(400).json({
        error: "Faltan datos requeridos",
        required: ["nombre", "pedido", "telefono"],
      });
    }

    // Validar formato de teléfono (opcional pero recomendado)
    const telefonoLimpio = telefono.replace(/\D/g, "");
    if (telefonoLimpio.length < 10) {
      return res.status(400).json({
        error: "El teléfono no tiene un formato válido",
      });
    }

    try {
      const token = "EAAUQK71Ju3sBQ1mDW4ZCDeEd6e7fyYGWEftqtmoRD6fZBF6lLmvHa5ufZBZCn4udAEF5jHEsMm9km7R5ZCGb6gIBh9HuWElHo22hQPjdJtQkQyv9IZAHR0kTwpws8WvwrREJAfT5db0VswpyMHZCM4QAfHYj2YYrYDyF2AgGuQDZC3dSozpZCSOXMTmjGGniZCygBaAdqcTjvIh5qrUzLI1lqljYZAM6mC2XPoZB1ZBC0ke3NCV1bysXfkIfMBo6kAhmhWrB5hgjwnF1FVO7fcVFuTN1uerLZB";
      const phoneNumberId = "1051909711331502";

      // Verificar que las variables de entorno estén configuradas
      if (!token || !phoneNumberId) {
        return res.status(500).json({
          error:
            "Configuración del servidor incompleta. Verifica las variables de entorno.",
        });
      }

      const payload = {
        messaging_product: "whatsapp",
        to: telefonoLimpio,
        type: "text",
        text: {
          body: `Hola ${nombre}, tu pedido ${pedido} ya está listo 🍕`,
        },
      };

      const response = await fetch(
        `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        console.error("Error de WhatsApp API:", data);
        return res.status(response.status).json({
          error: "Error al enviar mensaje de WhatsApp",
          details: data,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Mensaje enviado correctamente",
        data,
      });
    } catch (err) {
      console.error("Error en el servidor:", err);
      return res.status(500).json({
        error: "Error interno del servidor",
        message: err.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).json({
      error: `Método ${req.method} no permitido`,
    });
  }
}
