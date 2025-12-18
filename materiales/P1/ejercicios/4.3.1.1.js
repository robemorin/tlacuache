import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.1. Diagramas de dispersión",
    titulo: "Relación entre largo y ancho de hojas",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- DATOS (Aproximados de la gráfica) ---
    const xVals = [30, 50, 78, 80, 95, 102, 118, 122, 135, 145];
    const yVals = [25, 30, 37, 50, 35, 41, 52, 48, 58, 62];
    
    // Punto Medio dado
    const mX = 97;
    const mY = 43;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El largo y el ancho de 10 hojas se muestran en el siguiente diagrama de dispersión.</p>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                
                <tlacuache-ejes 
                    size="300, 480" 
                    xlim="0, 170" 
                    ylim="0, 80"
                    dx="10" dy="10"
                    xlabel="Largo (mm)"
                    ylabel="Ancho (mm)">
                    
                    <tlacuache-plot 
                        x="${xVals}" 
                        y="${yVals}" 
                        mark="." 
                        color="black" 
                        size="2">
                    </tlacuache-plot>
                    
                </tlacuache-ejes>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Dibuje el punto $M(${mX}, ${mY})$ que representa el largo medio y el ancho medio en el diagrama.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Dibuje una línea de mejor ajuste adecuada.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Escriba una oración que describa la relación entre el largo y el ancho de la hoja para esta muestra.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Se debe marcar un punto claramente visible en las coordenadas $(97, 43)$.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> La línea de mejor ajuste debe: <br>
            1. Pasar por el punto medio $M(97, 43)$. <br>
            2. Seguir la tendencia de los puntos (tener pendiente positiva y pasar entre los puntos de forma equilibrada).</li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Correlación positiva: <br>
            <em>"A medida que aumenta el largo de la hoja, el ancho también tiende a aumentar."</em> o <em>"Existe una correlación positiva fuerte entre el largo y el ancho."</em></li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}