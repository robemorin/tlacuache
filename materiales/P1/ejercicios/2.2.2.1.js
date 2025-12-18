import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.2. Modelos lineales",
    seccion: "2.2.1. Ecuaciones de la recta",
    titulo: "Líneas paralelas y gradiente",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;
    const ancho = 350;
    const alto = 350;

    const html = `
        <div class="problema-ggb">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> En el diagrama, las líneas $L_1$ y $L_2$ son paralelas.</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" style="width:${ancho}px; height:${alto}px; margin: 0 auto;"></div>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">¿Cuál es el gradiente (pendiente) de $L_1$?</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Escriba la ecuación de $L_1$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Escriba la ecuación de $L_2$ en la forma $ax + by + c = 0$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
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
                    // 1. Configuración de la vista (Grid centrado)
                    api.setCoordSystem(-8, 8, -8, 8);
                    api.setAxesVisible(true, true);
                    api.setGridVisible(true);
                    api.setAxisSteps(1, 2); // Pasos de 2 en 2 como en la imagen
                    api.setAxisSteps(2, 2); 

                    // 2. Dibujar L1: Pasa por (0,4) y (2,0) => Pendiente -2 => y = -2x + 4
                    api.evalCommand("f(x) = -2x + 4");
                    api.setColor("f", 0, 0, 0); // Negro
                    api.setLineThickness("f", 3);
                    api.setLabelVisible("f", true);
                    api.setCaption("f", "L_1");
                    api.setLabelStyle("f", 3); // 3 = Caption

                    // 3. Dibujar L2: Paralela (m=-2), pasa por (0,-4) => y = -2x - 4
                    api.evalCommand("g(x) = -2x - 4");
                    api.setColor("g", 0, 0, 0); // Negro
                    api.setLineThickness("g", 3);
                    api.setLabelVisible("g", true);
                    api.setCaption("g", "L_2");
                    api.setLabelStyle("g", 3); 
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };
    
    // --- RESPUESTAS ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Identificamos dos puntos en $L_1$: $(0, 4)$ y $(2, 0)$. <br>
                $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{0 - 4}{2 - 0} = \\frac{-4}{2} = $ <strong>$-2$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> La intersección con el eje $y$ es $c = 4$. <br>
                Usando la forma $y = mx + c$, tenemos: <strong>$y = -2x + 4$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Como $L_2$ es paralela, su pendiente es $m = -2$. <br>
                Su intersección con el eje $y$ es $-4$. Ecuación: $y = -2x - 4$. <br>
                Para la forma general, pasamos todo a un lado: <br>
                <strong>$2x + y + 4 = 0$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}