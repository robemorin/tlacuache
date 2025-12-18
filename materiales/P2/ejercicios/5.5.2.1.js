import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.5. Integración",
    seccion: "5.5.2. Regla del Trapecio",
    titulo: "Ala de Avión",
    tipo: 1, // 1 = Estático (SVG)
    puntos: 12
};

export async function generar(i) {
    // Parámetros del problema (fijos)
    const funcJS = (x) => 2 * Math.sqrt(x) - x / 5 + 1;

    // (a) Valores de la tabla
    const x_vals = [0, 25, 50, 75, 100];
    const y_vals = x_vals.map(x => funcJS(x));

    const a_val = y_vals[1]; // x=25
    const b_val = y_vals[2]; // x=50
    const c_val = y_vals[3]; // x=75

    // (b) Regla del Trapecio
    const h = 25;
    const sum_y = y_vals[0] + 2 * y_vals[1] + 2 * y_vals[2] + 2 * y_vals[3] + y_vals[4];
    const trap_est = (h / 2) * sum_y;

    // (c) Integral Exacta
    const F = (x) => (4 / 3) * Math.pow(x, 1.5) - 0.1 * Math.pow(x, 2) + x;
    const exact_area = F(100) - F(0);

    // (d) Error Porcentual
    const error_pct = Math.abs(trap_est - exact_area) / exact_area * 100;

    // --- Generación de SVG ---
    const width = 500;
    const height = 250;
    const margin = 30;

    // Dominios de visualización
    const xMin = -10, xMax = 110;
    const yMin = -5, yMax = 12;

    const mapX = (x) => margin + (x - xMin) * (width - 2 * margin) / (xMax - xMin);
    const mapY = (y) => height - margin - (y - yMin) * (height - 2 * margin) / (yMax - yMin);

    // Generar path de la función
    const steps = 100;
    let pathD = `M ${mapX(0)} ${mapY(funcJS(0))}`;
    for (let j = 1; j <= steps; j++) {
        const x = 0 + (100 / steps) * j;
        pathD += ` L ${mapX(x)} ${mapY(funcJS(x))}`;
    }

    // Path del área sombreada (cerrado)
    let areaD = `M ${mapX(0)} ${mapY(0)}`; // Inicio en eje X
    areaD += ` L ${mapX(0)} ${mapY(funcJS(0))}`; // Subir a la curva
    for (let j = 1; j <= steps; j++) {
        const x = 0 + (100 / steps) * j;
        areaD += ` L ${mapX(x)} ${mapY(funcJS(x))}`;
    }
    areaD += ` L ${mapX(100)} ${mapY(0)}`; // Bajar a eje X
    areaD += " Z";

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display:block; margin: 0 auto;">
            <!-- Ejes -->
            <line x1="${mapX(xMin)}" y1="${mapY(0)}" x2="${mapX(xMax)}" y2="${mapY(0)}" stroke="black" stroke-width="1" />
            <line x1="${mapX(0)}" y1="${mapY(yMin)}" x2="${mapX(0)}" y2="${mapY(yMax)}" stroke="black" stroke-width="1" />
            
            <!-- Etiquetas Ejes -->
            <text x="${mapX(xMax) - 10}" y="${mapY(0) + 15}" font-size="12" font-style="italic">x</text>
            <text x="${mapX(0) - 15}" y="${mapY(yMax) + 10}" font-size="12" font-style="italic">y</text>
            
            <!-- Marcas Ejes -->
            <text x="${mapX(100)}" y="${mapY(0) + 15}" font-size="10" text-anchor="middle">100</text>
            <line x1="${mapX(100)}" y1="${mapY(0) - 3}" x2="${mapX(100)}" y2="${mapY(0) + 3}" stroke="black" />
            
            <text x="${mapX(0) - 15}" y="${mapY(10)}" font-size="10" dominant-baseline="middle">10</text>
            <line x1="${mapX(0) - 3}" y1="${mapY(10)}" x2="${mapX(0) + 3}" y2="${mapY(10)}" stroke="black" />

            <text x="${mapX(0) - 15}" y="${mapY(5)}" font-size="10" dominant-baseline="middle">5</text>
            <line x1="${mapX(0) - 3}" y1="${mapY(5)}" x2="${mapX(0) + 3}" y2="${mapY(5)}" stroke="black" />

            <text x="${mapX(0) - 20}" y="${mapY(-5)}" font-size="10" dominant-baseline="middle">-5</text>
            
            <!-- Área Sombreada -->
            <path d="${areaD}" fill="#ccc" stroke="none" />
            
            <!-- Curva -->
            <path d="${pathD}" fill="none" stroke="black" stroke-width="1.5" />
        </svg>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Gabriel está investigando la forma de las alas de un modelo de avión. Se muestra una sección transversal de una de las alas, graficada en los ejes de coordenadas.</p>
            
            <div style="margin: 20px 0;">${svg}</div>
            
            <p>La parte sombreada de la sección transversal es el área entre el eje $x$ y la curva con ecuación:</p>
            <p style="text-align:center">$$ y = 2\\sqrt{x} - \\frac{x}{5} + 1, \\text{ para } 0 \\le x \\le 100 $$</p>
            <p>donde $x$ es la distancia, en cm, desde el frente del ala y $y$ es la altura, en cm, sobre el eje horizontal a través del ala.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Encuentra los valores de $a$, $b$ y $c$, que se muestran en la tabla.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <div style="display:flex; justify-content:center; margin: 15px 0;">
                    <table class="tlacuache-tabla" style="border-collapse: collapse; text-align: center;">
                        <tr>
                            <th style="border: 1px solid black; padding: 5px 15px;">$x$ (cm)</th>
                            <td style="border: 1px solid black; padding: 5px 15px;">0</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">25</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">50</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">75</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">100</td>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black; padding: 5px 15px;">$y$ (cm)</th>
                            <td style="border: 1px solid black; padding: 5px 15px;">1</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">$a$</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">$b$</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">$c$</td>
                            <td style="border: 1px solid black; padding: 5px 15px;">1</td>
                        </tr>
                    </table>
                </div>

                <div style="margin: 10px 0;">
                    <p>Gabriel utiliza la regla del trapecio con cuatro intervalos para estimar el área sombreada de la sección transversal del ala.</p>
                </div>

                <li>
                    <span class="ib-texto">Encuentra la estimación de Gabriel del área sombreada.</span>
                    <span class="ib-mark">[3]</span>
                </li>

                <li>
                    <span class="ib-texto">(i) Escribe la integral que Gabriel puede usar para encontrar el área exacta.</span>
                </li>
                <li>
                    <span class="ib-texto">(ii) Por lo tanto, usa tu calculadora de pantalla gráfica para encontrar el área de la parte sombreada. Da tu respuesta correcta a un decimal.</span>
                    <span class="ib-mark">[4]</span>
                </li>

                <li>
                    <span class="ib-texto">Calcula el porcentaje de error de la estimación de Gabriel en la parte (b).</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
        </div>
    `;

    const respuesta = `
        <div style="display: block; width: 100%;">
            <p><strong>Solución:</strong></p>
            
            <p><strong>(a)</strong> Valores de la tabla:</p>
            <p style="margin-left: 20px;">
                $x=25 \\Rightarrow y = 2(5) - 5 + 1 = 6$. &nbsp; $\\Rightarrow a = 6$<br>
                $x=50 \\Rightarrow y = 2\\sqrt{50} - 10 + 1 \\approx 5.142$. &nbsp; $\\Rightarrow b \\approx 5.14$<br>
                $x=75 \\Rightarrow y = 2\\sqrt{75} - 15 + 1 \\approx 3.320$. &nbsp; $\\Rightarrow c \\approx 3.32$
            </p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(b)</strong> Regla del Trapecio ($h=25$):</p>
            <p>$$ A \\approx \\frac{25}{2} (y_0 + 2(y_1 + y_2 + y_3) + y_4) $$</p>
            <p>$$ A \\approx 12.5 (1 + 2(6 + 5.142 + 3.320) + 1) $$</p>
            <p>$$ A \\approx 12.5 (2 + 2(14.462)) = 12.5 (30.924) $$</p>
            <p>$$ A \\approx 386.55 $$</p>
            <p>Respuesta: <strong>${trap_est.toFixed(2)} cm²</strong></p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(c)</strong></p>
            <p>(i) Integral: $$ \\int_{0}^{100} (2\\sqrt{x} - \\frac{x}{5} + 1) dx $$</p>
            <p>(ii) Área exacta con CPG: <strong>${exact_area.toFixed(1)} cm²</strong></p>
            <p><em>(Valor exacto aprox: 433.33...)</em></p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(d)</strong> Error Porcentual:</p>
            <p>$$ \\epsilon = \\left| \\frac{${trap_est.toFixed(3)} - ${exact_area.toFixed(3)}}{${exact_area.toFixed(3)}} \\right| \\times 100 $$</p>
            <p>$$ \\epsilon \\approx ${error_pct.toFixed(2)} \\% $$</p>
        </div>
    `;

    return { html, respuesta };
}
