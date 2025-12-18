import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Ahorro progresivo (Cumpleaños)",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES ---
    // Valores fijos basados en la imagen (o ligeramente ajustados)
    const depositoInicial = 100; // u1
    const aumento = 25;          // d (diferencia)
    const targetYear = 17;       // n
    
    // Sucesión: 100, 125, 150...
    
    // --- TEXTO DEL PROBLEMA ---
    // Cambiamos nombres: Tío Lucas deposita para su sobrina Sofía.
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> El tío Lucas deposita ${depositoInicial} USD en la cuenta de ahorros de su sobrina Sofía en su primer cumpleaños. En su segundo cumpleaños deposita ${depositoInicial + aumento} USD, ${depositoInicial + (aumento*2)} USD en el tercero, y así sucesivamente.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">¿Cuánto dinero depositará en la cuenta de Sofía en su ${targetYear}º cumpleaños?</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">¿Cuánto dinero en total habrá depositado después del ${targetYear}º cumpleaños de Sofía?</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="25" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // Inciso a: Término general u_n = u1 + (n-1)d
    // u_17 = 100 + (16)(25)
    const n = targetYear;
    const u_n = depositoInicial + ((n - 1) * aumento);

    // Inciso b: Suma de n términos S_n = (n/2)(u1 + un)
    const sumaTotal = (n / 2) * (depositoInicial + u_n);

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>Identificar la progresión:</strong> <br>
                Es una progresión aritmética con $u_1 = ${depositoInicial}$ y $d = ${aumento}$.
            </li>
            <br>
            <li><strong>a)</strong> Calcular el término $u_{${n}}$: <br>
                Usando la fórmula $u_n = u_1 + (n-1)d$: <br>
                $u_{${n}} = ${depositoInicial} + (${n} - 1)(${aumento})$ <br>
                $u_{${n}} = ${depositoInicial} + (16 \\times ${aumento})$ <br>
                $u_{${n}} = ${depositoInicial} + ${16 * aumento} = $ <strong>$${u_n} USD</strong>.
            </li>
            <br>
            <li><strong>b)</strong> Calcular la suma total $S_{${n}}$: <br>
                Usando la fórmula $S_n = \\frac{n}{2}(u_1 + u_n)$: <br>
                $S_{${n}} = \\frac{${n}}{2}(${depositoInicial} + ${u_n})$ <br>
                $S_{${n}} = ${n/2} \\times ${depositoInicial + u_n} = $ <strong>$${sumaTotal} USD</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
        // No requiere postRender
    };
}