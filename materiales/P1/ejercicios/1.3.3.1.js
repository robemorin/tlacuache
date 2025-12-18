import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.3. Anualidades y Amortizaciones",
    titulo: "Plan de Retiro (Anualidad)",
    tipo: 1,
    puntos: 8,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Ahorro inicial: 1,000,000 a 2,000,000
    const ahorroInicial = 1000000 + Math.floor(Math.random() * 21) * 50000;

    // Tasa de interés: 4.0% a 6.5%
    const tasaInteres = 40 + Math.floor(Math.random() * 26); // 40 a 65
    const r_anual = tasaInteres / 1000; // 0.040 a 0.065

    // Duración deseada: 20 a 30 años
    const durationYears = 20 + Math.floor(Math.random() * 11);

    // Umbral para inciso b (balance menor a...)
    // Un valor razonable, ej. 60-80% del inicial
    const umbralBalance = Math.floor(ahorroInicial * (0.6 + Math.random() * 0.2) / 10000) * 10000;

    // Años para inciso c (un año intermedio)
    const yearsCheck = Math.floor(durationYears * 0.6); // ej. si 30, check 18

    // --- CÁLCULOS ---
    const n = 12; // Mensual
    const i_mensual = r_anual / n;
    const totalMeses = durationYears * n;

    // a) Retiro mensual (PMT)
    // PV = PMT * [1 - (1+i)^-N] / i
    // PMT = PV * i / [1 - (1+i)^-N]
    const numerador = ahorroInicial * i_mensual;
    const denominador = 1 - Math.pow(1 + i_mensual, -totalMeses);
    const pmt = numerador / denominador;

    // b) Tiempo para que el balance caiga por debajo de umbralBalance
    // Fórmula del balance B_k despues de k pagos:
    // B_k = PV(1+i)^k - PMT [((1+i)^k - 1) / i]
    // Despejando k cuando B_k = umbralBalance
    // B_k = (PV - PMT/i)(1+i)^k + PMT/i
    // B_k - PMT/i = (PV - PMT/i)(1+i)^k
    // (1+i)^k = (B_k - PMT/i) / (PV - PMT/i)
    // k = ln(...) / ln(1+i)

    const termCst = pmt / i_mensual; // PMT/i
    const diffPV = ahorroInicial - termCst; // PV - PMT/i (negativo usualmente en anualidades de retiro)
    const diffFV = umbralBalance - termCst; // FV - PMT/i

    const k_exacto = Math.log(diffFV / diffPV) / Math.log(1 + i_mensual);
    const k_meses = Math.ceil(k_exacto);
    // Convertir a años y meses aprox para la respuesta
    const anios_b = Math.floor(k_meses / 12);
    const meses_b = k_meses % 12;

    // c) Balance después de yearsCheck
    const k_check = yearsCheck * 12;
    // B_k = (PV - PMT/i)(1+i)^k + PMT/i
    const balanceCheck = diffPV * Math.pow(1 + i_mensual, k_check) + termCst;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Después de jubilarse a los 65 años, Juan deposita sus ahorros de <strong>€${ahorroInicial.toLocaleString('de-DE')}</strong> en una cuenta de anualidad que genera un interés del <strong>${(r_anual * 100).toFixed(2)}%</strong> anual compuesto <strong>mensualmente</strong>.</p>
            <p>Él desea que este dinero le dure exactamente <strong>${durationYears} años</strong> más (retirando la misma cantidad al final de cada mes hasta agotar el fondo).</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule la cantidad máxima que Juan puede retirar mensualmente.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine cuánto tiempo tomará (en meses) para que el saldo del fondo caiga por debajo de <strong>€${umbralBalance.toLocaleString('de-DE')}</strong>.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule cuánto dinero quedará en la anualidad de Juan después de <strong>${yearsCheck} años</strong>.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Retiro Mensual ($PMT$):</strong></p>
        <p>Usamos la fórmula del valor presente de una anualidad:</p>
        <p>$$PV = PMT \\times \\frac{1 - (1+i)^{-N}}{i}$$</p>
        <p>Datos:</p>
        <ul>
            <li>$PV = €${ahorroInicial.toLocaleString('de-DE')}$</li>
            <li>$i = \\frac{${r_anual * 100}\\%}{12} = ${(i_mensual * 100).toFixed(4)}\\% = ${i_mensual.toFixed(6)}$</li>
            <li>$N = ${durationYears} \\text{ años} \\times 12 = ${totalMeses} \\text{ meses}$</li>
        </ul>
        <p>Despejamos $PMT$:</p>
        <p>$$PMT = PV \\times \\frac{i}{1 - (1+i)^{-N}}$$</p>
        <p>$$PMT = ${ahorroInicial} \\times \\frac{${i_mensual.toFixed(6)}}{1 - (1 + ${i_mensual.toFixed(6)})^{-${totalMeses}}}$$</p>
        <p>$$PMT = ${ahorroInicial} \\times \\frac{${i_mensual.toFixed(6)}}{${denominador.toFixed(6)}}$$</p>
        <p>$$PMT \\approx €${pmt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}$$</p>
        <p>Juan puede retirar <strong>€${pmt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> por mes.</p>
        <hr>
        
        <p><strong>b) Tiempo para caer bajo €${umbralBalance.toLocaleString('de-DE')}:</strong></p>
        <p>Usamos la fórmula del saldo $B_k$ después de $k$ pagos:</p>
        <p>$$B_k = PV(1+i)^k - PMT \\frac{(1+i)^k - 1}{i}$$</p>
        <p>Queremos hallar $k$ tal que $B_k = ${umbralBalance}$. Sin embargo, es más fácil usar la forma linealizada o el GDC (Calculadora Gráfica).</p>
        <p>Algebraicamente:</p>
        <p>$$(1+i)^k = \\frac{B_k - \\frac{PMT}{i}}{PV - \\frac{PMT}{i}}$$</p>
        <p>Calculamos la constante $C = \\frac{PMT}{i} = \\frac{${pmt.toFixed(2)}}{${i_mensual.toFixed(6)}} \\approx ${termCst.toLocaleString('de-DE')}$.</p>
        <p>$$(1+${i_mensual.toFixed(5)})^k \\approx \\frac{${diffFV.toFixed(2)}}{${diffPV.toFixed(2)}} \\approx ${(diffFV / diffPV).toFixed(6)}$$</p>
        <p>$$k = \\frac{\\ln(${(diffFV / diffPV).toFixed(6)})}{\\ln(1 + ${i_mensual.toFixed(6)})}$$</p>
        <p>$$k \\approx ${k_exacto.toFixed(2)} \\text{ meses}$$</p>
        <p>Se requieren <strong>${k_meses} meses</strong> (aprox. ${anios_b} años y ${meses_b} meses).</p>
        <hr>
        
        <p><strong>c) Balance después de ${yearsCheck} años:</strong></p>
        <p>$k = ${yearsCheck} \\times 12 = ${k_check}$ meses.</p>
        <p>$$B_{${k_check}} = ${ahorroInicial}(1 + ${i_mensual.toFixed(6)})^{${k_check}} - ${pmt.toFixed(2)} \\frac{(1 + ${i_mensual.toFixed(6)})^{${k_check}} - 1}{${i_mensual.toFixed(6)}}$$</p>
        <p>Calculando por partes:</p>
        <p>Parte Interés Compuesto: $PV(1+i)^k \\approx ${(ahorroInicial * Math.pow(1 + i_mensual, k_check)).toLocaleString('de-DE')}$</p>
        <p>Parte Retiros: $PMT \\times \\text{Factor} \\approx ${(pmt * (Math.pow(1 + i_mensual, k_check) - 1) / i_mensual).toLocaleString('de-DE')}$</p>
        <p>$$B_{${k_check}} \\approx €${balanceCheck.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}$$</p>
        <p>Quedarán <strong>€${balanceCheck.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> en el fondo.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
