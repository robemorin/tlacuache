import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.1. Trigonometría en triángulos rectángulos",
    titulo: "Ficha: Trigonometría y Geometría 3D (Sin Gráficos)",
    puntos: 15,
};

export async function generar(i) {
    // --- PROBLEMA 1 (Distancia 3D en habitación, inspirado en Ej 21) ---
    const largo1 = (Math.floor(Math.random() * 5) + 6); // 6 a 10 m
    const ancho1 = (Math.floor(Math.random() * 4) + 4); // 4 a 7 m
    const alto1 = (Math.floor(Math.random() * 3) + 2.5).toFixed(1); // 2.5 a 4.5 m
    const altPers1 = (Math.floor(Math.random() * 4) * 0.1 + 1.5).toFixed(2); // 1.50 a 1.80 m
    
    // Distancia de la cabeza (a altura altPers1, en una esquina del suelo (0,0,altPers1)) a la araña en el techo (largo1, ancho1, alto1)
    const difAlto1 = (alto1 - altPers1).toFixed(2);
    const distSuelo1 = Math.sqrt(largo1*largo1 + ancho1*ancho1);
    const distCabezaAraña1 = Math.sqrt(distSuelo1*distSuelo1 + difAlto1*difAlto1);

    // --- PROBLEMA 2 (Rampa/Prisma triangular, inspirado en Ej 20) ---
    const h2 = (Math.floor(Math.random() * 5) * 0.05 + 0.20).toFixed(2); // 0.20 a 0.40 m
    const w2 = (Math.floor(Math.random() * 6) * 0.2 + 1.5).toFixed(1);  // 1.5 a 2.5 m
    const l2 = (Math.floor(Math.random() * 5) * 0.2 + 1.0).toFixed(1);  // 1.0 a 1.8 m
    
    const ce2 = Math.sqrt(w2*w2 + l2*l2);
    const cd2 = Math.sqrt(h2*h2 + ce2*ce2);
    const ang2 = Math.atan(h2 / ce2) * 180 / Math.PI;

    // --- PROBLEMA 3 (Pirámide de base rectangular/cuadrada, inspirado en Ej 23 y 24a) ---
    const s3 = (Math.floor(Math.random() * 6) * 0.2 + 1.2).toFixed(1); // 1.2 a 2.2 m
    const arista3 = (Math.floor(Math.random() * 6) * 0.3 + 2.5).toFixed(1); // 2.5 a 4.0 m
    
    // Diagonal de la base = s3 * sqrt(2). Mitad diagonal = (s3 * sqrt(2)) / 2
    const diagBase3 = s3 * Math.sqrt(2);
    const semidiag3 = diagBase3 / 2;
    const hPyramid3 = Math.sqrt(arista3*arista3 - semidiag3*semidiag3);
    const angAristaBase3 = Math.acos(semidiag3 / arista3) * 180 / Math.PI;

    // --- PROBLEMA 4 (Cono recto, inspirado en Ej 24c) ---
    const d4 = Math.floor(Math.random() * 5) * 2 + 8; // 8, 10, 12, 14, 16 cm
    const r4 = d4 / 2;
    const angDeg4 = Math.floor(Math.random() * 11) + 55; // 55 a 65 grados
    const angRad4 = angDeg4 * Math.PI / 180;
    
    const hCone4 = r4 * Math.tan(angRad4);
    const vol4 = (1/3) * Math.PI * (r4 * r4) * hCone4;

    // --- PROBLEMA 5 (Cometa y observadores, inspirado en Ej 22) ---
    const cuerda5 = Math.floor(Math.random() * 11) + 30; // 30 a 40 m
    const angElev5 = Math.floor(Math.random() * 11) + 35; // 35 a 45 grados
    const distObs5 = Math.floor(Math.random() * 16) + 50; // 50 a 65 m
    
    // Cometa en C = (0, cuerda5 * cos(angElev5), cuerda5 * sin(angElev5))
    // Pero en 2D: Altura de la cometa = cuerda5 * sin(angElev5). Distancia horizontal del punto de anclaje R a la cometa = cuerda5 * cos(angElev5).
    // Observador E está a distObs5 metros al oeste de R (asumiendo que la cometa está hacia el este de R).
    // Entonces la distancia horizontal total desde E a la proyección de la cometa es distObs5 + cuerda5 * cos(angElev5).
    // Por Pitágoras, distancia de E a la cometa = sqrt( (distObs5 + cuerda5 * cos(angElev5))^2 + (cuerda5 * sin(angElev5))^2 )
    const angRad5 = angElev5 * Math.PI / 180;
    const hKite5 = cuerda5 * Math.sin(angRad5);
    const distHorizKite5 = cuerda5 * Math.cos(angRad5);
    const distHorizTotal5 = distObs5 + distHorizKite5;
    const distObsKite5 = Math.sqrt(distHorizTotal5*distHorizTotal5 + hKite5*hKite5);
    const angElevObs5 = Math.atan(hKite5 / distHorizTotal5) * 180 / Math.PI;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px;">
            <!-- PÁGINA 1 -->
            <div style="text-align: center; margin-bottom: 15px;">
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Trigonometría y Geometría 3D (Sin Ayuda Visual)</h2>
                <p style="margin: 5px 0; font-size: 0.9em; color: #555;">Dibuja tus propios esquemas y resuelve cada ejercicio. (3 puntos por problema)</p>
            </div>

            <!-- PROBLEMA 1 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 25px; background-color: #fff;">
                <p><strong>${i}.</strong> Una habitación rectangular tiene un largo de $${largo1}\\text{ m}$, un ancho de $${ancho1}\\text{ m}$ y una altura vertical de $${alto1}\\text{ m}$. Una araña se encuentra en una esquina superior del techo. Una persona que mide $${altPers1}\\text{ m}$ de altura está de pie en la esquina opuesta del suelo.</p>
                <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                        <span class="ib-texto">Calcula la distancia horizontal en el suelo entre la persona y la proyección vertical de la araña.</span>
                    </li>
                    <li>
                        <span class="ib-texto">Determina la distancia en línea recta desde la cabeza de la persona hasta la araña en el techo.</span>
                    </li>
                </ol>
                <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 2 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 25px; background-color: #fff;">
                <p><strong>${i+1}.</strong> Una rampa metálica de acceso se construye en forma de prisma triangular recto. La altura vertical del prisma es de $${h2}\\text{ m}$, el ancho de su base rectangular de soporte es de $${w2}\\text{ m}$ y el largo del prisma es de $${l2}\\text{ m}$.</p>
                <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                        <span class="ib-texto">Halle la longitud de la diagonal de la base rectangular sobre el suelo.</span>
                    </li>
                    <li>
                        <span class="ib-texto">Calcule la longitud de la arista inclinada (diagonal mayor del prisma) y el ángulo de inclinación que forma con la base horizontal.</span>
                    </li>
                </ol>
                <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 3 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; background-color: #fff;">
                <p><strong>${i+2}.</strong> Una pirámide recta tiene una base cuadrada de lado $s = ${s3}\\text{ m}$. La longitud de cada una de sus aristas laterales (desde el vértice superior a una esquina de la base) mide $${arista3}\\text{ m}$.</p>
                <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                        <span class="ib-texto">Halle la altura vertical de la pirámide.</span>
                    </li>
                    <li>
                        <span class="ib-texto">Determine la medida del ángulo que forma una arista lateral con la diagonal de la base cuadrada.</span>
                    </li>
                </ol>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 4 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 25px; background-color: #fff;">
                <p><strong>${i+3}.</strong> Un sólido metálico tiene la forma de un cono circular recto. Se sabe que el diámetro de la base circular es de $${d4}\\text{ cm}$ y el ángulo de elevación de su superficie lateral (generatriz) respecto a su base es de $${angDeg4}^\\circ$.</p>
                <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                        <span class="ib-texto">Determine la altura vertical del cono.</span>
                    </li>
                    <li>
                        <span class="ib-texto">Calcule el volumen del sólido en centímetros cúbicos.</span>
                    </li>
                </ol>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 5 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; background-color: #fff;">
                <p><strong>${i+4}.</strong> Rico está volando una cometa. Ha soltado $${cuerda5}\\text{ m}$ de cuerda y esta mantiene un ángulo de elevación constante de $${angElev5}^\\circ$. Su amigo Edward está situado en la misma línea vertical, a una distancia de $${distObs5}\\text{ m}$ desde el punto de anclaje de la cometa, en la dirección opuesta a la que vuela la cometa.</p>
                <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">
                        <span class="ib-texto">Calcule la distancia en línea recta desde la posición de Edward hasta la cometa en el aire.</span>
                    </li>
                    <li>
                        <span class="ib-texto">Determine la medida del ángulo de elevación de la cometa visto desde la posición de Edward.</span>
                    </li>
                </ol>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>
        </div>
    `;

    const respuesta = `
        <p><strong>${i}. (Problema 1 - Habitación)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) Diagonal del suelo $d_{suelo} = \\sqrt{${largo1}^2 + ${ancho1}^2} = \\mathbf{${distSuelo1.toFixed(2)}\\text{ m}}$</li>
            <li>b) Altura de la araña respecto a la cabeza = $${alto1} - ${altPers1} = ${difAlto1}\\text{ m}$. <br>Distancia en línea recta = \\sqrt{${distSuelo1.toFixed(3)}^2 + ${difAlto1}^2} = \\mathbf{${distCabezaAraña1.toFixed(2)}\\text{ m}}$</li>
        </ul>

        <p><strong>${i+1}. (Problema 2 - Rampa)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) Diagonal de la base $d_{base} = \\sqrt{${w2}^2 + ${l2}^2} = \\mathbf{${ce2.toFixed(2)}\\text{ m}}$</li>
            <li>b) Arista inclinada (diagonal mayor) = $\\sqrt{${h2}^2 + ${ce2.toFixed(4)}^2} = \\mathbf{${cd2.toFixed(2)}\\text{ m}}$. <br>Ángulo de inclinación = $\\arctan\\left(\\frac{${h2}}{${ce2.toFixed(3)}}\\right) = \\mathbf{${ang2.toFixed(1)}^\\circ}$</li>
        </ul>

        <p><strong>${i+2}. (Problema 3 - Pirámide cuadrada)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) Diagonal de la base $d = ${s3}\\sqrt{2} = ${diagBase3.toFixed(3)}\\text{ m}$, por lo tanto semidiagonal $d_m = ${semidiag3.toFixed(3)}\\text{ m}$. <br>Altura vertical $h = \\sqrt{${arista3}^2 - ${semidiag3.toFixed(3)}^2} = \\mathbf{${hPyramid3.toFixed(2)}\\text{ m}}$.</li>
            <li>b) $\\cos(\\theta) = \\frac{${semidiag3.toFixed(3)}}{${arista3}} \\implies \\theta = \\mathbf{${angAristaBase3.toFixed(1)}^\\circ}$</li>
        </ul>

        <p><strong>${i+3}. (Problema 4 - Cono)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) Radio de la base $r = ${r4}\\text{ cm}$. Altura vertical $h = ${r4} \\tan(${angDeg4}^\\circ) = \\mathbf{${hCone4.toFixed(2)}\\text{ cm}}$.</li>
            <li>b) Volumen $V = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\pi (${r4})^2 (${hCone4.toFixed(3)}) = ${vol4.toFixed(1)}\\text{ cm}^3 \\approx \\mathbf{${vol4.toFixed(0)}\\text{ cm}^3}$</li>
        </ul>

        <p><strong>${i+4}. (Problema 5 - Cometa y Edward)</strong></p>
        <ul style="list-style-type: none; padding-left: 0;">
            <li>a) Altura de la cometa $h = ${cuerda5} \\sin(${angElev5}^\\circ) = ${hKite5.toFixed(2)}\\text{ m}$. <br>Distancia horizontal desde R a la cometa = $${cuerda5} \\cos(${angElev5}^\\circ) = ${distHorizKite5.toFixed(2)}\\text{ m}$. <br>Distancia horizontal total de Edward a la cometa = $${distObs5} + ${distHorizKite5.toFixed(2)} = ${distHorizTotal5.toFixed(2)}\\text{ m}$. <br>Distancia en línea recta = $\\sqrt{${distHorizTotal5.toFixed(2)}^2 + ${hKite5.toFixed(2)}^2} = \\mathbf{${distObsKite5.toFixed(2)}\\text{ m}}$.</li>
            <li>b) Ángulo de elevación = $\\arctan\\left(\\frac{${hKite5.toFixed(2)}}{${distHorizTotal5.toFixed(2)}}\\right) = \\mathbf{${angElevObs5.toFixed(1)}^\\circ}$</li>
        </ul>
    `;

    return { html, respuesta, numPreguntas: 5 };
}
