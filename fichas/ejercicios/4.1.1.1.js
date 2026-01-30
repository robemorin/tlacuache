import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.1. Estadística Descriptiva",
    seccion: "4.1.1. Representación de datos",
    titulo: "Ficha: Diagramas de Caja y Bigotes",
    tipo: 1,
    puntos: 25,
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: DATOS CRUDOS (Contexto: Tiempos de espera)
    // ======================================================
    // Generamos 15 datos aleatorios entre 5 y 45 minutos
    const n1 = 15;
    let rawData = [];
    for (let k = 0; k < n1; k++) {
        rawData.push(Math.floor(Math.random() * 40) + 5);
    }
    rawData.sort((a, b) => a - b); // Ordenamos para facilitar cálculo interno
    
    // Cálculos para respuesta
    const min1 = rawData[0];
    const max1 = rawData[n1 - 1];
    const med1 = rawData[7]; // n=15, pos 8 (índice 7)
    // Q1: Mediana de la mitad inferior (7 datos) -> pos 4 (índice 3)
    const q1_1 = rawData[3];
    // Q3: Mediana de la mitad superior (7 datos) -> pos 12 (índice 11)
    const q3_1 = rawData[11];
    const iqr1 = q3_1 - q1_1;

    const rawDataStr = rawData.join(", ");

    // Configuración del gráfico 1
    // Rango 0 a 50. Cuadrícula principal cada 5, secundaria cada 1.
    

    const html1 = `
    <h3>${metadata.titulo}</h3>
    <div class="problema-ib" style="margin-bottom: 30px;">
        <p><strong>${i}.</strong> [Contexto: Tiempos de Espera] Un consultorio médico registró el tiempo de espera (en minutos) de ${n1} pacientes aleatorios durante una mañana. Los datos obtenidos son:</p>
        
        <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; font-family: monospace; text-align: center; margin-bottom: 15px;">
            ${rawDataStr}
        </div>

        <div style="display: flex; gap: 20px; align-items: flex-start;">
            <div style="flex: 1;">
                <ol class="ib-lista">
                    <li>
                        <span class="ib-texto">Utilizando su calculadora de pantalla gráfica, determine:</span>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px;">
                            <div>a) El primer cuartil ($Q_1$): <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                            <div>b) La mediana: <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                            <div>c) El tercer cuartil ($Q_3$): <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                            <div>d) El rango intercuartil ($RIC$): <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                        </div>
                        <span class="ib-mark">[4]</span>
                    </li>
                    <li style="margin-top: 10px;">
                        <span class="ib-texto" style="display:block; margin-bottom: 5px;">Determine si existe algún valor atípico (outlier). Muestre su procedimiento.</span>
                        <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%;"></tlacuache-renglon>
                        <span class="ib-mark">[3]</span>
                    </li>
                </ol>
            </div>
        </div>
        
        <div style="margin-top: 15px;">
            <p style="margin-bottom: 5px;">c) En la siguiente cuadrícula, dibuje un <strong>diagrama de caja y bigotes</strong> preciso para estos datos. Asegúrese de usar una escala adecuada y marcar claramente los valores atípicos si los hubiera.</p>
            <div style="display: flex; justify-content: center;">
               <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="5" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,50"/>
            </div>
            <span class="ib-mark">[4]</span>
        </div>
    </div>
    `;

    // ======================================================
    // EJERCICIO 2: TABLA DE FRECUENCIAS (Contexto: Botánica)
    // ======================================================
    // Datos: Altura de plántulas (cm). Clases discretas o marcas de clase.
    // Usaremos valores discretos para simplificar cuartiles.
    // Valores: 10, 11, 12, 13, 14, 15
    const valores = [10, 11, 12, 13, 14, 15];
    const freqs = [];
    let totalFreq = 0;
    // Generar frecuencias aleatorias asegurando un total par (para facilitar mediana visual)
    for(let k=0; k<6; k++) {
        let f = Math.floor(Math.random() * 8) + 3;
        freqs.push(f);
        totalFreq += f;
    }

    // Expandir datos para cálculo de respuesta
    let expandedData = [];
    valores.forEach((val, idx) => {
        for(let k=0; k<freqs[idx]; k++) expandedData.push(val);
    });
    
    // Cálculos Ejer 2
    const min2 = expandedData[0];
    const max2 = expandedData[expandedData.length - 1];
    // Mediana
    let med2;
    const mid = Math.floor(expandedData.length / 2);
    if (expandedData.length % 2 === 0) med2 = (expandedData[mid-1] + expandedData[mid])/2;
    else med2 = expandedData[mid];
    
    // Quartiles (aprox simple usando índices)
    const q1_2 = expandedData[Math.floor(expandedData.length * 0.25)];
    const q3_2 = expandedData[Math.floor(expandedData.length * 0.75)];

    // Generar filas de la tabla HTML
    let tableRows = "";
    valores.forEach((val, idx) => {
        tableRows += `
        <tr>
            <td style="border: 1px solid black; padding: 5px; text-align: center;">${val}</td>
            <td style="border: 1px solid black; padding: 5px; text-align: center;">${freqs[idx]}</td>
            <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>`;
    });


    const html2 = `
    <div class="problema-ib">
        <p><strong>${i+1}.</strong> [Contexto: Botánica] Un grupo de estudiantes de biología mide la altura (en cm) de ${totalFreq} plántulas genéticamente modificadas después de 2 semanas. Los resultados se agrupan en la siguiente tabla:</p>

        <div style="display: flex; gap: 30px; margin-bottom: 20px;">
            <!-- Tabla a la izquierda -->
            <div style="flex: 0 0 auto;">
                <table style="border-collapse: collapse; width: 250px;">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="border: 1px solid black; padding: 5px;">Altura (cm)</th>
                            <th style="border: 1px solid black; padding: 5px;">Frecuencia</th>
                            <th style="border: 1px solid black; padding: 5px;">Frec. Acumulada</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>

            <!-- Preguntas a la derecha (Aprovechando espacio) -->
            <div style="flex: 1;">
                <ol class="ib-lista">
                    <li>
                        <span class="ib-texto">Complete la columna de "Frecuencia Acumulada" en la tabla.</span>
                        <span class="ib-mark">[2]</span>
                    </li>
                    <li style="margin-top:10px;">
                        <span class="ib-texto">Halle los siguientes estadísticos:</span>
                         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 5px;">
                            <div>Mediana: <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                            <div>Rango Intercuartil: <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon></div>
                        </div>
                        <span class="ib-mark">[3]</span>
                    </li>
                    <li style="margin-top:10px;">
                        <span class="ib-texto">El 75% de las plantas tiene una altura menor o igual a $k$ cm. Halle el valor de $k$.</span>
                        <div><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>,</div>
                        <span class="ib-mark">[2]</span>
                    </li>
                </ol>
            </div>
        </div>

        <div style="margin-top: 10px;">
            <p>d) Dibuje el diagrama de caja correspondiente en la cuadrícula inferior (Eje comienza en 9cm).</p>
            <div style="display: flex; justify-content: center;">
                <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="5" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,50"/>
            </div>
            <span class="ib-mark">[3]</span>
        </div>
        
        <div style="margin-top: 20px;">
            <p>e) Se considera que las plantas con altura superior a 14.5 cm tienen un crecimiento "acelerado". Estime el porcentaje de plantas con crecimiento acelerado basándose en sus datos.</p>
            <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            <span class="ib-mark">[2]</span>
        </div>
    </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <p><strong>${i}.</strong> (Datos Crudos)</p>
        <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li>Ordenados: ${rawData.join(", ")}</li>
            <li>Min: ${min1}, Q1: ${q1_1}, Med: ${med1}, Q3: ${q3_1}, Max: ${max1}</li>
            <li>IQR: ${iqr1}</li>
            <li>Outliers: Menor que ${q1_1 - 1.5*iqr1} o Mayor que ${q3_1 + 1.5*iqr1}</li>
        </ul>

        <p><strong>${i+1}.</strong> (Tabla)</p>
         <ul style="list-style:none; padding:0; margin-bottom:10px;">
            <li>Total datos: ${totalFreq}</li>
            <li>Min: ${min2}, Q1: ${q1_2}, Med: ${med2}, Q3: ${q3_2}, Max: ${max2}</li>
            <li>k (Q3) = ${q3_2}</li>
        </ul>
    `;

    return {
        html: html1 + html2,
        respuesta: respuestaHTML,
        numPreguntas: 2
    };
}
