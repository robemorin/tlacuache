import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.4. Funciones Cuadráticas",
    seccion: "2.4.1. Modelos y Aplicaciones",
    titulo: "Ficha: Modelos Cuadráticos en Contexto",
    puntos: 24,
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: PROYECTIL (DEPORTES)
    // Contexto: Clavado o salto.
    // h(t) = -5(t - r1)(t - r2). r1 negativo, r2 positivo (tiempo vuelo).
    // ======================================================
    
    // Configuración para tener números enteros o amigables
    const r2 = Math.floor(Math.random() * 2) + 3; // Raíz positiva: 3 o 4 segundos
    const r1 = -1; // Raíz negativa fija para simplificar cálculos mentales del dev
    const a = -5; // Gravedad aprox
    
    // h(t) = -5(t - r2)(t - r1) = -5(t^2 - t(r1+r2) + r1r2)
    // h(t) = -5t^2 + 5(r1+r2)t - 5(r1r2)
    const b = -a * (r1 + r2); // Como a es neg, esto es 5 * (r2-1)
    const c = a * r1 * r2;    // -5 * (-1) * r2 = 5 * r2
    
    // Vértice
    const t_vertex = -b / (2 * a);
    const h_max = a * t_vertex * t_vertex + b * t_vertex + c;

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> [Física] Un clavadista salta desde una plataforma hacia una piscina. Su altura $h$ (en metros) sobre el nivel del agua a los $t$ segundos del salto se modela mediante la función:</p>
            <p style="text-align:center;">$$h(t) = ${a}t^2 + ${b}t + ${c}, \\quad t \\geq 0$$</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine la altura de la plataforma desde la cual se realizó el salto.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine cuánto tiempo transcurre hasta que el clavadista alcanza su altura máxima sobre el agua.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle dicha altura máxima.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule cuánto tiempo permanece el clavadista en el aire antes de entrar al agua.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: ECONOMÍA (BENEFICIOS)
    // Contexto: Venta de productos.
    // P(x) = -x^2 + Bx - C.
    // ======================================================
    
    // Raíces del beneficio (donde P=0): x1 (min ventas), x2 (max ventas antes de saturar/costos)
    const x1 = (Math.floor(Math.random() * 3) + 2) * 10; // 20, 30, 40
    const amplitud = (Math.floor(Math.random() * 4) + 4) * 10; // 40, 50, 60, 70
    const x2 = x1 + amplitud;
    
    // P(x) = -1 * (x - x1)(x - x2) = -(x^2 - x(x1+x2) + x1x2)
    // P(x) = -x^2 + (x1+x2)x - x1x2
    const coefB = x1 + x2;
    const coefC = x1 * x2; // Esto será negativo en la función final: -x^2 + Bx - C
    
    const x_optimo = (x1 + x2) / 2;
    const ganancia_max = -(x_optimo*x_optimo) + coefB*x_optimo - coefC;

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+1}.</strong> [Economía] El beneficio semanal $B(x)$ (en dólares) de una empresa que fabrica componentes electrónicos depende del número de unidades vendidas $x$, según la función:</p>
            <p style="text-align:center;">$B(x) = -x^2 + ${coefB}x - ${coefC}$</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Determine cuántas unidades debe vender la empresa para obtener el <strong>máximo</strong> beneficio posible.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle el valor de dicho beneficio máximo.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine el intervalo de ventas para el cual la empresa obtiene ganancias (es decir, $B(x) > 0$).</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: ARQUITECTURA (TÚNEL)
    // Contexto: Arco parabólico.
    // y = -k(x)(x-w).
    // ======================================================

    const ancho = 10; // 10 metros de ancho base
    const altura_tunel = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 metros de alto
    
    // Vértice está en (5, altura_tunel).
    // y = a(x - 0)(x - 10).
    // altura_tunel = a(5)(-5) = -25a  => a = -altura_tunel / 25
    const a_tunel = -altura_tunel / 25;
    
    // Ecuación: y = a_tunel * x^2 - 10 * a_tunel * x
    const termA = a_tunel;
    const termB = -10 * a_tunel; // Positivo porque a_tunel es neg
    
    // Camión
    const ancho_camion = 4;
    const alto_camion = altura_tunel - 0.5 - (Math.random() * 1.5); // Altura crítica
    // Para ver si pasa, checamos la altura del arco a x = 3 y x = 7 (centro en 5, ancho 4 => 5-2, 5+2)
    const x_check = 5 - (ancho_camion / 2); // x = 3
    const altura_en_3 = termA * (x_check * x_check) + termB * x_check;
    
    const pasa = altura_en_3 > alto_camion ? "Sí pasa" : "No pasa";

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+2}.</strong> [Arquitectura] La entrada a un túnel tiene forma de arco parabólico. Si consideramos el nivel del suelo como el eje $x$, la altura $y$ (en metros) del arco en función de la distancia horizontal $x$ desde el borde izquierdo viene dada por:</p>
            <p style="text-align:center;">$$y = ${termA.toFixed(2)}x^2 + ${termB.toFixed(2)}x$$</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el ancho de la base del túnel a nivel del suelo.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine la altura máxima del arco del túnel.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Un camión de carga tiene ${ancho_camion} metros de ancho y ${alto_camion.toFixed(2)} metros de altura. Si el camión intenta pasar exactamente por el centro del túnel, determine matemáticamente si podrá hacerlo sin chocar con el arco. Justifique su respuesta.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Evaluar $h(0) = ${c}$ metros (Intersección con eje $y$).</li>
            <li> b) Coordenada $x$ del vértice (eje de simetría): $t = ${t_vertex}$ s.</li>
            <li> c) Coordenada $y$ del vértice: $h(${t_vertex}) = ${h_max}$ m.</li>
            <li> d) Raíz positiva de la ecuación (cuando $h(t)=0$): $t = ${r2}$ s.</li>
        </ul>

        <p><strong>${i+1}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Vértice $x = \\frac{-b}{2a} = \\frac{-${coefB}}{-2} = ${x_optimo}$ unidades.</li>
            <li> b) Vértice $y = B(${x_optimo}) = ${ganancia_max}$ dólares.</li>
            <li> c) Raíces de la función: $x_1=${x1}$ y $x_2=${x2}$. Intervalo: $]${x1}, ${x2}[$.</li>
        </ul>

        <p><strong>${i+2}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Distancia entre raíces. Raíces en $x=0$ y $x=10$. Ancho = 10 m.</li>
            <li> b) Vértice $y$ (en $x=5$): $y = ${termA.toFixed(2)}(25) + ${termB.toFixed(2)}(5) = ${altura_tunel}$ m.</li>
            <li> c) El camión ocupa desde $x=3$ hasta $x=7$. <br> 
                Altura del arco en $x=3$: $y = ${altura_en_3.toFixed(2)}$ m. <br> 
                Altura del camión: ${alto_camion.toFixed(2)}$ m. <br> 
                Conclusión: <strong>${pasa}</strong> (pues ${altura_en_3.toFixed(2)} ${altura_en_3 > alto_camion ? '>' : '<'} ${alto_camion.toFixed(2)}).
            </li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3,
        respuesta: respuestaHTML,
        numPreguntas: 3
    };
}
