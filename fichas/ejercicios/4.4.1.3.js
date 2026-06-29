import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.1. Probabilidad experimental",
    titulo: "Ficha Temática: Diagramas de Venn y Operaciones de Conjuntos (4 Páginas)",
    puntos: 20,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: CAFÉ Y TÉ (2 CONJUNTOS, MODELACIÓN) [5 PUNTOS]
    // ==========================================
    const totalCafeTe = 80;
    const cafe = Math.floor(Math.random() * 10) + 45; // 45 a 54
    const te = Math.floor(Math.random() * 10) + 30;   // 30 a 39
    const ambos1 = Math.floor(Math.random() * 5) + 12; // 12 a 16

    const soloCafe = cafe - ambos1;
    const soloTe = te - ambos1;
    const ninguno1 = totalCafeTe - (soloCafe + soloTe + ambos1);

    const probSoloCafe = soloCafe / totalCafeTe;
    const probUnion = (soloCafe + soloTe + ambos1) / totalCafeTe;

    // ==========================================
    // EJERCICIO 2: INSTRUMENTOS (PROBABILIDAD CONDICIONAL) [5 PUNTOS]
    // ==========================================
    const totalInst = 50;
    const piano = Math.floor(Math.random() * 5) + 25; // 25 a 29
    const violin = Math.floor(Math.random() * 5) + 20; // 20 a 24
    const ambosInst = Math.floor(Math.random() * 3) + 8; // 8 a 10

    const soloPiano = piano - ambosInst;
    const soloViolin = violin - ambosInst;
    const exactamenteUno = soloPiano + soloViolin;

    const cond_violin_dado_piano = ambosInst / piano;
    const cond_piano_dado_uno = soloPiano / exactamenteUno;

    // ==========================================
    // EJERCICIO 3: REDES SOCIALES (3 CONJUNTOS, MODELACIÓN) [6 PUNTOS]
    // ==========================================
    const totalRedes = 100;
    const insta = 50;
    const tiktok = 40;
    const snap = 30;
    const inst_tik = 15;
    const inst_snap = 12;
    const tik_snap = 10;
    const todos3 = 5;

    // Desglose de las 8 regiones del Venn
    const r6_triple = todos3; // Todos: 5
    const r3_ins_tik = inst_tik - todos3; // Instagram y TikTok solamente: 10
    const r5_ins_snap = inst_snap - todos3; // Instagram y Snapchat solamente: 7
    const r7_tik_snap = tik_snap - todos3; // TikTok y Snapchat solamente: 5
    const r2_solo_ins = insta - (r3_ins_tik + r5_ins_snap + r6_triple); // Solo Instagram: 50 - 22 = 28
    const r4_solo_tik = tiktok - (r3_ins_tik + r7_tik_snap + r6_triple); // Solo TikTok: 40 - 20 = 20
    const r8_solo_snap = snap - (r5_ins_snap + r7_tik_snap + r6_triple); // Solo Snapchat: 30 - 17 = 13
    const r1_ninguno = totalRedes - (r2_solo_ins + r4_solo_tik + r8_solo_snap + r3_ins_tik + r5_ins_snap + r7_tik_snap + r6_triple); // Ninguno: 100 - 88 = 12

    const probDosOMas = (r3_ins_tik + r5_ins_snap + r7_tik_snap + r6_triple) / totalRedes;

    // ==========================================
    // EJERCICIO 4: IDIOMAS (3 CONJUNTOS, PROBABILIDADES COMPUESTAS) [4 PUNTOS]
    // ==========================================
    const s2_esp = Math.floor(Math.random() * 5) + 15;  // Solo Español
    const s3_esp_ing = Math.floor(Math.random() * 3) + 8; // Español e Inglés únicamente
    const s4_ing = Math.floor(Math.random() * 5) + 12;  // Solo Inglés
    const s5_esp_fra = Math.floor(Math.random() * 3) + 4; // Español y Francés únicamente
    const s6_todos = Math.floor(Math.random() * 2) + 3;   // Todos
    const s7_ing_fra = Math.floor(Math.random() * 3) + 5; // Inglés y Francés únicamente
    const s8_fra = Math.floor(Math.random() * 4) + 6;   // Solo Francés
    const s1_fuera = Math.floor(Math.random() * 5) + 8;  // Ninguno

    const totalIdiomas = s2_esp + s3_esp_ing + s4_ing + s5_esp_fra + s6_todos + s7_ing_fra + s8_fra + s1_fuera;

    // a) P(S ∩ E' ∩ F) -> Español y Francés pero no Inglés -> s5_esp_fra
    const probEspFraNoIng = s5_esp_fra / totalIdiomas;
    // b) P((S U E) ∩ F') -> Español o Inglés pero no Francés -> s2_esp + s3_esp_ing + s4_ing
    const probEspIngNoFra = (s2_esp + s3_esp_ing + s4_ing) / totalIdiomas;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            
            <!-- ================= PÁGINA 1 ================= -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Evaluación Temática: Teoría de Conjuntos y Probabilidad</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Parte 1: Modelación y Probabilidades Básicas de 2 Conjuntos</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 20</span>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> En una oficina con $${totalCafeTe}$ empleados, se realizó una encuesta sobre sus preferencias de bebidas calientes. Se encontró que a $${cafe}$ empleados les gusta el café, a $${te}$ les gusta el té, y a $${ambos1}$ les gustan ambas bebidas.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Complete el siguiente diagrama de Venn de dos conjuntos escribiendo las cantidades de personas que corresponden a cada una de las cuatro regiones.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    
                    <!-- Render del diagrama de Venn en blanco para que lo llenen -->
                    <div style="display: flex; justify-content: center; margin: 15px 0;">
                        <tlacuache-venn ancho="300" conjuntos="'Café','Té'" s1=" " s2=" " s3=" " s4=" "></tlacuache-venn>
                    </div>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Halle la probabilidad de que a un empleado elegido al azar le guste el café únicamente.
                        <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                    </p>
                    <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        c) Halle la probabilidad de que a un empleado elegido al azar le guste el café o el té.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- SALTO DE PÁGINA 2 -->
            <div style="page-break-before: always; break-before: page;"></div>

            <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px; margin-top: 15px;">
                <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Parte 2: Probabilidad Condicional en 2 Conjuntos</span>
            </div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> En una academia de música con $${totalInst}$ alumnos, $${piano}$ tocan el piano, $${violin}$ tocan el violín y $${ambosInst}$ tocan ambos instrumentos. Se elige un alumno al azar.
                </p>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Calcule la probabilidad de que el alumno toque el violín, dado que se sabe que toca el piano.
                        <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                    </p>
                    <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 25px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Calcule la probabilidad de que el alumno toque el piano, dado que se sabe que toca exactamente un solo instrumento.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- SALTO DE PÁGINA 3 -->
            <div style="page-break-before: always; break-before: page;"></div>

            <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px; margin-top: 15px;">
                <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Parte 3: Diagramas de Venn de 3 Conjuntos</span>
            </div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> Se realizó una encuesta a un grupo de $${totalRedes}$ estudiantes acerca del uso de tres redes sociales: Instagram ($I$), TikTok ($T$) y Snapchat ($S$). Los resultados recopilados fueron los siguientes:
                </p>
                
                <ul style="font-size: 1em; line-height: 1.6; margin-left: 20px; margin-bottom: 20px;">
                    <li>$50$ estudiantes utilizan Instagram.</li>
                    <li>$40$ estudiantes utilizan TikTok.</li>
                    <li>$30$ estudiantes utilizan Snapchat.</li>
                    <li>$15$ utilizan tanto Instagram como TikTok.</li>
                    <li>$12$ utilizan tanto Instagram como Snapchat.</li>
                    <li>$10$ utilizan tanto TikTok como Snapchat.</li>
                    <li>$5$ utilizan las tres plataformas mencionadas.</li>
                </ul>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Determine el número de estudiantes que utilizan únicamente Instagram.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Determine el número de estudiantes que no utilizan ninguna de las tres redes sociales.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        c) Halle la probabilidad de que un estudiante elegido al azar utilice al menos dos de las redes sociales encuestadas.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- SALTO DE PÁGINA 4 -->
            <div style="page-break-before: always; break-before: page;"></div>

            <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px; margin-top: 15px;">
                <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Parte 4: Operaciones Avanzadas de Conjuntos en 3D</span>
            </div>

            <!-- Ejercicio 4 -->
            <div>
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 4.</strong> En una escuela de idiomas, se analizó el número de estudiantes que hablan Español ($S$), Inglés ($E$) o Francés ($F$). Los datos obtenidos se representaron en el siguiente diagrama de Venn:
                </p>

                <!-- Render de Venn de 3 conjuntos con valores -->
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <tlacuache-venn ancho="320" n="3" conjuntos="'S','E','F'" s1="${s1_fuera}" s2="${s2_esp}" s3="${s3_esp_ing}" s4="${s4_ing}" s5="${s5_esp_fra}" s6="${s6_todos}" s7="${s7_ing_fra}" s8="${s8_fra}"></tlacuache-venn>
                </div>

                <p style="font-size: 1.05em; line-height: 1.5; margin-bottom: 10px;">
                    Si se selecciona un alumno al azar de la muestra, determine la probabilidad de que dicho alumno:
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Hable Español y Francés, pero no Inglés, es decir: $P(S \\cap E' \\cap F)$.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Hable Español o Inglés, pero no Francés, es decir: $P((S \\cup E) \\cap F')$.
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
                <strong>Ejercicio 1 (Modelación 2 conjuntos) [5 Puntos]:</strong><br>
                <strong>a) Llenado del diagrama [2 puntos]:</strong><br>
                * Intersección (ambos): $v_{\\text{ambos}} = \\mathbf{${ambos1}}$.<br>
                * Solo Café: $Cafe - Ambos = ${cafe} - ${ambos1} = \\mathbf{${soloCafe}}$.<br>
                * Solo Té: $Te - Ambos = ${te} - ${ambos1} = \\mathbf{${soloTe}}$.<br>
                * Exterior (ninguno): $80 - (${soloCafe} + ${soloTe} + ${ambos1}) = \\mathbf{${ninguno1}}$. [2 puntos por asignar todos correctamente, 1 pto si comete un error menor]<br>
                <strong>b) Café únicamente [1 punto]:</strong><br>
                $P(\\text{Solo Café}) = \\frac{${soloCafe}}{80} \\approx \\mathbf{${probSoloCafe.toFixed(3)}}$. [1 punto]<br>
                <strong>c) Café o Té (Unión) [2 puntos]:</strong><br>
                $P(\\text{Café } \\cup \\text{ Té}) = \\frac{${soloCafe} + ${soloTe} + ${ambos1}}{80} = \\frac{${soloCafe + soloTe + ambos1}}{80} \\approx \\mathbf{${probUnion.toFixed(3)}}$. [2 puntos]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 (Probabilidad Condicional) [5 Puntos]:</strong><br>
                <strong>a) Violín dado Piano ($P(V | P)$) [3 puntos]:</strong><br>
                * Identificación de fórmula: $P(V|P) = \\frac{P(V \\cap P)}{P(P)}$ [1 punto]<br>
                * Cálculo de casos favorables (ambos) y posibles (piano): $Fav = ${ambosInst}$, $Pos = ${piano}$ [1 punto]<br>
                * Resultado: $P(V|P) = \\frac{${ambosInst}}{${piano}} \\approx \\mathbf{${cond_violin_dado_piano.toFixed(3)}}$. [1 punto]<br>
                <strong>b) Piano dado exactamente uno ($P(P | \\text{Exacto 1})$) [2 puntos]:</strong><br>
                * Total que tocan exactamente uno: $SoloPiano + SoloViolin = ${soloPiano} + ${soloViolin} = ${exactamenteUno}$. [1 punto]<br>
                * Probabilidad: $P(P | \\text{Exacto 1}) = \\frac{SoloPiano}{ExactamenteUno} = \\frac{${soloPiano}}{${exactamenteUno}} \\approx \\mathbf{${cond_piano_dado_uno.toFixed(3)}}$. [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 (Modelación 3 conjuntos) [6 Puntos]:</strong><br>
                * Desglose detallado de las regiones a partir del centro hacia afuera:<br>
                1. Intersección triple: $\\mathbf{${r6_triple}}$<br>
                2. Intersecciones dobles puras:<br>
                   - Instagram y TikTok solamente: $15 - 5 = \\mathbf{${r3_ins_tik}}$<br>
                   - Instagram y Snapchat solamente: $12 - 5 = \\mathbf{${r5_ins_snap}}$<br>
                   - TikTok y Snapchat solamente: $10 - 5 = \\mathbf{${r7_tik_snap}}$<br>
                3. Solo plataformas únicas:<br>
                   - Solo Instagram: $50 - (${r3_ins_tik} + ${r5_ins_snap} + ${r6_triple}) = \\mathbf{${r2_solo_ins}}$<br>
                   - Solo TikTok: $40 - (${r3_ins_tik} + ${r7_tik_snap} + ${r6_triple}) = \\mathbf{${r4_solo_tik}}$<br>
                   - Solo Snapchat: $30 - (${r5_ins_snap} + ${r7_tik_snap} + ${r6_triple}) = \\mathbf{${r8_solo_snap}}$<br>
                4. Ninguno: $100 - (\\text{Suma de las 7 regiones}) = 100 - 88 = \\mathbf{${r1_ninguno}}$<br>
                * <strong>a) Únicamente Instagram [2 puntos]</strong>: $\\mathbf{${r2_solo_ins}}$ estudiantes. [2 puntos]<br>
                * <strong>b) Ninguna red social [2 puntos]</strong>: $\\mathbf{${r1_ninguno}}$ estudiantes. [2 puntos]<br>
                * <strong>c) Al menos dos redes sociales [2 puntos]</strong>: Suma de las intersecciones dobles y la triple:<br>
                $P(\\ge 2) = \\frac{${r3_ins_tik} + ${r5_ins_snap} + ${r7_tik_snap} + ${r6_triple}}{100} = \\frac{${r3_ins_tik + r5_ins_snap + r7_tik_snap + r6_triple}}{100} = \\mathbf{${probDosOMas.toFixed(2)}}$ (o $\\frac{27}{100}$). [2 puntos]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #f1c232; padding-left: 10px;">
                <strong>Ejercicio 4 (Operaciones Avanzadas 3D) [4 Puntos]:</strong><br>
                * Población de idiomas total: $Total = ${s2_esp} + ${s3_esp_ing} + ${s4_ing} + ${s5_esp_fra} + ${s6_todos} + ${s7_ing_fra} + ${s8_fra} + ${s1_fuera} = ${totalIdiomas}$.<br>
                * <strong>a) Probabilidad $P(S \\cap E' \\cap F)$ [2 puntos]</strong>: Hablan Español y Francés, pero no Inglés. Es la región de Español y Francés exclusivamente (sin intersección triple).<br>
                $P(S \\cap E' \\cap F) = \\frac{${s5_esp_fra}}{${totalIdiomas}} \\approx \\mathbf{${probEspFraNoIng.toFixed(3)}}$. [2 puntos]<br>
                * <strong>b) Probabilidad $P((S \\cup E) \\cap F')$ [2 puntos]</strong>: Hablan Español o Inglés, pero no Francés. Se toman todas las regiones de Español e Inglés que estén fuera del círculo de Francés.<br>
                $P((S \\cup E) \\cap F') = \\frac{SoloEsp + SoloIng + EspIng}{Total} = \\frac{${s2_esp} + ${s4_ing} + ${s3_esp_ing}}{${totalIdiomas}} = \\frac{${s2_esp + s4_ing + s3_esp_ing}}{${totalIdiomas}} \\approx \\mathbf{${probEspIngNoFra.toFixed(3)}}$. [2 puntos]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
