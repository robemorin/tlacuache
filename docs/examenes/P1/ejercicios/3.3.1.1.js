import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "3. Geometría y Trigonometría",
    subtema: "3.1 Geometría de coordenadas",
    seccion: "3.3.1 Punto medio y distancia entre dos puntos",
    titulo: "Distancias y ángulos en un triángulo 3D",
    puntos: 9, // 2 + 4 + 3
};

export async function generar(i) {
    const html = `
        <p><strong>${i}.</strong> El punto A tiene por coordenadas $(1, 2, 1)$ y el punto B tiene por coordenadas $(3, 5, 2)$.</p>

        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">Halle $\\overline{AB}$.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <p style="margin-top: 15px;">El triángulo $ABC$ es rectángulo; el ángulo recto está en $B$. El punto $C$ tiene por coordenadas $(2, 8, k)$.</p>

            <li>
                <span class="ib-texto">Halle el valor de $k$.</span>
                <span class="ib-mark">[4]</span>
            </li>
            <li>
                <span class="ib-texto">Calcule el tamaño de $B\\hat{A}C$.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="20" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Utilizamos la fórmula de la distancia en 3D:<br>
                $AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$<br>
                $AB = \\sqrt{(3 - 1)^2 + (5 - 2)^2 + (2 - 1)^2}$<br>
                $AB = \\sqrt{2^2 + 3^2 + 1^2}$<br>
                $AB = \\sqrt{4 + 9 + 1} = \\sqrt{14}$<br>
                <strong>$AB \\approx 3.74$</strong> (o $\\sqrt{14}$)
            </li>
            <br>
            <li>
                Al ser un triángulo rectángulo en $B$, se cumple el Teorema de Pitágoras: $AC^2 = AB^2 + BC^2$.<br>
                Ya sabemos que $AB^2 = 14$.<br>
                Calculamos la expresión para $BC^2$ y $AC^2$:<br>
                $BC^2 = (2 - 3)^2 + (8 - 5)^2 + (k - 2)^2$<br>
                $BC^2 = (-1)^2 + 3^2 + (k - 2)^2$<br>
                $BC^2 = 1 + 9 + (k - 2)^2 = 10 + (k - 2)^2$<br>
                <br>
                $AC^2 = (2 - 1)^2 + (8 - 2)^2 + (k - 1)^2$<br>
                $AC^2 = 1^2 + 6^2 + (k - 1)^2$<br>
                $AC^2 = 1 + 36 + (k - 1)^2 = 37 + (k - 1)^2$<br>
                <br>
                Sustituimos en Pitágoras: $37 + (k - 1)^2 = 14 + 10 + (k - 2)^2$<br>
                Expandimos: $37 + k^2 - 2k + 1 = 24 + k^2 - 4k + 4$<br>
                $38 - 2k = 28 - 4k$<br>
                Sumamos $4k$ y restamos $38$ a ambos lados:<br>
                $2k = -10$<br>
                <strong>$k = -5$</strong>
            </li>
            <br>
            <li>
                En el triángulo rectángulo $ABC$ (recto en $B$), tenemos que $\\tan(B\\hat{A}C) = \\frac{BC}{AB}$.<br>
                Sabemos que $k = -5$, así que hallamos la longitud exacta de $BC$:<br>
                $BC^2 = 10 + (-5 - 2)^2 = 10 + (-7)^2 = 10 + 49 = 59$.<br>
                Por lo tanto, $BC = \\sqrt{59}$.<br>
                $\\tan(B\\hat{A}C) = \\frac{\\sqrt{59}}{\\sqrt{14}}$<br>
                $B\\hat{A}C = \\arctan\\left(\\sqrt{\\frac{59}{14}}\\right)$<br>
                $B\\hat{A}C \\approx \\arctan(2.0528)$<br>
                <strong>$B\\hat{A}C \\approx 64.0^\\circ$</strong> (o $1.12$ radianes).<br>
                <em>Nota: También se puede utilizar la regla del coseno o las razones seno/coseno tras hallar $AC^2 = 73$.</em>
            </li>
        </ol>
    `;

    return { html, respuesta };
}