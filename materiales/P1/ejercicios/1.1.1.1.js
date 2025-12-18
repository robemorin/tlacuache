import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export const metadata = {
    tema: "Álgebra",          // Nivel 1
    subtema: "Fundamentos",   // Nivel 2
    seccion: "Números Reales",// Nivel 3 (NUEVO)
    titulo: "Suma simple",    // Título del ejercicio
    tipo: 1,
    puntos: 5
};

// 2. FUNCIÓN GENERADORA: Se ejecuta en el navegador al pulsar "Generar".
// Recibe 'i' que es el número de pregunta actual (1, 2, 3...).
export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Sea $f(x) = 2x + 3$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule $f(5)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la función inversa $f^{-1}(x)$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Resuelva $f(x) = 10$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
        </div>
    `;

    return {
        html: html,
        respuesta: "a) 13, b) (x-3)/2, c) 3.5"
    };
}