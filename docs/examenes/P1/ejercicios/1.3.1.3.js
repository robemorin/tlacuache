import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto",
    titulo: "Valor futuro con interés compuesto anual",
    tipo: 1, // 1 = Abierto
    puntos: 3
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const principal = 5000; // PV
    const tasa = 6.5;       // r (%)
    const tiempo = 5;       // t (años)

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Se invierte una cantidad de $${principal.toLocaleString()}$ USD a una tasa de interés compuesto del $${tasa}\\%$ anual.</p>
            
            <p>Aproximando al dólar entero más cercano, ¿cuál será el valor total de la inversión pasados $${tiempo}$ años?</p>
            
            <span class="ib-mark" style="float: right;">[3]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="16" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // FV = PV * (1 + r/100)^t
    // FV = 5000 * (1 + 0.065)^5 = 5000 * (1.065)^5 = 5000 * 1.37008666 = 6850.4333...
    const fvExacto = principal * Math.pow(1 + tasa / 100, tiempo);
    const fvRedondeado = Math.round(fvExacto);

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Fórmula de Interés Compuesto:</strong><br>
                $FV = PV \\left(1 + \\frac{r}{100k}\\right)^{kn}$<br>
                Dado que la capitalización es anual ($k = 1$):<br>
                $FV = PV(1 + r)^t$
            </li>
            <br>
            <li><strong>Sustitución de datos:</strong><br>
                $PV = ${principal}$, $r = ${tasa/100}$, $t = ${tiempo}$<br>
                $FV = ${principal} \\times (1 + ${tasa/100})^{${tiempo}}$<br>
                $FV = ${principal} \\times (${(1 + tasa/100).toFixed(3)})^{${tiempo}}$<br>
                $FV = ${principal} \\times ${Math.pow(1 + tasa/100, tiempo).toFixed(6)} \\approx ${fvExacto.toFixed(2)}$ USD.
            </li>
            <br>
            <li><strong>Respuesta final aproximada al dólar más cercano:</strong><br>
                $FV =$ <strong>$${fvRedondeado.toLocaleString()} USD</strong> (o $${fvExacto.toFixed(2)}$ USD).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
