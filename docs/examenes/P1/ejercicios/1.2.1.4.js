import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Cálculo de término y posición en progresión aritmética",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = -5;
    const d = 3;
    const posA = 8;     // Para inciso a (u_8)
    const targetVal = 67; // Para inciso b (u_n = 67)

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> En una progresión aritmética, $u_1 = ${u1}$ y $d = ${d}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle $u_{${posA}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el valor de $n$ para el cual $u_n = ${targetVal}$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) u_8 = u1 + (8-1)*d = -5 + 7*3 = -5 + 21 = 16
    const u_8 = u1 + (posA - 1) * d;

    // (b) u_n = u1 + (n-1)*d => 67 = -5 + (n-1)*3 => 72 = (n-1)*3 => n-1 = 24 => n = 25
    const n_res = (targetVal - u1) / d + 1;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Cálculo de $u_{${posA}}$:<br>
                Usando la fórmula del término general $u_n = u_1 + (n-1)d$:<br>
                $u_{${posA}} = ${u1} + (${posA} - 1)(${d})$<br>
                $u_{${posA}} = ${u1} + (7)(${d}) = ${u1} + ${7 * d} =$ <strong>${u_8}</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Cálculo de $n$ cuando $u_n = ${targetVal}$:<br>
                Planteando la ecuación:<br>
                $u_1 + (n-1)d = ${targetVal}$<br>
                $${u1} + (n-1)(${d}) = ${targetVal}$<br>
                $(n-1)(${d}) = ${targetVal} - (${u1})$<br>
                $(n-1)(${d}) = ${targetVal - u1}$<br>
                $n - 1 = \\frac{${targetVal - u1}}{${d}} = ${(targetVal - u1) / d}$<br>
                $n = ${(targetVal - u1) / d} + 1 =$ <strong>${n_res}</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
