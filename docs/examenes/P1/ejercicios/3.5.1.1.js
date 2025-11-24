import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.5. Geometría del círculo",
    seccion: "3.5.1. Longitud de arco",
    titulo: "Distancia entre ciudades (Paralelo)",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;
    const ancho = 380;
    const alto = 380;

    // --- VARIABLES ---
    const latitud = 40; // Grados Norte
    const circunferencia = 30800; // km
    const longA = 125; // Este
    const longB = 20;  // Oeste
    const anguloDiferencia = longA + longB; // 145
    const distancia = (anguloDiferencia / 360) * circunferencia;

    const html = `
        <div class="problema-ggb">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La circunferencia del círculo menor formado por la línea de latitud $${latitud}^\\circ$ N es aproximadamente $${circunferencia}$ km. $C$ es el centro de este círculo.</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" style="width:${ancho}px; height:${alto}px; margin: 0 auto;"></div>
            
            <p>La ciudad A está ubicada en ($${latitud}^\\circ$ N, $${longA}^\\circ$ E) y la ciudad B está ubicada en ($${latitud}^\\circ$ N, $${longB}^\\circ$ O).</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">En el diagrama anterior, indique las posiciones aproximadas de la ciudad A y la ciudad B, y el tamaño del ángulo $A\\hat{C}B$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule la distancia entre la ciudad A y la ciudad B a lo largo del paralelo.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const postRender = () => {
        if (window.GGBApplet) {
            const parametros = {
                "material_id": "uaxkzmpb",
                "width": ancho,
                "height": alto,
                "showToolBar": false,
                "showAlgebraInput": false,
                "showMenuBar": false,
                "showResetIcon": true,
                "borderColor": "#E0E0E0",
                "preventFocus": true,
                
                appletOnLoad(api) {
                    api.setCoordSystem(-6, 6, -6, 6);
                    api.setAxesVisible(false, false);
                    api.setGridVisible(false);

                    // 1. Esfera
                    api.evalCommand(`Esfera = Circle((0,0), 4)`);
                    api.setColor("Esfera", 0, 0, 0);
                    api.setLabelVisible("Esfera", false); // Ocultar etiqueta

                    // 2. Ecuador
                    api.evalCommand(`Ecuador = Curve(4*cos(t), 1.2*sin(t), t, 0, 2*pi)`);
                    api.setColor("Ecuador", 100, 100, 100);
                    api.setLineStyle("Ecuador", 2); 
                    api.setLabelVisible("Ecuador", false); // Ocultar etiqueta

                    // 3. Paralelo 40N
                    const cy = 2.5;
                    const rx = 3.06;
                    const ry = 0.9;
                    
                    api.evalCommand(`ParaleloFrente = Curve(${rx}*cos(t), ${cy} + ${ry}*sin(t), t, 3.4, 6.0)`);
                    api.setColor("ParaleloFrente", 0, 0, 0);
                    api.setLabelVisible("ParaleloFrente", false); // Ocultar etiqueta
                    
                    api.evalCommand(`ParaleloAtras = Curve(${rx}*cos(t), ${cy} + ${ry}*sin(t), t, 0, 3.4)`);
                    api.setColor("ParaleloAtras", 0, 0, 0);
                    api.setLineStyle("ParaleloAtras", 2);
                    api.setLabelVisible("ParaleloAtras", false); // Ocultar etiqueta

                    api.evalCommand(`ParaleloResto = Curve(${rx}*cos(t), ${cy} + ${ry}*sin(t), t, 6.0, 2*pi)`);
                    api.setColor("ParaleloResto", 0, 0, 0);
                    api.setLineStyle("ParaleloResto", 2);
                    api.setLabelVisible("ParaleloResto", false); // Ocultar etiqueta

                    api.evalCommand(`meridiano = Curve(${ry}*cos(t), 4*sin(t), t, pi/2, 3*pi/2)`);
                    api.setColor("meridiano", 0, 0, 0);
                    //api.setLineStyle("meridiano", 2);
                    api.setLabelVisible("meridiano", false); // Ocultar etiqueta

                    // 4. Puntos Clave
                    api.evalCommand(`C = (0.5, ${cy})`);
                    api.setPointStyle("C", 0); api.setPointSize("C", 3); api.setColor("C", 0,0,0);
                    api.setLabelVisible("C", true); // C sí se muestra

                    //const tA = 0.5; 
                    //const tB = 2.8;
                    
                    //api.evalCommand(`A = (${rx}*cos(${tA}), ${cy} + ${ry}*sin(${tA}))`);
                    //api.evalCommand(`B = (${rx}*cos(${tB}), ${cy} + ${ry}*sin(${tB}))`);
                    
                    //api.setPointStyle("A", 0); api.setPointSize("A", 4); api.setColor("A", 0,0,255);
                    //api.setPointStyle("B", 0); api.setPointSize("B", 4); api.setColor("B", 0,0,255);
                    
                    // Etiquetas de A y B visibles y grandes
                    //api.setLabelVisible("A", true);
                    //api.setLabelVisible("B", true);

                    // 5. Radios
                    //api.evalCommand(`RadioA = Segment(C, A)`);
                    //api.evalCommand(`RadioB = Segment(C, B)`);
                    api.setLineStyle("RadioA", 2);
                    api.setLineStyle("RadioB", 2);
                    api.setColor("RadioA", 100, 100, 100);
                    api.setColor("RadioB", 100, 100, 100);
                    api.setLabelVisible("RadioA", false); // Ocultar etiqueta
                    api.setLabelVisible("RadioB", false); // Ocultar etiqueta
                    
                    // 6. Textos informativos
                    api.evalCommand(`Text("40° N", (3.2, 2.7))`);
                    api.evalCommand(`Text("Ecuador", (-3.5, 0))`);
                    api.evalCommand(`Text("0°", (0, 4.2))`);
                    
                    // Eje polar limpio
                    api.evalCommand(`Eje = Segment((0, -4), (0, 4))`);
                    api.setLineStyle("Eje", 1);
                    api.setColor("Eje", 180, 180, 180);
                    api.setLabelVisible("Eje", false); // Ocultar etiqueta
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };
    
    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Verificación del diagrama:<br>
            - Ángulo $A\\hat{C}B = 125^\\circ + 20^\\circ = $ <strong>$${anguloDiferencia}^\\circ$</strong>.</li>
            <li style="margin-top:10px;"><strong>b)</strong> Distancia: <br>
            $D = \\frac{${anguloDiferencia}}{360} \\times ${circunferencia} = $ <strong>$${distancia.toFixed(0)}$ km</strong> (aprox).</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}