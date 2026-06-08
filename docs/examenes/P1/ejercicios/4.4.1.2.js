import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.1. Espacio muestral y sucesos",
    titulo: "Distribución de probabilidad de diferencia en dos dados/ruletas",
    tipo: 1, // 1 = Abierto
    puntos: 8 // Asignado: [2] para a, [2] para b, [2] para c, [2] para d
};

export async function generar(i) {
    // --- VARIABLES DINÁMICAS ---
    const tipoContexto = Math.random() < 0.5 ? 'dados' : 'ruletas';

    let enunciadoContexto = '';
    let fraseObtenidos = '';
    if (tipoContexto === 'dados') {
        enunciadoContexto = 'Se tiran dos dados de seis caras no trucados (uno azul y otro amarillo). Se anotan los números obtenidos en las caras superiores.';
        fraseObtenidos = 'que han salido en los dados';
    } else {
        enunciadoContexto = 'Se hacen girar dos ruletas equilibradas de seis sectores circulares iguales, numerados del 1 al 6. Se anotan los números obtenidos.';
        fraseObtenidos = 'obtenidos en las ruletas';
    }

    // Elegir cuál celda de la tabla pre-llenar (2, 3 o 4)
    const val_ejemplo = [2, 3, 4][Math.floor(Math.random() * 3)];
    const prob_ejemplo_str = val_ejemplo === 2 ? '8/36' : (val_ejemplo === 3 ? '6/36' : '4/36');

    // Configurar inciso d (condicional)
    const cond_impar = Math.random() < 0.5;
    let fraseCondicion = '';
    let val_d_cond = 0;
    let total_casos_cond = 0;
    let casos_favorables_cond = 0;
    let prob_d_simplificada = '';

    if (cond_impar) {
        fraseCondicion = 'es un número impar';
        // Elegir preguntar por X = 1, 3 o 5
        val_d_cond = [1, 3, 5][Math.floor(Math.random() * 3)];
        total_casos_cond = 18; // 10 (para 1) + 6 (para 3) + 2 (para 5)
        casos_favorables_cond = val_d_cond === 1 ? 10 : (val_d_cond === 3 ? 6 : 2);
        prob_d_simplificada = val_d_cond === 1 ? '\\frac{5}{9}' : (val_d_cond === 3 ? '\\frac{1}{3}' : '\\frac{1}{9}');
    } else {
        fraseCondicion = 'es un número par diferente de cero';
        // Elegir preguntar por X = 2 o 4
        val_d_cond = [2, 4][Math.floor(Math.random() * 2)];
        total_casos_cond = 12; // 8 (para 2) + 4 (para 4)
        casos_favorables_cond = val_d_cond === 2 ? 8 : 4;
        prob_d_simplificada = val_d_cond === 2 ? '\\frac{2}{3}' : '\\frac{1}{3}';
    }

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> ${enunciadoContexto}</p>
            <p>Sea la variable aleatoria $X$ la diferencia absoluta entre los números ${fraseObtenidos}.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle:</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman; padding-left: 20px;">
                        <li><span class="ib-texto">$P(X = 0)$.</span></li>
                        <li><span class="ib-texto">$P(X = 5)$.</span></li>
                    </ol>
                    <span class="ib-mark">[2]</span>
                </li>
                

                <li>
                    <span class="ib-texto">Complete la siguiente tabla para mostrar la distribución de probabilidad de $X$.</span>
                    <span class="ib-mark">[2]</span>
                    
                </li>
                <div style="overflow-x: auto; margin: 15px 0;">
                        <table style="margin: 10px auto; border-collapse: collapse; text-align: center; border: 1px solid #000; width: 90%; max-width: 450px;">
                            <thead>
                                <tr style="background-color: #f9f9f9; border-bottom: 1px solid #000;">
                                    <th style="border: 1px solid #000; padding: 8px;">$x$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$0$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$1$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$2$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$3$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$4$</th>
                                    <th style="border: 1px solid #000; padding: 8px;">$5$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">$P(X = x)$</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 0 ? '$\\frac{6}{36}$' : ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 1 ? '$\\frac{10}{36}$' : ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 2 ? '$\\frac{8}{36}$' : ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 3 ? '$\\frac{6}{36}$' : ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 4 ? '$\\frac{4}{36}$' : ''}</td>
                                    <td style="border: 1px solid #000; padding: 8px;">${val_ejemplo === 5 ? '$\\frac{2}{36}$' : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                <li>
                    <span class="ib-texto">Calcule la esperanza matemática $E(X)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                

                <li>
                    <span class="ib-texto">Sabiendo que la diferencia entre los números ${fraseObtenidos} ${fraseCondicion}, halle la probabilidad de que $X = ${val_d_cond}$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                
            </ol>
        </div>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="20" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    // --- SOLUCIONARIO ---
    const tablaResueltaHTML = `
        <table style="margin: 10px auto; border-collapse: collapse; text-align: center; border: 1px solid #000; width: 90%; max-width: 450px;">
            <thead>
                <tr style="background-color: #f9f9f9; border-bottom: 1px solid #000;">
                    <th style="border: 1px solid #000; padding: 8px;">$x$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$0$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$1$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$2$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$3$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$4$</th>
                    <th style="border: 1px solid #000; padding: 8px;">$5$</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">$P(X = x)$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{6}{36}$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{10}{36}$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{8}{36}$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{6}{36}$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{4}{36}$</td>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold; color: blue;">$\\frac{2}{36}$</td>
                </tr>
            </tbody>
        </table>
    `;

    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>a)</strong> Total de combinaciones posibles = $6 \\times 6 = 36$.
                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                    <li>Para $X = 0$, los casos favorables son los dobles: $\\{(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)\\}$ (6 casos). <br>
                        $P(X = 0) = \\frac{6}{36}$ (o $\\frac{1}{6}$).</li>
                    <li style="margin-top: 5px;">Para $X = 5$, los casos favorables son $\\{(1,6), (6,1)\\}$ (2 casos). <br>
                        $P(X = 5) = \\frac{2}{36}$ (o $\\frac{1}{18}$).</li>
                </ol>
            </li>
            
            <li style="margin-top: 15px;"><strong>b)</strong> Distribución completa:
                ${tablaResueltaHTML}
                <em>(Nota: La tabla original mostraba la probabilidad de $X = ${val_ejemplo}$ como $\\frac{${prob_ejemplo_str}}$).</em>
            </li>

            <li style="margin-top: 15px;"><strong>c)</strong> Esperanza matemática $E(X)$: <br>
                $E(X) = \\sum x \\cdot P(X = x)$ <br>
                $= 0\\left(\\frac{6}{36}\\right) + 1\\left(\\frac{10}{36}\\right) + 2\\left(\\frac{8}{36}\\right) + 3\\left(\\frac{6}{36}\\right) + 4\\left(\\frac{4}{36}\\right) + 5\\left(\\frac{2}{36}\\right)$ <br>
                $= \\frac{0 + 10 + 16 + 18 + 16 + 10}{36} = \\frac{70}{36} = \\frac{35}{18} \\approx$ <strong>$1.94$</strong> (o $1.944...$).
            </li>

            <li style="margin-top: 15px;"><strong>d)</strong> Probabilidad condicional: <br>
                Queremos hallar $P(X = ${val_d_cond} \\mid \\text{condición})$. <br>
                La condición es que la diferencia ${fraseCondicion}. <br>
                ${cond_impar ? `
                Diferencias impares: $X \\in \\{1, 3, 5\\}$. <br>
                Casos totales bajo esta condición = $10 + 6 + 2 = 18$ casos. <br>
                Casos favorables ($X = ${val_d_cond}$) = $${casos_favorables_cond}$ casos. <br>
                ` : `
                Diferencias pares mayores a cero: $X \\in \\{2, 4\\}$. <br>
                Casos totales bajo esta condición = $8 + 4 = 12$ casos. <br>
                Casos favorables ($X = ${val_d_cond}$) = $${casos_favorables_cond}$ casos. <br>
                `}
                Probabilidad = $\\frac{${casos_favorables_cond}}{${total_casos_cond}} =$ <strong>$${prob_d_simplificada}$</strong> (aprox. $${(casos_favorables_cond / total_casos_cond).toFixed(3)}$).
            </li>
        </ul>
    `;

    return { html, respuestaHTML };
}
