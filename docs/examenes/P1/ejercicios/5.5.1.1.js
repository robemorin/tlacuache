import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.5. Integración",
    seccion: "5.5.1. Áreas y Volúmenes",
    titulo: "Área entre curvas",
    tipo: 1,
    puntos: 7
};

export async function generar(i) {
    // 1. Generar parámetros aleatorios
    // Intersecciones x1 (negativo) y x2 (positivo)
    const x1 = -(Math.floor(Math.random() * 2) + 1); // -1 o -2
    const x2 = Math.floor(Math.random() * 3) + 2;    // 2, 3, o 4

    // Parámetro 'a' de la parábola (concavidad positiva)
    const a = [1, 1.5, 2][Math.floor(Math.random() * 3)];

    // Calcular k mínimo para que el vértice esté sobre el eje x
    // k >= a(x1-x2)^2 / 4 + (x1+x2)/2 + 1/(4a)
    const min_k = (a * Math.pow(x1 - x2, 2)) / 4 + (x1 + x2) / 2 + 1 / (4 * a);

    // Parámetro de la recta y = -x + k
    // k debe ser mayor que min_k y suficiente para que se vea bien
    const k_line = Math.ceil(min_k) + Math.floor(Math.random() * 3) + 2;

    // Derivar b y c para que se intersecten en x1 y x2
    const b = -a * (x1 + x2) - 1;
    const c = a * x1 * x2 + k_line;

    // Funciones reales para cálculo
    const f_line = (x) => -x + k_line;
    const f_curve = (x) => a * x * x + b * x + c;

    // Puntos de intersección reales
    const y1 = f_line(x1);
    const y2 = f_line(x2);

    // 2. Cálculos de Áreas
    const area_line = (y1 + y2) * (x2 - x1) / 2;
    const F_curve = (x) => (a / 3) * Math.pow(x, 3) + (b / 2) * Math.pow(x, 2) + c * x;
    const area_curve = F_curve(x2) - F_curve(x1);

    // Área entre curvas (Recta - Curva)
    // Como a > 0 y se intersectan en x1, x2, la recta está por encima en [x1, x2]
    const area_between = area_line - area_curve;

    // 3. Generación de Gráficos SVG (Representativos)
    // Usamos parámetros fijos para que el dibujo siempre se vea "bonito" y consistente
    // independientemente de los valores aleatorios del problema.
    const draw_x1 = -1;
    const draw_x2 = 2;
    const draw_k = 6;
    const draw_a = 1.5;
    // draw_b y draw_c derivados para intersección en -1 y 2 con y = -x + 6
    // b = -1.5(-1+2) - 1 = -1.5 - 1 = -2.5
    // c = 1.5(-1)(2) + 6 = -3 + 6 = 3
    const draw_b = -2.5;
    const draw_c = 3;

    const f_line_draw = (x) => -x + draw_k;
    const f_curve_draw = (x) => draw_a * x * x + draw_b * x + draw_c;

    // Configuración del lienzo
    const margin = 30;
    const width = 300;
    const height = 250;

    // Definir rangos de visualización fijos
    const x_min = -2.5;
    const x_max = 3.5;
    const y_min = -1;
    const y_max = 9;

    // Funciones de escala
    const mapX = (x) => margin + (x - x_min) * (width - 2 * margin) / (x_max - x_min);
    const mapY = (y) => height - margin - (y - y_min) * (height - 2 * margin) / (y_max - y_min);

    // Ejes
    const xAxisY = mapY(0);
    const yAxisX = mapX(0);

    const drawAxes = () => `
        <line x1="${margin}" y1="${xAxisY}" x2="${width - margin}" y2="${xAxisY}" stroke="black" stroke-width="1" />
        <line x1="${yAxisX}" y1="${height - margin}" x2="${yAxisX}" y2="${margin}" stroke="black" stroke-width="1" />
        <text x="${width - margin + 5}" y="${xAxisY + 5}" font-size="12">x</text>
        <text x="${yAxisX - 5}" y="${margin - 5}" font-size="12">y</text>
    `;

    // Generar path para función
    const generatePath = (func, start, end, steps = 50) => {
        let d = `M ${mapX(start)} ${mapY(func(start))}`;
        const step = (end - start) / steps;
        for (let i = 1; i <= steps; i++) {
            const x = start + i * step;
            d += ` L ${mapX(x)} ${mapY(func(x))}`;
        }
        return d;
    };

    // Generar path cerrado para área
    const generateAreaPath = (func, start, end, steps = 50) => {
        let d = `M ${mapX(start)} ${xAxisY}`; // Start at x-axis
        d += ` L ${mapX(start)} ${mapY(func(start))}`; // Up to function
        const step = (end - start) / steps;
        for (let i = 1; i <= steps; i++) {
            const x = start + i * step;
            d += ` L ${mapX(x)} ${mapY(func(x))}`;
        }
        d += ` L ${mapX(end)} ${xAxisY}`; // Down to x-axis
        d += " Z"; // Close
        return d;
    };

    // Diagrama 1: Área bajo la recta (Representativo)
    const svg1 = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <path d="${generateAreaPath(f_line_draw, draw_x1, draw_x2)}" fill="#ccc" stroke="none" />
            ${drawAxes()}
            
            <!-- Funciones -->
            <path d="${generatePath(f_line_draw, x_min, x_max)}" stroke="black" fill="none" />
            <path d="${generatePath(f_curve_draw, x_min, x_max)}" stroke="black" fill="none" />
            
            <!-- Puntos (Etiquetas con variables, no valores fijos del dibujo) -->
            <circle cx="${mapX(draw_x1)}" cy="${mapY(f_line_draw(draw_x1))}" r="2" fill="black" />
            <text x="${mapX(draw_x1) - 35}" y="${mapY(f_line_draw(draw_x1))}">(${x1}, ${y1})</text>
            
            <circle cx="${mapX(draw_x2)}" cy="${mapY(f_line_draw(draw_x2))}" r="2" fill="black" />
            <text x="${mapX(draw_x2) + 5}" y="${mapY(f_line_draw(draw_x2))}">(${x2}, ${y2})</text>
        </svg>
    `;

    // Diagrama 2: Área bajo la curva (Representativo)
    const svg2 = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <path d="${generateAreaPath(f_curve_draw, draw_x1, draw_x2)}" fill="#ccc" stroke="none" />
            ${drawAxes()}
            
            <!-- Funciones -->
            <path d="${generatePath(f_line_draw, x_min, x_max)}" stroke="black" fill="none" />
            <path d="${generatePath(f_curve_draw, x_min, x_max)}" stroke="black" fill="none" />
            
            <!-- Puntos -->
            <circle cx="${mapX(draw_x1)}" cy="${mapY(f_line_draw(draw_x1))}" r="2" fill="black" />
            <text x="${mapX(draw_x1) - 35}" y="${mapY(f_line_draw(draw_x1))}">(${x1}, ${y1})</text>
            
            <circle cx="${mapX(draw_x2)}" cy="${mapY(f_line_draw(draw_x2))}" r="2" fill="black" />
            <text x="${mapX(draw_x2) + 5}" y="${mapY(f_line_draw(draw_x2))}">(${x2}, ${y2})</text>
        </svg>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Las gráficas de $y = ${k_line} - x$ y $y = ${tlacu.poli.print([a, b, c])}$ se intersectan en $(${x1}, ${y1})$ y $(${x2}, ${y2})$, como se muestra en los siguientes diagramas.</p>
            
            <p>En el <strong>diagrama 1</strong>, la región encerrada por las líneas $y = ${k_line} - x$, $x = ${x1}$, $x = ${x2}$ y el eje x ha sido sombreada.</p>
            <div style="text-align: center;"><strong>Diagrama 1</strong></div>
            <div style="display: flex; justify-content: center;">${svg1}</div>
            
            <p>(a) Calcula el área de la región sombreada en el <strong>diagrama 1</strong>. [2]</p>
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
            <div style="page-break-after:always"></div>
            <p>En el <strong>diagrama 2</strong>, la región encerrada por la curva $y = ${tlacu.poli.print([a, b, c])}$, y las líneas $x = ${x1}$, $x = ${x2}$ y el eje x ha sido sombreada.</p>
            <div style="text-align: center;"><strong>Diagrama 2</strong></div>
            <div style="display: flex; justify-content: center;">${svg2}</div>
            
            <p>(b) (i) Escribe una integral para el área de la región sombreada en el <strong>diagrama 2</strong>.</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;(ii) Calcula el área de esta región. [3]</p>

            <p>(c) Por lo tanto, determina el área encerrada entre $y = ${k_line} - x$ y $y = ${tlacu.poli.print([a, b, c])}$. [2]</p>
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p>(a) El área bajo la recta es un trapecio (o integral de la recta):</p>
        <p>$$ A_{recta} = \\int_{${x1}}^{${x2}} (${k_line} - x) dx = \\left[ ${k_line}x - \\frac{x^2}{2} \\right]_{${x1}}^{${x2}} $$</p>
        <p>$$ = (${k_line}(${x2}) - \\frac{${x2}^2}{2}) - (${k_line}(${x1}) - \\frac{(${x1})^2}{2}) $$</p>
        <p>$$ = ${area_line.toFixed(2)} $$</p>
        
        <p>(b) (i) Integral para el área bajo la curva:</p>
        <p>$$ \\int_{${x1}}^{${x2}} (${tlacu.poli.print([a, b, c])}) dx $$</p>
        <p>(ii) Calculando la integral:</p>
        <p>$$ F(x) = \\frac{${a}}{3}x^3 + \\frac{${b}}{2}x^2 + ${c}x $$</p>
        <p>$$ F(${x2}) = ${F_curve(x2).toFixed(2)} $$</p>
        <p>$$ F(${x1}) = ${F_curve(x1).toFixed(2)} $$</p>
        <p>$$ A_{curva} = F(${x2}) - F(${x1}) = ${area_curve.toFixed(2)} $$</p>

        <p>(c) Área entre curvas:</p>
        <p>$$ A_{total} = A_{recta} - A_{curva} $$</p>
        <p>$$ A_{total} = ${area_line.toFixed(2)} - ${area_curve.toFixed(2)} = ${area_between.toFixed(2)} $$</p>
    `;

    return { html, respuesta };
}
