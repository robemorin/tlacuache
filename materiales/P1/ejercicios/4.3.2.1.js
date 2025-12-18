import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.2. Regresión Lineal y Pearson",
    titulo: "Análisis Bivariado (Peso vs Pulso)",
    tipo: 1, // 1 = Abierto
    puntos: 12
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // N = 15 estudiantes
    const N = 15;
    const weights = [];
    const pulses = [];

    // Generar datos con correlación moderada (positiva o negativa?)
    // Generalmente no hay correlación fuerte directa, pero asumamos positiva ligera para el ejercicio
    // Masa: 50 - 90 kg
    // Pulso: 60 - 100 bpm
    // Modelo base: Pulso = 40 + 0.5 * Masa + Ruido

    for (let k = 0; k < N; k++) {
        let w = Math.floor(Math.random() * 41) + 45; // 45 a 85 kg
        let noise = Math.floor(Math.random() * 21) - 10; // -10 a +10
        let p = 60 + 0.4 * (w - 45) + noise;
        // Ajustar rango
        if (p < 50) p = 50;
        if (p > 110) p = 110;
        weights.push(w);
        pulses.push(Math.round(p));
    }

    // Ordenar por peso para la tabla (opcional, ayuda visual)
    // weights.sort((a,b) => a-b); -- No, correlación se pierde si no ordenamos pares.
    // Mejor dejamos pares desordenados.

    // --- CÁLCULOS ESTADÍSTICOS ---
    const sumX = weights.reduce((a, b) => a + b, 0);
    const sumY = pulses.reduce((a, b) => a + b, 0);
    const meanX = sumX / N;
    const meanY = sumY / N;

    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;

    for (let k = 0; k < N; k++) {
        sumXY += weights[k] * pulses[k];
        sumX2 += weights[k] * weights[k];
        sumY2 += pulses[k] * pulses[k];
    }

    const numerator = sumXY - N * meanX * meanY;
    const denX = Math.sqrt(sumX2 - N * meanX ** 2);
    const denY = Math.sqrt(sumY2 - N * meanY ** 2);
    const r = numerator / (denX * denY);

    // Line of Best Fit: y - meanY = (r * Sy/Sx) (x - meanX)
    // Slope b = r * (Sy/Sx) = numerator / (denX^2)
    // Wait, b = Sxy / Sxx = (sumXY - n x y) / (sumX2 - n x^2)
    // Actually numerator is Sxy. denX^2 is Sxx.
    // So slope m = numerator / (sumX2 - N * meanX**2);
    const m = numerator / (sumX2 - N * meanX ** 2);
    const c = meanY - m * meanX; // y = mx + c

    // Estimation for x = 50
    const est_val = m * 50 + c;

    // Reliability: Check interpolation vs extrapolation
    // Min/Max Weight
    const minW = Math.min(...weights);
    const maxW = Math.max(...weights);
    const isInterpolation = (50 >= minW && 50 <= maxW);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Quince estudiantes del Colegio de Bachilleres en Michoacán fueron pesados (en kg) y se midió su frecuencia cardiaca (pulso en bpm) después de una actividad ligera. Los datos se muestran en la siguiente tabla:</p>
            
            <div style="overflow-x:auto;">
            <table border="1" style="border-collapse: collapse; width: 100%; text-align: center; font-size:0.9em;">
                <tr style="background-color: #f0f0f0;">
                    <th style="padding: 5px;">Estudiante</th>
                    ${Array.from({ length: N }, (_, j) => `<td>${j + 1}</td>`).join('')}
                </tr>
                <tr>
                    <th style="padding: 5px;">Masa ($x$ kg)</th>
                    ${weights.map(w => `<td>${w}</td>`).join('')}
                </tr>
                <tr>
                    <th style="padding: 5px;">Pulso ($y$ bpm)</th>
                    ${pulses.map(p => `<td>${p}</td>`).join('')}
                </tr>
            </table>
            </div>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Dibuje un diagrama de dispersión para estos datos en los ejes proporcionados.</span>
                    <span class="ib-mark">[3]</span>
                    
                </li>
                <center>
                        <tlacuache-milimetrado size="${10 * 23}, ${18 * 23}" cuadricula="10,18"  n="5"  stroke = ".7" stroke2 = ".1">
                        </tlacuache-milimetrado>
                    </center>                
                <li>
                    <span class="ib-texto">Escriba el coeficiente de correlación momento-producto de Pearson, $r$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Describa la correlación entre la masa y el pulso.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Dibuje con precisión la línea de mejor ajuste.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <br>
                
                <li>
                    <span class="ib-texto">Use su ecuación de regresión (o gráfica) para estimar el pulso de un estudiante que pesa <strong>50 kg</strong>.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Comente sobre la fiabilidad de su estimación en el inciso (f).</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
            
        </div>
    `;

    // Preparar puntos para tlacuache-plot
    const xData = JSON.stringify(weights);
    const yData = JSON.stringify(pulses);

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Diagrama de Dispersión:</strong></p>
        <p>Ver gráfica abajo. Puntos $(x,y)$ graficados correctamente.</p>
        
        <p><strong>b) Coeficiente $r$:</strong></p>
        <p>Usando calculadora/GDC:</p>
        <p>$$r \\approx ${r.toFixed(4)}$$</p>
        <hr>
        
        <p><strong>c) Descripción:</strong></p>
        <p>Existe una correlación <strong>${Math.abs(r) < 0.3 ? 'muy débil' : (Math.abs(r) < 0.7 ? 'moderada' : 'fuerte')} ${r > 0 ? 'positiva' : 'negativa'}</strong> entre la masa y el pulso.</p>
        <hr>
        
        <p><strong>d) Punto Medio $(\\bar{x}, \\bar{y})$:</strong></p>
        <p>$\\bar{x} = \\frac{\\sum x}{15} = ${meanX.toFixed(2)}$ kg</p>
        <p>$\\bar{y} = \\frac{\\sum y}{15} = ${meanY.toFixed(2)}$ bpm</p>
        <p>Punto medio: <strong>(${meanX.toFixed(2)}, ${meanY.toFixed(2)})</strong>.</p>
        <hr>
        
        <p><strong>e) Línea de ajuste:</strong></p>
        <p>La línea debe pasar por $(\\bar{x}, \\bar{y})$ y seguir la tendencia de los datos.</p>
        <p>Ecuación (ref): $y = ${m.toFixed(2)}x + ${c.toFixed(2)}$</p>
        <div style="display:flex; justify-content:center;">
            <tlacuache-ejes size="300, 250" xlim="40, 90" ylim="40, 120" xlabel="x" ylabel="y">
                <tlacuache-plot x='${xData}' y='${yData}' type="scatter" color="red"></tlacuache-plot>
                <tlacuache-plot x="[40, 90]" y="[${m * 40 + c}, ${m * 90 + c}]" color="blue"></tlacuache-plot>
                <tlacuache-plot x="[${meanX}]" y="[${meanY}]" type="scatter" color="green" size="5"></tlacuache-plot>
            </tlacuache-ejes>
        </div>
        <hr>
        
        <p><strong>f) Estimación para 50 kg:</strong></p>
        <p>Sustituyendo $x=50$:</p>
        <p>$y = ${m.toFixed(2)}(50) + ${c.toFixed(2)} = ${est_val.toFixed(2)}$ bpm.</p>
        <p>Estimación: <strong>${Math.round(est_val)} bpm</strong>.</p>
        <hr>
        
        <p><strong>g) Fiabilidad:</strong></p>
        <p>El valor 50 kg está ${isInterpolation ? 'dentro' : 'fuera'} del rango de datos observados $[${minW}, ${maxW}]$.</p>
        <p>Por lo tanto, es una <strong>${isInterpolation ? 'interpolación y es generalmente fiable' : 'extrapolación y podría no ser fiable'}</strong> (dependiendo también de la fuerza de la correlación).</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
