import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.4. Funciones Cuadráticas",
    seccion: "2.4.1. Modelos y Aplicaciones",
    titulo: "Ficha Avanzada: Análisis y Síntesis (2h)",
    puntos: 54, // Diseñado para ~100-120 min de trabajo profundo
};

export async function generar(i) {
    // ======================================================
    // EJERCICIO 1: EL DISCRIMINANTE (Recta y Parábola)
    // Contexto: Determinar k para que sea tangente, secante, etc.
    // Parábola: y = x^2 + bx + c
    // Recta: y = mx + k
    // ======================================================
    const b1 = (Math.floor(Math.random() * 5) + 1) * 2; // Par
    const c1 = Math.floor(Math.random() * 10) + 1;
    const m1 = Math.floor(Math.random() * 4) + 1;
    // Igualando: x^2 + (b1 - m1)x + (c1 - k) = 0
    // Tangente si Delta = 0 => (b1 - m1)^2 - 4(1)(c1 - k) = 0
    const diff = b1 - m1;
    const target_delta = diff * diff; // 4(c1 - k) = target_delta => c1 - k = target/4 => k = c1 - target/4
    const k_tangente = c1 - (target_delta / 4);

    const html1 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i}.</strong> [Análisis Abstracto] Considere la parábola $f(x) = x^2 + ${b1}x + ${c1}$ y la recta $g(x) = ${m1}x + k$, donde $k$ es una constante real.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Muestre que la ecuación que determina las coordenadas $x$ de los puntos de intersección es $x^2 + (${diff})x + (${c1} - k) = 0$.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Utilizando el discriminante, determine el valor exacto de $k$ para el cual la recta es <strong>tangente</strong> a la parábola.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle el rango de valores de $k$ para los cuales la recta corta a la parábola en dos puntos distintos.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 2: SISTEMA DE 3 PUNTOS
    // Contexto: Hallar ecuación y = ax^2 + bx + c dados 3 puntos.
    // ======================================================
    const a2 = Math.floor(Math.random() * 2) + 1; // 1 o 2
    const b2 = Math.floor(Math.random() * 6) - 3; // -3 a 3
    const c2 = Math.floor(Math.random() * 10) - 5; 
    
    // Puntos (x, y)
    const p1x = 1, p1y = a2 + b2 + c2;
    const p2x = -1, p2y = a2 - b2 + c2;
    const p3x = 2, p3y = 4*a2 + 2*b2 + c2;

    const html2 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+1}.</strong> [Modelado Algebraico] Una función cuadrática tiene la forma $y = ax^2 + bx + c$ y su gráfica pasa por los puntos $A(1, ${p1y})$, $B(-1, ${p2y})$ y $C(2, ${p3y})$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba un sistema de tres ecuaciones lineales en términos de $a, b$ y $c$ utilizando los puntos dados.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Resuelva el sistema algebraicamente para hallar los valores de $a, b$ y $c$.</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine las coordenadas del vértice de esta parábola.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 3: GEOMETRÍA INSCRITA
    // Contexto: Rectángulo inscrito en y = K - x^2 sobre eje x.
    // ======================================================
    const K = Math.floor(Math.random() * 5) + 8; // 8 a 12
    // y = K - x^2. Intersecta x en +/- sqrt(K).
    // Punto (x, y) = (x, K - x^2).
    // Area = 2x * y = 2x(K - x^2) = 2Kx - 2x^3.
    // dA/dx = 2K - 6x^2 = 0 => x^2 = K/3 => x = sqrt(K/3).

    const html3 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+2}.</strong> [Optimización Geométrica] Considere la región delimitada por la gráfica de $y = ${K} - x^2$ y el eje $x$. Se inscribe un rectángulo en esta región tal que su base descansa sobre el eje $x$ y sus dos vértices superiores tocan la parábola.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Si la coordenada $x$ del vértice superior derecho del rectángulo es $x$, muestre que el área del rectángulo viene dada por $A(x) = 2${K}x - 2x^3$.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Indique el dominio lógico de $x$ para que exista tal rectángulo.</span>
                    <span class="ib-mark">[1]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Utilice su calculadora de pantalla gráfica o métodos analíticos para hallar el valor de $x$ que maximiza el área del rectángulo.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule el área máxima posible.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 4: TRANSFORMACIONES Y FAMILIAS
    // Contexto: g(x) = a(x-h)^2 + k. Análisis visual sin gráfica.
    // ======================================================
    const h4 = Math.floor(Math.random() * 5) + 2; 
    const k4 = Math.floor(Math.random() * 5) + 1;
    const a4 = -2;

    const html4 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+3}.</strong> [Transformaciones] Sea $f(x) = x^2$. La función $g(x)$ se obtiene aplicando las siguientes transformaciones a $f(x)$ en orden:</p>
            <ul style="margin-bottom:10px;">
                <li>Traslación horizontal de ${h4} unidades a la derecha.</li>
                <li>Reflexión sobre el eje $x$.</li>
                <li>Estiramiento vertical por un factor de ${Math.abs(a4)}.</li>
                <li>Traslación vertical de ${k4} unidades hacia arriba.</li>
            </ul>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba la expresión para $g(x)$ en la forma canónica (vértice).</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Determine las coordenadas de los interceptos con el eje $x$ de $g(x)$, expresando sus respuestas en forma exacta (raíces).</span>
                    <span class="ib-mark">[4]</span>
                </li><tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 5: INGENIERÍA (PUENTE COLGANTE)
    // ======================================================
    const distTorres = 200; // metros
    const alturaTorres = Math.floor(Math.random() * 20) + 40; // 40-60m
    const alturaMinima = 5; // Altura del cable en el centro sobre la carretera
    // Vértice en (0, 5) si centramos en y. O (100, 5) si iniciamos en 0.
    // Vamos a centrar en x=0 para simplificar: Torres en x = -100 y x = 100.
    // y = ax^2 + 5.
    // alturaTorres = a(100)^2 + 5 => a = (H - 5) / 10000.
    const a_bridge = (alturaTorres - alturaMinima) / 10000;
    const x_check = 50;
    const y_check = a_bridge * x_check * x_check + alturaMinima;

    const html5 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+4}.</strong> [Aplicación Compleja] El cable principal de un puente colgante forma una parábola. Las dos torres que sostienen el cable están separadas por ${distTorres} metros y tienen una altura de ${alturaTorres} metros sobre la carretera. En el punto más bajo (exactamente a la mitad entre las torres), el cable está a ${alturaMinima} metros sobre la carretera.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Ubique el punto más bajo del cable en el eje $y$ (es decir, vértice en $(0, ${alturaMinima})$) y halle la ecuación de la parábola que modela la forma del cable.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Calcule la altura del cable sobre la carretera en un punto situado a 50 metros de una de las torres.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Si se coloca un soporte vertical adicional cada 20 metros a lo largo del puente, determine la longitud del soporte ubicado a 40 metros del centro del puente.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // ======================================================
    // EJERCICIO 6: INECUACIONES CUADRÁTICAS
    // ======================================================
    // Resolver x^2 - Sx + P < 0
    const r1 = Math.floor(Math.random() * 3) + 1;
    const r2 = r1 + Math.floor(Math.random() * 4) + 2; 
    const sum = r1 + r2;
    const prod = r1 * r2;

    const html6 = `
        <div class="problema-ib" style="margin-bottom: 40px;">
            <p><strong>${i+5}.</strong> [Inecuaciones] Considere la desigualdad $x^2 - ${sum}x + ${prod} < 0$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Factorice la expresión cuadrática.</span>
                    <span class="ib-mark">[2]</span>
                </li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Utilice un diagrama de signos o una gráfica para determinar el conjunto solución de la desigualdad.</span>
                    <span class="ib-mark">[3]</span>
                </li><tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const vertexX2 = -b2 / (2 * a2);
    const vertexY2 = a2 * vertexX2 * vertexX2 + b2 * vertexX2 + c2;
    const x_max_area = Math.sqrt(K / 3);
    const area_val_max = 2 * K * x_max_area - 2 * Math.pow(x_max_area, 3);
    const y_soporte = a_bridge * 40 * 40 + alturaMinima;

    const respuestaHTML = `
        <p><strong>${i}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Sustituyendo $y$: $x^2 + ${b1}x + ${c1} = ${m1}x + k \Rightarrow x^2 + (${diff})x + (${c1}-k) = 0$.</li>
            <li> b) $\Delta = 0 \Rightarrow (${diff})^2 - 4(1)(${c1}-k) = 0$. Resolviendo para $k$: $k = ${k_tangente}$.</li>
            <li> c) Para dos puntos, $\Delta > 0$. Esto implica $k > ${k_tangente}$.</li>
        </ul>

        <p><strong>${i+1}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) <br> $a(1)^2 + b(1) + c = ${p1y}$ <br> $a(-1)^2 + b(-1) + c = ${p2y}$ <br> $a(2)^2 + b(2) + c = ${p3y}$ </li>
            <li> b) $a=${a2}, b=${b2}, c=${c2}$. Ecuación: $y = ${a2}x^2 + ${b2}x + ${c2}$.</li>
            <li> c) Vértice: $(${vertexX2.toFixed(2)}, ${vertexY2.toFixed(2)})$.</li>
        </ul>

        <p><strong>${i+2}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) Base=$2x$, Altura=$y=${K}-x^2$. Área=$2x(${K}-x^2)$.</li>
            <li> b) $0 < x < \sqrt{${K}}$.</li>
            <li> c) Maximizando: $x = \sqrt{${K}/3} \approx ${x_max_area.toFixed(3)}$.</li>
            <li> d) Área máxima $\approx ${area_val_max.toFixed(2)} u^2$.</li>
        </ul>

        <p><strong>${i+3}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $g(x) = ${a4}(x - ${h4})^2 + ${k4}$.</li>
            <li> b) $0 = -2(x - ${h4})^2 + ${k4} \Rightarrow (x - ${h4})^2 = ${k4}/2 \Rightarrow x = ${h4} \pm \sqrt{${k4/2}}$.</li>
        </ul>

        <p><strong>${i+4}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $y = ${a_bridge.toFixed(5)}x^2 + ${alturaMinima}$.</li>
            <li> b) A 50m de la torre (x = 50): $y = ${y_check.toFixed(2)}$ m. (Nota: Si se interpretó 50m desde el centro, es x=50. Si es desde la torre, es x=50 también por simetría).</li>
            <li> c) Soporte en x=40: $y = ${y_soporte.toFixed(2)}$ m.</li>
        </ul>

        <p><strong>${i+5}.</strong></p>
        <ul style="list-style:none; padding:0;">
            <li> a) $(x - ${r1})(x - ${r2}) < 0$.</li>
            <li> b) Solución: $]${r1}, ${r2}[$ (o ${r1} < x < ${r2}).</li>
        </ul>
    `;

    return {
        html: html1 + html2 + html3 + html4 + html5 + html6,
        respuesta: respuestaHTML,
        numPreguntas: 6
    };
}
