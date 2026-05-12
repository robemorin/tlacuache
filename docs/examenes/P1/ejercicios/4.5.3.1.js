import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.12. Distribución Normal",
    titulo: "Pesos de Jabón en Polvo",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- DATOS ALEATORIOS ---
    const mediaContenido = Math.floor(Math.random() * 101) + 700; // 700 a 800 g
    const sdContenido = Math.floor(Math.random() * 6) + 15;        // 15 a 20 g

    const mediaEmpaque = Math.floor(Math.random() * 11) + 35;      // 35 a 45 g
    const sdEmpaque = Math.floor(Math.random() * 3) + 4;           // 4 a 6 g

    const umbralTotal = Math.floor(3 * sdContenido * (Math.random() - 0.5) + mediaContenido);        // Un poco menos que la media total
    const numPaquetes = 10;
    const umbralSuma = (mediaContenido * numPaquetes) + 50;        // Un poco más que la media de la suma

    // --- CÁLCULOS ---
    // a) Total individual
    const mediaTotal = mediaContenido + mediaEmpaque;
    const varTotal = Math.pow(sdContenido, 2) + Math.pow(sdEmpaque, 2);
    const sdTotal = Math.sqrt(varTotal);
    const z1 = (umbralTotal - mediaTotal) / sdTotal;
    // Probabilidad (Total > umbralTotal) -> 1 - P(Z < z1)
    // Usamos una función simple para aproximar la CDF normal si no hay librería disponible
    const normalCDF = (z) => {
        const t = 1 / (1 + 0.2316419 * Math.abs(z));
        const d = 0.3989423 * Math.exp(-z * z / 2);
        const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        return z > 0 ? 1 - p : p;
    };
    const prob1 = 1 - normalCDF(z1);

    // b) Suma de 5 paquetes
    const mediaSuma = mediaContenido * numPaquetes;
    const varSuma = numPaquetes * Math.pow(sdContenido, 2);
    const sdSuma = Math.sqrt(varSuma);
    const z2 = (umbralSuma - mediaSuma) / sdSuma;
    const prob2 = 1 - normalCDF(z2);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una empresa realiza un estudio sobre el peso de las cajas de detergente de la marca "AjolonZote". 
            El peso del contenido de una caja elegida al azar sigue una distribución normal con una media de $${mediaContenido}$ gramos y una desviación típica de $${sdContenido}$ gramos.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la probabilidad de que una caja de "AjolonZote" elegida al azar tenga un peso superior a $${umbralTotal}$ gramos.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Halle la probabilidad de que de $${numPaquetes}$ cajas elegidas al azar al menos  
                    $${Math.floor((numPaquetes - 3) * Math.random() + 1)}$ tengan un peso superior a $${umbralTotal}$ gramos.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista-res">
            <li><strong>a)</strong> Definimos las variables:
                <br>Contenido $X \\sim N(${mediaContenido}, ${sdContenido}^2)$
                <br>Empaque $Y \\sim N(${mediaEmpaque}, ${sdEmpaque}^2)$
                <br>Peso total $W = X + Y$.
                <br>Media: $E[W] = ${mediaContenido} + ${mediaEmpaque} = ${mediaTotal}$ g.
                <br>Varianza: $Var(W) = ${sdContenido}^2 + ${sdEmpaque}^2 = ${varTotal}$.
                <br>Desviación típica: $\\sigma_W = \\sqrt{${varTotal}} \\approx ${sdTotal.toFixed(3)}$ g.
                <br>Queremos $P(W > ${umbralTotal})$:
                <br>$Z = \\frac{${umbralTotal} - ${mediaTotal}}{${sdTotal.toFixed(3)}} \\approx ${z1.toFixed(3)}$.
                <br>$P(Z > ${z1.toFixed(3)}) \\approx$ <strong>${prob1.toFixed(4)}</strong>.
            </li>
            <li><strong>b)</strong> Sea $S = X_1 + X_2 + X_3 + X_4 + X_5$ el peso total del contenido.
                <br>Media: $E[S] = 5 \\times ${mediaContenido} = ${mediaSuma}$ g.
                <br>Varianza: $Var(S) = 5 \\times ${sdContenido}^2 = ${varSuma}$.
                <br>Desviación típica: $\\sigma_S = \\sqrt{${varSuma}} \\approx ${sdSuma.toFixed(3)}$ g.
                <br>Queremos $P(S > ${umbralSuma})$:
                <br>$Z = \\frac{${umbralSuma} - ${mediaSuma}}{${sdSuma.toFixed(3)}} \\approx ${z2.toFixed(3)}$.
                <br>$P(Z > ${z2.toFixed(3)}) \\approx$ <strong>${prob2.toFixed(4)}</strong>.
            </li>
        </ol>
    `;

    return { html, respuesta };
}
