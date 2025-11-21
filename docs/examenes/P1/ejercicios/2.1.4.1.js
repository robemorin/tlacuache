import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export const metadata = {
    tema: "2. Funciones",
    subtema: "1. Modelos",
    seccion: "4. Funciones a trozos",
    titulo: "Función a Trozos - Costo de Agua",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VALORES FIJOS (NO ALEATORIOS) ---
    const umbral = 20;       // Límite del primer tramo (m3)
    const r1 = 4;            // Tarifa baja ($4 por m3)
    const r2 = 7;            // Tarifa alta ($7 por m3 excedente)
    
    // Pregunta A: Consumo bajo (12 m3)
    const consumoBajo = 12; 
    
    // Pregunta B: Consumo alto (30 m3)
    const consumoAlto = 30; 

    // Pregunta C: Factura objetivo ($175) -> Para despejar x
    // Cálculo inverso mental: 175 = (20*4) + 7(x-20) -> 175 = 80 + 7(x-20) -> 95/7... 
    // Mejor ajustamos el costo objetivo para que de un entero exacto.
    // Probemos con x = 35 m3. Costo = 80 + 7(15) = 80 + 105 = 185.
    const costoObjetivo = 185; 
    const consumoRespuestaC = 35; // La respuesta esperada para el inciso C

    // Costo base del primer tramo completo (20 * 4 = 80)
    const costoBase = r1 * umbral;

    // --- HTML DEL PROBLEMA ---
   const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> La compañía de agua de una ciudad calcula el costo mensual del agua, $C(x)$ (en dólares), basándose en el volumen consumido, $x$ (en $m^3$). Las tarifas se definen mediante la siguiente función a trozos:</p>
            
            $$ C(x) = \\begin{cases} 
            ${r1}x & \\text{si } 0 \\le x \\le ${umbral} \\\\ 
            ${costoBase} + ${r2}(x - ${umbral}) & \\text{si } x > ${umbral} 
            \\end{cases} $$

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el costo si una familia consume ${consumoBajo} $m^3$ en un mes.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el costo si una familia consume ${consumoAlto} $m^3$ en un mes.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Una fábrica recibió una factura de $${costoObjetivo}$ USD. Determine cuántos $m^3$ de agua consumieron.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="22" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS DE RESPUESTA ---
    const respA = r1 * consumoBajo; // 4 * 12 = 48
    const respB = costoBase + (r2 * (consumoAlto - umbral)); // 80 + 7(10) = 150

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $C(${consumoBajo}) = ${r1}(${consumoBajo}) = $ <strong>$${respA}</strong></li>
            <li><strong>b)</strong> $C(${consumoAlto}) = ${costoBase} + ${r2}(${consumoAlto} - ${umbral}) = ${costoBase} + ${r2 * (consumoAlto - umbral)} = $ <strong>$${respB}</strong></li>
            <li><strong>c)</strong> Planteamiento: $${costoObjetivo} = ${costoBase} + ${r2}(x - ${umbral})$ <br>
                $${costoObjetivo - costoBase} = ${r2}(x - ${umbral})$ <br>
                $${(costoObjetivo - costoBase)} / ${r2} = x - ${umbral}$ <br>
                $${(costoObjetivo - costoBase) / r2} = x - ${umbral}$ <br>
                $x =$ <strong>${consumoRespuestaC} $m^3$</strong>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}