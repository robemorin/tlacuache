import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.2. Probabilidad simple",
    titulo: "Ficha: Ley de la Adición y Sucesos Mutuamente Excluyentes",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: APLICACIÓN DIRECTA DE LA LEY DE LA ADICIÓN (3 PUNTOS)
    // ==========================================
    // P(A) = pA, P(B) = pB, P(A n B) = pInt. Hallar P(A u B)
    const pA = parseFloat((Math.floor(Math.random() * 4) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5, 0.6
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4
    const pInt = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.05).toFixed(2)); // 0.05, 0.10, 0.15
    const pUnion = parseFloat((pA + pB - pInt).toFixed(2));

    // ==========================================
    // EJERCICIO 2: IDENTIFICACIÓN DE EXCLUSIVIDAD (3 PUNTOS)
    // ==========================================
    // Si P(X) = pX, P(Y) = pY, y P(X u Y) = pUnion2. Hallar P(X n Y) y si son excluyentes.
    // Haremos que la intersección sea 0 para que SÍ sean excluyentes, o mayor a 0 para que NO lo sean.
    const sonExcluyentes = Math.random() > 0.5;
    const pX = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5
    const pY = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4
    
    let pInt2, pUnion2;
    if (sonExcluyentes) {
        pInt2 = 0.0;
        pUnion2 = parseFloat((pX + pY).toFixed(2));
    } else {
        pInt2 = parseFloat((Math.floor(Math.random() * 2) * 0.05 + 0.1).toFixed(2)); // 0.10, 0.15
        pUnion2 = parseFloat((pX + pY - pInt2).toFixed(2));
    }

    // ==========================================
    // EJERCICIO 3: CONTEXTO DE CLASE Y SUCESOS EXCLUYENTES (4 PUNTOS)
    // ==========================================
    // Ejemplo 13 del PDF: clase de N alumnos, A obtienen calificación A, B obtienen B.
    const totalClase = 30;
    const cantA = Math.floor(Math.random() * 4) + 6;  // 6 a 9 alumnos con A
    const cantB = Math.floor(Math.random() * 5) + 10; // 10 a 14 alumnos con B

    const probA = cantA / totalClase;
    const probB = cantB / totalClase;
    const probUnion3 = (cantA + cantB) / totalClase;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Ley de la Adición y Sucesos Excluyentes</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Ley de la adición de probabilidades y eventos mutuamente excluyentes</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 25px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Sean $A$ y $B$ dos sucesos tales que $P(A) = ${pA}$, $P(B) = ${pB}$ y $P(A \\cap B) = ${pInt}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        Halle el valor de la probabilidad de la unión de ambos sucesos, $P(A \\cup B)$.
                        <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 25px; margin-top: 20px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> Se definen dos sucesos $X$ e $Y$ de modo que sus probabilidades teóricas corresponden a $P(X) = ${pX}$, $P(Y) = ${pY}$ y $P(X \\cup Y) = ${pUnion2}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Calcule la probabilidad de la intersección $P(X \\cap Y)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Indique si los sucesos $X$ e $Y$ son mutuamente excluyentes (disjuntos). Justifique detalladamente su respuesta.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 25px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> En un grupo escolar de $${totalClase}$ estudiantes que rindió una prueba de Historia, se observó que $${cantA}$ estudiantes obtuvieron una calificación de "Excelente" ($A$) y $${cantB}$ estudiantes obtuvieron una calificación de "Suficiente" ($B$). Se selecciona un estudiante de este grupo al azar.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Justifique por qué los sucesos $A$ y $B$ son mutuamente excluyentes en este contexto.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Halle la probabilidad de que el estudiante seleccionado al azar haya obtenido una calificación de "Excelente" o de "Suficiente", es decir, $P(A \\cup B)$.
                        <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
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
                * Aplicando la Ley de la Adición:<br>
                $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ [1 punto por la fórmula]<br>
                $P(A \\cup B) = ${pA} + ${pB} - ${pInt}$ [1 punto por sustitución]<br>
                $P(A \\cup B) = \\mathbf{${pUnion}}$ [1 punto por el resultado final].
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [3 Puntos]:</strong><br>
                <strong>a) Cálculo de la intersección [2 puntos]:</strong><br>
                * Despejar $P(X \\cap Y)$ de la ley de adición:<br>
                $P(X \\cap Y) = P(X) + P(Y) - P(X \\cup Y)$ [1 punto]<br>
                $P(X \\cap Y) = ${pX} + ${pY} - ${pUnion2} = \\mathbf{${pInt2}}$ [1 punto]<br>
                <strong>b) Exclusividad [1 punto]:</strong><br>
                * ${sonExcluyentes 
                    ? `Los sucesos son **mutuamente excluyentes** ya que la probabilidad de su intersección es exactamente cero ($P(X \\cap Y) = 0$).`
                    : `Los sucesos **no son mutuamente excluyentes** ya que existe una probabilidad mayor a cero de que ocurran en conjunto ($P(X \\cap Y) = ${pInt2} \\neq 0$).`
                } [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 [4 Puntos]:</strong><br>
                <strong>a) Justificación de exclusividad [1 punto]:</strong><br>
                * Es imposible que un estudiante obtenga simultáneamente dos calificaciones distintas ("Excelente" y "Suficiente") en la misma prueba de Historia. Por lo tanto, la intersección es nula, $P(A \\cap B) = 0$. [1 punto]<br>
                <strong>b) Cálculo de $P(A \\cup B)$ [3 puntos]:</strong><br>
                * Probabilidad de cada suceso:<br>
                $P(A) = \\frac{${cantA}}{${totalClase}}$ y $P(B) = \\frac{${cantB}}{${totalClase}}$ [1 punto]<br>
                * Ley de adición para sucesos mutuamente excluyentes:<br>
                $P(A \\cup B) = P(A) + P(B) = \\frac{${cantA}}{${totalClase}} + \\frac{${cantB}}{${totalClase}} = \\frac{${cantA + cantB}}{${totalClase}}$ [1 punto]<br>
                * Resultado final:<br>
                $P(A \\cup B) = \\mathbf{${probUnion3.toFixed(3)}}$ (o $\\frac{${cantA + cantB}}{30}$). [1 punto]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
