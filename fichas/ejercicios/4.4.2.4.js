import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.2. Probabilidad simple",
    titulo: "Ficha: Probabilidad con Diagramas de Árbol",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: LEY DE PROBABILIDAD TOTAL - SÓLO FÓRMULAS (3 PUNTOS)
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pB_dado_A = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.7).toFixed(2)); // 0.7, 0.8, 0.9
    const pB_dado_noA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4

    const pB_total = parseFloat((pA * pB_dado_A + (1 - pA) * pB_dado_noA).toFixed(4));

    // ==========================================
    // EJERCICIO 2: MAQUINARIA DE FÁBRICA - CONTEXTUALIZADO 1 (3 PUNTOS)
    // ==========================================
    const pMaqA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pMaqB = parseFloat((1 - pMaqA).toFixed(2));
    const pDef_A = parseFloat((Math.floor(Math.random() * 3) * 0.01 + 0.04).toFixed(3)); // 0.04, 0.05, 0.06 (4%, 5%, 6%)
    const pDef_B = parseFloat((Math.floor(Math.random() * 2) * 0.01 + 0.02).toFixed(3)); // 0.02, 0.03 (2%, 3%)

    const pDef_total = parseFloat((pMaqA * pDef_A + pMaqB * pDef_B).toFixed(5));

    // ==========================================
    // EJERCICIO 3: URNAS Y MONEDAS - CONTEXTUALIZADO 2 (4 PUNTOS)
    // ==========================================
    // Caja X: rx rojas, wx blancas
    // Caja Y: ry rojas, wy blancas
    const rx = Math.floor(Math.random() * 3) + 2; // 2 a 4
    const wx = Math.floor(Math.random() * 2) + 2; // 2 a 3
    const totalX = rx + wx;

    const ry = Math.floor(Math.random() * 2) + 3; // 3 a 4
    const wy = Math.floor(Math.random() * 2) + 1; // 1 a 2
    const totalY = ry + wy;

    const pR_dado_X = rx / totalX;
    const pR_dado_Y = ry / totalY;

    // Elección al azar de caja (1/2 cada una)
    const pR_total = 0.5 * pR_dado_X + 0.5 * pR_dado_Y;
    const pX_dado_R = (0.5 * pR_dado_X) / pR_total;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Diagramas de Árbol y Probabilidad Condicional</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Modelación de Sucesos Compuestos dependientes</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: ; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Sean dos sucesos dependientes $A$ y $B$. Se sabe que la probabilidad de que ocurra $A$ es $P(A) = ${pA}$. Si ocurre $A$, la probabilidad de que ocurra $B$ es $P(B|A) = ${pB_dado_A}$, y si no ocurre $A$, la probabilidad de que ocurra $B$ es $P(B|A') = ${pB_dado_noA}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        a) Represente esta situación mediante un diagrama de árbol de dos etapas, indicando todas las probabilidades en las ramas.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <div style="border: 1px dashed #bbb; height: 140px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em; background-color: #fafafa; border-radius: 4px;">
                        
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        b) Calcule la probabilidad total de que ocurra el suceso $B$, es decir, $P(B)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 30px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> En una planta embotelladora, la Máquina A produce el $${pMaqA * 100}\\%$ de las botellas, mientras que la Máquina B produce el resto. Se sabe que la Máquina A daña el $${pDef_A * 100}\\%$ de su producción, y la Máquina B daña únicamente el $${pDef_B * 100}\\%$ de la suya.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        a) Construya un diagrama de árbol para representar este proceso de producción y daño de botellas.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <div style="border: 1px dashed #bbb; height: 140px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em; background-color: #fafafa; border-radius: 4px;">
                       
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        b) Determine la probabilidad de que una botella elegida al azar de la producción de la planta esté dañada.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 25px; margin-top: 20px;">
                <p style="font-size: 1.0em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> Una caja $X$ contiene $${rx}$ fichas rojas y $${wx}$ fichas blancas. Otra caja $Y$ contiene $${ry}$ fichas rojas y $${wy}$ fichas blancas. Se lanza una moneda equilibrada para elegir una caja al azar y, posteriormente, se extrae una ficha de la caja elegida.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        a) Represente el espacio muestral de este experimento mediante un diagrama de árbol completo con sus respectivas probabilidades.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <div style="border: 1px dashed #bbb; height: 140px; margin-top: 5px; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85em; background-color: #fafafa; border-radius: 4px;">
                        
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        b) Halle la probabilidad de que la ficha extraída sea de color rojo.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: ; margin-bottom: 8px;">
                        c) Calcule la probabilidad de que la ficha provenga de la caja $X$, sabiendo que la ficha extraída es roja.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;">
                <strong>Solucionario Oficial y Esquema de Calificación (Ficha ${i})</strong>
            </p>

            <div style="margin-bottom: 20px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Ejercicio 1 [3 Puntos]:</strong><br>
                <strong>a) Diagrama de árbol [1 punto]:</strong><br>
                * Ramas 1ª etapa: $A$ (${pA}) y $A'$ (${(1-pA).toFixed(2)}).<br>
                * Ramas 2ª etapa desde $A$: $B$ (${pB_dado_A}) y $B'$ (${(1-pB_dado_A).toFixed(2)}).<br>
                * Ramas 2ª etapa desde $A'$: $B$ (${pB_dado_noA}) y $B'$ (${(1-pB_dado_noA).toFixed(2)}). [1 punto]<br>
                <strong>b) Probabilidad total de $B$ [2 puntos]:</strong><br>
                $P(B) = P(A \\cap B) + P(A' \\cap B) = P(A) \\cdot P(B|A) + P(A') \\cdot P(B|A')$ [1 punto]<br>
                $P(B) = ${pA} \\cdot ${pB_dado_A} + ${(1-pA).toFixed(2)} \\cdot ${pB_dado_noA} = ${(pA*pB_dado_A).toFixed(3)} + ${((1-pA)*pB_dado_noA).toFixed(3)} = \\mathbf{${pB_total}}$ [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [3 Puntos]:</strong><br>
                <strong>a) Diagrama de árbol [1 punto]:</strong><br>
                * Ramas 1ª etapa: Máquina A (${pMaqA}) y Máquina B (${pMaqB}).<br>
                * Ramas 2ª etapa (A): Dañado (${pDef_A}) y No Dañado (${(1-pDef_A).toFixed(3)}).<br>
                * Ramas 2ª etapa (B): Dañado (${pDef_B}) y No Dañado (${(1-pDef_B).toFixed(3)}). [1 punto]<br>
                <strong>b) Probabilidad de botella dañada ($P(D)$) [2 puntos]:</strong><br>
                $P(D) = P(A) \\cdot P(D|A) + P(B) \\cdot P(D|B)$ [1 punto]<br>
                $P(D) = ${pMaqA} \\cdot ${pDef_A} + ${pMaqB} \\cdot ${pDef_B} = ${(pMaqA*pDef_A).toFixed(4)} + ${(pMaqB*pDef_B).toFixed(4)} = \\mathbf{${pDef_total}}$ [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 [4 Puntos]:</strong><br>
                <strong>a) Diagrama de árbol [1 punto]:</strong><br>
                * Ramas 1ª etapa (elección de caja): $X$ ($0.5$) e $Y$ ($0.5$).<br>
                * Ramas de $X$: Roja ($P(R|X) = \\frac{${rx}}{${totalX}}$) y Blanca ($P(W|X) = \\frac{${wx}}{${totalX}}$).<br>
                * Ramas de $Y$: Roja ($P(R|Y) = \\frac{${ry}}{${totalY}}$) y Blanca ($P(W|Y) = \\frac{${wy}}{${totalY}}$). [1 punto]<br>
                <strong>b) Probabilidad de extraer ficha roja ($P(R)$) [2 puntos]:</strong><br>
                $P(R) = P(X) \\cdot P(R|X) + P(Y) \\cdot P(R|Y)$ [1 punto]<br>
                $P(R) = 0.5 \\cdot \\left(\\frac{${rx}}{${totalX}}\\right) + 0.5 \\cdot \\left(\\frac{${ry}}{${totalY}}\\right) = \\frac{${rx}}{${2*totalX}} + \\frac{${ry}}{${2*totalY}} = ${(0.5*pR_dado_X).toFixed(4)} + ${(0.5*pR_dado_Y).toFixed(4)} = \\mathbf{${pR_total.toFixed(4)}}$ [1 punto]<br>
                <strong>c) Probabilidad a posteriori / Teorema de Bayes ($P(X | R)$) [1 punto]:</strong><br>
                $P(X|R) = \\frac{P(X \\cap R)}{P(R)} = \\frac{0.5 \\cdot \\left(\\frac{${rx}}{${totalX}}\\right)}{${pR_total.toFixed(4)}} \\approx \\mathbf{${pX_dado_R.toFixed(4)}}$ (o en fracción). [1 punto]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
