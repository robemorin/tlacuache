import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Recta tangente, derivadas e integración",
    titulo: "Recta tangente en el origen, área bajo la curva y razón de áreas",
    tipo: 1, // 1 = Abierto
    puntos: 16
};

export async function generar(i) {
    // --- SVG REPRESENTATIVO DE LA CURVA, RECTA TANGENTE L Y TRIÁNGULO OPQ ---
    const width = 440;
    const height = 240;
    const margin = 35;

    const xMin = -1.5, xMax = 3.5;
    const yMin = -1, yMax = 7;

    const mapX = (x) => margin + (x - xMin) * (width - 2 * margin) / (xMax - xMin);
    const mapY = (y) => height - margin - (y - yMin) * (height - 2 * margin) / (yMax - yMin);

    // Para el gráfico usamos a = 2.5 como valor ilustrativo
    const a_val = 2.5;
    const f_curve = (x) => 2 * x * Math.sqrt(Math.max(0, a_val * a_val - x * x));

    // Curva f(x)
    let pathCurve = `M ${mapX(0)} ${mapY(0)}`;
    for (let x = 0; x <= a_val; x += 0.05) {
        pathCurve += ` L ${mapX(x)} ${mapY(f_curve(x))}`;
    }

    // Región sombreada R (entre x=0 y x=a)
    let pathArea = `M ${mapX(0)} ${mapY(0)}`;
    for (let x = 0; x <= a_val; x += 0.05) {
        pathArea += ` L ${mapX(x)} ${mapY(f_curve(x))}`;
    }
    pathArea += ` L ${mapX(a_val)} ${mapY(0)} Z`;

    // Recta L: y = 2a * x => con a=2.5, m = 5
    const p_y = 2 * a_val * a_val; // b = 2a^2 (para dibujo escalado ajustamos visual)
    const draw_p_y = 5.5;

    const svgGrafico = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:white; border:1px solid #ddd; border-radius:4px; margin:10px auto; display:block;">
            <!-- Región sombreada R -->
            <path d="${pathArea}" fill="#e0e0e0" stroke="none" />
            
            <!-- Ejes -->
            <line x1="${margin}" y1="${mapY(0)}" x2="${width - margin}" y2="${mapY(0)}" stroke="black" stroke-width="1.5" />
            <text x="${width - margin + 8}" y="${mapY(0) + 4}" font-size="12" font-weight="bold">x</text>
            
            <line x1="${mapX(0)}" y1="${height - margin}" x2="${mapX(0)}" y2="${margin}" stroke="black" stroke-width="1.5" />
            <text x="${mapX(0) - 4}" y="${margin - 8}" font-size="12" font-weight="bold">y</text>
            
            <!-- Curva f(x) -->
            <path d="${pathCurve}" stroke="#1565c0" stroke-width="2.5" fill="none" />
            <text x="${mapX(1.4)}" y="${mapY(f_curve(1.4)) - 10}" font-size="13" font-weight="bold" fill="#1565c0">y = f(x)</text>

            <!-- Recta Tangente L -->
            <line x1="${mapX(0)}" y1="${mapY(0)}" x2="${mapX(a_val)}" y2="${mapY(draw_p_y)}" stroke="#d32f2f" stroke-width="2" stroke-dasharray="4" />
            <text x="${mapX(a_val - 0.4)}" y="${mapY(draw_p_y - 0.8)}" font-size="13" font-weight="bold" fill="#d32f2f">L</text>

            <!-- Triángulo OPQ (Línea vertical PQ) -->
            <line x1="${mapX(a_val)}" y1="${mapY(0)}" x2="${mapX(a_val)}" y2="${mapY(draw_p_y)}" stroke="#666" stroke-width="1.5" stroke-dasharray="2" />

            <!-- Puntos O, P, Q y texto R -->
            <circle cx="${mapX(0)}" cy="${mapY(0)}" r="3" fill="black" />
            <text x="${mapX(0) - 15}" y="${mapY(0) + 16}" font-size="12" font-weight="bold">O</text>

            <circle cx="${mapX(a_val)}" cy="${mapY(0)}" r="3.5" fill="black" />
            <text x="${mapX(a_val)}" y="${mapY(0) + 16}" font-size="12" font-weight="bold" text-anchor="middle">Q (a, 0)</text>

            <circle cx="${mapX(a_val)}" cy="${mapY(draw_p_y)}" r="4" fill="#d32f2f" />
            <text x="${mapX(a_val) + 8}" y="${mapY(draw_p_y)}" font-size="12" font-weight="bold" fill="#d32f2f">P (a, b)</text>

            <text x="${mapX(1.3)}" y="${mapY(1.2)}" font-size="14" font-weight="bold" fill="#555">R</text>
        </svg>
    `;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Considere la función $f(x) = 2x\\sqrt{a^2 - x^2}$, para $-1 \\le x \\le a$, donde $a > 1$.</p>
            
            <p>La siguiente figura muestra el gráfico de $f$. La recta $L$ es la tangente al gráfico de $f$ en el origen, $O(0,0)$. El punto $P(a, b)$ pertenece a $L$, y el punto $Q(a, 0)$ está en el eje $x$.</p>
            
            <div style="display:flex; justify-content:center;">
                ${svgGrafico}
            </div>

            <ol class="ib-lista">
                <li>
                    <ol>
                        <li><span class="ib-texto">Sabiendo que la derivada es $f'(x) = \\frac{2a^2 - 4x^2}{\\sqrt{a^2 - x^2}}$ para $-1 \\le x < a$, halle la ecuación de la recta tangente $L$.</span></li>
                        <li><span class="ib-texto">A partir de lo anterior, halle una expresión para $b$ en función de $a$.</span></li>
                    </ol>
                    <span class="ib-mark">[6]</span>
                </li>
                
                <li>
                    <span class="ib-texto">Sea $R$ la región delimitada por el gráfico de $f$ y el eje $x$ (entre $x = 0$ y $x = a$), y sea $A_R$ su área. Muestre que:</span>
                    <p style="text-align:center; margin: 6px 0;">$$A_R = \\frac{2}{3}a^3$$</p>
                    <span class="ib-mark">[6]</span>
                </li>

                <li>
                    <span class="ib-texto">Sea $A_T$ el área del triángulo rectángulo $OPQ$. Sabiendo que $A_T = k \\cdot A_R$, halle el valor exacto de la constante $k$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
            <div style="break-before: page; page-break-before: always;"></div>
            <tlacuache-renglon n="22" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a)(i) En el origen (x = 0):
    //        m = f'(0) = (2a^2 - 0) / sqrt(a^2 - 0) = 2a^2 / a = 2a
    //        Ecuación de L: y - 0 = 2a(x - 0) => y = 2ax
    // (a)(ii) Como P(a, b) pertenece a L:
    //         b = 2a(a) = 2a^2
    // (b) A_R = int_0^a 2x sqrt(a^2 - x^2) dx
    //     Sea u = a^2 - x^2 => du = -2x dx => 2x dx = -du
    //     Cuando x = 0 => u = a^2; cuando x = a => u = 0
    //     A_R = int_{a^2}^0 -u^(1/2) du = int_0^{a^2} u^(1/2) du
    //     A_R = [ (2/3) u^(3/2) ]_0^{a^2} = (2/3) (a^2)^(3/2) = (2/3) a^3
    // (c) A_T = Area del triángulo rectángulo OPQ = (base * altura) / 2
    //     Base OQ = a, Altura PQ = b = 2a^2
    //     A_T = (a * 2a^2) / 2 = a^3
    //     A_T = k * A_R => a^3 = k * (2/3 a^3) => 1 = (2/3) k => k = 3/2 = 1.5

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong>
                <ol style="list-style-type: lower-roman; padding-left: 20px;">
                    <li><strong>Pendiente en el origen ($x = 0$):</strong><br>
                        $m = f'(0) = \\frac{2a^2 - 4(0)^2}{\\sqrt{a^2 - 0^2}} = \\frac{2a^2}{a} = 2a$.<br>
                        Como pasa por $O(0,0)$, la ecuación de $L$ es: <strong>$y = 2ax$</strong>.
                    </li>
                    <br>
                    <li><strong>Expresión para $b$:</strong><br>
                        Como $P(a, b)$ está sobre $L$, sustituimos $x = a$:<br>
                        $b = 2a(a) =$ <strong>$2a^2$</strong>.
                    </li>
                </ol>
            </li>
            <br>
            <li><strong>(b) Área de la región $R$ ($A_R$):</strong><br>
                $A_R = \\int_0^a 2x\\sqrt{a^2 - x^2}\\,\\mathrm{d}x$<br>
                Aplicando el método de sustitución: sea $u = a^2 - x^2 \\implies \\mathrm{d}u = -2x\\,\\mathrm{d}x \\implies 2x\\,\\mathrm{d}x = -\\mathrm{d}u$.<br>
                • Límites: si $x = 0 \\implies u = a^2$; si $x = a \\implies u = 0$.<br>
                $A_R = \\int_{a^2}^0 -\\sqrt{u}\\,\\mathrm{d}u = \\int_0^{a^2} u^{1/2}\\,\\mathrm{d}u = \\left[ \\frac{2}{3} u^{3/2} \\right]_0^{a^2}$<br>
                $A_R = \\frac{2}{3}(a^2)^{3/2} - 0 =$ <strong>$\\frac{2}{3}a^3$</strong>.
            </li>
            <br>
            <li><strong>(c) Cálculo de la constante $k$:</strong><br>
                • Área del triángulo rectángulo $OPQ$ ($A_T$):<br>
                  $\\text{Base} = OQ = a, \\quad \\text{Altura} = PQ = b = 2a^2$<br>
                  $A_T = \\frac{\\text{base} \\times \\text{altura}}{2} = \\frac{a \\times 2a^2}{2} = a^3$<br>
                • Relación $A_T = k \\cdot A_R$:<br>
                  $a^3 = k \\left(\\frac{2}{3}a^3\\right) \\implies 1 = \\frac{2}{3}k \\implies$ <strong>$k = \\frac{3}{2}$</strong> (o <strong>$1.5$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
