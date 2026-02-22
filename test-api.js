/**
 * Script de prueba para Node.js
 * Uso: node test-api.js
 */

const API_URL = "http://localhost:3000/api/send-message";
// const API_URL = 'https://tu-proyecto.vercel.app/api/send-message'; // Para producción

const tests = [
  {
    name: "Test 1: Request válido",
    payload: {
      nombre: "Test Usuario",
      pedido: "Pizza Margherita",
      telefono: "573001234567",
    },
    expectedStatus: 200,
  },
  {
    name: "Test 2: Datos faltantes (sin nombre)",
    payload: {
      pedido: "Pizza Napolitana",
      telefono: "573001234567",
    },
    expectedStatus: 400,
  },
  {
    name: "Test 3: Teléfono inválido",
    payload: {
      nombre: "Test Usuario",
      pedido: "Pizza Pepperoni",
      telefono: "123",
    },
    expectedStatus: 400,
  },
  {
    name: "Test 4: Todos los campos vacíos",
    payload: {
      nombre: "",
      pedido: "",
      telefono: "",
    },
    expectedStatus: 400,
  },
];

async function runTest(test) {
  console.log(`\n🧪 ${test.name}`);
  console.log("━".repeat(50));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test.payload),
    });

    const data = await response.json();
    const passed = response.status === test.expectedStatus;

    console.log(`📤 Request:`, JSON.stringify(test.payload, null, 2));
    console.log(`📊 HTTP Status: ${response.status}`);
    console.log(`📥 Response:`, JSON.stringify(data, null, 2));
    console.log(passed ? "✅ PASSED" : "❌ FAILED");

    return passed;
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log("\n🚀 Iniciando pruebas de API de WhatsApp");
  console.log("═".repeat(50));

  const results = [];

  for (const test of tests) {
    const result = await runTest(test);
    results.push(result);
  }

  console.log("\n" + "═".repeat(50));
  console.log(
    `\n📊 Resumen: ${results.filter((r) => r).length}/${results.length} tests pasaron`,
  );

  const allPassed = results.every((r) => r);
  console.log(
    allPassed ? "\n✅ Todos los tests pasaron!" : "\n❌ Algunos tests fallaron",
  );
}

// Ejecutar tests
runAllTests().catch((error) => {
  console.error("Error ejecutando tests:", error);
  process.exit(1);
});
