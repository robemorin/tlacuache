import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.1. Estadística Descriptiva",
    seccion: "4.1.1. Representación de datos",
    titulo: "Ficha: Detección de Valores Atípicos (Outliers)",
    tipo: 1,
    puntos: 25,
};

export async function generar(i) {
    const n1 = 14;
    let datos = [];
    const base = Math.floor(Math.random() * 20) + 40;

    for (let k = 0; k < n1 - 2; k++) {
        datos.push(base + Math.floor(Math.random() * 15) - 7);
    }
    const outlierSup = base + 25 + Math.floor(Math.random() * 10);
    datos.push(outlierSup);
    if (Math.random() > 0.5) {
        datos.push(base - 20 - Math.floor(Math.random() * 5));
    } else {
        datos.push(base + Math.floor(Math.random() * 5));
    }

    datos.sort((a, b) => a - b);

    const mid = Math.floor(datos.length / 2);
    const lowerHalf = datos.slice(0, mid);
    const upperHalf = datos.length % 2 === 0 ? datos.slice(mid) : datos.slice(mid + 1);

    const getMedian = (arr) => {
        const m = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[m - 1] + arr[m]) / 2 : arr[m];
    };

    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const iqr = q3 - q1;
    const limSup = q3 + 1.5 * iqr;
    const limInf = q1 - 1.5 * iqr;

    const outliers = datos.filter(d => d < limInf || d > limSup);
    const datosStr = datos.join(", ");

    const html1 = `
    <h3>${metadata.titulo}</h3>
    <div class="problema-ib" style="margin-bottom: 40px;">
        <p><strong>${i}.</strong> [Contexto: Control de Calidad] Se mide el peso en gramos de una muestra de ${datos.length} componentes electrónicos. Los resultados ordenados son:</p>
        
        <div style="background-color: #f0f0f0; padding: 12px; border-radius: 4px; font-family: monospace; text-align: center; margin-bottom: 20px; font-size: 1.1em;">
            ${datosStr}
        </div>

        <div style="">
            <div style="">
                <p style="font-style: italic; margin-bottom: 10px;">Se considera que un valor es atípico (outlier) si es menor que $Q_1 - 1.5 \\cdot RIC$ o mayor que $Q_3 + 1.5 \\cdot RIC$.</p>
                <ol class="ib-lista">
                    <li>
                        <span class="ib-texto">Calcule los siguientes estadísticos para estos datos:</span>
                        </li >
                        <table width="100%">
                        <tr>
                            <td>a) $Q_1$:</td>
                            <td>b) $Q_3$:</td>
                            <td>c) $RIC$:</td>
                        </tr>
                        </table>

        <span class="ib-mark">[3]</span>
                    
                    <li style="margin-top: 15px;">
                        <span class="ib-texto">Determine los límites (fronteras) para los valores atípicos.</span>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px;">
                            <div>Límite Inferior: <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%;"></tlacuache-renglon></div>
                            <div>Límite Superior: <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%;"></tlacuache-renglon></div>
                        </div>
                        <span class="ib-mark">[4]</span>
                    </li>
                    <li style="margin-top: 15px;">
                        <span class="ib-texto">Enumere los valores atípicos encontrados en la muestra, si los hay.</span>
                        <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
                        <span class="ib-mark">[2]</span>
                    </li>
                </ol >
            </div >
        </div >
    </div >
        `;

    const outlier2 = 5;
    const q1_new = 30;
    const q3_new = 45;
    const med_new = 38;
    const max_new = 60;
    const iqr_new = q3_new - q1_new;
    const limInf_new = q1_new - 1.5 * iqr_new;

    const html2 = `
        < div class="problema-ib" >
        <p><strong>${i + 1}.</strong> [Contexto: Rendimiento Académico] Las calificaciones (sobre 60 puntos) de un examen parcial se resumen así:</p>
        
        <ul style="display: flex; list-style: none; gap: 20px; padding: 0; justify-content: center; background: #fafafa; padding: 10px; border: 1px solid #ddd;">
            <li><strong>Mín:</strong> ${outlier2}</li>
            <li><strong>$Q_1$:</strong> ${q1_new}</li>
            <li><strong>Mediana:</strong> ${med_new}</li>
            <li><strong>$Q_3$:</strong> ${q3_new}</li>
            <li><strong>Máx:</strong> ${max_new}</li>
        </ul>

        <ol class="ib-lista" style="margin-top: 20px;">
            <li>
                <span class="ib-texto">Demuestre matemáticamente si la calificación mínima (${outlier2}) es un valor atípico.</span>
                <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
                <span class="ib-mark">[3]</span>
            </li>
            <li style="margin-top: 15px;">
                <span class="ib-texto">Sabiendo que la siguiente calificación más baja después de ${outlier2} es 12, dibuje un diagrama de caja y bigotes preciso en la cuadrícula. Indique claramente cualquier valor atípico.</span>
                <div style="display: flex; justify-content: center;">
               <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="5" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,50"/>
            </div>
                <span class="ib-mark">[5]</span>
            </li>
            <li style="margin-top: 15px;">
                <span class="ib-texto">Explique por qué la mediana suele ser una medida de tendencia central más robusta que la media en presencia de valores atípicos.</span>
                <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
                <span class="ib-mark">[2]</span>
            </li>
        </ol>
    </div >
        `;

    const respuestaFinal = `
        < p > <strong>${i}.</strong></p >
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li>$Q_1$: ${q1}, $Q_3$: ${q3}, $RIC$: ${iqr}</li>
            <li>Límites: [${limInf}, ${limSup}]</li>
            <li>Outliers: ${outliers.join(", ")}</li>
        </ul>
        <p><strong>${i + 1}.</strong></p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li>RIC = ${iqr_new}</li>
            <li>Límite Inf = ${q1_new} - 1.5(${iqr_new}) = ${limInf_new}</li>
            <li>Como ${outlier2} < ${limInf_new}, es un outlier.</li>
            <li>El bigote izquierdo debe llegar hasta 12 (el siguiente valor más bajo), y 5 debe marcarse como punto aislado.</li>
        </ul>
    `;

    return {
        html: html1 + html2,
        respuesta: respuestaFinal,
        numPreguntas: 2
    };
}