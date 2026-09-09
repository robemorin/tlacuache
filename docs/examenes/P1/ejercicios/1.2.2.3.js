import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y sumas parciales",
    titulo: "Términos consecutivos de una progresión geométrica",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Tres términos consecutivos de una progresión geométrica son $x - 3$, $6$ y $x + 2$.</p>
            
            <p>Halle los posibles valores de $x$.</p>
            <span class="ib-mark" style="float: right;">[6]</span>
            <div style="clear: both;"></div>
            
            <tlacuache-renglon n="22" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // Razón r = u2 / u1 = u3 / u2 => 6 / (x - 3) = (x + 2) / 6
    // 36 = (x - 3)(x + 2) = x^2 - x - 6
    // x^2 - x - 42 = 0
    // (x - 7)(x + 6) = 0 => x = 7 o x = -6

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Propiedad de la progresión geométrica:</strong><br>
                La razón común $r$ entre términos consecutivos es constante:<br>
                $r = \\frac{u_2}{u_1} = \\frac{u_3}{u_2}$<br>
                $\\frac{6}{x - 3} = \\frac{x + 2}{6}$
            </li>
            <br>
            <li><strong>Resolución de la ecuación algebraica:</strong><br>
                $6 \\times 6 = (x - 3)(x + 2)$<br>
                $36 = x^2 + 2x - 3x - 6$<br>
                $36 = x^2 - x - 6$<br>
                $x^2 - x - 42 = 0$
            </li>
            <br>
            <li><strong>Factorización de la ecuación cuadrática:</strong><br>
                $(x - 7)(x + 6) = 0$<br>
                $x - 7 = 0 \\implies x = 7$<br>
                $x + 6 = 0 \\implies x = -6$
            </li>
            <br>
            <li><strong>Respuesta final:</strong><br>
                Los posibles valores de $x$ son <strong>$x = 7$</strong> y <strong>$x = -6$</strong>.
                <br><br>
                <em>Comprobación:</em><br>
                • Si $x = 7$: los términos son $4, 6, 9$ (con razón $r = 1.5$).<br>
                • Si $x = -6$: los términos son $-9, 6, -4$ (con razón $r = -\\frac{2}{3}$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
