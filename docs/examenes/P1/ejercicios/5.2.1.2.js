import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y cinemática",
    titulo: "Determinación de una función a partir de su derivada y una condición inicial",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const a = 6;
    const b = 5;
    const x0 = 2;
    const y0 = -3;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Sea $f'(x) = ${a}x^2 - ${b}$. Sabiendo que $f(${x0}) = ${y0}$, halle la expresión de la función $f(x)$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // f(x) = int (6x^2 - 5) dx = 2x^3 - 5x + C
    // f(2) = 2(2^3) - 5(2) + C = 2(8) - 10 + C = 16 - 10 + C = 6 + C
    // 6 + C = -3 => C = -9
    // f(x) = 2x^3 - 5x - 9

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Integración de la derivada (Antiderivada general):</strong><br>
                $f(x) = \\int f'(x)\\,\\mathrm{d}x = \\int (${a}x^2 - ${b})\\,\\mathrm{d}x$<br>
                $f(x) = \\frac{${a}}{3}x^3 - ${b}x + C = 2x^3 - 5x + C$
            </li>
            <br>
            <li><strong>Cálculo de la constante de integración $C$ usando el punto $(${x0}, ${y0})$:</strong><br>
                $f(${x0}) = 2(${x0})^3 - 5(${x0}) + C = ${y0}$<br>
                $2(8) - 10 + C = ${y0}$<br>
                $16 - 10 + C = ${y0}$<br>
                $6 + C = ${y0} \\implies C = ${y0} - 6 = -9$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                $f(x) =$ <strong>$2x^3 - 5x - 9$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
