import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1. Conceptos básicos de funciones",
    seccion: "2.1.5. Composición de funciones",
    titulo: "Resolución de una ecuación compuesta (Trigonométrica)",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // NO usamos GeoGebra aquí, es puramente algebraico.

    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Dos funciones $f$ y $g$ se definen de la siguiente manera:</p>
            
            $$ f(x) = \\cos x, \\quad 0 \\le x \\le 2\\pi $$
            $$ g(x) = 2x + 1, \\quad x \\in \\mathbb{R} $$
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle una expresión para $(g \\circ f)(x)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Usando su calculadora o de otra forma, resuelva la ecuación $(g \\circ f)(x) = 0$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="27" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Sustituimos $f(x)$ dentro de $g(x)$: <br>
                $(g \\circ f)(x) = g(f(x)) = g(\\cos x)$ <br>
                $(g \\circ f)(x) =$ <strong>$2\\cos x + 1$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Igualamos a cero y despejamos: <br>
                $2\\cos x + 1 = 0 \\Rightarrow \\cos x = -\\frac{1}{2}$ <br>
                El ángulo de referencia es $\\frac{\\pi}{3}$. Como el coseno es negativo, buscamos en el 2º y 3º cuadrante: <br>
                $x_1 = \\pi - \\frac{\\pi}{3} =$ <strong>$\\frac{2\\pi}{3}$</strong> <br>
                $x_2 = \\pi + \\frac{\\pi}{3} =$ <strong>$\\frac{4\\pi}{3}$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
        // No devolvemos postRender porque no usamos scripts externos
    };
}