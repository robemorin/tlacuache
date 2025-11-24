import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.5. Geometría del círculo",
    seccion: "2. Área de sectores circulares",
    titulo: "Limpiaparabrisas (Área y Arco)",
    tipo: 1,
    puntos: 5
};

export async function generar(i) {
    // 1. Generar datos aleatorios
    const angulo = Math.floor(Math.random() * 41) + 120; // 120 a 160 grados
    const R = Math.floor(Math.random() * 21) + 50;       // 50 a 70 cm (Radio exterior OB)
    const L_blade = Math.floor(Math.random() * 11) + 35; // 35 a 45 cm (Longitud escobilla)
    const r = R - L_blade;                               // Radio interior OA

    // 2. Cálculos
    // a) Longitud de arco (B)
    // L = (theta/360) * 2 * pi * R
    const arcoB = (angulo / 360) * 2 * Math.PI * R;

    // b) Área limpiada
    // Area = (theta/360) * pi * (R^2 - r^2)
    const area = (angulo / 360) * Math.PI * (R * R - r * r);

    // 3. Generar SVG Dinámico
    const width = 400;
    const height = 250;
    const cx = width / 2;
    const cy = height - 20; // Punto O abajo al centro

    // Escala para que quepa en el canvas
    // Max R es 70, height 250. Escala = 3 px/cm aprox.
    const scale = 3;

    // Ángulos en radianes (centrado hacia arriba -90 grados)
    const rad = (angulo * Math.PI) / 180;
    const startAngle = -Math.PI / 2 - rad / 2;
    const endAngle = -Math.PI / 2 + rad / 2;

    // Función para obtener coordenadas polares
    const getCoord = (radius, angle) => {
        return {
            x: cx + radius * scale * Math.cos(angle),
            y: cy + radius * scale * Math.sin(angle)
        };
    };

    // Coordenadas para el sector (área limpiada)
    const p1 = getCoord(R, startAngle); // Exterior inicio
    const p2 = getCoord(R, endAngle);   // Exterior fin
    const p3 = getCoord(r, endAngle);   // Interior fin
    const p4 = getCoord(r, startAngle); // Interior inicio

    // Coordenadas para el brazo (línea OB en el ángulo final)
    // Dibujamos el brazo en el lado derecho (endAngle)
    const pO = { x: cx, y: cy };
    const pA_line = getCoord(r, endAngle);
    const pB_line = getCoord(R, endAngle);

    // Path del área sombreada (limpiada)
    // Move to p1, Arc to p2, Line to p3, Arc to p4, Close
    const largeArc = angulo > 180 ? 1 : 0;
    const pathData = `
        M ${p1.x} ${p1.y}
        A ${R * scale} ${R * scale} 0 ${largeArc} 1 ${p2.x} ${p2.y}
        L ${p3.x} ${p3.y}
        A ${r * scale} ${r * scale} 0 ${largeArc} 0 ${p4.x} ${p4.y}
        Z
    `;

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Área limpiada (Gris claro) -->
            <path d="${pathData}" fill="#ddd" stroke="black" stroke-width="1" />
            
            <!-- Punto O -->
            <circle cx="${cx}" cy="${cy}" r="3" fill="black" />
            <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-family="Arial" font-size="12">O</text>

            <!-- Brazo del limpiaparabrisas (Línea OB) -->
            <line x1="${pO.x}" y1="${pO.y}" x2="${pB_line.x}" y2="${pB_line.y}" stroke="black" stroke-width="2" />
            
            <!-- Escobilla (Parte gruesa entre A y B) -->
            <line x1="${pA_line.x}" y1="${pA_line.y}" x2="${pB_line.x}" y2="${pB_line.y}" stroke="black" stroke-width="5" />

            <!-- Etiquetas A y B -->
            <text x="${pA_line.x - 10}" y="${pA_line.y + 15}" font-family="Arial" font-size="12">A</text>
            <text x="${pB_line.x + 5}" y="${pB_line.y + 5}" font-family="Arial" font-size="12">B</text>

            <!-- Cotas (Aproximadas) -->
            <!-- Longitud escobilla -->
            <text x="${(pA_line.x + pB_line.x) / 2 - 10}" y="${(pA_line.y + pB_line.y) / 2 - 10}" font-family="Arial" font-size="12">${L_blade}</text>
            
            <!-- Longitud Total (aprox) -->
            <text x="${(cx + pB_line.x) / 2 + 10}" y="${(cy + pB_line.y) / 2 + 20}" font-family="Arial" font-size="12">${R}</text>

            <!-- Ángulo -->
            <text x="${cx}" y="${cy - 40}" text-anchor="middle" font-family="Arial" font-size="12">${angulo}°</text>
            <path d="M ${cx + 30 * Math.cos(startAngle)} ${cy + 30 * Math.sin(startAngle)} A 30 30 0 0 1 ${cx + 30 * Math.cos(endAngle)} ${cy + 30 * Math.sin(endAngle)}" fill="none" stroke="black" stroke-dasharray="4" />

        </svg>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El brazo metálico recto de un limpiaparabrisas gira en movimiento circular desde un punto de pivote, O, a través de un ángulo de $${angulo}^\\circ$.</p>
            <p>El parabrisas es limpiado por una escobilla de goma de longitud ${L_blade} cm que está unida al brazo metálico entre los puntos A y B. La longitud total del brazo metálico, OB, es ${R} cm.</p>
            
            <div style="text-align:center; margin: 20px 0;">
                ${svg}
            </div>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule la longitud del arco formado por B, el extremo de la escobilla.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Determine el área del parabrisas que es limpiada por la escobilla de goma.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p><strong>a)</strong></p>
        <p>La longitud de arco se calcula con la fórmula $l = \\frac{\\theta}{360} \\times 2\\pi r$.</p>
        <p>Para el punto B, el radio es $R = ${R}$ cm y el ángulo es $\\theta = ${angulo}^\\circ$.</p>
        <p>$$l = \\frac{${angulo}}{360} \\times 2\\pi (${R})$$</p>
        <p>$$l \\approx ${arcoB.toFixed(2)} \\text{ cm}$$</p>
        <hr>
        <p><strong>b)</strong></p>
        <p>El área limpiada es el área del sector grande (radio OB) menos el área del sector pequeño (radio OA).</p>
        <p>Radio interior $r = OB - \\text{longitud escobilla} = ${R} - ${L_blade} = ${r}$ cm.</p>
        <p>Área sector grande: $A_{grande} = \\frac{${angulo}}{360} \\times \\pi (${R})^2$.</p>
        <p>Área sector pequeño: $A_{pequeño} = \\frac{${angulo}}{360} \\times \\pi (${r})^2$.</p>
        <p>Área limpiada = $\\frac{${angulo}}{360} \\pi (${R}^2 - ${r}^2)$.</p>
        <p>$$Area = \\frac{${angulo}}{360} \\pi (${R * R} - ${r * r})$$</p>
        <p>$$Area = \\frac{${angulo}}{360} \\pi (${R * R - r * r})$$</p>
        <p>$$Area \\approx ${area.toFixed(2)} \\text{ cm}^2$$</p>
    `;

    return { html, respuesta };
}
