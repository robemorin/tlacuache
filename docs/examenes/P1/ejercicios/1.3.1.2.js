import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto",
    titulo: "Plan de ahorro e inversión para una casa",
    puntos: 7,
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> En esta pregunta, dé todas las respuestas redondeando a dos cifras decimales.</p>
            <p>Pierre invierte $1.500$ euros (EUR) al final de cada mes, durante $10$ años, en un plan de ahorro que paga un tipo de interés nominal anual del $3,6\\%$ compuesto mensualmente.</p>
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Calcule el valor de los ahorros de Pierre al final de esos $10$ años.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            <p>Al final de esos $10$ años, Pierre saca $\\text{EUR}\\,100.000$ del plan de ahorro y los utiliza como entrada para una casa.</p>
            <p>Pierre invierte el resto en otra cuenta con un tipo de interés nominal anual del $4,5\\%$ compuesto trimestralmente y deja ahí el dinero durante $15$ años.</p>
            
                <li>
                    <span class="ib-texto">Calcule la cantidad que habrá en la cuenta de Pierre cuando finalice este período.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            <tlacuache-renglon n="15" color="gray" alto="35"></tlacuache-renglon>
        </div>
        <div class="newpage"><tlacuache-renglon n="15" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    const respuesta = `
        <p><strong>(a)</strong></p>
        <p>Valor futuro de una anualidad:</p>
        <ul>
            <li>$\\text{PMT} = 1500$</li>
            <li>$r = 0,036$</li>
            <li>$n = 12$</li>
            <li>$t = 10$</li>
        </ul>
        <p>$\\text{FV} = 1500 \\times \\frac{\\left(1 + \\frac{0,036}{12}\\right)^{12\\times 10} - 1}{\\frac{0,036}{12}}$</p>
        <p>$\\text{FV} = 216.275,75 \\text{ EUR}$</p>
        <hr>
        <p><strong>(b)</strong></p>
        <p>Resto de los ahorros: $216.275,75 - 100.000 = 116.275,75 \\text{ EUR}$</p>
        <p>Valor futuro de la inversión compuesta:</p>
        <ul>
            <li>$\\text{PV} = 116.275,75$</li>
            <li>$r = 0,045$</li>
            <li>$n = 4$</li>
            <li>$t = 15$</li>
        </ul>
        <p>$\\text{FV} = 116.275,75 \\left(1 + \\frac{0,045}{4}\\right)^{4 \\times 15}$</p>
        <p>$\\text{FV} = 227.585,83 \\text{ EUR}$</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
