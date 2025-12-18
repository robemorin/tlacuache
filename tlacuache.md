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
<tlacuache-ejes size="300,400" xlim="-5,5" ylim="-25,25" dx="1" dy="5">
  <tlacuache-plot f="x**2" color="blue" lineWidth="2"></tlacuache-plot>
</tlacuache-ejes>

<tlacuache-tabla estilo="ieee" nombre="x,y" col1="1,2,3" col2="1,4,9">
</tlacuache-tabla>

<tlacuache-dist-normal dim="300,480" s="2" mean="10" xtick="10,7,11"  xmin="6" xlabel="Peso (Kg)"/>

<tlacuache-cuartil q="[-4,-0,0,6,8]" lim="-6,10,2" dim="280,400" xlabel='eje x' > </tlacuache-cuartil>
<tlacuache-cuartil q="[-4,-0,0,6,8],[-3,-2,0,1,3]" lim="-6,10,2" dim="280,400" xlabel='eje x' ></tlacuache-cuartil>
	
<tlacuache-venn ancho="400" s1="0" s2="0.3" s3="$$\frac{1}{4}$$"/></tlacuache-venn/>
<tlacuache-venn ancho="400" n="3" s1="$$\frac{3}{2}$$" s2="$$\frac{\omega}{2}$$"  s4="0.1" /></tlacuache-venn/>

<tlacuache-ejes size="320,480" xlabel="" ylabel="Frecuencias Acumuladas"  xlim="0,100" dx="10" ylim="0,160" dy="20" >
  <tlacuache-poli_fa x="10,30,50,60,100" y="0,20,60,100,160"></tlacuache-poli_fa>
</tlacuache-ejes>

<tlacuache-ejes size="320,480" xlabel="" ylabel="Frecuencias Acumuladas"  xlim="0,55" dx="10" ylim="0,160" dy="20"  >
  <tlacuache-histograma  inicio="15" paso="10" frecuencias="150,130,110,90" ></tlacuache-histograma>
</tlacuache-ejes>

 <tlacuache-milimetrado size="300,720" cuadricula="5,12"  n="5" color = 'RGB(200, 64, 64)'  stroke = ".7" stroke2 = ".2"/>
```
