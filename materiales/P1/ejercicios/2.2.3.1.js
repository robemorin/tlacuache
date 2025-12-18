import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.2. Modelos lineales",
    seccion: "2.2.3. Desigualdades lineales", // Nueva sección
    titulo: "Región definida por desigualdades",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;
    const ancho = 350;
    const alto = 300;

    const html = `
        <div class="problema-ggb">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Escriba las tres desigualdades que representan únicamente la región sombreada que se muestra en el diagrama.</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" style="width:${ancho}px; height:${alto}px; margin: 0 auto;"></div>
            
            <tlacuache-renglon n="10" color="gray" alto="25"></tlacuache-renglon>
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
                    // 1. Configurar Vista
                    api.setCoordSystem(-1, 9, -1, 6); // Ver un poco más allá de (8,0) y (0,4)
                    api.setAxesVisible(true, true);
                    api.setGridVisible(true);
                    api.setAxisSteps(1, 1,1);

                    // 2. Definir las desigualdades base (Ocultas)
                    // Vertical: x >= 0
                    api.evalCommand("a: x >= 0");
                    api.setVisible("a", false);

                    // Horizontal: y >= 1
                    api.evalCommand("b: y >= 1");
                    api.setVisible("b", false);

                    // Diagonal: Pasa por (0,4) y (8,0) -> y <= -0.5x + 4
                    api.evalCommand("c: y <= -0.5x + 4");
                    api.setVisible("c", false);

                    // 3. Crear la región de intersección (Visible)
                    api.evalCommand("Region = a && b && c");
                    api.setColor("Region", 100, 100, 100); // Gris oscuro para parecerse al impreso
                    api.setFilling("Region", 25); // Opacidad
                    api.setLineThickness("Region", 3); // Bordes marcados

                    // 4. Dibujar las líneas de frontera para claridad visual (Negras sólidas)
                    api.evalCommand("L1: x = 0");
                    api.evalCommand("L2: y = 1");
                    api.evalCommand("L3: y = -0.5x + 4");
                    api.setColor("L1", 0, 0, 0);
                    api.setColor("L2", 0, 0, 0);
                    api.setColor("L3", 0, 0, 0);
                    
                    // Evitar etiquetas molestas
                    api.setLabelVisible("L1", false);
                    api.setLabelVisible("L2", false);
                    api.setLabelVisible("L3", false);
                    api.evalCommand("Region = a && b && c");
                    
                    // Estilo
                    api.setColor("Region", 100, 100, 100); 
                    api.setFilling("Region", 25); 
                    api.setLineThickness("Region", 3); 

                    // --- AQUÍ ESTÁ EL TRUCO: OCULTAR LA ETIQUETA ---
                    api.setLabelVisible("Region", false); 
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };
    
    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>1. Límite vertical (eje $y$):</strong> <br>
                La región está a la derecha del eje $y$ ($x=0$). <br>
                Desigualdad: <strong>$x \\ge 0$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>2. Límite horizontal:</strong> <br>
                La línea horizontal corta al eje $y$ en $1$. La región está por encima. <br>
                Desigualdad: <strong>$y \\ge 1$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>3. Límite diagonal:</strong> <br>
                La línea pasa por $(0, 4)$ y $(8, 0)$. <br>
                Pendiente $m = \\frac{0-4}{8-0} = -\\frac{4}{8} = -0.5$. <br>
                Intersección $c = 4$. Ecuación: $y = -0.5x + 4$. <br>
                Como la región está por debajo de la línea (probamos el punto $(1,2)$ que cumple $2 \\le 3.5$), la desigualdad es: <br>
                <strong>$y \\le -0.5x + 4$</strong> (o $x + 2y \\le 8$).
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}