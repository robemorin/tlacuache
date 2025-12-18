import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.1. Arcos y Sectores",
    titulo: "Pista de Correr",
    tipo: 1,
    puntos: 15
};

export async function generar(i) {
    // 1. Generar datos aleatorios
    // Distancia AB (Cuerda)
    const AB = (Math.floor(Math.random() * 3) + 4) * 10; // 40, 50, 60
    const half_AB = AB / 2;

    // Distancia MF (Perpendicular al centro)
    const MF = (Math.floor(Math.random() * 3) + 3) * 5; // 15, 20, 25

    // Ancho de la pista
    const track_width = (Math.floor(Math.random() * 3) + 3) / 2; // 1.5, 2.0, 2.5

    // Profundidad del concreto (cm)
    const depth_cm = Math.floor(Math.random() * 6) + 10; // 10 a 15
    const depth_m = depth_cm / 100;

    // Nombre del personaje
    const names = ["Elena", "Madhu", "Sofia", "Carlos", "Miguel"];
    const name = names[Math.floor(Math.random() * names.length)];

    // 2. Cálculos
    // (a) Longitud BM
    const BM = half_AB;

    // (b) (i) Longitud BF (Radio r)
    // Pitágoras en triángulo BMF: BM^2 + MF^2 = BF^2
    const r_sq = Math.pow(BM, 2) + Math.pow(MF, 2);
    const r = Math.sqrt(r_sq);

    // (b) (ii) Ángulo BFM (theta)
    // tan(theta) = BM / MF
    const theta_rad = Math.atan(BM / MF);
    const theta_deg = theta_rad * (180 / Math.PI);

    // (c) Longitud de arco AB
    // angulo central total = 2 * theta
    const alpha_rad = 2 * theta_rad;
    const arc_AB = r * alpha_rad;

    // (d) Área de la porción curva ABDC
    // Radio exterior R = r + track_width
    const R = r + track_width;
    // Area = 0.5 * alpha * (R^2 - r^2)
    const area_curved = 0.5 * alpha_rad * (Math.pow(R, 2) - Math.pow(r, 2));

    // (e) Volumen de concreto
    const volume = area_curved * depth_m;

    // 3. Generación de SVG
    const svgWidth = 400;
    const svgHeight = 250;
    const centerX = svgWidth / 2;
    const centerY = svgHeight - 30; // F está abajo

    // Escala para dibujar
    // El radio puede ser ~30-40m. Queremos que quepa en ~200px de alto.
    // Escala aprox 5 px por metro
    const scale = 5;

    const r_px = r * scale;
    const R_px = R * scale;
    const MF_px = MF * scale;
    const BM_px = BM * scale;

    // Coordenadas
    // F es (centerX, centerY)
    // M es (centerX, centerY - MF_px)
    const Mx = centerX;
    const My = centerY - MF_px;

    // B es a la izquierda de M, A a la derecha
    // Pero ojo, el triángulo es con respecto al ángulo.
    // B está en ángulo (90 + theta_deg) o algo así?
    // Usemos coordenadas cartesianas relativas a F
    // B: x = -BM, y = MF (desde F hacia arriba) -> No, F es el centro del círculo.
    // Si F es el centro (0,0), M es (0, MF). B es (-BM, MF). A es (BM, MF).
    // Distancia FB es sqrt(BM^2 + MF^2) = r. Correcto.

    const Fx = centerX;
    const Fy = centerY; // F está "abajo" en el dibujo del problema original (triángulo apunta abajo)
    // Espera, en el diagrama 2 del usuario, F está ABAJO de la cuerda AB.
    // El arco se curva hacia ARRIBA.
    // Entonces F es el centro del círculo.

    const Bx = centerX - BM_px;
    const By = centerY - MF_px;
    const Ax = centerX + BM_px;
    const Ay = By;

    // Puntos exteriores C y D
    // C está alineado con F y A. D alineado con F y B.
    // Vector FA = (Ax - Fx, Ay - Fy) = (BM_px, -MF_px)
    // Longitud FA = r_px
    // Vector FC = FA * (R/r)
    const Cx = Fx + (Ax - Fx) * (R / r);
    const Cy = Fy + (Ay - Fy) * (R / r);

    const Dx = Fx + (Bx - Fx) * (R / r);
    const Dy = Fy + (By - Fy) * (R / r);

    // Arcos
    // Para SVG path A rx ry x-axis-rotation large-arc-flag sweep-flag x y
    // Arco AB: start B, end A. Radio r_px.
    // Ángulo es < 180, so large-arc-flag = 0. Sweep = 1 (clockwise)
    const pathInner = `M ${Bx} ${By} A ${r_px} ${r_px} 0 0 1 ${Ax} ${Ay}`;

    // Arco DC: start D, end C. Radio R_px.
    const pathOuter = `M ${Dx} ${Dy} A ${R_px} ${R_px} 0 0 1 ${Cx} ${Cy}`;

    // Shape completo para sombreado
    // Move to B, Arc to A, Line to C, Arc to D (reverse), Line to B
    const pathTrack = `M ${Bx} ${By} A ${r_px} ${r_px} 0 0 1 ${Ax} ${Ay} L ${Cx} ${Cy} A ${R_px} ${R_px} 0 0 0 ${Dx} ${Dy} Z`;

    const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" style="display:block; margin: 0 auto;">
            <!-- Pista Sombreada -->
            <path d="${pathTrack}" fill="#ccc" stroke="black" stroke-width="1" />
            
            <!-- Líneas punteadas del triángulo FBA -->
            <line x1="${Fx}" y1="${Fy}" x2="${Bx}" y2="${By}" stroke="black" stroke-dasharray="4" />
            <line x1="${Fx}" y1="${Fy}" x2="${Ax}" y2="${Ay}" stroke="black" stroke-dasharray="4" />
            <line x1="${Fx}" y1="${Fy}" x2="${Mx}" y2="${My}" stroke="black" stroke-dasharray="4" />
            <line x1="${Bx}" y1="${By}" x2="${Ax}" y2="${Ay}" stroke="black" stroke-dasharray="4" />

            <!-- Puntos -->
            <circle cx="${Fx}" cy="${Fy}" r="3" fill="black" /> <text x="${Fx}" y="${Fy + 15}" text-anchor="middle">F</text>
            <circle cx="${Mx}" cy="${My}" r="3" fill="black" /> <text x="${Mx}" y="${My + 15}" text-anchor="middle">M</text>
            <circle cx="${Bx}" cy="${By}" r="3" fill="black" /> <text x="${Bx - 10}" y="${By + 20}" text-anchor="end" text-anchor="hanging">B</text>
            <circle cx="${Ax}" cy="${Ay}" r="3" fill="black" /> <text x="${Ax + 10}" y="${Ay + 20}" text-anchor="start" text-anchor="hanging">A</text>
            <circle cx="${Cx}" cy="${Cy}" r="3" fill="black" /> <text x="${Cx + 10}" y="${Cy}" text-anchor="start">C</text>
            <circle cx="${Dx}" cy="${Dy}" r="3" fill="black" /> <text x="${Dx - 10}" y="${Dy}" text-anchor="end">D</text>

            <!-- Cotas -->
            <!-- AB -->
            <text x="${Mx}" y="${My - 10}" text-anchor="middle" font-size="12">${AB} m</text>
        </svg>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> ${name} está diseñando una pista de jogging para el campus de su escuela. El siguiente diagrama muestra una porción incompleta de la pista.</p>
            <p>${name} quiere diseñar la pista de tal manera que el borde interior sea una curva suave desde el punto A hasta el punto B, y el otro borde sea una curva suave desde el punto C hasta el punto D. La distancia entre los puntos A y B es de ${AB} metros.</p>
            
            <div style="margin: 20px 0;">${svg}</div>

            <p>Para crear una curva suave, ${name} primero camina hasta M, el punto medio de [AB].</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba la longitud de [BM].</span>
                    <span class="ib-mark">[1]</span>
                </li>


                <div style="margin: 10px 0;">
                    <p>Luego, ${name} camina ${MF} metros en una dirección perpendicular a [AB] para ir del punto M al punto F. El punto F es el centro de un círculo cuyo arco formará la curva suave entre los puntos A y B en la pista, como se muestra en el diagrama.</p>
                </div>

                <li>
                    <span class="ib-texto">(i) Encuentre la longitud de [BF].</span>
                </li>
                <li>
                    <span class="ib-texto">(ii) Encuentre el ángulo $B\\hat{F}M$.</span>
                    <span class="ib-mark">[4]</span>
                </li>


                <li>
                    <span class="ib-texto">Por lo tanto, encuentre la longitud del arco AB.</span>
                    <span class="ib-mark">[3]</span>
                </li>


                <div style="margin: 10px 0;">
                    <p>El borde exterior de la pista, de C a D, también es un arco circular con centro F, tal que la pista tiene ${track_width} metros de ancho.</p>
                </div>

                <li>
                    <span class="ib-texto">Calcule el área de la porción curva de la pista, ABDC.</span>
                    <span class="ib-mark">[4]</span>
                </li>


                <div style="margin: 10px 0;">
                    <p>La base de la pista estará hecha de concreto con una profundidad de ${depth_cm} cm.</p>
                </div>

                <li>
                    <span class="ib-texto">Calcule el volumen de concreto necesario para crear la porción curva de la pista.</span>
                    <span class="ib-mark">[3]</span>
                </li>

            </ol>
        </div>
    `;

    const respuesta = `
        <div style="display: block; width: 100%;">
            <p><strong>Solución:</strong></p>
            
            <p><strong>(a)</strong> Longitud de [BM]:</p>
            <p>Como M es el punto medio de AB ($L=${AB}$):</p>
            <p>$$ BM = \\frac{${AB}}{2} = ${BM} \\text{ m} $$</p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(b)</strong></p>
            <p>(i) Longitud de [BF] (Radio $r$):</p>
            <p>Usando Pitágoras en $\\triangle BMF$ ($BM=${BM}, MF=${MF}$):</p>
            <p>$$ BF^2 = ${BM}^2 + ${MF}^2 = ${Math.pow(BM, 2)} + ${Math.pow(MF, 2)} = ${r_sq} $$</p>
            <p>$$ BF = \\sqrt{${r_sq}} \\approx ${r.toFixed(2)} \\text{ m} $$</p>
            
            <p>(ii) Ángulo $B\\hat{F}M$ ($\\theta$):</p>
            <p>$$ \\tan(\\theta) = \\frac{BM}{MF} = \\frac{${BM}}{${MF}} = ${(BM / MF).toFixed(3)} $$</p>
            <p>$$ \\theta = \\arctan(${(BM / MF).toFixed(3)}) \\approx ${theta_deg.toFixed(2)}^\\circ $$</p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(c)</strong> Longitud de arco AB:</p>
            <p>Ángulo total $\\alpha = 2 \\times \\theta = 2 \\times ${theta_deg.toFixed(2)} = ${(2 * theta_deg).toFixed(2)}^\\circ$.</p>
            <p>En radianes: $\\alpha_{rad} = ${alpha_rad.toFixed(4)}$.</p>
            <p>$$ L_{arco} = r \\times \\alpha_{rad} = ${r.toFixed(2)} \\times ${alpha_rad.toFixed(4)} \\approx ${arc_AB.toFixed(2)} \\text{ m} $$</p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(d)</strong> Área de la pista (ABDC):</p>
            <p>Radio exterior $R = r + w = ${r.toFixed(2)} + ${track_width} = ${R.toFixed(2)} \\text{ m}$.</p>
            <p>Área Sector Exterior: $A_{ext} = 0.5 \\times R^2 \\times \\alpha_{rad} = 0.5 \\times ${Math.pow(R, 2).toFixed(1)} \\times ${alpha_rad.toFixed(4)} \\approx ${(0.5 * Math.pow(R, 2) * alpha_rad).toFixed(2)}$.</p>
            <p>Área Sector Interior: $A_{int} = 0.5 \\times r^2 \\times \\alpha_{rad} = 0.5 \\times ${Math.pow(r, 2).toFixed(1)} \\times ${alpha_rad.toFixed(4)} \\approx ${(0.5 * Math.pow(r, 2) * alpha_rad).toFixed(2)}$.</p>
            <p>$$ A_{pista} = A_{ext} - A_{int} \\approx ${area_curved.toFixed(2)} \\text{ m}^2 $$</p>
            <p><em>Alternativamente: $A \\approx L_{arco} \\times ancho = ${arc_AB.toFixed(2)} \\times ${track_width} = ${(arc_AB * track_width).toFixed(2)}$ (aprox).</em></p>
            
            <div style="margin: 10px 0; border-top: 1px solid #ccc;"></div>
            
            <p><strong>(e)</strong> Volumen de concreto:</p>
            <p>Profundidad $h = ${depth_cm} \\text{ cm} = ${depth_m} \\text{ m}$.</p>
            <p>$$ V = A_{pista} \\times h = ${area_curved.toFixed(2)} \\times ${depth_m} $$</p>
            <p>$$ V \\approx ${volume.toFixed(2)} \\text{ m}^3 $$</p>
        </div>
    `;

    return { html, respuesta };
}
