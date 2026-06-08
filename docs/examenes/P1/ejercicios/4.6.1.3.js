import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "Chi-cuadrado",
    seccion: "Sección 1",
    titulo: "Prueba Chi-cuadrado de Independencia",
    tipo: 1, // 1 = Abierto
    puntos: 8 // Asignado: [1] para a, [1] para b, [2] para c, [3] para d, [1] para e
};

export async function generar(i) {
    // --- CONTEXTOS ---
    const contextos = [
        {
            nombreInvestigador: "Jane",
            sujetoSingular: "mascota",
            sujetoPlural: "mascotas",
            variableA: "el tipo de animal",
            variableB: "el sabor preferido de comida",
            filas: ["Gato", "Perro"],
            columnas: ["Ternera", "Pollo", "Pescado"],
            textoIntro: "Jane probó con gatos y con perros tres sabores distintos de comida para mascotas, para determinar si el sabor preferido era (o no) independiente del tipo de animal.",
            preguntaEConclusion: "el sabor preferido no era independiente del tipo de animal"
        },
        {
            nombreInvestigador: "Mateo",
            sujetoSingular: "lector",
            sujetoPlural: "lectores",
            variableA: "el grupo de edad",
            variableB: "el formato de lectura preferido",
            filas: ["Jóvenes", "Adultos"],
            columnas: ["Libro Físico", "Libro Digital", "Audiolibro"],
            textoIntro: "Mateo encuestó a jóvenes y adultos sobre su formato de lectura preferido, para determinar si la preferencia de formato era independiente del grupo de edad.",
            preguntaEConclusion: "el formato de lectura preferido no era independiente del grupo de edad"
        },
        {
            nombreInvestigador: "Sofía",
            sujetoSingular: "cliente",
            sujetoPlural: "clientes",
            variableA: "el momento del día",
            variableB: "la bebida preferida",
            filas: ["Mañana", "Tarde"],
            columnas: ["Café", "Té", "Jugo"],
            textoIntro: "Sofía registró las bebidas preferidas de los clientes por la mañana y por la tarde, para determinar si la preferencia de bebida era independiente del momento del día.",
            preguntaEConclusion: "la preferencia de bebida no era independiente del momento del día"
        }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];

    // --- GENERACIÓN DE FRECUENCIAS OBSERVADAS CON P-VALUE ENTRE 0.01 Y 0.05 ---
    let o11, o12, o13, o21, o22, o23;
    let chi2 = 0;
    let pValue = 0;
    let e11, e12, e13, e21, e22, e23;
    let c1, c2, c3;
    let attempts = 0;

    do {
        attempts++;
        o11 = Math.floor(Math.random() * 20) + 5;   // 5 a 24
        o12 = Math.floor(Math.random() * 20) + 15;  // 15 a 34
        o13 = 50 - o11 - o12;

        o21 = Math.floor(Math.random() * 20) + 5;   // 5 a 24
        o22 = Math.floor(Math.random() * 20) + 15;  // 15 a 34
        o23 = 50 - o21 - o22;

        if (o13 >= 5 && o23 >= 5) {
            c1 = o11 + o21;
            c2 = o12 + o22;
            c3 = o13 + o23;

            e11 = c1 / 2;
            e12 = c2 / 2;
            e13 = c3 / 2;
            e21 = e11;
            e22 = e12;
            e23 = e13;

            chi2 = 2 * (
                Math.pow(o11 - e11, 2) / e11 +
                Math.pow(o12 - e12, 2) / e12 +
                Math.pow(o13 - e13, 2) / e13
            );
            pValue = Math.exp(-chi2 / 2);
        }
    } while ((pValue < 0.011 || pValue > 0.049) && attempts < 10000);

    // Si fallara en encontrar (muy improbable), usar datos por defecto
    if (attempts >= 10000) {
        o11 = 8; o12 = 22; o13 = 20;
        o21 = 16; o22 = 25; o23 = 9;
        c1 = 24; c2 = 47; c3 = 29;
        e11 = 12; e12 = 23.5; e13 = 14.5;
        e21 = 12; e22 = 23.5; e23 = 14.5;
        chi2 = 7.030;
        pValue = 0.0297;
    }

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> ${ctx.textoIntro}</p>
            <p>Los resultados se muestran en la siguiente tabla:</p>

            <table style="margin: 15px auto; border-collapse: collapse; text-align: center; border: 1px solid #000; width: 90%; max-width: 500px;">
                <thead>
                    <tr style="background-color: #f2f2f2; border-bottom: 1px solid #000;">
                        <th style="border: 1px solid #000; padding: 8px;"></th>
                        <th style="border: 1px solid #000; padding: 8px;">${ctx.columnas[0]}</th>
                        <th style="border: 1px solid #000; padding: 8px;">${ctx.columnas[1]}</th>
                        <th style="border: 1px solid #000; padding: 8px;">${ctx.columnas[2]}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">${ctx.filas[0]}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o11}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o12}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o13}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">${ctx.filas[1]}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o21}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o22}</td>
                        <td style="border: 1px solid #000; padding: 8px;">${o23}</td>
                    </tr>
                </tbody>
            </table>

            <p>Realice una prueba de $\\chi^2$, a niveles de significación del $5\\%$ y del $1\\%$, para investigar estos resultados.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Indique la hipótesis nula, $H_0$, y la hipótesis alternativa, $H_1$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                

                <li>
                    <span class="ib-texto">Escriba el número de grados de libertad.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                

                <li>
                    <span class="ib-texto">Calcule el valor del parámetro $p$ correspondiente a esta prueba.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                

                <li>
                    <span class="ib-texto">Indique la conclusión de esta prueba, dando una razón:</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman; padding-left: 20px;">
                        <li><span class="ib-texto">Al nivel de significación del $1\\%$.</span></li>
                        <li><span class="ib-texto">Al nivel de significación del $5\\%$.</span></li>
                    </ol>
                    <span class="ib-mark">[3]</span>
                </li>
                

                <li>
                    <span class="ib-texto">La conclusión de ${ctx.nombreInvestigador}, para su prueba, fue que ${ctx.preguntaEConclusion}. Indique cuál de los dos niveles de significación utilizó ${ctx.nombreInvestigador} en su prueba.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                
            </ol>
        </div>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="22" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>a)</strong> Hipótesis: <br>
                $H_0$: ${ctx.variableB} es independiente de ${ctx.variableA}. <br>
                $H_1$: ${ctx.variableB} no es independiente de ${ctx.variableA}.
            </li>
            <br>
            <li><strong>b)</strong> Grados de libertad ($df$): <br>
                $df = (\\text{filas} - 1) \\times (\\text{columnas} - 1) = (2 - 1) \\times (3 - 1) = 1 \\times 2 = $ <strong>$2$</strong>.
            </li>
            <br>
            <li><strong>c)</strong> Frecuencias esperadas y valor $p$: <br>
                Totales de columna: $C_1 = ${c1}$, $C_2 = ${c2}$, $C_3 = ${c3}$. <br>
                Totales de fila: $R_1 = 50$, $R_2 = 50$. Total general = $100$. <br>
                Frecuencias esperadas $E_{ij} = \\frac{R_i \\times C_j}{\\text{Total}}$: <br>
                $E_{11} = E_{21} = ${e11.toFixed(1)}$, $E_{12} = E_{22} = ${e12.toFixed(1)}$, $E_{13} = E_{23} = ${e13.toFixed(1)}$. <br>
                Estadístico $\\chi^2$: <br>
                $\\chi^2 = \\sum \\frac{(O - E)^2}{E} \\approx ${chi2.toFixed(4)}$ <br>
                Dado que $df = 2$, el valor $p$ se calcula como $p = e^{-\\chi^2 / 2} \\approx$ <strong>$${pValue.toFixed(4)}$</strong> (o <strong>$${(pValue * 100).toFixed(2)}\\%$</strong>).
            </li>
            <br>
            <li><strong>d)</strong> Conclusiones:
                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                    <li>Al nivel del $1\\%$ ($\\alpha = 0.01$): <br>
                        Como $p \\approx ${pValue.toFixed(4)} > 0.01$, <strong>no se rechaza $H_0$</strong>. Por lo tanto, se concluye que ${ctx.variableB} es independiente de ${ctx.variableA}.
                    </li>
                    <li style="margin-top: 5px;">Al nivel del $5\\%$ ($\\alpha = 0.05$): <br>
                        Como $p \\approx ${pValue.toFixed(4)} < 0.05$, <strong>se rechaza $H_0$</strong> (se acepta $H_1$). Por lo tanto, se concluye que ${ctx.variableB} no es independiente de ${ctx.variableA}.
                    </li>
                </ol>
            </li>
            <br>
            <li><strong>e)</strong> Nivel de significación utilizado por ${ctx.nombreInvestigador}: <br>
                Dado que concluyó que ${ctx.preguntaEConclusion} (es decir, rechazó la hipótesis nula $H_0$), debió haber utilizado el nivel de significación del <strong>$5\\%$</strong>, ya que al nivel del $1\\%$ no habría rechazado $H_0$.
            </li>
        </ul>
    `;

    return { html, respuesta: respuestaHTML };
}
