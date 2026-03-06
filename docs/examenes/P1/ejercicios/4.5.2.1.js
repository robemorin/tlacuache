import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Distribuciones de probabilidad",
    seccion: "Distribución Normal",
    titulo: "Producción de Lámparas (Normal y Binomial)",
    puntos: 10,
};

export async function generar(i) {
    const mu = 1500;
    const sigma = 120;

    // a) Probabilidad de mayor que un valor
    const x1 = 1650;
    const p1 = tlacu.stat.normalcdf(x1, 1e99, mu, sigma);

    // b) Probabilidad entre dos valores
    const x2 = 1350;
    const x3 = 1600;
    const p2 = tlacu.stat.normalcdf(x2, x3, mu, sigma);

    // c) Inversa (percentil inferior)
    const p3 = 0.08;
    const k = tlacu.stat.invNorm(p3, mu, sigma);

    // d) Binomial combinada con normal
    const n = 8;
    const r = 3;
    // probabilidad de éxito = p1
    const p4 = tlacu.stat.binomialpdf(n, p1, r);

    const html = `
    <div class="ib-texto">
        <p><strong>\${i}.</strong> El tiempo de vida útil de unos focos LED industriales sigue una distribución normal con una media de $\\mu = \${mu}$ horas y una desviación estándar de $\\sigma = \${sigma}$ horas.</p>
        <ol class="ib-lista" type="a">
            <li>Halle la probabilidad de que un foco elegido al azar dure más de $\${x1}$ horas.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de que la vida útil de un foco elegido al azar se encuentre entre $\${x2}$ y $\${x3}$ horas.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>El fabricante ofrece reemplazar gratuitamente los focos que fallen muy rápido. Si deciden aplicar esta garantía únicamente al $\${p3 * 100}\\%$ de los focos con menor duración, halle el tiempo máximo de vida útil, $k$, para que un foco esté cubierto por la garantía.
                <div class="ib-mark">[3]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>Se selecciona una muestra aleatoria de $\${n}$ focos de esta fábrica. Halle la probabilidad de que exactamente $\${r}$ de estos focos duren más de $\${x1}$ horas.
                <div class="ib-mark">[3]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
        </ol>
    </div>
    `;

    const respuesta = `
    <div class="ib-texto">
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                $X \\sim N(\${mu}, \${sigma}^2)$<br>
                $P(X > \${x1}) \\approx \${p1.toFixed(4)}$
            </li>
            <li>
                $P(\${x2} < X < \${x3}) \\approx \${p2.toFixed(4)}$
            </li>
            <li>
                $P(X < k) = \${p3}$<br>
                Utilizando la distribución normal inversa:<br>
                $k \\approx \${k.toFixed(1)}$ horas
            </li>
            <li>
                Sea $Y$ el número de focos que duran más de $\${x1}$ horas en una muestra de $\${n}$.<br>
                $Y \\sim B(\${n}, \${p1.toFixed(4)})$<br>
                $P(Y = \${r}) \\approx \${p4.toFixed(4)}$
            </li>
        </ol>
    </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
