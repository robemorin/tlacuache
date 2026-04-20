import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Distribuciones de probabilidad",
    seccion: "Distribución Normal",
    titulo: "Distribución Normal Inversa (Calificaciones)",
    puntos: 7,
};

export async function generar(i) {
    const mu = 72;
    const sigma = 8;
    const pctTop = 15;
    const pTop = pctTop / 100;

    // a) Inversa cola derecha (mejores calificaciones)
    const k1 = tlacu.stat.invNorm(1 - pTop, mu, sigma);

    // b) Inversa cola izquierda (reprobados)
    const pctBot = 5;
    const pBot = pctBot / 100;
    const k2 = tlacu.stat.invNorm(pBot, mu, sigma);

    // c) Probabilidad simple (entre dos valores)
    const x1 = 60;
    const x2 = 80;
    const pMiddle = tlacu.stat.normalcdf(x1, x2, mu, sigma);

    const html = `
    <div class="ib-texto">
        <p><strong>${i}.</strong> Las calificaciones de un examen estandarizado de matemáticas se distribuyen de forma normal con una media de $\\mu = ${mu}$ puntos y una desviación estándar de $\\sigma = ${sigma}$ puntos.</p>
        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">La universidad concede una beca de excelencia al $${pctTop}$% de los estudiantes con las calificaciones más altas. Calcule la calificación mínima necesaria para obtener dicha beca.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="8" color="gray" alto="25"></tlacuache-renglon>

            <li>
                <span class="ib-texto">El $${pctBot}$% de los estudiantes con peores resultados deben repetir el curso. Halle la calificación máxima de un estudiante que debe repetir el curso.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Halle la probabilidad de que un estudiante elegido al azar haya obtenido una calificación entre $${x1}$ y $${x2}$ puntos.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>
        </ol>
    </div>
    `;

    const respuesta = `
    <div class="ib-texto">
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                $X \\sim N(${mu}, ${sigma}^2)$<br>
                Sea $k_1$ la calificación mínima requerida. $P(X > k_1) = ${pTop}$<br>
                $P(X < k_1) = ${1 - pTop}$<br>
                $k_1 = \\text{invNorm}(${1 - pTop}, ${mu}, ${sigma}) \\approx ${k1.toFixed(2)}$ puntos
            </li>
            <li>
                Sea $k_2$ la calificación máxima. $P(X < k_2) = ${pBot}$<br>
                $k_2 = \\text{invNorm}(${pBot}, ${mu}, ${sigma}) \\approx ${k2.toFixed(2)}$ puntos
            </li>
            <li>
                $P(${x1} < X < ${x2}) \\approx ${pMiddle.toFixed(4)}$
            </li>
        </ol>
    </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
