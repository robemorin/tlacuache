import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.2. Teorema del seno y del coseno",
    titulo: "Ficha: Teorema del Seno (10 Ejercicios)",
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
        const tipo = k % 2; // 0: Hallar lado, 1: Hallar ángulo

        if (tipo === 0) {
            // HALLAR LADO (a)
            // Necesitamos: Ángulo A, Ángulo B, Lado b
            const A_deg = Math.floor(Math.random() * 50) + 35; // 35 a 84
            const B_deg = Math.floor(Math.random() * 50) + 35; // 35 a 84
            const b = Math.floor(Math.random() * 12) + 6;      // 6 a 17

            const A_rad = A_deg * Math.PI / 180;
            const B_rad = B_deg * Math.PI / 180;
            const a_exact = b * Math.sin(A_rad) / Math.sin(B_rad);
            const a = parseFloat(a_exact.toFixed(1));

            problemas.push({
                texto: `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el ángulo en $${lt.v1}$ mide $${A_deg}^\\circ$, el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$ y el lado $${lt.s2} = ${b}\\text{ ${u}}$. Halle la longitud del lado $${lt.s1}$.`
            });
            respuestasVal.push(`$${lt.s1} = \\frac{${b} \\cdot \\sin(${A_deg}^\\circ)}{\\sin(${B_deg}^\\circ)} = \\mathbf{${a.toFixed(1)}\\text{ ${u}}}$`);
        } else {
            // HALLAR ÁNGULO (A)
            // Necesitamos: lado a, lado b, ángulo B tal que b > a (única solución aguda)
            const A_deg = Math.floor(Math.random() * 30) + 30; // 30 a 59 (A menor que B)
            const B_deg = Math.floor(Math.random() * 30) + 65; // 65 a 94 (B mayor que A)
            const b = Math.floor(Math.random() * 12) + 8;      // 8 a 19

            const A_rad = A_deg * Math.PI / 180;
            const B_rad = B_deg * Math.PI / 180;
            
            const a_exact = b * Math.sin(A_rad) / Math.sin(B_rad);
            const a = parseFloat(a_exact.toFixed(1));

            // Recalcular ángulo exacto basado en el lado redondeado 'a'
            const sinA = (a * Math.sin(B_rad)) / b;
            const A_calc_deg = Math.asin(sinA) * 180 / Math.PI;

            problemas.push({
                texto: `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s1} = ${a}\\text{ ${u}}$, el lado $${lt.s2} = ${b}\\text{ ${u}}$ y el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$. Halle la medida del ángulo en el vértice $${lt.v1}$.`
            });
            respuestasVal.push(`$\\sin(${lt.v1}) = \\frac{${a} \\cdot \\sin(${B_deg}^\\circ)}{${b}} \\implies \\mathbf{${lt.v1} = ${A_calc_deg.toFixed(1)}^\\circ}$`);
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
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Teorema del Seno</h2>
                <p style="margin: 4px 0; font-weight: bold; font-size: 1.05em; color: #111;">
                    Instrucción: Para cada ejercicio, dibuje el triángulo correspondiente y calcule lo solicitado.
                </p>
            </div>

            <!-- Grilla de 4 ejercicios para Página 1 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 1.</span> <span style="font-size: 0.95em;">${problemas[0].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 2.</span> <span style="font-size: 0.95em;">${problemas[1].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 3.</span> <span style="font-size: 0.95em;">${problemas[2].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 4.</span> <span style="font-size: 0.95em;">${problemas[3].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
            </div>

            <!-- SALTO DE PÁGINA FORZADO -->
            <div style="page-break-before: always; break-before: page;"></div>

            <!-- PÁGINA 2 -->
            <div style="text-align: center; margin-bottom: 12px; margin-top: 10px;">
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Teorema del Seno</h2>
                <p style="margin: 4px 0; font-weight: bold; font-size: 1.05em; color: #111;">
                    Instrucción: Para cada ejercicio, dibuje el triángulo correspondiente y calcule lo solicitado.
                </p>
            </div>

            <!-- Grilla de 6 ejercicios para Página 2 -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 5.</span> <span style="font-size: 0.95em;">${problemas[4].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 6.</span> <span style="font-size: 0.95em;">${problemas[5].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 7.</span> <span style="font-size: 0.95em;">${problemas[6].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 8.</span> <span style="font-size: 0.95em;">${problemas[7].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 9.</span> <span style="font-size: 0.95em;">${problemas[8].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
                <div style="${boxStyle}">
                    <div><span style="font-weight: bold;">Ejercicio 10.</span> <span style="font-size: 0.95em;">${problemas[9].texto}</span></div>
                    <div style="border: 1px dashed #bbb; height: 95px; margin-top: 5px;"></div>
                </div>
            </div>
        </div>
    `;

    const respuesta = `
        <p><strong>Respuestas Ficha: Teorema del Seno (${i} a ${i+9})</strong></p>
        <ol start="${i}" style="padding-left: 20px;">
            ${respuestasVal.map(resp => `<li style="margin-bottom: 8px;">${resp}</li>`).join('')}
        </ol>
    `;

    return { html, respuesta, numPreguntas: 10 };
}
