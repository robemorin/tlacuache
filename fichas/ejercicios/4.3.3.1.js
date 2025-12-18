import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.3. Correlación y regresión",
    seccion: "4.3.3. Coeficiente de correlación de rangos de Spearman",
    titulo: "Elección de Correlación (Concepto)",
    puntos: 4,
};

export async function generar(i) {
    // Escenario aleatorio: 0 = Outliers, 1 = No lineal (monótono)
    const tipo = Math.random() > 0.5 ? 0 : 1;

    let descripcion = "";
    let justificacion = "";

    if (tipo === 0) {
        descripcion = "Un investigador está analizando la relación entre dos variables. Al graficar los datos en un diagrama de dispersión, observa una tendencia lineal general, pero hay dos puntos de datos atípicos (outliers) significativos que están muy alejados del resto de los datos.";
        justificacion = "El coeficiente de correlación de rangos de Spearman es más apropiado porque es menos sensible a los valores atípicos (outliers) que el coeficiente de Pearson. Pearson se ve fuertemente afectado por valores extremos.";
    } else {
        descripcion = "Un biólogo estudia el crecimiento de una población de bacterias en función de la temperatura. El diagrama de dispersión muestra que a medida que aumenta la temperatura, la población aumenta, pero la relación es claramente curva (exponencial), no una línea recta.";
        justificacion = "El coeficiente de correlación de rangos de Spearman es más apropiado porque mide la fuerza de una relación monótona (creciente o decreciente) independientemente de si es lineal o no. Pearson solo mide relaciones lineales.";
    }

    const html = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> ${descripcion}</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Indique cuál coeficiente de correlación (Pearson o Spearman) sería más adecuado para analizar la fuerza de la relación entre estas dos variables.</span>
                    <span class="ib-mark">[1]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Justifique su respuesta.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> Coeficiente de correlación de rangos de Spearman ($r_s$).</li>
            <li> ${justificacion}</li>
        </ul>
    `;

    return { html, respuesta };
}
