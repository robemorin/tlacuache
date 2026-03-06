import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Estadística descriptiva",
    seccion: "Histogramas y diagramas de caja y bigotes",
    titulo: "Lectura de diagrama de caja y bigotes",
    puntos: 3,
};

export async function generar(i) {
    const min = 1;
    const q1 = 2;
    const median = 3;
    const q3 = 6;
    const max = 7;
    const totalStudents = 32;

    const qValues = [min, q1, median, q3, max];
    const limString = "0,8,1";

    const numStudentsAbove6 = Math.round(totalStudents * 0.25);

    const html = `
        <p><strong>${i}.</strong> El siguiente diagrama de caja y bigotes representa las calificaciones obtenidas por ${totalStudents} estudiantes.</p>
        <div style="display: flex; justify-content: center; margin: 20px 0;">
            <tlacuache-cuartil q="[${qValues.join(',')}]" lim="${limString}" dim="150,400" xlabel='Calificación'></tlacuache-cuartil>
        </div>
        <ol class="ib-lista" >
            <li><span class="ib-texto">Escribe el valor de la mediana de las calificaciones.</span><span class="ib-mark">[1]</span></li>
            <li><span class="ib-texto">Escribe el valor del cuartil superior.</span><span class="ib-mark">[1]</span></li>
            <li><span class="ib-texto">Estima el número de estudiantes que obtuvieron una calificación mayor que ${q3}.</span>     <span class="ib-mark">[1]</span></li>
        </ol>
        <tlacuache-renglon n="18" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol type="a">
            <li>La mediana se identifica por la línea vertical dentro de la caja. Valor: <strong>${median}</strong>.</li>
            <li>El cuartil superior (Q3) corresponde al borde derecho de la caja. Valor: <strong>${q3}</strong>.</li>
            <li>
                Las calificaciones mayores a ${q3} corresponden al bigote superior, que representa el 25% superior de los datos.
                <br>
                $$ 0.25 \\times ${totalStudents} = ${numStudentsAbove6} $$
                <br>
                Por lo tanto, se estima que <strong>${numStudentsAbove6} estudiantes</strong> obtuvieron una calificación mayor que ${q3}.
            </li>
        </ol>
    `;

    return { html, respuesta };
}
