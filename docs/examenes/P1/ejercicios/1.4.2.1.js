import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Tema 1: Número y Álgebra",
    subtema: "Errores",
    titulo: "Error Absoluto y Error Relativo Porcentual",
    tipo: 1, // 1 = Respuesta corta
    puntos: 6
};

export async function generar(i) {
    const html = `
        <div class="problema-errores">
            <p><strong>${i}.</strong> Un estudiante mide la longitud de una varilla metálica usando una regla. La medición registrada es $18.5$ cm, pero el valor real de la longitud es $18.73$ cm.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcula el <strong>error absoluto</strong> de la medición.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Calcula el <strong>error relativo</strong> (como decimal).</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Expresa el error anterior como un <strong>porcentaje</strong> con una cifra decimal.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="30"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> Error absoluto = |Valor medido - Valor real| = |18.5 - 18.73| = |-0.23| = <strong>0.23 cm</strong></li>
            <br>
            <li><strong>b)</strong> Error relativo = $\\frac{\\text{Error absoluto}}{\\text{Valor real}} = \\frac{0.23}{18.73} = $ <strong>0.01227... ≈ 0.0123</strong> (como decimal)</li>
            <br>
            <li><strong>c)</strong> Error porcentual = Error relativo × 100% = 0.0123 × 100 = <strong>1.2%</strong></li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
