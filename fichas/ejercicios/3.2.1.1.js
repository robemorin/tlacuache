import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.1. Trigonometría en triángulos rectángulos",
    titulo: "Ficha: Razones Trigonométricas Básicas",
    puntos: 24,
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: RAZONES TRIGONOMÉTRICAS DIRECTAS (3 INCISOS)
    // ======================================================
    // Triángulo 1: Tripleta (3, 4, 5) o (5, 12, 13)
    // Usamos variables aleatorias para mezclar las tripletas y posiciones de theta
    const triples = [
        { adj: 3, opp: 4, hyp: 5, unidad: "m" },
        { adj: 5, opp: 12, hyp: 13, unidad: "cm" },
        { adj: 8, opp: 15, hyp: 17, unidad: "cm" }
    ];
    const tri1 = triples[Math.floor(Math.random() * triples.length)];
    
    // Decidimos la posición de theta: 0 = en el vértice superior, 1 = en el vértice inferior derecho
    const thetaPos = Math.random() > 0.5 ? 0 : 1;
    
    let labelSeno, labelCoseno, labelTangente;
    let descTheta = "";
    if (thetaPos === 0) {
        // theta arriba: opp = horizontal (4), adj = vertical (3)
        labelSeno = `\\frac{${tri1.opp}}{${tri1.hyp}}`;
        labelCoseno = `\\frac{${tri1.adj}}{${tri1.hyp}}`;
        labelTangente = `\\frac{${tri1.opp}}{${tri1.adj}}`;
        descTheta = "el vértice superior";
    } else {
        // theta abajo-derecha: opp = vertical (3), adj = horizontal (4)
        // Intercambiamos los valores para mantener la coherencia geométrica
        labelSeno = `\\frac{${tri1.adj}}{${tri1.hyp}}`;
        labelCoseno = `\\frac{${tri1.opp}}{${tri1.hyp}}`;
        labelTangente = `\\frac{${tri1.adj}}{${tri1.opp}}`;
        descTheta = "el vértice inferior derecho";
    }

    // Dibujo SVG para el Triángulo 1
    // Vértices: A(30,30), B(30,120) [ángulo recto], C(160,120)
    // Si thetaPos == 0, el ángulo theta está en A. Si thetaPos == 1, está en C.
    const svgTri1 = `
    <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
        <!-- Triángulo -->
        <polygon points="40,30 40,120 160,120" fill="none" stroke="black" stroke-width="2" />
        <!-- Ángulo recto -->
        <polyline points="40,110 50,110 50,120" fill="none" stroke="black" stroke-width="1.5" />
        <!-- Arco para Theta -->
        ${thetaPos === 0 
            ? `<path d="M 40,55 A 25,25 0 0 1 58,48" fill="none" stroke="black" stroke-width="1.5" />
               <text x="48" y="70" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">θ</text>`
            : `<path d="M 135,120 A 25,25 0 0 1 148,110" fill="none" stroke="black" stroke-width="1.5" />
               <text x="120" y="115" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">θ</text>`
        }
        <!-- Lado vertical -->
        <text x="15" y="80" font-family="Arial" font-size="14" text-anchor="middle">${tri1.adj} ${tri1.unidad}</text>
        <!-- Lado horizontal -->
        <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${tri1.opp} ${tri1.unidad}</text>
        <!-- Hipotenusa -->
        <text x="110" y="70" font-family="Arial" font-size="14" text-anchor="middle">${tri1.hyp} ${tri1.unidad}</text>
    </svg>`;

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px; page-break-inside: avoid;">
            <p><strong>${i}.</strong> A partir del siguiente triángulo rectángulo, halle el valor exacto de cada una de las siguientes razones trigonométricas:</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
                <div>
                    ${svgTri1}
                </div>
                <div style="min-width: 250px;">
                    <ol class="ib-lista">
                        <li>
                            <span class="ib-texto">$\\sin \\theta$</span>
                            <span class="ib-mark">[1]</span>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                        <li>
                            <span class="ib-texto">$\\cos \\theta$</span>
                            <span class="ib-mark">[1]</span>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                        <li>
                            <span class="ib-texto">$\\tan \\theta$</span>
                            <span class="ib-mark">[1]</span>
                            <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: USO DE CALCULADORA Y RESOLUCIÓN DIRECTA
    // ======================================================
    const angulo2 = [25, 35, 42, 55, 64][Math.floor(Math.random() * 5)];
    const valSeno = Math.sin(angulo2 * Math.PI / 180).toFixed(4);
    const valCoseno = Math.cos(angulo2 * Math.PI / 180).toFixed(4);
    const valTangente = Math.tan(angulo2 * Math.PI / 180).toFixed(4);

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px; page-break-inside: avoid;">
            <p><strong>${i + 1}.</strong> Utilice su calculadora para hallar el valor de las siguientes expresiones, aproximando su respuesta a tres cifras decimales:</p>
            <ol class="ib-lista" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                <li>
                    <span class="ib-texto">$\\sin ${angulo2}^\\circ$</span>
                    <span class="ib-mark">[1]</span>
                    <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon>
                </li>
                <li>
                    <span class="ib-texto">$\\cos ${angulo2}^\\circ$</span>
                    <span class="ib-mark">[1]</span>
                    <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon>
                </li>
                <li>
                    <span class="ib-texto">$\\tan ${angulo2}^\\circ$</span>
                    <span class="ib-mark">[1]</span>
                    <tlacuache-renglon n="1" color="gray" alto="20"></tlacuache-renglon>
                </li>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: ENCONTRAR UN LADO DESCONOCIDO
    // ======================================================
    // Queremos encontrar el lado x.
    // Daremos un ángulo agudo y la hipotenusa, y pediremos un cateto (usando sen o cos)
    // O daremos un cateto y pediremos la hipotenusa o el otro cateto.
    // Caso 0: ángulo A, hipotenusa dada -> hallar cateto opuesto x = hip * sin(A)
    // Caso 1: ángulo A, cateto adyacente dado -> hallar hipotenusa x = adj / cos(A)
    const caso3 = Math.random() > 0.5 ? 0 : 1;
    const angulo3 = [28, 37, 48, 52, 61][Math.floor(Math.random() * 5)];
    const ladoDado3 = Math.floor(Math.random() * 10) + 8; // entre 8 y 17
    
    let x_sol3, planteamiento3, svgTri3, descTri3;

    if (caso3 === 0) {
        // Encontrar opuesto dado hipotenusa
        x_sol3 = (ladoDado3 * Math.sin(angulo3 * Math.PI / 180)).toFixed(2);
        planteamiento3 = `\\sin ${angulo3}^\\circ = \\frac{x}{${ladoDado3}} \\implies x = ${ladoDado3} \\cdot \\sin ${angulo3}^\\circ \\approx ${x_sol3}`;
        descTri3 = `hipotenusa = ${ladoDado3} cm, ángulo = ${angulo3}°, cateto opuesto = x`;
        
        svgTri3 = `
        <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="40,120 160,120 160,30" fill="none" stroke="black" stroke-width="2" />
            <polyline points="150,120 150,110 160,110" fill="none" stroke="black" stroke-width="1.5" />
            <!-- Ángulo -->
            <path d="M 65,120 A 25,25 0 0 1 60,107" fill="none" stroke="black" stroke-width="1.5" />
            <text x="75" y="112" font-family="Arial" font-size="14">${angulo3}°</text>
            <!-- Lado x -->
            <text x="175" y="80" font-family="Arial" font-size="14" text-anchor="middle">x</text>
            <!-- Hipotenusa -->
            <text x="90" y="65" font-family="Arial" font-size="14" text-anchor="middle" transform="rotate(-37, 90, 65)">${ladoDado3} cm</text>
        </svg>`;
    } else {
        // Encontrar hipotenusa dado adyacente
        x_sol3 = (ladoDado3 / Math.cos(angulo3 * Math.PI / 180)).toFixed(2);
        planteamiento3 = `\\cos ${angulo3}^\\circ = \\frac{${ladoDado3}}{x} \\implies x = \\frac{${ladoDado3}}{\\cos ${angulo3}^\\circ} \\approx ${x_sol3}`;
        descTri3 = `cateto adyacente = ${ladoDado3} cm, ángulo = ${angulo3}°, hipotenusa = x`;

        svgTri3 = `
        <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="40,120 160,120 160,30" fill="none" stroke="black" stroke-width="2" />
            <polyline points="150,120 150,110 160,110" fill="none" stroke="black" stroke-width="1.5" />
            <!-- Ángulo -->
            <path d="M 65,120 A 25,25 0 0 1 60,107" fill="none" stroke="black" stroke-width="1.5" />
            <text x="75" y="112" font-family="Arial" font-size="14">${angulo3}°</text>
            <!-- Lado adyacente -->
            <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${ladoDado3} cm</text>
            <!-- Hipotenusa x -->
            <text x="90" y="65" font-family="Arial" font-size="14" text-anchor="middle" transform="rotate(-37, 90, 65)">x</text>
        </svg>`;
    }

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px; page-break-inside: avoid;">
            <p><strong>${i + 2}.</strong> Considere el siguiente triángulo rectángulo:</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
                <div>
                    ${svgTri3}
                </div>
                <div style="min-width: 250px;">
                    <ol class="ib-lista">
                        <li>
                            <span class="ib-texto">Escriba una ecuación trigonométrica que relacione los lados conocidos con la variable $x$.</span>
                            <span class="ib-mark">[2]</span>
                            <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                        <li>
                            <span class="ib-texto">Calcule el valor de $x$, expresando su respuesta con tres cifras significativas.</span>
                            <span class="ib-mark">[2]</span>
                            <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    `;

    // ======================================================
    // EJERCICIO 4: ENCONTRAR UN ÁNGULO DESCONOCIDO
    // ======================================================
    // Triángulo donde se dan 2 lados y se pide hallar el ángulo beta
    // Daremos cateto opuesto y adyacente -> usar tangente inversa
    const opp4 = Math.floor(Math.random() * 6) + 5; // de 5 a 10
    const adj4 = Math.floor(Math.random() * 6) + 6; // de 6 a 11
    const beta_rad = Math.atan(opp4 / adj4);
    const beta_deg = (beta_rad * 180 / Math.PI).toFixed(1);
    const planteamiento4 = `\\tan \\beta = \\frac{${opp4}}{${adj4}} \\implies \\beta = \\arctan\\left(\\frac{${opp4}}{${adj4}}\\right) \\approx ${beta_deg}^\\circ`;

    // Dibujo SVG para el Triángulo 4
    // Triángulo rectángulo con ángulo beta en el vértice inferior derecho.
    const svgTri4 = `
    <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
        <polygon points="40,120 160,120 40,30" fill="none" stroke="black" stroke-width="2" />
        <polyline points="40,110 50,110 50,120" fill="none" stroke="black" stroke-width="1.5" />
        <!-- Ángulo Beta (vértice inferior derecho) -->
        <path d="M 135,120 A 25,25 0 0 1 140,105" fill="none" stroke="black" stroke-width="1.5" />
        <text x="115" y="114" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">β</text>
        <!-- Cateto adyacente -->
        <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${adj4} m</text>
        <!-- Cateto opuesto -->
        <text x="25" y="80" font-family="Arial" font-size="14" text-anchor="middle">${opp4} m</text>
    </svg>`;

    const html4 = `
        <div class="problema-ib" style="margin-bottom: 40px; page-break-inside: avoid;">
            <p><strong>${i + 3}.</strong> Halle el tamaño del ángulo marcado como $\\beta$ en el siguiente triángulo rectángulo:</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
                <div>
                    ${svgTri4}
                </div>
                <div style="min-width: 250px;">
                    <ol class="ib-lista">
                        <li>
                            <span class="ib-texto">Muestre claramente la expresión trigonométrica que permite hallar el ángulo $\\beta$.</span>
                            <span class="ib-mark">[2]</span>
                            <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                        <li>
                            <span class="ib-texto">Determine el valor del ángulo $\\beta$ en grados, redondeado a una cifra decimal.</span>
                            <span class="ib-mark">[2]</span>
                            <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    `;

    // Respuestas correspondientes
    const respuestaHTML = `
        <div style="margin-bottom: 20px;">
            <p><strong>${i}.</strong></p>
            <ul style="list-style:none; padding-left:15px; margin-bottom: 10px;">
                <li>a) $\\sin \\theta = ${labelSeno}$</li>
                <li>b) $\\cos \\theta = ${labelCoseno}$</li>
                <li>c) $\\tan \\theta = ${labelTangente}$</li>
            </ul>
        </div>
        <div style="margin-bottom: 20px;">
            <p><strong>${i + 1}.</strong></p>
            <ul style="list-style:none; padding-left:15px; margin-bottom: 10px;">
                <li>a) $\\sin ${angulo2}^\\circ \\approx ${(Math.sin(angulo2 * Math.PI / 180)).toFixed(3)}$</li>
                <li>b) $\\cos ${angulo2}^\\circ \\approx ${(Math.cos(angulo2 * Math.PI / 180)).toFixed(3)}$</li>
                <li>c) $\\tan ${angulo2}^\\circ \\approx ${(Math.tan(angulo2 * Math.PI / 180)).toFixed(3)}$</li>
            </ul>
        </div>
        <div style="margin-bottom: 20px;">
            <p><strong>${i + 2}.</strong></p>
            <ul style="list-style:none; padding-left:15px; margin-bottom: 10px;">
                <li>a) Ecuación: $${planteamiento3.split(" \\implies ")[0]}$</li>
                <li>b) Valor del lado: $x \\approx ${x_sol3}\\text{ cm}$ (3 cifras significativas: $x \\approx ${parseFloat(x_sol3).toPrecision(3)}\\text{ cm}$)</li>
            </ul>
        </div>
        <div style="margin-bottom: 20px;">
            <p><strong>${i + 3}.</strong></p>
            <ul style="list-style:none; padding-left:15px; margin-bottom: 10px;">
                <li>a) Ecuación: $\\tan \\beta = \\frac{${opp4}}{${adj4}}$ o $\\beta = \\arctan\\left(\\frac{${opp4}}{${adj4}}\\right)$</li>
                <li>b) Ángulo: $\\beta \\approx ${beta_deg}^\\circ$</li>
            </ul>
        </div>
    `;

    return {
        html: html1 + html2 + html3 + html4,
        respuesta: respuestaHTML,
        numPreguntas: 4
    };
}
