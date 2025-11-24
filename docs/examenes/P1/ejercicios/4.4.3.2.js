import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.3. Probabilidad condicionada",
    titulo: "Admisiones Universitarias (Tabla)",
    tipo: 1,
    puntos: 6
};

export async function generar(i) {
    // 1. Generar datos aleatorios para la tabla
    // Arts: Accepted (10-25), Rejected (15-30)
    const arts_acc = Math.floor(Math.random() * 16) + 10;
    const arts_rej = Math.floor(Math.random() * 16) + 15;

    // Sciences: Accepted (20-35), Rejected (50-70)
    const sci_acc = Math.floor(Math.random() * 16) + 20;
    const sci_rej = Math.floor(Math.random() * 21) + 50;

    // Totales
    const total_arts = arts_acc + arts_rej;
    const total_sci = sci_acc + sci_rej;
    const total_acc = arts_acc + sci_acc;
    const total_rej = arts_rej + sci_rej;
    const grand_total = total_arts + total_sci;

    // 2. Cálculos y Respuestas

    // a) P(Accepted)
    // Probabilidad de ser aceptado = Total Aceptados / Gran Total
    const p_acc_num = total_acc;
    const p_acc_den = grand_total;
    const p_acc_val = p_acc_num / p_acc_den;

    // b) P(Arts | Accepted)
    // Probabilidad de haber aplicado a Artes dado que fue aceptado
    // P(A | B) = P(A int B) / P(B) = (Arts_Acc / Total) / (Total_Acc / Total) = Arts_Acc / Total_Acc
    const p_cond_num = arts_acc;
    const p_cond_den = total_acc;
    const p_cond_val = p_cond_num / p_cond_den;

    // c) P(Two Arts) - Sin reemplazo
    // Elegir 2 aspirantes al azar, ambos de Artes.
    // (Total_Arts / Grand_Total) * ((Total_Arts - 1) / (Grand_Total - 1))
    const p_two_num = total_arts * (total_arts - 1);
    const p_two_den = grand_total * (grand_total - 1);
    const p_two_val = p_two_num / p_two_den;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Un grupo de ${grand_total} aspirantes solicitó admisión en el programa de Artes o en el de Ciencias de una universidad. Los resultados de sus solicitudes se muestran en la siguiente tabla.</p>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                <table style="border-collapse: collapse; text-align: center; font-family: Arial, sans-serif;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #333; padding: 8px; background-color: #f0f0f0;"></th>
                            <th style="border: 1px solid #333; padding: 8px; background-color: #f0f0f0;">Aceptado</th>
                            <th style="border: 1px solid #333; padding: 8px; background-color: #f0f0f0;">Rechazado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #333; padding: 8px; font-weight: bold; background-color: #f0f0f0;">Programa de Artes</td>
                            <td style="border: 1px solid #333; padding: 8px;">${arts_acc}</td>
                            <td style="border: 1px solid #333; padding: 8px;">${arts_rej}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #333; padding: 8px; font-weight: bold; background-color: #f0f0f0;">Programa de Ciencias</td>
                            <td style="border: 1px solid #333; padding: 8px;">${sci_acc}</td>
                            <td style="border: 1px solid #333; padding: 8px;">${sci_rej}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la probabilidad de que un aspirante elegido al azar de este grupo haya sido aceptado por la universidad.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <div style="margin-bottom: 15px;">
                    <p>Un aspirante es elegido al azar de este grupo. Se encuentra que fue aceptado en el programa de su elección.</p>
                </div>
                <li>
                    <span class="ib-texto">Halle la probabilidad de que el aspirante haya solicitado admisión al programa de Artes.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <div style="margin-bottom: 15px;">
                    <p>Se eligen dos aspirantes diferentes al azar del grupo original.</p>
                </div>
                <li>
                    <span class="ib-texto">Halle la probabilidad de que ambos aspirantes hayan solicitado admisión al programa de Artes.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            <tlacuache-renglon n="17" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p>Primero calculamos los totales:</p>
        <ul>
            <li>Total Aceptados = ${arts_acc} + ${sci_acc} = ${total_acc}</li>
            <li>Total Artes = ${arts_acc} + ${arts_rej} = ${total_arts}</li>
            <li>Gran Total = ${grand_total}</li>
        </ul>
        <hr>
        <p><strong>a)</strong> P(Aceptado)</p>
        <p>$$P(\\text{Aceptado}) = \\frac{\\text{Total Aceptados}}{\\text{Gran Total}} = \\frac{${total_acc}}{${grand_total}} \\approx ${p_acc_val.toFixed(4)}$$</p>
        <hr>
        <p><strong>b)</strong> P(Artes | Aceptado)</p>
        <p>Usamos la fórmula de probabilidad condicionada o reducimos el espacio muestral a los "Aceptados".</p>
        <p>$$P(\\text{Artes} | \\text{Aceptado}) = \\frac{\\text{Aceptados en Artes}}{\\text{Total Aceptados}} = \\frac{${arts_acc}}{${total_acc}} \\approx ${p_cond_val.toFixed(4)}$$</p>
        <hr>
        <p><strong>c)</strong> P(Dos de Artes) - Sin reemplazo</p>
        <p>$$P(\\text{1º Artes}) \\times P(\\text{2º Artes} | \\text{1º Artes})$$</p>
        <p>$$= \\frac{${total_arts}}{${grand_total}} \\times \\frac{${total_arts - 1}}{${grand_total - 1}}$$</p>
        <p>$$= \\frac{${p_two_num}}{${p_two_den}} \\approx ${p_two_val.toFixed(4)}$$</p>
    `;

    return { html, respuesta };
}
