import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.2. Teorema del seno y del coseno",
    titulo: "Ficha: Teorema del Coseno (10 Ejercicios)",
    puntos: 30,
};

export async function generar(i) {
    const problemas = [];
    const respuestasVal = [];
    const letrasTriangulos = [
        { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
        { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
        { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
        { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
        { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" },
        { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
        { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
        { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
        { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
        { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" }
    ];

    const unidades = ["cm", "m", "cm", "mm", "m", "cm", "m", "cm", "mm", "m"];

    for (let k = 0; k < 10; k++) {
        const u = unidades[k];
        const lt = letrasTriangulos[k];
        const tipo = k % 2; // 0: SAS (hallar lado), 1: SSS (hallar ángulo)

        // Generar un triángulo matemáticamente coherente
        const b = Math.floor(Math.random() * 12) + 6; // 6 a 17
        const c = Math.floor(Math.random() * 12) + 6; // 6 a 17
        const A_deg = Math.floor(Math.random() * 90) + 40; // 40 a 129 grados
        const A_rad = A_deg * Math.PI / 180;
        
        // Calcular lado opuesto a exacto
        const a_exact = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A_rad));
        const a = parseFloat(a_exact.toFixed(1));

        if (tipo === 0) {
            // Hallar lado (a) dados b, c y el ángulo A
            // Para darle variedad al nombre de los lados, mapeamos
            // v1 (A) es el ángulo, s2 (b) y s3 (c) son los lados adyacentes, s1 (a) es el lado a hallar.
            problemas.push({
                texto: `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s2} = ${b}\\text{ ${u}}$, el lado $${lt.s3} = ${c}\\text{ ${u}}$ y el ángulo en el vértice $${lt.v1}$ mide $${A_deg}^\\circ$. Halle la longitud del lado $${lt.s1}$.`,
                tipoText: "Lado"
            });
            respuestasVal.push(`$${lt.s1} = \\sqrt{${b}^2 + ${c}^2 - 2(${b})(${c})\\cos(${A_deg}^\\circ)} = \\mathbf{${a.toFixed(1)}\\text{ ${u}}}$`);
        } else {
            // Hallar ángulo (A) dados a, b y c
            // Para asegurar la precisión del ángulo con los lados redondeados, recalculamos el ángulo exacto basado en a, b, c redondeados:
            const cosA = (b*b + c*c - a*a) / (2*b*c);
            const A_deg_calc = Math.acos(cosA) * 180 / Math.PI;

            problemas.push({
                texto: `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se conocen las longitudes de sus tres lados: $${lt.s1} = ${a}\\text{ ${u}}$, $${lt.s2} = ${b}\\text{ ${u}}$ y $${lt.s3} = ${c}\\text{ ${u}}$. Halle la medida del ángulo del vértice $${lt.v1}$.`,
                tipoText: "Ángulo"
            });
            respuestasVal.push(`$\\cos(${lt.v1}) = \\frac{${b}^2 + ${c}^2 - ${a}^2}{2(${b})(${c})} \\implies \\mathbf{${lt.v1} = ${A_deg_calc.toFixed(1)}^\\circ}$`);
        }
    }

    // Estilos de los cuadros contenedores
    const boxStyle = `
        border: 2px solid #333; 
        padding: 12px; 
        border-radius: 6px; 
        min-height: 190px; 
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        background-color: #fff;
    `;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px;">
            <!-- PÁGINA 1 -->
            <div style="text-align: center; margin-bottom: 12px;">
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Teorema del Coseno</h2>
                <p style="margin: 4px 0; font-weight: bold; font-size: 1.05em; color: #111;">
                    Instrucción: Para cada ejercicio, dibuje el triángulo correspondiente y calcule lo solicitado.
                </p>
            </div>

            <!-- Grilla de 5 ejercicios para Página 1 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 1.</span> <span style="font-size: 0.95em;">${problemas[0].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 2.</span> <span style="font-size: 0.95em;">${problemas[1].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 3.</span> <span style="font-size: 0.95em;">${problemas[2].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 4.</span> <span style="font-size: 0.95em;">${problemas[3].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <!--div style="${boxStyle} grid-column: span 2; min-height: 170px;">
                    <div><span style="font-weight: bold;">Ejercicio 5.</span> <span style="font-size: 0.95em;">${problemas[4].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 75px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div-->
            </div>

            <!-- SALTO DE PÁGINA FORZADO -->
            <div style="page-break-before: always; break-before: page;"></div>

            <!-- PÁGINA 2 -->
            <div style="text-align: center; margin-bottom: 12px; margin-top: 10px;">
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Teorema del Coseno</h2>
                <p style="margin: 4px 0; font-weight: bold; font-size: 1.05em; color: #111;">
                    Instrucción: Para cada ejercicio, dibuje el triángulo correspondiente y calcule lo solicitado.
                </p>
            </div>

            <!-- Grilla de 5 ejercicios para Página 2 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 6.</span> <span style="font-size: 0.95em;">${problemas[4].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 7.</span> <span style="font-size: 0.95em;">${problemas[5].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 8.</span> <span style="font-size: 0.95em;">${problemas[6].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 9.</span> <span style="font-size: 0.95em;">${problemas[7].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 10.</span> <span style="font-size: 0.95em;">${problemas[8].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 9.</span> <span style="font-size: 0.95em;">${problemas[9].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div>
                <!--div style="${boxStyle} grid-column: span 2; min-height: 170px;">
                    <div><span style="font-weight: bold;">Ejercicio 10.</span> <span style="font-size: 0.95em;">${problemas[9].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 75px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em;"></div>
                </div-->
            </div>
        </div>
    `;

    const respuesta = `
        <p><strong>Respuestas Ficha: Teorema del Coseno (${i} a ${i+9})</strong></p>
        <ol start="${i}" style="padding-left: 20px;">
            ${respuestasVal.map(resp => `<li style="margin-bottom: 8px;">${resp}</li>`).join('')}
        </ol>
    `;

    return { html, respuesta, numPreguntas: 10 };
}
