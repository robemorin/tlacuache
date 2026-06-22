import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.1. Trigonometría en triángulos rectángulos",
    titulo: "Ficha: Geometría 3D (Prismas, Pirámides y Conos)",
    puntos: 32,
};

export async function generar(i) {
    // --- EJERCICIO 1: Prisma triangular (Rampa) ---
    // Valores aleatorios para Ejercicio 1
    const h1 = (Math.floor(Math.random() * 5) * 0.05 + 0.20).toFixed(2); // 0.20 a 0.40 m
    const w1 = (Math.floor(Math.random() * 6) * 0.2 + 1.4).toFixed(1);  // 1.4 a 2.4 m
    const l1 = (Math.floor(Math.random() * 5) * 0.2 + 1.0).toFixed(1);  // 1.0 a 1.8 m

    const ce1 = Math.sqrt(w1*w1 + l1*l1);
    const cd1 = Math.sqrt(h1*h1 + ce1*ce1);
    const ang1 = Math.atan(h1 / ce1) * 180 / Math.PI;

    // --- EJERCICIO 2: Prisma triangular (Rampa Mirrored) ---
    // Valores aleatorios para Ejercicio 2
    const h2 = (Math.floor(Math.random() * 5) * 0.05 + 0.25).toFixed(2); // 0.25 a 0.45 m
    const w2 = (Math.floor(Math.random() * 6) * 0.2 + 1.2).toFixed(1);  // 1.2 a 2.2 m
    const l2 = (Math.floor(Math.random() * 5) * 0.2 + 0.8).toFixed(1);  // 0.8 a 1.6 m

    const bf2 = Math.sqrt(w2*w2 + l2*l2);
    const af2 = Math.sqrt(h2*h2 + bf2*bf2);
    const ang2 = Math.atan(h2 / bf2) * 180 / Math.PI;

    // --- EJERCICIO 3: Pirámide de base cuadrada (similar a 24a) ---
    // Valores aleatorios para Ejercicio 3
    const s3 = (Math.floor(Math.random() * 5) * 0.15 + 1.20).toFixed(2); // 1.20 a 1.80 m
    const angDeg3 = Math.floor(Math.random() * 11) + 45; // 45 a 55 grados
    const angRad3 = angDeg3 * Math.PI / 180;
    // Diagonal de la base cuadrada = s3 * sqrt(2). Mitad de la diagonal = s3 * sqrt(2) / 2
    const semidiag3 = s3 * Math.sqrt(2) / 2;
    // Si el ángulo de la arista con la base es angDeg3:
    const hPyramid3 = semidiag3 * Math.tan(angRad3);
    const vol3 = (1/3) * (s3 * s3) * hPyramid3;

    // --- EJERCICIO 4: Cono recto (similar a 24c) ---
    // Valores aleatorios para Ejercicio 4
    const d4 = Math.floor(Math.random() * 5) * 2 + 6; // 6, 8, 10, 12, 14 cm (diámetro)
    const r4 = d4 / 2;
    const angDeg4 = Math.floor(Math.random() * 11) + 60; // 60 a 70 grados
    const angRad4 = angDeg4 * Math.PI / 180;
    const hCone4 = r4 * Math.tan(angRad4);
    const vol4 = (1/3) * Math.PI * (r4 * r4) * hCone4;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px;">
            <!-- PÁGINA 1 -->
            <div style="text-align: center; margin-bottom: 10px;">
                <h2 style="margin: 0; font-size: 1.4em;">Ficha de Trabajo: Geometría y Trigonometría 3D</h2>
                <p style="margin: 5px 0; font-size: 0.9em; color: #555;">Resuelve los siguientes problemas utilizando tres cifras significativas.</p>
            </div>

            <!-- PROBLEMA 1 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 25px; background-color: #fff;">
                <p><strong>${i}.</strong> Una rampa de acceso se construye en forma de prisma triangular, como se muestra en la siguiente figura. La altura vertical $AB$ es de $${h1}\\text{ m}$, la base horizontal de la sección transversal $BC$ mide $${w1}\\text{ m}$ y la longitud de la rampa $CF$ mide $${l1}\\text{ m}$.</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
                    <div style="flex: 1; min-width: 250px;">
                        <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                            <li style="margin-bottom: 15px;">
                                <span class="ib-texto">Halle la longitud de:</span>
                                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                                    <li style="margin-bottom: 5px;"><span class="ib-texto">$CE$</span> <span class="ib-mark">[2]</span></li>
                                    <li><span class="ib-texto">$CD$</span> <span class="ib-mark">[2]</span></li>
                                </ol>
                            </li>
                            <li>
                                <span class="ib-texto">Calcule la medida del ángulo de elevación $D\\hat{C}E$.</span>
                                <span class="ib-mark">[2]</span>
                            </li>
                        </ol>
                    </div>
                    <div style="flex: 1; min-width: 200px; text-align: center;">
                        <svg width="220" height="150" style="display: block; margin: auto; overflow: visible;">
                            <!-- Vértices: A(30,50), B(30,110), C(110,130), D(110,20), E(110,80), F(190,100) en proyección paralela -->
                            <!-- Caras sólidas exteriores -->
                            <polygon points="30,50 30,110 110,130" fill="none" stroke="black" stroke-width="1.8" /> <!-- Cara ABC -->
                            <polygon points="30,50 110,130 190,100 110,20" fill="none" stroke="black" stroke-width="1.8" /> <!-- Cara ADFC slant -->
                            <line x1="110" y1="130" x2="190" y2="100" stroke="black" stroke-width="1.8" /> <!-- CF -->
                            <line x1="110" y1="20" x2="190" y2="100" stroke="black" stroke-width="1.8" /> <!-- DF -->

                            <!-- Líneas discontinuas ocultas (E, DE, BE, EF, CE) -->
                            <line x1="30" y1="110" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- BE -->
                            <line x1="110" y1="20" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- DE -->
                            <line x1="110" y1="80" x2="190" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- EF -->
                            <line x1="110" y1="130" x2="110" y2="80" stroke="black" stroke-width="1" stroke-dasharray="2 2" stroke="blue" /> <!-- CE -->
                            <line x1="110" y1="130" x2="110" y2="20" stroke="black" stroke-width="1" stroke-dasharray="2 2" stroke="red" /> <!-- CD -->

                            <!-- Ángulos rectos indicados -->
                            <!-- Ángulo recto en B (ABC) -->
                            <polyline points="30,100 40,102 40,112" fill="none" stroke="black" stroke-width="1" />
                            <!-- Ángulo recto en E (DEF) -->
                            <polyline points="110,70 120,72 120,82" fill="none" stroke="black" stroke-width="1" />

                            <!-- Etiquetas -->
                            <text x="25" y="45" font-family="Cambria Math, serif" font-size="12" font-style="italic">A</text>
                            <text x="20" y="120" font-family="Cambria Math, serif" font-size="12" font-style="italic">B</text>
                            <text x="110" y="145" font-family="Cambria Math, serif" font-size="12" font-style="italic">C</text>
                            <text x="110" y="15" font-family="Cambria Math, serif" font-size="12" font-style="italic">D</text>
                            <text x="100" y="85" font-family="Cambria Math, serif" font-size="12" font-style="italic">E</text>
                            <text x="200" y="105" font-family="Cambria Math, serif" font-size="12" font-style="italic">F</text>

                            <!-- Acotaciones -->
                            <text x="12" y="80" font-family="Arial" font-size="11" text-anchor="middle">${h1} m</text>
                            <text x="65" y="132" font-family="Arial" font-size="11" text-anchor="middle">${w1} m</text>
                            <text x="158" y="123" font-family="Arial" font-size="11" text-anchor="middle">${l1} m</text>
                        </svg>
                    </div>
                </div>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 2 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 20px; background-color: #fff;">
                <p><strong>${i+1}.</strong> Una estructura de rampa metálica tiene la forma de un prisma triangular de tal manera que la altura $DE$ es de $${h2}\\text{ m}$, el ancho de la base horizontal $EF$ mide $${w2}\\text{ m}$, y el largo del prisma es de $${l2}\\text{ m}$.</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
                    <div style="flex: 1; min-width: 250px;">
                        <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                            <li style="margin-bottom: 15px;">
                                <span class="ib-texto">Halle la longitud de:</span>
                                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                                    <li style="margin-bottom: 5px;"><span class="ib-texto">$BF$</span> <span class="ib-mark">[2]</span></li>
                                    <li><span class="ib-texto">$AF$</span> <span class="ib-mark">[2]</span></li>
                                </ol>
                            </li>
                            <li>
                                <span class="ib-texto">Calcule la medida del ángulo de elevación $A\\hat{F}B$.</span>
                                <span class="ib-mark">[2]</span>
                            </li>
                        </ol>
                    </div>
                    <div style="flex: 1; min-width: 200px; text-align: center;">
                        <svg width="220" height="150" style="display: block; margin: auto; overflow: visible;">
                            <!-- Versión simétrica / invertida del prisma anterior -->
                            <!-- Vértices: A(110,20), B(110,80), C(30,100), D(190,50), E(190,110), F(110,130) -->
                            <polygon points="190,50 190,110 110,130" fill="none" stroke="black" stroke-width="1.8" /> <!-- Cara DEF -->
                            <polygon points="190,50 110,130 30,100 110,20" fill="none" stroke="black" stroke-width="1.8" /> <!-- Cara ADFC -->
                            <line x1="110" y1="130" x2="30" y2="100" stroke="black" stroke-width="1.8" /> <!-- FC -->
                            <line x1="110" y1="20" x2="30" y2="100" stroke="black" stroke-width="1.8" /> <!-- AC -->

                            <!-- Líneas ocultas -->
                            <line x1="190" y1="110" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- EB -->
                            <line x1="110" y1="20" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- AB -->
                            <line x1="110" y1="80" x2="30" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- BC -->
                            <line x1="110" y1="130" x2="110" y2="80" stroke="black" stroke-width="1" stroke-dasharray="2 2" stroke="blue" /> <!-- BF -->
                            <line x1="110" y1="130" x2="110" y2="20" stroke="black" stroke-width="1" stroke-dasharray="2 2" stroke="red" /> <!-- AF -->

                            <!-- Ángulos rectos -->
                            <polyline points="190,100 180,98 180,108" fill="none" stroke="black" stroke-width="1" />
                            <polyline points="110,70 100,72 100,82" fill="none" stroke="black" stroke-width="1" />

                            <!-- Etiquetas -->
                            <text x="110" y="15" font-family="Cambria Math, serif" font-size="12" font-style="italic">A</text>
                            <text x="115" y="85" font-family="Cambria Math, serif" font-size="12" font-style="italic">B</text>
                            <text x="20" y="105" font-family="Cambria Math, serif" font-size="12" font-style="italic">C</text>
                            <text x="195" y="45" font-family="Cambria Math, serif" font-size="12" font-style="italic">D</text>
                            <text x="195" y="120" font-family="Cambria Math, serif" font-size="12" font-style="italic">E</text>
                            <text x="110" y="145" font-family="Cambria Math, serif" font-size="12" font-style="italic">F</text>

                            <!-- Acotaciones -->
                            <text x="208" y="80" font-family="Arial" font-size="11" text-anchor="middle">${h2} m</text>
                            <text x="155" y="132" font-family="Arial" font-size="11" text-anchor="middle">${w2} m</text>
                            <text x="62" y="123" font-family="Arial" font-size="11" text-anchor="middle">${l2} m</text>
                        </svg>
                    </div>
                </div>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- SALTO DE PÁGINA FORZADO -->
            <!--div style="page-break-before: always; break-before: page;"></div-->
            <!-- PROBLEMA 3 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 25px; background-color: #fff;">
                <p><strong>${i+2}.</strong> La siguiente figura muestra una pirámide recta con una base cuadrada de lado $s = ${s3}\\text{ m}$. El ángulo entre la arista lateral y la diagonal de la base es de $${angDeg3}^\\circ$.</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
                    <div style="flex: 1; min-width: 250px;">
                        <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                            <li style="margin-bottom: 20px;">
                                <span class="ib-texto">Determine la altura vertical de la pirámide.</span>
                                <span class="ib-mark">[3]</span>
                            </li>
                            <li>
                                <span class="ib-texto">Calcule el volumen total de la pirámide.</span>
                                <span class="ib-mark">[3]</span>
                            </li>
                        </ol>
                    </div>
                    <div style="flex: 1; min-width: 200px; text-align: center;">
                        <svg width="200" height="150" style="display: block; margin: auto; overflow: visible;">
                            <!-- Apex: V(100,20) -->
                            <!-- Base: A(40,110), B(120,125), C(160,100), D(80,85) -->
                            <!-- Centro: M(100, 105) -->
                            <polygon points="40,110 120,125 160,100 100,20" fill="none" stroke="black" stroke-width="1.8" />
                            <line x1="120" y1="125" x2="100" y2="20" stroke="black" stroke-width="1.8" /> <!-- VB -->
                            
                            <!-- Aristas ocultas -->
                            <line x1="40" y1="110" x2="80" y2="85" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- AD -->
                            <line x1="80" y1="85" x2="160" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- DC -->
                            <line x1="100" y1="20" x2="80" y2="85" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" /> <!-- VD -->

                            <!-- Altura vertical y semidiagonal -->
                            <line x1="100" y1="20" x2="100" y2="105" stroke="red" stroke-width="1.2" stroke-dasharray="3 3" /> <!-- VM Altura -->
                            <line x1="40" y1="110" x2="160" y2="100" stroke="blue" stroke-width="1.2" stroke-dasharray="3 3" /> <!-- AC diagonal -->

                            <!-- Ángulo de arista lateral con diagonal de base en A -->
                            <path d="M 55,100 A 20,20 0 0 1 52,109" fill="none" stroke="red" stroke-width="1.2" />
                            <text x="65" y="103" font-family="Arial" font-size="10" fill="red">${angDeg3}°</text>

                            <!-- Marca de lado base -->
                            <text x="80" y="132" font-family="Arial" font-size="11" text-anchor="middle">s = ${s3} m</text>
                            
                            <!-- Ticks de lados iguales base -->
                            <line x1="78" y1="114" x2="82" y2="122" stroke="black" stroke-width="1" />
                            <line x1="138" y1="109" x2="142" y2="117" stroke="black" stroke-width="1" />
                        </svg>
                    </div>
                </div>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>

            <!-- PROBLEMA 4 -->
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; background-color: #fff;">
                <p><strong>${i+3}.</strong> Un cono recto de metal tiene un diámetro en su base de $d = ${d4}\\text{ cm}$. El ángulo formado entre el lado inclinado (generatriz) y el plano de la base es de $${angDeg4}^\\circ$, como se ilustra en el siguiente diagrama.</p>
                
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
                    <div style="flex: 1; min-width: 250px;">
                        <ol class="ib-lista" style="list-style-type: lower-alpha; padding-left: 20px;">
                            <li style="margin-bottom: 20px;">
                                <span class="ib-texto">Halle la altura vertical del cono.</span>
                                <span class="ib-mark">[3]</span>
                            </li>
                            <li>
                                <span class="ib-texto">Calcule el volumen del cono.</span>
                                <span class="ib-mark">[3]</span>
                            </li>
                        </ol>
                    </div>
                    <div style="flex: 1; min-width: 200px; text-align: center;">
                        <svg width="200" height="150" style="display: block; margin: auto; overflow: visible;">
                            <!-- Apex: V(100,20) -->
                            <!-- Base: Elipse centrada en (100,110) con rx=60, ry=20 -->
                            <!-- Contorno exterior -->
                            <path d="M 40,110 A 60,20 0 0 0 160,110" fill="none" stroke="black" stroke-width="1.8" />
                            <path d="M 40,110 A 60,20 0 0 1 160,110" fill="none" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
                            <line x1="40" y1="110" x2="100" y2="20" stroke="black" stroke-width="1.8" />
                            <line x1="160" y1="110" x2="100" y2="20" stroke="black" stroke-width="1.8" />

                            <!-- Altura vertical y radio -->
                            <line x1="100" y1="20" x2="100" y2="110" stroke="red" stroke-width="1.2" stroke-dasharray="3 3" /> <!-- Altura -->
                            <line x1="40" y1="110" x2="160" y2="110" stroke="blue" stroke-width="1.2" stroke-dasharray="3 3" /> <!-- Diámetro -->

                            <!-- Ángulo -->
                            <path d="M 55,110 A 15,15 0 0 1 50,100" fill="none" stroke="red" stroke-width="1.2" />
                            <text x="58" y="104" font-family="Arial" font-size="10" fill="red">${angDeg4}°</text>

                            <!-- Acotación de diámetro -->
                            <text x="100" y="125" font-family="Arial" font-size="11" text-anchor="middle">d = ${d4} cm</text>
                        </svg>
                    </div>
                </div>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
            </div>
        </div>
    `;

    const respuesta = `
        <p><strong>${i}. (Problema 1 - Rampa)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) i) $CE = \\sqrt{${w1}^2 + ${l1}^2} = ${ce1.toFixed(3)}\\text{ m} \\approx \\mathbf{${ce1.toFixed(2)}\\text{ m}}$</li>
            <li>a) ii) $CD = \\sqrt{${h1}^2 + CE^2} = \\sqrt{${h1}^2 + ${ce1.toFixed(4)}^2} = ${cd1.toFixed(3)}\\text{ m} \\approx \\mathbf{${cd1.toFixed(2)}\\text{ m}}$</li>
            <li>b) $\\tan(D\\hat{C}E) = \\frac{${h1}}{CE} \\implies D\\hat{C}E = \\arctan\\left(\\frac{${h1}}{${ce1.toFixed(3)}}\\right) = ${ang1.toFixed(2)}^\\circ \\approx \\mathbf{${ang1.toFixed(1)}^\\circ}$</li>
        </ul>

        <p><strong>${i+1}. (Problema 2 - Rampa invertida)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) i) $BF = \\sqrt{${w2}^2 + ${l2}^2} = ${bf2.toFixed(3)}\\text{ m} \\approx \\mathbf{${bf2.toFixed(2)}\\text{ m}}$</li>
            <li>a) ii) $AF = \\sqrt{${h2}^2 + BF^2} = \\sqrt{${h2}^2 + ${bf2.toFixed(4)}^2} = ${af2.toFixed(3)}\\text{ m} \\approx \\mathbf{${af2.toFixed(2)}\\text{ m}}$</li>
            <li>b) $\\tan(A\\hat{F}B) = \\frac{${h2}}{BF} \\implies A\\hat{F}B = \\arctan\\left(\\frac{${h2}}{${bf2.toFixed(3)}}\\right) = ${ang2.toFixed(2)}^\\circ \\approx \\mathbf{${ang2.toFixed(1)}^\\circ}$</li>
        </ul>

        <p><strong>${i+2}. (Problema 3 - Pirámide cuadrada)</strong></p>
        <ul style="list-style-type: none; padding-left: 0; margin-bottom: 15px;">
            <li>a) Mitad de la diagonal de la base $d_m = \\frac{${s3}\\sqrt{2}}{2} = ${semidiag3.toFixed(3)}\\text{ m}$. Altura $h = d_m \\tan(${angDeg3}^\\circ) = ${hPyramid3.toFixed(3)}\\text{ m} \\approx \\mathbf{${hPyramid3.toFixed(2)}\\text{ m}}$.</li>
            <li>b) Volumen $V = \\frac{1}{3} s^2 h = \\frac{1}{3} (${s3})^2 (${hPyramid3.toFixed(3)}) = ${vol3.toFixed(3)}\\text{ m}^3 \\approx \\mathbf{${vol3.toFixed(2)}\\text{ m}^3}$</li>
        </ul>

        <p><strong>${i+3}. (Problema 4 - Cono)</strong></p>
        <ul style="list-style-type: none; padding-left: 0;">
            <li>a) Radio $r = ${r4}\\text{ cm}$. Altura $h = ${r4} \\tan(${angDeg4}^\\circ) = ${hCone4.toFixed(3)}\\text{ cm} \\approx \\mathbf{${hCone4.toFixed(2)}\\text{ cm}}$.</li>
            <li>b) Volumen $V = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\pi (${r4})^2 (${hCone4.toFixed(3)}) = ${vol4.toFixed(2)}\\text{ cm}^3 \\approx \\mathbf{${vol4.toFixed(0)}\\text{ cm}^3}$ (o $166\\text{ cm}^3$ para 3 cifras sig.)</li>
        </ul>
    `;

    return { html, respuesta, numPreguntas: 4 };
}
