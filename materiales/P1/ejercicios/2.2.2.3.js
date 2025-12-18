import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.2. Modelos lineales",
    seccion: "2.2.1. Ecuaciones de la recta",
    titulo: "Crecimiento de Otate (Bambú Mexicano)",
    tipo: 1, // 1 = Abierto
    puntos: 9,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Altura inicial (cm): 20 a 40
    const H0 = Math.floor(Math.random() * 5) * 5 + 20; // 20, 25, 30, 35, 40

    // Tasa de crecimiento (cm/día): 8 a 15 (el otate crece muy rápido)
    const rate = Math.floor(Math.random() * 8) + 8; // 8 - 15

    // Altura objetivo (cm): 100 cm (1 metro) o más.
    const targetCM = 100;

    // Tiempo límite razonable para validez: ej 15-20 días.
    const t_limit = Math.floor(Math.random() * 5) + 15;

    // --- CÁLCULOS ---
    // Función H(t) = H0 + rate * t
    const H = (t) => H0 + rate * t;

    // Tabla para t = 0, 2, 4, 6
    const t_vals = [0, 2, 4, 6];
    const H_vals = t_vals.map(t => H(t));

    // Inciso D: Model connecting H and t. H = rate*t + H0.

    // Inciso E: Time to reach targetCM
    // targetCM = H0 + rate * t => t = (targetCM - H0) / rate
    const t_target = (targetCM - H0) / rate;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Ximena plantó un esqueje de <em>Otate</em> (una especie de bambú mexicano) de <strong>${H0} cm</strong> de altura en su jardín en Xalapa. Ella observó que, con el clima húmedo constante, la planta crecía <strong>${rate} cm</strong> cada día.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Copie y complete la siguiente tabla de valores que muestra la altura $H$ del Otate después de $t$ días.</span>
                    <span class="ib-mark">[2]</span>
                    <div style="display:flex; justify-content:center; margin-top:10px; margin-bottom:10px;">
                       
                    </div>
                </li>
                <center>
                 <table border="1" style="border-collapse: collapse; width: 60%; text-align: center;">
                            <tr>
                                <th style="padding: 5px; background-color: #f0f0f0;">$t$ (días)</th>
                                ${t_vals.map(t => `<td style="padding: 5px;">${t}</td>`).join('')}
                            </tr>
                            <tr>
                                <th style="padding: 5px; background-color: #f0f0f0;">$H$ (cm)</th>
                                ${t_vals.map(() => `<td style="padding: 5px;">&nbsp;</td>`).join('')}
                            </tr>
                        </table>
                </center>
                
                <li>
                    <span class="ib-texto">Dibuje la gráfica de $H$ en función de $t$ en los siguientes ejes.</span>
                    <span class="ib-mark">[2]</span>
                     
                </li>
                <center>
                        <tlacuache-milimetrado size="${8 * 40}, ${12 * 40}" cuadricula="8,12"  n="5"  stroke = ".7" stroke2 = ".1">
                        </tlacuache-milimetrado>
                    </center>

                <li>
                    <span class="ib-texto">Discuta si es razonable extender la línea para $t < 0$ y para $t > ${t_limit}$ días. A partir de esto, indique un dominio adecuado para la función $H(t)$ en este contexto de crecimiento rápido inicial.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Escriba el modelo matemático (ecuación) que relaciona $H$ con $t$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Halle, usando la gráfica u otra manera, cuánto tiempo tomará para que la planta alcance <strong>1 metro</strong> de altura. Dé su respuesta redondeada a una cifra decimal.</span>
                    <span class="ib-mark">[1]</span>
                </li>
            </ol>
            
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Tabla de valores:</strong></p>
        <table border="1" style="border-collapse: collapse; width: 50%; text-align: center; margin-bottom:10px;">
            <tr>
                <th style="padding: 5px;">$t$</th>
                ${t_vals.map(t => `<td style="padding: 5px;">${t}</td>`).join('')}
            </tr>
            <tr>
                <th style="padding: 5px;">$H$</th>
                ${H_vals.map(h => `<td style="padding: 5px;"><strong>${h}</strong></td>`).join('')}
            </tr>
        </table>
        <p>Cálculos: $H(0)=${H0}$, $H(2)=${H0}+${rate}(2)=${H(2)}$, etc.</p>
        <hr>
        
        <p><strong>b) Gráfica:</strong></p>
        <p>Una línea recta que comienza en $(0, ${H0})$ y pasa por los puntos calculados (ej. $(6, ${H(6)})$).</p>
        <div style="display:flex; justify-content:center;">
           <tlacuache-ejes size="200, 200" xlim="-1, 8" ylim="0, ${H(7)}" xlabel="t" ylabel="H">
                <tlacuache-plot x="[0, 7]" y="[${H0}, ${H(7)}]" color="blue" width="2"></tlacuache-plot>
           </tlacuache-ejes>
        </div>
        <hr>
        
        <p><strong>c) Validez y Dominio:</strong></p>
        <ul>
            <li><strong>$t < 0$:</strong> No es razonable. El tiempo $t=0$ representa el momento de la plantación o inicio de la medición. No podemos tener altura antes de plantar o registros históricos con este modelo específico.</li>
            <li><strong>$t > ${t_limit}$:</strong> No es razonable indefinidamente. El bambú no crece a velocidad constante para siempre; eventualmente desacelera al alcanzar su altura máxima.</li>
            <li><strong>Dominio:</strong> Un dominio razonable podría ser $[0, ${t_limit}]$ o $[0, \\text{altura max}]$. Formalmente: <strong>$0 \\le t \\le ${t_limit}$</strong> (o similar justificación).</li>
        </ul>
        <hr>
        
        <p><strong>d) Modelo:</strong></p>
        <p>Es una relación lineal de la forma $H = mt + c$.</p>
        <p>Gradiente $m = ${rate}$ (tasa de crecimiento).</p>
        <p>Intersección $c = ${H0}$ (altura inicial).</p>
        <p><strong>$H(t) = ${rate}t + ${H0}$</strong></p>
        <hr>
        
        <p><strong>e) Tiempo para 1 metro (${targetCM} cm):</strong></p>
        <p>$$100 = ${rate}t + ${H0}$$</p>
        <p>$$100 - ${H0} = ${rate}t$$</p>
        <p>$$t = \\frac{${targetCM - H0}}{${rate}} = ${t_target.toFixed(4)}$$</p>
        <p>Tomará aproximadamente <strong>${t_target.toFixed(1)} días</strong>.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
