import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Término enésimo y suma de una progresión aritmética",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = 7;
    const u2 = 9.5;
    const u3 = 12;
    const d = 2.5; // u2 - u1 = 9.5 - 7 = 2.5
    
    const nA = 41;  // Para el inciso (a)
    const nB = 101; // Para el inciso (b)

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Los tres primeros términos de una progresión aritmética son $${u1}$, $${u2}$, $${u3}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">¿Cuál es el ${nA}.º término de la sucesión?</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">¿Cuál es la suma de los primeros ${nB} términos de la sucesión?</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) u_41 = u1 + (41 - 1)*d = 7 + 40 * 2.5 = 7 + 100 = 107
    const u_41 = u1 + (nA - 1) * d;

    // (b) S_101 = (101 / 2) * (2*7 + (101 - 1)*2.5) = 50.5 * (14 + 250) = 50.5 * 264 = 13332
    const suma_101 = (nB / 2) * (2 * u1 + (nB - 1) * d);

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Diferencia común ($d$):</strong><br>
                $d = u_2 - u_1 = ${u2} - ${u1} = ${d}$.
            </li>
            <br>
            <li><strong>(a)</strong> Cálculo del término $u_{${nA}}$:<br>
                Usando la fórmula $u_n = u_1 + (n-1)d$:<br>
                $u_{${nA}} = ${u1} + (${nA} - 1)(${d})$<br>
                $u_{${nA}} = ${u1} + (40)(${d})$<br>
                $u_{${nA}} = ${u1} + ${40 * d} =$ <strong>${u_41}</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Suma de los primeros $${nB}$ términos ($S_{${nB}}$):<br>
                Usando la fórmula $S_n = \\frac{n}{2}\\left(2u_1 + (n-1)d\\right)$:<br>
                $S_{${nB}} = \\frac{${nB}}{2}\\left(2(${u1}) + (${nB} - 1)(${d})\\right)$<br>
                $S_{${nB}} = \\frac{${nB}}{2}\\left(${2 * u1} + (100)(${d})\\right)$<br>
                $S_{${nB}} = \\frac{${nB}}{2}(${2 * u1} + ${100 * d}) = \\frac{${nB}}{2}(${2 * u1 + 100 * d})$<br>
                $S_{${nB}} = ${nB / 2} \\times ${2 * u1 + 100 * d} =$ <strong>${suma_101}</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
