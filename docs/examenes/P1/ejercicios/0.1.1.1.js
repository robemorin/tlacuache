import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Regla del producto y cálculo tabular",
    titulo: "Regla del producto a partir de una tabla de valores y derivadas",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- DATOS TABULARES ---
    // x = 1: f(1)=2, f'(1)=4, g(1)=9, g'(1)=-3
    // x = 8: f(8)=4, f'(8)=-3, g(8)=2, g'(8)=5

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Los valores de las funciones $f$ y $g$ y de sus respectivas derivadas para $x = 1$ y $x = 8$ se muestran en la siguiente tabla:</p>
            
            <div style="display:flex; justify-content:center; margin: 15px 0;">
                <table style="border-collapse: collapse; text-align: center; width: 80%; max-width: 450px; font-size: 1rem;">
                    <thead>
                        <tr style="background-color: #f2f2f2; border-bottom: 2px solid #333;">
                            <th style="padding: 8px; border: 1px solid #ccc;">$x$</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">$f(x)$</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">$f'(x)$</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">$g(x)$</th>
                            <th style="padding: 8px; border: 1px solid #ccc;">$g'(x)$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">$1$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$2$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$4$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$9$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$-3$</td>
                        </tr>
                        <tr style="background-color: #fafafa;">
                            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">$8$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$4$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$-3$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$2$</td>
                            <td style="padding: 8px; border: 1px solid #ccc;">$5$</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>Sea la función producto $h(x) = f(x) \\cdot g(x)$.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle el valor de $h(1)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle el valor de la derivada $h'(8)$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) h(1) = f(1) * g(1) = 2 * 9 = 18
    // (b) h'(x) = f'(x)g(x) + f(x)g'(x)
    //     h'(8) = f'(8)g(8) + f(8)g'(8) = (-3)(2) + (4)(5) = -6 + 20 = 14

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Cálculo de $h(1)$:<br>
                $h(1) = f(1) \\cdot g(1)$<br>
                Consultando la tabla para $x = 1$: $f(1) = 2$ y $g(1) = 9$.<br>
                $h(1) = 2 \\times 9 =$ <strong>$18$</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Cálculo de $h'(8)$ mediante la regla del producto:<br>
                $h'(x) = f'(x)g(x) + f(x)g'(x)$<br>
                $h'(8) = f'(8)g(8) + f(8)g'(8)$<br>
                <br>
                Consultando la tabla para $x = 8$:<br>
                • $f(8) = 4, \\quad f'(8) = -3$<br>
                • $g(8) = 2, \\quad g'(8) = 5$<br>
                <br>
                Sustituyendo los valores:<br>
                $h'(8) = (-3)(2) + (4)(5) = -6 + 20 =$ <strong>$14$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
