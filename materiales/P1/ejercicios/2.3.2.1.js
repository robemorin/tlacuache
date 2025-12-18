import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "3. Modelos cuadráticos",
    seccion: "2. Eje de simetría y vértice",
    titulo: "Análisis de una parábola dada su gráfica",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    const idContenedor = `ggb_applet_${i}`;

    const html = `
        <div class="problema-ggb">
            <p><strong>${i}.</strong> El diagrama representa la gráfica de la función $f : x \\mapsto (x - p)(x - q)$.</p>
            <div id="${idContenedor}" class="ggb-lienzo" ></div>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escribe los valores de $p$ y $q$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">La función tiene un valor mínimo en el punto $C$. Halla la coordenada $x$ de $C$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
            
        <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const postRender = () => {
        if (window.GGBApplet) {
            const parametros = {
                "material_id": "uaxkzmpb", // Se necesita un applet que dibuje una parábola dados p y q.
                "width": 300,
                "height": 300,
                "showToolBar": false,
                "showAlgebraInput": false,
                "showMenuBar": false,
                "showResetIcon": true,
                "borderColor": "#E0E0E0",
                "preventFocus": true,
                appletOnLoad(api) {
                    // Aquí se podría configurar el applet para mostrar la gráfica específica
                     api.evalCommand('f(x)=(x+1)(x-3)');
                     api.setCoordSystem(-5, 5, -5, 5); 
                     api.setAxisSteps(1, 1,1);
                    
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        } else {
            console.error("Error: La librería de GeoGebra no se ha cargado.");
        }
    };
    
     // --- CÁLCULOS DE RESPUESTA (Fijos para este ejercicio) ---
    const p = -0.5;
    const q = 2;
    const x_C = (p+q)/2;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Las intersecciones con el eje $x$ son en $-1$ y $3$. <br>
                Por lo tanto, <strong>$p = -1$</strong> y <strong>$q = 3$</strong> (o viceversa).</li>
            <li><strong>b)</strong> La coordenada $x$ del vértice $C$ es el punto medio: <br>
                $x_C = \\frac{-1 + 3}{2} = \\frac{2}{2} = $ <strong>$1$</strong>.</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML,
        postRender: postRender
    };
}