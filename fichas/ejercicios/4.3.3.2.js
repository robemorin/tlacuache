import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.3. Coeficiente de correlación de rangos de Spearman",
    titulo: "Cálculo de Spearman",
    puntos: 8,
};

export async function generar(i) {
    // Generar datos para ranking (n=5 a 7 para que sea manejable manualmente)
    const n = Math.floor(Math.random() * 3) + 5;

    // Juez 1 y Juez 2 rankings (permutaciones de 1 a n)
    const ranks1 = Array.from({ length: n }, (_, k) => k + 1);
    // Shuffle ranks1 (aunque ya está ordenado, lo dejamos así como base)

    const ranks2 = Array.from({ length: n }, (_, k) => k + 1);
    // Shuffle ranks2
    for (let k = n - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [ranks2[k], ranks2[j]] = [ranks2[j], ranks2[k]];
    }

    // Calcular d y d^2
    const d = [];
    const d2 = [];
    let sumD2 = 0;

    for (let k = 0; k < n; k++) {
        const diff = ranks1[k] - ranks2[k];
        d.push(diff);
        d2.push(diff * diff);
        sumD2 += diff * diff;
    }

    // Calcular rs
    const rs = 1 - (6 * sumD2) / (n * (n * n - 1));

    // Generar filas de la tabla
    let tableRows = "";
    let answerRows = "";
    const items = ["A", "B", "C", "D", "E", "F", "G"].slice(0, n);

    for (let k = 0; k < n; k++) {
        tableRows += `
            <tr>
                <td style="border:1px solid black; padding:5px; text-align:center;">${items[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${ranks1[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${ranks2[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;"></td>
                <td style="border:1px solid black; padding:5px; text-align:center;"></td>
            </tr>`;

        answerRows += `
            <tr>
                <td style="border:1px solid black; padding:5px; text-align:center;">${items[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${ranks1[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${ranks2[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${d[k]}</td>
                <td style="border:1px solid black; padding:5px; text-align:center;">${d2[k]}</td>
            </tr>`;
    }

    const html = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> Dos jueces calificaron ${n} proyectos de arte (A-${items[n - 1]}). Sus clasificaciones (rangos) se muestran a continuación:</p>
            <div style="display:flex; justify-content:center; margin-bottom:15px;">
                <table style="border-collapse:collapse; border:1px solid black; width:80%;">
                    <tr>
                        <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">Proyecto</th>
                        <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">Rango Juez 1 ($R_x$)</th>
                        <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">Rango Juez 2 ($R_y$)</th>
                        <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">Diferencia $d$</th>
                        <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">$d^2$</th>
                    </tr>
                    ${tableRows}
                    <tr>
                        <td colspan="4" style="border:1px solid black; padding:5px; text-align:right; font-weight:bold;">Total $\\sum d^2$:</td>
                        <td style="border:1px solid black; padding:5px;"></td>
                    </tr>
                </table>
            </div>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Complete la tabla calculando las diferencias $d$ y sus cuadrados $d^2$, y halle $\\sum d^2$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Utilice la fórmula $r_s = 1 - \\frac{6\\sum d^2}{n(n^2-1)}$ para calcular el coeficiente de correlación de rangos de Spearman.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Interprete el valor obtenido en términos de la concordancia entre los jueces.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const interpretacion = rs > 0.7 ? "Existe una concordancia fuerte y positiva entre los jueces." :
        rs > 0.3 ? "Existe una concordancia moderada y positiva." :
            rs > -0.3 ? "Hay poca o ninguna concordancia." : "Hay desacuerdo entre los jueces.";

    const respuesta = `
        <p><strong>${i}.</strong></p>
        <p>Tabla completa:</p>
        <div style="display:flex; justify-content:center; margin-bottom:10px;">
            <table style="border-collapse:collapse; border:1px solid black; font-size:0.9em;">
                <tr>
                    <th style="border:1px solid black; padding:2px;">Item</th>
                    <th style="border:1px solid black; padding:2px;">$R_x$</th>
                    <th style="border:1px solid black; padding:2px;">$R_y$</th>
                    <th style="border:1px solid black; padding:2px;">$d$</th>
                    <th style="border:1px solid black; padding:2px;">$d^2$</th>
                </tr>
                ${answerRows}
                <tr>
                    <td colspan="4" style="border:1px solid black; padding:2px; text-align:right; font-weight:bold;">Total:</td>
                    <td style="border:1px solid black; padding:2px;">${sumD2}</td>
                </tr>
            </table>
        </div>
        <ul style="list-style:none; padding:0;">
            <li> $r_s = 1 - \\frac{6(${sumD2})}{${n}(${n * n - 1})} = 1 - \\frac{${6 * sumD2}}{${n * (n * n - 1)}} \\approx ${rs.toFixed(4)}$</li>
            <li> ${interpretacion}</li>
        </ul>
    `;

    return { html, respuesta };
}
