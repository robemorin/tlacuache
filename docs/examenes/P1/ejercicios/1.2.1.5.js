import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Diferencia, término enésimo y suma de diez términos",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = 3;
    const u2 = 7;
    const n = 10;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> En una progresión aritmética, el primer término es $${u1}$ y el segundo término es $${u2}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la diferencia común.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el décimo término ($u_{${n}}$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la suma de los diez primeros términos de la progresión ($S_{${n}}$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) d = u2 - u1 = 7 - 3 = 4
    const d = u2 - u1;

    // (b) u_10 = u1 + (10 - 1)*d = 3 + 9*4 = 3 + 36 = 39
    const u_10 = u1 + (n - 1) * d;

    // (c) S_10 = (10 / 2) * (u1 + u10) = 5 * (3 + 39) = 5 * 42 = 210
    const suma_10 = (n / 2) * (u1 + u_10);

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Diferencia común ($d$):<br>
                $d = u_2 - u_1 = ${u2} - ${u1} =$ <strong>${d}</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Décimo término ($u_{${n}}$):<br>
                Usando la fórmula $u_n = u_1 + (n-1)d$:<br>
                $u_{${n}} = ${u1} + (${n} - 1)(${d})$<br>
                $u_{${n}} = ${u1} + (9)(${d}) = ${u1} + ${9 * d} =$ <strong>${u_10}</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Suma de los diez primeros términos ($S_{${n}}$):<br>
                Usando la fórmula $S_n = \\frac{n}{2}(u_1 + u_n)$ o $S_n = \\frac{n}{2}(2u_1 + (n-1)d)$:<br>
                $S_{${n}} = \\frac{${n}}{2}(${u1} + ${u_10})$<br>
                $S_{${n}} = ${n / 2} \\times (${u1 + u_10}) =$ <strong>${suma_10}</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
