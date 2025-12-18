import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1. Conceptos básicos de funciones",
    seccion: "2.1.4. Transformaciones de gráficos",
    titulo: "Función a trozos y escalamiento",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Función original:
    // f(x) = x + 1 si x <= 2
    // f(x) = -(x-2)^2 + 3 si x > 2

    // Transformación: Estiramiento vertical o horizontal
    // Vamos a usar Estiramiento Vertical: g(x) = A * f(x)
    // A aleatorio entre 2 y 3 (entero para facilitar gráfica)
    const A = Math.floor(Math.random() * 2) + 2; // 2 o 3

    // Punto de quiebre x = 2
    // f(2) (izquierda) = 2 + 1 = 3
    // f(2) (derecha) = -(0)^2 + 3 = 3. Continua en (2, 3).

    const x_break = 2;
    const y_break = 3;

    // Valor para evaluar en inciso (a):
    // Elegimos un valor en la parte cuadrática, ej x=3 o x=4
    const x_eval = 3;
    // f(3) = -(3-2)^2 + 3 = -1 + 3 = 2.
    const f_eval = -((x_eval - 2) ** 2) + 3;
    const g_eval = A * f_eval;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una función $f$ se define por:</p>
            
            $$ f(x) = \\begin{cases} 
            x + 1 & \\text{si } x \\le 2 \\\\ 
            -(x - 2)^2 + 3 & \\text{si } x > 2 
            \\end{cases} $$
            
            <p>La gráfica de la función $g$ se obtiene a partir de la gráfica de $f$. Se da que $g(x) = ${A}f(x)$.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle $g(${x_eval})$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Describa completamente la transformación geométrica que transforma la gráfica de $f$ en la gráfica de $g$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">En los siguientes ejes, bosqueje la gráfica de $y = g(x)$ para el dominio $0 \\le x \\le 5$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                <tlacuache-ejes 
                    size="350, 420" 
                    xlim="-1, 6" 
                    ylim="-5, ${3 * A + 2}"
                    dx="1" dy="1"
                    >
                    <!-- Mostramos la grilla para que el alumno dibuje -->
                </tlacuache-ejes>
            </div>
        </div>
    `;

    // --- RESPUESTA ---
    // Puntos clave para bosquejo de g(x):
    // x=0: f(0)=1 => g(0) = A
    // x=2 (quiebre): f(2)=3 => g(2) = 3A. Pico de la función.
    // x=3: f(3)=2 => g(3) = 2A.
    // x=4: f(4)= -(2)^2+3 = -1 => g(4) = -A.

    // Generar path para la gráfica en la respuesta
    const g_y_break = y_break * A;

    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Primero hallamos $f(${x_eval})$ usando la parte cuadrática ($x > 2$): <br>
            $f(${x_eval}) = -(${x_eval} - 2)^2 + 3 = -1 + 3 = 2$. <br>
            Luego calculamos $g(${x_eval})$: <br>
            $g(${x_eval}) = ${A}f(${x_eval}) = ${A}(2) =$ <strong>${g_eval}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> $g(x) = ${A}f(x)$ representa: <br>
            Un <strong>estiramiento vertical</strong> (o dilatación vertical) con <strong>factor de escala ${A}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Características del bosquejo de $g(x)$: <br>
            - <strong>Parte lineal ($x \\le 2$):</strong> Pasa por $(0, ${A})$ y termina en el pico $(2, ${g_y_break})$. <br>
            - <strong>Parte cuadrática ($x > 2$):</strong> Parábola cóncava hacia abajo desde el pico $(2, ${g_y_break})$, pasando por $(3, ${2 * A})$ y $(4, ${-1 * A})$.
            </li>
        </ul>
        
        <div style="display:flex; justify-content:center; margin-top:10px;">

        </div>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
