import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Chi-cuadrado",
    titulo: "Distribución de Calificaciones de Utopía",
    tipo: 1, // 1 = Abierto
    puntos: 20
};

export async function generar(i) {
    // --- DATOS TABLA 1 (DISTRIBUCIÓN FRECUENCIAS) ---
    const grados = [1, 2, 3, 4, 5, 6, 7];
    const frecuencias = [10, 25, 38, 42, 25, 12, 6];
    
    // --- DATOS TABLA 2 (ESPERADA) ---
    const esperada = ["2.6", "    ", "37.1", "52.3", "    ", "    ", "2.6"];

    // --- DATOS TABLA 3 (CONTINGENCIA FÍSICA VS MATE) ---
    const tablaFisicaMate = [
        [40, 50, 56, 20],
        [42, 65, 90, 28],
        [32, 48, 52, 24],
        [60, 80, 100, 45]
    ];
    
    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> La siguiente tabla muestra la distribución de frecuencias de las calificaciones de Matemáticas para un país determinado, Utopía, en mayo de 1999.</p>
            
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                <table border="1" style="border-collapse: collapse; text-align: center; width: 80%;">
                    <tr>
                        <th style="padding: 5px; text-align: left;">Calificación (Grade)</th>
                        ${grados.map(g => `<td><strong>${g}</strong></td>`).join('')}
                    </tr>
                    <tr>
                        <th style="padding: 5px; text-align: left;">Número de candidatos</th>
                        ${frecuencias.map(f => `<td>${f}</td>`).join('')}
                    </tr>
                </table>
            </div>

            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Calcule la calificación media de estos candidatos.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <p>Las calificaciones de todos los candidatos de Matemáticas en mayo de 1999 se distribuyen como se muestra en el histograma a continuación. Esta distribución puede aproximarse mediante una distribución normal con media de $4$ y desviación estándar de $1.17$.</p>
            
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                <svg width="400" height="200" viewBox="0 0 400 200">
                    <!-- Ejes -->
                    <line x1="50" y1="150" x2="380" y2="150" stroke="black" stroke-width="1.5"></line>
                    <line x1="50" y1="150" x2="50" y2="20" stroke="black" stroke-width="1.5"></line>
                    <text x="5" y="100" transform="rotate(-90 15 100)" font-family="Arial" font-size="12">Frecuencia</text>
                    <text x="180" y="190" font-family="Arial" font-size="12">Calificación (Grade)</text>
                    
                    <!-- Barras (Aproximadas) -->
                    <rect x="60" y="140" width="35" height="10" fill="gray" stroke="black"></rect>
                    <rect x="95" y="100" width="35" height="50" fill="gray" stroke="black"></rect>
                    <rect x="130" y="70" width="35" height="80" fill="gray" stroke="black"></rect>
                    <rect x="165" y="30" width="35" height="120" fill="gray" stroke="black"></rect>
                    <rect x="200" y="70" width="35" height="80" fill="gray" stroke="black"></rect>
                    <rect x="235" y="110" width="35" height="40" fill="gray" stroke="black"></rect>
                    <rect x="270" y="140" width="35" height="10" fill="gray" stroke="black"></rect>
                    
                    <!-- Curva Normal -->
                    <path d="M 50 148 Q 110 140 140 80 T 182 30 T 225 80 T 290 148" fill="none" stroke="black" stroke-width="1.5"></path>
                    
                    <!-- Marcas eje X -->
                    ${grados.map((g, idx) => {
                        let xPos = 77 + (idx * 35);
                        return `<text x="${xPos - 4}" y="165" font-family="Arial" font-size="11">${g}</text>
                                <line x1="${xPos}" y1="150" x2="${xPos}" y2="155" stroke="black"></line>`;
                    }).join('')}
                </svg>
            </div>
            
            <p>Se cree que los resultados de los candidatos de Utopía provienen de esta distribución normal (media $4$, desviación estándar $1.17$).</p>
            
            <ol class="ib-lista" type="a" start="2">
                <li>
                    <ol class="ib-lista" type="i">
                        <li>
                            <span class="ib-texto">Copie y complete la siguiente tabla de frecuencias esperadas para todos los candidatos.</span>
                        </li>
                    </ol>
                </li>
            </ol>
            
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                <table border="1" style="border-collapse: collapse; text-align: center; width: 80%;">
                    <tr>
                        <th style="padding: 5px; text-align: left;">Calificación (Grade)</th>
                        ${grados.map(g => `<td><strong>${g}</strong></td>`).join('')}
                    </tr>
                    <tr>
                        <th style="padding: 5px; text-align: left;">Número esperado de candidatos</th>
                        ${esperada.map(f => `<td>${f}</td>`).join('')}
                    </tr>
                </table>
            </div>

            <ol class="ib-lista" type="i" start="2" style="margin-left: 55px;">
                <li>
                    <span class="ib-texto">Pruebe la hipótesis a un nivel de significancia del $5\\%$.</span>
                    <span class="ib-mark">[8]</span>
                </li>
            </ol>
            <br>
            <ol class="ib-lista" type="a" start="3">
                <li>
                    <span class="ib-texto">Dado que la media poblacional es $4$, ¿hay alguna evidencia, al nivel de significancia del $5\\%$, de que el rendimiento de los candidatos de Utopía sea inferior al de la población?</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <br>
                <li>
                    <span class="ib-texto">Se cree que para aquellos candidatos que toman tanto Matemáticas como Física, existe una fuerte relación entre las calificaciones que reciben en cada una de estas dos asignaturas. La tabla a continuación muestra la distribución de dichas calificaciones.</span>
                </li>
            </ol>
            
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                    <tr>
                        <td rowspan="2" colspan="2"></td>
                        <th colspan="4">Física</th>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">7</th>
                        <th style="padding: 5px;">6</th>
                        <th style="padding: 5px;">5</th>
                        <th style="padding: 5px;">4 o inferior</th>
                    </tr>
                    <tr>
                        <th rowspan="4" style="writing-mode: vertical-rl; transform: rotate(180deg); padding: 10px;">Matemáticas</th>
                        <th style="padding: 5px;">7</th>
                        <td>${tablaFisicaMate[0][0]}</td><td>${tablaFisicaMate[0][1]}</td><td>${tablaFisicaMate[0][2]}</td><td>${tablaFisicaMate[0][3]}</td>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">6</th>
                        <td>${tablaFisicaMate[1][0]}</td><td>${tablaFisicaMate[1][1]}</td><td>${tablaFisicaMate[1][2]}</td><td>${tablaFisicaMate[1][3]}</td>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">5</th>
                        <td>${tablaFisicaMate[2][0]}</td><td>${tablaFisicaMate[2][1]}</td><td>${tablaFisicaMate[2][2]}</td><td>${tablaFisicaMate[2][3]}</td>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">4 o inferior</th>
                        <td>${tablaFisicaMate[3][0]}</td><td>${tablaFisicaMate[3][1]}</td><td>${tablaFisicaMate[3][2]}</td><td>${tablaFisicaMate[3][3]}</td>
                    </tr>
                </table>
            </div>
            
            <div style="padding-left: 35px;">
                <p>¿Hay alguna evidencia al nivel de significancia del $5\\%$ de que esta relación se cumple?</p>
                <span class="ib-mark" style="float: right;">[6]</span>
            </div>

            <tlacuache-renglon n="15" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $\\bar{x} = \\frac{\\sum f x}{\\sum f} = \\frac{10(1)+25(2)+38(3)+42(4)+25(5)+12(6)+6(7)}{158} = \\frac{581}{158} \\approx 3.68$</li><br>
            
            <li><strong>b) i)</strong> Frecuencias esperadas calculadas integrando la normal (Media 4, SD 1.17) y multiplicando por 158:</li>
            <li>Para 2: $15.5$ o $15.6$ (dependiendo redondeo). Para 5: $37.1$. Para 6: $15.5$ o $15.6$.</li><br>
            
            <li><strong>b) ii)</strong> Hipótesis de Bondad de Ajuste $\\chi^2$:<br>
                $H_0$: Los datos se ajustan a la Normal(4, 1.17)<br>
                Combinando las celdas de los extremos si $E_i < 5$ (1 y 7). Grados de libertad $= 7 - 2 - 1 = 4$ si se combinan. <br>
                Cálculo $\\chi^2 \\approx 11.2$ a $12.5$ dependiendo del agrupamiento. <br>
                $p\\text{-valor}$ a determinar.
            </li><br>
            
            <li><strong>c)</strong> Prueba t de una muestra o prueba Z para ver si $3.68 < 4$.<br>
                $H_0: \\mu = 4$; $H_1: \\mu < 4$.<br>
                $z = \\frac{3.68 - 4}{1.17 / \\sqrt{158}} \\approx -3.44$. Como $p < 0.05$, existe fuerte evidencia de que el desempeño es inferior.
            </li><br>

            <li><strong>d)</strong> Prueba $\\chi^2$ de Independencia:<br>
                $H_0$: Las calificaciones de Matemáticas y Física son independientes.<br>
                $\\nu = (4-1)(4-1) = 9$. Valor crítico $\\chi^2_{\\text{crit}} = 16.919$<br>
                $\\chi^2_{\\text{calc}} \\approx 3.37 $<br>
                Como $\\chi^2_{\\text{calc}} < 16.919$ (y $p \\approx 0.948$), no rechazamos $H_0$. No hay evidencia suficiente de la relación.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
