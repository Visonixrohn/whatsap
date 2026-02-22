#!/bin/bash

# Script de prueba para la API de WhatsApp
# Asegúrate de tener curl instalado

# Configuración
API_URL="http://localhost:3000/api/send-message"
# API_URL="https://tu-proyecto.vercel.app/api/send-message"  # Descomenta para producción

# Colores para la salida
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🧪 Prueba de API de WhatsApp${NC}"
echo "================================"
echo ""

# Test 1: Request válido
echo -e "${YELLOW}Test 1: Request válido${NC}"
echo -e "${GREEN}Enviando mensaje...${NC}"

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "pedido": "Pizza Margherita",
    "telefono": "573001234567"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ Test 1 PASSED${NC}"
else
    echo -e "${RED}❌ Test 1 FAILED${NC}"
fi

echo ""
echo "================================"
echo ""

# Test 2: Request con datos faltantes
echo -e "${YELLOW}Test 2: Request con datos faltantes${NC}"
echo -e "${GREEN}Enviando request sin nombre...${NC}"

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "pedido": "Pizza Napolitana",
    "telefono": "573001234567"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" -eq 400 ]; then
    echo -e "${GREEN}✅ Test 2 PASSED (Error esperado)${NC}"
else
    echo -e "${RED}❌ Test 2 FAILED${NC}"
fi

echo ""
echo "================================"
echo ""

# Test 3: Método no permitido (GET)
echo -e "${YELLOW}Test 3: Método no permitido (GET)${NC}"
echo -e "${GREEN}Enviando GET request...${NC}"

response=$(curl -s -w "\n%{http_code}" -X GET "$API_URL")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" -eq 405 ]; then
    echo -e "${GREEN}✅ Test 3 PASSED (Error esperado)${NC}"
else
    echo -e "${RED}❌ Test 3 FAILED${NC}"
fi

echo ""
echo "================================"
echo ""

# Test 4: Teléfono inválido
echo -e "${YELLOW}Test 4: Teléfono inválido${NC}"
echo -e "${GREEN}Enviando request con teléfono corto...${NC}"

response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "pedido": "Pizza Pepperoni",
    "telefono": "123"
  }')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" -eq 400 ]; then
    echo -e "${GREEN}✅ Test 4 PASSED (Error esperado)${NC}"
else
    echo -e "${RED}❌ Test 4 FAILED${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 Tests completados${NC}"
echo ""
