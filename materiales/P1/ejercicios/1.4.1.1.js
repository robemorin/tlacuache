import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.4. Aproximación y error",
    seccion: "1.4.1. Error de estimación",
    titulo: "Límites de precisión y Área mínima",
    tipo: 1, // 1 = Abierto
    puntos: 4
};

export async function generar(i) {
    // --- VARIABLES ---
    const largo = 17;
    const ancho = 8;
    
    // Regla de precisión: "al metro más cercano" => unidad = 1 => error = +/- 0.5
    const error = 0.5;

    // Límites para el largo
    const largoMin = largo - error;
    const largoMax = largo + error;

    // Límites para el ancho
    const anchoMin = ancho - error;
    
    // Área mínima = largo mínimo * ancho mínimo
    const areaMinima = largoMin * anchoMin;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Un terreno de forma rectangular se mide al metro más cercano. Su largo es $${largo}$ m y su ancho es $${ancho}$ m.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba el rango de valores posibles para el largo del rectángulo en la forma $a \\le \\text{largo} < b$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el área mínima posible del rectángulo.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Al medir al metro más cercano, el margen de error es $\\pm 0.5$ m. <br>
                Límite inferior: $${largo} - 0.5 = ${largoMin}$. <br>
                Límite superior: $${largo} + 0.5 = ${largoMax}$. <br>
                Rango: <strong>$${largoMin} \\le \\text{largo} < ${largoMax}$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> El área mínima ocurre con las dimensiones más pequeñas posibles. <br>
                Ancho mínimo: $${ancho} - 0.5 = ${anchoMin}$ m. <br>
                Área mínima = $L_{\\min} \\times W_{\\min} = ${largoMin} \\times ${anchoMin}$ <br>
                Área mínima = <strong>$${areaMinima}$ m$^2$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}