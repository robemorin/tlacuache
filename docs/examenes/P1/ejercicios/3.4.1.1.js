import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Diagramas de Voronoi",
    titulo: "Torres de Telefonía Celular",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- DATOS DEL PROBLEMA ---
    // --- DATOS DEL PROBLEMA ---
    // Basado en M21/5/MATHY/SP1/ENG/TZ1/XX Pregunta 5

    // Creamos un ID único para el contenedor de GeoGebra
    const idContenedor = `ggb_applet_${i}`;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El siguiente diagrama de Voronoi muestra la ubicación de tres torres de telefonía celular idénticas, $T_1$, $T_2$ y $T_3$. Una cuarta torre, $T_4$, se encuentra en la región sombreada. Las líneas discontinuas representan las aristas del diagrama de Voronoi.</p>
            
            <p style="font-size: 0.9em; color: #555;">Escala: 1 unidad de cuadrícula principal representa 1 km.</p>

            <div id="${idContenedor}" class="ggb-lienzo" style="width:500px; height:350px; margin: 20px auto;"></div>

            <p>Tim se encuentra en algún punto dentro de la región sombreada.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Explique por qué Tim recibirá la señal más fuerte de la torre $T_4$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                
                <p>La torre $T_2$ tiene coordenadas $(-9, 5)$ y la arista que conecta los vértices $A$ y $B$ tiene por ecuación $y = 3$.</p>
                
                <li>
                    <span class="ib-texto">Escriba las coordenadas de la torre $T_4$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>

                <p>La torre $T_1$ tiene coordenadas $(-13, 3)$.</p>

                <li>
                    <span class="ib-texto">Halle la pendiente de la arista del diagrama de Voronoi que se encuentra entre las torres $T_1$ y $T_2$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            <tlacuache-renglon n="12" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista-res">
            <li><strong>a)</strong> En un diagrama de Voronoi, cualquier punto dentro de una celda está más cerca del sitio (torre) de esa celda que de cualquier otro sitio. Como Tim está en la celda de $T_4$, está más cerca de $T_4$ y, por lo tanto, recibirá la señal más fuerte de dicha torre.</li>
            <li><strong>b)</strong> La arista entre dos sitios es la mediatriz del segmento que los une. 
                <br>La arista entre $T_2(-9, 5)$ y $T_4(x, y)$ es $y = 3$ (una línea horizontal).
                <br>Esto implica que $T_4$ debe tener la misma coordenada $x$ que $T_2$, por lo que $x = -9$.
                <br>Además, la coordenada $y$ de la mediatriz es el punto medio entre las coordenadas $y$ de los sitios: $\\frac{5 + y_4}{2} = 3 \\Rightarrow 5 + y_4 = 6 \\Rightarrow y_4 = 1$.
                <br>Por lo tanto, $T_4 = $ <strong>$(-9, 1)$</strong>.
            </li>
            <li><strong>c)</strong> Primero hallamos la pendiente del segmento $T_1 T_2$:
                <br>$m_{T_1 T_2} = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{5 - 3}{-9 - (-13)} = \\frac{2}{4} = 0.5$.
                <br>La arista es la mediatriz, por lo que su pendiente es el recíproco negativo:
                <br>$m_{arista} = -\\frac{1}{0.5} = $ <strong>$-2$</strong>.
            </li>
        </ol>
    `;

    const postRender = () => {
        if (window.GGBApplet) {
            const material_id = "uaxkzmpb";
            const parametros = {
                "width": 500,
                "height": 350,
                material_id,
                "showToolBar": false,
                "showAlgebraInput": false,
                "showMenuBar": false,
                "showResetIcon": true,
                "borderColor": "#E0E0E0",
                "preventFocus": true,
                "enableShiftDragZoom": true,
                appletOnLoad(api) {
                    api.setCoordSystem(-16, 2, -4, 8);
                    api.setAxisSteps(1, 1, 1);
                    api.setGridVisible(true);
                    api.setAxesVisible(false, false);

                    // Puntos
                    api.evalCommand('T_1 = (-13, 3)');
                    api.evalCommand('T_2 = (-9, 5)');
                    api.evalCommand('T_3 = (-3, 7)');
                    api.evalCommand('T_4 = (-9, 1)');
                    api.setVisible("T_4", false);
                    /*
                    api.setLabelVisible('T_1', false)
                    api.setLabelVisible('T_2', false)
                    api.setLabelVisible('T_3', false)
                    api.setLabelVisible('T_4', false)*/
                    api.evalCommand('A = (-10.5, 3)');
                    api.evalCommand('B = (-5, 3)');
                    api.evalCommand("L = {T_1, T_3, T_2, T_4}");
                    api.evalCommand("v = Voronoi(L)");
                    api.setLineStyle("v", 2);
                    //api.setAxesVisible(false, false);
                    api.setGridVisible(true);
                    api.evalCommand('poly = Polygon(A, B, (2, -4), (-14,-4))');
                    api.setColor('poly', 200, 200, 200);
                    api.setLineThickness('poly', 0);
                    api.setFilling('poly', 0.5);

                    /*
                                        // Región sombreada
                                        api.evalCommand('poly = Polygon(A, B, (-2, -2), (-15, -2))');
                                        api.setColor('poly', 200, 200, 200);
                                        api.setLineThickness('poly', 0);
                                        api.setFilling('poly', 0.5);
                    
                                        // Aristas (Dashed lines)
                                        api.evalCommand('e1 = Segment((-15, 12), A)');
                                        api.evalCommand('e2 = Segment((-1.5, 10), B)'); // Ajuste aprox de (-2.5,11) para que intercepte B(-5,3). m = -2
                                        // Para e2, T2(-9,5) y T3(-3,7). Punto medio (-6, 6). Pendiente m = 6/-2 = -3. m_arista = 1/3? No, m_T2T3 = 2/6 = 1/3. m_arista = -3.
                                        // Ecuación arista T2-T3: y - 6 = -3(x + 6) => y = -3x - 12. Pasa por B(-5,3): 3 = -3(-5) - 12 => 3 = 15 - 12 = 3. Correcto.
                                        // Si x=-1.5, y=-3(-1.5)-12 = 4.5-12 = -7.5. Wait, ray from B goes UP and LEFT? 
                                        // No, A = (-10.5,3) B = (-5,3). 
                                        // T1=(-13,3), T2=(-9,5). m_T1T2 = 2/4=0.5. m_arista = -2. Midpoint = (-11, 4). y - 4 = -2(x + 11) => y = -2x - 18. A(-10.5, 3): 3 = 21-18=3. Correcto.
                                        // Ray from A upwards: x decreases. if x=-14, y=10.
                                        api.evalCommand('e1_v = Segment((-14.5, 11), A)');
                    
                                        // Ray from B upwards: y = -3x - 12. If x=-6, y=6. If x=-7, y=9.
                                        api.evalCommand('e2_v = Segment((-7.5, 10.5), B)');
                    
                                        // T1-T4 edge: T4=(-9,1). T1=(-13,3). m = -2/4 = -0.5. m_arista = 2. Midpoint: (-11, 2). y - 2 = 2(x + 11) => y = 2x + 24. 
                                        // Pasa por A(-10.5, 3): 3 = 2(-10.5)+24 = -21+24=3.
                                        // Ray from A downwards: x decreases. If x=-13, y=-2.
                                        api.evalCommand('e4 = Segment(A, (-13, -2))');
                    
                                        // T3-T4 edge: T3=(-3,7). T4=(-9,1). m = 6/6 = 1. m_arista = -1. Midpoint: (-6, 4). y - 4 = -1(x + 6) => y = -x - 2.
                                        // Pasa por B(-5, 3): 3 = 5 - 2 = 3.
                                        // Ray from B downwards: x increases. If x=0, y=-2.
                                        api.evalCommand('e5 = Segment(B, (0, -2))');
                    
                                        api.evalCommand('e3 = Segment(A, B)');
                    
                                        const edges = ['e1_v', 'e2_v', 'e3', 'e4', 'e5'];
                                        edges.forEach(e => {
                                            api.setLineStyle(e, 1);
                                            api.setLineThickness(e, 3);
                                            api.setColor(e, 0, 0, 0);
                                            api.setLabelVisible(e, false);
                                        });
                    
                                        api.setLabelVisible('poly', false);
                                        api.setPointStyle('A', 0);
                                        api.setPointSize('A', 4);
                                        api.setColor('A', 0, 0, 0);
                    
                                        api.setPointStyle('B', 0);
                                        api.setPointSize('B', 4);
                                        api.setColor('B', 0, 0, 0);
                                        */

                    // Estilizar torres
                    ['T_1', 'T_2', 'T_3'].forEach(t => {
                        api.setPointStyle(t, 1); // Cruz (parecido a cuadro) o 0
                        api.setPointSize(t, 4);
                        api.setColor(t, 0, 0, 0);
                        //api.setLabelStyle(t, 1); // 1 = text
                    });
                }
            };
            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };

    return { html, respuesta, postRender };
}
