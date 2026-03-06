import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Estadística descriptiva",
    seccion: "Frecuencias simples y acumuladas",
    titulo: "Análisis de polígono de frecuencias acumuladas",
    puntos: 6, // 1 + 2 + 3
};

export async function generar(i) {
    // Datos del problema (Heights of 120 girls)
    const xPoints = [150, 155, 160, 165, 170, 175, 180];
    const yPoints = [0, 10, 30, 60, 90, 110, 120];
    const totalN = 120;

    // Componente gráfico
    const grafica = `
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <tlacuache-ejes size="320,400" 
            xlabel="Altura (cm)" 
            ylabel="Frecuencia acumulada" 
            xlim="145,185" dx="5" 
            ylim="0,130" dy="10">
            <tlacuache-poli_fa x="${xPoints.join(',')}" y="${yPoints.join(',')}"></tlacuache-poli_fa>
        </tlacuache-ejes>
    </div>
    `;

    const html = `
        <p><strong>${i}.</strong> El siguiente gráfico de frecuencia acumulada muestra las alturas de ${totalN} estudiantes en una escuela.</p>
        ${grafica}
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Usando el gráfico, escribe la mediana.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Halla el rango intercuartil.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Dado que el 60% de las estudiantes son más altas que <em>a</em> cm, halla el valor de <em>a</em>.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    // Cálculos para la respuesta
    const medianaPos = totalN * 0.5; // 60
    const medianaVal = 165; // x donde y=60

    const q1Pos = totalN * 0.25; // 30
    const q1Val = 160; // x donde y=30

    const q3Pos = totalN * 0.75; // 90
    const q3Val = 170; // x donde y=90

    const iqr = q3Val - q1Val;

    // Inciso b: 60% taller than a => top 60% => bottom 40%
    const p40Pos = totalN * 0.40; // 48 is 40% of 120
    // Interpolación entre (160, 30) y (165, 60)
    // y = 30 -> x = 160
    // y = 60 -> x = 165
    // Delta y = 30, Delta x = 5. Pendiente = 6 rangos de y por 1 x.
    // Target y = 48. Distancia desde 30 es 18.
    // x = 160 + (18 / 6) = 163.
    const valA = 163;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                La mediana corresponde al 50% de los datos ($120 \\times 0.5 = 60$).<br>
                En el gráfico, $y = 60$ corresponde a $x = ${medianaVal}$.<br>
                <strong>Mediana = ${medianaVal} cm</strong>
            </li>
            <br>
            <li>
                Para el rango intercuartil (RIC) necesitamos $Q_1$ y $Q_3$.<br>
                $Q_1$ (25%): $0.25 \\times 120 = 30$. En el gráfico, $y=30 \\Rightarrow x=${q1Val}$.<br>
                $Q_3$ (75%): $0.75 \\times 120 = 90$. En el gráfico, $y=90 \\Rightarrow x=${q3Val}$.<br>
                $RIC = Q_3 - Q_1 = ${q3Val} - ${q1Val} = ${iqr}$.<br>
                <strong>RIC = ${iqr} cm</strong>
            </li>
            <br>
            <li>
                Si el 60% son más altas que $a$, entonces el 40% son más bajas o iguales a $a$.<br>
                Buscamos el percentil 40: $0.40 \\times 120 = 48$.<br>
                En el eje Y buscamos el 48. Cae entre 30 (x=160) y 60 (x=165).<br>
                Por lectura del gráfico o interpolación:<br>
                $ y=48 \\Rightarrow x \\approx 163 $.<br>
                <strong>$a = 163$</strong>
            </li>
        </ol>
    `;

    return { html, respuesta };
}
