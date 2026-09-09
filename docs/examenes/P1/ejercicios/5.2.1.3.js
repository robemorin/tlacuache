import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y recta tangente",
    titulo: "Ecuación de la recta tangente a una función exponencial",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const k = 2;
    const x0 = 1;
    // y0 = e^(2*1) = e^2

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Sea la función exponencial $f(x) = \\mathrm{e}^{${k}x}$. La recta $L$ es la tangente a la curva de $f$ en el punto $\\left(${x0}, \\mathrm{e}^{2}\\right)$.</p>
            
            <p>Halle la ecuación de la recta tangente $L$ en la forma $y = ax + b$, expresando $a$ y $b$ en función de $\\mathrm{e}$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // f'(x) = 2 e^(2x)
    // Pendiente m = f'(1) = 2 e^2
    // Punto: (1, e^2)
    // y - e^2 = 2 e^2 (x - 1)
    // y - e^2 = 2 e^2 x - 2 e^2
    // y = 2 e^2 x - e^2  => a = 2e^2, b = -e^2

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Derivada de la función exponencial (Regla de la cadena):</strong><br>
                $f'(x) = \\frac{\\mathrm{d}}{\\mathrm{d}x}(\\mathrm{e}^{${k}x}) = ${k}\\mathrm{e}^{${k}x}$
            </li>
            <br>
            <li><strong>Cálculo de la pendiente en $x = ${x0}$:</strong><br>
                $m = f'(${x0}) = ${k}\\mathrm{e}^{${k}(${x0})} = 2\\mathrm{e}^2$
            </li>
            <br>
            <li><strong>Ecuación de la recta tangente en el punto $(${x0}, \\mathrm{e}^2)$:</strong><br>
                $y - y_0 = m(x - x_0)$<br>
                $y - \\mathrm{e}^2 = 2\\mathrm{e}^2(x - 1)$<br>
                $y - \\mathrm{e}^2 = 2\\mathrm{e}^2 x - 2\\mathrm{e}^2$<br>
                $y = 2\\mathrm{e}^2 x - 2\\mathrm{e}^2 + \\mathrm{e}^2$<br>
                $y =$ <strong>$2\\mathrm{e}^2 x - \\mathrm{e}^2$</strong> (donde $a = 2\\mathrm{e}^2$ y $b = -\\mathrm{e}^2$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
