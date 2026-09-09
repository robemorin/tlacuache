import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Programa de reforestación (Término, Suma y Promedio)",
    tipo: 1, // 1 = Abierto
    puntos: 7
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = 85;
    const d = 30;
    const n = 15;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Durante el primer mes de un programa de reforestación, la ciudad de Neerim planta $${u1}$ árboles. A partir de ahí, cada mes se plantarán $${d}$ árboles más que el mes anterior.</p>
            
            <p>En la siguiente tabla se muestra el número de árboles que se plantarán en cada uno de los tres primeros meses:</p>
            
            <table class="ib-tabla" style="margin: 15px auto; text-align: center; border-collapse: collapse; width: 50%;">
                <thead>
                    <tr style="border-bottom: 2px solid #333; background-color: #f8f9fa;">
                        <th style="padding: 8px; border: 1px solid #ccc;">Mes</th>
                        <th style="padding: 8px; border: 1px solid #ccc;">Árboles plantados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc;">$1$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$${u1}$</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc;">$2$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$${u1 + d}$</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc;">$3$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$${u1 + 2 * d}$</td>
                    </tr>
                </tbody>
            </table>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle el número de árboles que se plantarán el $15.^{\\circ}$ mes.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el número total de árboles que se plantarán durante los $15$ primeros meses.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el promedio de árboles que se plantarán al mes durante los $15$ primeros meses.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) u15 = u1 + 14*d = 85 + 14*30 = 85 + 420 = 505
    const u15 = u1 + (n - 1) * d;

    // (b) S15 = (15 / 2) * (u1 + u15) = 7.5 * (85 + 505) = 7.5 * 590 = 4425
    const s15 = (n / 2) * (u1 + u15);

    // (c) Promedio = S15 / 15 = 4425 / 15 = 295 (o (u1 + u15) / 2 = 590 / 2 = 295)
    const promedio = s15 / n;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Identificación de la progresión aritmética:</strong><br>
                Primer término $u_1 = ${u1}$, diferencia común $d = ${d}$.
            </li>
            <br>
            <li><strong>(a)</strong> Árboles plantados en el mes $15$ ($u_{15}$):<br>
                Usando la fórmula $u_n = u_1 + (n-1)d$:<br>
                $u_{15} = ${u1} + (15 - 1)(${d})$<br>
                $u_{15} = ${u1} + (14)(${d}) = ${u1} + ${14 * d} =$ <strong>${u15} árboles</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Total de árboles plantados en los $15$ primeros meses ($S_{15}$):<br>
                Usando la fórmula $S_n = \\frac{n}{2}(u_1 + u_n)$:<br>
                $S_{15} = \\frac{15}{2}(${u1} + ${u15})$<br>
                $S_{15} = 7.5 \\times (${u1 + u15}) =$ <strong>${s15.toLocaleString()} árboles</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Promedio de árboles al mes en los $15$ primeros meses:<br>
                $\\bar{x} = \\frac{S_{15}}{15} = \\frac{${s15}}{15} =$ <strong>${promedio} árboles al mes</strong>.<br>
                <em>(O bien mediante la media de los extremos: $\\frac{u_1 + u_{15}}{2} = \\frac{${u1} + ${u15}}{2} = ${promedio}$).</em>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
