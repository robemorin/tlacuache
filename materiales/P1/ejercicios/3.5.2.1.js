import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "5. Geometría del círculo",
    seccion: "2. Área de sectores circulares",
    titulo: "Área, ángulo y perímetro de un sector",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;
    // Dimensiones fijas para sincronía HTML/JS


    // --- DATOS DEL PROBLEMA ---
    const radio = 5.4;
    const area = 21.6;
    
    // Calculamos el ángulo (theta) necesario para dibujar la figura correctamente
    // Fórmula: Area = (r^2 * theta) / 2  =>  theta = 2*Area / r^2
    const theta = (2 * area) / (radio * radio); 

    const html = `
        <div class="problema-ggb">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> $O$ es el centro del círculo que tiene un radio de $${radio}$ cm. El área del sector sombreado $OAB$ es $${area}$ cm$^2$.</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" ></div>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle el tamaño del ángulo $A\\hat{O}B$ en radianes.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la longitud del arco menor $AB$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el perímetro del sector $OAB$.</span>
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
                "appName": "geometry", 
                "width": 200,
                "height": 200,
                "showToolBar": false,
                "showAlgebraInput": false,
                "showMenuBar": false,
                "showResetIcon": true,
                "borderColor": "#E0E0E0",
                "preventFocus": true,
                
                appletOnLoad(api) {
                    // 1. Configuración de la vista
                    api.setCoordSystem(-6, 6, -6, 6);
                    api.setAxesVisible(false, false);
                    api.setGridVisible(false);

                    // 2. Construcción Geométrica
                    api.evalCommand(`O = (0, 0)`);
                    api.evalCommand(`r = ${radio}`);
                    api.evalCommand(`angulo = ${theta}`); // Ángulo calculado
                    
                    // Puntos
                    api.evalCommand(`A = (r, 0)`);
                    api.evalCommand(`B = Rotate(A, angulo, O)`);

                    // 3. Dibujar Círculo (borde tenue)
                    api.evalCommand(`c = Circle(O, r)`);
                    api.setColor("c", 0, 0, 0);
                    api.setLineThickness("c", 3);
 
                    // 4. Dibujar Sector Sombreado
                    api.evalCommand(`Sector = CircularSector(O, A, B)`);  
                    api.setColor("Sector", 150, 150, 150); // Gris
                    api.setFilling("Sector", 25); // Relleno suave
                    api.setLineThickness("Sector", 2); // Borde del sector más grueso
                 
                    // 5. Etiquetas
                    api.setLabelVisible("O", true);
                    api.setLabelVisible("A", true);
                    api.setLabelVisible("B", true);
                    
                    // Estilo de puntos
                    api.setPointStyle("O", 0); api.setPointSize("O", 3); api.setColor("O", 0,0,0);
                    api.setPointStyle("A", 0); api.setPointSize("A", 3); api.setColor("A", 0,0,0);
                    api.setPointStyle("B", 0); api.setPointSize("B", 3); api.setColor("B", 0,0,0);

                    // Etiqueta del radio
                    api.evalCommand(`TextoRadio = Text("${radio} cm", (2.5, -0.5))`);
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };
    
    // --- CÁLCULOS ---
    // b) Longitud de arco L = r * theta
    // L = r * (2A / r^2) = 2A / r = 43.2 / 5.4 = 8
    const longitudArco = 8; 
    
    // c) Perímetro = L + 2r = 8 + 10.8 = 18.8
    const perimetro = 18.8;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Usando la fórmula del área $A = \\frac{1}{2}r^2\\theta$: <br>
            $21.6 = \\frac{1}{2}(${radio})^2\\theta$ <br>
            $43.2 = 29.16\\theta$ <br>
            $\\theta = \\frac{43.2}{29.16} \\approx $ <strong>$1.48$ radianes</strong> (exacto: $\\frac{40}{27}$).</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Longitud de arco $l = r\\theta$: <br>
            $l = 5.4 \\times \\frac{40}{27} = $ <strong>$8$ cm</strong>.</li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Perímetro del sector = $l + 2r$: <br>
            $P = 8 + 2(${radio}) = 8 + 10.8 = $ <strong>$18.8$ cm</strong>.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}