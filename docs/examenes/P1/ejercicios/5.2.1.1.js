import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.2. Derivadas",
    seccion: "5.2.1. Reglas de derivación y cinemática",
    titulo: "Cinemática: aceleración y desplazamiento a partir de la velocidad",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES FIJAS ---
    const v0 = 50;
    const accelMag = 10;
    const s0 = 40;

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> La velocidad $v$ (en $\\text{m}\\;\\text{s}^{-1}$) de un cuerpo en movimiento en el tiempo $t$ segundos viene dada por:</p>
            
            $$v(t) = ${v0} - ${accelMag}t$$
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle el valor de su aceleración en $\\text{m}\\;\\text{s}^{-2}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">La velocidad también puede expresarse como $v = \\frac{\\mathrm{d}s}{\\mathrm{d}t}$, siendo $s$ el desplazamiento en metros. Dado que $s = ${s0}$ cuando $t = 0$, halle una expresión de $s$ en función de $t$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="18" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Cálculo de la aceleración ($a = \\frac{\\mathrm{d}v}{\\mathrm{d}t}$):<br>
                $a(t) = \\frac{\\mathrm{d}}{\\mathrm{d}t}(${v0} - ${accelMag}t) = -${accelMag}\\;\\text{m}\\;\\text{s}^{-2}$<br>
                Respuesta: <strong>$-${accelMag}\\;\\text{m}\\;\\text{s}^{-2}$</strong> (o una desaceleración constante de $${accelMag}\\;\\text{m}\\;\\text{s}^{-2}$).
            </li>
            <br>
            <li><strong>(b)</strong> Cálculo del desplazamiento ($s(t) = \\int v(t)\\,\\mathrm{d}t$):<br>
                $s(t) = \\int (${v0} - ${accelMag}t)\\,\\mathrm{d}t$<br>
                $s(t) = ${v0}t - \\frac{${accelMag}}{2}t^2 + C = ${v0}t - ${accelMag/2}t^2 + C$<br>
                <br>
                Usando la condición inicial $s(0) = ${s0}$:<br>
                $${v0}(0) - ${accelMag/2}(0)^2 + C = ${s0} \\implies C = ${s0}$<br>
                <br>
                Respuesta final:<br>
                $s(t) =$ <strong>$${v0}t - ${accelMag/2}t^2 + ${s0}$</strong> (o $40 + 50t - 5t^2$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
