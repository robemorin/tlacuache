import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.2. Correlación de Pearson",
    titulo: "Estadísticas Sumarias (Bivariado)",
    puntos: 6,
};

export async function generar(i) {
    // Generar datos aleatorios (n entre 8 y 10)
    const n = Math.floor(Math.random() * 3) + 8;
    const x = [];
    const y = [];

    // Generar x e y con cierta correlación para que sea realista
    for (let j = 0; j < n; j++) {
        const valX = Math.floor(Math.random() * 20) + 1;
        // y relacionado con x más algo de ruido
        const valY = Math.floor(valX * (0.5 + Math.random()) + Math.random() * 10);
        x.push(valX);
        y.push(valY);
    }

    // Cálculos
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const meanX = sumX / n;
    const meanY = sumY / n;

    // Desviación estándar muestral (Sn) o poblacional (sn)? 
    // IB usa sx (muestral, n-1) generalmente para "sample standard deviation" en calculadoras.
    // Pero a veces piden sn. Asumiremos Sx (muestral) que es lo estándar en TI-84/Nspire.
    // Sx = sqrt( sum(x - mean)^2 / (n-1) )

    const sumSqDiffX = x.reduce((a, b) => a + Math.pow(b - meanX, 2), 0);
    const sumSqDiffY = y.reduce((a, b) => a + Math.pow(b - meanY, 2), 0);

    const sx = Math.sqrt(sumSqDiffX / (n - 1));
    const sy = Math.sqrt(sumSqDiffY / (n - 1));

    // Sumas de cuadrados y producto
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);
    const sumXY = x.reduce((a, b, idx) => a + b * y[idx], 0);

    // Formatear tabla de datos

    let tableRows = `<tr>
            <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">$x$</th>
            ${x.map(val => `<td style="border:1px solid black; padding:5px; text-align:center;">${val}</td>`).join('')}
        </tr>
        <tr>
            <th style="border:1px solid black; padding:5px; background-color:#f0f0f0;">$y$</th>
            ${y.map(val => `<td style="border:1px solid black; padding:5px; text-align:center;">${val}</td>`).join('')}
        </tr>
    `;/*
    for (let j = 0; j < n; j++) {
        tableRows += `<tr><td style="border:1px solid black; padding:5px; text-align:center;">${x[j]}</td><td style="border:1px solid black; padding:5px; text-align:center;">${y[j]}</td></tr>`;
    }*/

    const html = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> Considere el siguiente conjunto de datos bivariados:</p>
            <div style="display:flex; justify-content:center; margin-bottom:15px;">
<tlacuache-tabla row1="x,x2" row2="y,y2"></tlacuache-tabla>
            
                <table style="border-collapse:collapse; border:1px solid black;">

                    ${tableRows}
                </table>
            </div>
            <p>Utilizando su calculadora de pantalla gráfica (CPG), halle los siguientes valores estadísticos:</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Las medias $\\bar{x}$ y $\\bar{y}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Las desviaciones estándar muestrales $S_x$ y $S_y$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Las sumas $\\sum x$, $\\sum y$, $\\sum x^2$, $\\sum y^2$ y $\\sum xy$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> $\\bar{x} = ${meanX.toFixed(2)}$, $\\bar{y} = ${meanY.toFixed(2)}$</li>
            <li> $S_x = ${sx.toFixed(4)}$, $S_y = ${sy.toFixed(4)}$</li>
            <li> 
                $\\sum x = ${sumX}$, $\\sum y = ${sumY}$ <br>
                $\\sum x^2 = ${sumX2}$, $\\sum y^2 = ${sumY2}$ <br>
                $\\sum xy = ${sumXY}$
            </li>
        </ul>
    `;

    return { html, respuesta };
}
