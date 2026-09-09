import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto",
    titulo: "Plan de ahorro e inversión con interés compuesto mensual",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const inversionInicial = 3000;
    const tasaAhorro = 1.25; // % anual
    const k = 12;            // mensual
    const aniosAhorro = 6;
    const metaAhorro = 3550;

    // --- CÁLCULOS ---
    const r_mensual_ahorro = (tasaAhorro / 100) / k;
    const periodos_a = aniosAhorro * k; // 72 meses
    const fv_6anios = inversionInicial * Math.pow(1 + r_mensual_ahorro, periodos_a); // ~ 3233.42

    const meses_exacto = Math.log(metaAhorro / inversionInicial) / Math.log(1 + r_mensual_ahorro);
    const meses_necesarios = Math.ceil(meses_exacto); // 162 meses

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Imani invierte $${inversionInicial.toLocaleString()}$ USD en una cuenta bancaria que paga un tipo de interés nominal anual del $${tasaAhorro}\\%$, compuesto mensualmente.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule cuánto dinero tendrá Imani en esa cuenta al cabo de $${aniosAhorro}$ años completos. Dé la respuesta redondeando a dos cifras decimales.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el número de meses que tendrán que pasar para que Imani tenga al menos $${metaAhorro.toLocaleString()}$ USD en la cuenta.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Valor futuro de la inversión a los $6$ años ($72$ meses):<br>
                $FV = PV \\left(1 + \\frac{r}{100k}\\right)^{kn}$<br>
                $FV = ${inversionInicial} \\left(1 + \\frac{${tasaAhorro}}{1200}\\right)^{72} = ${inversionInicial} \\left(1 + ${(r_mensual_ahorro).toFixed(6)}\\right)^{72} \\approx$ <strong>$${fv_6anios.toFixed(2)} USD</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Tiempo necesario para alcanzar al menos $${metaAhorro}$ USD:<br>
                $${metaAhorro} \\le ${inversionInicial} \\left(1 + \\frac{${tasaAhorro}}{1200}\\right)^m$<br>
                $\\frac{${metaAhorro}}{${inversionInicial}} \\le (${(1 + r_mensual_ahorro).toFixed(6)})^m$<br>
                Tomando logaritmos: $m \\ge \\frac{\\ln(${metaAhorro / inversionInicial})}{\\ln(1 + ${r_mensual_ahorro.toFixed(6)})} \\approx ${meses_exacto.toFixed(2)}$ meses.<br>
                Redondeando al número entero de meses necesario: <strong>${meses_necesarios} meses</strong> (o $13.5$ años).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
