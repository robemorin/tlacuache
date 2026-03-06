import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Funciones",
    subtema: "Modelos exponenciales",
    seccion: "Funciones de crecimiento y decaimiento exponencial",
    titulo: "Desintegración radioactiva y vida media",
    puntos: 10, // 3 + 2 + 3 + 2
};

export async function generar(i) {
    // Generar constantes
    // Base b debe ser > 1 para que b^-t sea decaimiento.
    // Ejemplo imagen: 1.122. Vamos a usar algo entre 1.05 y 1.25
    const baseRaw = 1.05 + Math.random() * 0.20;
    const b = Number(baseRaw.toFixed(3)); // 3 decimales

    // t1 para el inciso a
    const t1 = 5 + Math.floor(Math.random() * 5); // 5 a 9 segundos/minutos

    // Masa remanente en t1 (M1)
    const M1 = Math.round((100 + Math.random() * 400) / 10) * 10; // 100 a 500, multiplos de 10

    // M0 calculado para que coincida
    // M1 = M0 * b^(-t1) => M0 = M1 * b^t1
    const M0_exact = M1 * Math.pow(b, t1);
    const M0_rounded = Math.round(M0_exact * 100) / 100;

    // t2 para el inciso b (proporción)
    const t2 = t1 * 2;

    const html = `
        <p><strong>${i}.</strong> La masa $M$ en gramos de una sustancia radioactiva después de un tiempo $t$ en minutos está determinada por la ecuación:</p>
        <p style="text-align: center; font-size: 1.2em;">$$ M(t) = M_0 \\times (${b})^{-t}, \\quad t \\geq 0 $$</p>
        <p>donde $M_0$ es la masa inicial.</p>

        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Si la masa de la sustancia es ${M1} gramos después de ${t1} minutos, determina la masa inicial $M_0$.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Halla el porcentaje de la masa original que permanece después de ${t2} minutos.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcula cuánto tiempo tomará para que la masa se reduzca a la mitad (vida media).</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">En el siguiente sistema de ejes, dibuja un esbozo la gráfica de la masa restante para $t \\geq 0$. Indica claramente la intersección con el eje vertical.</span>
                <span class="ib-mark">[2]</span>
                
            </li>
            <div style="display: flex; justify-content: center; margin-top: 10px;">
                   <tlacuache-milimetrado size="300,720" cuadricula="5,12"  n="5" color = 'RGB(200, 64, 64)'  stroke = ".7" stroke2 = ".2"/>
                </div>
        </ol>
    `;

    // Soluciones
    // b) Porcentaje remanente a t2
    // M(t2)/M0 = b^(-t2)
    const ratio = Math.pow(b, -t2);
    const percent = (ratio * 100).toFixed(2);

    // c) Vida media
    // 0.5 = b^(-t) => ln(0.5) = -t * ln(b) => t = ln(2)/ln(b)
    const halfLife = Math.log(2) / Math.log(b);

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                Sustituyendo $t=${t1}$ y $M(${t1})=${M1}$:<br>
                $$ ${M1} = M_0 \\times (${b})^{-${t1}} $$
                $$ M_0 = \\frac{${M1}}{(${b})^{-${t1}}} = ${M1} \\times (${b})^{${t1}} $$
                $$ M_0 \\approx ${M0_rounded} \\text{ g} $$
            </li>
            <br>
            <li>
                Para $t=${t2}$, la fracción remanente es $\\frac{M(${t2})}{M_0} = (${b})^{-${t2}}$.<br>
                $$ (${b})^{-${t2}} \\approx ${ratio.toFixed(4)} $$
                Porcentaje $\\approx$ <strong>${percent}%</strong>.
            </li>
            <br>
            <li>
                Buscamos $t$ tal que $M(t) = 0.5 M_0$:<br>
                $$ 0.5 = (${b})^{-t} $$
                $$ \\ln(0.5) = -t \\ln(${b}) $$
                $$ t = \\frac{\\ln(2)}{\\ln(${b})} $$
                $$ t \\approx ${halfLife.toFixed(2)} \\text{ min} $$
            </li>
            <br>
            <li>
                La gráfica debe mostrar:
                <ul>
                    <li>Una curva decreciente exponencial.</li>
                    <li>Intersección con el eje Y en $(0, M_0)$ es decir aprox $(0, ${Math.round(M0_rounded)})$.</li>
                    <li>Asíntota horizontal en $M=0$ (eje t).</li>
                </ul>
            </li>
        </ol>
    `;

    return { html, respuesta };
}
