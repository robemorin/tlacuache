import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Trigonometría",
    seccion: "3.2.2. Regla del seno",
    titulo: "Triángulo isósceles y resolución",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;
    const ancho = 400;
    const alto = 250;

    // --- VARIABLES ---
    const base = 15;
    const anguloBase = 23; // Grados
    
    // Cálculos Geométricos para el dibujo
    const rad = anguloBase * (Math.PI / 180);
    const altura = (base / 2) * Math.tan(rad); // h = 7.5 * tan(23)
    
    // Coordenadas: C en (0,0), B en (15,0), A en (7.5, h)
    const Ax = base / 2;
    const Ay = altura;

    const html = `
        <div class="problema-ggb">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> En el diagrama, el triángulo $ABC$ es isósceles. $AB = AC$, $CB = ${base}$ cm y el ángulo $A\\hat{C}B$ es $${anguloBase}^\\circ$.</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" style="width:${ancho}px; height:${alto}px; margin: 0 auto;"></div>
            
            <p>Halle:</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">el tamaño del ángulo $C\\hat{A}B$;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">la longitud de $AB$.</span>
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
                    // 1. Configurar Vista
                    // Margen alrededor del triángulo
                    api.setCoordSystem(-2, base + 2, -2, Ay + 4);
                    api.setAxesVisible(false, false);
                    api.setGridVisible(false);

                    // 2. Puntos
                    api.evalCommand(`C = (0, 0)`);
                    api.evalCommand(`B = (${base}, 0)`);
                    api.evalCommand(`A = (${Ax}, ${Ay})`);

                    // 3. Lados
                    api.evalCommand(`b = Segment(A, C)`); // Lado b (AC)
                    api.evalCommand(`c = Segment(A, B)`); // Lado c (AB)
                    api.evalCommand(`a = Segment(C, B)`); // Base a (CB)
                    
                    api.setColor("b", 0, 0, 0);
                    api.setColor("c", 0, 0, 0);
                    api.setColor("a", 0, 0, 0);

                    // 4. Decoraciones (Marcas de igualdad)
                    // 1 marca para lados AC y AB
                    api.setDecoration("b", 1); 
                    api.setDecoration("c", 1); 

                    // 5. Ángulo
                    api.evalCommand(`Ang = Angle(B, C, A)`);
                    api.setColor("Ang", 0, 0, 0);
                    api.setLabelVisible("Ang", false); // Ocultamos la etiqueta automática alpha

                    // 6. Etiquetas Personalizadas
                    api.evalCommand(`Text("${anguloBase}°", (2, 0.5))`); // Angulo texto
                    api.evalCommand(`Text("${base} cm", (${base/2 - 1}, -0.8))`); // Base texto
                    
                    // Etiquetas de vértices
                    api.setLabelVisible("A", true);
                    api.setLabelVisible("B", true);
                    api.setLabelVisible("C", true);
                    api.setLabelStyle("A", 0); // Nombre
                    
                    // Ocultar puntos grandes
                    api.setPointSize("A", 0);
                    api.setPointSize("B", 0);
                    api.setPointSize("C", 0);
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        }
    };
    
    // --- CÁLCULOS RESPUESTA ---
    // a) Angulo A
    const anguloA = 180 - (2 * anguloBase); // 180 - 46 = 134

    // b) Lado AB (Ley de Senos o Coseno básico)
    // Cos(23) = (base/2) / AC  => AC = 7.5 / cos(23)
    const ladoAB = (base / 2) / Math.cos(rad);

    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Como el triángulo es isósceles, $\\hat{B} = \\hat{C} = ${anguloBase}^\\circ$. <br>
            La suma de ángulos internos es $180^\\circ$. <br>
            $C\\hat{A}B = 180 - (23 + 23) = 180 - 46 = $ <strong>$${anguloA}^\\circ$</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> <em>Método 1: Trigonometría básica (Triángulo rectángulo)</em> <br>
            Trazamos la altura desde $A$ al punto medio $M$ de $CB$. $CM = ${base/2}$. <br>
            $\\cos(23^\\circ) = \\frac{\\text{ady}}{\\text{hip}} = \\frac{${base/2}}{AC}$ <br>
            $AC = \\frac{${base/2}}{\\cos(23^\\circ)} \\approx $ <strong>$${ladoAB.toFixed(2)}$ cm</strong>. <br>
            Como $AB = AC$, $AB \\approx ${ladoAB.toPrecision(3)}$ cm. <br><br>
            
            <em>Método 2: Regla del Seno</em> <br>
            $\\frac{AB}{\\sin(23^\\circ)} = \\frac{15}{\\sin(${anguloA}^\\circ)}$ <br>
            $AB = \\frac{15 \\times \\sin(23^\\circ)}{\\sin(${anguloA}^\\circ)} \\approx $ <strong>$${ladoAB.toFixed(2)}$ cm</strong>.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}