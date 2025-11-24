import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.4. Diagramas de Venn",
    titulo: "Interpretación de diagrama de Venn (3 conjuntos)",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- DATOS DEL PROBLEMA ---
    // Asignación: A=Golf, B=Tenis, C=Swimming (Natación)
    
    const solo_G = 11; // Solo A
    const solo_T = 6;  // Solo B
    const solo_S = 8;  // Solo C
    
    const G_y_T = 2;   // A n B (sin C)
    const G_y_S = 1;   // A n C (sin B)
    const T_y_S = 4;   // B n C (sin A)
    
    const centro = 3;  // A n B n C
    const afuera = 4;  // Universo

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Los deportes ofrecidos en una villa de retiro son Golf ($G$), Tenis ($T$) y Natación ($S$). El diagrama de Venn muestra el número de personas involucradas en cada actividad.</p>
            
            <div style="display:flex; justify-content:center; margin: 20px 0;">
                <tlacuache-venn 
                    ancho="400" 
                    n="3" 
                    conjuntos="'G','T','S'"
                    
                    s1="${afuera}"
                    s2="${solo_G}"
                    s3="${G_y_T}"
                    s4="${solo_T}"
                    s5="${G_y_S}"
                    s6="${centro}"
                    s7="${T_y_S}"
                    s8="${solo_S}"
                ></tlacuache-venn>
            </div>

            <ol class="ib-lista">
                <li>
                    <p>Cuántas personas:</p>
                    <ol>
                        <li>
                            <span class="ib-texto">¿Juegan solamente golf?</span>
                            <span class="ib-mark">[1]</span>
                        </li>
                        <li>
                            <span class="ib-texto">¿Juegan tanto tenis como golf?</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <li>
                            <span class="ib-texto">¿No juegan golf?</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
                <li>
                    <span class="ib-texto">Sombree la parte del diagrama de Venn que representa el conjunto $G^{c} \\cap S$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
            </ol>
            
        <tlacuache-renglon n="6" color="gray" alto="35"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a)(ii) Tenis y Golf (Total intersección) = (G n T solo) + Centro
    const respAii = G_y_T + centro; 

    // (a)(iii) No juegan Golf = Universo - (Todo el círculo G)
    // Círculo G = solo_G + G_y_T + G_y_S + centro = 11 + 2 + 1 + 3 = 17
    // Total personas = 11+6+8+2+1+4+3+4 = 39
    // No Golf = 39 - 17 = 22
    // O sumando regiones externas a G: solo_T + solo_S + T_y_S + afuera
    const respAiii = solo_T + solo_S + T_y_S + afuera;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a) (i)</strong> Solo Golf: Región exclusiva de G $\\rightarrow$ <strong>${solo_G}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>a) (ii)</strong> Tenis y Golf ($G \\cap T$): <br>
            Suma de la intersección superior y el centro: $${G_y_T} + ${centro} = $ <strong>${respAii}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>a) (iii)</strong> No juegan Golf ($G'$): <br>
            Suma de todas las regiones fuera del círculo G: <br>
            $T_{\\text{solo}} + S_{\\text{solo}} + (T \\cap S) + \\text{Fuera}$ <br>
            $${solo_T} + ${solo_S} + ${T_y_S} + ${afuera} = $ <strong>${respAiii}</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> $G' \\cap S$ (En S pero no en G): <br>
            Se debe sombrear la región inferior del círculo S (valor ${solo_S}) y la intersección derecha S-T (valor ${T_y_S}).</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}