import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Estadística descriptiva",
    seccion: "Frecuencias simples y acumuladas",
    titulo: "Construcción de frecuencia acumulada y percentiles",
    puntos: 7, // 2 + 2 + 3
};

export async function generar(i) {
    const totalN = 80;
    // Datos: Tiempo en minutos
    const ranges = [
        "0 < t ≤ 20",
        "20 < t ≤ 40",
        "40 < t ≤ 60",
        "60 < t ≤ 80",
        "80 < t ≤ 100"
    ];
    const upperBounds = [20, 40, 60, 80, 100];

    const f1 = Math.round(6 + Math.random() * 4);
    const f2 = Math.round(14 + Math.random() * 4);
    const f3 = Math.round(17 + Math.random() * 4);
    const f4 = Math.round(14 + Math.random() * 4);
    const f5 = Math.round(6 + Math.random() * 4);
    const Ntotal = f1 + f2 + f3 + f4 + f5;
    const frequencies = [f1, f2, f3, f4, f5];

    // Acumuladas: 8, 23, 55, 73, 80

    // Tabla de frecuencias HTML
    let tableFreq = `<table style="width:60%; margin: 10px auto; border-collapse: collapse; text-align: center;" border="1">
        <tr style="background-color: #f0f0f0;">
            <th style="padding: 5px;">Tiempo $t$ (min)</th>
            <th style="padding: 5px;">Frecuencia ($f$)</th>
        </tr>`;

    ranges.forEach((r, idx) => {
        tableFreq += `<tr><td style="padding: 5px;">${r}</td><td style="padding: 5px;">${frequencies[idx]}</td></tr>`;
    });
    tableFreq += `</table>`;




    const html = `
        <p><strong>${i}.</strong> Se registró el tiempo $t$ (en minutos) que ${totalN} estudiantes dedicaron a estudiar para un examen. Los resultados se muestran en la siguiente tabla:</p>
        ${tableFreq}
        
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Completa la tabla de frecuencias acumuladas.</span>
                <span class="ib-mark">[2]</span>
                
            </li>
            <tlacuache-ejes size="320,480" xlabel="" ylabel="Frecuencias Acumuladas"  xlim="0,100" dx="10" ylim="0,${Math.round(Ntotal / 10) * 10 + 10}" dy="20" >
                    <!--tlacuache-poli_fa x="0,20,40,60,80,100" y="0,${f1},${f1 + f2},${f1 + f2 + f3},${f1 + f2 + f3 + f4},${f1 + f2 + f3 + f4 + f5}"></tlacuache-poli_fa-->
                </tlacuache-ejes>
            
            <li>
                <span class="ib-texto">Estima el valor del percentil 60 ($P_{60}$).</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcula el porcentaje de estudiantes que estudiaron más de 70 minutos.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    // Cálculos
    // Percentil 60: 0.60 * 80 = 48.
    // Acumulados: 8 (20), 23 (40), 55 (60).
    // El valor 48 cae en el intervalo 40 < t <= 60.
    // Limite inferior L = 40. Frec acumulada anterior Fa = 23. Frecuencia del intervalo f = 32.
    // Posicion relativa = 48 - 23 = 25.
    // Fraccion = 25 / 32. Amplitud w = 20.
    // P60 = 40 + (25/32)*20 = 40 + 15.625 = 55.625.
    const p60Pos = totalN * 0.60;
    const p60Val = 40 + ((p60Pos - 23) / 32) * 20;

    // Mas de 70 minutos.
    // Intervalo involucrado: 60 < t <= 80. Frec = 18. Rango = 20.
    // 70 es el punto medio (60 + 10).
    // Asumiendo distribución uniforme, la mitad de 18 están por encima de 70 (9 estudiantes).
    // + Todos los de 80 < t <= 100 (7 estudiantes).
    // Total > 70 = 9 + 7 = 16.
    // Porcentaje = (16 / 80) * 100 = 20%.
    const numAbove70 = (18 / 2) + 7;
    const percentage = (numAbove70 / totalN) * 100;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                <strong>Tabla de frecuencias acumuladas:</strong><br>
                $t \\leq 20$: 8<br>
                $t \\leq 40$: 8 + 15 = 23<br>
                $t \\leq 60$: 23 + 32 = 55<br>
                $t \\leq 80$: 55 + 18 = 73<br>
                $t \\leq 100$: 73 + 7 = 80
            </li>
            <br>
            <li>
                Para el percentil 60 ($P_{60}$):<br>
                Posición = $0.60 \\times 80 = 48$.<br>
                El valor 48 cae en el intervalo $40 < t \\leq 60$ (Frecuencia 32, Acumulada anterior 23).<br>
                Interpolando linealmente:<br>
                $$ P_{60} = 40 + \\frac{48 - 23}{32} \\times 20 $$
                $$ P_{60} = 40 + \\frac{25}{32} \\times 20 $$
                $$ P_{60} \\approx 55.6 \\text{ min} $$
            </li>
            <br>
            <li>
                Estudiantes con $t > 70$:<br>
                En el intervalo $60 < t \\leq 80$ (18 estudiantes), 70 es el punto medio, así que asumimos nitad por encima.<br>
                Estudiantes en $(70, 80] = \\frac{18}{2} = 9$.<br>
                Estudiantes en $(80, 100] = 7$.<br>
                Total $> 70 = 9 + 7 = 16$.<br>
                Porcentaje: $\\frac{16}{80} \\times 100 \\% = 20\\%$.
            </li>
        </ol>
    `;

    return { html, respuesta };
}
