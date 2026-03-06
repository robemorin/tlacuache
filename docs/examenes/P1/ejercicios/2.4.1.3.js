import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Funciones",
    subtema: "Modelos exponenciales",
    seccion: "Funciones de crecimiento y decaimiento exponencial",
    titulo: "Determinación de parámetros de una función exponencial",
    puntos: 8, // 1 + 2 + 2 + 3
};

export async function generar(i) {
    // Generar valores aleatorios para que el ejercicio varíe
    const k = Math.round(10 + Math.random() * 20) * 10; // k entre 100 y 300 (ej. 200)
    const base = Math.round(1.2 + Math.random() * 0.8 * 10) / 10; // base ejemplo 1.5, 2.0, etc. (evitar enteros simples siempre)
    // O mejor, elegimos puntos enteros para que sea "bonito" de calcular b, o dejamos que usen calc.
    // Vamos a forzar que en t=2 sea un valor entero legible.

    // Mejor enfoque: Definir puntos y calcular b.
    // t=0 -> P = P0
    // t=2 -> P = P2

    const P0 = Math.round((Math.random() * 50) + 50); // 50 to 100
    // b^2 = factor. Let factor be, say, 2.25 (1.5^2), 4 (2^2), 9 (3^2)
    const factors = [2.25, 4, 6.25, 9];
    const factory = factors[Math.floor(Math.random() * factors.length)];
    const b_real = Math.sqrt(factory);

    const t_point = 2;
    const P_point = P0 * factory;

    const targetP = 50000;

    const html = `
        <p><strong>${i}.</strong> El número de bacterias en una colonia, $N$, después de $t$ horas, se modela mediante la función $N(t) = k \\times b^t$, donde $k$ y $b$ son constantes positivas.</p>
        <p>Se sabe que inicialmente ($t=0$) hay ${P0} bacterias.</p>
        <p>Después de ${t_point} horas, la población ha crecido a ${P_point} bacterias.</p>

        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Escribe el valor de $k$.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcula el valor de $b$.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcula el número de bacterias después de 5 horas.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Determina cuántas horas deben transcurrir para que la población supere las ${targetP} bacterias.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    // Soluciones
    const N5 = P0 * Math.pow(b_real, 5);
    // P0 * b^t > 50000 -> b^t > 50000/P0 -> t > log(50000/P0) / log(b)
    const t_final = Math.log(targetP / P0) / Math.log(b_real);

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                Evaluando en $t=0$:<br>
                $N(0) = k \\times b^0 = k$.<br>
                Dado que la población inicial es ${P0}:<br>
                <strong>$k = ${P0}$</strong>
            </li>
            <br>
            <li>
                Usando el punto $(2, ${P_point})$:<br>
                $${P_point} = ${P0} \\times b^2$<br>
                $b^2 = \\frac{${P_point}}{${P0}} = ${factory}$<br>
                $b = \\sqrt{${factory}} = ${b_real}$<br>
                <strong>$b = ${b_real}$</strong>
            </li>
            <br>
            <li>
                Función: $N(t) = ${P0} \\times (${b_real})^t$.<br>
                $N(5) = ${P0} \\times (${b_real})^5$<br>
                $N(5) = ${N5.toFixed(2)}$<br>
                La población es aproximadamente <strong>${Math.round(N5)} bacterias</strong>.
            </li>
            <br>
            <li>
                $${P0} \\times (${b_real})^t > ${targetP}$<br>
                $(${b_real})^t > \\frac{${targetP}}{${P0}}$<br>
                $(${b_real})^t > ${(targetP / P0).toFixed(2)}$<br>
                $t \\ln(${b_real}) > \\ln(${(targetP / P0).toFixed(2)})$<br>
                $t > \\frac{\\ln(${(targetP / P0).toFixed(2)})}{\\ln(${b_real})}$<br>
                $t > ${t_final.toFixed(2)}$<br>
                Se necesitan aproximadamente <strong>${t_final.toFixed(2)} horas</strong>.
            </li>
        </ol>
    `;

    return { html, respuesta };
}
