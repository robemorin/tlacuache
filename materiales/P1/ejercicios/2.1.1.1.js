import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "1. Modelos",
    seccion: "1. Función lineal",
    titulo: "Depreciación Lineal",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VALORES ---
    const valorInicial = 5000;
    const anios = 5;
    const valorFinal = 1000;
    
    // --- CÁLCULOS ---
    const gradiente = (valorFinal - valorInicial) / anios; // -800
    const depreciacionAnual = Math.abs(gradiente); // 800
    const tPreguntaC = 3;
    const valorEnT = gradiente * tPreguntaC + valorInicial; // 2600

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Una empresa compra una impresora 3D industrial por $${valorInicial}$ USD. El departamento de contabilidad asume que el valor del equipo se deprecia a un ritmo constante (linealmente). Después de $${anios}$ años, el valor estimado de la impresora es de $${valorFinal}$ USD.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la tasa de depreciación anual de la impresora.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Escriba una ecuación que modele el valor $V$ de la impresora $t$ años después de su compra.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el valor de la impresora $${tPreguntaC}$ años después de haber sido comprada.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="15" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $m = \\frac{${valorFinal} - ${valorInicial}}{${anios} - 0} = \\frac{${valorFinal - valorInicial}}{${anios}} = ${gradiente}$ <br>
                La tasa de depreciación es el valor absoluto de la pendiente, por lo que es <strong>$${depreciacionAnual} USD/año</strong>.</li>
            <li><strong>b)</strong> <strong>$V(t) = ${gradiente}t + ${valorInicial}$</strong></li>
            <li><strong>c)</strong> $V(${tPreguntaC}) = ${gradiente}(${tPreguntaC}) + ${valorInicial} = ${gradiente * tPreguntaC} + ${valorInicial} =$ <strong>$${valorEnT} USD</strong></li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
