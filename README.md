# Solucionador de Programación Lineal - Método Gráfico

Una aplicación web interactiva para resolver problemas de programación lineal mediante el método gráfico.

## 📋 Descripción

Este solucionador permite resolver problemas de optimización lineal con dos variables de decisión (x₁, x₂) de manera visual e interactiva. La herramienta muestra paso a paso el procedimiento del método gráfico, incluyendo:

- Identificación de la función objetivo
- Análisis de restricciones
- Cálculo de intersecciones
- Determinación de vértices factibles
- Evaluación de la función objetivo en cada vértice
- Selección de la solución óptima

## ✨ Características

- **Maximización y Minimización**: Soporta ambos tipos de problemas de optimización
- **Restricciones flexibles**: Permite agregar múltiples restricciones con operadores ≤, ≥ o =
- **Visualización gráfica**: Muestra la región factible y el punto óptimo en un gráfico interactivo
- **Procedimiento detallado**: Explica cada paso del método gráfico con interpretaciones
- **Interfaz intuitiva**: Fácil de usar para estudiantes y profesionales

## 🚀 Uso

1. Abre `index.html` en tu navegador web
2. Define la función objetivo:
   - Selecciona si deseas **Maximizar** o **Minimizar**
   - Ingresa los coeficientes de x₁ y x₂
3. Configura las restricciones:
   - Ingresa los coeficientes de cada restricción
   - Selecciona el operador (≤, ≥, =)
   - Ingresa el valor del lado derecho
   - Usa "Agregar Restricción" para añadir más restricciones
4. Haz clic en **Resolver** para obtener la solución

## 📁 Estructura del Proyecto

```
SolucionadorMetodoGrafico/
├── index.html          # Estructura HTML principal
├── README.md           # Este archivo
├── css/
│   └── styles.css      # Estilos de la aplicación
└── js/
    ├── state.js        # Variables de estado global
    ├── constraints.js  # Manejo de restricciones
    ├── solver.js       # Algoritmo del método gráfico
    ├── display.js      # Visualización del procedimiento
    ├── graph.js        # Renderizado del gráfico
    └── main.js         # Inicialización de la aplicación
```

## 📐 Ejemplo

**Problema:**
- Maximizar Z = 3x₁ + 2x₂
- Sujeto a:
  - 2x₁ + x₂ ≤ 20
  - x₁ + 2x₂ ≤ 16
  - x₁ ≤ 8
  - x₁, x₂ ≥ 0

**Solución:**
- Punto óptimo: x₁ = 8, x₂ = 4
- Valor máximo: Z = 32

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API para gráficos

## 👥 Autores

- Juan Andrés Herrera Ramírez
- Jose Daniel Polo Narvaez

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
