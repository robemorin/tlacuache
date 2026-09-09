import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Deducción de términos a partir de sumas parciales compuestas",
    tipo: 1, // 1 = Abierto
    puntos: 8
};

export async function generar(i) {
    // --- TEXTO DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Las sumas de los primeros $n$ términos de una progresión siguen el patrón:</p>
            
            $$S_1 = 1 + k, \\quad S_2 = 5 + 3k, \\quad S_3 = 12 + 7k, \\quad S_4 = 22 + 15k, \\quad \\dots$$
            
            <p>donde $k \\in \\mathbb{Z}$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Sabiendo que $u_1 = 1 + k$, halle $u_2$, $u_3$ y $u_4$ en función de $k$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle una expresión general para $u_n$ en función de $n$ y $k$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="24" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS Y ANÁLISIS ---
    // (a) u2 = S2 - S1 = (5 + 3k) - (1 + k) = 4 + 2k
    //     u3 = S3 - S2 = (12 + 7k) - (5 + 3k) = 7 + 4k
    //     u4 = S4 - S3 = (22 + 15k) - (12 + 7k) = 10 + 8k
    //
    // (b) Descomposición de u_n:
    //     Parte constante: 1, 4, 7, 10... es una PA con primer término 1 y diferencia 3: 1 + (n-1)*3 = 3n - 2.
    //     Parte con k: 1k, 2k, 4k, 8k... es una PG con primer término k y razón 2: 2^(n-1)*k.
    //     Por lo tanto: u_n = 3n - 2 + 2^(n-1)*k.

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0; margin:0;">
            <li><strong>(a)</strong> Relación fundamental entre términos y sumas parciales ($u_n = S_n - S_{n-1}$):<br>
                • $u_2 = S_2 - S_1 = (5 + 3k) - (1 + k) =$ <strong>$4 + 2k$</strong><br>
                • $u_3 = S_3 - S_2 = (12 + 7k) - (5 + 3k) =$ <strong>$7 + 4k$</strong><br>
                • $u_4 = S_4 - S_3 = (22 + 15k) - (12 + 7k) =$ <strong>$10 + 8k$</strong>
            </li>
            <br>
            <li><strong>(b)</strong> Expresión general para $u_n$:<br>
                Observamos la estructura de los términos generados:<br>
                $u_1 = 1 + 1k$<br>
                $u_2 = 4 + 2k$<br>
                $u_3 = 7 + 4k$<br>
                $u_4 = 10 + 8k$<br>
                <br>
                Descomponemos cada término en dos componentes independientes:<br>
                1. <em>Componente aritmética (término independiente):</em> $1, 4, 7, 10, \\dots$<br>
                   Es una progresión aritmética con primer término $a = 1$ y diferencia $d = 3$:<br>
                   $\\text{Término}_n = 1 + (n - 1)(3) = 3n - 2$<br>
                <br>
                2. <em>Componente geométrica (coeficiente de $k$):</em> $1, 2, 4, 8, \\dots$<br>
                   Es una progresión geométrica con primer término $1$ y razón $r = 2$:<br>
                   $\\text{Coeficiente}_n = 1 \\cdot (2)^{n - 1} = 2^{n - 1}$<br>
                <br>
                Combinando ambas partes:<br>
                $u_n =$ <strong>$3n - 2 + 2^{n-1}k$</strong> (o $(3n - 2) + k \\cdot 2^{n-1}$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
