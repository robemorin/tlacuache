import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.3. Geometría de coordenadas",
    seccion: "3.3.1. Distancia y punto medio en 3D",
    titulo: "Ficha: Distancia y Punto Medio en 3D (10 Puntos)",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: PUNTO MEDIO Y ÁNGULO DEL TRIÁNGULO (4 PUNTOS)
    // ==========================================
    // Generar coordenadas de P, Q, R
    const P = {
        x: Math.floor(Math.random() * 8) - 4, // -4 a 3
        y: Math.floor(Math.random() * 8) - 4,
        z: Math.floor(Math.random() * 8) - 4
    };

    const Q = {
        x: P.x + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        y: P.y + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        z: P.z + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1)
    };

    const R = {
        x: Q.x + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        y: Q.y + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        z: Q.z + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1)
    };

    // Puntos medios M de PQ y N de QR
    const M = {
        x: (P.x + Q.x) / 2,
        y: (P.y + Q.y) / 2,
        z: (P.z + Q.z) / 2
    };

    const N = {
        x: (Q.x + R.x) / 2,
        y: (Q.y + R.y) / 2,
        z: (Q.z + R.z) / 2
    };

    // Distancias al cuadrado y exactas
    const PQ_sq = (Q.x - P.x)**2 + (Q.y - P.y)**2 + (Q.z - P.z)**2;
    const QR_sq = (R.x - Q.x)**2 + (R.y - Q.y)**2 + (R.z - Q.z)**2;
    const PR_sq = (R.x - P.x)**2 + (R.y - P.y)**2 + (R.z - P.z)**2;

    const c = Math.sqrt(PQ_sq); // PQ
    const a = Math.sqrt(QR_sq); // QR
    const b = Math.sqrt(PR_sq); // PR

    // Ángulo en el vértice Q (usando la ley de cosenos en PQR)
    // b^2 = a^2 + c^2 - 2ac cos(Q) => cos(Q) = (a^2 + c^2 - b^2) / (2ac)
    const cosQ = (QR_sq + PQ_sq - PR_sq) / (2 * a * c);
    // Para evitar errores numéricos de punto flotante fuera de [-1, 1]
    const cosQ_safe = Math.max(-1, Math.min(1, cosQ));
    const angQ = Math.acos(cosQ_safe) * 180 / Math.PI;

    // ==========================================
    // EJERCICIO 2: ECUACIÓN DE DISTANCIA Y VALOR ADMISIBLE (6 PUNTOS)
    // ==========================================
    // Cuaternas pitagóricas para que la distancia D sea entera y las soluciones de k sean limpias:
    // dx^2 + dy^2 + dz^2 = D^2
    const cuaternas = [
        { dy: 3, dz: 6, dist: 7, dx: 2 },
        { dy: 4, dz: 12, dist: 13, dx: 3 },
        { dy: 2, dz: 2, dist: 3, dx: 1 }
    ];

    const seleccion = cuaternas[Math.floor(Math.random() * cuaternas.length)];
    
    // Punto A (fijo)
    const A_coord = {
        x: Math.floor(Math.random() * 8) - 4,
        y: Math.floor(Math.random() * 8) - 4,
        z: Math.floor(Math.random() * 8) - 4
    };

    const signY = Math.random() > 0.5 ? 1 : -1;
    const signZ = Math.random() > 0.5 ? 1 : -1;

    const B_y = A_coord.y + signY * seleccion.dy;
    const B_z = A_coord.z + signZ * seleccion.dz;

    // Distancia mínima admisible (cuando k = A_coord.x, de modo que (k - Ax)^2 = 0)
    // D_min = sqrt((By - Ay)^2 + (Bz - Az)^2) = sqrt(dy^2 + dz^2)
    const D_min_sq = seleccion.dy**2 + seleccion.dz**2;
    const D_min = Math.sqrt(D_min_sq);

    // Los dos valores posibles de k
    const k1 = A_coord.x + seleccion.dx;
    const k2 = A_coord.x - seleccion.dx;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- ================= PAGINA 1 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between;"-->
                <div>
                    <!-- Cabecera -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                        <div>
                            <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase; letter-spacing: 0.5px;">Evaluación: Geometría de Coordenadas en el Espacio</h2>
                            <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Puntos, Distancias y Ángulos en 3D</p>
                        </div>
                    </div>

                    <!-- Instrucciones -->
                    <div style="font-style: italic; color: #444; margin-bottom: 25px; font-size: 0.95em;">
                        <strong>Instrucción para el alumno:</strong> Lea los siguientes enunciados. Dibuje los esquemas correspondientes si lo requiere para interpretar los datos, plantee las fórmulas algebraicas de geometría tridimensional y resuelva con orden y claridad.
                    </div>

                    <!-- Ejercicio 1 -->
                    <div style="margin-bottom: 20px;">
                        <p style="font-size: 1.1em; line-height: 1.5; margin: 0 0 15px 0;">
                            <strong>Ejercicio 1.</strong> Tres puntos en el espacio tridimensional están definidos por las coordenadas $P(${P.x}, ${P.y}, ${P.z})$, $Q(${Q.x}, ${Q.y}, ${Q.z})$ y $R(${R.x}, ${R.y}, ${R.z})$.
                        </p>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Halle las coordenadas de los puntos medios $M$ y $N$ de los segmentos $[PQ]$ y $[QR]$ respectivamente.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 10px; margin-top: 25px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Determine la medida del ángulo $\\angle PQR$ en el vértice $Q$, justificando los cálculos de las distancias intermedias necesarias.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="9" color="gray" alto="25"></tlacuache-renglon>
                        </div>
                    </div>
                </div>
            <!--/div-->

            <!-- ================= PAGINA 2 ================= -->
            <!--div style="border: 2px solid #222; padding: 25px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between; margin-top: 10px;"-->
                <div>
                    <!-- Cabecera Reducida -->
                    <div style="border-bottom: 1px solid #aaa; padding-bottom: 8px; margin-bottom: 25px;">
                        <span style="font-weight: bold; font-size: 1.1em; text-transform: uppercase;">Evaluación: Geometría de Coordenadas (Continuación)</span>
                    </div>

                    <!-- Ejercicio 2 -->
                    <div>
                        <p style="font-size: 1.1em; line-height: 1.5; margin: 0 0 20px 0;">
                            <strong>Ejercicio 2.</strong> Considere el punto fijo $A(${A_coord.x}, ${A_coord.y}, ${A_coord.z})$ y el punto $B(k, ${B_y}, ${B_z})$, cuya coordenada en el eje $x$ está expresada en términos de un parámetro real $k$.
                        </p>

                        <div style="margin-left: 10px; margin-top: 15px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                a) Halle el valor mínimo admisible que puede tomar la distancia entre los puntos $A$ y $B$ para que exista al menos una solución real para el parámetro $k$.
                                <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                            </p>
                            <tlacuache-renglon n="7" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 10px; margin-top: 25px;">
                            <p style="font-weight: bold; margin-bottom: 8px;">
                                b) Sabiendo que la distancia entre $A$ y $B$ es de $${seleccion.dist}$ unidades, calcule los dos posibles valores reales del parámetro $k$.
                                <span style="float: right; font-weight: normal; color: #555;">[4 puntos]</span>
                            </p>
                            <tlacuache-renglon n="9" color="gray" alto="25"></tlacuache-renglon>
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
                <strong>Ejercicio 1 [4 Puntos]:</strong><br>
                <strong>a) Coordenadas de los puntos medios $M$ y $N$ [2 puntos]:</strong><br>
                * $M$ es el punto medio del segmento $[PQ]$:<br>
                $M = \\left( \\frac{${P.x} + ${Q.x}}{2}, \\frac{${P.y} + ${Q.y}}{2}, \\frac{${P.z} + ${Q.z}}{2} \\right) = \\mathbf{(${M.x}, ${M.y}, ${M.z})}$ [1 punto]<br>
                * $N$ es el punto medio del segmento $[QR]$:<br>
                $N = \\left( \\frac{${Q.x} + ${R.x}}{2}, \\frac{${Q.y} + ${R.y}}{2}, \\frac{${Q.z} + ${R.z}}{2} \\right) = \\mathbf{(${N.x}, ${N.y}, ${N.z})}$ [1 punto]<br>
                
                <strong>b) Medida del ángulo $\\angle PQR$ en el vértice $Q$ [2 puntos]:</strong><br>
                * Calcular los lados del triángulo $\\triangle PQR$ mediante la distancia tridimensional:<br>
                $PQ = \\sqrt{(${Q.x} - ${P.x})^2 + (${Q.y} - ${P.y})^2 + (${Q.z} - ${P.z})^2} = \\sqrt{${PQ_sq}} \\approx ${c.toFixed(3)}$<br>
                $QR = \\sqrt{(${R.x} - ${Q.x})^2 + (${R.y} - ${Q.y})^2 + (${R.z} - ${Q.z})^2} = \\sqrt{${QR_sq}} \\approx ${a.toFixed(3)}$<br>
                $PR = \\sqrt{(${R.x} - ${P.x})^2 + (${R.y} - ${P.y})^2 + (${R.z} - ${P.z})^2} = \\sqrt{${PR_sq}} \\approx ${b.toFixed(3)}$ [1 punto por calcular las distancias correctamente]<br>
                * Aplicar la Ley del Coseno para despejar el ángulo del vértice $Q$:<br>
                $\\cos(\\angle PQR) = \\frac{PQ^2 + QR^2 - PR^2}{2 \\cdot PQ \\cdot QR} = \\frac{${PQ_sq} + ${QR_sq} - ${PR_sq}}{2 \\cdot ${c.toFixed(2)} \\cdot ${a.toFixed(2)}} = \\frac{${PQ_sq + QR_sq - PR_sq}}{${(2 * a * c).toFixed(2)}} \\approx ${cosQ.toFixed(4)}$<br>
                $\\angle PQR = \\arccos(${cosQ.toFixed(4)}) \\approx \\mathbf{${angQ.toFixed(1)}^\\circ}$ (o en radianes: $${(angQ * Math.PI / 180).toFixed(3)}\\text{ rad}$). [1 punto]
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [6 Puntos]:</strong><br>
                <strong>a) Valor mínimo admisible de la distancia [2 puntos]:</strong><br>
                * Escribir la distancia en términos de $k$:<br>
                $D(k) = \\sqrt{(k - (${A_coord.x}))^2 + (${B_y} - (${A_coord.y}))^2 + (${B_z} - (${A_coord.z}))^2} = \\sqrt{(k - (${A_coord.x}))^2 + (${B_y - A_coord.y})^2 + (${B_z - A_coord.z})^2}$<br>
                $D(k) = \\sqrt{(k - (${A_coord.x}))^2 + ${seleccion.dy**2} + ${seleccion.dz**2}} = \\sqrt{(k - (${A_coord.x}))^2 + ${D_min_sq}}$ [1 punto]<br>
                * El valor mínimo del término cuadrático $(k - (${A_coord.x}))^2$ es $0$, lo cual ocurre cuando $k = ${A_coord.x}$.<br>
                * Por lo tanto, la distancia mínima admisible es:<br>
                $D_{\\text{min}} = \\sqrt{${D_min_sq}} = \\mathbf{${D_min.toFixed(2)}}$ (o de forma exacta: $\\sqrt{${D_min_sq}}$). [1 punto]<br>

                <strong>b) Hallar los posibles valores de $k$ para $D = ${seleccion.dist}$ [4 puntos]:</strong><br>
                * Plantear la ecuación con la distancia dada:<br>
                $(k - (${A_coord.x}))^2 + ${D_min_sq} = ${seleccion.dist}^2$<br>
                $(k - (${A_coord.x}))^2 + ${D_min_sq} = ${seleccion.dist * seleccion.dist}$ [1 punto]<br>
                * Despejar el término con $k$:<br>
                $(k - (${A_coord.x}))^2 = ${seleccion.dist * seleccion.dist} - ${D_min_sq}$<br>
                $(k - (${A_coord.x}))^2 = ${seleccion.dx * seleccion.dx}$ [1 punto]<br>
                * Obtener las dos soluciones reales aplicando la raíz:<br>
                $k - (${A_coord.x}) = \\pm ${seleccion.dx}$ [1 punto]<br>
                $k_1 = ${A_coord.x} + ${seleccion.dx} = \\mathbf{${k1}}$<br>
                $k_2 = ${A_coord.x} - ${seleccion.dx} = \\mathbf{${k2}}$ [1 punto]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 2 };
}
