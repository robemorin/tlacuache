import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.2. Teorema del seno y del coseno",
    titulo: "Ficha: Aplicaciones del Teorema del Seno y Coseno y Trigonometría Algebraica",
    puntos: 36,
};

export async function generar(i) {
    const problemas = [];
    const respuestasVal = [];

    // ==========================================
    // PARTE 1: PROBLEMAS COMBINADOS (SENO Y COSENO)
    // ==========================================
    // Generaremos 3 problemas con diferentes contextos y valores.
    const contextos = [
        {
            intro: "Dos estaciones de monitoreo forestal, $A$ y $B$, detectan un foco de incendio en el punto $C$. Un equipo de bomberos se ubica en el campamento $D$ para preparar el combate al fuego.",
            pregunta: "Halle la distancia desde el campamento de bomberos ($D$) hasta el foco de incendio ($C$)."
        },
        {
            intro: "Un topógrafo está delimitando dos parcelas triangulares adyacentes, $ABC$ y $ACD$, separadas por un sendero recto $AC$. Se quiere colocar una valla protectora en el lindero $CD$.",
            pregunta: "Calcule la longitud necesaria de valla para cubrir el lindero $CD$."
        },
        {
            intro: "Dos barcos de rescate, $A$ y $B$, reciben una señal de auxilio de un velero en el punto $C$. Un helicóptero de la guardia costera se encuentra en la base $D$ listo para despegar hacia la emergencia.",
            pregunta: "Determine la distancia de vuelo que debe recorrer el helicóptero desde la base $D$ hasta el velero $C$."
        }
    ];

    for (let k = 0; k < 2; k++) {
        const ctx = contextos[k];
        
        // Parámetros del triángulo de abajo (ABC)
        // Usaremos la Ley del Seno: d / sin(theta2) = s1 / sin(theta1)
        // donde d = AC (diagonal), s1 = BC, theta1 = CAB, theta2 = ABC
        const theta1_opts = [30, 45];
        const theta1 = theta1_opts[Math.floor(Math.random() * theta1_opts.length)];
        const theta2 = Math.floor(Math.random() * 20) + 105; // 105 a 124 grados
        const s1 = (Math.floor(Math.random() * 6) + 4) * 5; // 20, 25, 30, 35, 40, 45

        const theta1_rad = theta1 * Math.PI / 180;
        const theta2_rad = theta2 * Math.PI / 180;

        // Calcular diagonal d (AC)
        const d = s1 * Math.sin(theta2_rad) / Math.sin(theta1_rad);

        // Parámetros del triángulo de arriba (ACD)
        // Usaremos la Ley del Coseno: y^2 = d^2 + s2^2 - 2 * d * s2 * cos(theta3)
        // donde y = CD, s2 = AD, theta3 = CAD
        const s2 = s1 + (Math.floor(Math.random() * 5) - 2) * 5; // Cercano a s1
        const theta3 = Math.floor(Math.random() * 30) + 50; // 50 a 79 grados
        const theta3_rad = theta3 * Math.PI / 180;

        const y2 = d*d + s2*s2 - 2*d*s2*Math.cos(theta3_rad);
        const y = Math.sqrt(y2);

        // SVG del diagrama
        const svg = `
        <svg width="260" height="170" style="display: block; margin: 10px auto; overflow: visible;">
            <!-- Vértices: A(30,80), B(110,150), C(220,80), D(130,20) -->
            <polygon points="30,80 110,150 220,80 130,20" fill="none" stroke="black" stroke-width="2" />
            <line x1="30" y1="80" x2="220" y2="80" stroke="black" stroke-dasharray="4,4" stroke-width="1.5" />
            
            <text x="15" y="85" font-family="Cambria Math, serif" font-size="14" font-weight="bold">A</text>
            <text x="110" y="168" font-family="Cambria Math, serif" font-size="14" font-weight="bold">B</text>
            <text x="230" y="85" font-family="Cambria Math, serif" font-size="14" font-weight="bold">C</text>
            <text x="130" y="15" font-family="Cambria Math, serif" font-size="14" font-weight="bold">D</text>
            
            <text x="55" y="100" font-family="Arial" font-size="11">${theta1}°</text>
            <text x="105" y="138" font-family="Arial" font-size="11">${theta2}°</text>
            <text x="55" y="70" font-family="Arial" font-size="11">${theta3}°</text>
            
            <text x="175" y="130" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${s1} m</text>
            <text x="75" y="45" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${s2} m</text>
            <text x="185" y="45" font-family="Arial" font-size="12" text-anchor="middle" font-style="italic">y</text>
        </svg>
        `;

        problemas.push({
            html: `
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <p><strong>Ejercicio ${k + 1}.</strong> ${ctx.intro} De acuerdo con las mediciones mostradas en la siguiente figura, ${ctx.pregunta.toLowerCase()}</p>
                <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 10px;">
                    <div>${svg}</div>
                    <div style="flex: 1; min-width: 280px;">
                        <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                    </div>
                </div>
            </div>`
        });

        respuestasVal.push(`
            <strong>Ejercicio ${k + 1}:</strong><br>
            1. Usando la Ley del Seno en el triángulo $\\triangle ABC$:<br>
            $\\frac{AC}{\\sin(${theta2}^\\circ)} = \\frac{${s1}}{\\sin(${theta1}^\\circ)} \\implies AC = \\frac{${s1} \\cdot \\sin(${theta2}^\\circ)}{\\sin(${theta1}^\\circ)} \\approx \\mathbf{${d.toFixed(2)}\\text{ m}}$<br>
            2. Usando la Ley del Coseno en el triángulo $\\triangle ACD$ para hallar $y$ ($CD$):<br>
            $y^2 = AC^2 + AD^2 - 2(AC)(AD)\\cos(${theta3}^\\circ)$<br>
            $y^2 = (${d.toFixed(2)})^2 + ${s2}^2 - 2(${d.toFixed(2)})(${s2})\\cos(${theta3}^\\circ) \\approx ${y2.toFixed(2)}$<br>
            $y \\approx \\mathbf{${y.toFixed(2)}\\text{ m}}$
        `);
    }

    // ==========================================
    // PARTE 2: PROBLEMAS ALGEBRAICOS DESDE TRIGONOMETRÍA
    // ==========================================
    // Generaremos 3 problemas con diferentes configuraciones algebraicas exactas.
    // Usaremos la Ley del Seno: side2 / sin(ang1) = side1 / sin(ang2)
    // Caso 1: 45° y 30° -> side2 = x * sqrt(2). Lado2 es cx - d.
    // Caso 2: 60° y 30° -> side2 = x * sqrt(3). Lado2 es cx - d.
    const algebraicos = [
        { ang1: 45, ang2: 30, raiz: 2, c: 2, d: 11, form: "a + b\\sqrt{2}" },
        { ang1: 45, ang2: 30, raiz: 2, c: 3, d: 7, form: "a + b\\sqrt{2}" },
        { ang1: 60, ang2: 30, raiz: 3, c: 2, d: 4, form: "a + b\\sqrt{3}" }
    ];

    // Mezclar un poco los coeficientes para variedad
    const configAlgebraicas = [
        { ang1: 45, ang2: 30, raiz: 2, c: 2, d: 11, form: "a + b\\sqrt{2}", ans_a: 11, ans_b: 5.5 },
        { ang1: 45, ang2: 30, raiz: 2, c: 3, d: 7, form: "a + b\\sqrt{2}", ans_a: 3, ans_b: 1 },
        { ang1: 60, ang2: 30, raiz: 3, c: 2, d: 4, form: "a + b\\sqrt{3}", ans_a: 8, ans_b: 4 }
    ];

    for (let k = 0; k < 2; k++) {
        const cfg = configAlgebraicas[k];
        const side1 = "x\\text{ cm}";
        const side2 = `(${cfg.c}x - ${cfg.d})\\text{ cm}`;

        // SVG para el triángulo
        const svg = `
        <svg width="220" height="130" style="display: block; margin: 10px auto; overflow: visible;">
            <!-- Vértices: P(40,30), Q(75,110), R(190,80) -->
            <polygon points="40,30 75,110 190,80" fill="none" stroke="black" stroke-width="2" />
            <text x="52" y="47" font-family="Arial" font-size="11">${cfg.ang1}°</text>
            <text x="160" y="80" font-family="Arial" font-size="11">${cfg.ang2}°</text>
            <text x="45" y="75" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">x</text>
            <text x="135" y="110" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${cfg.c}x - ${cfg.d}</text>
        </svg>
        `;

        problemas.push({
            html: `
            <div style="margin-bottom: 25px; page-break-inside: avoid;">
                <p><strong>Ejercicio ${k + 4}.</strong> A partir del triángulo que se muestra a continuación, halle el valor exacto de $x$, expresando su respuesta en la forma $${cfg.form}$, donde $a, b \\in \\mathbb{Q}$.</p>
                <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 10px;">
                    <div>${svg}</div>
                    <div style="flex: 1; min-width: 280px;">
                        <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                    </div>
                </div>
            </div>`
        });

        let paso_resolucion = "";
        if (cfg.raiz === 2) {
            paso_resolucion = `
            $\\frac{${cfg.c}x - ${cfg.d}}{\\sin(45^\\circ)} = \\frac{x}{\\sin(30^\\circ)} \\implies \\frac{${cfg.c}x - ${cfg.d}}{\\frac{\\sqrt{2}}{2}} = \\frac{x}{\\frac{1}{2}}$<br>
            $2(${cfg.c}x - ${cfg.d}) = 2x\\sqrt{2} \\implies ${cfg.c}x - ${cfg.d} = x\\sqrt{2}$<br>
            $${cfg.c}x - x\\sqrt{2} = ${cfg.d} \\implies x(${cfg.c} - \\sqrt{2}) = ${cfg.d}$<br>
            $x = \\frac{${cfg.d}}{${cfg.c} - \\sqrt{2}} = \\frac{${cfg.d}(${cfg.c} + \\sqrt{2})}{${cfg.c}^2 - 2}$<br>
            `;
        } else {
            paso_resolucion = `
            $\\frac{${cfg.c}x - ${cfg.d}}{\\sin(60^\\circ)} = \\frac{x}{\\sin(30^\\circ)} \\implies \\frac{${cfg.c}x - ${cfg.d}}{\\frac{\\sqrt{3}}{2}} = \\frac{x}{\\frac{1}{2}}$<br>
            $2(${cfg.c}x - ${cfg.d}) = 2x\\sqrt{3} \\implies ${cfg.c}x - ${cfg.d} = x\\sqrt{3}$<br>
            $${cfg.c}x - x\\sqrt{3} = ${cfg.d} \\implies x(${cfg.c} - \\sqrt{3}) = ${cfg.d}$<br>
            $x = \\frac{${cfg.d}}{${cfg.c} - \\sqrt{3}} = \\frac{${cfg.d}(${cfg.c} + \\sqrt{3})}{${cfg.c}^2 - 3}$<br>
            `;
        }

        respuestasVal.push(`
            <strong>Ejercicio ${k + 4}:</strong><br>
            1. Planteando la Ley del Seno:<br>
            ${paso_resolucion}
            Simplificando:<br>
            $\\mathbf{x = ${cfg.ans_a === Math.floor(cfg.ans_a) ? cfg.ans_a : cfg.ans_a.toFixed(1)} + ${cfg.ans_b === Math.floor(cfg.ans_b) ? cfg.ans_b : cfg.ans_b.toFixed(1)}\\sqrt{${cfg.raiz}}}$
        `);
    }

    const boxStyle = `
        border: 2px solid #333; 
        padding: 15px; 
        border-radius: 6px; 
        background-color: #fff;
        margin-bottom: 20px;
    `;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px;">
            <!-- CABECERA -->
            <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px;">
                <h2 style="margin: 0; font-size: 1.5em; text-transform: uppercase; letter-spacing: 1px;">Ficha de Trabajo: Aplicaciones Trigonométricas y Álgebra</h2>
                <p style="margin: 5px 0; font-weight: bold; color: #555;">Curso: Matemáticas NM: Aplicaciones e Interpretaciones</p>
            </div>

            <!-- SECCIÓN 1: LEY DE SENOS Y COSENOS COMBINADOS -->
            <h3 style="border-bottom: 1px solid #666; padding-bottom: 5px; margin-top: 25px; color: #222;">Parte A: Problemas Combinados de Ley de Senos y Ley de Cosines</h3>
            <p style="font-style: italic; color: #444; margin-bottom: 15px;">Instrucción: Resuelva cada una de las situaciones reales planteadas utilizando de manera secuencial los teoremas del seno y del coseno.</p>
            ${problemas[0].html}
            ${problemas[1].html}
            

            ${problemas[2].html}
            ${problemas[3].html}
            
        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;"><strong>Esquema de Calificación / Solucionario Ficha (${i} a ${i+5})</strong></p>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 10px;">
                ${respuestasVal.map(resp => `<div style="border-left: 3px solid #0076c0; padding-left: 10px; margin-bottom: 5px;">${resp}</div>`).join('')}
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 6 };
}
