import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Tema 2: Funciones",
    subtema: "Sinusoidales",
    titulo: "Transformaciones de Funciones Sinusoidales",
    tipo: 1, // 1 = Respuesta corta
    puntos: 6
};

export async function generar(i) {
    const html = `
        <div class="problema-sinusoidal">
            <p><strong>${i}.</strong> Se da la función $f(x) = 2\\sin\\left(x - \\frac{\\pi}{4}\\right) + 1$.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escribe la <strong>amplitud</strong> de la función.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Escribe el <strong>desplazamiento vertical</strong> de la función.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Escribe el <strong>desplazamiento horizontal (fase)</strong> de la función.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Calcula el <strong>período</strong> de $f(x)$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Calcula el <strong>valor máximo</strong> de $f(x)$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Halla el valor de $f\\left(\\frac{\\pi}{4}\\right)$, dejando tu respuesta en forma exacta.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> Amplitud = <strong>2</strong></li>
            <br>
            <li><strong>b)</strong> Desplazamiento vertical = <strong>1</strong> (hacia arriba)</li>
            <br>
            <li><strong>c)</strong> Desplazamiento horizontal = $\\frac{\\pi}{4}$ (hacia la derecha)</li>
            <br>
            <li><strong>d)</strong> Período = $\\frac{2\\pi}{1} = $ <strong>$2\\pi$</strong> <br>
                (En forma general, el período de $\\sin(bx)$ es $\\frac{2\\pi}{b}$. Como $b=1$, el período es $2\\pi$)
            </li>
            <br>
            <li><strong>e)</strong> Valor máximo = amplitud + desplazamiento vertical = $2 + 1 = $ <strong>3</strong> <br>
                (Ocurre cuando $\\sin\\left(x - \\frac{\\pi}{4}\\right) = 1$)
            </li>
            <br>
            <li><strong>f)</strong> $f\\left(\\frac{\\pi}{4}\\right) = 2\\sin\\left(\\frac{\\pi}{4} - \\frac{\\pi}{4}\\right) + 1 = 2\\sin(0) + 1 = 2(0) + 1 = $ <strong>1</strong></li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
