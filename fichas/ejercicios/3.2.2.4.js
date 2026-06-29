import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.2. Teorema del seno y del coseno",
    titulo: "Ficha: Interpretación y Modelación Trigonométrica (Rumbos)",
    puntos: 10,
};

export async function generar(i) {
    // Parámetros aleatorios coherentes
    // Ritva camina d1 km en rumbo beta1, luego d2 km en rumbo beta2
    const d1 = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 km
    const d2 = d1 + Math.floor(Math.random() * 3) + 1; // d1 + (1, 2, 3) km (e.g. 5 a 8 km)
    
    // Rumbos
    const beta1 = 40; // Rumbo fijo de 040°
    const beta2 = 150; // Rumbo fijo de 150°
    
    // Ángulo interior en el punto de giro Q
    // El rumbo de llegada es 40°, por lo que continuar recto sería 40°. El nuevo rumbo es 150°.
    // El ángulo de giro hacia la derecha es 150° - 40° = 110°.
    // Por lo tanto, el ángulo interior del triángulo en Q es 180° - 110° = 70°.
    const alpha = 70; 
    const alpha_rad = alpha * Math.PI / 180;
    
    // Ley del Coseno para la distancia de Esko (dE)
    const dE2 = d1*d1 + d2*d2 - 2*d1*d2*Math.cos(alpha_rad);
    const dE = Math.sqrt(dE2);
    
    // Ley del Seno para encontrar el ángulo interior en P (gamma)
    // sin(gamma)/d2 = sin(70°)/dE => sin(gamma) = d2 * sin(70°) / dE
    const sin_gamma = d2 * Math.sin(alpha_rad) / dE;
    const gamma_rad = Math.asin(sin_gamma);
    const gamma = gamma_rad * 180 / Math.PI;
    
    // El rumbo de Esko es beta1 + gamma (ya que gira a la derecha desde la línea de rumbo de 40°)
    const rumboE = beta1 + gamma;
    
    // Tiempos y velocidades
    const v_ritva = 5; // km/h
    const v_esko = 3; // km/h
    
    const dist_ritva = d1 + d2;
    const t_ritva = dist_ritva / v_ritva; // horas
    const t_esko = dE / v_esko; // horas
    
    const ritva_first = t_ritva < t_esko;
    const primer_llegar = ritva_first ? "Ritva" : "Esko";
    const segundo_llegar = ritva_first ? "Esko" : "Ritva";
    const t_espera = Math.abs(t_ritva - t_esko) * 60; // minutos

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- ================= PAGINA 1 ================= -->
            <!--div style="border: 2px solid #222; padding: 20px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between;"-->
                <div>
                    <!-- Cabecera -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 15px;">
                        <div>
                            <h2 style="margin: 0; font-size: 1.4em; text-transform: uppercase;">Ficha de Evaluación: Modelación Trigonométrica</h2>
                            <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Trigonometría en Triángulos No Rectángulos (Rumbos)</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-weight: bold; border: 2px solid #222; padding: 5px 10px; border-radius: 4px;">Puntaje Máximo: 10</span>
                        </div>
                    </div>

                    <!-- Enunciado Principal -->
                    <div style="font-size: 1.05em; line-height: 1.5; margin-bottom: 20px; background-color: #f9f9f9; padding: 12px; border-left: 4px solid #222;">
                        <p style="margin: 0;">
                            <strong>Contexto:</strong> Dos excursionistas, Ritva y Esko, parten del mismo punto de origen $P$ al mismo tiempo. 
                            Ritva camina $${d1}\\text{ km}$ con un rumbo de $40^\\circ$ (Respecto al norte), y luego camina otros $${d2}\\text{ km}$ con un rumbo de $150^\\circ$ para llegar al campamento. 
                            Esko camina hacia el campamento en línea recta directamente desde el punto de origen $P$.
                        </p>
                    </div>

                    <!-- Apartado A -->
                    <div style="margin-bottom: 25px;">
                        <p style="margin: 0 0 8px 0; font-weight: bold;">
                            a) Dibuje un diagrama claro y rotulado que represente la situación descrita, indicando los puntos $P$, el punto de giro de Ritva, el campamento, las distancias y los ángulos de rumbo correspondientes.
                            <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                        </p>
                        <!-- Espacio en blanco para dibujo -->
                        <div style="border: 2px dashed #999; height: 350px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #777; font-size: 0.9em; background-color: #fafafa; margin-top: 10px;">
                            
                        </div>
                    </div>

                    <!-- Apartado B -->
                    <div style="margin-top: 15px;">
                        <p style="margin: 0 0 8px 0; font-weight: bold;">
                            b) Calcule la distancia total que camina Esko directamente desde $P$ hasta el campamento.
                            <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                        </p>
                        <tlacuache-renglon n="8" color="gray" alto="25"></tlacuache-renglon>
                    </div>
                </div>
                
                <div style="text-align: right; font-size: 0.85em; color: #777; border-top: 1px solid #ddd; padding-top: 5px;">
                    Página 1 de 2
                </div>
            <!--/div-->

            <!-- SALTO DE PÁGINA FORZADO -->
            <!--div style="page-break-before: always; break-before: page;"></div-->

            <!-- ================= PAGINA 2 ================= -->
            <!--div style="border: 2px solid #222; padding: 20px; border-radius: 8px; background-color: #fff; min-height: 980px; display: flex; flex-direction: column; justify-content: space-between; margin-top: 10px;"-->
                <div>
                   

                    <!-- Apartado C -->
                    <div style="margin-bottom: 35px;">
                        <p style="margin: 0 0 8px 0; font-weight: bold;">
                            c) Determine el rumbo (bearing) exacto en el que camina Esko.
                            <span style="float: right; font-weight: normal; color: #555;">[3 puntos]</span>
                        </p>
                        <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
                    </div>

                    <!-- Apartado D -->
                    <div>
                        <p style="margin: 0 0 8px 0; font-weight: bold;">
                            d) Ritva camina a una velocidad promedio de $5\\text{ km h}^{-1}$ y Esko camina a una velocidad promedio de $3\\text{ km h}^{-1}$.
                        </p>
                        
                        <div style="margin-left: 15px; margin-bottom: 20px;">
                            <p style="margin: 0 0 8px 0; font-weight: bold;">
                                i. Halle cuál de los dos excursionistas llegará primero al campamento.
                                <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                            </p>
                            <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                        </div>

                        <div style="margin-left: 15px;">
                            <p style="margin: 0 0 8px 0; font-weight: bold;">
                                ii. Calcule la cantidad de minutos que la primera persona en llegar debe esperar a la segunda.
                                <span style="float: right; font-weight: normal; color: #555;">[1 punto]</span>
                            </p>
                            <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
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
            
            <div style="margin-bottom: 15px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Apartado a) Diagrama de vectores y rumbos [2 puntos]:</strong><br>
                * Dibujo correcto de la trayectoria en el plano con el origen en $P$. [1 punto]<br>
                * Indicación correcta de los rumbos $040^circ$ y $150^circ$ y las longitudes correspondientes ($${d1}\\text{ km}$ y $${d2}\\text{ km}$). [1 punto]
            </div>

            <div style="margin-bottom: 15px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Apartado b) Distancia de Esko ($d_E$) [3 puntos]:</strong><br>
                * Identificación del ángulo interior en el vértice de giro ($Q$):<br>
                El ángulo exterior es $150^\\circ - 40^\\circ = 110^\\circ$. El ángulo interior es $180^\\circ - 110^\\circ = 70^\\circ$. [1 punto]<br>
                * Aplicación correcta de la Ley del Coseno:<br>
                $d_E^2 = ${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(70^\\circ)$<br>
                $d_E^2 = ${d1*d1} + ${d2*d2} - ${2*d1*d2}\\cos(70^\\circ) = ${d1*d1 + d2*d2} - ${2*d1*d2} \\cdot 0.3420 = ${dE2.toFixed(2)}$ [1 punto]<br>
                * Resultado final:<br>
                $d_E = \\mathbf{${dE.toFixed(2)}\\text{ km}}$ (o $\\approx ${dE.toFixed(1)}\\text{ km}$). [1 punto]
            </div>

            <div style="margin-bottom: 15px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Apartado c) Rumbo de Esko [3 puntos]:</strong><br>
                * Aplicación de la Ley del Seno para hallar el ángulo interior en $P$ (llamémoslo $\\theta$):<br>
                $\\frac{\\sin \\theta}{${d2}} = \\frac{\\sin(70^\\circ)}{${dE.toFixed(2)}} \\implies \\sin \\theta = \\frac{${d2} \\cdot \\sin(70^\\circ)}{${dE.toFixed(2)}} \\approx ${sin_gamma.toFixed(4)}$ [1 punto]<br>
                * Hallar el ángulo $\\theta$:<br>
                $\\theta = \\arcsin(${sin_gamma.toFixed(4)}) \\approx ${gamma.toFixed(1)}^\\circ$ [1 punto]<br>
                * Calcular el rumbo final (bearing):<br>
                $\\text{Rumbo} = 40^\\circ + ${gamma.toFixed(1)}^\\circ = \\mathbf{${rumboE.toFixed(1)}^\\circ}$ (o rumbo de $111^\\circ$). [1 punto]
            </div>

            <div style="margin-bottom: 15px; border-left: 3px solid #e6b8af; padding-left: 10px;">
                <strong>Apartado d) Tiempos y velocidades [2 puntos]:</strong><br>
                * <strong>i. Quién llega primero [1 punto]:</strong><br>
                Tiempo Ritva $= \\frac{${d1} + ${d2}}{5} = \\frac{${dist_ritva}}{5} = ${t_ritva.toFixed(2)}\\text{ horas}$.<br>
                Tiempo Esko $= \\frac{${dE.toFixed(2)}}{3} = ${t_esko.toFixed(2)}\\text{ horas}$.<br>
                Como $t_{${primer_llegar.toLowerCase()}} < t_{${segundo_llegar.toLowerCase()}}$, **llega primero ${primer_llegar}**. [1 punto]<br>
                * <strong>ii. Tiempo de espera [1 punto]:</strong><br>
                Diferencia en minutos: $(${t_esko.toFixed(2)} - ${t_ritva.toFixed(2)}) \\times 60 \\approx \\mathbf{${t_espera.toFixed(1)}\\text{ minutos}}$ de espera. [1 punto]
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
