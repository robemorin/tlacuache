import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.1. Probabilidad experimental",
    titulo: "Ficha: Probabilidad Experimental e Histogramas",
    puntos: 15,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: TABLA DE FRECUENCIAS Y PROBABILIDADES (7 PUNTOS)
    // ==========================================
    // Generar frecuencias aleatorias para comerciales
    const f1 = Math.floor(Math.random() * 8) + 12; // 12 a 19
    const f2 = Math.floor(Math.random() * 15) + 30; // 30 a 44
    const f3 = Math.floor(Math.random() * 10) + 15; // 15 a 24
    const f4 = Math.floor(Math.random() * 5) + 3;  // 3 a 7
    const total1 = f1 + f2 + f3 + f4;

    const probA = f2 / total1;
    const probB = f4 / total1;
    const probC = (f2 + f3) / total1;

    // ==========================================
    // EJERCICIO 2: HISTOGRAMA DE LLAMADAS DIARIAS (8 PUNTOS)
    // ==========================================
    // Frecuencias para llamadas recibidas de 0 a 8 llamadas
    const f_calls = [
        Math.floor(Math.random() * 3) + 1,  // 0 llamadas: 1 a 3
        Math.floor(Math.random() * 4) + 5,  // 1 llamada: 5 a 8
        Math.floor(Math.random() * 4) + 9,  // 2 llamadas: 9 a 12
        Math.floor(Math.random() * 4) + 6,  // 3 llamadas: 6 a 9
        Math.floor(Math.random() * 4) + 5,  // 4 llamadas: 5 a 8
        Math.floor(Math.random() * 3) + 3,  // 5 llamadas: 3 a 5
        Math.floor(Math.random() * 3) + 1,  // 6 llamadas: 1 a 3
        0,                                 // 7 llamadas: 0
        1                                  // 8 llamadas: 1
    ];
    const total2 = f_calls.reduce((a, b) => a + b, 0);

    const f_c_0 = f_calls[0];
    const f_c_ge5 = f_calls[5] + f_calls[6] + f_calls[7] + f_calls[8];
    const f_c_lt3 = f_calls[0] + f_calls[1] + f_calls[2];

    const prob2_i = f_c_0 / total2;
    const prob2_ii = f_c_ge5 / total2;
    const prob2_iii = f_c_lt3 / total2;

    const max_f = Math.max(...f_calls);
    const ylim_max = Math.ceil((max_f + 1) / 2) * 2; // redondear al par superior

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- ================= PAGINA 1 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between;"-->
                <div>
                    <!-- Cabecera -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                        <div>
                            <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Evaluación: Probabilidad Experimental e Histogramas</h2>
                            <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Análisis de Distribuciones de Frecuencia y Probabilidad</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 15</span>
                        </div>
                    </div>

                    <!-- Ejercicio 1 -->
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                            <strong>Ejercicio 1.</strong> José realiza un estudio de campo registrando la duración, en segundos, de los anuncios comerciales transmitidos por televisión. Los resultados del estudio se resumen en la siguiente tabla de frecuencias:
                        </p>

                        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 20px; margin-bottom: 15px;">
                            <table style="border-collapse: collapse; border: 2px solid #333; font-family: Arial, sans-serif; font-size: 0.95em; min-width: 200px;">
                                <thead>
                                    <tr style="background-color: #eee;">
                                        <th style="border: 1px solid #333; padding: 8px; text-align: center;">Duración (segundos)</th>
                                        <th style="border: 1px solid #333; padding: 8px; text-align: center;">Frecuencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">$0 - 19$</td>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">${f1}</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">$20 - 39$</td>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">${f2}</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">$40 - 59$</td>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">${f3}</td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">$60+$</td>
                                        <td style="border: 1px solid #333; padding: 8px; text-align: center;">${f4}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p style="font-size: 1.05em; line-height: 1.5; margin: 15px 0 10px 0;">
                            A partir de estos datos, calcule la probabilidad experimental de que el próximo comercial televisivo:
                        </p>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Tenga una duración de entre $20$ y $39$ segundos. Exprese su respuesta redondeada a 3 decimales.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Dure al menos un minuto. Exprese su respuesta redondeada a 3 decimales.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                c) Dure entre $20$ y $59$ segundos (inclusive). Exprese su respuesta redondeada a 3 decimales.
                                <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                            </p>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </div>
                    </div>
                </div>
            <!--/div-->

            <!-- SALTO DE PÁGINA -->
            <div style="page-break-before: always; break-before: page;"></div>

            <!-- ================= PAGINA 2 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between; margin-top: 10px;"-->
                <div>

                    <!-- Ejercicio 2 -->
                    <div>
                        <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                            <strong>Ejercicio 2.</strong> Betulia registra el número de llamadas telefónicas recibidas en su teléfono celular a lo largo de un período de varios días consecutivos. El histograma que se muestra a continuación resume las frecuencias observadas:
                        </p>

                        <!-- Renderizado del Histograma usando Custom Elements locales -->
                        <div style="display: flex; justify-content: center; margin: 20px 0;">
                            <tlacuache-ejes size="240,400" xlim="-1, 9" ylim="0, ${ylim_max}" dx="1" dy="2" xlabel="Número de llamadas por día" ylabel="Frecuencia (días)" grid="true">
                                <tlacuache-histograma inicio="0" paso="1" frecuencias="${f_calls.join(',')}" fill="#b2f2bb" stroke="#2b8a3e" lineWidth="1.5"></tlacuache-histograma>
                            </tlacuache-ejes>
                        </div>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Determine el número total de días que duró el registro telefónico de Betulia.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Estime la probabilidad experimental de que el próximo día Betulia reciba:
                            </p>
                            
                            <div style="margin-left: 15px; margin-top: 10px;">
                                <p style="font-weight: bold; margin-bottom: 8px;">
                                    i. Ninguna llamada telefónica.
                                    <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                                </p>
                                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                            </div>

                            <div style="margin-left: 15px; margin-top: 15px;">
                                <p style="font-weight: bold; margin-bottom: 8px;">
                                    ii. $5$ o más llamadas telefónicas.
                                    <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                                </p>
                                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                            </div>

                            <div style="margin-left: 15px; margin-top: 15px;">
                                <p style="font-weight: bold; margin-bottom: 8px;">
                                    iii. Menos de $3$ llamadas telefónicas.
                                    <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                                </p>
                                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                            </div>
                        </div>
                    </div>
                </div>

                <!--div style="text-align: right; font-size: 0.85em; color: #777; border-top: 1px solid #ddd; padding-top: 5px;">
                    Página 2 de 2
                </div-->
            </div>
        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;">
                <strong>Solucionario Oficial y Esquema de Calificación (Ficha ${i})</strong>
            </p>

            <div style="margin-bottom: 20px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Ejercicio 1 [7 Puntos]:</strong><br>
                * Número total de comerciales registrados: $Total = ${f1} + ${f2} + ${f3} + ${f4} = ${total1}$.<br>
                <strong>a) Probabilidad de 20 a 39 segundos [2 puntos]:</strong><br>
                $P(20-39) = \\frac{${f2}}{${total1}} \\approx \\mathbf{${probA.toFixed(3)}}$ (o en fracción simplificada).<br>
                
                <strong>b) Probabilidad de al menos un minuto [2 puntos]:</strong><br>
                $P(\\ge 60\\text{ s}) = \\frac{${f4}}{${total1}} \\approx \\mathbf{${probB.toFixed(3)}}$.<br>

                <strong>c) Probabilidad de entre 20 y 59 segundos [3 puntos]:</strong><br>
                $P(20-59) = \\frac{${f2} + ${f3}}{${total1}} = \\frac{${f2 + f3}}{${total1}} \\approx \\mathbf{${probC.toFixed(3)}}$.
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [8 Puntos]:</strong><br>
                <strong>a) Número total de días [2 puntos]:</strong><br>
                * Sumar las alturas de cada barra del histograma (frecuencias):<br>
                $f_{0} = ${f_calls[0]}$, $f_{1} = ${f_calls[1]}$, $f_{2} = ${f_calls[2]}$, $f_{3} = ${f_calls[3]}$, $f_{4} = ${f_calls[4]}$, $f_{5} = ${f_calls[5]}$, $f_{6} = ${f_calls[6]}$, $f_{7} = ${f_calls[7]}$, $f_{8} = ${f_calls[8]}$.<br>
                $Total = ${f_calls[0]} + ${f_calls[1]} + ${f_calls[2]} + ${f_calls[3]} + ${f_calls[4]} + ${f_calls[5]} + ${f_calls[6]} + ${f_calls[7]} + ${f_calls[8]} = \\mathbf{${total2}\\text{ días}}$. [2 puntos]<br>

                <strong>b) Estimación de probabilidades [6 puntos]:</strong><br>
                * <strong>i. Ninguna llamada telefónica [2 puntos]:</strong><br>
                $P(X=0) = \\frac{f_0}{Total} = \\frac{${f_c_0}}{${total2}} \\approx \\mathbf{${prob2_i.toFixed(3)}}$. [2 puntos]<br>
                
                * <strong>ii. 5 o más llamadas telefónicas [2 puntos]:</strong><br>
                Frecuencia acumulada ($X \\ge 5$): $f_5 + f_6 + f_7 + f_8 = ${f_calls[5]} + ${f_calls[6]} + 0 + 1 = ${f_c_ge5}$ días.<br>
                $P(X \\ge 5) = \\frac{${f_c_ge5}}{${total2}} \\approx \\mathbf{${prob2_ii.toFixed(3)}}$. [2 puntos]<br>

                * <strong>iii. Menos de 3 llamadas telefónicas [2 puntos]:</strong><br>
                Frecuencia acumulada ($X < 3$): $f_0 + f_1 + f_2 = ${f_calls[0]} + ${f_calls[1]} + ${f_calls[2]} = ${f_c_lt3}$ días.<br>
                $P(X < 3) = \\frac{${f_c_lt3}}{${total2}} \\approx \\mathbf{${prob2_iii.toFixed(3)}}$. [2 puntos]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
