import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Distribuciones de probabilidad",
    seccion: "Distribución Normal",
    titulo: "Cálculo de Parámetros (Peso de Frutas)",
    puntos: 8,
};

export async function generar(i) {
    const mu = 250;
    const sigma = 15;

    // a) Probabilidades dadas
    const x1 = 230;
    const p1 = tlacu.stat.normalcdf(-1e99, x1, mu, sigma);

    const x2 = 280;
    const p2 = tlacu.stat.normalcdf(x2, 1e99, mu, sigma);

    const html = `
    <div class="ib-texto">
        <p><strong>${i}.</strong> El peso de las naranjas cultivadas en una finca particular sigue una distribución normal con una media $\\mu$ gramos y una desviación estándar $\\sigma$ gramos.</p>
        <p>Se sabe que el $${(p1 * 100).toFixed(2)}\\%$ de las naranjas pesan menos de $${x1}$ gramos, y que el $${(p2 * 100).toFixed(2)}\\%$ pesan más de $${x2}$ gramos.</p>
        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">Escriba dos ecuaciones, en función de $\\mu$ y $\\sigma$, utilizando los valores tipificados de $Z$ correspondientes a las probabilidades dadas.</span>
                <span class="ib-mark">[4]</span>
            </li>
            <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>

            <li>
                <span class="ib-texto">A partir de sus ecuaciones, deduzca el valor de $\\mu$ y el de $\\sigma$.</span>
                <span class="ib-mark">[4]</span>
            </li>
            <tlacuache-renglon n="22" color="gray" alto="25"></tlacuache-renglon>
        </ol>
    </div>
    `;

    // Calculando z1 y z2
    const z1 = tlacu.stat.invNorm(p1, 0, 1);
    const z2 = tlacu.stat.invNorm(1 - p2, 0, 1); // porque es cola derecha

    const respuesta = `
    <div class="ib-texto">
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Para $X < ${x1}$, $P(X < ${x1}) = ${p1.toFixed(4)}$:<br>
                $z_1 = \\text{invNorm}(${p1.toFixed(4)}) \\approx ${z1.toFixed(3)}$<br>
                Ecuación 1: $\\frac{${x1} - \\mu}{\\sigma} = ${z1.toFixed(3)} \\rightarrow ${x1} - \\mu = ${z1.toFixed(3)}\\sigma$<br><br>
                Para $X > ${x2}$, el área a la izquierda es $1 - ${p2.toFixed(4)} = ${(1 - p2).toFixed(4)}$:<br>
                $z_2 = \\text{invNorm}(${(1 - p2).toFixed(4)}) \\approx ${z2.toFixed(3)}$<br>
                Ecuación 2: $\\frac{${x2} - \\mu}{\\sigma} = ${z2.toFixed(3)} \\rightarrow ${x2} - \\mu = ${z2.toFixed(3)}\\sigma$
            </li>
            <li>
                Resolviendo el sistema de ecuaciones:<br>
                $\\mu = ${mu}$<br>
                $\\sigma = ${sigma}$
            </li>
        </ol>
    </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
