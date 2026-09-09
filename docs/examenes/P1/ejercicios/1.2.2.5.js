import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y sumas parciales",
    titulo: "Progresión geométrica trigonométrica y suma infinita",
    tipo: 1, // 1 = Abierto
    puntos: 7
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Los tres primeros términos de una progresión geométrica son $\\operatorname{sen} x$, $\\operatorname{sen} 2x$ y $4\\operatorname{sen} x \\cos^2 x$, para $-\\frac{\\pi}{2} < x < \\frac{\\pi}{2}$ y $x \\neq 0$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la razón común, $r$, en función de $x$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el conjunto de valores de $x$ para los cuales la serie geométrica $\\operatorname{sen} x + \\operatorname{sen} 2x + 4\\operatorname{sen} x \\cos^2 x + \\dots$ es convergente.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Considere $x = \\arccos\\left(\\frac{1}{4}\\right)$, con $x > 0$. Muestre que la suma infinita de los términos de esta serie ($S_\\infty$) es igual a $\\frac{\\sqrt{15}}{2}$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) r = sen 2x / sen x = 2 sen x cos x / sen x = 2 cos x
    // (b) Convergencia: |r| < 1 => |2 cos x| < 1 => |cos x| < 1/2
    //     Como cos x > 0 en (-pi/2, pi/2), 0 < cos x < 1/2
    //     arccos(1/2) = pi/3 => pi/3 < |x| < pi/2 (o sea -pi/2 < x < -pi/3  y  pi/3 < x < pi/2)
    // (c) Si cos x = 1/4 (pertenece al intervalo de convergencia porque 1/4 < 1/2):
    //     sen x = sqrt(1 - (1/4)^2) = sqrt(15/16) = sqrt(15)/4
    //     r = 2(1/4) = 1/2
    //     S_inf = u1 / (1 - r) = (sqrt(15)/4) / (1 - 1/2) = (sqrt(15)/4) / (1/2) = sqrt(15)/2

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Razón común ($r$):<br>
                Usando la identidad del ángulo doble $\\operatorname{sen} 2x = 2\\operatorname{sen} x \\cos x$:<br>
                $r = \\frac{\\operatorname{sen} 2x}{\\operatorname{sen} x} = \\frac{2\\operatorname{sen} x \\cos x}{\\operatorname{sen} x} =$ <strong>$2\\cos x$</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Condición de convergencia de una serie geométrica infinita ($|r| < 1$):<br>
                $|2\\cos x| < 1 \\implies |\\cos x| < \\frac{1}{2}$<br>
                Dado que en el intervalo $-\\frac{\\pi}{2} < x < \\frac{\\pi}{2}$ se cumple que $\\cos x > 0$, tenemos:<br>
                $0 < \\cos x < \\frac{1}{2}$<br>
                Como $\\cos\\left(\\frac{\\pi}{3}\\right) = \\frac{1}{2}$ y $\\cos\\left(\\frac{\\pi}{2}\\right) = 0$, el conjunto de valores de $x$ es:<br>
                <strong>$-\\frac{\\pi}{2} < x < -\\frac{\\pi}{3}$</strong> o <strong>$\\frac{\\pi}{3} < x < \\frac{\\pi}{2}$</strong> (es decir, $\\frac{\\pi}{3} < |x| < \\frac{\\pi}{2}$).
            </li>
            <br>
            <li><strong>(c)</strong> Suma al infinito cuando $x = \\arccos\\left(\\frac{1}{4}\\right)$ ($x > 0$):<br>
                • $\\cos x = \\frac{1}{4} \\implies r = 2\\cos x = 2\\left(\\frac{1}{4}\\right) = \\frac{1}{2}$ (convergente, pues $|r| < 1$).<br>
                • Primer término: $u_1 = \\operatorname{sen} x = \\sqrt{1 - \\cos^2 x} = \\sqrt{1 - \\left(\\frac{1}{4}\\right)^2} = \\sqrt{\\frac{15}{16}} = \\frac{\\sqrt{15}}{4}$.<br>
                • Suma infinita ($S_\\infty = \\frac{u_1}{1 - r}$):<br>
                $S_\\infty = \\frac{\\frac{\\sqrt{15}}{4}}{1 - \\frac{1}{2}} = \\frac{\\frac{\\sqrt{15}}{4}}{\\frac{1}{2}} = \\frac{\\sqrt{15}}{4} \\times 2 =$ <strong>$\\frac{\\sqrt{15}}{2}$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
