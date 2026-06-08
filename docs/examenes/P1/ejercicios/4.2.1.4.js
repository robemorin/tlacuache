import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.2. Estadística descriptiva",
    seccion: "4.2.1. Frecuencias simples y acumuladas",
    titulo: "Análisis de velocidad con curva de frecuencia acumulada",
    tipo: 1, // 1 = Abierto (con gráficas locales)
    puntos: 8 // Asignado: [2] para a, [3] para b, [3] para c
};

export async function generar(i) {
    // --- PRESETS DE DATOS ---
    const presets = [
        {
            id: 1,
            p: 45,
            m: 60,
            q: 70,
            y80: 74, // Frecuencia acumulada correspondiente a x = 80
            sobreLimite: 6, // 80 - 74
            porcentaje: "7.5\\%",
            // Intervalo 1: [0, 45], centro 22.5
            // Intervalo 2: [45, 60], centro 52.5
            // Intervalo 3: [60, 70], centro 65.0
            // Intervalo 4: [70, 100], centro 85.0
            calculoMedia: "\\frac{20 \\cdot 22.5 + 20 \\cdot 52.5 + 20 \\cdot 65.0 + 20 \\cdot 85.0}{80} = \\frac{450 + 1050 + 1300 + 1700}{80} = \\frac{4500}{80}",
            media: "56.25"
        },
        {
            id: 2,
            p: 40,
            m: 58,
            q: 72,
            y80: 72,
            sobreLimite: 8,
            porcentaje: "10\\%",
            // Intervalo 1: [0, 40], centro 20.0
            // Intervalo 2: [40, 58], centro 49.0
            // Intervalo 3: [58, 72], centro 65.0
            // Intervalo 4: [72, 100], centro 86.0
            calculoMedia: "\\frac{20 \\cdot 20 + 20 \\cdot 49 + 20 \\cdot 65 + 20 \\cdot 86}{80} = \\frac{400 + 980 + 1300 + 1720}{80} = \\frac{4400}{80}",
            media: "55"
        },
        {
            id: 3,
            p: 44,
            m: 62,
            q: 74,
            y80: 70,
            sobreLimite: 10,
            porcentaje: "12.5\\%",
            // Intervalo 1: [0, 44], centro 22.0
            // Intervalo 2: [44, 62], centro 53.0
            // Intervalo 3: [62, 74], centro 68.0
            // Intervalo 4: [74, 100], centro 87.0
            calculoMedia: "\\frac{20 \\cdot 22 + 20 \\cdot 53 + 20 \\cdot 68 + 20 \\cdot 87}{80} = \\frac{440 + 1060 + 1360 + 1740}{80} = \\frac{4600}{80}",
            media: "57.5"
        }
    ];

    const pr = presets[Math.floor(Math.random() * presets.length)];

    const xPoints = [0, pr.p, pr.m, pr.q, 80, 100];
    const yPoints = [0, 20, 40, 60, pr.y80, 80];

    // Gráfico local con tlacuache-ejes y tlacuache-poli_fa
    const grafica = `
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <tlacuache-ejes size="320,400" 
            xlabel="Velocidad (km/h)" 
            ylabel="Frecuencia acumulada" 
            xlim="0,110" dx="10" 
            ylim="0,90" dy="10">
            <tlacuache-poli_fa x="${xPoints.join(',')}" y="${yPoints.join(',')}"></tlacuache-poli_fa>
        </tlacuache-ejes>
    </div>
    `;

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El siguiente gráfico de frecuencia acumulada representa las velocidades, en kilómetros por hora ($\\text{km/h}$), de $80$ coches que pasaron por una sección de una carretera de velocidad controlada.</p>
            
            ${grafica}

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el porcentaje de estos coches que superan el límite de velocidad de $80\\text{ km/h}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>

                <p>Considere la tabla de frecuencias para datos agrupados que se ha construido utilizando la curva de frecuencia acumulada anterior:</p>

                <table style="margin: 15px auto; border-collapse: collapse; text-align: center; border: 1px solid #000; width: 90%; max-width: 500px;">
                    <thead>
                        <tr style="background-color: #f2f2f2; border-bottom: 1px solid #000;">
                            <th style="border: 1px solid #000; padding: 8px;">Velocidad ($x$) ($\\text{km/h}$)</th>
                            <th style="border: 1px solid #000; padding: 8px;">$0 < x \\le p$</th>
                            <th style="border: 1px solid #000; padding: 8px;">$p < x \\le m$</th>
                            <th style="border: 1px solid #000; padding: 8px;">$m < x \\le q$</th>
                            <th style="border: 1px solid #000; padding: 8px;">$q < x \\le 100$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Número de coches</td>
                            <td style="border: 1px solid #000; padding: 8px;">$20$</td>
                            <td style="border: 1px solid #000; padding: 8px;">$20$</td>
                            <td style="border: 1px solid #000; padding: 8px;">$20$</td>
                            <td style="border: 1px solid #000; padding: 8px;">$20$</td>
                        </tr>
                    </tbody>
                </table>

                <li>
                    <span class="ib-texto">Halle el valor de:</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman; padding-left: 20px;">
                        <li><span class="ib-texto">$p$.</span></li>
                        <li><span class="ib-texto">$m$.</span></li>
                        <li><span class="ib-texto">$q$.</span></li>
                    </ol>
                    <span class="ib-mark">[3]</span>
                </li>

                <li>
                    <span class="ib-texto">A partir de lo anterior, calcule una estimación de la velocidad media de estos coches.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
        </div>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="20" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>a)</strong> Hallar el porcentaje de coches que superan los $80\\text{ km/h}$: <br>
                A partir de la gráfica de frecuencia acumulada, para una velocidad de $80\\text{ km/h}$ en el eje horizontal ($x = 80$), la frecuencia acumulada correspondiente en el eje vertical es de $${pr.y80}$ coches. <br>
                Esto indica que $${pr.y80}$ coches viajaban a $80\\text{ km/h}$ o menos. <br>
                El número de coches que superan los $80\\text{ km/h}$ es: $80 - ${pr.y80} = ${pr.sobreLimite}$ coches. <br>
                El porcentaje correspondiente es: <br>
                $\\text{Porcentaje} = \\frac{${pr.sobreLimite}}{80} \\times 100\\% = $ <strong>$${pr.porcentaje}$</strong>.
            </li>
            <br>
            <li><strong>b)</strong> Hallar $p$, $m$ y $q$: <br>
                Dado que los coches están divididos en 4 intervalos de frecuencias iguales ($20$ en cada uno), los valores límites corresponden a los cuartiles de la distribución ($Q_1$, $Q_2$ y $Q_3$):
                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                    <li>$p$ es el primer cuartil ($Q_1$), correspondiente a una frecuencia acumulada de $20$: <br>
                        $p = $ <strong>$${pr.p}$</strong>.</li>
                    <li style="margin-top: 5px;">$m$ es la mediana ($Q_2$), correspondiente a una frecuencia acumulada de $40$: <br>
                        $m = $ <strong>$${pr.m}$</strong>.</li>
                    <li style="margin-top: 5px;">$q$ es el tercer cuartil ($Q_3$), correspondiente a una frecuencia acumulada de $60$: <br>
                        $q = $ <strong>$${pr.q}$</strong>.</li>
                </ol>
            </li>
            <br>
            <li><strong>c)</strong> Estimar la velocidad media usando la tabla de datos agrupados: <br>
                Utilizamos los puntos medios ($x_i$) de cada intervalo de velocidad y las frecuencias correspondientes ($f_i = 20$): <br>
                * Intervalo $0 < x \\le ${pr.p}$: Punto medio $x_1 = \\frac{0 + ${pr.p}}{2} = ${(pr.p / 2).toFixed(1)}$. <br>
                * Intervalo $${pr.p} < x \\le ${pr.m}$: Punto medio $x_2 = \\frac{${pr.p} + ${pr.m}}{2} = ${( (pr.p + pr.m) / 2 ).toFixed(1)}$. <br>
                * Intervalo $${pr.m} < x \\le ${pr.q}$: Punto medio $x_3 = \\frac{${pr.m} + ${pr.q}}{2} = ${( (pr.m + pr.q) / 2 ).toFixed(1)}$. <br>
                * Intervalo $${pr.q} < x \\le 100$: Punto medio $x_4 = \\frac{${pr.q} + 100}{2} = ${( (pr.q + 100) / 2 ).toFixed(1)}$. <br>
                Velocidad media estimada $\\mu = \\frac{\\sum f_i x_i}{\\sum f_i}$: <br>
                $\\mu = ${pr.calculoMedia} = $ <strong>$${pr.media}\\text{ km/h}$</strong>.
            </li>
        </ul>
    `;

    return { html, respuesta: respuestaHTML };
}
