import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "5. Cálculo",
    subtema: "5.1. Introducción al cálculo diferencial",
    seccion: "5.1.1. Pendiente instantánea mediante aproximaciones",
    titulo: "Ficha: Pendiente Instantánea y Límites Numéricos",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: FUNCIÓN CUADRÁTICA F(X) = X^2 + CX EN X=2 (5 PUNTOS)
    // ==========================================
    const c = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const f2 = 4 + 2 * c;
    const slope_exact1 = 4 + c;

    // Calcular valores de la tabla en el orden solicitado:
    // -0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1
    const h_vals1 = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
    const table1 = h_vals1.map(h => {
        if (h === 0) {
            return { h, x: 2, fx: f2, m: "No definido (Indeterminado)" };
        }
        const x = parseFloat((2 + h).toFixed(3));
        const fx = parseFloat((x*x + c*x).toFixed(6));
        const m = parseFloat(((fx - f2) / h).toFixed(4));
        return { h, x, fx, m };
    });

    // ==========================================
    // EJERCICIO 2: MOVIMIENTO DE PARTÍCULA S(T) = T^2 + VT EN T=3 (5 PUNTOS)
    // ==========================================
    const v = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
    const s3 = 9 + 3 * v;
    const velocity_exact = 6 + v;

    const h_vals2 = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
    const table2 = h_vals2.map(h => {
        if (h === 0) {
            return { h, t: 3, st: s3, v_med: "No definido" };
        }
        const t = parseFloat((3 + h).toFixed(3));
        const st = parseFloat((t*t + v*t).toFixed(6));
        const v_med = parseFloat(((st - s3) / h).toFixed(4));
        return { h, t, st, v_med };
    });

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Introducción al Cálculo Diferencial</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Pendiente Instantánea y Límites Numéricos</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Considere la función cuadrática $f(x) = x^2 + ${c}x$. Deseamos estimar la pendiente de la recta tangente (pendiente instantánea) a la curva en el punto $P(2, ${f2})$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 10px;">
                        a) Complete la siguiente tabla calculando los valores de $f(x)$ y la pendiente de la recta secante $m_{\\text{sec}} = \\frac{f(2+h) - f(2)}{h}$ para cada valor de la perturbación $h$.
                        <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                    </p>

                    <!-- Tabla del Ejercicio 1 -->
                    <div style="display: flex; justify-content: center; margin: 15px 0;">
                        <table style="border-collapse: collapse; border: 2px solid #333; font-size: 0.95em; min-width: 320px; text-align: center;">
                            <thead>
                                <tr style="background-color: #eee;">
                                    <th style="border: 1px solid #333; padding: 6px;">$h$</th>
                                    <th style="border: 1px solid #333; padding: 6px;">$x = 2 + h$</th>
                                    <th style="border: 1px solid #333; padding: 6px;">$f(x)$</th>
                                    <th style="border: 1px solid #333; padding: 6px;">$m_{\\text{sec}}$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.1$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$1.9$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.01$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$1.99$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.001$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$1.999$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr style="background-color: #fff4f4;">
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">$0$</td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">$2.0$</td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold; color: #222;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold; color: #c00;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.001$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$2.001$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.01$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$2.01$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.1$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$2.1$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) A partir de las tendencias observadas en la tabla, estime el valor de la pendiente de la recta tangente a la curva en $x = 2$. Explique detalladamente su deducción límite y por qué no es posible calcular directamente el valor cuando $h = 0$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- SALTO DE PÁGINA -->
            <div style="page-break-before: always; break-before: page;"></div>

            <!-- ================= PÁGINA 2 ================= -->
            <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px; margin-top: 15px;">
                <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Aplicación en Cinemática Física</span>
            </div>

            <!-- Ejercicio 2 -->
            <div>
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> La posición de una partícula que se desplaza sobre una línea recta está dada por la función de posición $s(t) = t^2 + ${v}t$, donde $s$ se mide en metros y $t$ en segundos.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 10px;">
                        a) Complete la siguiente tabla calculando la velocidad promedio (pendiente secante) en los intervalos de tiempo $[3, 3 + h]$ para aproximar la velocidad en el instante $t = 3$.
                        <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                    </p>

                    <!-- Tabla del Ejercicio 2 -->
                    <div style="display: flex; justify-content: center; margin: 15px 0;">
                        <table style="border-collapse: collapse; border: 2px solid #333; font-size: 0.95em; min-width: 320px; text-align: center;">
                            <thead>
                                <tr style="background-color: #eee;">
                                    <th style="border: 1px solid #333; padding: 6px;">Intervalo</th>
                                    <th style="border: 1px solid #333; padding: 6px;">$h$</th>
                                    <th style="border: 1px solid #333; padding: 6px;">$s(3+h)$</th>
                                    <th style="border: 1px solid #333; padding: 6px;">Velocidad Promedio ($v_{\\text{prom}}$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 2.9]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.1$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 2.99]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.01$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 2.999]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$-0.001$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr style="background-color: #fff4f4;">
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">$[3, 3]$</td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold;">$0$</td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold; color: #222;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; font-weight: bold; color: #c00;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 3.001]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.001$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 3.01]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.01$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid #333; padding: 6px;">$[3, 3.1]$</td>
                                    <td style="border: 1px solid #333; padding: 6px;">$0.1$</td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                    <td style="border: 1px solid #333; padding: 6px; color: #777;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Estime la velocidad instantánea de la partícula en el tiempo $t = 3$ y escriba la ecuación de la recta tangente a la curva de posición en dicho instante.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        C) Dibuja en tu calculadora la estimación de la pendiente.
                        
                    </p>
                </div>
            </div>

        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;">
                <strong>Solucionario Oficial y Esquema de Calificación (Ficha ${i})</strong>
            </p>

            <div style="margin-bottom: 20px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Ejercicio 1 [5 Puntos]:</strong><br>
                * Función: $f(x) = x^2 + ${c}x$. Punto fijo: $P(2, ${f2})$.<br>
                <strong>a) Llenado de la tabla [3 puntos]:</strong><br>
                * Para $h = -0.1$: $x = 1.9 \\implies f(1.9) = ${table1[0].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[0].m.toFixed(1)}}$<br>
                * Para $h = -0.01$: $x = 1.99 \\implies f(1.99) = ${table1[1].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[1].m.toFixed(2)}}$<br>
                * Para $h = -0.001$: $x = 1.999 \\implies f(1.999) = ${table1[2].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[2].m.toFixed(3)}}$<br>
                * Para $h = 0$: $x = 2.0 \\implies f(2) = ${f2} \\implies m_{\\text{sec}} = \\mathbf{No\\;definido\\;(\\frac{0}{0})}$<br>
                * Para $h = 0.001$: $x = 2.001 \\implies f(2.001) = ${table1[4].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[4].m.toFixed(3)}}$<br>
                * Para $h = 0.01$: $x = 2.01 \\implies f(2.01) = ${table1[5].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[5].m.toFixed(2)}}$<br>
                * Para $h = 0.1$: $x = 2.1 \\implies f(2.1) = ${table1[6].fx} \\implies m_{\\text{sec}} = \\mathbf{${table1[6].m.toFixed(1)}}$. [3 ptos]<br>
                
                <strong>b) Estimación de la pendiente instantánea [2 puntos]:</strong><br>
                * Conforme $h$ se acerca a $0$ por la izquierda ($6.9 \\to 6.99 \\to 6.999$) y por la derecha ($7.1 \\to 7.01 \\to 7.001$), los valores de $m_{\\text{sec}}$ convergen a $\\mathbf{${slope_exact1}}$.<br>
                * No es posible evaluar directamente en $h=0$ pues la división se indetermina (obteniéndose la forma indeterminada $\\frac{0}{0}$), lo que introduce la necesidad de estimarlo mediante límites. [2 puntos]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [5 Puntos]:</strong><br>
                * Función de posición: $s(t) = t^2 + ${v}t$. Punto en el instante fijo: $s(3) = ${s3}\\text{ m}$.<br>
                <strong>a) Llenado de la tabla de velocidad promedio [3 puntos]:</strong><br>
                * Para $h = -0.1 \\implies s(2.9) = ${table2[0].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[0].v_med.toFixed(1)}\\text{ m/s}}$<br>
                * Para $h = -0.01 \\implies s(2.99) = ${table2[1].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[1].v_med.toFixed(2)}\\text{ m/s}}$<br>
                * Para $h = -0.001 \\implies s(2.999) = ${table2[2].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[2].v_med.toFixed(3)}\\text{ m/s}}$<br>
                * Para $h = 0 \\implies s(3) = ${s3} \\implies v_{\\text{prom}} = \\mathbf{No\\;definida}$<br>
                * Para $h = 0.001 \\implies s(3.001) = ${table2[4].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[4].v_med.toFixed(3)}\\text{ m/s}}$<br>
                * Para $h = 0.01 \\implies s(3.01) = ${table2[5].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[5].v_med.toFixed(2)}\\text{ m/s}}$<br>
                * Para $h = 0.1 \\implies s(3.1) = ${table2[6].st} \\implies v_{\\text{prom}} = \\mathbf{${table2[6].v_med.toFixed(1)}\\text{ m/s}}$. [3 puntos]<br>
                
                <strong>b) Velocidad instantánea y recta tangente [2 puntos]:</strong><br>
                * Conforme $h \\to 0$ por ambos lados, la velocidad promedio converge a $\\mathbf{${velocity_exact}\\text{ m/s}}$ (velocidad instantánea). [1 punto]
                * Ecuación de la recta tangente en $(3, ${s3})$ con pendiente $m = ${velocity_exact}$:<br>
                $s - ${s3} = ${velocity_exact}(t - 3) \\implies \\mathbf{s = ${velocity_exact}t - ${3 * velocity_exact - s3}}$ [1 punto]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
