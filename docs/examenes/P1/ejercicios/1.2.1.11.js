import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Diferencia, octavo término y suma de ocho términos",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = 2;
    const u2 = 5;
    const n = 8;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> En una progresión aritmética, el primer término es $${u1}$ y el segundo término es $${u2}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la diferencia común ($d$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el octavo término ($u_{${n}}$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la suma de los ocho primeros términos de la progresión ($S_{${n}}$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) d = u2 - u1 = 5 - 2 = 3
    const d = u2 - u1;

    // (b) u8 = u1 + (8-1)*d = 2 + 7*3 = 2 + 21 = 23
    const u8 = u1 + (n - 1) * d;

    // (c) S8 = (8 / 2) * (u1 + u8) = 4 * (2 + 23) = 4 * 25 = 100
    const s8 = (n / 2) * (u1 + u8);

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Diferencia común ($d$):<br>
                $d = u_2 - u_1 = ${u2} - ${u1} =$ <strong>${d}</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Octavo término ($u_{${n}}$):<br>
                Usando la fórmula del término general $u_n = u_1 + (n-1)d$:<br>
                $u_{${n}} = ${u1} + (${n} - 1)(${d})$<br>
                $u_{${n}} = ${u1} + (7)(${d}) = ${u1} + ${7 * d} =$ <strong>${u8}</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Suma de los ocho primeros términos ($S_{${n}}$):<br>
                Usando la fórmula $S_n = \\frac{n}{2}(u_1 + u_n)$:<br>
                $S_{${n}} = \\frac{${n}}{2}(${u1} + ${u8})$<br>
                $S_{${n}} = ${n / 2} \\times (${u1 + u8}) = ${n / 2} \\times 25 =$ <strong>${s8}</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
