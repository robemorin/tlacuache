import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.1. Sucesiones aritméticas y sumas parciales",
    titulo: "Ficha: Series y Sucesiones aritméticas",
    tipo: 1,
    puntos: 30 // Aumentado por los nuevos ejercicios
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: NOTACIÓN SIGMA (3 INCISOS)
    // ======================================================
    const sigmas = [];
    for (let k = 0; k < 3; k++) {
        const n = Math.floor(Math.random() * 3) + 4;
        const tipo = k;
        let expr = "", val = 0;
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 4) + 1;

        if (tipo === 0) {
            expr = `${a}k + ${b}`;
            for (let j = 1; j <= n; j++) val += (a * j + b);
        } else if (tipo === 1) {
            expr = `k^2 + ${b}`;
            for (let j = 1; j <= n; j++) val += (j * j + b);
        } else {
            expr = `${a} \\cdot 2^{k-1}`;
            for (let j = 1; j <= n; j++) val += (a * Math.pow(2, j - 1));
        }
        sigmas.push({ n, expr, val });
    }

    const html1 = `
    <h3> ${metadata.titulo}</h3>
        <div class="problema-ib">
            <p><strong>${i}.</strong> Calcule el valor de las siguientes sumas:</p>
            <ol class="ib-lista">
                <table width="100%" style="margin-bottom:10px;">
                    <tr>
                        <td style="text-align:center; padding:10px;">
                             $$ \\sum_{k=1}^{${sigmas[0].n}} (${sigmas[0].expr}) $$
                        </td>
                        <td style="text-align:center; padding:10px;">
                             $$ \\sum_{k=1}^{${sigmas[1].n}} (${sigmas[1].expr}) $$
                        </td>
                        <td style="text-align:center; padding:10px;">
                             $$ \\sum_{k=1}^{${sigmas[2].n}} (${sigmas[2].expr}) $$
                        </td>
                    </tr>
                </table>
            </ol>
            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: TÉRMINO GENERAL (3 INCISOS ARITMÉTICOS)
    // ======================================================
    const seqs2 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 20) + 5;
        let d = Math.floor(Math.random() * 10) - 5;
        if (d === 0) d = 3;
        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);
        const c = u1 - d;
        const sign = c >= 0 ? "+" : "";
        const formula = `u_n = ${d}n ${sign} ${c}`;
        seqs2.push({ terms, formula });
    }

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 1}.</strong> Considere las siguientes sucesiones aritméticas y obtenga el término general $u_n$:</p>
            <ol class="ib-lista">
                <li><span class="ib-texto"> $${seqs2[0].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li><span class="ib-texto"> $${seqs2[1].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li><span class="ib-texto"> $${seqs2[2].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: TÉRMINO ESPECÍFICO (3 INCISOS)
    // ======================================================
    const seqs3 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 50) + 10;
        let d = Math.floor(Math.random() * 8) + 2; // Positivo para que crezca
        if (Math.random() > 0.5) d = -d;

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);

        const targetN = (k + 1) * 20 + Math.floor(Math.random() * 5); // ~20, ~40, ~60
        const result = u1 + (targetN - 1) * d;

        seqs3.push({ terms, targetN, result });
    }

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 2}.</strong> Para las siguientes sucesiones aritméticas, calcule el término indicado:</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto"> $${seqs3[0].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[0].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto"> $${seqs3[1].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[1].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto"> $${seqs3[2].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[2].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 4: SUMA PARCIAL Sn (3 INCISOS)
    // ======================================================
    const seqs4 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 20) + 1;
        let d = Math.floor(Math.random() * 5) + 2;

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);

        const targetN = (k + 1) * 10 + 10; // 20, 30, 40
        // Sn = n/2 * (2u1 + (n-1)d)
        const sum = (targetN / 2) * (2 * u1 + (targetN - 1) * d);

        seqs4.push({ terms, targetN, sum });
    }

    const html4 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 3}.</strong> Calcule la suma de los primeros $n$ términos ($S_n$) para las siguientes sucesiones:</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto"> $${seqs4[0].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[0].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto"> $${seqs4[1].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[1].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto"> $${seqs4[2].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[2].targetN}}$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 5: RAZONAMIENTO (LATAS)
    // ======================================================
    const latasTope = Math.floor(Math.random() * 5) + 3;
    const diferencia = Math.floor(Math.random() * 3) + 1;
    const u10 = latasTope + (10 - 1) * diferencia;
    const s10 = (10 / 2) * (2 * latasTope + (10 - 1) * diferencia);

    const html5 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 4}.</strong> [Aplicación] En un supermercado, se apilan latas de sopa formando una pirámide triangular. La fila superior (fila 1) tiene ${latasTope} latas. Cada fila subsiguiente tiene ${diferencia} latas más que la fila anterior.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una expresión para el número de latas en la fila $n$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el número de latas en la fila 10.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el número <strong>total</strong> de latas si la pila tiene 10 filas.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 6: RAZONAMIENTO (SALARIO)
    // ======================================================
    const salarioBase = (Math.floor(Math.random() * 5) + 15) * 1000; // 15000 a 19000
    const aumento = (Math.floor(Math.random() * 5) + 5) * 100; // 500 a 900

    // u_n = u1 + (n-1)d
    const u10_sal = salarioBase + (10 - 1) * aumento;
    // S_n = n/2 * (2u1 + (n-1)d)
    const s10_sal = (10 / 2) * (2 * salarioBase + (10 - 1) * aumento);

    const html6 = `
        <div class="problema-ib">
            <p><strong>${i + 5}.</strong> [Aplicación] Un empleado comienza a trabajar con un salario anual de $${salarioBase.toLocaleString('en-US')}. Cada año recibe un aumento fijo de \\$${aumento.toLocaleString('en-US')}.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una expresión para el salario en el año $n$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el salario en el año 10.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el monto <strong>total</strong> ganado después de 10 años.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> ${sigmas[0].val}</li>
            <li> ${sigmas[1].val}</li>
            <li> ${sigmas[2].val}</li>
        </ul>
        
        <p><strong>${i + 1}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $${seqs2[0].formula}$</li>
            <li> $${seqs2[1].formula}$</li>
            <li> $${seqs2[2].formula}$</li>
        </ul>

        <p><strong>${i + 2}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $u_{${seqs3[0].targetN}} = ${seqs3[0].result}$</li>
            <li> $u_{${seqs3[1].targetN}} = ${seqs3[1].result}$</li>
            <li> $u_{${seqs3[2].targetN}} = ${seqs3[2].result}$</li>
        </ul>

        <p><strong>${i + 3}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $S_{${seqs4[0].targetN}} = ${seqs4[0].sum}$</li>
            <li> $S_{${seqs4[1].targetN}} = ${seqs4[1].sum}$</li>
            <li> $S_{${seqs4[2].targetN}} = ${seqs4[2].sum}$</li>
        </ul>

        <p><strong>${i + 4}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $u_n = ${diferencia}n + ${latasTope - diferencia}$</li>
            <li> $u_{10} = ${u10}$</li>
            <li> $S_{10} = ${s10}$</li>
        </ul>

        <p><strong>${i + 5}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> $u_n = ${aumento}n + ${salarioBase - aumento}$</li>
            <li> $u_{10} = ${u10_sal.toLocaleString('en-US')}$</li>
            <li> $S_{10} = ${s10_sal.toLocaleString('en-US')}$</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3 + html4 + html5 + html6,
        respuesta: respuestaHTML,
        numPreguntas: 6
    };
}
