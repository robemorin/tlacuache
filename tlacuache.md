# Tlacuache Library Documentation

## Project Overview

`tlacuache` is a client-side JavaScript library designed for mathematical computation and visualization. It operates through a set of custom HTML elements (Web Components) and a comprehensive module of mathematical functions. The library allows users to embed complex graphs, tables, and mathematical diagrams directly into an HTML page in a declarative way. It uses MathJax for rendering LaTeX expressions.

## Core Files

The project is primarily structured around four files located in the `src/` directory.

### 1. `tlacuache.mjs`

*   **Purpose**: This is the main entry point of the library.
*   **Functionality**:
    *   It dynamically loads and configures the **MathJax 3** library to enable LaTeX rendering.
    *   It imports `tlacuache-elements.js` to register all the custom HTML elements.

### 2. `tlacuache-modulo.mjs`

*   **Purpose**: This is the core computational engine of the library. It exports a wide range of mathematical utilities.
*   **Key Objects and Functions**:
    *   `poli`: A collection of functions for **polynomial operations**, including simplification, differentiation, evaluation, and pretty-printing to LaTeX format.
    *   `stat`: A suite of **statistical functions** like `linReg` (linear regression), `mean`, `pearson`, `spearman`, and `calc_2varStat` (2-variable statistics).
    *   `graph`: Utilities for creating graph ticks and other visual elements.
    *   `diagramaAsignacion` / `tipoRelacion`: Functions to generate and render **set relation diagrams** (e.g., functions, bijective, surjective).
    *   **Numerical Methods**: Implementations of algorithms like `metTrapecio` (Trapezoidal Rule), `newton`, `secante`, and `biseccion`.
    *   **General Math Utilities**: Functions for handling fractions (`fraccion`, `simplify_frac`), number sequences (`linspace`), financial calculations (`financiera`), scientific notation (`NotacionCientifica`), and more.

### 3. `tlacuache-elements.js`

*   **Purpose**: Defines all the custom HTML elements that serve as the user-facing interface of the library.
*   **Main Custom Elements**:
    *   `<tlacuache-ejes>`: Creates a Cartesian coordinate system. It acts as a container or "canvas" for other plotting elements. Key attributes include `size`, `xlim`, `ylim`, `xtick`, `ytick`, `xlabel`, and `ylabel`.
    *   `<tlacuache-plot>`: Plots data points or a mathematical function onto a parent `<tlacuache-ejes>` element. Can plot from coordinate arrays (`x`, `y`) or from a function string (`f`).
    *   `<tlacuache-histograma>`: Draws a histogram on `<tlacuache-ejes>`.
    *   `<tlacuache-cuartil>`: Renders a box-and-whisker plot for quartile visualization.
    *   `<tlacuache-venn>`: Generates 2-set or 3-set Venn diagrams with labels for each region.
    *   `<tlacuache-tabla>`: Creates structured tables with predefined styles (`ieee`, `dato`).
    *   `<tlacuache-dist-normal>`: Draws a normal distribution bell curve.
    *   `<tlacuache-milimetrado>` / `<tlacuache-renglon>`: Generates SVG backgrounds that resemble millimeter grid paper or lined paper.

### 4. `tlacuache.css`

*   **Purpose**: Provides styling for the custom elements.
*   **Functionality**: It mainly contains CSS rules for the tables created with `<tlacuache-tabla>`, defining styles like `tlacuache_tabla_ieee` and `tlacuache_tabla_dato`.

## Basic Usage

To use the library, include the main module in an HTML file. Then, use the custom elements in the HTML body to render content.

```html
<!-- 1. Include the main script -->
<script type="module" src="src/tlacuache.mjs"></script>

<!-- 2. Use the custom elements in your HTML -->
<tlacuache-ejes size="[300,400]" xlim="[-5,5]" ylim="[-25,25]" dx="1" dy="5">
  <tlacuache-plot f="x**2" color="blue" lineWidth="2"></tlacuache-plot>
</tlacuache-ejes>

<tlacuache-tabla estilo="ieee" nombre="x,y" col1="1,2,3" col2="1,4,9">
</tlacuache-tabla>
```
