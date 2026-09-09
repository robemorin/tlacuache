import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Término general lineal y parámetros de progresión aritmética",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const a = 15;
    const b = 3;
    const targetVal = -33;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> El $n$-ésimo término de una progresión aritmética viene dado por $u_n = ${a} - ${b}n$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Indique el valor del primer término ($u_1$).</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">Sabiendo que el $n$-ésimo término de esta progresión es $${targetVal}$, halle el valor de $n$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la diferencia común ($d$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) u1 = 15 - 3(1) = 12
    const u1 = a - b * 1;

    // (b) 15 - 3n = -33 => -3n = -48 => n = 16
    const n_target = (a - targetVal) / b;

    // (c) u2 = 15 - 3(2) = 9 => d = u2 - u1 = 9 - 12 = -3 (o coeficiente de n)
    const d = -b;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Primer término ($u_1$):<br>
                Sustituyendo $n = 1$ en la expresión general:<br>
                $u_1 = ${a} - ${b}(1) =$ <strong>${u1}</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Valor de $n$ tal que $u_n = ${targetVal}$:<br>
                $${a} - ${b}n = ${targetVal}$<br>
                $-${b}n = ${targetVal} - ${a}$<br>
                $-${b}n = ${targetVal - a}$<br>
                $n = \\frac{${targetVal - a}}{-${b}} =$ <strong>${n_target}</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Diferencia común ($d$):<br>
                • <em>Método 1 (Directo):</em> En la forma explícita $u_n = dn + c$, el coeficiente lineal de $n$ representa la diferencia común: $d =$ <strong>${d}</strong>.<br>
                • <em>Método 2 (Calculando $u_2$):</em> $u_2 = ${a} - ${b}(2) = ${a - 2 * b}$. Entonces $d = u_2 - u_1 = ${a - 2 * b} - ${u1} =$ <strong>${d}</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
