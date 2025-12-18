import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y series",
    titulo: "Ficha: Sucesiones Geométricas",
    tipo: 1,
    puntos: 30
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: NOTACIÓN SIGMA (GEOMÉTRICA)
    // ======================================================
    const sigmas = [];
    for (let k = 0; k < 3; k++) {
        const n = Math.floor(Math.random() * 3) + 4; // 4, 5, 6
        let a = Math.floor(Math.random() * 5) + 2;
        let r = Math.floor(Math.random() * 2) + 2; // 2 or 3
        if (k === 2) r = 0.5; // One fractional case

        let expr = "";
        let val = 0;

        if (r === 0.5) {
            a = Math.pow(2, n + 1); // Ensure integers mostly
            expr = `${a} \\cdot (0.5)^{k-1}`;
        } else {
            expr = `${a} \\cdot ${r}^{k-1}`;
        }

        for (let j = 1; j <= n; j++) {
            val += a * Math.pow(r, j - 1);
        }

        // Format value if decimal
        if (!Number.isInteger(val)) val = val.toFixed(4).replace(/\.?0+$/, "");

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
    // EJERCICIO 2: TÉRMINO GENERAL (GEOMÉTRICO)
    // ======================================================
    const seqs2 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 10) + 2;
        let r = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
        if (k === 2) { // Decreasing
            u1 = 1000;
            r = 0.5;
        }

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 * Math.pow(r, j));

        const formula = `u_n = ${u1} \\cdot (${r})^{n-1}`;
        seqs2.push({ terms, formula });
    }

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 1}.</strong> Considere las siguientes sucesiones geométricas y obtenga el término general $u_n$:</p>
            <ol class="ib-lista">
                <li><span class="ib-texto"> $${seqs2[0].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li><span class="ib-texto"> $${seqs2[1].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li><span class="ib-texto"> $${seqs2[2].terms.join(", \\; ")}, \\; ...$</span><span class="ib-mark">[2]</span></li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: TÉRMINO ESPECÍFICO (GEOMÉTRICO)
    // ======================================================
    const seqs3 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 5) + 1;
        let r = Math.floor(Math.random() * 2) + 2; // 2 or 3

        const terms = [];
        for (let j = 0; j < 3; j++) terms.push(u1 * Math.pow(r, j));

        const targetN = Math.floor(Math.random() * 4) + 7; // 7 to 10
        const result = u1 * Math.pow(r, targetN - 1);

        seqs3.push({ terms, targetN, result });
    }

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 2}.</strong> Para las siguientes sucesiones geométricas, calcule el término indicado:</p>
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
    // EJERCICIO 4: SUMA PARCIAL Sn (GEOMÉTRICA)
    // ======================================================
    const seqs4 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 5) + 1;
        let r = Math.floor(Math.random() * 2) + 2;

        const terms = [];
        for (let j = 0; j < 3; j++) terms.push(u1 * Math.pow(r, j));

        const targetN = Math.floor(Math.random() * 3) + 6; // 6 to 8
        // Sn = u1(r^n - 1) / (r - 1)
        const sum = u1 * (Math.pow(r, targetN) - 1) / (r - 1);

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
    // EJERCICIO 5: RAZONAMIENTO (CRECIMIENTO POBLACIONAL)
    // ======================================================
    const pobInicial = (Math.floor(Math.random() * 5) + 1) * 100; // 100, 200...
    const tasaCrecimiento = Math.floor(Math.random() * 20) + 10; // 10% to 30%
    const r_pob = 1 + tasaCrecimiento / 100;

    // u_n = u1 * r^(n-1) (Year 1 is initial)
    // Let's say Year 0 is initial, so Year n is u_n = P0 * r^n? 
    // IB usually uses u1, u2. Let's say Year 1 = P0. Year 2 = P0 * r.
    // So u_n = P0 * r^(n-1).
    // Let's phrase it as "Initial population is X. Find population after 5 years (Year 6)".

    const u6_pob = Math.round(pobInicial * Math.pow(r_pob, 5)); // After 5 years = Year 6

    const html5 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i + 4}.</strong> [Aplicación] Una colonia comienza con ${pobInicial} bacterias. La población aumenta un ${tasaCrecimiento}% cada hora.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una expresión para la población en la hora $n$ (donde $n=1$ es el inicio).</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la población después de 5 horas (en $n=6$).</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">¿En qué hora la población superará los ${pobInicial * 10} individuos?</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // Solve for n: u_n > 10 * u1 => u1 * r^(n-1) > 10 * u1 => r^(n-1) > 10
    // (n-1) log r > 1 => n-1 > 1/log(r) => n > 1/log(r) + 1
    const n_supera = Math.ceil(1 / Math.log10(r_pob) + 1);


    // ======================================================
    // EJERCICIO 6: RAZONAMIENTO (DEPRECIACIÓN)
    // ======================================================
    const valorAuto = (Math.floor(Math.random() * 10) + 20) * 1000; // 20000 to 30000
    const tasaDep = Math.floor(Math.random() * 10) + 5; // 5% to 15%
    const r_dep = 1 - tasaDep / 100;

    const u5_dep = valorAuto * Math.pow(r_dep, 4); // Year 5 (4 years passed)

    const html6 = `
        <div class="problema-ib">
            <p><strong>${i + 5}.</strong> [Aplicación] Un automóvil nuevo cuesta $${valorAuto.toLocaleString('en-US')}. Se deprecia a una tasa del ${tasaDep}% anual.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una fórmula para el valor del auto en el año $n$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el valor del auto en el año 5.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la pérdida total de valor después de 10 años.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const val10 = valorAuto * Math.pow(r_dep, 9); // Year 10
    const perdida = valorAuto - val10;

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
            <li> $u_{${seqs3[0].targetN}} = ${seqs3[0].result.toLocaleString('en-US')}$</li>
            <li> $u_{${seqs3[1].targetN}} = ${seqs3[1].result.toLocaleString('en-US')}$</li>
            <li> $u_{${seqs3[2].targetN}} = ${seqs3[2].result.toLocaleString('en-US')}$</li>
        </ul>

        <p><strong>${i + 3}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $S_{${seqs4[0].targetN}} = ${seqs4[0].sum.toLocaleString('en-US')}$</li>
            <li> $S_{${seqs4[1].targetN}} = ${seqs4[1].sum.toLocaleString('en-US')}$</li>
            <li> $S_{${seqs4[2].targetN}} = ${seqs4[2].sum.toLocaleString('en-US')}$</li>
        </ul>

        <p><strong>${i + 4}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li> $u_n = ${pobInicial} \\cdot (${r_pob})^{n-1}$</li>
            <li> $u_6 \\approx ${u6_pob}$ bacterias</li>
            <li> En la hora $n = ${n_supera}$</li>
        </ul>

        <p><strong>${i + 5}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> $u_n = ${valorAuto} \\cdot (${r_dep.toFixed(2)})^{n-1}$</li>
            <li> $u_5 \\approx $${u5_dep.toLocaleString('en-US', { maximumFractionDigits: 2 })}$</li>
            <li> Pérdida $\\approx $${perdida.toLocaleString('en-US', { maximumFractionDigits: 2 })}$</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3 + html4 + html5 + html6,
        respuesta: respuestaHTML,
        numPreguntas: 6
    };
}
