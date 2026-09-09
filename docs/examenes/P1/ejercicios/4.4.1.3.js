import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.1. Espacio muestral y sucesos",
    titulo: "Distribución de probabilidad discreta y progresión aritmética",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const u1 = 0.6;
    const u4 = 0.15;
    
    // d = (u4 - u1) / 3 = (0.15 - 0.6) / 3 = -0.45 / 3 = -0.15
    const d = (u4 - u1) / 3;
    const u2 = u1 + d;       // 0.45
    const u3 = u1 + 2 * d;   // 0.30
    
    // Suma u1 + u2 + u3 + u4 = 0.6 + 0.45 + 0.30 + 0.15 = 1.50
    // Suma P(X=n) = 1 => 1.50 / k = 1 => k = 1.50
    const sumaU = u1 + u2 + u3 + u4;
    const k = sumaU;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Considere una progresión aritmética donde $u_1 = ${u1}$ y $u_4 = ${u4}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la diferencia común ($d$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>

            <p>En la siguiente tabla se muestra la distribución de probabilidad de una variable aleatoria discreta $X$ para la que se cumple que $P(X = n) = \\frac{u_n}{k}$, donde $n \\in \\mathbb{Z}^+$, $1 \\le n \\le 4$ y $k \\in \\mathbb{R}^+$.</p>
            
            <table class="ib-tabla" style="margin: 15px auto; text-align: center; border-collapse: collapse; width: 60%;">
                <thead>
                    <tr style="border-bottom: 2px solid #333;">
                        <th style="padding: 8px; border: 1px solid #ccc; background-color: #f8f9fa;">$n$</th>
                        <th style="padding: 8px; border: 1px solid #ccc;">$1$</th>
                        <th style="padding: 8px; border: 1px solid #ccc;">$2$</th>
                        <th style="padding: 8px; border: 1px solid #ccc;">$3$</th>
                        <th style="padding: 8px; border: 1px solid #ccc;">$4$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold; background-color: #f8f9fa;">$P(X = n)$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$\\frac{${u1}}{k}$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$\\frac{u_2}{k}$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$\\frac{u_3}{k}$</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">$\\frac{${u4}}{k}$</td>
                    </tr>
                </tbody>
            </table>

            <ol class="ib-lista" start="2">
                <li>
                    <span class="ib-texto">Halle el valor de $k$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Cálculo de la diferencia común ($d$):<br>
                Usando la fórmula del término general $u_n = u_1 + (n-1)d$:<br>
                $u_4 = u_1 + 3d$<br>
                $${u4} = ${u1} + 3d$<br>
                $3d = ${u4} - ${u1} = ${(u4 - u1).toFixed(2)}$<br>
                $d = \\frac{${(u4 - u1).toFixed(2)}}{3} =$ <strong>${d.toFixed(2)}</strong> (o $-\\frac{3}{20}$).
            </li>
            <br>
            <li><strong>(b)</strong> Cálculo de los términos intermedios y del valor de $k$:<br>
                Calculamos los términos restantes de la progresión:<br>
                $u_2 = u_1 + d = ${u1} + (${d.toFixed(2)}) = ${u2.toFixed(2)}$<br>
                $u_3 = u_2 + d = ${u2.toFixed(2)} + (${d.toFixed(2)}) = ${u3.toFixed(2)}$<br>
                <br>
                Como la suma de todas las probabilidades en una distribución debe ser igual a 1:<br>
                $\\sum_{n=1}^{4} P(X = n) = 1$<br>
                $\\frac{u_1}{k} + \\frac{u_2}{k} + \\frac{u_3}{k} + \\frac{u_4}{k} = 1$<br>
                $\\frac{${u1} + ${u2.toFixed(2)} + ${u3.toFixed(2)} + ${u4}}{k} = 1$<br>
                $\\frac{${sumaU.toFixed(2)}}{k} = 1 \\implies k =$ <strong>${k.toFixed(2)}</strong> (o $\\frac{3}{2}$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
