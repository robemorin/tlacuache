import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Prueba t",
    titulo: "Peso de Ovejas y Prueba de Hipótesis",
    tipo: 1, // 1 = Abierto
    puntos: 14
};

export async function generar(i) {
    // --- DATOS DEL PROBLEMA ---
    const n = 100;
    const sumX = 3782;
    const sumX2 = 155341;
    const muHipotesis = 35;
    const alpha = 5; // Nivel de significancia del 5%

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> En una gran población de ovejas, sus pesos se distribuyen normalmente. Se toma una muestra aleatoria de $${n}$ ovejas de la población y el peso de cada oveja se registra como $x$ kg.</p>
            
            <p>Los valores de la muestra se resumen como $\\sum x = ${sumX}$ y $\\sum x^2 = ${sumX2}$.</p>
            
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Con los datos proporcionados, calcule $\\overline{x}$ (la media de la muestra).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule la desviación estándar de la muestra, $s_{x}$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <p>El granjero desea saber si el peso promedio poblacional de las ovejas es estrictamente mayor a $${muHipotesis}$ kg. Para ello, realizará una prueba $t$ de una muestra al nivel de significancia del $${alpha}\\verb|%|$</p>
            
            <ol class="ib-lista" type="a" start="3">
                <li>
                    <span class="ib-texto">Escriba claramente la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$) para esta prueba.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Hallar el valor de:</span>
                    <ol class="ib-lista" type="i">
                        <li>
                            <span class="ib-texto">El estadístico $t$ calculado ($t_{\\text{cal}}$).</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <li>
                            <span class="ib-texto">El valor pago ($p\\text{-valor}$).</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
                <li>
                    <span class="ib-texto">Indique la conclusión de la prueba, justificando claramente su respuesta en base al valor $p$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS RESPUESTA ---
    // a) x_bar = 3782 / 100 = 37.82. 
    // b) s_{n-1}^2 = (1 / 99) * (155341 - 3782^2 / 100) = (1 / 99) * (155341 - 143035.24) = 12305.76 / 99 ≈ 124.3
    //    s_{n-1} = sqrt(124.3006) = 11.149
    // c) H0: mu = 35. H1: mu > 35. 
    // d) i) t = (37.82 - 35) / (11.1490 / sqrt(100)) = 2.82 / 1.1149 = 2.529
    //    ii) p-valor = tcdf(2.529, 9999, 99) approx 0.00647
    // e) 0.00647 < 0.05 => rechazar H0.

    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $\\overline{x} = \\frac{\\sum x}{n} = \\frac{3782}{100} = 37.82$ kg.</li><br>
            <li><strong>b)</strong> $s_{n-1}^2 = \\frac{1}{n-1} (\\sum x^2 - \\frac{(\\sum x)^2}{n}) = \\frac{1}{99} (155341 - \\frac{3782^2}{100}) \\approx 124.30$ <br>
                $s_{n-1} = \\sqrt{124.30} \\approx 11.1$ ($11.149$).</li><br>
            <li><strong>c)</strong> $H_0: \\mu = 35$ <br> $H_1: \\mu > 35$</li><br>
            <li><strong>d) i)</strong> $t_{\\text{cal}} = \\frac{37.82 - 35}{11.149 / \\sqrt{100}} \\approx 2.53$ ($2.529$).</li>
            <li><strong>d) ii)</strong> $p\\text{-valor} \\approx 0.00647$ ($0.647\\%$).</li><br>
            <li><strong>e)</strong> Como el $p\\text{-valor}$ ($0.00647$) es menor al nivel de significancia $\\alpha = 0.05$, se **rechaza $H_0$**. <br>Existe evidencia estadísticamente significativa de que el peso promedio de la población de ovejas es mayor a $35$ kg.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
