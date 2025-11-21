import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "Geometría",
    subtema: "Recursos Online",
    titulo: "Ejemplo con Material ID",
    tipo: 2, // 2 = Interactivo
    puntos: 5
};

export async function generar(i) {
    // Creamos un ID único para el div HTML para evitar conflictos si sale 2 veces la misma pregunta
    const idContenedor = `ggb_applet_${i}`;

    // 1. El HTML (Esqueleto)
    const html = `
        <div class="problema-ggb">
            <p><strong>${i}.</strong> Utiliza el siguiente applet para analizar la figura:</p>
            
            <div id="${idContenedor}" class="ggb-lienzo" style="width:600px; height:400px; margin: 0 auto;"></div>
            
            <p>Basado en lo observado, determina el área de la región sombreada.</p>
        </div>
    `;
    const respuesta = "Es de geogebra"; // Ejemplo de respuesta

    // 2. La Lógica (Se ejecuta DESPUÉS de que el HTML existe en la página)
    const postRender = () => {
        // Verificamos que el script de GeoGebra (deployggb.js) esté cargado
        if (window.GGBApplet) {
            const parametros = {
                "material_id": "uaxkzmpb",  // <--- AQUÍ ESTÁ LA CLAVE
                "width": 600,               // Ancho del lienzo
                "height": 400,              // Alto del lienzo
                "showToolBar": false,       // Ocultar barra de herramientas
                "showAlgebraInput": false,  // Ocultar panel de álgebra
                "showMenuBar": false,       // Ocultar menú
                "showResetIcon": true,      // Botón de reinicio
                "borderColor": "#E0E0E0",   // Color del borde suave
                "preventFocus": true,        // Evita que la página haga scroll al applet al cargar
                appletOnLoad(api) {
                    
                    api.evalCommand('f(x)=sin(x)');
                    api.setColor('f', 0, 0, 255); // Azul
                    api.setLineThickness('f', 3);
                    api.setCoordSystem(-6, 6, -4, 4)
                    api.setAxisSteps(1,0.5);// Eje x de 0.5 en 0.5
                    api.setAxisSteps(2,1);// Eje y de 1 en 1
                    
                }
            };

            // Crear e inyectar
            const applet = new GGBApplet(parametros, true);
            applet.inject(idContenedor);
        } else {
            console.error("Error: La librería de GeoGebra no se ha cargado.");
        }
    };

    return {
        html: html,
        postRender: postRender,
        respuesta: respuesta
    };
}