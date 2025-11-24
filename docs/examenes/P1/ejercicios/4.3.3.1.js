import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.3. Coeficiente de correlación de rangos de Spearman",
    titulo: "Comparación Pearson vs Spearman (No lineal)",
    tipo: 1, // 1 = Abierto
    puntos: 8
};

export async function generar(i) {
    // --- DATOS ---
    // Relación monotónica creciente pero NO lineal (curva exponencial)
    // Esto hará que Spearman sea 1 (perfecto) pero Pearson sea menor a 1.
    const temp = [20, 22, 24, 26, 28, 30]; // X
    const ventas = [65, 50, 90, 130, 200, 350]; // Y
    const n = temp.length;

    // --- TABLA DE DATOS ---
    let tablaRows = '';
    for(let k=0; k<n; k++){
        tablaRows += `<tr>
            <td style="border:1px solid #333; padding:5px;">${temp[k]}</td>
            <td style="border:1px solid #333; padding:5px;">${ventas[k]}</td>
        </tr>`;
    }

    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> El dueño de un puesto de bebidas registra la temperatura máxima diaria, $T$ (°C), y el número de botellas de agua vendidas, $B$. Los datos de 6 días se muestran a continuación:</p>
            
            <div style="display:flex; justify-content:space-around; align-items:flex-start; flex-wrap:wrap;">
                <table style="border-collapse:collapse; text-align:center; margin-bottom:20px;">
                    <thead>
                        <tr style="background:#eee;">
                            <th style="border:1px solid #333; padding:5px;">Temperatura ($T$)</th>
                            <th style="border:1px solid #333; padding:5px;">Ventas ($B$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tablaRows}
                    </tbody>
                </table>

                <tlacuache-ejes 
                    size="350, 350" 
                    xlim="15, 35" 
                    ylim="0, 400"
                    dx="5" dy="50"
                    ddx="1" ddy="10"
                    xlabel="Temp (°C)"
                    ylabel="Ventas">
                    <!--tlacuache-plot 
                        x="${temp}" 
                        y="${ventas}" 
                        mark="o"-->
                    </tlacuache-plot>
                </tlacuache-ejes>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Dibuje el diagrama de dispersión de estos datos en los ejes proporcionados.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <p> </p>
                    <ol>
                        <li>
                            <span class="ib-texto">Escriba el coeficiente de correlación momento-producto de Pearson, $r$;</span>
                            <span class="ib-mark">[1]</span>
                        </li>
                        <li>
                            <span class="ib-texto">Calcule el coeficiente de correlación de rangos de Spearman, $r_s$.</span>
                            <span class="ib-mark">[3]</span>
                        </li>
                    </ol>
                </li>
                <li>
                    <span class="ib-texto">Basándose en el diagrama de dispersión, indique cuál de los dos coeficientes es más apropiado para describir la relación entre la temperatura y las ventas. Justifique su respuesta.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS SOLUCIONARIO ---
    // 1. Pearson (Aprox)
    // Usando calculadora estadística rápida para estos datos:
    // r = 0.918 (aprox)
    const r_pearson = tlacu.stat.pearson(temp, ventas).toFixed(3);

    // 2. Spearman
    // Rangos T: 1, 2, 3, 4, 5, 6 (Ya ordenados)
    // Rangos B: 1, 2, 3, 4, 5, 6 (También ordenados perfectamente, crece siempre)
    // d = 0 para todos. sum d^2 = 0.
    // rs = 1 - 0 = 1.
    const r_spearman = tlacu.stat.spearman(temp, ventas).toFixed(3);

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Los puntos deben mostrar una curva ascendente clara (forma exponencial), no una línea recta.</li>
            
            <li style="margin-top:10px;"><strong>b) (i)</strong> Usando la calculadora gráfica (Listas L1, L2 $\\to$ LinReg): <br>
            $r \\approx$ <strong>${r_pearson}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b) (ii)</strong> Rangos: <br>
            Como ambas variables aumentan consistentemente (el dato menor de T corresponde al menor de B, etc.), los rangos son idénticos. <br>
            $\\sum d^2 = 0$. <br>
            $r_s = ${r_spearman}$ <strong>$1$</strong>.</li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Decisión: <strong>Spearman ($r_s$)</strong>. <br>
            Justificación: El diagrama de dispersión muestra una relación <strong>no lineal</strong> (curva), pero es estrictamente creciente (monotónica). Pearson subestima la fuerza de la relación ($0.918$) porque busca una línea recta, mientras que Spearman detecta correctamente una relación monotónica perfecta ($1$).</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}