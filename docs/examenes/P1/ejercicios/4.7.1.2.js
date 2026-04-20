import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Prueba t",
    titulo: "Prueba t de Student - Cálculo Manual",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VALORES INVENTADOS AMIGABLES PARA P1 ---
    const mu = 1000;
    const n = 16;
    const mediaMuestral = 1020;
    const s = 40;
    const valorCritico = 1.753; // t crítico para 15 gl, alpha 0.05, 1 cola

    const tCalc = (mediaMuestral - mu) / (s / Math.sqrt(n)); // 2.0

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> Una fábrica produce bombillas cuya vida útil media histórica es de $\\mu = ${mu}$ horas. Para comprobar si un nuevo proceso de fabricación ha aumentado la vida útil de las bombillas, se toma una muestra aleatoria de $n = ${n}$ bombillas elaboradas con el nuevo proceso.</p>
            <p>Se obtuvo que la media muestral es de $\\bar{x} = ${mediaMuestral}$ horas y la desviación típica muestral es de $s_n = ${s}$ horas. Se desea realizar una prueba $t$ con un nivel de significación del $5\\%$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="5" color="gray" alto="30"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el valor del estadístico $t$. Use la fórmula $t = \\frac{\\bar{x} - \\mu}{\\frac{s}{\\sqrt{n}}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="7" color="gray" alto="30"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">El valor crítico de $t$ para esta prueba es $${valorCritico}$. Indique la conclusión de la prueba y justifique su respuesta.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="5" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $H_0: \\mu = ${mu}$ <br>
                $H_1: \\mu > ${mu}$</li>
            <br>
            <li><strong>b)</strong> $t = \\frac{${mediaMuestral} - ${mu}}{${s} / \\sqrt{${n}}}$ <br>
                $t = \\frac{${mediaMuestral - mu}}{${s} / ${Math.sqrt(n)}}$ <br>
                $t = \\frac{${mediaMuestral - mu}}{${s / Math.sqrt(n)}} = $ <strong>$${tCalc}$</strong></li>
            <br>
            <li><strong>c)</strong> Como $${tCalc} > ${valorCritico}$ (el estadístico de prueba es mayor que el valor crítico), se <strong>rechaza $H_0$</strong>. <br>
                Hay evidencia suficiente para afirmar que la vida útil de las bombillas ha aumentado con el nuevo proceso.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
