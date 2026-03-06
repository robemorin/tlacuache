import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Estadística descriptiva",
    seccion: "Histogramas y diagramas de caja y bigotes",
    titulo: "Interpretación de histograma y cálculo de media",
    puntos: 6, // 2 + 4
};

export async function generar(i) {
    const totalPeople = 270;
    const freqs = [40, 70, 100, 50, 10];
    const midPoints = [10, 30, 50, 70, 90];
    const ranges = [
        "0 ≤ edad < 20",
        "20 ≤ edad < 40",
        "40 ≤ edad < 60",
        "60 ≤ edad < 80",
        "80 ≤ edad ≤ 100"
    ];

    // Gráfica
    // inicio=10 (marca de clase de 0-20), paso=20 (ancho)
    const grafica = `
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <tlacuache-ejes size="320,400" 
            xlabel="Edad (años)" 
            ylabel="Frecuencia" 
            xlim="-10,110" dx="20" 
            ylim="0,110" dy="10">
            <tlacuache-histograma inicio="10" paso="20" frecuencias="${freqs.join(',')}"></tlacuache-histograma>
        </tlacuache-ejes>
    </div>
    `;

    // Tabla para completar
    let tableHtml = `<table style="width:80%; margin: 10px auto; border-collapse: collapse; text-align: center;" border="1">
        <tr style="background-color: #f0f0f0;">
            <th style="padding: 5px;">Rango de edad</th>
            <th style="padding: 5px;">Frecuencia ($f$)</th>
            <th style="padding: 5px;">Marca de clase ($x$)</th>
        </tr>
        <tr>
            <td style="padding: 5px;">${ranges[0]}</td>
            <td style="padding: 5px;">${freqs[0]}</td>
            <td style="padding: 5px;">${midPoints[0]}</td>
        </tr>`;

    // Filas vacías para que el estudiante complete
    for (let k = 1; k < ranges.length; k++) {
        tableHtml += `
        <tr>
            <td style="padding: 5px;">${ranges[k]}</td>
            <td style="padding: 5px;"></td>
            <td style="padding: 5px;"></td>
        </tr>`;
    }
    tableHtml += `</table>`;

    const html = `
        <p><strong>${i}.</strong> El siguiente histograma representa las edades de ${totalPeople} personas en un pueblo.</p>
        ${grafica}
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Usa el histograma para completar la siguiente tabla.</span>
                <span class="ib-mark">[2]</span>
            </li>
                <div style="margin-top: 10px;">${tableHtml}</div>
            
            <li>
                <span class="ib-texto">A partir de lo anterior, calcula una estimación de la edad media.</span>
                <span class="ib-mark">[4]</span>
            </li>
            <tlacuache-renglon n="4" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    // Cálculos para respuesta
    let sumF = 0;
    let sumFx = 0;
    let detailSum = [];

    freqs.forEach((f, idx) => {
        const x = midPoints[idx];
        sumF += f;
        sumFx += f * x;
        detailSum.push(`(${f} \\times ${x})`);
    });

    const mean = sumFx / sumF; // 11900 / 270 = 44.074...

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                <strong>Valores faltantes en la tabla:</strong><br>
                <ul>
                    <li>20 ≤ edad < 40: Frecuencia = <strong>70</strong>, Marca = <strong>30</strong></li>
                    <li>40 ≤ edad < 60: Frecuencia = <strong>100</strong>, Marca = <strong>50</strong></li>
                    <li>60 ≤ edad < 80: Frecuencia = <strong>50</strong>, Marca = <strong>70</strong></li>
                    <li>80 ≤ edad ≤ 100: Frecuencia = <strong>10</strong>, Marca = <strong>90</strong></li>
                </ul>
            </li>
            <br>
            <li>
                La media estimada se calcula como $\\bar{x} = \\frac{\\sum f \\cdot x}{\\sum f}$.<br>
                $$ \\sum f \\cdot x = ${detailSum.join(' + ')} $$
                $$ \\sum f \\cdot x = ${sumFx} $$
                $$ \\bar{x} = \\frac{11900}{270} \\approx 44.1 $$
                <br>
                La edad media estimada es <strong>44.1 años</strong> (3 cifras significativas).
            </li>
        </ol>
    `;

    return { html, respuesta };
}
