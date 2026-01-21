import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.4. Funciones Cuadráticas",
    seccion: "2.4.1. Modelos y Aplicaciones",
    titulo: "Ficha: Optimización y Trayectorias",
    puntos: 22,
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: OPTIMIZACIÓN GEOMÉTRICA (GRANJERO)
    // ======================================================
    
    const perimetro = (Math.floor(Math.random() * 5) + 4) * 20; 
    const ancho_optimo = perimetro / 4;
    const largo_optimo = perimetro - 2 * ancho_optimo; 
    const area_maxima = ancho_optimo * largo_optimo;

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> [Optimización] Un granjero desea cercar un terreno rectangular para sus animales a lo largo de la orilla recta de un río. No necesita cercar el lado que da al río. Dispone de un total de ${perimetro} metros de material para la cerca.</p>
            <p>Sea $x$ la anchura del terreno (los dos lados perpendiculares al río).</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Muestre que el área del terreno, $A(x)$, se puede modelar mediante la función $A(x) = -2x^2 + ${perimetro}x$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine las dimensiones (ancho y largo) que debe tener el terreno para que la superficie cercada sea la mayor posible.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule dicha área máxima.</span>
                    <span class="ib-mark">[1]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: INGRESOS (PRECIO VS VENTAS)
    // ======================================================
    
    const precio_base = 20;
    const ventas_base = Math.floor(Math.random() * 5) * 100 + 400; 
    const perdida_por_dolar = Math.floor(Math.random() * 3) * 5 + 10; 
    
    const x_opt = (ventas_base - precio_base * perdida_por_dolar) / (2 * perdida_por_dolar);
    const mejor_precio = precio_base + x_opt;
    const mejores_ventas = ventas_base - perdida_por_dolar * x_opt;
    const ingreso_max = mejor_precio * mejores_ventas;

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+1}.</strong> [Economía] Una sala de cine vende actualmente entradas a $${precio_base}$ dólares y atrae a un promedio de ${ventas_base} clientes por función.</p>
            <p>Un estudio de mercado indica que por cada $1$ dólar que se aumente el precio, se perderán ${perdida_por_dolar} clientes.</p>
            <p>Sea $x$ el aumento en el precio (en dólares) sobre el precio base.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba una expresión para el Ingreso Total, $I(x)$, en función del aumento $x$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine qué precio de entrada genera los mayores ingresos para el cine.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">¿Cuál sería el ingreso esperado con ese nuevo precio?</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: TRAYECTORIA
    // ======================================================
    
    const distancia = (Math.floor(Math.random() * 4) + 4) * 10; 
    const altura_max = Math.floor(Math.random() * 5) + 10; 
    const a_traj = (-4 * altura_max) / (distancia * distancia);
    const x_obs = distancia - 5; 
    const h_obs = 3; 
    const altura_en_obs = a_traj * x_obs * (x_obs - distancia);
    const pasa = altura_en_obs > h_obs ? "Sí" : "No";

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+2}.</strong> [Física] Se patea un balón de fútbol desde el suelo. La trayectoria del balón es parabólica. El balón alcanza una altura máxima de ${altura_max} metros y toca el suelo nuevamente a ${distancia} metros de distancia del punto de lanzamiento.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Utilizando la forma factorizada $y = ax(x-p)$ o la forma canónica, halle la ecuación de la trayectoria del balón.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">A una distancia horizontal de ${x_obs} metros del lanzamiento hay un muro de ${h_obs} metros de altura. Determine matemáticamente si el balón pasará por encima del muro.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Interprete qué representa el dominio de esta función en el contexto del problema.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Largo $L = ${perimetro} - 2x$. Área $A = x(${perimetro} - 2x) = -2x^2 + ${perimetro}x$.</li>
            <li> b) Vértice $x$ (ancho) = $${ancho_optimo}$ m. Largo = $${largo_optimo}$ m.</li>
            <li> c) Área máxima = $${area_maxima}$ m$^2$.</li>
        </ul>

        <p><strong>${i+1}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $I(x) = (${precio_base} + x)(${ventas_base} - ${perdida_por_dolar}x)$.</li>
            <li> b) Aumento óptimo $x = ${x_opt.toFixed(2)}$. Precio óptimo = $${mejor_precio.toFixed(2)}$.</li>
            <li> c) Ingreso máximo = $${ingreso_max.toFixed(2)}$.</li>
        </ul>

        <p><strong>${i+2}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Raíces en $0$ y $${distancia}$. $y = ax(x-${distancia})$. Vértice $(${distancia/2}, ${altura_max})$. <br>
                Sustituyendo: $${altura_max} = a(${distancia/2})(-${distancia/2}) \Rightarrow a = ${a_traj.toFixed(4)}$. <br>
                Ecuación: $y = ${a_traj.toFixed(4)}x(x - ${distancia})$.
            </li>
            <li> b) Altura en $x=${x_obs}$: $y \approx ${altura_en_obs.toFixed(2)}$ m. <br>
                ¿Es mayor que ${h_obs} m? <strong>${pasa}</strong>.
            </li>
            <li> c) El dominio $[0, ${distancia}]$ representa la distancia horizontal recorrida por el balón mientras está en el aire.</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3,
        respuesta: respuestaHTML,
        numPreguntas: 3
    };
}
