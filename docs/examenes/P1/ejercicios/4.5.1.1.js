import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'


export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.5. Distribuciones de probabilidad",
    seccion: "4.5.1. Distribución Binomial",
    titulo: "Prueba de Polígrafo (Binomial)",
    tipo: 1,
    puntos: 7
};

export async function generar(i) {
    // 1. Generar datos aleatorios
    // n: número de personas (8 a 15)
    const n = Math.floor(Math.random() * 8) + 8;

    // p_fail: probabilidad de fallar dado que dice la verdad (0.15 a 0.25)
    // Usamos valores que den porcentajes enteros o bonitos si es posible, o decimales simples.
    // Generamos un porcentaje entero entre 15% y 25%
    const p_fail_percent = Math.floor(Math.random() * 11) + 15;
    const p_fail = p_fail_percent / 100;
    const p_pass = 1 - p_fail;

    // a) Valor esperado de personas que PASAN la prueba
    // E[X] = n * p_pass
    const expected_pass = n * p_pass;

    // b) Probabilidad de que exactamente k personas FALLEN
    // Elegimos k entre 2 y 5
    const k_fail = Math.floor(Math.random() * 4) + 2;
    // Usamos la nueva librería
    const prob_k_fail = tlacu.stat.binomialpdf(n, p_fail, k_fail);

    // c) Probabilidad de que menos de m personas PASEN
    // Elegimos m tal que sea razonable (cerca de la media o un poco menos)
    // Media es n * p_pass (aprox 0.8n). Elegimos m entre n-3 y n-1
    const m_pass = n - (Math.floor(Math.random() * 3) + 1);

    // P(Pass < m) = P(Pass <= m-1)
    // Usamos la nueva librería
    const prob_less_m_pass = tlacu.stat.binomialcdf(n, p_pass, m_pass - 1);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una prueba de polígrafo se utiliza para determinar si las personas dicen la verdad o no, pero no es completamente precisa. Cuando una persona dice la verdad, tiene una probabilidad del ${p_fail_percent}% de fallar la prueba (falso positivo). Cada resultado de la prueba es independiente de cualquier resultado anterior.</p>
            <p>${n} personas toman la prueba de polígrafo y todas dicen la verdad.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el número esperado de personas que pasarán esta prueba de polígrafo.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="8" color="gray" alto="25"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Calcule la probabilidad de que exactamente ${k_fail} personas fallen esta prueba de polígrafo.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="8" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Determine la probabilidad de que menos de ${m_pass} personas pasen esta prueba de polígrafo.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p>Datos:</p>
        <ul>
            <li>$n = ${n}$</li>
            <li>$P(\\text{Falla}) = ${p_fail}$</li>
            <li>$P(\\text{Pasa}) = 1 - ${p_fail} = ${p_pass}$</li>
        </ul>
        <hr>
        <p><strong>a)</strong> Valor Esperado (Pasan)</p>
        <p>Sea $X$ la variable aleatoria "número de personas que pasan". $X \\sim B(${n}, ${p_pass})$.</p>
        <p>$$E[X] = n \\times p = ${n} \\times ${p_pass} = ${expected_pass.toFixed(2)}$$</p>
        <hr>
        <p><strong>b)</strong> $P(\\text{Exactamente } ${k_fail} \\text{ fallen})$</p>
        <p>Sea $Y$ la variable "número de personas que fallan". $Y \\sim B(${n}, ${p_fail})$.</p>
        <p>$$P(Y=${k_fail}) = \\binom{${n}}{${k_fail}} (${p_fail})^{${k_fail}} (${p_pass})^{${n - k_fail}}$$</p>
        <p>$$P(Y=${k_fail}) \\approx ${prob_k_fail.toFixed(4)}$$</p>
        <hr>
        <p><strong>c)</strong> $P(\\text{Menos de } ${m_pass} \\text{ pasen})$</p>
        <p>Buscamos $P(X < ${m_pass}) = P(X \\le ${m_pass - 1})$.</p>
        <p>Usando la distribución binomial acumulada:</p>
        <p>$$P(X \\le ${m_pass - 1}) \\approx ${prob_less_m_pass.toFixed(4)}$$</p>
    `;

    return { html, respuesta };
}
