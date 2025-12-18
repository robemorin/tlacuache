import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto",
    titulo: "Depreciación de Equipo y Fondo de Inversión",
    tipo: 1,
    puntos: 8,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    const precioInicial = 25000 + Math.floor(Math.random() * 10) * 1000; // $25,000 - $34,000
    const valorRescate = 4000 + Math.floor(Math.random() * 6) * 500;     // $4,000 - $6,500
    const precioNuevo = precioInicial + 3000 + Math.floor(Math.random() * 5) * 1000; // Más caro que el inicial
    const tasaDepreciacion = 18 + Math.floor(Math.random() * 5);         // 18% - 22%
    const tasaInteres = 8 + Math.floor(Math.random() * 5);               // 8% - 12%
    const frecuenciaCompuesta = 4; // Trimestral

    const r_dep = tasaDepreciacion / 100;
    const r_int = tasaInteres / 100;
    const n = frecuenciaCompuesta;

    // --- CÁLCULOS ---

    // a) Valor después de 1 año
    // V(1) = P(1 - r)^1
    const valorAno1 = precioInicial * (1 - r_dep);

    // b) Tiempo hasta reemplazo
    // V(t) = P(1 - r)^t = valorRescate
    // t = log(valorRescate/P) / log(1 - r)
    const tiempoExacto = Math.log(valorRescate / precioInicial) / Math.log(1 - r_dep);
    const tiempoRedondeado = Math.round(tiempoExacto); // Redondear al entero más cercano

    // c) Depreciación total
    // Depreciación Total = Valor Inicial - Valor Final (al momento del reemplazo, que es aprox valorRescate)
    // Sin embargo, la pregunta dice "hasta el momento de su reemplazo", que ocurre a los t años redondeados.
    // Calculamos el valor exacto a los t años redondeados:
    const valorAlReemplazo = precioInicial * Math.pow(1 - r_dep, tiempoRedondeado);
    const depreciacionTotal = precioInicial - valorAlReemplazo;

    // d) Inversión inicial necesaria
    // FV = PV(1 + r/n)^(nt)  =>  PV = FV / (1 + r/n)^(nt)
    // Se necesita tener precioNuevo en tiempoRedondeado años.
    const t = tiempoRedondeado;
    const inversionInicial = precioNuevo / Math.pow(1 + r_int / n, n * t);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una empresa de diseño gráfico adquiere hoy un servidor de alto rendimiento por <strong>$${precioInicial.toLocaleString('en-US')}</strong>. 
            Este equipo se deprecia anualmente a una tasa fija del <strong>${tasaDepreciacion}%</strong> sobre su valor en libros (método de valor decreciente).</p>
            
            <p>La directora, María, planea reemplazar el servidor cuando su valor estimado sea aproximadamente <strong>$${valorRescate.toLocaleString('en-US')}</strong> (redondeado a la centena más cercana).
            Se estima que el costo del nuevo servidor en ese momento será de <strong>$${precioNuevo.toLocaleString('en-US')}</strong>.</p>
            
            <p>Para asegurar los fondos para esta futura compra, María decide invertir hoy una suma  en una cuenta que ofrece un rendimiento del <strong>${tasaInteres}% anual</strong> compuesto <strong>trimestralmente</strong>.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el valor del servidor después de 1 año de uso.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine después de cuántos años María tendrá que reemplazar el servidor. Redondee su respuesta al año más cercano.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la depreciación total del servidor desde su compra inicial hasta el año estimado de reemplazo (calculado en el inciso b).</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule cuánto capital debería haber invertido María hoy para cubrir el costo total del nuevo servidor al momento del reemplazo.</span>
                    <span class="ib-mark">[2]</span>
                </li>            
            </ol>
            
            <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Valor al año 1:</strong></p>
        <p>Fórmula de depreciación: $V(t) = P(1 - r)^t$.</p>
        <p>$V(1) = ${precioInicial.toLocaleString('en-US')}(1 - ${r_dep}) = ${precioInicial.toLocaleString('en-US')}(${1 - r_dep})$</p>
        <p>$V(1) = $ <strong>$${valorAno1.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>.</p>
        <hr>

        <p><strong>b) Tiempo hasta el reemplazo:</strong></p>
        <p>Queremos encontrar $t$ tal que $V(t) \\approx ${valorRescate.toLocaleString('en-US')}$.</p>
        <p>$$${valorRescate.toLocaleString('en-US')} = ${precioInicial.toLocaleString('en-US')}(${(1 - r_dep).toFixed(2)})^t$$</p>
        <p>$$\\frac{${valorRescate.toLocaleString('en-US')}}{${precioInicial.toLocaleString('en-US')}} = (${(1 - r_dep).toFixed(2)})^t$$</p>
        <p>$$${(valorRescate / precioInicial).toFixed(4)} \\approx (${(1 - r_dep).toFixed(2)})^t$$</p>
        <p>$$t = \\frac{\\ln(${(valorRescate / precioInicial).toFixed(4)})}{\\ln(${(1 - r_dep).toFixed(2)})}$$</p>
        <p>$$t \\approx ${tiempoExacto.toFixed(2)}$$</p>
        <p>Redondeando al entero más cercano: <strong>$t = ${tiempoRedondeado}$ años</strong>.</p>
        <hr>

        <p><strong>c) Depreciación total:</strong></p>
        <p>Valor al año ${tiempoRedondeado}: $V(${tiempoRedondeado}) = ${precioInicial.toLocaleString('en-US')}(${(1 - r_dep).toFixed(2)})^{${tiempoRedondeado}} \\approx $${valorAlReemplazo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}$.</p>
        <p>Depreciación Total = Valor Inicial - Valor Final</p>
        <p>Depreciación Total = $${precioInicial.toLocaleString('en-US')} - ${valorAlReemplazo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}$</p>
        <p>Depreciación Total = <strong>$${depreciacionTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>.</p>
        <hr>
        
        <p><strong>d) Inversión inicial necesaria:</strong></p>
        <p>Usando interés compuesto para obtener $${precioNuevo.toLocaleString('en-US')}$ en ${tiempoRedondeado} años.</p>
        <p>$$PV = \\frac{FV}{(1 + \\frac{r}{n})^{nt}}$$</p>
        <p>$$PV = \\frac{${precioNuevo.toLocaleString('en-US')}}{(1 + \\frac{${tasaInteres}}{100 \\times 4})^{4 \\times ${tiempoRedondeado}}}$$</p>
        <p>$$PV = \\frac{${precioNuevo.toLocaleString('en-US')}}{(1 + ${(r_int / n)})^{${n * t}}}$$</p>
        <p>$$PV = \\frac{${precioNuevo.toLocaleString('en-US')}}{${Math.pow(1 + r_int / n, n * t).toFixed(4)}}$$</p>
        <p>Inversión Inicial = <strong>$${inversionInicial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
