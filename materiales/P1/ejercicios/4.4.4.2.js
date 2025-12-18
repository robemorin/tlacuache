import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.4. Diagramas de Venn",
    titulo: "Estudiantes y Ciencias (3 Conjuntos)",
    tipo: 1,
    puntos: 10,
};

export async function generar(i) {
    // --- DATOS ALEATORIOS ---
    // N total approx 60-80
    // Intersección triple (Centro): 1 a 3
    const centro = Math.floor(Math.random() * 3) + 1;

    // Intersecciones dobles (incluyen el centro, así que restamos luego)
    // B n C (Biology & Chemistry)
    const B_and_C_total = Math.floor(Math.random() * 4) + 3; // 3-6
    const B_y_C_only = Math.max(0, B_and_C_total - centro);

    // P n C (Physics & Chemistry)
    const P_and_C_total = Math.floor(Math.random() * 10) + 10; // 10-19
    const P_y_C_only = Math.max(0, P_and_C_total - centro);

    // P n B (Physics & Biology)
    const P_and_B_total = Math.floor(Math.random() * 4) + 2; // 2-5
    const P_y_B_only = Math.max(0, P_and_B_total - centro);

    // Conjuntos totales
    // Biology total: 20-25
    const B_total = Math.floor(Math.random() * 6) + 20;
    // Solo Biology = Total - (B_y_C + B_y_P + Centro)
    const solo_B = Math.max(0, B_total - (B_y_C_only + P_y_B_only + centro));

    // Chemistry total: 25-30
    const C_total = Math.floor(Math.random() * 6) + 25;
    const solo_C = Math.max(0, C_total - (B_y_C_only + P_y_C_only + centro));

    // Physics total: 20-30
    const P_total = Math.floor(Math.random() * 11) + 20;
    const solo_P = Math.max(0, P_total - (P_y_B_only + P_y_C_only + centro));

    // Universo total reportado
    // Sumamos todas las regiones disjuntas
    const sum_regions = solo_B + solo_C + solo_P + B_y_C_only + P_y_C_only + P_y_B_only + centro;
    // Total estudiantes dado en el problema (puede haber algunos que no estudian nada)
    const N_total = sum_regions + Math.floor(Math.random() * 5);
    const ninguno = N_total - sum_regions;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> En un grupo de <strong>${N_total}</strong> estudiantes:
                <strong>${B_total}</strong> estudian Biología ($B$), 
                <strong>${C_total}</strong> estudian Química ($Q$), 
                <strong>${P_total}</strong> estudian Física ($F$), 
                <strong>${P_and_C_total}</strong> estudian Física y Química, 
                <strong>${B_and_C_total}</strong> estudian Biología y Química, 
                <strong>${P_and_B_total}</strong> estudian Física y Biología, 
                <strong>${centro}</strong> estudia las tres asignaturas.
            </p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Muestre esta información en un diagrama de Venn. Indique claramente el número de elementos en cada región.</span>
                    <span class="ib-mark">[3]</span><br>
                    
                </li>
                <div style="height: 300px;">
                        <!-- Espacio para dibujar -->
                        <center>
                         <tlacuache-venn 
                            ancho="280" 
                            n="3" 
                            conjuntos="'B','Q','F'"
                            s1="" s2="" s3="" s4="" s5="" s6="" s7="" s8=""
                        ></tlacuache-venn></center>
                    </div>
                <li>
                    <p>Halle cuántos estudiantes estudian:</p>
                    <ol type="i">
                        <li>
                            <span class="ib-texto">solamente Biología;</span>
                            <span class="ib-mark">[1]</span>
                        </li>
                        <tlacuache-renglon n="2" color="gray" alto="35"></tlacuache-renglon>
                        <li>
                            <span class="ib-texto">Física o Química;</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <tlacuache-renglon n="2" color="gray" alto="35"></tlacuache-renglon>
                        <li>
                            <span class="ib-texto">ninguna de las tres asignaturas (Biología, Física o Química);</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <tlacuache-renglon n="2" color="gray" alto="35"></tlacuache-renglon>
                        <li>
                            <span class="ib-texto">Física pero no Química.</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <tlacuache-renglon n="2" color="gray" alto="35"></tlacuache-renglon>
                    </ol>
                </li>
            </ol>
        </div>
    `;

    // --- RESPUESTAS ---
    // (b)(i) Solo B
    const ans_i = solo_B;

    // (b)(ii) F U Q = Total - (Solo B + Ninguno)
    // O suma de regiones de F y Q
    // Regiones F: Solo F, F y Q, F y B, Centro
    // Regiones Q: Solo Q, Q y B, Q y F (ya contado), Centro (ya contado)
    // Union = Solo F + Solo Q + (F y Q only) + (F y B only) + (Q y B only) + Centro
    const ans_ii = solo_P + solo_C + P_y_C_only + P_y_B_only + B_y_C_only + centro;

    // (b)(iii) Ninguno
    const ans_iii = ninguno;

    // (b)(iv) F pero no Q = F - (F inter Q) = Solo F + (F y B only)
    const ans_iv = solo_P + P_y_B_only;

    // Mapping tlacuache-venn regions (Standard mapping usually):
    // s1: Universo (Afuera)
    // s2: Solo A (Left) -> Solo B
    // s3: A n B (Top intersect) -> B n Q
    // s4: Solo B (Right) -> Solo Q
    // s5: A n C (Left intersect) -> B n F ?? No, tlacuache venn usually: A (Left), B (Right), C (Bottom)
    // Let's assume Sets are B(Left), Q(Right), F(Bottom).
    // s2: Only B
    // s4: Only Q
    // s8: Only F

    // s3: B n Q only
    // s5: B n F only
    // s7: Q n F only
    // s6: Center
    // s1: Outside

    const respuestaHTML = `
        <p><strong>Solución:</strong></p>
        <p>Calculando las regiones disjuntas:</p>
        <ul>
            <li>Solo 3 materias: <strong>${centro}</strong></li>
            <li>Solo B y Q = Total(B$\\cap$Q) - Centro = ${B_and_C_total} - ${centro} = <strong>${B_y_C_only}</strong></li>
            <li>Solo F y Q = Total(F$\\cap$Q) - Centro = ${P_and_C_total} - ${centro} = <strong>${P_y_C_only}</strong></li>
            <li>Solo B y F = Total(B$\\cap$F) - Centro = ${P_and_B_total} - ${centro} = <strong>${P_y_B_only}</strong></li>
            <li>Solo B = Total B - sumas inter = ${B_total} - (${B_y_C_only} + ${P_y_B_only} + ${centro}) = <strong>${solo_B}</strong></li>
            <li>Solo Q = Total Q - sumas inter = ${C_total} - (${B_y_C_only} + ${P_y_C_only} + ${centro}) = <strong>${solo_C}</strong></li>
            <li>Solo F = Total F - sumas inter = ${P_total} - (${P_y_B_only} + ${P_y_C_only} + ${centro}) = <strong>${solo_P}</strong></li>
            <li>Ninguno = Total - Suma regiones = ${N_total} - ${sum_regions} = <strong>${ninguno}</strong></li>
        </ul>
        
        <div style="display:flex; justify-content:center; margin: 20px 0;">
            <tlacuache-venn 
                ancho="350" 
                n="3" 
                conjuntos="'B','Q','F'"
                s1="${ninguno}"
                s2="${solo_B}"
                s3="${B_y_C_only}"
                s4="${solo_C}"
                s5="${P_y_B_only}"
                s6="${centro}"
                s7="${P_y_C_only}"
                s8="${solo_P}"
            ></tlacuache-venn>
        </div>
        
        <ul style="list-style:none; padding:0;">
            <li><strong>b)(i) Solamente Biología:</strong> ${solo_B}.</li>
            <li><strong>b)(ii) Física o Química ($F \\cup Q$):</strong> Suma de todo en F y Q. <br>
                $N(F) + N(Q) - N(F \\cap Q) = ${P_total} + ${C_total} - ${P_and_C_total} = $ <strong>${ans_ii}</strong>.</li>
            <li><strong>b)(iii) Ninguna:</strong> Región exterior $\\rightarrow$ <strong>${ans_iii}</strong>.</li>
            <li><strong>b)(iv) Física pero no Química ($F \\setminus Q$):</strong> <br>
                Restar intersección con Q al total de F: $N(F) - N(F \\cap Q) = ${P_total} - ${P_and_C_total} = $ <strong>${ans_iv}</strong>. <br>
                (O sumar Solo F + Solo F$\\cap$B: ${solo_P} + ${P_y_B_only} = ${ans_iv}).</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
