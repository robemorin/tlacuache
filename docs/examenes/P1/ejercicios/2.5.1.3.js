import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.5. Modelos sinusoidales",
    seccion: "2.5.1. Aplicaciones de funciones seno y coseno",
    titulo: "Composición de Funciones Trigonométricas",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> Considere las funciones $f$ y $g$, definidas por:</p>
            
            <div style="text-align: center; margin: 15px 0;">
                $f(x) = \\cos x, \\quad 0 \\le x \\le 2\\pi$ <br>
                $g(x) = 2x + 1, \\quad x \\in \\mathbb{R}$
            </div>

            <p>Resuelva la ecuación $(g \\circ f)(x) = 0$.</p>
            <span class="ib-mark">[4]</span>

            <tlacuache-renglon n="12" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>Solución:</strong></li>
            <li>$(g \\circ f)(x) = g(f(x)) = g(\\cos x)$</li>
            <li>$2\\cos x + 1 = 0$</li>
            <li>$\\cos x = -\\frac{1}{2}$</li>
            <li>Para $0 \\le x \\le 2\\pi$:</li>
            <li>$x = \\frac{2\\pi}{3}, \\quad x = \\frac{4\\pi}{3}$</li>
            <br>
            <li><em>Ruta del PDF: Mathematical_methods_SL/1999 May Examination Session/Mathematical_methods_paper_1_SL.pdf (Pregunta 19)</em></li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
