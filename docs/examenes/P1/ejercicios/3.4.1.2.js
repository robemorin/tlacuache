import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.2. Diagramas de Voronoi",
    seccion: "Sección 1",
    titulo: "Análisis y cálculo de diagramas de Voronoi",
    tipo: 2, // 2 = Interactivo (con GeoGebra)
    puntos: 9 // Asignado: [2] para a, [2] para b, [5] para c
};

export async function generar(i) {
    // --- PRESETS GEOMÉTRICOS ---
    const presets = [
        {
            id: 1,
            A: { x: 3, y: 3 },
            B: { x: 10, y: 5 },
            C: { x: 7, y: 2 },
            D: { x: 5, y: 9 },
            E: { x: 1, y: 5 },
            F: { x: 6, y: 5 },
            eqDE_latex: "y = -x + 10",
            midDE: { x: 3, y: 7 },
            slopeDE: 1,
            X: { x: 8, y: 4 },
            n: 5,
            Y: { x: 8, y: 7.625, b_frac: "61/8" }
        },
        {
            id: 2,
            A: { x: 2, y: 2 },
            B: { x: 9, y: 3 },
            C: { x: 6, y: 1 },
            D: { x: 4, y: 8 },
            E: { x: 0, y: 4 },
            F: { x: 5, y: 4 },
            eqDE_latex: "y = -x + 8",
            midDE: { x: 2, y: 6 },
            slopeDE: 1,
            X: { x: 7, y: 3 },
            n: 5,
            Y: { x: 7, y: 6.625, b_frac: "53/8" }
        },
        {
            id: 3,
            A: { x: 4, y: 2 },
            B: { x: 11, y: 4 },
            C: { x: 8, y: 1 },
            D: { x: 6, y: 8 },
            E: { x: 2, y: 4 },
            F: { x: 7, y: 4 },
            eqDE_latex: "y = -x + 10",
            midDE: { x: 4, y: 6 },
            slopeDE: 1,
            X: { x: 9, y: 3 },
            n: 5,
            Y: { x: 9, y: 6.625, b_frac: "53/8" }
        }
    ];

    const pr = presets[Math.floor(Math.random() * presets.length)];
    const idContenedor = `ggb_applet_${i}`;

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Considere el diagrama de Voronoi que se muestra a continuación, el cual contiene los sitios $A(${pr.A.x}, ${pr.A.y})$, $B(${pr.B.x}, ${pr.B.y})$, $C(${pr.C.x}, ${pr.C.y})$, $D(${pr.D.x}, ${pr.D.y})$, $E(${pr.E.x}, ${pr.E.y})$ y $F(${pr.F.x}, ${pr.F.y})$. El diagrama también muestra las celdas y los contornos correspondientes.</p>
            
            <div style="text-align: center; margin: 20px 0;">
                <div id="${idContenedor}" class="ggb-lienzo" style="width:600px; height:450px; margin: 0 auto; border: 1px solid #ccc; border-radius: 4px;"></div>
            </div>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle la ecuación del contorno que está entre los sitios $D$ y $E$.</span>
                    <span class="ib-mark">[2]</span>
                </li>

                <li>
                    <span class="ib-texto">El vértice $X$ está equidistante de los sitios $B$, $C$ y $F$.</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman; padding-left: 20px;">
                        <li><span class="ib-texto">Escriba las coordenadas de $X$.</span></li>
                        <li><span class="ib-texto">El valor exacto de $BX$ es $\\sqrt{n}$. Escriba el valor de $n$.</span></li>
                    </ol>
                    <span class="ib-mark">[2]</span>
                </li>

                <li>
                    <span class="ib-texto">El vértice $Y(a, b)$ está equidistante de los sitios $B$, $D$ y $F$.</span>
                    <ol class="ib-lista-sub" style="list-style-type: lower-roman; padding-left: 20px;">
                        <li><span class="ib-texto">Escriba el valor de $a$.</span></li>
                        <li><span class="ib-texto">Halle el valor exacto de $b$.</span></li>
                    </ol>
                    <span class="ib-mark">[5]</span>
                </li>
            </ol>
        </div>
        <div class="newpage"><p><strong>(... continuación de ${i})</strong></p><tlacuache-renglon n="20" color="gray" alto="35"></tlacuache-renglon></div>
    `;

    // --- RESPUESTA FORMATEADA ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>a)</strong> Ecuación del contorno entre $D(${pr.D.x}, ${pr.D.y})$ y $E(${pr.E.x}, ${pr.E.y})$: <br>
                El contorno es la mediatriz del segmento $DE$. <br>
                Punto medio de $DE = \\left(\\frac{${pr.D.x} + ${pr.E.x}}{2}, \\frac{${pr.D.y} + ${pr.E.y}}{2}\\right) = (${pr.midDE.x}, ${pr.midDE.y})$. <br>
                Pendiente de $DE = m_{DE} = \\frac{${pr.E.y} - ${pr.D.y}}{${pr.E.x} - ${pr.D.x}} = \\frac{${pr.E.y - pr.D.y}}{${pr.E.x - pr.D.x}} = ${pr.slopeDE}$. <br>
                Pendiente perpendicular $m_{\\perp} = -\\frac{1}{m_{DE}} = -1$. <br>
                Ecuación de la mediatriz: <br>
                $y - ${pr.midDE.y} = -1(x - ${pr.midDE.x}) \\Rightarrow $ <strong>$${pr.eqDE_latex}$</strong> (o $x + y = ${pr.midDE.x + pr.midDE.y}$).
            </li>
            <br>
            <li><strong>b)</strong> Vértice $X$ equidistante de $B(${pr.B.x}, ${pr.B.y})$, $C(${pr.C.x}, ${pr.C.y})$ y $F(${pr.F.x}, ${pr.F.y})$:
                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                    <li>Dado que $B(${pr.B.x}, ${pr.B.y})$ y $F(${pr.F.x}, ${pr.F.y})$ comparten la misma coordenada $y = ${pr.F.y}$, la mediatriz de $BF$ es la línea vertical: <br>
                        $x = \\frac{${pr.B.x} + ${pr.F.x}}{2} = ${pr.X.x}$. <br>
                        Por tanto, la coordenada $x$ del circuncentro $X$ es $${pr.X.x}$. <br>
                        Para hallar la coordenada $y$, igualamos las distancias de $X(${pr.X.x}, y)$ a $F(${pr.F.x}, ${pr.F.y})$ y a $C(${pr.C.x}, ${pr.C.y})$: <br>
                        $XF^2 = XC^2 \\Rightarrow (${pr.X.x} - ${pr.F.x})^2 + (y - ${pr.F.y})^2 = (${pr.X.x} - ${pr.C.x})^2 + (y - ${pr.C.y})^2$ <br>
                        Resolviendo para $y$: $y = ${pr.X.y}$. <br>
                        Las coordenadas de $X$ son <strong>$(${pr.X.x}, ${pr.X.y})$</strong>.
                    </li>
                    <li style="margin-top: 5px;">Calcular $BX^2$: <br>
                        $BX^2 = (${pr.X.x} - ${pr.B.x})^2 + (${pr.X.y} - ${pr.B.y})^2 = ${pr.n}$. <br>
                        Como $BX = \\sqrt{${pr.n}}$, entonces $n = $ <strong>$${pr.n}$</strong>.
                    </li>
                </ol>
            </li>
            <br>
            <li><strong>c)</strong> Vértice $Y(a, b)$ equidistante de $B(${pr.B.x}, ${pr.B.y})$, $D(${pr.D.x}, ${pr.D.y})$ y $F(${pr.F.x}, ${pr.F.y})$:
                <ol style="list-style-type: lower-roman; padding-left: 20px; margin-top: 5px;">
                    <li>Igual que antes, al ser $B$ y $F$ horizontales con $y = ${pr.F.y}$, la mediatriz de $BF$ es vertical $x = ${pr.Y.x}$. <br>
                        Por lo tanto, la coordenada $x$ del circuncentro $Y$ es $a = $ <strong>$${pr.Y.x}$</strong>.
                    </li>
                    <li style="margin-top: 5px;">Igualamos las distancias de $Y(${pr.Y.x}, b)$ a $F(${pr.F.x}, ${pr.F.y})$ y a $D(${pr.D.x}, ${pr.D.y})$: <br>
                        $YF^2 = YD^2 \\Rightarrow (${pr.Y.x} - ${pr.F.x})^2 + (b - ${pr.F.y})^2 = (${pr.Y.x} - ${pr.D.x})^2 + (b - ${pr.D.y})^2$ <br>
                        Resolviendo algebraicamente: <br>
                        $b = $ <strong>$\\frac{${(Math.pow(pr.Y.x - pr.D.x, 2) + pr.D.y * pr.D.y) - (Math.pow(pr.Y.x - pr.F.x, 2) + pr.F.y * pr.F.y)}}{${2 * (pr.D.y - pr.F.y)}}$</strong> (o <strong>$$${pr.Y.y}$$</strong>).
                    </li>
                </ol>
            </li>
        </ul>
    `;

    // --- LÓGICA DE GEOGEBRA (POST-RENDER) ---
    const postRender = () => {
        if (window.GGBApplet) {
            const material_id = "uaxkzmpb";
            const parametros = {
                "width": 600,
                "height": 450,
                material_id,
                "showToolBar": false,
                "showAlgebraInput": false,
                "showMenuBar": false,
                "showResetIcon": true,
                "borderColor": "#E0E0E0",
                "preventFocus": true,
                "enableShiftDragZoom": false,
                appletOnLoad(api) {
                    api.setCoordSystem(-1, 13, -1, 11);
                    api.setAxisSteps(1, 1, 1);
                    api.setGridVisible(true);
                    api.setAxesVisible(true, true);

                    // Sitios
                    api.evalCommand(`A = (${pr.A.x}, ${pr.A.y})`);
                    api.evalCommand(`B = (${pr.B.x}, ${pr.B.y})`);
                    api.evalCommand(`C = (${pr.C.x}, ${pr.C.y})`);
                    api.evalCommand(`D = (${pr.D.x}, ${pr.D.y})`);
                    api.evalCommand(`E = (${pr.E.x}, ${pr.E.y})`);
                    api.evalCommand(`F = (${pr.F.x}, ${pr.F.y})`);

                    const puntos = ['A', 'B', 'C', 'D', 'E', 'F'];
                    puntos.forEach(p => {
                        api.setLabelVisible(p, true);
                        api.setLabelStyle(p, 0); // Nombre únicamente
                        api.setFixed(p, true); // No movible
                        api.setColor(p, 0, 0, 0); // Negro
                    });

                    // Generar el diagrama de Voronoi
                    api.evalCommand('diagrama = Voronoi({A, B, C, D, E, F})');
                    api.setColor('diagrama', 0, 0, 255); // Azul
                    api.setLineThickness('diagrama', 3);
                }
            };

            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        } else {
            console.error("Error: La librería de GeoGebra no está cargada.");
        }
    };

    return { html, postRender, respuesta: respuestaHTML };
}
