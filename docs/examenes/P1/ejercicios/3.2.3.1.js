import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.3. Reglas del seno y coseno (Rumbos)",
    titulo: "Navegación y rumbos en triángulos no rectángulos",
    tipo: 1, // 1 = Abierto
    puntos: 8 // Asignado: [1] para a, [3] para b, [4] para c
};

export async function generar(i) {
    // --- VARIABLES DINÁMICAS ---
    const tipoContexto = Math.random() < 0.5 ? 'barco' : 'avion';
    
    let ctx = {};
    if (tipoContexto === 'barco') {
        ctx = {
            vehiculo: 'un barco de carga',
            verbo: 'navega',
            origen: 'Lomé (M)',
            escala: 'São Tomé (S)',
            destino: 'Libreville (V)',
            accionEscala: 'donde descarga su cargamento',
            retorno: 'regresa directamente a Lomé',
            trayectos: 'estos trayectos'
        };
    } else {
        ctx = {
            vehiculo: 'un helicóptero de rescate',
            verbo: 'vuela',
            origen: 'Base Alfa (M)',
            escala: 'Base Beta (S)',
            destino: 'Base Gamma (V)',
            accionEscala: 'donde recoge suministros',
            retorno: 'regresa directamente a la Base Alfa',
            trayectos: 'estas trayectorias'
        };
    }

    // Distancias aleatorias en km
    const d1 = (Math.floor(Math.random() * 9) + 14) * 50;  // 700 a 1100 km (múltiplos de 50)
    const d2 = (Math.floor(Math.random() * 5) + 5) * 50;   // 250 a 450 km (múltiplos de 50)
    
    // Rumbo inicial (bearing) en grados
    const theta = Math.floor(Math.random() * 6) * 5 + 120; // 120, 125, 130, 135, 140, 145 grados

    // --- CÁLCULOS TRIGONOMÉTRICOS ---
    // El rumbo theta está en el segundo cuadrante (Sur-Este).
    // El ángulo interior en S (VŜM) es 270 - theta.
    const angleS_deg = 270 - theta;
    const angleS_rad = angleS_deg * Math.PI / 180;

    // Distancia de retorno (ley del coseno)
    const mv_sq = d1 * d1 + d2 * d2 - 2 * d1 * d2 * Math.cos(angleS_rad);
    const mv = Math.sqrt(mv_sq);

    // Ángulo en V (M\hat{V}S) usando la ley del seno: sin(V)/d1 = sin(S)/mv
    const sinV = (d1 * Math.sin(angleS_rad)) / mv;
    const angleV_rad = Math.asin(sinV);
    const angleV_deg = angleV_rad * 180 / Math.PI;

    // Rumbo de retorno (desde V hacia M)
    // El trayecto de S a V es hacia el este (rumbo 90). El vector VS apunta al oeste (rumbo 270).
    // El vector VM está al norte de VS, por lo que el rumbo de M desde V es 270 + angleV.
    const bearingReturn = 270 + angleV_deg;

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> ${ctx.vehiculo} ${ctx.verbo} $${d1}\\text{ km}$ con una demora de $${theta}^\\circ$ desde ${ctx.origen} hasta ${ctx.escala}, ${ctx.accionEscala}.</p>
            <p>A continuación, ${ctx.verbo} $${d2}\\text{ km}$ hacia el este: desde ${ctx.escala} hasta ${ctx.destino}. Desde ${ctx.destino} ${ctx.retorno}.</p>
            <p>Se muestran ${ctx.trayectos} en la siguiente figura (la figura no está dibujada a escala):</p>

            <div style="text-align: center; margin: 20px 0;">
                <svg width="280" height="200" viewBox="0 0 280 200" style="background: white; border: 1px solid #ccc; border-radius: 4px;">
                    <!-- Rosa de los vientos (Norte) en M -->
                    <line x1="50" y1="50" x2="50" y2="15" stroke="black" stroke-width="1.5" marker-end="url(#arrow)"/>
                    <text x="47" y="12" font-family="sans-serif" font-size="10" font-weight="bold">N</text>
                    
                    <!-- Vértices y líneas -->
                    <!-- M(50, 50), S(170, 150) (aproximado para rumbo ~135), V(250, 150) (al este de S) -->
                    <line x1="50" y1="50" x2="170" y2="150" stroke="blue" stroke-width="2"/>
                    <line x1="170" y1="150" x2="250" y2="150" stroke="blue" stroke-width="2"/>
                    <line x1="250" y1="150" x2="50" y2="50" stroke="blue" stroke-width="2" stroke-dasharray="4"/>
                    
                    <!-- Puntos de los vértices -->
                    <circle cx="50" cy="50" r="4" fill="black"/>
                    <circle cx="170" cy="150" r="4" fill="black"/>
                    <circle cx="250" cy="150" r="4" fill="black"/>
                    
                    <!-- Etiquetas de vértices -->
                    <text x="35" y="55" font-family="sans-serif" font-size="12" font-weight="bold">M</text>
                    <text x="165" y="170" font-family="sans-serif" font-size="12" font-weight="bold">S</text>
                    <text x="255" y="165" font-family="sans-serif" font-size="12" font-weight="bold">V</text>
                    
                    <!-- Etiquetas de distancias -->
                    <text x="85" y="115" font-family="sans-serif" font-size="10" fill="gray">$${d1}\\text{ km}$</text>
                    <text x="200" y="142" font-family="sans-serif" font-size="10" fill="gray">$${d2}\\text{ km}$</text>
                    
                    <!-- Ángulo en M (rumbo) -->
                    <path d="M 50 35 A 15 15 0 0 1 60 58" fill="none" stroke="red" stroke-width="1.2"/>
                    <text x="63" y="38" font-family="sans-serif" font-size="9" fill="red">$${theta}^\\circ$</text>

                    <!-- Definición de flecha -->
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="black"/>
                        </marker>
                    </defs>
                </svg>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle el tamaño del ángulo $V\\widehat{S}M$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                
                <li>
                    <span class="ib-texto">Calcule la distancia de retorno, $MV$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                
                <li>
                    <span class="ib-texto">Calcule la demora (rumbo) de $M$ desde $V$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
        </div>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="20" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>a)</strong> Hallar el ángulo $V\\widehat{S}M$: <br>
                El rumbo inicial desde $M$ a $S$ es de $${theta}^\\circ$. Al trazar la línea norte-sur paralela en $S$: <br>
                El rumbo de retorno de $S$ a $M$ es de $${theta}^\\circ + 180^\\circ = ${(theta + 180)}^\\circ$. <br>
                Esto significa que la línea $SM$ hace un ángulo de $${(180 - theta)}^\\circ$ al oeste del norte en $S$. <br>
                Dado que el trayecto de $S$ a $V$ es directo hacia el este, el ángulo con respecto al norte es de $90^\\circ$. <br>
                Por lo tanto, el ángulo total $V\\widehat{S}M$ es: <br>
                $V\\widehat{S}M = 90^\\circ + (180^\\circ - ${theta}^\\circ) = 270^\\circ - ${theta}^\\circ = $ <strong>$${angleS_deg}^\\circ$</strong>.
            </li>
            <br>
            <li><strong>b)</strong> Calcular la distancia $MV$ usando la ley del coseno: <br>
                $MV^2 = MS^2 + SV^2 - 2 \\cdot MS \\cdot SV \\cdot \\cos(V\\widehat{S}M)$ <br>
                $MV^2 = ${d1}^2 + ${d2}^2 - 2 \\cdot (${d1}) \\cdot (${d2}) \\cdot \\cos(${angleS_deg}^\\circ)$ <br>
                $MV^2 = ${d1*d1} + ${d2*d2} - ${2*d1*d2} \\cdot (${Math.cos(angleS_rad).toFixed(4)})$ <br>
                $MV^2 \\approx ${(d1*d1 + d2*d2 - 2*d1*d2*Math.cos(angleS_rad)).toFixed(2)}$ <br>
                $MV \\approx \\sqrt{${(d1*d1 + d2*d2 - 2*d1*d2*Math.cos(angleS_rad)).toFixed(2)}} \\approx$ <strong>$${mv.toFixed(1)}\\text{ km}$</strong> (o <strong>$${parseFloat(mv.toPrecision(3))}\\text{ km}$</strong> redondeando a 3 cifras significativas).
            </li>
            <br>
            <li><strong>c)</strong> Calcular la demora (rumbo) de $M$ desde $V$: <br>
                Primero hallamos el ángulo interior $M\\widehat{V}S$ mediante la ley del seno: <br>
                $\\frac{\\sin(M\\widehat{V}S)}{MS} = \\frac{\\sin(V\\widehat{S}M)}{MV} \\Rightarrow \\sin(M\\widehat{V}S) = \\frac{${d1} \\cdot \\sin(${angleS_deg}^\\circ)}{${mv.toFixed(2)}}$ <br>
                $\\sin(M\\widehat{V}S) \\approx \\frac{${d1} \\cdot ${Math.sin(angleS_rad).toFixed(4)}}{${mv.toFixed(2)}} \\approx ${sinV.toFixed(4)}$ <br>
                $M\\widehat{V}S \\approx \\arcsin(${sinV.toFixed(4)}) \\approx$ <strong>$${angleV_deg.toFixed(2)}^\\circ$</strong>. <br>
                Para determinar la demora (rumbo medido a favor de las agujas del reloj desde el norte en $V$): <br>
                La dirección directa de $V$ a $S$ (hacia el oeste) corresponde a un rumbo de $270^\\circ$. <br>
                Como $M$ está inclinado al norte de esa línea por un ángulo de $M\\widehat{V}S \\approx ${angleV_deg.toFixed(2)}^\\circ$: <br>
                Demora de $M$ desde $V = 270^\\circ + ${angleV_deg.toFixed(2)}^\\circ \\approx$ <strong>$${bearingReturn.toFixed(1)}^\\circ$</strong> (o <strong>$${Math.round(bearingReturn)}^\\circ$</strong>).
            </li>
        </ul>
    `;

    return { html, respuesta: respuestaHTML };
}
