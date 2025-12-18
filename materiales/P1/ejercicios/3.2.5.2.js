import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.5. Ángulos de elevación y depresión",
    titulo: "Cámaras de Seguridad (Depresión)",
    tipo: 1,
    puntos: 8
};

export async function generar(i) {
    // 1. Generar datos aleatorios
    // Alturas en metros
    const H = (Math.floor(Math.random() * 11) + 30) / 10; // 3.0 - 4.0 m
    const h = (Math.floor(Math.random() * 5) + 8) / 10;   // 0.8 - 1.2 m
    const diff_h = parseFloat((H - h).toFixed(2));

    // Distancia horizontal total
    const D = (Math.floor(Math.random() * 21) + 60) / 10; // 6.0 - 8.0 m

    // Distancia C1 a R (hipotenusa 1)
    // Debe ser mayor que diff_h. Generamos un factor entre 1.5 y 2.5
    const factor = (Math.random() * 1) + 1.5;
    const d1 = parseFloat((diff_h * factor).toFixed(2));

    // 2. Cálculos
    // a) Ángulo de depresión C1
    // sin(theta) = opuesto / hipotenusa = diff_h / d1
    const sin_theta1 = diff_h / d1;
    const theta1_rad = Math.asin(sin_theta1);
    const theta1_deg = (theta1_rad * 180) / Math.PI;

    // b) Distancia C2 a R (d2)
    // Primero hallamos x1 (horizontal C1-R)
    const x1 = Math.sqrt(d1 * d1 - diff_h * diff_h);

    // Hallamos x2 (horizontal C2-R)
    const x2 = D - x1;

    // Hallamos d2 (hipotenusa 2)
    const d2 = Math.sqrt(x2 * x2 + diff_h * diff_h);

    // c) Comparación
    // El ángulo es mayor si la distancia horizontal es menor (para la misma altura)
    const mayorAngulo = x1 < x2 ? "Cámara 1" : "Cámara 2";
    const justificacion = x1 < x2 ?
        `La distancia horizontal de la Cámara 1 (${x1.toFixed(2)} m) es menor que la de la Cámara 2 (${x2.toFixed(2)} m).` :
        `La distancia horizontal de la Cámara 2 (${x2.toFixed(2)} m) es menor que la de la Cámara 1 (${x1.toFixed(2)} m).`;

    // 3. Generar SVG Dinámico
    const width = 500;
    const height = 300;
    const scale = 40; // px por metro
    const margin = 50;

    // Coordenadas
    // Piso y = height - margin
    const floorY = height - margin;
    // Paredes
    const wall1X = margin;
    const wall2X = margin + D * scale;

    // Cámaras
    const c1 = { x: wall1X, y: floorY - H * scale };
    const c2 = { x: wall2X, y: floorY - H * scale };

    // Caja registradora (R)
    const rX = wall1X + x1 * scale;
    const rY = floorY - h * scale; // Centro R

    // Dibujo caja
    const boxW = 1.5 * scale;
    const boxH = (h) * scale; // Caja desde el suelo hasta h (aprox, R está en el centro superior)

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Paredes y Suelo -->
            <line x1="${wall1X}" y1="${c1.y - 20}" x2="${wall1X}" y2="${floorY}" stroke="black" stroke-width="2" />
            <line x1="${wall2X}" y1="${c2.y - 20}" x2="${wall2X}" y2="${floorY}" stroke="black" stroke-width="2" />
            <line x1="${wall1X - 20}" y1="${floorY}" x2="${wall2X + 20}" y2="${floorY}" stroke="black" stroke-width="2" />

            <!-- Cámaras -->
            <circle cx="${c1.x}" cy="${c1.y}" r="5" fill="black" />
            <text x="${c1.x + 10}" y="${c1.y}" font-family="Arial" font-size="12">C1</text>
            <circle cx="${c2.x}" cy="${c2.y}" r="5" fill="black" />
            <text x="${c2.x - 25}" y="${c2.y}" font-family="Arial" font-size="12">C2</text>

            <!-- Caja Registradora -->
            <rect x="${rX - boxW / 2}" y="${floorY - boxH}" width="${boxW}" height="${boxH}" fill="none" stroke="black" stroke-width="1" />
            <circle cx="${rX}" cy="${rY}" r="3" fill="black" />
            <text x="${rX - 5}" y="${rY - 10}" font-family="Arial" font-size="12">R</text>

            <!-- Líneas de visión -->
            <line x1="${c1.x}" y1="${c1.y}" x2="${rX}" y2="${rY}" stroke="black" stroke-width="1" />
            <line x1="${c2.x}" y1="${c2.y}" x2="${rX}" y2="${rY}" stroke="black" stroke-width="1" />

            <!-- Cotas -->
            <!-- Altura Cámaras -->
            <line x1="${wall2X + 20}" y1="${c2.y}" x2="${wall2X + 20}" y2="${floorY}" stroke="black" marker-start="url(#arrow)" marker-end="url(#arrow)" />
            <text x="${wall2X + 25}" y="${(c2.y + floorY) / 2}" font-family="Arial" font-size="12">${H} m</text>

            <!-- Altura R -->
            <line x1="${rX}" y1="${rY}" x2="${rX}" y2="${floorY}" stroke="black" marker-end="url(#arrow)" />
            <text x="${rX - 25}" y="${(rY + floorY) / 2}" font-family="Arial" font-size="12">${h} m</text>

            <!-- Distancia Total -->
            <line x1="${wall1X}" y1="${floorY + 20}" x2="${wall2X}" y2="${floorY + 20}" stroke="black" marker-start="url(#arrow)" marker-end="url(#arrow)" />
            <text x="${(wall1X + wall2X) / 2}" y="${floorY + 35}" text-anchor="middle" font-family="Arial" font-size="12">${D} m</text>

            <!-- Distancia d1 -->
            <text x="${(c1.x + rX) / 2 - 10}" y="${(c1.y + rY) / 2 - 5}" font-family="Arial" font-size="12">${d1} m</text>

            <!-- Definición de flechas -->
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                </marker>
            </defs>
        </svg>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El dueño de una tienda instala dos cámaras de seguridad, representadas por los puntos C1 y C2. Ambas cámaras apuntan hacia el centro de la caja registradora, representado por el punto R.</p>
            <p>El siguiente diagrama muestra esta información en una sección transversal de la tienda.</p>
            
            <div style="text-align:center; margin: 20px 0;">
                ${svg}
            </div>
            
            <p>Las cámaras están posicionadas a una altura de ${H} m, y la distancia horizontal entre las cámaras es de ${D} m. La caja registradora está sobre un mostrador de modo que su centro, R, está a ${h} m sobre el suelo.</p>
            <p>La distancia desde la Cámara 1 al centro de la caja registradora es de ${d1} m.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine el ángulo de depresión desde la Cámara 1 al centro de la caja registradora. Dé su respuesta en grados.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>
                
                <li style="page-break-before: always;">
                    <span class="ib-texto">Calcule la distancia desde la Cámara 2 al centro de la caja registradora.</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <tlacuache-renglon n="12" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Sin realizar más cálculos, determine qué cámara tiene el mayor ángulo de depresión hacia el centro de la caja registradora. Justifique su respuesta.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </ol>
            
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p>Diferencia de altura (cateto opuesto): $H - h = ${H} - ${h} = ${diff_h}$ m.</p>
        <hr>
        <p><strong>a)</strong> Ángulo de depresión C1 ($\\\\theta_1$)</p>
        <p>$$\\sin(\\theta_1) = \\frac{\\text{opuesto}}{\\text{hipotenusa}} = \\frac{${diff_h}}{${d1}}$$</p>
        <p>$$\\theta_1 = \\arcsin\\left(\\frac{${diff_h}}{${d1}}\\right) \\approx ${theta1_deg.toFixed(2)}^\\circ$$</p>
        <hr>
        <p><strong>b)</strong> Distancia C2 a R ($d_2$)</p>
        <p>Primero hallamos la distancia horizontal de C1 ($x_1$):</p>
        <p>$$x_1 = \\sqrt{d_1^2 - (H-h)^2} = \\sqrt{${d1}^2 - ${diff_h}^2} \\approx ${x1.toFixed(2)} \\text{ m}$$</p>
        <p>Distancia horizontal de C2 ($x_2$):</p>
        <p>$$x_2 = D - x_1 = ${D} - ${x1.toFixed(2)} \\approx ${x2.toFixed(2)} \\text{ m}$$</p>
        <p>Distancia $d_2$:</p>
        <p>$$d_2 = \\sqrt{x_2^2 + (H-h)^2} = \\sqrt{${x2.toFixed(2)}^2 + ${diff_h}^2} \\approx ${d2.toFixed(2)} \\text{ m}$$</p>
        <hr>
        <p><strong>c)</strong> Comparación</p>
        <p><strong>${mayorAngulo}</strong> tiene el mayor ángulo de depresión.</p>
        <p>Justificación: ${justificacion}</p>
        <p>Dado que ambas cámaras están a la misma altura, la que esté horizontalmente más cerca del objetivo tendrá un ángulo de depresión mayor (más empinado).</p>
    `;

    return { html, respuesta };
}
