import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Chi-cuadrado",
    titulo: "Prueba Chi-cuadrado - Frecuencias Esperadas y Conclusión",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES DINÁMICAS (Inventadas amigables) ---
    const total_entrevistados = 120;
    const n_filas = 2; // Ejemplo: Género (Hombre, Mujer)
    const n_columnas = 3; // Ejemplo: Deporte favorito (Fútbol, Baloncesto, Natación)

    // Grados de libertad
    const gl = (n_filas - 1) * (n_columnas - 1); // (2-1)*(3-1) = 2

    // Datos para la tabla de contingencia ficticia
    const fila_total = 60; // Hombres en total
    const col_total = 40;  // Amantes del Fútbol en total

    const frec_esperada = (fila_total * col_total) / total_entrevistados; // (60*40)/120 = 20

    // Valores estadísticos
    const chi_calc = 6.4;
    const chi_crit = 5.991; // Crítico para gl=2 al 5%

    const r1 = "Hombres";
    const c1 = "Fútbol";

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> Un investigador escolar realiza una encuesta a $${total_entrevistados}$ estudiantes para determinar si existe independencia entre el género del estudiante y su deporte favorito. Los géneros registrados fueron $${n_filas}$ (Hombre, Mujer) y las opciones de deporte fueron $${n_columnas}$ (Fútbol, Baloncesto, Natación).</p>
            <p>El investigador organiza los datos obtenidos en una tabla de contingencia. Del total, hay $${fila_total}$ hombres. Además, $${col_total}$ estudiantes (independientemente de su género) eligieron el Fútbol como deporte favorito.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba la hipótesis nula ($H_0$) para esta prueba de Chi-cuadrado.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="30"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Muestre cómo se calcularía la frecuencia esperada para la celda correspondiente a "Hombres" que prefieren el "Fútbol".</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="5" color="gray" alto="30"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle el número de grados de libertad correspondientes a esta prueba.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="30"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Tras completar los cálculos, se obtiene un estadístico $ \\chi^2_{calc} $ = ${chi_calc}. El valor crítico para esta prueba al nivel de significación del $5\\%$ es $ \\chi^2_{crit} $ = ${chi_crit}.<br> Indique la conclusión de la prueba, justificando claramente su respuesta.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="4" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $H_0$: El deporte favorito es <strong>independiente</strong> del género.</li>
            <br>
            <li><strong>b)</strong> $\\text{Frecuencia Esperada} = \\frac{\\text{Total Fila} \\times \\text{Total Columna}}{\\text{Gran Total}}$ <br>
                $\\text{Frecuencia Esperada} = \\frac{${fila_total} \\times ${col_total}}{${total_entrevistados}} = \\frac{${fila_total * col_total}}{${total_entrevistados}} = $ <strong>${frec_esperada}</strong>
            </li>
            <br>
            <li><strong>c)</strong> $gl = (\\text{filas} - 1)(\\text{columnas} - 1)$ <br>
                $gl = (${n_filas} - 1)(${n_columnas} - 1) = $ <strong>${gl}</strong>
            </li>
            <br>
            <li><strong>d)</strong> Como $${chi_calc} > ${chi_crit}$ (es decir, $\\chi^2_{calc} > \\chi^2_{crit}$), el estadístico cae en la región de rechazo.<br>
                Por lo tanto, se <strong>rechaza $H_0$</strong>. Existe evidencia significativa de que el deporte favorito no es independiente del género.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
