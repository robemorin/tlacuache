import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Chi-cuadrado",
    titulo: "Transporte y Ciudad de Residencia",
    tipo: 1, // 1 = Abierto
    puntos: 9
};

export async function generar(i) {
    const tablaObs = [
        [45, 25, 30],
        [35, 45, 20]
    ];

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> Un investigador desea saber si el medio de transporte principal que utilizan los trabajadores está asociado con la ciudad en la que residen de entre dos ciudades (A y B). Para ello, selecciona una muestra aleatoria de $200$ trabajadores y registra sus respuestas en la siguiente tabla de frecuencias observadas.</p>
            
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                    <tr>
                        <th style="padding: 5px;"></th>
                        <th style="padding: 5px;">Autobús</th>
                        <th style="padding: 5px;">Tren</th>
                        <th style="padding: 5px;">Automóvil</th>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">Ciudad A</th>
                        <td style="padding: 5px;">${tablaObs[0][0]}</td>
                        <td style="padding: 5px;">${tablaObs[0][1]}</td>
                        <td style="padding: 5px;">${tablaObs[0][2]}</td>
                    </tr>
                    <tr>
                        <th style="padding: 5px;">Ciudad B</th>
                        <td style="padding: 5px;">${tablaObs[1][0]}</td>
                        <td style="padding: 5px;">${tablaObs[1][1]}</td>
                        <td style="padding: 5px;">${tablaObs[1][2]}</td>
                    </tr>
                </table>
            </div>

            <p>El investigador aplica una prueba de independencia de $\\chi^2$ con un nivel de significancia del $5\\%$.</p>
            
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Escriba la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Escriba el número de grados de libertad para esta prueba usando la fórmula $GL = (\\text{Total de fila - 1}) \\times (\\text{Total de columna - 1})$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Complete la siguiente tabla de frecuencias esperadas:</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                        <tr>
                            <th style="padding: 5px;"></th>
                            <th style="padding: 5px;">Autobús</th>
                            <th style="padding: 5px;">Tren</th>
                            <th style="padding: 5px;">Automóvil</th>
                        </tr>
                        <tr>
                            <th style="padding: 5px;">Ciudad A</th>
                            <td style="padding: 15px;"></td>
                            <td style="padding: 15px;"></td>
                            <td style="padding: 15px;"></td>
                        </tr>
                        <tr>
                            <th style="padding: 5px;">Ciudad B</th>
                            <td style="padding: 15px;"></td>
                            <td style="padding: 15px;"></td>
                            <td style="padding: 15px;"></td>
                        </tr>
                    </table>
                </div>

                <li>
                    <span class="ib-texto">Calcule el valor del estadístico $\\chi^2_{calc}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Sabiendo que el valor crítico al $5\\%$ de significancia es $\\chi^2_{crit} = 5.991$, realice una conclusión y justifique su respuesta considerando el estadístico calculado.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
            </ol>
            
        </div>
    `;

    // --- CÁLCULOS RESPUESTA ---
    // Totales Ciudad A = 100, Ciudad B = 100
    // Totales Bus = 80, Tren = 70, Auto = 50
    // Total General = 200
    // Esperados: A-Bus = 40, A-Tren = 35, A-Auto = 25
    // Esperados: B-Bus = 40, B-Tren = 35, B-Auto = 25

    // Chi2 Calc = sum(O-E)^2/E
    // A-Bus: (45-40)^2/40 = 25/40 = 0.625
    // A-Tren: (25-35)^2/35 = 100/35 = 2.857
    // A-Auto: (30-25)^2/25 = 25/25 = 1
    // B-Bus: (35-40)^2/40 = 25/40 = 0.625
    // B-Tren: (45-35)^2/35 = 100/35 = 2.857
    // B-Auto: (20-25)^2/25 = 25/25 = 1
    // Suma total = 8.964

    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $H_0$: El modo de transporte es independiente de la ciudad.<br>
                                     $H_1$: El modo de transporte no es independiente de la ciudad.</li><br>
            <li><strong>b)</strong> $GL = (2 - 1) \\times (3 - 1) = 2$.</li><br>
            <li><strong>c)</strong> Tabla de Esperados:<br>
            Ciudad A: Bus=40, Tren=35, Auto=25<br>
            Ciudad B: Bus=40, Tren=35, Auto=25</li><br>
            <li><strong>d)</strong> $\\chi^2_{calc} = 0.625 + 2.857 + 1 + 0.625 + 2.857 + 1 \\approx 8.964$.</li><br>
            <li><strong>e)</strong> Como $\\chi^2_{calc} = 8.964 > \\chi^2_{crit} = 5.991$, el estadístico cae en la región de rechazo. Por tanto, se **rechaza $H_0$**.<br>
            <strong>Conclusión:</strong> Hay evidencia estadísticamente significativa de que la ciudad de residencia sí afecta el medio de transporte.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
