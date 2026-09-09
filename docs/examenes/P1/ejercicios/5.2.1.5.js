import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y antiderivadas",
    titulo: "Integración logarítmica con condición inicial",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const k = 6;
    const x0 = 1;
    const y0 = 5;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> La derivada de la función $f$ viene dada por $f'(x) = \\frac{${k}x}{x^2 + 1}$.</p>
            
            <p>El gráfico de $y = f(x)$ pasa por el punto $(${x0}, ${y0})$. Halle una expresión para $f(x)$.</p>
            <span class="ib-mark" style="float: right;">[5]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // f(x) = int (6x / (x^2 + 1)) dx
    // Sea u = x^2 + 1 => du = 2x dx => 6x dx = 3 du
    // f(x) = int (3 / u) du = 3 ln(u) + C = 3 ln(x^2 + 1) + C
    // f(1) = 3 ln(1^2 + 1) + C = 3 ln(2) + C
    // 3 ln(2) + C = 5 => C = 5 - 3 ln 2 (o 5 - ln 8)
    // f(x) = 3 ln(x^2 + 1) + 5 - 3 ln 2 = 3 ln((x^2 + 1)/2) + 5

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Integración mediante el método de sustitución:</strong><br>
                $f(x) = \\int \\frac{${k}x}{x^2 + 1}\\,\\mathrm{d}x$<br>
                Sea $u = x^2 + 1 \\implies \\mathrm{d}u = 2x\\,\\mathrm{d}x \\implies ${k}x\\,\\mathrm{d}x = 3\\,\\mathrm{d}u$:<br>
                $f(x) = \\int \\frac{3}{u}\\,\\mathrm{d}u = 3\\ln|u| + C = 3\\ln(x^2 + 1) + C$<br>
                <em>(Como $x^2 + 1 > 0$, no se requiere el valor absoluto).</em>
            </li>
            <br>
            <li><strong>Determinación de la constante $C$ usando el punto $(${x0}, ${y0})$:</strong><br>
                $f(${x0}) = 3\\ln((${x0})^2 + 1) + C = ${y0}$<br>
                $3\\ln(2) + C = ${y0} \\implies C = ${y0} - 3\\ln 2$ (o $5 - \\ln 8$).
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                $f(x) =$ <strong>$3\\ln(x^2 + 1) + 5 - 3\\ln 2$</strong> (o <strong>$3\\ln\\left(\\frac{x^2 + 1}{2}\\right) + 5$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
