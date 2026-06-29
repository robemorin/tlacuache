import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.1. Probabilidad experimental",
    titulo: "Ficha: Probabilidad con Diagramas de Venn",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: DIAGRAMA DE VENN DE 2 CONJUNTOS (4 PUNTOS)
    // ==========================================
    const v1 = Math.floor(Math.random() * 8) + 12; // Solo B: 12 a 19
    const v2 = Math.floor(Math.random() * 5) + 6;  // Ambos B y S: 6 a 10
    const v3 = Math.floor(Math.random() * 15) + 25; // Solo S: 25 a 39
    const v4 = Math.floor(Math.random() * 5) + 3;  // Ninguno: 3 a 7
    const total1 = v1 + v2 + v3 + v4;

    const prob1_ambos = v2 / total1;
    const prob1_ninguno = v4 / total1;
    const prob1_exact1 = (v1 + v3) / total1;

    // ==========================================
    // EJERCICIO 2: DIAGRAMA DE VENN DE 3 CONJUNTOS (6 PUNTOS)
    // ==========================================
    const s2_val = Math.floor(Math.random() * 6) + 8;  // Solo S: 8 a 13
    const s3_val = Math.floor(Math.random() * 4) + 3;  // S y R solamente: 3 a 6
    const s4_val = Math.floor(Math.random() * 5) + 7;  // Solo R: 7 a 11
    const s5_val = Math.floor(Math.random() * 4) + 4;  // S y A solamente: 4 a 7
    const s6_val = Math.floor(Math.random() * 3) + 2;  // Triple intersección: 2 a 4
    const s7_val = Math.floor(Math.random() * 3) + 1;  // R y A solamente: 1 a 3
    const s8_val = Math.floor(Math.random() * 5) + 5;  // Solo A: 5 a 9
    const s1_val = Math.floor(Math.random() * 6) + 8;  // Fuera: 8 a 13
    
    const total2 = s2_val + s3_val + s4_val + s5_val + s6_val + s7_val + s8_val + s1_val;

    // a) juega solo rugby (s4)
    const prob2_a = s4_val / total2;
    // b) juega fútbol y tiro con arco (s5 + s6) -> S ∩ A
    const prob2_b = (s5_val + s6_val) / total2;
    // c) no juega fútbol ni rugby -> fuera de S u R -> s8 + s1
    const prob2_c = (s8_val + s1_val) / total2;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- Cabecera -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Diagramas de Venn y Probabilidad</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Análisis de Eventos Compuestos mediante Conjuntos</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> En una encuesta realizada en una estación de esquí, se preguntó a los visitantes si les gustaba el esquí alpino ($S$) o el snowboard ($B$). Los resultados se muestran en el siguiente diagrama de Venn:
                </p>

                <!-- Render de Venn de 2 conjuntos usando Custom Element local -->
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <tlacuache-venn ancho="300" conjuntos="'B','S'" s1="${v4}" s2="${v1}" s3="${v2}" s4="${v3}"></tlacuache-venn>
                </div>

                <p style="font-size: 1.05em; line-height: 1.5; margin-bottom: 10px;">
                    Si se elige una persona al azar, halle la probabilidad de que le guste:
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Ambas actividades.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Ninguna de las dos actividades.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        c) Exactamente una de las dos actividades.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 25px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> El siguiente diagrama de Venn muestra el número de estudiantes de un grupo que practican fútbol ($S$), rugby ($R$) o tiro con arco ($A$):
                </p>

                <!-- Render de Venn de 3 conjuntos usando Custom Element local -->
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <tlacuache-venn ancho="320" n="3" conjuntos="'S','R','A'" s1="${s1_val}" s2="${s2_val}" s3="${s3_val}" s4="${s4_val}" s5="${s5_val}" s6="${s6_val}" s7="${s7_val}" s8="${s8_val}"></tlacuache-venn>
                </div>

                <p style="font-size: 1.05em; line-height: 1.5; margin-bottom: 10px;">
                    Determine la probabilidad de que un estudiante elegido al azar:
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Practique únicamente rugby.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Practique tanto fútbol como tiro con arco.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        c) No practique ni fútbol ni rugby.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
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
                <strong>Ejercicio 1 [4 Puntos]:</strong><br>
                * Población encuestada total: $Total = ${v1} + ${v2} + ${v3} + ${v4} = ${total1}$.<br>
                * <strong>a) Ambas actividades [1 punto]</strong>: $P(B \\cap S) = \\frac{${v2}}{${total1}} \\approx \\mathbf{${prob1_ambos.toFixed(3)}}$.<br>
                * <strong>b) Ninguna de las dos [1 punto]</strong>: $P((B \\cup S)') = \\frac{${v4}}{${total1}} \\approx \\mathbf{${prob1_ninguno.toFixed(3)}}$.<br>
                * <strong>c) Exactamente una actividad [2 puntos]</strong>: $P(\\text{Solo B o Solo S}) = \\frac{${v1} + ${v3}}{${total1}} = \\frac{${v1 + v3}}{${total1}} \\approx \\mathbf{${prob1_exact1.toFixed(3)}}$.
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [6 Puntos]:</strong><br>
                * Población estudiantil total: $Total = ${s2_val} + ${s3_val} + ${s4_val} + ${s5_val} + ${s6_val} + ${s7_val} + ${s8_val} + ${s1_val} = ${total2}$.<br>
                * <strong>a) Únicamente rugby [2 puntos]</strong>: $P(\\text{Solo R}) = \\frac{f_{\\text{Solo R}}}{Total} = \\frac{${s4_val}}{${total2}} \\approx \\mathbf{${prob2_a.toFixed(3)}}$.<br>
                * <strong>b) Fútbol y tiro con arco [2 puntos]</strong>: Corresponde a la intersección $S \\cap A$.<br>
                $P(S \\cap A) = \\frac{f_{S \\cap A \\setminus R} + f_{S \\cap R \\cap A}}{Total} = \\frac{${s5_val} + ${s6_val}}{${total2}} = \\frac{${s5_val + s6_val}}{${total2}} \\approx \\mathbf{${prob2_b.toFixed(3)}}$.<br>
                * <strong>c) Ni fútbol ni rugby [2 puntos]</strong>: Corresponde a los estudiantes fuera de $S \\cup R$, es decir, quienes practican solo tiro con arco ($A$) o ninguna asignatura.<br>
                $P((S \\cup R)') = \\frac{f_{\\text{Solo A}} + f_{\\text{Ninguna}}}{Total} = \\frac{${s8_val} + ${s1_val}}{${total2}} = \\frac{${s8_val + s1_val}}{${total2}} \\approx \\mathbf{${prob2_c.toFixed(3)}}$.
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
