import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.2. Derivación de funciones trigonométricas e integración",
    titulo: "Integración de función trigonométrica con valor inicial",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const x0_str = "\\frac{\\pi}{12}";
    const y0 = 5;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> La gráfica de una función $h$ pasa por el punto $\\left(${x0_str}, ${y0}\\right)$.</p>
            
            <p>Sabiendo que $h'(x) = 4\\cos(2x)$, halle la expresión de la función $h(x)$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // h(x) = int 4 cos(2x) dx = 4 * (sen(2x) / 2) + C = 2 sen(2x) + C
    // h(pi/12) = 2 sen(2 * pi/12) + C = 2 sen(pi/6) + C
    // Como sen(pi/6) = 1/2:
    // 2(1/2) + C = 5 => 1 + C = 5 => C = 4
    // h(x) = 2 sen(2x) + 4

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Integración de la derivada $h'(x)$:</strong><br>
                $h(x) = \\int 4\\cos(2x)\\,\\mathrm{d}x = 4 \\left(\\frac{\\operatorname{sen}(2x)}{2}\\right) + C$<br>
                $h(x) = 2\\operatorname{sen}(2x) + C$
            </li>
            <br>
            <li><strong>Sustitución del punto $\\left(${x0_str}, ${y0}\\right)$ para hallar $C$:</strong><br>
                $h\\left(${x0_str}\\right) = 2\\operatorname{sen}\\left(2\\left(${x0_str}\\right)\\right) + C = ${y0}$<br>
                $2\\operatorname{sen}\\left(\\frac{\\pi}{6}\\right) + C = ${y0}$<br>
                Como $\\operatorname{sen}\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{2}$:<br>
                $2\\left(\\frac{1}{2}\\right) + C = ${y0}$<br>
                $1 + C = ${y0} \\implies C = 4$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                $h(x) =$ <strong>$2\\operatorname{sen}(2x) + 4$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
