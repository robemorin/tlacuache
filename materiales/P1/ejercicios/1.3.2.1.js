import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.2. Depreciación Lineal",
    titulo: "Depreciación Lineal (Maquinaria Pesada)",
    tipo: 1,
    puntos: 7,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Precio entre 300,000 y 450,000, múltiplos de 5,000
    const precioInicial = 300000 + Math.floor(Math.random() * 31) * 5000;

    // Tasa de depreciación lineal entre 15% y 25%
    const tasaDepreciacion = 15 + Math.floor(Math.random() * 11); // 15-25%

    // Años para el inciso c (entre 2 y 4)
    const t_mid = Math.floor(Math.random() * 3) + 2;

    // Vida útil estimada (vidaTotal), asegurando que no sea negativo el valor
    // V(t) = P - (P*r)*t = P(1 - rt). Para V(t)=0, t = 1/r. Si r=20% (0.2), t=5.
    // Vida útil efectiva será el entero más cercano a 1/r o fijo en 5-6 años dependiendo de r.
    // Vamos a fijar vida útil en 5 años o "N" años tal que V(N) > 0 o = scrap.
    const vidaUtil = 5;

    // --- CÁLCULOS ---
    const r = tasaDepreciacion / 100;

    // a) Depreciación anual (D = P * r)
    const depAnual = precioInicial * r;

    // b) Ecuación V(t) = P - (depAnual)t

    // c) Valor después de t_mid años
    const valorMid = precioInicial - (depAnual * t_mid);

    // d) Valor de desecho a los vidaUtil años
    const valorDesecho = precioInicial - (depAnual * vidaUtil);
    // Nota: Si depreciación es muy alta, esto podría dar negativo, pero con 15-25% y 5 años:
    // Max r=0.25 => 5 años => valor = P(1 - 1.25) = negativo.
    // Ajustaremos la generación para que vidaUtil tenga sentido o valorDesecho no sea negativo.
    // Si r * vidaUtil > 1, el valor es 0 antes de los años.
    // Restringimos r para que r * vidaUtil <= 1 (aprox). O ajustamos vidaUtil para que sea menor.
    // Si r es 25%, en 4 años es 0. 
    // Vamos a limitar r entre 10% y 18% para asegurar vida útil de 5 años con valor positivo.

    // RECALCULO VARIABLES SEGURAS:
    const tasaDepreciacionSegura = 10 + Math.floor(Math.random() * 9); // 10% - 18%
    const r_segura = tasaDepreciacionSegura / 100;
    const depAnualSegura = precioInicial * r_segura;
    const valorMidSegura = precioInicial - (depAnualSegura * t_mid);
    const valorDesechoSegura = precioInicial - (depAnualSegura * vidaUtil);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Una empresa de construcción, Construcciones McPherson, acaba de comprar una nueva grúa excavadora por <strong>$${precioInicial.toLocaleString('en-US')}</strong>. 
            El contador de la empresa determina que se debe aplicar un método de depreciación lineal (tasa fija sobre el costo original) para esta máquina.
            La tasa de depreciación es del <strong>${tasaDepreciacionSegura}%</strong> anual del precio de compra.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el valor de la depreciación anual.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                 <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                 
                <li>
                    <span class="ib-texto">Halle la ecuación lineal que muestra el valor en libros, $V(t)$, de la máquina $t$ años después de su compra.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                 <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Calcule el valor en libros de la máquina después de ${t_mid} años.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                 <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">La máquina tiene una vida útil efectiva de ${vidaUtil} años. Determine su valor de desecho al final de ese periodo.</span>
                    <span class="ib-mark">[1]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Depreciación anual:</strong></p>
        <p>La depreciación lineal se calcula sobre el precio de compra original.</p>
        <p>$$D = P \\times r$$</p>
        <p>$$D = ${precioInicial.toLocaleString('en-US')} \\times ${r_segura}$$</p>
        <p>$$D = ${depAnualSegura.toLocaleString('en-US')}$$</p>
        <p>La depreciación anual es <strong>$${depAnualSegura.toLocaleString('en-US')}</strong>.</p>
        <hr>
        
        <p><strong>b) Ecuación del valor en libros:</strong></p>
        <p>El valor inicial es $P = ${precioInicial}$ y disminuye una cantidad constante $D = ${depAnualSegura}$ cada año.</p>
        <p>$$V(t) = P - Dt$$</p>
        <p><strong>$V(t) = ${precioInicial} - ${depAnualSegura}t$</strong></p>
        <hr>

        <p><strong>c) Valor después de ${t_mid} años:</strong></p>
        <p>Sustituyendo $t = ${t_mid}$ en la ecuación:</p>
        <p>$$V(${t_mid}) = ${precioInicial} - ${depAnualSegura}(${t_mid})$$</p>
        <p>$$V(${t_mid}) = ${precioInicial} - ${depAnualSegura * t_mid}$$</p>
        <p>$$V(${t_mid}) = ${valorMidSegura.toLocaleString('en-US')}$$</p>
        <p>El valor en libros es <strong>$${valorMidSegura.toLocaleString('en-US')}</strong>.</p>
        <hr>
        
        <p><strong>d) Valor de desecho a los ${vidaUtil} años:</strong></p>
        <p>Sustituyendo $t = ${vidaUtil}$:</p>
        <p>$$V(${vidaUtil}) = ${precioInicial} - ${depAnualSegura}(${vidaUtil})$$</p>
        <p>$$V(${vidaUtil}) = ${precioInicial} - ${depAnualSegura * vidaUtil}$$</p>
        <p>$$V(${vidaUtil}) = ${valorDesechoSegura.toLocaleString('en-US')}$$</p>
        <p>El valor de desecho es <strong>$${valorDesechoSegura.toLocaleString('en-US')}</strong>.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
