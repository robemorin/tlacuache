import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.5. Sistemas de ecuaciones",
    seccion: "1.5.1. Resolución de sistemas lineales",
    titulo: "Planteamiento de ecuaciones lineales",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS (Para que varíe si generas varios) ---
    // Precios base (enteros para facilitar el ejemplo)
    const precioTaco = Math.floor(Math.random() * 10) + 15; // Entre 15 y 19
    const precioRefresco = Math.floor(Math.random() * 10) + 25; // Entre 10 y 14
    
    // Cantidades
    const nTacos = 3;
    const nRefrescos = 4;
    
    // Calculamos el total que se mostrará en el problema
    const total = (nTacos * precioTaco) + (nRefrescos * precioRefresco);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> En la Taquería "El Pastor", los tacos cuestan $T$ cada uno y los refrescos cuestan $R$ cada uno. 
            Se sabe que ${nTacos} tacos y ${nRefrescos} refrescos cuestan un total de ${total}.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una ecuación que muestre esta información.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Si un taco cuesta ${precioTaco}, ¿cuál es el costo, <strong>en centavos</strong>, de un refresco?</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS PARA SOLUCIONARIO ---
    const costoTotalTacos = nTacos * precioTaco;
    const costoTotalRefrescos = total - costoTotalTacos;
    const costoRefrescoCalc = costoTotalRefrescos / nRefrescos; // Debería dar precioRefresco
    const costoCentavos = costoRefrescoCalc * 100;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Planteamiento directo de la ecuación lineal: <br>
                <strong>$${nTacos}T + ${nRefrescos}R = ${total}$</strong>
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Sustitución y despeje: <br>
                Sabemos que $T = ${precioTaco}$. Sustituimos en la ecuación: <br>
                $${nTacos}(${precioTaco}) + ${nRefrescos}R = ${total}$ <br>
                $${costoTotalTacos} + ${nRefrescos}R = ${total}$ <br>
                $${nRefrescos}R = ${total} - ${costoTotalTacos}$ <br>
                $${nRefrescos}R = ${costoTotalRefrescos}$ <br>
                $R = \\frac{${costoTotalRefrescos}}{${nRefrescos}} = $ <strong>$${costoRefrescoCalc}$</strong> (pesos). <br><br>
                
                Convertir a centavos (multiplicar por 100): <br>
                Respuesta = <strong>$${costoCentavos}$ centavos</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}