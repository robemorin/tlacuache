import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y antiderivadas",
    titulo: "Integración de función racional por sustitución con potencia negativa",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const x0 = 0;
    const y0 = 1;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Sea la derivada de una función dada por:</p>
            
            $$f'(x) = \\frac{3x^2}{(x^3 + 1)^5}$$
            
            <p>Sabiendo que $f(${x0}) = ${y0}$, halle la expresión de la función $f(x)$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // f(x) = int (3x^2 / (x^3 + 1)^5) dx
    // Sea u = x^3 + 1 => du = 3x^2 dx
    // f(x) = int u^(-5) du = u^(-4) / (-4) + C = -1 / (4(x^3 + 1)^4) + C
    // f(0) = -1 / (4(0 + 1)^4) + C = -1/4 + C
    // -1/4 + C = 1 => C = 1 + 1/4 = 5/4
    // f(x) = -1 / (4(x^3 + 1)^4) + 5/4 = (5(x^3 + 1)^4 - 1) / (4(x^3 + 1)^4)

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Integración por sustitución:</strong><br>
                $f(x) = \\int \\frac{3x^2}{(x^3 + 1)^5}\\,\\mathrm{d}x$<br>
                Sea $u = x^3 + 1 \\implies \\mathrm{d}u = 3x^2\\,\\mathrm{d}x$:<br>
                $f(x) = \\int u^{-5}\\,\\mathrm{d}u = \\frac{u^{-4}}{-4} + C = -\\frac{1}{4(x^3 + 1)^4} + C$
            </li>
            <br>
            <li><strong>Determinación de la constante $C$ usando $f(0) = 1$:</strong><br>
                $f(0) = -\\frac{1}{4(0^3 + 1)^4} + C = 1$<br>
                $-\\frac{1}{4(1)} + C = 1$<br>
                $-\\frac{1}{4} + C = 1 \\implies C = 1 + \\frac{1}{4} = \\frac{5}{4}$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                $f(x) =$ <strong>$-\\frac{1}{4(x^3 + 1)^4} + \\frac{5}{4}$</strong> &nbsp;(o bien&nbsp; <strong>$\\frac{5(x^3 + 1)^4 - 1}{4(x^3 + 1)^4}$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
