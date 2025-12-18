import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.3. Modelos cuadráticos",
    seccion: "2.3.3. Intersecciones y raíces",
    titulo: "Solución gráfica de ecuaciones cuadráticas",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    // Función: y = x^2 - 2x - 3
    // Intersección solicitada: y = 5
    
    // Cálculos para el solucionario
    // 1. Intersección: x^2 - 2x - 3 = 5  => x^2 - 2x - 8 = 0
    // Factorización: (x - 4)(x + 2) = 0
    const x1 = -2;
    const x2 = 4;
    
    // 2. Mínimo (Vértice): x = -b / 2a
    // x = -(-2) / 2(1) = 2 / 2 = 1
    const x_min = 1;
    const y_min = Math.pow(x_min, 2) - 2*x_min - 3; // 1 - 2 - 3 = -4

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La gráfica de $y = x^2 - 2x - 3$ se muestra en los siguientes ejes.</p>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                <tlacuache-ejes 
                    size="400, 300" 
                    xlim="-4, 6" 
                    ylim="-10, 25"
                    dx="1" dy="5"
                    xlabel="x" ylabel="y">
                    
                    <tlacuache-plot 
                        f="x**2 - 2*x - 3" 
                        color="black" 
                        lineWidth="2">
                    </tlacuache-plot>
                    
                </tlacuache-ejes>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Dibuje la gráfica de $y = 5$ en los mismos ejes.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <p>Utilice su gráfica para hallar:</p>
                    <ol>
                        <li>
                            <span class="ib-texto">los valores de $x$ cuando $x^2 - 2x - 3 = 5$;</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <li>
                            <span class="ib-texto">el valor de $x$ que da el valor mínimo de $x^2 - 2x - 3$.</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
            </ol>
            
            <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Se debe dibujar una línea horizontal recta que pase por $y=5$.</li>
            
            <li style="margin-top:10px;"><strong>b) (i)</strong> Puntos de intersección entre la parábola y la línea $y=5$: <br>
                Observando la gráfica (o resolviendo $x^2 - 2x - 8 = 0$), los valores son: <br>
                <strong>$x = ${x1}$</strong> y <strong>$x = ${x2}$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b) (ii)</strong> El mínimo es el vértice de la parábola. <br>
                Por simetría entre las raíces ($-1$ y $3$) o usando la fórmula del eje: <br>
                $x = \\frac{-1+3}{2} = 1$. <br>
                Respuesta: <strong>$x = ${x_min}$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}