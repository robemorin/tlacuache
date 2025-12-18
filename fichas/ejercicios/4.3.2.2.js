import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.2. Correlación de Pearson",
    titulo: "Pearson y Línea de Regresión",
    puntos: 7,
};

export async function generar(i) {
    // Generar estadísticas sumarias directamente (sin datos crudos visibles)
    // Queremos un r razonable, digamos entre 0.7 y 0.95
    const meanX = Math.floor(Math.random() * 20) + 10;
    const meanY = Math.floor(Math.random() * 50) + 20;

    const sx = Math.random() * 3 + 2; // 2 a 5
    const sy = Math.random() * 8 + 5; // 5 a 13

    const r = (Math.random() * 0.25 + 0.7) * (Math.random() > 0.5 ? 1 : -1); // +/- 0.7 a 0.95

    // Calcular covarianza para consistencia (aunque no se pide explícitamente, se usa para la pendiente)
    // m = r * (sy / sx)
    const m = r * (sy / sx);
    // c = meanY - m * meanX
    const c = meanY - m * meanX;

    // Generar sumas para el problema (opcional, pero el usuario pidió dadas sumas)
    // El usuario dijo: "Calcular r, y la línea de mejor ajuste a partir de x_bar, y_bar, Sum x, Sum y, Sx, Sy Sum x^2..."
    // Si damos las medias y desviaciones, las sumas son redundantes pero las podemos poner para despistar o dar opciones.
    // Asumamos n = 15
    const n = 15;
    const sumX = meanX * n;
    const sumY = meanY * n;
    // Sx = sqrt( (Sum x^2 - n*meanX^2) / (n-1) )  => (n-1)Sx^2 = Sum x^2 - n*meanX^2 => Sum x^2 = (n-1)Sx^2 + n*meanX^2
    const sumX2 = (n - 1) * sx * sx + n * meanX * meanX;
    const sumY2 = (n - 1) * sy * sy + n * meanY * meanY;

    // r = Cov / (Sx * Sy) = (Sum xy - n*meanX*meanY) / ((n-1)*Sx*Sy)
    // Sum xy = r * (n-1) * Sx * Sy + n * meanX * meanY
    const sumXY = r * (n - 1) * sx * sy + n * meanX * meanY;

    // Valor para predecir
    const xPred = Math.floor(meanX + (Math.random() * 2 - 1) * sx);
    const yPred = m * xPred + c;

    const html = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> Se realizó un estudio con ${n} pares de datos bivariados $(x, y)$. Se obtuvieron los siguientes estadísticos sumarios:</p>
            <div style="display:flex; justify-content:center; gap: 40px; margin-bottom:15px;">
                <div>
                    <p>$\\bar{x} = ${meanX.toFixed(2)}$</p>
                    <p>$\\bar{y} = ${meanY.toFixed(2)}$</p>
                </div>
                <div>
                    <p>$S_x = ${sx.toFixed(4)}$</p>
                    <p>$S_y = ${sy.toFixed(4)}$</p>
                </div>
                <div>
                    <p>$\\sum xy = ${sumXY.toFixed(2)}$</p>
                    <p>$\\sum x^2 = ${sumX2.toFixed(2)}$</p>
                </div>
            </div>
            <p>A partir de estos datos:</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el coeficiente de correlación momento-producto de Pearson, $r$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle la ecuación de la recta de regresión de $y$ sobre $x$ en la forma $y = mx + c$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Utilice su ecuación de regresión para estimar el valor de $y$ cuando $x = ${xPred}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> $r = ${r.toFixed(4)}$</li>
            <li> $y = ${m.toFixed(4)}x + ${c.toFixed(4)}$</li>
            <li> $y = ${m.toFixed(4)}(${xPred}) + ${c.toFixed(4)} \\approx ${yPred.toFixed(2)}$</li>
        </ul>
        <p><em>Nota: Los cálculos pueden variar ligeramente dependiendo del redondeo intermedio.</em></p>
    `;

    return { html, respuesta };
}
