import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.4. Aproximación y error",
    seccion: "1.4.1. Error de estimación",
    titulo: "Diagonales de una caja y porcentaje de error",
    tipo: 1, // 1 = Abierto
    puntos: 7
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Dimensiones de la caja (en cm), redondeadas al cm más cercano
    const largo = Math.floor(Math.random() * 15) + 20;  // 20-34 cm
    const ancho = Math.floor(Math.random() * 10) + 12;  // 12-21 cm
    const alto = Math.floor(Math.random() * 8) + 8;     // 8-15 cm

    // Error de medición: ±0.5 cm (al cm más cercano)
    const error = 0.5;

    // --- CÁLCULOS CON VALORES MEDIDOS ---
    // Diagonal de una cara (base rectangular): d_cara = √(largo² + ancho²)
    const diagonalCara = Math.sqrt(largo ** 2 + ancho ** 2);

    // Diagonal espacial (entre vértices opuestos): d_espacial = √(largo² + ancho² + alto²)
    const diagonalEspacial = Math.sqrt(largo ** 2 + ancho ** 2 + alto ** 2);

    // --- CÁLCULOS CON VALORES MÁXIMOS (para error máximo) ---
    const largoMax = largo + error;
    const anchoMax = ancho + error;
    const altoMax = alto + error;

    const diagonalCaraMax = Math.sqrt(largoMax ** 2 + anchoMax ** 2);
    const diagonalEspacialMax = Math.sqrt(largoMax ** 2 + anchoMax ** 2 + altoMax ** 2);

    // --- ERRORES ABSOLUTOS Y PORCENTUALES ---
    const errorAbsolutoCara = diagonalCaraMax - diagonalCara;
    const errorPorcentualCara = (errorAbsolutoCara / diagonalCara) * 100;

    const errorAbsolutoEspacial = diagonalEspacialMax - diagonalEspacial;
    const errorPorcentualEspacial = (errorAbsolutoEspacial / diagonalEspacial) * 100;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una caja de forma rectangular tiene dimensiones (redondeado al centímetro más cercano) 
            largo = ${largo} cm, ancho = ${ancho} cm y alto = ${alto} cm.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule la longitud de la diagonal de la base de la caja (largo $\\times$ ancho).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle la longitud de la diagonal de la caja (entre vértices opuestos).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine el porcentaje de error máximo en la diagonal espacial, considerando que las medidas están redondeadas al centímetro más cercano.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Diagonal de la cara base (largo × ancho): <br>
                Usando el teorema de Pitágoras: <br>
                $d_{\\text{cara}} = \\sqrt{${largo}^2 + ${ancho}^2}$ <br>
                $d_{\\text{cara}} = $ <strong>${diagonalCara.toFixed(2)} cm</strong>.
            </li>
            <br>
            <li><strong>b)</strong> Diagonal espacial (entre vértices opuestos): <br>
                Usando la fórmula de la diagonal espacial: <br>
                $d_{\\text{espacial}} = \\sqrt{${largo}^2 + ${ancho}^2 + ${alto}^2}$ <br>
                $d_{\\text{espacial}} = $ <strong>${diagonalEspacial.toFixed(2)} cm</strong>.
            </li>
            <br>
            <li><strong>c)</strong> Porcentaje de error máximo: <br>
                Al medir al cm más cercano, el error es $\\pm 0.5$ cm en cada dimensión. <br>
                Valores máximos: $L_{\\max} = ${largoMax}$ cm, $W_{\\max} = ${anchoMax}$ cm, $H_{\\max} = ${altoMax}$ cm. <br>
                Diagonal espacial máxima: <br>
                $d_{\\max} = \\sqrt{${largoMax}^2 + ${anchoMax}^2 + ${altoMax}^2} = ${diagonalEspacialMax.toFixed(2)}$ cm. <br>
                Error absoluto: $\\Delta d = ${diagonalEspacialMax.toFixed(2)} - ${diagonalEspacial.toFixed(2)} = ${errorAbsolutoEspacial.toFixed(2)}$ cm. <br>
                Porcentaje de error: <br>
                $\\text{Error \\%} = \\frac{${errorAbsolutoEspacial.toFixed(2)}}{${diagonalEspacial.toFixed(2)}} \\times 100 = $ <strong>${errorPorcentualEspacial.toFixed(2)}%</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
