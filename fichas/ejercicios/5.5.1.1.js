import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.5. Integración",
    seccion: "5.5.1. Regla de la potencia (x^n)",
    titulo: "Ficha: Integración en Contextos Físicos",
    puntos: 28, 
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: CINEMÁTICA
    // ======================================================
    const k1 = Math.floor(Math.random() * 4) + 1;
    const c1 = Math.floor(Math.random() * 10) + 5;
    const s0 = Math.floor(Math.random() * 10);
    const t_final = Math.floor(Math.random() * 3) + 2; 
    const pos_final = Math.pow(t_final, 3) - k1 * Math.pow(t_final, 2) + c1 * t_final + s0;

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> [Cinemática] Una partícula se mueve en línea recta tal que su velocidad, $v$ m s$^{-1}$, en el instante $t$ segundos viene dada por:</p>
            <p style="text-align:center;">$$v(t) = 3t^2 - ${2*k1}t + ${c1}, \\quad t \\geq 0$$</p>
            <p>Se sabe que en el instante $t=0$, la partícula se encuentra en la posición $s = ${s0}$ metros.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine una expresión para el desplazamiento $s(t)$ de la partícula.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la posición de la partícula en el instante $t = ${t_final}$ segundos.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle la aceleración de la partícula en $t=2$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: TRABAJO (MODIFICADO)
    // ======================================================
    const k2 = (Math.floor(Math.random() * 5) + 2) * 3; 
    const coeff_int = (k2 * 2) / 3; 
    const dist2 = 4; // Fijo a 4 metros según solicitud
    const trabajo2 = coeff_int * Math.pow(dist2, 1.5);

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+1}.</strong> [Trabajo Mecánico] Una fuerza variable $F$ actúa sobre un objeto moviéndolo a lo largo del eje $x$. La magnitud de la fuerza en Newtons viene dada por la función $F(x) = ${k2}\\sqrt{x}$, donde $x$ es la distancia en metros desde el origen.</p>
            <p>El trabajo realizado ($W$) se define como la acumulación de la fuerza a lo largo de una distancia.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Deduzca una expresión para el trabajo realizado $W(x)$ en función de la distancia $x$, partiendo desde el origen ($x=0$).</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el trabajo realizado durante los primeros $4$ metros de recorrido.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: FLUIDOS (MODIFICADO)
    // ======================================================
    const k3 = Math.floor(Math.random() * 10) + 10;
    const t_fin3 = Math.floor(Math.random() * 5) + 4; 
    const vol_total3 = (2 * k3 * Math.sqrt(t_fin3)) - (2 * k3 * Math.sqrt(1));

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+2}.</strong> [Dinámica de Fluidos] Un tanque de agua tiene una fuga. La tasa a la que el agua sale del tanque, en litros por minuto, está dada por:</p>
            <p style="text-align:center;">$$R(t) = \\frac{${k3}}{\\sqrt{t}}, \\quad t \\geq 1$$</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Deduzca una expresión que permita calcular el volumen total de agua fugada $V(t)$ en función del tiempo $t$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la cantidad total de agua que se fuga del tanque entre $t=1$ y $t=${t_fin3}$ minutos.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 4: ELECTRICIDAD
    // ======================================================
    const a4 = 3;
    const b4 = 2 * (Math.floor(Math.random() * 3) + 1);
    const t_carga = 4;
    const carga_total = Math.pow(t_carga, 3) + (b4/2) * Math.pow(t_carga, 2);

    const html4 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+3}.</strong> [Electricidad] La corriente eléctrica $I$ (en Amperios) que fluye por un cable en el instante $t$ se define como $I(t) = \\frac{dq}{dt}$, donde $q$ es la carga en Coulombs.</p>
            <p>Se modela la corriente mediante la función $I(t) = ${a4}t^2 + ${b4}t$, para $0 \\leq t \\leq 10$, y se sabe que $q(0) = 0$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine una expresión para la carga $q(t)$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la carga total acumulada después de ${t_carga} segundos.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Explique qué representa el área bajo la curva de la gráfica de $I(t)$ contra $t$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const a_t2 = 6 * 2 - 2 * k1;

    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $s(t) = \\int (3t^2 - ${2*k1}t + ${c1}) dt = t^3 - ${k1}t^2 + ${c1}t + ${s0}$.</li>
            <li> b) $s(${t_final}) = ${pos_final}$ m.</li>
            <li> c) $a(t) = 6t - ${2*k1}$. $a(2) = ${a_t2}$ m s$^{-2}$.</li>
        </ul>

        <p><strong>${i+1}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $W(x) = \\int_{0}^{x} ${k2}u^{1/2} du = [${coeff_int.toFixed(2)} u^{1.5}]_0^x = ${coeff_int.toFixed(2)} x^{1.5}$.</li>
            <li> b) $W(4) = ${coeff_int.toFixed(2)}(4)^{1.5} = ${coeff_int.toFixed(2)}(8) = ${trabajo2.toFixed(2)}$ J.</li>
        </ul>

        <p><strong>${i+2}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $V(t) = \\int R(t) dt = 2(${k3})\\sqrt{t} + C$.</li>
            <li> b) $\\int_{1}^{${t_fin3}} R(t) dt = [2(${k3})\\sqrt{t}]_1^{${t_fin3}} \\approx ${vol_total3.toFixed(2)}$ litros.</li>
        </ul>

        <p><strong>${i+3}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $q(t) = t^3 + ${b4/2}t^2$.</li>
            <li> b) $q(${t_carga}) = ${carga_total}$ C.</li>
            <li> c) Representa la carga eléctrica total acumulada en el intervalo de tiempo.</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3 + html4,
        respuesta: respuestaHTML,
        numPreguntas: 4
    };
}
