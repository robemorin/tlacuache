import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.3. Probabilidad condicionada",
    titulo: "Probabilidad en tabla de contingencia (Tenis)",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- DATOS DE LA TABLA ---
    const m_left = 3;
    const m_right = 29;
    const m_total = m_left + m_right; // 32

    const f_left = 2;
    const f_right = 16;
    const f_total = f_left + f_right; // 18

    const t_left = m_left + f_left;   // 5
    const t_right = m_right + f_right;// 45
    const grand_total = 50;

    // --- HTML DE LA TABLA DE DATOS ---
    const tablaHTML = `
        <table style="margin: 20px auto; border-collapse: collapse; text-align: center; font-family: sans-serif; width: 80%; max-width: 500px;">
            <thead>
                <tr style="background-color: #f2f2f2; border: 1px solid #000;">
                    <th style="border: 1px solid #000; padding: 8px;"></th> <th style="border: 1px solid #000; padding: 8px;">Zurdo<br>(Left handed)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Diestro<br>(Right handed)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 6px; font-weight:bold;">Hombre</td>
                    <td style="border: 1px solid #000; padding: 6px;">${m_left}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${m_right}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${m_total}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 6px; font-weight:bold;">Mujer</td>
                    <td style="border: 1px solid #000; padding: 6px;">${f_left}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${f_right}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${f_total}</td>
                </tr>
                <tr style="font-weight: bold; background-color: #fafafa;">
                    <td style="border: 1px solid #000; padding: 6px;">Total</td>
                    <td style="border: 1px solid #000; padding: 6px;">${t_left}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${t_right}</td>
                    <td style="border: 1px solid #000; padding: 6px;">${grand_total}</td>
                </tr>
            </tbody>
        </table>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La siguiente tabla muestra el número de tenistas zurdos y diestros en una muestra de ${grand_total} hombres y mujeres.</p>
            
            ${tablaHTML}

            <p>Si se selecciona un tenista al azar del grupo, halle la probabilidad de que el jugador sea:</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">hombre y zurdo;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">diestro;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">diestro, dado que el jugador seleccionado es mujer.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS Y RESPUESTAS ---

    // a) P(Hombre y Zurdo) = Intersección / Total Global
    const probA = `${m_left}/${grand_total}`;
    const valA = m_left / grand_total;

    // b) P(Diestro) = Total Diestros / Total Global
    const probB = `${t_right}/${grand_total}`; // 45/50
    const probBSimpl = `9/10`;
    const valB = 0.9;

    // c) P(Diestro | Mujer) = (Mujer y Diestra) / Total Mujeres
    // Condición reduce el espacio muestral a la fila "Mujer" (18)
    const probC = `${f_right}/${f_total}`; // 16/18
    const probCSimpl = `8/9`;
    const valC = (f_right / f_total).toFixed(3);

    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Intersección de fila "Hombre" y columna "Zurdo": <br>
                Casos favorables = ${m_left}. Casos totales = ${grand_total}. <br>
                $P(H \\cap Z) = \\frac{${m_left}}{${grand_total}} = $ <strong>$${valA}$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Total de jugadores diestros (sin importar género): <br>
                Columna "Diestro" total = ${t_right}. <br>
                $P(D) = \\frac{${t_right}}{${grand_total}} = $ <strong>$\\frac{9}{10}$</strong> ($0.9$).
            </li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Probabilidad condicionada ($D | M$): <br>
                "Dado que es mujer" $\\rightarrow$ Nos fijamos solo en la fila de Mujeres (Total = ${f_total}). <br>
                De esas ${f_total} mujeres, ${f_right} son diestras. <br>
                $P(D | M) = \\frac{16}{18} = $ <strong>$\\frac{8}{9}$</strong> (aprox $${valC}$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}