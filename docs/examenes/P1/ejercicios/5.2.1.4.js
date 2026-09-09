import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y recta tangente",
    titulo: "Recta tangente y regla de la cadena para funciones compuestas",
    tipo: 1, // 1 = Abierto
    puntos: 7
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const m_tangente = 6;
    const b_tangente = -1;
    const x0 = 4;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La función $f$ está definida para todo $x \\in \\mathbb{R}$. La recta que tiene por ecuación $y = ${m_tangente}x - 1$ es la tangente al gráfico de $f$ en $x = ${x0}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba el valor de $f'(${x0})$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle $f(${x0})$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
            </ol>

            <p>La función $g$ está definida para todo $x \\in \\mathbb{R}$, donde $g(x) = x^2 - 3x$ y $h(x) = (f \\circ g)(x) = f(g(x))$.</p>

            <ol class="ib-lista" start="3">
                <li>
                    <span class="ib-texto">Halle $h(${x0})$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">A partir de lo anterior, halle la ecuación de la recta tangente al gráfico de $h$ en $x = ${x0}$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="22" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) f'(4) = pendiente = 6
    // (b) f(4) = y(4) = 6(4) - 1 = 23
    // (c) g(4) = 4^2 - 3(4) = 16 - 12 = 4
    //     h(4) = f(g(4)) = f(4) = 23
    // (d) h'(x) = f'(g(x)) * g'(x)
    //     g'(x) = 2x - 3 => g'(4) = 2(4) - 3 = 5
    //     h'(4) = f'(g(4)) * g'(4) = f'(4) * 5 = 6 * 5 = 30
    //     Punto: (4, 23), Pendiente m_h = 30
    //     y - 23 = 30(x - 4) => y = 30x - 120 + 23 = 30x - 97

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Valor de $f'(${x0})$:<br>
                La pendiente de la recta tangente $y = 6x - 1$ es $m = 6$, por lo tanto:<br>
                $f'(${x0}) =$ <strong>$6$</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Valor de $f(${x0})$:<br>
                Como el punto de tangencia pertenece a la recta tangente:<br>
                $f(${x0}) = 6(${x0}) - 1 = 24 - 1 =$ <strong>$23$</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Valor de $h(${x0})$:<br>
                Calculamos primero $g(${x0})$:<br>
                $g(${x0}) = (${x0})^2 - 3(${x0}) = 16 - 12 = 4$<br>
                Entonces:<br>
                $h(${x0}) = f(g(${x0})) = f(4) =$ <strong>$23$</strong>.
            </li>
            <br>
            <li><strong>(d)</strong> Recta tangente a $h(x)$ en $x = ${x0}$:<br>
                • Por la regla de la cadena: $h'(x) = f'(g(x)) \\cdot g'(x)$<br>
                • Derivada de $g(x)$: $g'(x) = 2x - 3 \\implies g'(${x0}) = 2(${x0}) - 3 = 5$<br>
                • Pendiente de la tangente a $h$:<br>
                  $h'(${x0}) = f'(g(${x0})) \\cdot g'(${x0}) = f'(4) \\cdot 5 = 6 \\times 5 = 30$<br>
                • Ecuación de la recta tangente en el punto $(${x0}, 23)$ con pendiente $m = 30$:<br>
                  $y - 23 = 30(x - 4)$<br>
                  $y - 23 = 30x - 120$<br>
                  $y =$ <strong>$30x - 97$</strong> (o $30x - y - 97 = 0$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
