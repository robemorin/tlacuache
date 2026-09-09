import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y sumas parciales",
    titulo: "Crecimiento poblacional porcentual retrospectivo",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const tasa = 2.7;       // % anual
    const factor = 1 + tasa / 100; // 1.027
    const poblacionActual = 15.2; // millones

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Cada año durante los últimos cinco años la población de cierto país ha aumentado a una tasa constante del $${tasa}\\%$ anual. La población actual es de $${poblacionActual}$ millones de habitantes.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">¿Cuál era la población hace un año?</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">¿Cuál era la población hace cinco años?</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <p style="font-size: 0.9em; color: #555;"><em>(Dé sus respuestas con 3 cifras significativas o redondeadas a dos decimales de millón).</em></p>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) P(actual) = P(-1) * (1 + 0.027) => P(-1) = 15.2 / 1.027 = 14.800389... -> 14.8 millones (3 cs)
    const pop1YearAgo = poblacionActual / factor;
    const pop1YearAgo_3cs = parseFloat(pop1YearAgo.toPrecision(3));

    // (b) P(actual) = P(-5) * (1 + 0.027)^5 => P(-5) = 15.2 / (1.027)^5 = 13.305... -> 13.3 millones (3 cs)
    const pop5YearsAgo = poblacionActual / Math.pow(factor, 5);
    const pop5YearsAgo_3cs = parseFloat(pop5YearsAgo.toPrecision(3));

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Relación de crecimiento:</strong><br>
                Si la población crece un $${tasa}\\%$ anual, el factor multiplicador cada año es $r = 1 + \\frac{${tasa}}{100} = ${factor}$.<br>
                Por lo tanto, la población hace $n$ años $P_{-n}$ satisface: $P_{\\text{actual}} = P_{-n} \\times (${factor})^n \\implies P_{-n} = \\frac{P_{\\text{actual}}}{(${factor})^n}$.
            </li>
            <br>
            <li><strong>(a)</strong> Población hace un año ($n = 1$):<br>
                $P_{-1} = \\frac{${poblacionActual}}{${factor}} \\approx ${pop1YearAgo.toFixed(4)}$ millones.<br>
                Respuesta: <strong>${pop1YearAgo_3cs} millones</strong> (o <strong>${pop1YearAgo.toFixed(2)} millones</strong>).
            </li>
            <br>
            <li><strong>(b)</strong> Población hace cinco años ($n = 5$):<br>
                $P_{-5} = \\frac{${poblacionActual}}{(${factor})^5} = \\frac{${poblacionActual}}{${Math.pow(factor, 5).toFixed(5)}} \\approx ${pop5YearsAgo.toFixed(4)}$ millones.<br>
                Respuesta: <strong>${pop5YearsAgo_3cs} millones</strong> (o <strong>${pop5YearsAgo.toFixed(2)} millones</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
