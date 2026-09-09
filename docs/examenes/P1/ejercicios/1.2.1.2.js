import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Distribución de butacas en un teatro",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES ---
    const totalFilas = 20; // n
    const u1 = 15;         // Butacas en la primera fila
    const d = 2;           // Incremento por fila

    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Un teatro tiene ${totalFilas} filas de butacas. En la primera fila hay ${u1} butacas, en la segunda fila hay ${u1 + d} butacas, y cada fila sucesiva tiene dos butacas más que la fila anterior.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">¿Cuántas butacas hay en la ${totalFilas}ª fila?</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">¿Cuántas butacas hay en total en el teatro?</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a) Término general: u_n = u_1 + (n - 1)d
    const u_n = u1 + (totalFilas - 1) * d; // 15 + 19*2 = 53

    // (b) Suma de n términos: S_n = (n / 2) * (u_1 + u_n)
    const sumaTotal = (totalFilas / 2) * (u1 + u_n); // 10 * (15 + 53) = 680

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>Identificar la progresión:</strong><br>
                Es una progresión aritmética con primer término $u_1 = ${u1}$ y diferencia común $d = ${d}$.
            </li>
            <br>
            <li><strong>(a)</strong> Número de butacas en la fila $${totalFilas}$ ($u_{${totalFilas}}$):<br>
                Usando la fórmula del término general $u_n = u_1 + (n-1)d$:<br>
                $u_{${totalFilas}} = ${u1} + (${totalFilas} - 1)(${d})$<br>
                $u_{${totalFilas}} = ${u1} + (19)(${d})$<br>
                $u_{${totalFilas}} = ${u1} + ${19 * d} =$ <strong>${u_n} butacas</strong>.
            </li>
            <br>
            <li><strong>(b)</strong> Total de butacas en el teatro ($S_{${totalFilas}}$):<br>
                Usando la fórmula de la suma $S_n = \\frac{n}{2}(u_1 + u_n)$ o $S_n = \\frac{n}{2}(2u_1 + (n-1)d)$:<br>
                $S_{${totalFilas}} = \\frac{${totalFilas}}{2}(${u1} + ${u_n})$<br>
                $S_{${totalFilas}} = ${totalFilas / 2} \\times (${u1 + u_n}) =$ <strong>${sumaTotal} butacas</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
