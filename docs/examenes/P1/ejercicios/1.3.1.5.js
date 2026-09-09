import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto y Amortización",
    titulo: "Amortización de préstamo para compra de vehículo",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const costoCoche = 22000;
    const enganche = 3550;
    const prestamo = costoCoche - enganche; // 18450

    const aniosPrestamo = 8;
    const k = 12;
    const nPagos = aniosPrestamo * k; // 96 meses
    const tasaPrestamo = 12.6; // % anual

    // --- CÁLCULOS ---
    const i_prestamo = (tasaPrestamo / 100) / k; // 0.126 / 12 = 0.0105
    const cuotaMensual = prestamo * (i_prestamo / (1 - Math.pow(1 + i_prestamo, -nPagos))); // ~ 304.59 -> 305 USD

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Imani utiliza un ahorro de $${enganche.toLocaleString()}$ USD como entrada (enganche) para comprarse un coche de segunda mano que cuesta $${costoCoche.toLocaleString()}$ USD. Para pagar la cantidad restante, pide un préstamo a un banco.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba cuánto dinero pide Imani como préstamo al banco.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">El préstamo es a $${aniosPrestamo}$ años y el tipo de interés nominal anual es del $${tasaPrestamo}\\%$, compuesto mensualmente. Imani devolverá el préstamo pagando una cuota mensual fija al final de cada mes. Calcule la cantidad —redondeando al número entero de dólares ($) más próximo— que tendrá que pagar Imani al banco cada mes.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Monto del préstamo solicitado:<br>
                $\\text{Préstamo} = ${costoCoche} - ${enganche} =$ <strong>$${prestamo.toLocaleString()} USD</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Cuota mensual fija de amortización ($PMT$):<br>
                • Plazo total: $n = ${aniosPrestamo} \\times 12 = ${nPagos}$ mensualidades.<br>
                • Tasa mensual: $i = \\frac{${tasaPrestamo}}{1200} = ${i_prestamo}$.<br>
                • Valor presente: $PV = ${prestamo}$.<br>
                <br>
                Usando la fórmula de anualidad / amortización:<br>
                $PMT = PV \\cdot \\frac{i}{1 - (1 + i)^{-n}} = ${prestamo} \\cdot \\frac{${i_prestamo}}{1 - (1 + ${i_prestamo})^{-${nPagos}}} \\approx ${cuotaMensual.toFixed(2)}$ USD.<br>
                <br>
                Respuesta redondeada al dólar más próximo: <strong>$${Math.round(cuotaMensual).toLocaleString()} USD</strong> al mes.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
