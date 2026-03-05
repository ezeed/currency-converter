# Currency Converter Plan

- [x] Definir y justificar stack de tecnologías
- [x] Definir Objetivo, fuente de información y tareas 
- [x] Challengearlo con brainstorm skill y definir plan de ejecución.
- [x] Implementación

## Stack de tecnologias

### React w/ Vite

Es requerido el uso de react como librería y la implementación mas simple, rápida pero efectiva es Vite. Utilizar Nextjs estuvo entre las opciónes pero era una solución muy elaborada para el caso de uso, la mayoría de los features interesantes de la librería no se podrían aprovechar, bundle and deploy mas complejo.

### Tailwind CSS

Estandar de manejo de estilos que matchea perfecto con la implementación. Liviano, rapido de desarrollar y amigable LLMs

### Tanstak Query

Vale la pena el uso de Tanstak por la capa de integración con el API, beneficios para manejar los request e integrarlo fácilmente con el estado de la app.

### Claude code

Ayuda a planear, buscard edge cases, refinar tareas y ejecutarlas

--

## Objetivo

- Crear una web app utilizando el stack de tecnologías mencionado
- Definiciones
  - Dado un monto comparar la conversión una moneda a otra
  - Default 1
  - Default de USD -> EUR
  - Al modificar el input de texto aplica automaticamente los cambios
  - Se puede switchear entre currencies con un boton
- La app web app debe soportar desktop y mobile
- Debe cumplir con el diseño propuesto en @Challenge IOL.pdf

--

## Fuente de información

### Descripción del enunciado

@Challenge IOL.pdf

### API

// swagger docs
https://api.vatcomply.com/docs

// Obtener listado de currencies
GET https://api.vatcomply.com/currencies

// Comparar symbols rates (default base EUR)
GET https://api.vatcomply.com/rates?symbols=USD,GBP

// Comparar symbols rates with custom base
https://api.vatcomply.com/rates?symbols=EUR,GBP&base=USD

--

## Tareas

### Maquetado

- Maquetado mobile first
- Definir style base tailwind defaults
  - Tipografías
  - Paleta de colores
- Estructura con MOCKS basados en estructura de respuesta de API
  - Header
  - Title dinamico con parametros seleccionados (1 USD to EUR)
  - Main
    - Input monto
    - Select currencies switcheables con un btn
    - Resultado de conversión
      - Amount, currency from, currency to
      - conversion detail 1 EUR = 136,400USD
    - Texto informativo y resumen de información fetcheada con la actualización de último update

### Implementar funcionalidad

- Implementar custom hook para llamada al API con react query
  - Default amount 1
  - Default From USD, to EUR
- Implementar get de conversión rate con debounce en el input para evitar llamadas innecesarias y sanear a numérico positivo
- Implementar manejo de errores (TBD, maybe toast o error message)

### Detalles

- Accessibilidad
  - Auto focus on load al input de monto
  - ARIA elements
- Web vitals analisis
