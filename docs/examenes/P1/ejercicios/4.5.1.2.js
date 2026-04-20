import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Binomial",
    titulo: "Distribución Binomial - Probabilidades Exactas",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES DEDINÁMICAS ---
    const n = Math.floor(Math.random() * 4) + 5; // Rand num entre 5 y 8
    const p_frac = "1/3";
    const q_frac = "2/3";

    // Función auxiliar GCD
    const mcd = (a, b) => b === 0 ? a : mcd(b, a % b);

    // Cálculos para P(X=2)
    const coeff = (n * (n - 1)) / 2; // nC2
    const num_p2 = Math.pow(2, n - 2);
    const num_resA = coeff * num_p2;
    const den_general = Math.pow(3, n);

    // Simplificar fraccion A
    const divA = mcd(num_resA, den_general);
    const numA_simp = num_resA / divA;
    const denA_simp = den_general / divA;

    // Cálculos para P(X>=1) = 1 - P(X=0)
    const num_p0 = Math.pow(2, n);
    const num_resB = den_general - num_p0; // 3^n - 2^n

    // Simplificar fraccion B
    const divB = mcd(num_resB, den_general);
    const numB_simp = num_resB / divB;
    const denB_simp = den_general / divB;

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> En una escuela se organiza un juego de feria con dados alterados. La probabilidad de ganar un premio en cada jugada es $p = \\frac{1}{3}$.</p>
            <p>Un estudiante decide participar exactamente en $n = ${n}$ juegos de manera independiente. Sea $X$ la variable aleatoria que modela la cantidad de premios que gana el estudiante.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la probabilidad de que el estudiante gane exactamente $2$ premios.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle la probabilidad de que el estudiante gane al menos $1$ premio.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="6" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $P(X = 2) = C_{${n}}^{2} (\\frac{1}{3})^2 (\\frac{2}{3})^{${n - 2}}$<br>
                $= ${coeff} \\times \\frac{1}{9} \\times \\frac{\${num_p2}}{${Math.pow(3, n - 2)}} = \\frac{${num_resA}}{${den_general}} =$ <strong>$\\frac{\${numA_simp}}{\${denA_simp}}$</strong>
            </li>
            <li><strong>b)</strong> $P(X \\ge 1) = 1 - P(X = 0)$<br>
                $P(X = 0) = C_{${n}}^{0} (\\frac{1}{3})^0 (\\frac{2}{3})^{${n}} = 1 \\times 1 \\times \\frac{${num_p0}}{${den_general}} = \\frac{${num_p0}}{${den_general}}$<br>
                $1 - \\frac{\${num_p0}}{${den_general}} =$ <strong>$\\frac{${numB_simp}}{${denB_simp}}$</strong>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
