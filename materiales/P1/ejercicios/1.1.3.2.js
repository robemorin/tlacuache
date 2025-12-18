import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.1. Fundamentos",
    seccion: "1.1.3. Redondeo y estimaciones",
    titulo: "Moles y Moléculas (Notación Científica)",
    puntos: 6,
    tipo: 1
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    const NA = 6.02e23; // Avogadro's number

    const sustancias = [
        { nombre: "Agua", formula: "H_2O", masa: 18.02 },
        { nombre: "Dióxido de Carbono", formula: "CO_2", masa: 44.01 },
        { nombre: "Metano", formula: "CH_4", masa: 16.04 },
        { nombre: "Glucosa", formula: "C_6H_{12}O_6", masa: 180.16 },
        { nombre: "Oro", formula: "Au", masa: 196.97 },
        { nombre: "Ácido Sulfúrico", formula: "H_2SO_4", masa: 98.08 }
    ];

    const sust = sustancias[Math.floor(Math.random() * sustancias.length)];

    // Moles: Random value between 0.05 and 5.5
    // OR small values like 2.5 x 10^-3 to test scientific notation input/output logic if desired,
    // but sticking to simple decimals for input usually works better for "given" values unless specified.
    // Let's mix it up: sometimes small, sometimes > 1.
    let moles;
    if (Math.random() > 0.5) {
        moles = parseFloat((Math.random() * 5 + 0.1).toFixed(2)); // 0.10 to 5.10
    } else {
        moles = parseFloat((Math.random() * 0.09 + 0.001).toFixed(4)); // 0.0010 to 0.0910
    }

    // Calculations
    const molecules = moles * NA;
    const massPerMolecule = sust.masa / NA;

    // Formatting helpers
    // We want the answerKey to be clear.

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Considere una muestra de <strong>${moles} moles</strong> de <strong>${sust.nombre}</strong> ($${sust.formula}$).</p>
            <p>La masa molar de esta sustancia es de <strong>${sust.masa} g/mol</strong>.</p>
            <p>Considere la constante de Avogadro $N_A = 6.02 \\times 10^{23}$.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el número total de moléculas (o átomos) presentes en la muestra. Dé su respuesta en la forma $a \\times 10^k$, donde $1 \\leq a < 10$ y $k \\in \\mathbb{Z}$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Calcule la masa, en gramos, de una sola molécula (o átomo) de ${sust.nombre}.  Dé su respuesta en la forma $a \\times 10^k$, donde $1 \\leq a < 10$ y $k \\in \\mathbb{Z}$</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Número de moléculas:</strong></p>
        <p>Formula: $N = n \\times N_A$</p>
        <p>$N = ${moles} \\times (6.02 \\times 10^{23})$</p>
        <p>$N \\approx ${molecules.toExponential(2).replace('e+', '\\times 10^{').replace('e-', '\\times 10^{-')} }$</p>
        <p><strong>${molecules.toExponential(2).replace('e+', '\\times 10^{').replace('e-', '\\times 10^{-')}}</strong> moléculas</p>
        <hr>
        
        <p><strong>b) Masa de una molécula:</strong></p>
        <p>Formula: $m = \\frac{M}{N_A}$</p>
        <p>$m = \\frac{${sust.masa}}{6.02 \\times 10^{23}}$</p>
        <p>$m \\approx ${massPerMolecule.toExponential(2).replace('e+', '\\times 10^{').replace('e-', '\\times 10^{-')}}$ g</p>
        <p><strong>${massPerMolecule.toExponential(2).replace('e+', '\\times 10^{').replace('e-', '\\times 10^{-')}}</strong> g</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
