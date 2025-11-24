import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.5. Modelos sinusoidales",
    seccion: "2.5.1. Aplicaciones de funciones seno y coseno",
    titulo: "La Rueda de la Fortuna",
    puntos: 8,
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Un parque de diversiones tiene una rueda de la fortuna con un diámetro de 80 metros. La plataforma para subir a las cabinas se encuentra en el punto más bajo de la rueda, a 2 metros sobre el suelo. La rueda tarda 4 minutos en completar una rotación en sentido contrario a las manecillas del reloj. Una persona sube a una cabina en el punto más bajo e inicia su recorrido en el tiempo $t=0$.</p>
            <br>
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Escribe una función senoidal de la forma $h(t) = A \\sin(f\\cdot t) + k$ que modele la altura $h$ (en metros) de la persona sobre el suelo en función del tiempo $t$ (en minutos).</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcula la altura a la que se encontrará la persona después de 1.5 minutos de haber iniciado el recorrido.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Durante la primera rotación, encuentra el primer instante de tiempo en el que la persona alcanzará una altura de 62 metros sobre el suelo.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>a) Modelo de la función:</strong></p>
        <p>Amplitud $A = \frac{80}{2} = 40$. Se usa $A = -40$ por empezar en el punto más bajo.</p>
        <p>Desplazamiento vertical $D = \text{radio} + \text{altura inicial} = 40 + 2 = 42$ m.</p>
        <p>Parámetro $B = \frac{2\pi}{\text{periodo}} = \frac{2\pi}{4} = \frac{\pi}{2}$.</p>
        <p>Desplazamiento de fase $C = 0$.</p>
        <p>Función: $h(t) = -40 \cos(\frac{\pi}{2}t) + 42$.</p>
        <br>
        <p><strong>b) Altura a los 1.5 minutos:</strong></p>
        <p>$h(1.5) = -40 \cos(\frac{3\pi}{4}) + 42 = 20\sqrt{2} + 42 \approx 70.3$ metros.</p>
        <br>
        <p><strong>c) Tiempo para alcanzar 62 metros:</strong></p>
        <p>$62 = -40 \cos(\frac{\pi}{2}t) + 42 \implies -0.5 = \cos(\frac{\pi}{2}t)$.</p>
        <p>$\frac{\pi}{2}t = \frac{2\pi}{3} \implies t = \frac{4}{3}$ minutos (1 minuto y 20 segundos).</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}