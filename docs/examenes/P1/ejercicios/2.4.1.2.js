import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Funciones",
    subtema: "Modelos exponenciales",
    seccion: "Funciones de crecimiento y decaimiento exponencial",
    titulo: "Depreciación de un vehículo",
    puntos: 6, // 1 + 2 + 3
};

export async function generar(i) {
    const V0 = 12000 + Math.round(Math.random() * 50) * 100; // Random entre 12000 y 17000
    const rate = 15; // 15% depreciación
    const factor = (100 - rate) / 100; // 0.85
    const limite = 3000;

    const html = `
        <p><strong>${i}.</strong> El valor $V$ de una motocicleta (en dólares) después de $t$ años puede modelarse mediante la función:</p>
        <p style="text-align: center; font-size: 1.2em;">$$ V(t) = ${V0} \\times (${factor})^t $$</p>
        
        <ol class="ib-lista">
            <li>
                <span class="ib-texto">Escribe el valor inicial de la motocicleta.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="1" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
            
            <li>
                <span class="ib-texto">Halla el valor de la motocicleta después de 4 años. Da tu respuesta redondeada a dos cifras decimales.</span>
                <span class="ib-mark">[2]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcula el número de años que deben transcurrir para que el valor de la motocicleta sea menor a $${limite}.</span>
                <span class="ib-mark">[3]</span>
            </li>
            <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    // Metodos
    const val4 = V0 * Math.pow(factor, 4);

    // Solucion log
    // 3000 = V0 * 0.85^t
    // 3000/V0 = 0.85^t
    // log(3000/V0) = t * log(0.85)
    // t = log(3000/V0) / log(0.85)
    const t_val = Math.log(limite / V0) / Math.log(factor);

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista">
            <li>
                El valor inicial sucede cuando $t=0$.<br>
                $V(0) = ${V0} \\times (${factor})^0 = ${V0}$.<br>
                <strong>$${V0}</strong>
            </li>
            <br>
            <li>
                Sustituyendo $t=4$:<br>
                $V(4) = ${V0} \\times (${factor})^4$<br>
                $V(4) \\approx ${val4.toFixed(4)}$<br>
                Valor $\\approx$ <strong>$${val4.toFixed(2)}</strong>
            </li>
            <br>
            <li>
                Queremos $V(t) < ${limite}$:<br>
                $$ ${V0} \\times (${factor})^t < ${limite} $$
                $$ (${factor})^t < \\frac{${limite}}{${V0}} $$
                $$ (${factor})^t < ${(limite / V0).toFixed(4)} $$
                Tomando logaritmos:<br>
                $$ t \\times \\ln(${factor}) < \\ln(${(limite / V0).toFixed(4)}) $$
                $$ t > \\frac{\\ln(${(limite / V0).toFixed(4)})}{\\ln(${factor})} $$
                $$ t > ${t_val.toFixed(2)} $$
                <br>
                Se necesitan aproximadamente <strong>${t_val.toFixed(1)} años</strong> (o ${Math.ceil(t_val)} años enteros).
            </li>
        </ol>
    `;

    return { html, respuesta };
}
