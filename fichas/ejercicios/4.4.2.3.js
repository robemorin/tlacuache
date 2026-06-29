import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.2. Probabilidad simple",
    titulo: "Ficha: Sucesos Independientes y Dependientes",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: SUCESOS INDEPENDIENTES - SOLO FÓRMULAS (3 PUNTOS)
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5
    
    // Independientes
    const pInt_ind = parseFloat((pA * pB).toFixed(3));
    const pUnion_ind = parseFloat((pA + pB - pInt_ind).toFixed(3));

    // Para el caso b, daremos un valor de unión
    const pUnion_dada = parseFloat((pA + pB - (pInt_ind - 0.08)).toFixed(3));

    // ==========================================
    // EJERCICIO 2: TIROS LIBRES - CONTEXTUALIZADO 1 (3 PUNTOS)
    // ==========================================
    const p1 = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.70).toFixed(2)); // 0.70, 0.75, 0.80
    const p2 = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.65).toFixed(2)); // 0.65, 0.70, 0.75

    const pAmbos = parseFloat((p1 * p2).toFixed(4));
    const pAlMenosUno = parseFloat((p1 + p2 - pAmbos).toFixed(4));

    // ==========================================
    // EJERCICIO 3: DEPORTES ESCOLARES - CONTEXTUALIZADO 2 (4 PUNTOS)
    // ==========================================
    // F: fútbol, B: baloncesto
    const pF = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.5).toFixed(1)); // 0.5, 0.6
    const pB_dep = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.4).toFixed(1)); // 0.4, 0.5
    
    // Decidir si son independientes
    const sonIndep = Math.random() > 0.5;
    let pAmbosDep;
    if (sonIndep) {
        pAmbosDep = parseFloat((pF * pB_dep).toFixed(2));
    } else {
        pAmbosDep = parseFloat((pF * pB_dep - 0.06).toFixed(2)); // no independientes
    }

    const cond_B_dado_F = pAmbosDep / pF;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Sucesos Independientes y Dependientes</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Independencia en la Probabilidad y Sucesos Condicionales</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Sean $A$ y $B$ dos sucesos tales que $P(A) = ${pA}$ y $P(B) = ${pB}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Suponiendo que $A$ y $B$ son sucesos independientes, halle los valores de la intersección $P(A \\cap B)$ y de la unión $P(A \\cup B)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) En otra situación, se sabe que $P(A \\cup B) = ${pUnion_dada}$. Justifique analíticamente si bajo estas condiciones los sucesos $A$ y $B$ son independientes.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 30px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> Un jugador de baloncesto realiza dos tiros libres consecutivos de forma independiente. La probabilidad de encestar el primer tiro es de $${p1}$ y la de encestar el segundo tiro es de $${p2}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Determine la probabilidad de que el jugador enceste ambos tiros libres.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Determine la probabilidad de que el jugador enceste al menos uno de los tiros libres.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 25px; margin-top: 20px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> En un centro escolar, se determinó que la probabilidad de que un alumno practique fútbol ($F$) es de $${pF}$ y la probabilidad de que practique baloncesto ($B$) es de $${pB_dep}$. Asimismo, la probabilidad de que un alumno practique ambos deportes de manera conjunta es de $${pAmbosDep}$. Se elige un alumno al azar.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Demuestre mediante cálculos de probabilidad si los sucesos $F$ y $B$ son independientes o dependientes.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Calcule la probabilidad de que el alumno practique baloncesto, sabiendo que ya practica fútbol.
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
                <strong>a) Supuesto independiente [2 puntos]:</strong><br>
                * Intersección: $P(A \\cap B) = P(A) \\cdot P(B) = ${pA} \\cdot ${pB} = \\mathbf{${pInt_ind}}$ [1 punto]<br>
                * Unión: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ${pA} + ${pB} - ${pInt_ind} = \\mathbf{${pUnion_ind}}$ [1 punto]<br>
                <strong>b) Justificación de independencia [1 punto]:</strong><br>
                * Calculamos la intersección real dada la unión $P(A \\cup B) = ${pUnion_dada}$:<br>
                $P(A \\cap B)_{\\text{real}} = P(A) + P(B) - P(A \\cup B) = ${pA} + ${pB} - ${pUnion_dada} = ${(pA + pB - pUnion_dada).toFixed(3)}$<br>
                * Comparamos con el producto de las probabilidades: $P(A) \\cdot P(B) = ${pInt_ind}$.<br>
                * Como $P(A \\cap B)_{\\text{real}} = ${(pA + pB - pUnion_dada).toFixed(3)} \\neq ${pInt_ind}$, **los sucesos son dependientes** (no son independientes). [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [3 Puntos]:</strong><br>
                * <strong>a) Ambos tiros [1 punto]</strong>: Dado que los sucesos son independientes, se multiplica:<br>
                $P(T_1 \\cap T_2) = P(T_1) \\cdot P(T_2) = ${p1} \\cdot ${p2} = \\mathbf{${pAmbos}}$ [1 punto]<br>
                * <strong>b) Al menos uno [2 puntos]</strong>: Se calcula mediante la unión:<br>
                $P(T_1 \\cup T_2) = P(T_1) + P(T_2) - P(T_1 \\cap T_2) = ${p1} + ${p2} - ${pAmbos} = \\mathbf{${pAlMenosUno}}$ [2 puntos]<br>
                *(O mediante el complemento: $1 - P(\\text{fallar ambos}) = 1 - (1-${p1})(1-${p2}) = 1 - (${(1-p1).toFixed(2)})(${(1-p2).toFixed(2)}) = \\mathbf{${pAlMenosUno}}$).*
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 [4 Puntos]:</strong><br>
                <strong>a) Demostración de independencia [2 puntos]:</strong><br>
                * Se calcula el producto: $P(F) \\cdot P(B) = ${pF} \\cdot ${pB_dep} = ${(pF * pB_dep).toFixed(2)}$. [1 punto]<br>
                * Se compara con la intersección dada $P(F \\cap B) = ${pAmbosDep}$.<br>
                * ${sonIndep 
                    ? `Como $P(F \\cap B) = P(F) \\cdot P(B) = ${pAmbosDep}$, **los sucesos son independientes**.` 
                    : `Como $P(F \\cap B) = ${pAmbosDep} \\neq P(F) \\cdot P(B) = ${(pF * pB_dep).toFixed(2)}$, **los sucesos son dependientes** (no independientes).`
                } [1 punto]<br>
                <strong>b) Probabilidad condicional [2 puntos]:</strong><br>
                * Aplicamos la fórmula de probabilidad condicional:<br>
                $P(B | F) = \\frac{P(B \\cap F)}{P(F)} = \\frac{${pAmbosDep}}{${pF}} = \\mathbf{${cond_B_dado_F.toFixed(3)}}$ (o $\\approx ${cond_B_dado_F.toFixed(2)}$). [2 puntos]<br>
                *(Nota: si los sucesos son independientes, se verifica que $P(B|F) = P(B) = ${pB_dep}$).*
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
