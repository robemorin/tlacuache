import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.2. Derivación de funciones trigonométricas e integración",
    titulo: "Derivada e integral de una función seno compuesta",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const A = 2;
    const B = 5;
    const C = 3;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> La función $f$ viene dada por $f(x) = ${A} \\operatorname{sen}(${B}x - ${C})$, con $x$ expresada en radianes.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la derivada $f'(x)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la integral indefinida $\\int f(x)\\,\\mathrm{d}x$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="16" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) f'(x) = 2 * cos(5x - 3) * 5 = 10 cos(5x - 3)
    // (b) int f(x) dx = 2 * (-cos(5x - 3)/5) + C = -2/5 cos(5x - 3) + C

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Derivada $f'(x)$ (usando la regla de la cadena):<br>
                $f'(x) = ${A} \\cdot \\cos(${B}x - ${C}) \\cdot \\frac{\\mathrm{d}}{\\mathrm{d}x}(${B}x - ${C})$<br>
                $f'(x) = ${A} \\cdot \\cos(${B}x - ${C}) \\cdot ${B} =$ <strong>$${A * B} \\cos(${B}x - ${C})$</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Integral indefinida $\\int f(x)\\,\\mathrm{d}x$ (por sustitución $u = ${B}x - ${C}$):<br>
                $\\int ${A} \\operatorname{sen}(${B}x - ${C})\\,\\mathrm{d}x = ${A} \\left(-\\frac{\\cos(${B}x - ${C})}{${B}}\\right) + C$<br>
                $=$ <strong>$-\\frac{${A}}{${B}} \\cos(${B}x - ${C}) + C$</strong> (o <strong>$-0.4 \\cos(${B}x - ${C}) + C$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
