import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Estadística descriptiva",
    seccion: "Frecuencias simples y acumuladas",
    titulo: "Velocidad de coches en carretera",
    puntos: 8, // 2 + 3 + 3
};

export async function generar(i) {
    const xPoints = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const yPoints = [0, 2, 5, 9, 16, 30, 50, 67, 75, 79, 80];

    const grafica = `
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <tlacuache-ejes size="320,480" 
            xlabel="Velocidad (km/h)" 
            ylabel="Frecuencia acumulada" 
            xlim="0,100" dx="10" 
            ylim="0,80" dy="10">
            <tlacuache-poli_fa x="${xPoints.join(',')}" y="${yPoints.join(',')}"></tlacuache-poli_fa>
        </tlacuache-ejes>
    </div>
    `;

    const html = `
        <p><strong>${i}.</strong> La curva de frecuencia acumulada muestra las velocidades, en kilómetros por hora, de 80 coches que pasan por una carretera.</p>
        ${grafica}
        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">Calcule el porcentaje de estos coches que superan el límite de velocidad de 80 km/h.</span>
                <span class="ib-mark">[2]</span>
                
                </li>
            
                <span class="ib-texto">Considere la tabla de frecuencias para datos agrupados que se ha construido utilizando la curva de frecuencia acumulada.</span>
                <br>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table border="1" style="border-collapse: collapse; text-align: center; width: 80%;">
                        <tr>
                            <td style="padding: 8px;">Velocidad ($x$) (km/h)</td>
                            <td style="padding: 8px;">$0 < x \\le p$</td>
                            <td style="padding: 8px;">$p < x \\le m$</td>
                            <td style="padding: 8px;">$m < x \\le q$</td>
                            <td style="padding: 8px;">$q < x \\le 100$</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;">Número de coches</td>
                            <td style="padding: 8px;">20</td>
                            <td style="padding: 8px;">20</td>
                            <td style="padding: 8px;">20</td>
                            <td style="padding: 8px;">20</td>
                        </tr>
                    </table>
                </div>
                <li>
                <span class="ib-texto">Halle el valor de:</span>
                <ol class="ib-lista" type="i">
                    <li><span class="ib-texto">$p$.</span></li>
                    <li><span class="ib-texto">$m$.</span></li>
                    <li><span class="ib-texto">$q$.</span><span class="ib-mark" style="float: right;">[3]</span></li>
                </ol>
            </li><li>
                <span class="ib-texto">A partir de lo anterior, calcule una estimación de la media de la velocidad de estos coches.</span>
                <span class="ib-mark">[3]</span>
            </li>
        </ol>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="20" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Usando el gráfico, a $80\\text{ km/h}$ la frecuencia acumulada es aproximadamente $74$.<br>
                El número de coches que superan los $80\\text{ km/h}$ es $80 - 74 = 6$.<br>
                Porcentaje $= \\frac{6}{80} \\times 100\\% = 7.5\\%$
            </li>
            <br>
            <li>
                Buscamos los valores de $x$ para las frecuencias acumuladas de $20$, $40$ y $60$.<br>
                (i) Para una frecuencia acumulada de $20$, el valor de $x$ correspondiente es $p \\approx 43$.<br>
                (ii) Para una frecuencia acumulada de $40$, el valor de $x$ correspondiente es $m \\approx 55$.<br>
                (iii) Para una frecuencia acumulada de $60$, el valor de $x$ correspondiente es $q \\approx 66$.<br>
            </li>
            <br>
            <li>
                Utilizamos los puntos medios de cada intervalo para estimar la media:<br>
                Marca de clase $1$ ($0$ a $43$): $\\frac{0+43}{2} = 21.5$<br>
                Marca de clase $2$ ($43$ a $55$): $\\frac{43+55}{2} = 49$<br>
                Marca de clase $3$ ($55$ a $66$): $\\frac{55+66}{2} = 60.5$<br>
                Marca de clase $4$ ($66$ a $100$): $\\frac{66+100}{2} = 83$<br>
                <br>
                Media $\\approx \\frac{20(21.5) + 20(49) + 20(60.5) + 20(83)}{80}$<br>
                Media $\\approx \\frac{430 + 980 + 1210 + 1660}{80}$<br>
                Media $\\approx \\frac{4280}{80} = 53.5\\text{ km/h}$
            </li>
        </ol>
    `;

    return { html, respuesta };
}