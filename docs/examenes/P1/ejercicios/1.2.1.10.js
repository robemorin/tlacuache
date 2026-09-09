import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Suma cuadrática aritmética y conexión con sucesión geométrica",
    tipo: 1, // 1 = Abierto
    puntos: 14
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Considere la progresión aritmética $u_1, u_2, u_3, \\dots$</p>
            <p>La suma de los primeros $n$ términos de esta progresión viene dada por $S_n = n^2 + 4n$.</p>
            
            <ol class="ib-lista">
                <li>
                    <ol>
                        <li><span class="ib-texto">Halle la suma de los primeros cinco términos ($S_5$).</span></li>
                        <li><span class="ib-texto">Sabiendo que $S_6 = 60$, halle el sexto término ($u_6$).</span></li>
                    </ol>
                    <span class="ib-mark">[4]</span>
                </li>
                
                <li>
                    <span class="ib-texto">Halle el valor de $u_1$.</span>
                    <span class="ib-mark">[2]</span>
                </li>

                <li>
                    <span class="ib-texto">A partir de lo anterior o de cualquier otro modo, escriba una expresión para $u_n$ en función de $n$.</span>
                    <span class="ib-mark">[3]</span>
                </li>

                <li>
                    <span class="ib-texto">Considere una progresión geométrica, $v_n$, donde $v_2 = u_1$ y $v_4 = u_6$. Halle los dos posibles valores de la razón común, $r$.</span>
                    <span class="ib-mark">[3]</span>
                </li>

                <li>
                    <span class="ib-texto">Sabiendo que $v_{99} < 0$, calcule el valor de $v_5$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="17" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a)(i) S5 = 5^2 + 4(5) = 25 + 20 = 45
    // (a)(ii) u6 = S6 - S5 = 60 - 45 = 15
    // (b) u1 = S1 = 1^2 + 4(1) = 5
    // (c) un = Sn - S_{n-1} = (n^2 + 4n) - ((n-1)^2 + 4(n-1)) = 2n + 3
    // (d) v2 = v1*r = 5, v4 = v1*r^3 = 15 => r^2 = 15/5 = 3 => r = +-sqrt(3)
    // (e) v99 = v1 * r^98 < 0 => v1 < 0 => r = -sqrt(3) => v5 = 15 * (-sqrt(3)) = -15*sqrt(3)

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong>
                <ol style="list-style-type: lower-roman; padding-left: 20px;">
                    <li>$S_5 = (5)^2 + 4(5) = 25 + 20 =$ <strong>$45$</strong>.</li>
                    <li>$u_6 = S_6 - S_5 = 60 - 45 =$ <strong>$15$</strong>.</li>
                </ol>
            </li>
            <br>
            <li><strong>(b)</strong> Primer término ($u_1$):<br>
                $u_1 = S_1 = (1)^2 + 4(1) =$ <strong>$5$</strong>.
            </li>
            <br>
            <li><strong>(c)</strong> Término general $u_n$:<br>
                • $u_n = S_n - S_{n-1} = (n^2 + 4n) - \\left((n-1)^2 + 4(n-1)\\right) =$ <strong>$2n + 3$</strong>.<br>
                • O bien: $d = \\frac{u_6 - u_1}{5} = \\frac{15 - 5}{5} = 2 \\implies u_n = 5 + (n-1)(2) = 2n + 3$.
            </li>
            <br>
            <li><strong>(d)</strong> Razón común ($r$) de $v_n$:<br>
                $\\frac{v_4}{v_2} = r^2 = \\frac{15}{5} = 3 \\implies$ <strong>$r = \\pm \\sqrt{3}$</strong> (aprox. $\\pm 1.73$).
            </li>
            <br>
            <li><strong>(e)</strong> Cálculo de $v_5$ dado que $v_{99} < 0$:<br>
                $v_{99} = v_1 \\cdot r^{98} < 0 \\implies v_1 < 0 \\implies r = -\\sqrt{3}$.<br>
                $v_5 = v_4 \\cdot r = 15 \\times (-\\sqrt{3}) =$ <strong>$-15\\sqrt{3}$</strong> (o aprox. <strong>$-26.0$</strong>).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
