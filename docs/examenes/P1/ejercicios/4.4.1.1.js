import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4. Probabilidad",
    seccion: "1. Espacio muestral y sucesos",
    titulo: "Probabilidad con dos dados (Rojo y Verde)",
    tipo: 1, // 1 = Abierto
    puntos: 5 // Asignado: [2] para inciso a, [3] para inciso b
};

export async function generar(i) {
    // No necesitamos ID de contenedor GeoGebra aquí.

    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Se lanzan dos dados de seis caras no trucados; uno es rojo y el otro es verde. Se muestran dos números entre 1 y 6 inclusive. Halle la probabilidad de que:</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">el número en el dado rojo sea par;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">el número en el dado verde sea mayor que el número en el dado rojo.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="20" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS DE RESPUESTA ---
    // Total de casos posibles = 6 * 6 = 36
    
    // Inciso a: Dado rojo par {2, 4, 6}
    // Casos favorables = 3 (rojo) * 6 (verde) = 18
    // Probabilidad = 18/36 = 1/2
    
    // Inciso b: Verde > Rojo
    // Si Rojo=1, Verde={2,3,4,5,6} (5)
    // Si Rojo=2, Verde={3,4,5,6} (4)
    // Si Rojo=3, Verde={4,5,6} (3)
    // Si Rojo=4, Verde={5,6} (2)
    // Si Rojo=5, Verde={6} (1)
    // Si Rojo=6, Verde={} (0)
    // Total favorables = 15
    // Probabilidad = 15/36 = 5/12

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> El espacio muestral total es $6 \\times 6 = 36$. <br>
            Los números pares en el dado rojo son $\\{2, 4, 6\\}$. <br>
            Probabilidad = $\\frac{3}{6} = $ <strong>$\\frac{1}{2}$</strong>.</li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Buscamos los casos donde $V > R$:<br>
            $R=1 \\Rightarrow V \\in \\{2,3,4,5,6\\}$ (5 casos)<br>
            $R=2 \\Rightarrow V \\in \\{3,4,5,6\\}$ (4 casos)<br>
            $R=3 \\Rightarrow V \\in \\{4,5,6\\}$ (3 casos)<br>
            $R=4 \\Rightarrow V \\in \\{5,6\\}$ (2 casos)<br>
            $R=5 \\Rightarrow V \\in \\{6\\}$ (1 caso)<br>
            Total de casos favorables = $5+4+3+2+1 = 15$.<br>
            Probabilidad = $\\frac{15}{36} = $ <strong>$\\frac{5}{12}$</strong> (o 0.417).</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
        // Nota: No devolvemos 'postRender' porque no hay scripts que ejecutar
    };
}