import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.3. Interpretación gráfica y análisis de derivadas",
    titulo: "Gráfica de la función derivada y comparación de valores",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- SVG DEL ENUNCIADO: Gráfica de f(x) con máximo en x=-2 y mínimo en x=6 ---
    const width = 460;
    const height = 240;
    const margin = 35;
    
    const xMin = -7, xMax = 11;
    const yMin = -6, yMax = 7;
    
    const mapX = (x) => margin + (x - xMin) * (width - 2 * margin) / (xMax - xMin);
    const mapY = (y) => height - margin - (y - yMin) * (height - 2 * margin) / (yMax - yMin);
    
    // Función cúbica de muestra: f(x) = - (x+2)^2 * (x-10)/50 + 2 => f'(-2)=0, f'(6)=0
    // Aproximación suave: f(x) con f'(-2)=0, f'(6)=0, f(0) > 0
    const f_curve = (x) => {
        // f'(x) = k(x+2)(x-6) = k(x^2 - 4x - 12)
        // f(x) = k(x^3/3 - 2x^2 - 12x) + C
        // Con k = 0.08, C = 2.5:
        return 0.08 * (Math.pow(x, 3)/3 - 2 * Math.pow(x, 2) - 12 * x) + 2.5;
    };

    let pathD = `M ${mapX(xMin + 0.5)} ${mapY(f_curve(xMin + 0.5))}`;
    for (let x = xMin + 0.5; x <= xMax - 0.5; x += 0.25) {
        pathD += ` L ${mapX(x)} ${mapY(f_curve(x))}`;
    }

    // Grid y Ejes
    let gridLines = '';
    for (let x = -6; x <= 10; x += 2) {
        gridLines += `<line x1="${mapX(x)}" y1="${margin}" x2="${mapX(x)}" y2="${height - margin}" stroke="#eee" stroke-width="1" />`;
        gridLines += `<text x="${mapX(x)}" y="${mapY(0) + 15}" font-size="11" text-anchor="middle" fill="#666">${x === 0 ? '0' : x}</text>`;
    }
    
    const svgProblema = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:white; border:1px solid #ddd; border-radius:4px; margin: 10px auto; display:block;">
            ${gridLines}
            <!-- Eje X -->
            <line x1="${margin}" y1="${mapY(0)}" x2="${width - margin}" y2="${mapY(0)}" stroke="black" stroke-width="1.5" />
            <text x="${width - margin + 8}" y="${mapY(0) + 4}" font-size="12" font-weight="bold">x</text>
            <!-- Eje Y -->
            <line x1="${mapX(0)}" y1="${height - margin}" x2="${mapX(0)}" y2="${margin}" stroke="black" stroke-width="1.5" />
            <text x="${mapX(0) - 4}" y="${margin - 8}" font-size="12" font-weight="bold">y</text>
            
            <!-- Curva f(x) -->
            <path d="${pathD}" stroke="#1565c0" stroke-width="2.5" fill="none" />
            <text x="${mapX(9.5)}" y="${mapY(f_curve(9.5)) - 10}" font-size="13" font-weight="bold" fill="#1565c0">y = f(x)</text>

            <!-- Puntos notables A y B -->
            <circle cx="${mapX(-2)}" cy="${mapY(f_curve(-2))}" r="4" fill="#d32f2f" />
            <text x="${mapX(-2)}" y="${mapY(f_curve(-2)) - 10}" font-size="12" font-weight="bold" text-anchor="middle" fill="#d32f2f">A (-2, f(-2))</text>
            
            <circle cx="${mapX(6)}" cy="${mapY(f_curve(6))}" r="4" fill="#d32f2f" />
            <text x="${mapX(6)}" y="${mapY(f_curve(6)) + 18}" font-size="12" font-weight="bold" text-anchor="middle" fill="#d32f2f">B (6, f(6))</text>
        </svg>
    `;

    // SVG de solución para f'(x) (parábola positiva con raíces en -2 y 6)
    const f_prime_draw = (x) => 0.12 * (x + 2) * (x - 6);
    let pathPrime = `M ${mapX(xMin + 0.5)} ${mapY(f_prime_draw(xMin + 0.5))}`;
    for (let x = xMin + 0.5; x <= xMax - 0.5; x += 0.25) {
        pathPrime += ` L ${mapX(x)} ${mapY(f_prime_draw(x))}`;
    }

    const svgSolucion = `
        <svg width="340" height="180" viewBox="0 0 ${width} ${height}" style="background:white; border:1px solid #ddd; border-radius:4px; margin: 10px auto; display:block;">
            ${gridLines}
            <line x1="${margin}" y1="${mapY(0)}" x2="${width - margin}" y2="${mapY(0)}" stroke="black" stroke-width="1.5" />
            <text x="${width - margin + 8}" y="${mapY(0) + 4}" font-size="12" font-weight="bold">x</text>
            <line x1="${mapX(0)}" y1="${height - margin}" x2="${mapX(0)}" y2="${margin}" stroke="black" stroke-width="1.5" />
            <text x="${mapX(0) - 4}" y="${margin - 8}" font-size="12" font-weight="bold">y</text>
            
            <path d="${pathPrime}" stroke="#2e7d32" stroke-width="2.5" fill="none" />
            <circle cx="${mapX(-2)}" cy="${mapY(0)}" r="4" fill="#2e7d32" />
            <circle cx="${mapX(6)}" cy="${mapY(0)}" r="4" fill="#2e7d32" />
            <circle cx="${mapX(0)}" cy="${mapY(f_prime_draw(0))}" r="3" fill="#2e7d32" />
            <text x="${mapX(8)}" y="${mapY(f_prime_draw(8)) - 8}" font-size="13" font-weight="bold" fill="#2e7d32">y = f '(x)</text>
        </svg>
    `;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La siguiente figura muestra una parte del gráfico de $y = f(x)$.</p>
            
            <div style="display:flex; justify-content:center;">
                ${svgProblema}
            </div>

            <p>El gráfico tiene un <strong>máximo local</strong> en el punto $A$, donde $x = -2$, y un <strong>mínimo local</strong> en el punto $B$, donde $x = 6$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">En un sistema de ejes de coordenadas, dibuje aproximadamente la gráfica de la función derivada $y = f'(x)$, indicando claramente sus intersecciones con el eje $x$ y el signo del corte con el eje $y$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <li>
                    <span class="ib-texto">Escriba las siguientes tres expresiones ordenándolas de menor a mayor (de la más pequeña a la más grande):</span>
                    <p style="text-align: center; margin: 8px 0;">$$f(0), \\quad f'(6), \\quad f''(-2)$$</p>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a) Características del gráfico de $y = f'(x)$:</strong><br>
                1. <strong>Intersecciones con el eje $x$:</strong> En los extremos locales $x = -2$ y $x = 6$, la pendiente es cero, por lo que $f'(-2) = 0$ y $f'(6) = 0$.<br>
                2. <strong>Signos de $f'(x)$:</strong><br>
                   • Para $x < -2$: $f$ es creciente $\\implies f'(x) > 0$.<br>
                   • Para $-2 < x < 6$: $f$ es decreciente $\\implies f'(x) < 0$ (corte con el eje $y$ negativo, $f'(0) < 0$).<br>
                   • Para $x > 6$: $f$ es creciente $\\implies f'(x) > 0$.<br>
                3. <strong>Forma:</strong> Curva continua cuadrática (parábola cóncava hacia arriba):<br>
                <div style="display:flex; justify-content:center; margin-top:5px;">
                    ${svgSolucion}
                </div>
            </li>
            <br>
            <li><strong>(b) Comparación y orden de menor a mayor:</strong><br>
                • $f''(-2)$: Como $f(x)$ tiene un máximo local en $x = -2$, la curva es cóncava hacia abajo $\\implies f''(-2) < 0$ (valor negativo).<br>
                • $f'(6)$: Como $x = 6$ es un mínimo local, la derivada es nula $\\implies f'(6) = 0$.<br>
                • $f(0)$: Observando la gráfica original, el corte con el eje $y$ está por encima del eje $x \\implies f(0) > 0$ (valor positivo).<br>
                <br>
                Por lo tanto, el orden de menor a mayor es:<br>
                <strong>$f''(-2) < f'(6) < f(0)$</strong> &nbsp;&nbsp; (es decir: <strong>$f''(-2),\\; f'(6),\\; f(0)$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
