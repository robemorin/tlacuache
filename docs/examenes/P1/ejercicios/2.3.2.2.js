import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export const metadata = {
    tema: "2. Funciones",
    subtema: "2.3. Cuadráticas",
    seccion: "2.3.2. Eje de simetría y vértice",
    titulo: "Altura Máxima (Proyectil)",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    // Usamos -5t^2 como aproximación de gravedad (-4.9t^2 redondeado para facilitar cálculos mentales)
    const a = -5; 
    
    // Definimos una velocidad inicial "secreta" para construir el problema
    // Elegimos múltiplos de 10 para que el vértice ( -b / 2a ) de un tiempo entero o .5
    const v_inicial = Math.random() > 0.5 ? 20 : 30; // 20 m/s o 30 m/s
    
    // Altura inicial (lanzado desde una plataforma)
    const h_inicial = Math.floor(Math.random() * 10) + 5; // Entre 5 y 15 metros

    // PUNTO DE PASO (Dato para el alumno)
    // Les damos el estado en t = 1 segundo para que despejen 'v'
    const tiempo_dato = 1;
    const altura_dato = (a * (tiempo_dato**2)) + (v_inicial * tiempo_dato) + h_inicial;

    // --- CÁLCULOS SOLUCIONARIO ---
    // 1. Hallar v:  h = -5(1)^2 + v(1) + h0  =>  v = h - h0 + 5
    // 2. Vértice t: t_max = -v / 2a = -v / -10 = v / 10
    const t_vertice = v_inicial / 10;
    // 3. Vértice h: h(t_max)
    const h_maxima = (a * (t_vertice**2)) + (v_inicial * t_vertice) + h_inicial;

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Un cohete de juguete es lanzado verticalmente hacia arriba desde una plataforma. 
            La altura del cohete, $h(t)$ en metros, a los $t$ segundos después del lanzamiento está modelada por la función:</p>
            
            $$ h(t) = -5t^2 + vt + ${h_inicial} $$
            
            <p>donde $v$ es una constante que representa la velocidad inicial.</p>
            <p>Se sabe que después de <strong>${tiempo_dato} segundo</strong>, el cohete alcanza una altura de <strong>${altura_dato} metros</strong>.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Demuestre que la velocidad inicial $v$ es ${v_inicial} $m/s$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule el tiempo que tarda el cohete en alcanzar su altura máxima.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Halle la altura máxima alcanzada por el cohete.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="20" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA (SOLUCIONARIO) ---
    const respuesta = `
        <ul style="list-style:none; padding-left:0;">
            <li><strong>a)</strong> Sustituir $t=${tiempo_dato}, h=${altura_dato}$: <br>
                $${altura_dato} = -5(${tiempo_dato})^2 + v(${tiempo_dato}) + ${h_inicial}$ <br>
                $${altura_dato} = -5 + v + ${h_inicial}$ <br>
                $v = ${altura_dato} + 5 - ${h_inicial} = $ <strong>${v_inicial}</strong>
            </li>
            <li><strong>b)</strong> Eje de simetría (Vértice $x$): <br>
                $t = \\frac{-b}{2a} = \\frac{-${v_inicial}}{2(-5)} = \\frac{-${v_inicial}}{-10} = $ <strong>${t_vertice} s</strong>
            </li>
            <li><strong>c)</strong> Altura máxima (Vértice $y$): <br>
                $h(${t_vertice}) = -5(${t_vertice})^2 + ${v_inicial}(${t_vertice}) + ${h_inicial}$ <br>
                $h(${t_vertice}) = $ <strong>${h_maxima} m</strong>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}