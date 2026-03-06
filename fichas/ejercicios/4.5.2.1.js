import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.5. Distribuciones de probabilidad",
    seccion: "4.5.2. Distribución Normal Múltiples",
    titulo: "Ficha: Conceptos y Representación Gráfica de la Distribución Normal",
    tipo: 1,
    puntos: 24
};

export async function generar(i) {
    let outputHTML = `<h3>${metadata.titulo}</h3>`;
    let resHTML = ``;

    // ======================================================
    // EJERCICIO 1: DIBUJAR Y SOMBREAR (3 INCISOS)
    // ======================================================
    const dibujos = [];
    for (let k = 0; k < 3; k++) {
        let mu = Math.floor(Math.random() * 50) + 100;
        let sigma = Math.floor(Math.random() * 10) + 5;
        let delta1 = Math.floor(Math.random() * sigma * 2) + 1;
        let delta2 = Math.floor(Math.random() * sigma * 2) + 1;

        let condicion, limiteText, expXmin, expXmax, ansStr;

        if (k === 0) {
            // P(X < a)
            let limit = mu - delta1;
            condicion = `P(X < ${limit})`;
            limiteText = `menor que $${limit}$`;
            expXmax = limit;
            ansStr = `Sombreado a la izquierda de ${limit}`;
        } else if (k === 1) {
            // P(X > b)
            let limit = mu + delta2;
            condicion = `P(X > ${limit})`;
            limiteText = `mayor que $${limit}$`;
            expXmin = limit;
            ansStr = `Sombreado a la derecha de ${limit}`;
        } else {
            // P(a < X < b)
            let lim1 = mu - delta1;
            let lim2 = mu + delta2;
            condicion = `P(${lim1} < X < ${lim2})`;
            limiteText = `entre $${lim1}$ y $${lim2}$`;
            expXmin = lim1;
            expXmax = lim2;
            ansStr = `Sombreado entre ${lim1} y ${lim2}`;
        }

        dibujos.push({ mu, sigma, condicion, limiteText, expXmin, expXmax, ansStr });
    }

    outputHTML += `
    <div class="problema-ib" style="margin-bottom: 40px;">
        <p><strong>${i}.</strong> Para cada inciso, se proporciona la media $\\mu$ y la desviación estándar $\\sigma$ de una variable aleatoria normal $X$. En las gráficas en blanco, ubique con líneas verticales los valores indicados y <strong>sombree</strong> el área que representa la probabilidad solicitada.</p>
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">$\\mu = ${dibujos[0].mu}, \\; \\sigma = ${dibujos[0].sigma}$. Represente la probabilidad de obtener un valor ${dibujos[0].limiteText} ($${dibujos[0].condicion}$).</span>
                <span class="ib-mark">[3]</span>
                <div style="display:flex; justify-content:center; margin:15px 0;">
                    <tlacuache-dist-normal mean="${dibujos[0].mu}" s="${dibujos[0].sigma}"></tlacuache-dist-normal>
                </div>
            </li>
            <li>
                <span class="ib-texto">$\\mu = ${dibujos[1].mu}, \\; \\sigma = ${dibujos[1].sigma}$. Represente la probabilidad de obtener un valor ${dibujos[1].limiteText} ($${dibujos[1].condicion}$).</span>
                <span class="ib-mark">[3]</span>
                <div style="display:flex; justify-content:center; margin:15px 0;">
                    <tlacuache-dist-normal mean="${dibujos[1].mu}" s="${dibujos[1].sigma}"></tlacuache-dist-normal>
                </div>
            </li>
            <li>
                <span class="ib-texto">$\\mu = ${dibujos[2].mu}, \\; \\sigma = ${dibujos[2].sigma}$. Represente la probabilidad de obtener un valor ${dibujos[2].limiteText} ($${dibujos[2].condicion}$).</span>
                <span class="ib-mark">[3]</span>
                <div style="display:flex; justify-content:center; margin:15px 0;">
                    <tlacuache-dist-normal mean="${dibujos[2].mu}" s="${dibujos[2].sigma}"></tlacuache-dist-normal>
                </div>
            </li>
        </ol>
    </div>
    `;

    resHTML += `
    <p><strong>${i}.</strong> (Puntos otorgados si el alumno traza la línea en la posición aproximada correcta y sombrea el lado correspondiente)</p>
    <ul>
        <li>Inciso a: ${dibujos[0].ansStr}</li>
        <li>Inciso b: ${dibujos[1].ansStr}</li>
        <li>Inciso c: ${dibujos[2].ansStr}</li>
    </ul>
    `;

    // ======================================================
    // EJERCICIO 2: APLICACIÓN CON DIBUJO Y CÁLCULO
    // ======================================================
    let mu2 = Math.floor(Math.random() * 20) + 60; // 60 a 80
    let sigma2 = Math.floor(Math.random() * 5) + 3;
    let limit2 = mu2 + Math.floor(Math.random() * sigma2) + 2;

    let p2 = tlacu.stat.normalcdf(limit2, 1e99, mu2, sigma2);

    outputHTML += `
    <div class="problema-ib" style="margin-bottom: 40px;">
        <p><strong>${i + 1}.</strong> El tiempo que tardan los clientes en almorzar en un restaurante local sigue aproximadamente una distribución normal con una media de $${mu2}$ minutos y una desviación estándar de $${sigma2}$ minutos.</p>
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Dibuje la curva de distribución normal en los ejes proporcionados, asegurándose de que la media se encuentre en el centro y estime el ancho usando la desviación estándar. Sombree la región que representa la probabilidad de que un cliente tarde <strong>más de $${limit2}$ minutos</strong>.</span>
                <span class="ib-mark">[5]</span>
                <div style="height: 250px; border: 2px dashed #999; margin-top: 15px; border-radius: 5px; background-color: #fcfcfc; width: 100%; display: flex; align-items: center; justify-content: center; color: #aaa;">
                    (Espacio cuadriculado para que el estudiante dibuje su propia curva y sombree)
                </div>
            </li>
            <li>
                <span class="ib-texto">Calcule la probabilidad de que un cliente seleccionado al azar tarde más de $${limit2}$ minutos en almorzar.</span>
                <span class="ib-mark">[2]</span>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    `;

    resHTML += `
    <p><strong>${i + 1}.</strong></p>
    <ul>
        <li>Inciso a: Se otorgan los 5 puntos por dibujar una curva tipo campana centrada en $${mu2}$, con dispersión acorde a $${sigma2}$, y la cola derecha sombreada a partir de un eje x que inicie en $${limit2}$.</li>
        <li>Inciso b: $P(X > ${limit2}) \\approx ${p2.toFixed(4)}$</li>
    </ul>
    `;

    // ======================================================
    // EJERCICIO 3: INVERSA Y ANÁLISIS
    // ======================================================
    let mu3 = Math.floor(Math.random() * 50) + 200;
    let sigma3 = Math.floor(Math.random() * 15) + 5;
    let topPct = Math.floor(Math.random() * 10) + 5; // 5% a 15%
    let limit3 = tlacu.stat.invNorm(1 - (topPct / 100), mu3, sigma3);

    outputHTML += `
    <div class="problema-ib" style="margin-bottom: 40px;">
        <p><strong>${i + 2}.</strong> La cantidad de ml que sirve una máquina dispensadora de café sigue una distribución normal con media $\\mu = ${mu3}$ ml y desviación estándar $\\sigma = ${sigma3}$ ml.</p>
        <p>Se sabe que el $${topPct}\\%$ de los vasos más llenos tienden a derramarse.</p>
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Utilizando la siguiente gráfica en blanco, ubique el volumen $V$ a partir del cual el café se derrama y sombree el área correspondiente al porcentaje dado.</span>
                <span class="ib-mark">[4]</span>
                <div style="display:flex; justify-content:center; margin:15px 0;">
                    <tlacuache-dist-normal mean="${mu3}" s="${sigma3}"></tlacuache-dist-normal>
                </div>
            </li>
            <li>
                <span class="ib-texto">Halle el volumen mínimo de café que provoca que el vaso se derrame.</span>
                <span class="ib-mark">[4]</span>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    `;

    resHTML += `
    <p><strong>${i + 2}.</strong></p>
    <ul>
        <li>Inciso a: Curva centrada en $${mu3}$, con la cola derecha sombreada que sea visiblemente pequeña (aprox el $${topPct}\\%$).</li>
        <li>Inciso b: $P(X > V) = ${topPct / 100} \\implies V = \\text{invNorm}(${1 - (topPct / 100)}, ${mu3}, ${sigma3}) \\approx ${limit3.toFixed(2)}$ ml.</li>
    </ul>
    `;

    return {
        html: outputHTML,
        respuesta: resHTML,
        numPreguntas: 3
    };
}
