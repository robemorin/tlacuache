import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.3. Geometría de coordenadas",
    seccion: "3.3.1. Distancia y punto medio en 3D",
    titulo: "Ficha: Cuerpos Geométricos en el Espacio (Pirámide y Cono)",
    puntos: 20,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: PIRÁMIDE DE BASE CUADRADA (10 PUNTOS)
    // ==========================================
    // Seleccionamos un conjunto de valores aleatorios pero matemáticamente limpios
    const configsPiramide = [
        { L: 10, H: 12, apex_x: 5, apex_y: 5, MD: 13, volumen: 400, area_lat: 260, area_tot: 360 },
        { L: 6, H: 4, apex_x: 3, apex_y: 3, MD: 5, volumen: 48, area_lat: 60, area_tot: 96 }
    ];
    const cfgP = configsPiramide[Math.floor(Math.random() * configsPiramide.length)];

    // Coordenadas de los vértices
    const O = { x: 0, y: 0, z: 0 };
    const A = { x: cfgP.L, y: 0, z: 0 };
    const B = { x: cfgP.L, y: cfgP.L, z: 0 };
    const C = { x: 0, y: cfgP.L, z: 0 };
    const D = { x: cfgP.apex_x, y: cfgP.apex_y, z: cfgP.H };

    // Punto medio M de AB
    const M = { x: cfgP.L, y: cfgP.L / 2, z: 0 };

    // ==========================================
    // EJERCICIO 2: CONO EN TRES DIMENSIONES (10 PUNTOS)
    // ==========================================
    const configsCono = [
        { px: 4, py: 3, R: 5, H: 12, g: 13, vol_exact: 100, area_exact: 90 },
        { px: 8, py: 15, R: 17, H: 144, g: 145, vol_exact: 13872, area_exact: 2754 } // una cuaterna grande por si acaso, pero mantengamos una más simple:
    ];
    // Para simplificar los cálculos de los alumnos, usaremos R=5 y H=12, o R=8 y H=15 (g=17)
    const configsConoLimpios = [
        { px: 4, py: 3, R: 5, H: 12, g: 13, vol_exact: 100, area_exact: 90 },
        { px: 3, py: 4, R: 5, H: 12, g: 13, vol_exact: 100, area_exact: 90 },
        { px: 8, py: 6, R: 10, H: 24, g: 26, vol_exact: 800, area_exact: 360 }
    ];
    const cfgC = configsConoLimpios[Math.floor(Math.random() * configsConoLimpios.length)];

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- ================= PAGINA 1 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between;"-->
                <div>
                    <!-- Cabecera -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                        <div>
                            <h2 style="margin: 0; font-size: 1.4em; text-transform: uppercase; letter-spacing: 0.5px;">Ficha de Evaluación: Cuerpos Geométricos en el Espacio 3D</h2>
                            <p style="margin: 3px 0; font-size: 0.95em; color: #555;">Tema: Volumen, Área Superficial y Coordenadas en 3D</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 20</span>
                        </div>
                    </div>

                    <!-- Instrucciones -->
                    <div style="font-style: italic; color: #444; margin-bottom: 25px; font-size: 0.95em;">
                        <strong>Instrucciones:</strong> Lea detenidamente los problemas que se presentan a continuación. Interprete los datos geométricos espaciales provistos y resuelva de manera analítica en los espacios asignados. No se proporcionan diagramas, por lo que se recomienda realizar bocetos propios en hojas de borrador si es necesario.
                    </div>

                    <!-- Ejercicio 1 -->
                    <div>
                        <p style="font-size: 1.1em; line-height: 1.5; margin: 0 0 15px 0;">
                            <strong>Ejercicio 1.</strong> Una pirámide de base cuadrada tiene los vértices de su base en los puntos coordenados $O(${O.x}, ${O.y}, ${O.z})$, $A(${A.x}, ${A.y}, ${A.z})$, $B(${B.x}, ${B.y}, ${B.z})$ y $C(${C.x}, ${C.y}, ${C.z})$. La cúspide (ápice) de la pirámide se ubica en el punto $D(${D.x}, ${D.y}, ${D.z})$.
                        </p>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Verifique analíticamente que la cúspide $D$ de la pirámide se encuentra directamente sobre el centro de la base cuadrada.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                                
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Calcule el volumen total de la pirámide.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                                
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                c) Si $M$ es el punto medio del segmento de la base $[AB]$, halle sus coordenadas y calcule la longitud de la altura de la cara lateral $[MD]$.
                                <span style="float: right; font-weight: normal; color: #555;">[4 puntos]</span>
                            </p>
                            
                        </div>

                        <div style="margin-left: 10px; margin-top: 20px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                d) A partir de lo anterior, calcule el área de la superficie total de la pirámide.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                                
                        </div>
                    </div>
                </div>
                <div style="page-break-before: always; break-before: page;"></div>
            <!--/div-->

            <!-- SALTO DE PÁGINA -->
            

            <!-- ================= PAGINA 2 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between; margin-top: 10px;"-->
                <div>
                    <!-- Cabecera Reducida -->
                    <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px;">
                        <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Evaluación: Cuerpos Geométricos en el Espacio (Continuación)</span>
                    </div>

                    <!-- Ejercicio 2 -->
                    <div>
                        <p style="font-size: 1.1em; line-height: 1.5; margin: 0 0 20px 0;">
                            <strong>Ejercicio 2.</strong> La base circular de un cono recto se encuentra sobre el plano cartesiano $X-Y$ y está centrada en el origen $(0, 0, 0)$. Se sabe que el punto $P(${cfgC.px}, ${cfgC.py}, 0)$ se sitúa sobre la circunferencia de la base, y la cúspide (ápice) del cono está ubicada en el punto $(0, 0, ${cfgC.H})$.
                        </p>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Halle la longitud del radio de la base del cono circular.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            
                        </div>

                        <div style="margin-left: 10px; margin-top: 25px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Determine el volumen exacto del cono en términos de $\\pi$.
                                <span style="float: right; font-weight: normal; color: #222;">[2 puntos]</span>
                            </p>
                            
                        </div>

                        <div style="margin-left: 10px; margin-top: 25px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                c) Calcule la longitud de la generatriz (altura inclinada o slant height) del cono.
                                <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                            </p>
                            
                        </div>

                        <div style="margin-left: 10px; margin-top: 25px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                d) Calcule el área total de la superficie del cono, expresando su resultado en forma exacta en términos de $\\pi$.
                                <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                            </p>
                            
                        </div>
                    </div>
                </div>

            <!--/div-->
        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;">
                <strong>Solucionario Oficial y Esquema de Calificación (Ficha ${i})</strong>
            </p>

            <div style="margin-bottom: 20px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Ejercicio 1 [10 Puntos]:</strong><br>
                <strong>a) Verificación del centro de la base [2 puntos]:</strong><br>
                * Las esquinas opuestas de la base cuadrada de lado $L = ${cfgP.L}$ son $O(0,0,0)$ y $B(${cfgP.L}, ${cfgP.L}, 0)$.<br>
                * El punto medio (centro del cuadrado) es: $Centro = \\left(\\frac{0 + ${cfgP.L}}{2}, \\frac{0 + ${cfgP.L}}{2}, \\frac{0 + 0}{2}\\right) = (${cfgP.apex_x}, ${cfgP.apex_y}, 0)$. [1 punto]<br>
                * Las coordenadas de la cúspide son $D(${cfgP.apex_x}, ${cfgP.apex_y}, ${cfgP.H})$. Dado que las coordenadas $x$ e $y$ de $D$ coinciden con el centro de la base, el ápice se encuentra directamente sobre el centro de la base cuadrada a una altura de $H = ${cfgP.H}$. [1 punto]<br>
                
                <strong>b) Volumen de la pirámide [2 puntos]:</strong><br>
                * Fórmula del volumen: $V = \\frac{1}{3} \\cdot A_{\\text{base}} \\cdot H$<br>
                * Área de la base cuadrada: $A_{\\text{base}} = L^2 = ${cfgP.L}^2 = ${cfgP.L * cfgP.L}$ [1 punto]<br>
                * Volumen: $V = \\frac{1}{3} \\cdot ${cfgP.L * cfgP.L} \\cdot ${cfgP.H} = \\mathbf{${cfgP.volumen}\\text{ unidades}^3}$. [1 punto]<br>

                <strong>c) Coordenadas de $M$ y longitud de $[MD]$ [4 puntos]:</strong><br>
                * Punto medio de $[AB]$ con $A(${cfgP.L}, 0, 0)$ y $B(${cfgP.L}, ${cfgP.L}, 0)$:<br>
                $M = \\left(\\frac{${cfgP.L} + ${cfgP.L}}{2}, \\frac{0 + ${cfgP.L}}{2}, 0\\right) = \\mathbf{(${M.x}, ${M.y}, 0)}$ [2 puntos]<br>
                * Distancia tridimensional $[MD]$ (altura lateral de la cara inclinada):<br>
                $MD = \\sqrt{(D_x - M_x)^2 + (D_y - M_y)^2 + (D_z - M_z)^2}$<br>
                $MD = \\sqrt{(${cfgP.apex_x} - ${M.x})^2 + (${cfgP.apex_y} - ${M.y})^2 + (${cfgP.H} - 0)^2} = \\sqrt{(${cfgP.apex_x - M.x})^2 + 0^2 + ${cfgP.H}^2}$<br>
                $MD = \\sqrt{${(cfgP.apex_x - M.x)**2} + ${cfgP.H * cfgP.H}} = \\sqrt{${(cfgP.apex_x - M.x)**2 + cfgP.H * cfgP.H}} = \\mathbf{${cfgP.MD}\\text{ unidades}}$. [2 puntos]<br>

                <strong>d) Área de la superficie de la pirámide [2 puntos]:</strong><br>
                * Área lateral (4 caras triangulares de base $L = ${cfgP.L}$ y altura de cara $MD = ${cfgP.MD}$):<br>
                $A_{\\text{lateral}} = 4 \\cdot \\left(\\frac{1}{2} \\cdot L \\cdot MD\\right) = 2 \\cdot ${cfgP.L} \\cdot ${cfgP.MD} = ${cfgP.area_lat}$ [1 punto]<br>
                * Área superficial total: $A_{\\text{total}} = A_{\\text{base}} + A_{\\text{lateral}} = ${cfgP.L * cfgP.L} + ${cfgP.area_lat} = \\mathbf{${cfgP.area_tot}\\text{ unidades}^2}$. [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [10 Puntos]:</strong><br>
                <strong>a) Radio de la base del cono [2 puntos]:</strong><br>
                * El radio es la distancia del origen $(0,0,0)$ al punto en la circunferencia $P(${cfgC.px}, ${cfgC.py}, 0)$:<br>
                $R = \\sqrt{(${cfgC.px} - 0)^2 + (${cfgC.py} - 0)^2 + 0^2} = \\sqrt{${cfgC.px}^2 + ${cfgC.py}^2} = \\sqrt{${cfgC.px*cfgC.px + cfgC.py*cfgC.py}} = \\mathbf{${cfgC.R}\\text{ unidades}}$. [2 puntos]<br>

                <strong>b) Volumen exacto del cono [2 puntos]:</strong><br>
                * Fórmula del volumen: $V = \\frac{1}{3} \\pi R^2 H$<br>
                * Sustituyendo $R = ${cfgC.R}$ y $H = ${cfgC.H}$:<br>
                $V = \\frac{1}{3} \\pi \\cdot (${cfgC.R})^2 \\cdot ${cfgC.H} = \\frac{1}{3} \\pi \\cdot ${cfgC.R * cfgC.R} \\cdot ${cfgC.H} = \\mathbf{${cfgC.vol_exact}\\pi\\text{ unidades}^3}$. [2 puntos]<br>

                <strong>c) Generatriz (slant height) del cono [3 puntos]:</strong><br>
                * La generatriz $g$ es la distancia desde el ápice $(0,0,${cfgC.H})$ a cualquier punto de la circunferencia base $P(${cfgC.px}, ${cfgC.py}, 0)$:<br>
                $g = \\sqrt{(${cfgC.px} - 0)^2 + (${cfgC.py} - 0)^2 + (0 - ${cfgC.H})^2} = \\sqrt{${cfgC.px}^2 + ${cfgC.py}^2 + ${cfgC.H}^2}$<br>
                $g = \\sqrt{R^2 + H^2} = \\sqrt{${cfgC.R}^2 + ${cfgC.H}^2} = \\sqrt{${cfgC.R * cfgC.R + cfgC.H * cfgC.H}} = \\mathbf{${cfgC.g}\\text{ unidades}}$. [3 puntos]<br>

                <strong>d) Área superficial total del cono [3 puntos]:</strong><br>
                * Área lateral: $A_{\\text{lateral}} = \\pi R g = \\pi \\cdot ${cfgC.R} \\cdot ${cfgC.g} = ${cfgC.R * cfgC.g}\\pi$<br>
                * Área base circular: $A_{\\text{base}} = \\pi R^2 = \\pi \\cdot ${cfgC.R}^2 = ${cfgC.R * cfgC.R}\\pi$<br>
                * Área total: $A_{\\text{total}} = A_{\\text{base}} + A_{\\text{lateral}} = ${cfgC.R * cfgC.R}\\pi + ${cfgC.R * cfgC.g}\\pi = \\mathbf{${cfgC.area_exact}\\pi\\text{ unidades}^2}$. [3 puntos]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 2 };
}
