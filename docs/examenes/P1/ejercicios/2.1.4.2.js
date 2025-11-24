import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1. Conceptos básicos de funciones",
    seccion: "2.1.4. Transformaciones de gráficos",
    titulo: "Función a trozos y traslación",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    // Función original: f(x) = x^2 si x <= 1, f(x) = 2x - 1 si x > 1
    // Traslación: g(x) = f(x - h) + k
    const h = 3; // Desplazamiento a la derecha
    const k = 2; // Desplazamiento hacia arriba
    
    // Punto de quiebre original: x = 1
    // Punto de quiebre nuevo: x = 1 + h
    const nuevoQuiebre = 1 + h;

    // Valor para evaluar en inciso (a)
    const x_eval = 0; // f(0) = 0^2 = 0

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una función $f$ se define por:</p>
            
            $$ f(x) = \\begin{cases} 
            x^2 & \\text{si } x \\le 1 \\\\ 
            2x - 1 & \\text{si } x > 1 
            \\end{cases} $$
            
            <p>La gráfica de la función $g$ se obtiene aplicando una traslación a la gráfica de $f$. Se da que $g(x) = f(x - ${h}) + ${k}$.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle $f(${x_eval})$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">Describa completamente la transformación geométrica que transforma la gráfica de $f$ en la gráfica de $g$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">En los siguientes ejes, bosqueje la gráfica de $y = g(x)$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                <tlacuache-ejes 
                    size="350, 350" 
                    xlim="-1, 9" 
                    ylim="-1, 12"
                    dx="1" dy="1"
                    xlabel="x" ylabel="g(x)">
                    </tlacuache-ejes>
            </div>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Como $x = ${x_eval} \\le 1$, usamos la parte cuadrática: <br>
            $f(${x_eval}) = (${x_eval})^2 =$ <strong>$0$</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> $g(x) = f(x - ${h}) + ${k}$ representa: <br>
            Una <strong>traslación</strong> por el vector $\\binom{${h}}{${k}}$. <br>
            (Desplazamiento horizontal de ${h} unidades a la derecha y vertical de ${k} unidades hacia arriba).</li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Características del bosquejo de $g(x)$: <br>
            - <strong>Vértice:</strong> El vértice original $(0,0)$ se traslada a <strong>$(${h}, ${k})$</strong>. <br>
            - <strong>Punto de quiebre:</strong> El punto original $(1,1)$ se traslada a $(1+${h}, 1+${k}) = $ <strong>$(${nuevoQuiebre}, ${1+k})$</strong>. <br>
            - Forma: Parábola cóncava hacia arriba para $x \\le ${nuevoQuiebre}$ y línea recta con pendiente 2 para $x > ${nuevoQuiebre}$.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}