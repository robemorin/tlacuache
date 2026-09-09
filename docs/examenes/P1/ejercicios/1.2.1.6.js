import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Progresión aritmética con logaritmos",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> En una progresión aritmética el primer término es $\\ln a$ y la diferencia común es $\\ln 3$.</p>
            
            <p>El $13.^{\\circ}$ término de la progresión es $8 \\ln 9$. Halle el valor de $a$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="22" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // u_13 = u_1 + 12*d
    // 8 ln 9 = ln a + 12 ln 3
    // Como 9 = 3^2, 8 ln(3^2) = 16 ln 3
    // 16 ln 3 = ln a + 12 ln 3
    // ln a = 16 ln 3 - 12 ln 3 = 4 ln 3
    // ln a = ln(3^4) = ln(81) => a = 81

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Fórmula del término general:</strong><br>
                $u_n = u_1 + (n-1)d$<br>
                Para $n = 13$:<br>
                $u_{13} = u_1 + 12d$
            </li>
            <br>
            <li><strong>Sustitución de expresiones logarítmicas:</strong><br>
                $8 \\ln 9 = \\ln a + 12 \\ln 3$
            </li>
            <br>
            <li><strong>Aplicación de leyes de logaritmos ($\\\\ln(x^k) = k \\\\ln x$):</strong><br>
                $8 \\ln(3^2) = \\ln a + 12 \\ln 3$<br>
                $8(2 \\ln 3) = \\ln a + 12 \\ln 3$<br>
                $16 \\ln 3 = \\ln a + 12 \\ln 3$
            </li>
            <br>
            <li><strong>Despeje de $\\\\ln a$:</strong><br>
                $\\ln a = 16 \\ln 3 - 12 \\ln 3$<br>
                $\\ln a = 4 \\ln 3$<br>
                $\\ln a = \\ln(3^4)$<br>
                $\\ln a = \\ln(81)$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                $a =$ <strong>$81$</strong> ($3^4$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
