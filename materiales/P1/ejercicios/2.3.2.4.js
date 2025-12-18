import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.3. Modelos cuadráticos",
    seccion: "2.3.2. Eje de simetría y vértice",
    titulo: "Análisis Gráfico de una Parábola",
    puntos: 9,
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Se muestra la gráfica de una función cuadrática de la forma $y = ax^2 + bx + c$.</p>

            <div style="text-align:center; padding: 20px;">
                <tlacuache-ejes size="300,450" xlim="-3,5" ylim="-9,7" dx="1" dy="1" xlabel="x" ylabel="y">
                  <tlacuache-plot f="2*x**2 - 4*x - 6" color="blue" lineWidth="2"></tlacuache-plot>
                  <!--tlacuache-plot x="-1,3,0" y="0,0,-6" mark="." size="1.5" color="red"></tlacuache-plot-->
                </tlacuache-ejes>
            </div>

            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Utilizando la información de la gráfica, determina el valor de $c$.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">Sabiendo que la forma factorizada de la ecuación es $y = a(x - x_1)(x - x_2)$, donde $x_1$ y $x_2$ son las raíces, utiliza los puntos dados para calcular los valores de $a$ y $b$.</span>
                    <span class="ib-mark">[4]</span>
                </li>
                <li>
                    <span class="ib-texto">Se introduce la recta $y = 2x - 6$ en el mismo sistema de ejes.
                        <ol type="i">
                            <li>Dibuja la parábola y la recta en un nuevo gráfico.</li>
                            <li>Calcula algebraicamente los puntos de intersección entre la parábola y la recta.</li>
                        </ol>
                    </span>
                    <span class="ib-mark">[4]</span>
                </li>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>a) Determinar el valor de $c$:</strong></p>
        <p>El valor de $c$ en una ecuación cuadrática $y = ax^2 + bx + c$ representa la intersección con el eje $y$ (cuando $x=0$). Según la gráfica y el enunciado, la parábola corta el eje $y$ en el punto $(0, -6)$. Por lo tanto, $c = -6$.</p>
        <hr>
        <p><strong>b) Calcular $a$ y $b$:</strong></p>
        <p>Las raíces (intersecciones con el eje $x$) son $x_1 = -1$ y $x_2 = 3$. Sustituimos estas en la forma factorizada:</p>
        <p>$y = a(x - (-1))(x - 3) = a(x+1)(x-3)$</p>
        <p>Para encontrar $a$, usamos otro punto conocido, como la intersección con el eje $y$, $(0, -6)$:</p>
        <p>$-6 = a(0+1)(0-3)$</p>
        <p>$-6 = a(1)(-3) \implies -6 = -3a \implies a = 2$.</p>
        <p>Ahora, expandimos la forma factorizada con $a=2$ para encontrar $b$:</p>
        <p>$y = 2(x+1)(x-3) = 2(x^2 - 3x + x - 3) = 2(x^2 - 2x - 3) = 2x^2 - 4x - 6$.</p>
        <p>Comparando con $y = ax^2 + bx + c$, tenemos que $a=2$, $b=-4$, y $c=-6$.</p>
        <hr>
        <p><strong>c) Intersección con la recta $y = 2x - 6$:</strong></p>
        <p>i. Gráfica de la parábola y la recta:</p>
        <div style="text-align:center; padding: 10px;">
            <tlacuache-ejes size="[300,450]" xlim="[-3,5]" ylim="[-9,7]" dx="1" dy="1" xlabel="x" ylabel="y">
              <tlacuache-plot f="2*x**2 - 4*x - 6" color="blue" lineWidth="2"></tlacuache-plot>
              <tlacuache-plot f="2*x - 6" color="green" lineWidth="2"></tlacuache-plot>
              <tlacuache-plot x="[0,3]" y="[-6,0]" mark="." size="5" color="purple"></tlacuache-plot>
            </tlacuache-ejes>
        </div>
        <p>ii. Cálculo algebraico de las intersecciones:</p>
        <p>Igualamos las dos ecuaciones para encontrar los puntos donde se cortan:</p>
        <p>$2x^2 - 4x - 6 = 2x - 6$</p>
        <p>$2x^2 - 4x - 2x - 6 + 6 = 0$</p>
        <p>$2x^2 - 6x = 0$</p>
        <p>$2x(x - 3) = 0$</p>
        <p>Esto nos da dos soluciones para $x$: $x=0$ y $x=3$.</p>
        <p>Ahora encontramos los valores de $y$ para cada $x$ usando la ecuación de la recta $y = 2x - 6$:</p>
        <ul>
            <li>Si $x=0$, $y = 2(0) - 6 = -6$. Punto: $(0, -6)$.</li>
            <li>Si $x=3$, $y = 2(3) - 6 = 0$. Punto: $(3, 0)$.</li>
        </ul>
        <p>Los puntos de intersección son $(0, -6)$ y $(3, 0)$.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
