import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.2. Probabilidad simple",
    titulo: "Ficha: Probabilidad Condicional",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: CONDICIONAL BÁSICA - SÓLO FÓRMULAS (3 PUNTOS)
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.5).toFixed(2)); // 0.5, 0.6, 0.7
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5
    // Para asegurar intersección válida: P(A n B) <= min(P(A), P(B))
    // Sea P(A u B) tal que de una intersección limpia
    const pInt = parseFloat((Math.floor(Math.random() * 2) * 0.05 + 0.15).toFixed(2)); // 0.15, 0.20
    const pUnion = parseFloat((pA + pB - pInt).toFixed(2));

    const cond_A_dado_B = pInt / pB;
    const cond_B_dado_A = pInt / pA;

    // ==========================================
    // EJERCICIO 2: TABLA DE FRECUENCIAS DE IDIOMAS - CONTEXTUALIZADO 1 (3 PUNTOS)
    // ==========================================
    const totalEstudiantes = 100;
    const esp = Math.floor(Math.random() * 10) + 55; // 55 a 64
    const fra = Math.floor(Math.random() * 10) + 35; // 35 a 44
    const ambos = Math.floor(Math.random() * 5) + 15; // 15 a 19

    const soloEsp = esp - ambos;
    const soloFra = fra - ambos;
    const exactUno = soloEsp + soloFra;

    const cond_fra_dado_esp = ambos / esp;
    const cond_esp_dado_uno = soloEsp / exactUno;

    // ==========================================
    // EJERCICIO 3: CLIMA Y CINE - CONTEXTUALIZADO 2 (4 PUNTOS)
    // ==========================================
    // Lluvia (L), Cine (C)
    const pLluvia = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4
    const pCine_dado_L = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.7).toFixed(2)); // 0.7, 0.8
    const pCine_dado_noL = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4

    const pCine_total = parseFloat((pLluvia * pCine_dado_L + (1 - pLluvia) * pCine_dado_noL).toFixed(4));
    const pLluvia_dado_Cine = (pLluvia * pCine_dado_L) / pCine_total;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Probabilidad Condicional</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Probabilidad Condicional y Teorema de Bayes</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Sean $A$ y $B$ dos sucesos del espacio muestral tales que $P(A) = ${pA}$, $P(B) = ${pB}$ y $P(A \\cup B) = ${pUnion}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Halle el valor de la probabilidad de la intersección $P(A \\cap B)$.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Calcule el valor de las probabilidades condicionales $P(A | B)$ y $P(B | A)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 30px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> En una escuela que cuenta con un grupo de $${totalEstudiantes}$ estudiantes de intercambio, $${esp}$ estudian Español ($S$), $${fra}$ estudian Francés ($F$) y $${ambos}$ estudian ambos idiomas de forma simultánea. Se elige un estudiante al azar.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Calcule la probabilidad de que el estudiante curse Francés, sabiendo que ya cursa Español: $P(F | S)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Calcule la probabilidad de que el estudiante estudie Español, dado que se sabe que estudia exactamente uno solo de los dos idiomas.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 25px; margin-top: 20px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> La probabilidad de que mañana llueva en la ciudad es de $${pLluvia}$. Si llueve, la probabilidad de que Juan vaya al cine ($C$) por la tarde es de $${pCine_dado_L}$. Si no llueve, la probabilidad de que Juan vaya al cine es de $${pCine_dado_noL}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Calcule la probabilidad total de que Juan vaya al cine mañana, $P(C)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Halle la probabilidad de que haya llovido mañana por la tarde, dado que se sabe que Juan efectivamente fue al cine.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
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
                <strong>a) Intersección [1 punto]:</strong><br>
                $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = ${pA} + ${pB} - ${pUnion} = \\mathbf{${pInt}}$ [1 punto]<br>
                <strong>b) Probabilidades condicionales [2 puntos]:</strong><br>
                * $P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{${pInt}}{${pB}} = \\mathbf{${cond_A_dado_B.toFixed(3)}}$ [1 punto]<br>
                * $P(B|A) = \\frac{P(B \\cap A)}{P(A)} = \\frac{${pInt}}{${pA}} = \\mathbf{${cond_B_dado_A.toFixed(3)}}$ [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [3 Puntos]:</strong><br>
                * <strong>a) Probabilidad $P(F | S)$ [2 puntos]</strong>:<br>
                $P(F|S) = \\frac{P(F \\cap S)}{P(S)} = \\frac{ambos}{esp} = \\frac{${ambos}}{${esp}} \\approx \\mathbf{${cond_fra_dado_esp.toFixed(3)}}$ (o $\\frac{${ambos}}{${esp}}$). [2 puntos]<br>
                * <strong>b) Probabilidad $P(S | \\text{Exacto 1})$ [1 punto]</strong>:<br>
                Estudiantes que cursan exactamente un idioma: $SoloS + SoloF = (${esp}-${ambos}) + (${fra}-${ambos}) = ${soloEsp} + ${soloFra} = ${exactUno}$.<br>
                $P(S|\\text{Exacto 1}) = \\frac{SoloS}{ExactoUno} = \\frac{${soloEsp}}{${exactUno}} \\approx \\mathbf{${cond_esp_dado_uno.toFixed(3)}}$ (o $\\frac{${soloEsp}}{${exactUno}}$). [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 [4 Puntos]:</strong><br>
                <strong>a) Probabilidad total de ir al cine $P(C)$ [2 puntos]:</strong><br>
                $P(C) = P(L) \\cdot P(C|L) + P(L') \\cdot P(C|L')$<br>
                $P(C) = ${pLluvia} \\cdot ${pCine_dado_L} + ${(1-pLluvia).toFixed(2)} \\cdot ${pCine_dado_noL} = ${(pLluvia*pCine_dado_L).toFixed(3)} + ${((1-pLluvia)*pCine_dado_noL).toFixed(3)} = \\mathbf{${pCine_total}}$ [2 puntos]<br>
                <strong>b) Probabilidad a posteriori $P(L | C)$ [2 puntos]:</strong><br>
                $P(L|C) = \\frac{P(L \\cap C)}{P(C)} = \\frac{P(L) \\cdot P(C|L)}{P(C)} = \\frac{${pLluvia} \\cdot ${pCine_dado_L}}{${pCine_total}} = \\frac{${(pLluvia*pCine_dado_L).toFixed(2)}}{${pCine_total}} \\approx \\mathbf{${pLluvia_dado_Cine.toFixed(4)}}$ (o en fracción). [2 puntos]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
