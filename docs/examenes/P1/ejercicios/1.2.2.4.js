import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y sumas parciales",
    titulo: "Progresión geométrica infinita y suma finita",
    tipo: 1, // 1 = Abierto
    puntos: 16
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Los tres primeros términos de una progresión geométrica infinita son $m - 1$, $6$, $m + 4$, donde $m \\in \\mathbb{Z}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman;">
                        <li><span class="ib-texto">Escriba una expresión para la razón común, $r$, en función de $m$.</span></li>
                        <li><span class="ib-texto">A partir de lo anterior, compruebe que $m$ satisface la ecuación $m^2 + 3m - 40 = 0$.</span></li>
                    </ol>
                    <span class="ib-mark">[4]</span>
                </li>
                
                <li>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman;">
                        <li><span class="ib-texto">Halle los dos posibles valores de $m$.</span></li>
                        <li><span class="ib-texto">Halle los posibles valores de $r$.</span></li>
                    </ol>
                    <span class="ib-mark">[6]</span>
                </li>

                <li>
                    <span class="ib-texto">La progresión tiene una suma al infinito finita ($S_\\infty$).</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman;">
                        <li><span class="ib-texto">Indique cuál es el valor de $r$ que conduce a esta suma finita y justifique su respuesta.</span></li>
                        <li><span class="ib-texto">Calcule la suma infinita de los términos de la progresión ($S_\\infty$).</span></li>
                    </ol>
                    <span class="ib-mark">[6]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="25" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a)(i) r = 6 / (m - 1)  o  r = (m + 4) / 6
    // (a)(ii) 6/(m-1) = (m+4)/6 => 36 = (m-1)(m+4) = m^2 + 3m - 4 => m^2 + 3m - 40 = 0
    // (b)(i) (m + 8)(m - 5) = 0 => m = 5 o m = -8
    // (b)(ii) Si m = 5: r = 6/(5-1) = 6/4 = 1.5 (o 3/2)
    //         Si m = -8: r = 6/(-8-1) = 6/(-9) = -2/3
    // (c)(i) Para que converja: |r| < 1 => r = -2/3 (ya que |-2/3| = 2/3 < 1, mientras que |1.5| > 1).
    // (c)(ii) Para m = -8: u1 = -8 - 1 = -9.
    //         S_inf = u1 / (1 - r) = -9 / (1 - (-2/3)) = -9 / (5/3) = -27/5 = -5.4

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong>
                <ol style="list-style-type: lower-roman; padding-left: 20px;">
                    <li>Razón común: $r = \\frac{6}{m - 1}$ (o $r = \\frac{m + 4}{6}$).</li>
                    <li>Igualando las razones:<br>
                        $\\frac{6}{m - 1} = \\frac{m + 4}{6}$<br>
                        $36 = (m - 1)(m + 4)$<br>
                        $36 = m^2 + 4m - m - 4$<br>
                        $36 = m^2 + 3m - 4$<br>
                        $m^2 + 3m - 40 = 0$
                    </li>
                </ol>
            </li>
            <br>
            <li><strong>(b)</strong>
                <ol style="list-style-type: lower-roman; padding-left: 20px;">
                    <li>Factorizando $(m + 8)(m - 5) = 0$:<br>
                        <strong>$m = 5$</strong> o <strong>$m = -8$</strong>.
                    </li>
                    <li>Sustituyendo los valores de $m$ en $r = \\frac{6}{m-1}$:<br>
                        • Si $m = 5 \\implies r = \\frac{6}{5-1} = \\frac{6}{4} =$ <strong>$\\frac{3}{2}$</strong> ($1.5$).<br>
                        • Si $m = -8 \\implies r = \\frac{6}{-8-1} = \\frac{6}{-9} =$ <strong>$-\\frac{2}{3}$</strong>.
                    </li>
                </ol>
            </li>
            <br>
            <li><strong>(c)</strong>
                <ol style="list-style-type: lower-roman; padding-left: 20px;">
                    <li>Condición de convergencia para una serie geométrica infinita: $|r| < 1$.<br>
                        Por tanto, el valor correcto es <strong>$r = -\\frac{2}{3}$</strong>, ya que $\\left|-\\frac{2}{3}\\right| = \\frac{2}{3} < 1$ (mientras que $|1.5| > 1$, la cual diverge).
                    </li>
                    <li>Primer término correspondiente ($m = -8$):<br>
                        $u_1 = m - 1 = -8 - 1 = -9$.<br>
                        Suma al infinito ($S_\\infty = \\frac{u_1}{1 - r}$):<br>
                        $S_\\infty = \\frac{-9}{1 - \\left(-\\frac{2}{3}\\right)} = \\frac{-9}{1 + \\frac{2}{3}} = \\frac{-9}{\\frac{5}{3}} = -9 \\times \\frac{3}{5} =$ <strong>$-\\frac{27}{5}$</strong> (o <strong>$-5.4$</strong>).
                    </li>
                </ol>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
