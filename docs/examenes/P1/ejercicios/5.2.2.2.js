import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.2. Derivación de funciones trigonométricas e integración",
    titulo: "Pendiente de la recta tangente a una curva trigonométrica",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const x0_str = "\\frac{1}{2}";
    const y0 = 0;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> El punto $P\\left(${x0_str}, ${y0}\\right)$ pertenece a la gráfica de la curva $y = \\operatorname{sen}(2x - 1)$, donde los ángulos están medidos en radianes.</p>
            
            <p>Halle la pendiente (gradiente) de la recta tangente a la curva en el punto $P$.</p>
            <span class="ib-mark" style="float: right;">[4]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="16" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // y' = cos(2x - 1) * 2 = 2 cos(2x - 1)
    // En x = 1/2: 2*(1/2) - 1 = 1 - 1 = 0
    // y'(1/2) = 2 cos(0) = 2 * 1 = 2

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Derivada de la función (Regla de la cadena):</strong><br>
                $\\frac{\\mathrm{d}y}{\\mathrm{d}x} = \\cos(2x - 1) \\cdot \\frac{\\mathrm{d}}{\\mathrm{d}x}(2x - 1)$<br>
                $\\frac{\\mathrm{d}y}{\\mathrm{d}x} = 2\\cos(2x - 1)$
            </li>
            <br>
            <li><strong>Evaluación en la coordenada $x = ${x0_str}$:</strong><br>
                $m = \\left. \\frac{\\mathrm{d}y}{\\mathrm{d}x} \\right|_{x = ${x0_str}} = 2\\cos\\left(2\\left(${x0_str}\\right) - 1\\right)$<br>
                $m = 2\\cos(1 - 1) = 2\\cos(0)$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                Como $\\cos(0) = 1$:<br>
                $m = 2(1) =$ <strong>$2$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
