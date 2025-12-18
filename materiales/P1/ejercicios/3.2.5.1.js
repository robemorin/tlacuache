import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.5. Ángulos de elevación y depresión",
    titulo: "Ángulo de elevación (Acantilado y Barco)",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES ---
    const altura = 450; // Metros
    const anguloGrados = 23;
    
    // Cálculo de la distancia x para el solucionario
    // tan(theta) = opuesto / adyacente => tan(23) = 450 / x
    const anguloRad = anguloGrados * (Math.PI / 180);
    const distanciaX = altura / Math.tan(anguloRad); // aprox 1060.13

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La altura de un acantilado vertical es de $${altura}$ m. El ángulo de elevación desde un barco hasta la cima del acantilado es de $${anguloGrados}^\\circ$. El barco está a $x$ metros de la base del acantilado.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Dibuje un diagrama para mostrar esta información.</span>
                    <span class="ib-mark">[2]</span><div style="height:200px"></div>
                </li>
                <li>
                    <span class="ib-texto">Calcule el valor de $x$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA (SOLUCIONARIO) ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> El diagrama debe mostrar un triángulo rectángulo con:<br>
                - Una altura vertical etiquetada como $${altura}$ m.<br>
                - Una distancia horizontal etiquetada como $x$.<br>
                - El ángulo de elevación de $${anguloGrados}^\\circ$ correctamente ubicado en la base (desde el barco).
            </li>
            <li style="margin-top:10px;"><strong>b)</strong> Cálculo: <br>
                $\\tan(${anguloGrados}^\\circ) = \\frac{\\text{Opuesto}}{\\text{Adyacente}} = \\frac{${altura}}{x}$ <br>
                $x = \\frac{${altura}}{\\tan(${anguloGrados}^\\circ)}$ <br>
                $x \\approx $ <strong>$${distanciaX.toFixed(2)}$ m</strong> (a 3 c.s. $${distanciaX.toPrecision(3)}$ m).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
        // No devolvemos postRender porque no hay gráficos
    };
}