import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.5. Integración",
    seccion: "5.5.1. Regla de la potencia (x^n)",
    titulo: "Ficha Avanzada: Integración en Física (2h)",
    puntos: 58, 
};

export async function generar(i) {
    // ====================================================== 
    // EJERCICIO 1: GRAVITACIÓN (TRABAJO CON r^-2)
    // F(r) = GMm / r^2. Trabajo W = int F dr.
    // ====================================================== 
    const RadioTierra = 6400; // km (aprox)
    const MasaSatelite = Math.floor(Math.random() * 500) + 1000; // 1000-1500 kg
    // Constante GMm agrupada para simplificar visualmente
    // K = G * M_tierra * m_satelite.
    // G*M_t ~ 4.0e14 m^3/s^2.
    // Usaremos unidades relativas o constantes dadas para no lidiar con notación científica extrema en el enunciado.
    const K_exp = 4 * MasaSatelite; // x 10^14
    
    // Mover de RadioTierra a una órbita geoestacionaria o similar.
    const r_inicial = RadioTierra;
    const r_final = RadioTierra + 20000; // km

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> [Gravitación y Trabajo] La fuerza gravitacional $F$ que actúa sobre un satélite de masa ${MasaSatelite} kg a una distancia $r$ del centro de la Tierra viene dada por:</p>
            <p style="text-align:center;">$$F(r) = \\frac{K}{r^2}$$</p>
            <p>donde $K = ${K_exp} \\times 10^{14} \\text{ N km}^2$ es una constante gravitacional ajustada a las unidades.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Reescriba la expresión de la fuerza utilizando un exponente negativo.</span>
                    <span class="ib-mark">[1]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">El trabajo $W$ necesario para mover el satélite desde un radio $r_a$ a un radio $r_b$ está dado por $W = \\int_{r_a}^{r_b} F(r) \\, dr$. Deduzca una expresión para $W$ en términos de $K, r_a$ y $r_b$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el trabajo realizado para llevar el satélite desde la superficie de la Tierra ($r = ${r_inicial}$ km) hasta una órbita a $r = ${r_final}$ km. Dé su respuesta en notación científica.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine el trabajo necesario para llevar el satélite desde la superficie de la Tierra hasta el "infinito" ($r \\to \\infty$).</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ====================================================== 
    // EJERCICIO 2: CINEMÁTICA AVANZADA (Aceleración Variable)
    // a(t) = k / sqrt(t).
    // ====================================================== 
    const k_acc = Math.floor(Math.random() * 4) + 2; 
    // a(t) = k * t^(-1/2)
    // v(t) = int a dt = 2k t^(1/2) + C1.
    // s(t) = int v dt = 2k (2/3) t^(3/2) + C1t + C2.
    
    // Condiciones iniciales:
    // Parte del reposo => v(0) no está definido si t=0 en denominador, así que a(t) para t>0.
    // Digamos v(1) = V1.
    const V1 = Math.floor(Math.random() * 10) + 5;
    // v(1) = 2k(1) + C1 = V1 => C1 = V1 - 2k.
    const C1 = V1 - 2 * k_acc;
    
    // s(1) = 0.
    // s(1) = (4/3)k(1) + C1(1) + C2 = 0 => C2 = - (4/3)k - C1.
    const C2 = -(4/3)*k_acc - C1;

    // Calcular v(4) y s(4).
    const t_eval = 4;
    const v_4 = 2 * k_acc * Math.sqrt(t_eval) + C1;
    const s_4 = (4/3) * k_acc * Math.pow(t_eval, 1.5) + C1 * t_eval + C2;

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+1}.</strong> [Cinemática Avanzada] Una partícula se mueve a lo largo del eje $x$. Para $t \\geq 1$, su aceleración está dada por $a(t) = \\frac{${k_acc}}{\\sqrt{t}}$ m s$^{-2}$.</p>
            <p>Se sabe que en el instante $t=1$ s, la velocidad de la partícula es $v(1) = ${V1}$ m s$^{-1}$ y su posición es $s(1) = 0$ m.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine la expresión para la velocidad $v(t)$.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine la expresión para el desplazamiento $s(t)$.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la posición de la partícula en $t=4$ s.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ====================================================== 
    // EJERCICIO 3: DENSIDAD LINEAL (Masa y CM)
    // varilla longitud L. Densidad lambda(x) = A + Bx^2.
    // ====================================================== 
    const L = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 metros
    const A_den = Math.floor(Math.random() * 2) + 1;
    const B_den = Math.floor(Math.random() * 3) + 1;
    
    // Masa M = int_0^L (A + Bx^2) dx = [Ax + B/3 x^3]
    const Masa = A_den * L + (B_den/3) * Math.pow(L, 3);
    
    // Momento = int_0^L x(A + Bx^2) dx = int (Ax + Bx^3) dx = [A/2 x^2 + B/4 x^4]
    const Momento = (A_den/2) * Math.pow(L, 2) + (B_den/4) * Math.pow(L, 4);
    
    const CM = Momento / Masa;

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+2}.</strong> [Centro de Masa] Una varilla delgada de metal tiene una longitud de ${L} metros. Su densidad lineal (masa por unidad de longitud) varía a lo largo de la varilla según la función $\\lambda(x) = ${A_den} + ${B_den}x^2$ kg m$^{-1}$, donde $x$ es la distancia desde el extremo izquierdo ($0 \\leq x \\leq ${L}$).</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule la masa total $M$ de la varilla integrando la función de densidad: $M = \\int_0^L \\lambda(x) \\, dx$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">El centro de masa $\\bar{x}$ se calcula mediante la fórmula $\\bar{x} = \\frac{1}{M} \\int_0^L x \\lambda(x) \\, dx$. Halle la posición del centro de masa de la varilla.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Explique por qué el centro de masa está más cerca de un extremo que del otro.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ====================================================== 
    // EJERCICIO 4: HIDROSTÁTICA (Fuerza en Presa)
    // Placa rectangular o triangular. Usemos rectangular para simplificar x^n.
    // F = int rho * g * h * w dh.
    // O mejor: Fuerza sobre fondo de tanque con área variable.
    // Vamos con: Flujo sanguíneo (Ley de Poiseuille derivada).
    // v(r) = C (R^2 - r^2). Flujo Q = int_0^R v(r) * 2pi r dr.
    // ====================================================== 
    const R_tubo = Math.floor(Math.random() * 5) + 2; // cm
    const V_max = Math.floor(Math.random() * 10) + 10; // cm/s
    // v(r) = V_max * (1 - r^2/R^2). En r=0, v=Vmax. En r=R, v=0.
    
    // Q = int_0^R v(r) * 2pi r dr 
    // = 2pi * V_max * int_0^R (r - r^3/R^2) dr
    // = 2pi * V_max * [r^2/2 - r^4/(4R^2)]_0^R
    // = 2pi * V_max * (R^2/2 - R^2/4) = 2pi * V_max * (R^2/4) = pi/2 * V_max * R^2.
    
    const Flujo = (Math.PI / 2) * V_max * R_tubo * R_tubo;

    const html4 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+3}.</strong> [Dinámica de Fluidos] La velocidad $v$ de un fluido que fluye por una tubería circular de radio $R = ${R_tubo}$ cm depende de la distancia $r$ al centro de la tubería según la ley: $v(r) = ${V_max}\\left(1 - \\frac{r^2}{${R_tubo}^2}\\right)$ cm/s.</p>
            <p>El flujo total (caudal) $Q$ se calcula integrando la velocidad sobre el área de la sección transversal mediante anillos concéntricos: $Q = \\int_0^R v(r) \\cdot 2\\pi r \\, dr$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Expanda la expresión dentro de la integral para obtener un polinomio en términos de $r$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el flujo total $Q$ que pasa por la tubería. Deje su respuesta en términos de $\\pi$.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ====================================================== 
    // EJERCICIO 5: TERMODINÁMICA (Capacidad Calorífica)
    // Cp = a + bT + cT^-2.
    // H = int Cp dT.
    // ====================================================== 
    const a_th = 30;
    const b_th = 0.02;
    const c_th = 5; // x 10^5
    
    const T1 = 300; // Kelvin
    const T2 = 500;
    
    // Int (a + bT - cT^-2) dt = aT + b/2 T^2 + cT^-1
    const entalpia = (a_th*T2 + (b_th/2)*T2*T2 + (c_th*100000)/T2) - (a_th*T1 + (b_th/2)*T1*T1 + (c_th*100000)/T1);

    const html5 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+4}.</strong> [Termodinámica] La capacidad calorífica molar de una sustancia varía con la temperatura $T$ (en Kelvin) según la ecuación empírica:</p>
            <p style="text-align:center;">$$C_p(T) = ${a_th} + ${b_th}T - \\frac{${c_th}\\times 10^5}{T^2} \\quad \\text{J mol}^{-1} \\text{K}^{-1}$$</p>
            <p>El cambio en la entalpía $\\Delta H$ al calentar la sustancia de $T_1$ a $T_2$ es $\\Delta H = \\int_{T_1}^{T_2} C_p(T) \\, dT$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine la integral indefinida $\\int C_p(T) \\, dT$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el cambio de entalpía $\\Delta H$ cuando la temperatura aumenta de ${T1} K a ${T2} K.
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ====================================================== 
    // EJERCICIO 6: ELECTROSTÁTICA (Potencial)
    // E = kQ / x^2. V = - int E dx. (Traer carga desde infinito).
    // V(r) = kQ/r.
    // ====================================================== 
    const Q_charge = Math.floor(Math.random()*5)+2; // micro Coulombs
    const dist_elec = Math.floor(Math.random()*5)+5; // cm -> m
    
    const html6 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+5}.</strong> [Electrostática] La magnitud del campo eléctrico $E$ a una distancia $x$ de una carga puntual $Q$ es $E(x) = k \\frac{Q}{x^2}$. El potencial eléctrico $V$ en un punto $r$ se define como el trabajo por unidad de carga realizado contra el campo eléctrico para traer una carga desde el infinito hasta $r$, dado por:</p>
            <p style="text-align:center;">$$V(r) = - \\int_{\\infty}^{r} E(x) \\, dx$$</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Demuestre matemáticamente que $V(r) = k \\frac{Q}{r}$, evaluando la integral impropia.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Si $Q = ${Q_charge} \\mu C$, calcule el potencial a $${dist_elec}$ cm de la carga. (Use $k \\approx 9 \\times 10^9$ N m$^2$ C$^{-2}$).</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const W_orbita = -K_exp * 1e14 * (1/r_final - 1/r_inicial); // 1e14 factor
    // W = K * (1/ra - 1/rb) approx.

    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $F(r) = K r^{-2}$.</li>
            <li> b) $W = \\int_{r_a}^{r_b} K r^{-2} dr = K [-r^{-1}]_{r_a}^{r_b} = K (\\frac{1}{r_a} - \\frac{1}{r_b})$.</li>
            <li> c) $W = ${K_exp} \\times 10^{14} (\\frac{1}{${r_inicial}} - \\frac{1}{${r_final}}) \\approx ${W_orbita.toExponential(2)}$ Joules (unidades ajustadas).</li>
            <li> d) $W_{\\infty} = K/r_a$.</li>
        </ul>

        <p><strong>${i+1}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $v(t) = 2(${k_acc})t^{1/2} + ${C1.toFixed(2)}$.</li>
            <li> b) $s(t) = \\frac{4}{3}(${k_acc})t^{3/2} + ${C1.toFixed(2)}t + ${C2.toFixed(2)}$.</li>
            <li> c) $s(4) = ${s_4.toFixed(2)}$ m.</li>
        </ul>

        <p><strong>${i+2}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $M = ${Masa.toFixed(2)}$ kg.</li>
            <li> b) Momento = ${Momento.toFixed(2)}. $\\bar{x} = ${CM.toFixed(3)}$ m.</li>
            <li> c) Como $\\lambda(x)$ crece con $x^2$, hay más masa concentrada hacia el final ($x=${L}$), moviendo el CM hacia la derecha.</li>
        </ul>

        <p><strong>${i+3}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Integrando $2\\pi V_{max} (r - \\frac{r^3}{R^2})$.</li>
            <li> b) $Q = ${Flujo.toFixed(2)}$ cm$^3$/s ($\\approx ${(0.5 * V_max * R_tubo * R_tubo).toFixed(2)}\\pi$).</li>
        </ul>

        <p><strong>${i+4}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $\\int Cp dT = ${a_th}T + ${b_th/2}T^2 + \\frac{${c_th}\\times 10^5}{T} + C$.</li>
            <li> b) $\\Delta H \\approx ${entalpia.toFixed(2)}$ J/mol.</li>
        </ul>

         <p><strong>${i+5}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $\\int x^{-2} dx = -x^{-1}$. Evaluando $[-1/x]_{\\infty}^{r} = (-1/r) - (-1/\\infty) = -1/r$. <br> Con el menos de afuera y constantes: $V = kQ/r$.</li>
            <li> b) $V = (9\\times 10^9)(${Q_charge}\\times 10^{-6}) / (${dist_elec/100}) = ${(9e9 * Q_charge*1e-6 / (dist_elec/100)).toExponential(2)}$ Volts.</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3 + html4 + html5 + html6,
        respuesta: respuestaHTML,
        numPreguntas: 6
    };
}
