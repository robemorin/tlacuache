import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1. Modelos",
    seccion: "2.1.5. Composición de funciones",
    titulo: "Rendimiento y Seguridad de un Motor Industrial",
    puntos: 9,
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> El rendimiento de un motor industrial se puede modelar con las siguientes funciones:</p>
            <ol type="1">
                <li>La temperatura de operación $T$ del motor (en grados Celsius) es una función de su velocidad de rotación $\\omega$ (en revoluciones por minuto, RPM). La relación es lineal:
                    $$T(\\omega) = 0.05\\omega + 25$$
                </li>
                <li>Para garantizar la seguridad y evitar el sobrecalentamiento, el tiempo máximo de funcionamiento continuo $t$ (en horas) depende de la temperatura del motor. Esta relación es exponencial:
                    $$t(T) = 5000e^{-0.05T}$$
                </li>
            </ol>
            <br>
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Determine $T^{-1}(\\omega)$, Escribe qué representa esta función en este contexto.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Determine $(t \\circ T)(\\omega)$. Escribe qué representa en este contexto.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <p>Usando las funciones que has encontrado:</p>
                        <ol>
                            <li>
                                <span class="ib-texto">Calcule la temperatura del motor si está funcionando a 1500 RPM.</span>
                                <span class="ib-mark">[2]</span>
                            </li>
                            <li>
                                <span class="ib-texto">Calcule el tiempo máximo de funcionamiento seguro si el motor se ajusta a una velocidad de 1500 RPM.</span>
                                <span class="ib-mark">[3]</span>
                                </li>
                        </ol>
                    </span>
                    
                </li>
            </ol>
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>a) Función inversa $T^{-1}(\\omega)$:</strong></p>
        <p>Partimos de $T = 0.05\\omega + 25$. Para encontrar la inversa $T^{-1}(T_{valor})$, despejamos $\\omega$ en términos de $T_{valor}$:</p>
        <p>$T_{valor} - 25 = 0.05\\omega$</p>
        <p>$\\omega = \\frac{T_{valor} - 25}{0.05}$</p>
        <p>$T^{-1}(T_{valor}) = 20T_{valor} - 500$</p>
        <p>Si la notación $T^{-1}(\\omega)$ se refiere a que $\\omega$ es la variable independiente de la función inversa (representando una temperatura), entonces:</p>
        <p>$T^{-1}(\\omega) = 20\\omega - 500$</p>
        <p>Esta función representa la velocidad de rotación del motor (en RPM) necesaria para alcanzar una temperatura de operación específica (representada por $\\omega$ en este caso, aunque tradicionalmente sería $T$).</p>
        <hr>
        <p><strong>b) Función compuesta $(t \\circ T)(\\omega)$:</strong></p>
        <p>Para encontrar la función compuesta $(t \\circ T)(\\omega)$, sustituimos $T(\\omega)$ en la función $t(T)$:</p>
        <p>$t(T(\\omega)) = 5000e^{-0.05(0.05\\omega + 25)}$</p>
        <p>$t(\\omega) = 5000e^{(-0.0025\\omega - 1.25)}$</p>
        <p>Esta función compuesta representa directamente el tiempo máximo de funcionamiento seguro del motor (en horas) en función de su velocidad de rotación $\\omega$ (en RPM). Permite determinar la seguridad operativa basándose únicamente en la velocidad, sin necesidad de calcular primero la temperatura intermedia.</p>
        <hr>
        <p><strong>c) Aplicación:</strong></p>
        <p>i. Temperatura del motor a 1500 RPM:</p>
        <p>$T(1500) = 0.05(1500) + 25 = 75 + 25 = 100$</p>
        <p>La temperatura del motor a 1500 RPM es de $\\mathbf{100^{\\circ}C}$.</p>
        <p>ii. Tiempo máximo de funcionamiento seguro a 1500 RPM:</p>
        <p>Usamos la función compuesta $t(\\omega)$ o, alternativamente, usamos $T(1500)$ y luego $t(T)$:</p>
        <p>Usando $t(\\omega)$:</p>
        <p>$t(1500) = 5000e^{(-0.0025(1500) - 1.25)} = 5000e^{(-3.75 - 1.25)} = 5000e^{-5}$</p>
        <p>$t(1500) \\approx 5000(0.0067379) \\approx \\mathbf{33.69}$ horas.</p>
        <p>El tiempo máximo de funcionamiento seguro a 1500 RPM es aproximadamente $\\mathbf{33.69}$ horas.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
