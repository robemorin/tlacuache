import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.1. Operaciones numéricas",
    seccion: "1.1.3. Redondeo y estimaciones",
    titulo: "Cálculo, redondeo y notación científica",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    // Definimos los números del problema para poder cambiarlos si quisieras hacerlo dinámico en el futuro
    const a = 3.7;
    const b = 16.2;
    const c = 500;
    
    // 1. Cálculo exacto
    // Operación: 3.7 * (16.2^2) - 500
    const valB_sq = Math.pow(b, 2); // 262.44
    const term1 = a * valB_sq;      // 971.028
    const exacto = term1 - c;       // 471.028

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Calcule $${a} \\times ${b}^2 - ${c}$, escribiendo su respuesta:</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">correcta a dos lugares decimales;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <ol style="list-style-type: lower-roman; padding-left: 20px;">
                        <li style="display:flex; justify-content:space-between;">
                            <span class="ib-texto">correcta a tres cifras significativas;</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <li style="display:flex; justify-content:space-between; margin-top:5px;">
                            <span class="ib-texto">en la forma $a \\times 10^k$, donde $1 \\le a < 10, k \\in \\mathbb{Z}$.</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
            </ol>
            
            <tlacuache-renglon n="10" color="gray" alto="35"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    
    // a) 2 decimales: 471.028 -> 471.03
    const resA = exacto.toFixed(2);

    // b)(i) 3 cifras significativas: 471.028 -> 471
    const resBi = exacto.toPrecision(3);

    // b)(ii) Notación científica del valor exacto o del redondeado? 
    // En IB, usualmente se pide la notación científica de la respuesta EXACTA o la de 3 cifras.
    // 471.028 = 4.71028 x 10^2. Si usamos 3 cifras: 4.71 x 10^2.
    // Mostraremos la versión de 3 cifras que es la más común para consistencia con (b)(i).
    const mantisa = (exacto / 100).toPrecision(3); // 4.71
    const exponente = 2;

    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>Cálculo Previo:</strong><br>
                $${a} \\times ${b}^2 - ${c} = ${a} \\times ${valB_sq.toFixed(2)} - ${c}$ <br>
                $= ${term1.toFixed(3)} - ${c} = $ <strong>$${exacto.toFixed(3)}$</strong> (Valor Exacto).
            </li>
            <br>
            <li><strong>a)</strong> Redondeo a 2 lugares decimales (d.p.): <br>
                El tercer decimal es 8, por lo que sumamos 1 al anterior. <br>
                Respuesta = <strong>$${resA}$</strong>.
            </li>
            <li><strong>b) (i)</strong> Redondeo a 3 cifras significativas (c.s.): <br>
                Las tres primeras cifras son 4, 7, 1. El siguiente dígito es 0. <br>
                Respuesta = <strong>$${resBi}$</strong>.
            </li>
            <br>
            <li><strong>b) (ii)</strong> Notación científica ($a \\times 10^k$): <br>
                Basado en el valor de (b)(i) o el exacto: <br>
                $471.028 = 4.71028 \\times 10^2$ <br>
                Respuesta aceptada (a 3 c.s.): <strong>$${mantisa} \\times 10^${exponente}$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
        // Sin postRender
    };
}