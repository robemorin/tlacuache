import * as tlucu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.4. Aproximación y error",
    seccion: "1.4.1. Error de estimación",
    titulo: "Límites de error y certeza en mediciones de velocidad",
    tipo: 1, // 1 = Abierto
    puntos: 6 // Asignado: [6] para el análisis completo
};

export async function generar(i) {
    // --- CONTEXTOS ---
    const contextos = [
        {
            tipo: 'coche',
            sujeto: 'un coche',
            metodo: 'una cámara de control de velocidad',
            accion: 'está (o no) superando el límite de velocidad de',
            fraseRecorrido: 'El coche recorre estos',
            fraseFinal: 'haya superado el límite de velocidad'
        },
        {
            tipo: 'atleta',
            sujeto: 'un atleta',
            metodo: 'un sensor de cronometraje digital',
            accion: 'ha logrado (o no) superar una velocidad promedio récord de',
            fraseRecorrido: 'El atleta recorre estos',
            fraseFinal: 'haya superado la velocidad promedio récord'
        },
        {
            tipo: 'dron',
            sujeto: 'un dron autónomo',
            metodo: 'un radar de telemetría',
            accion: 'está (o no) superando la velocidad máxima permitida por regulación de',
            fraseRecorrido: 'El dron recorre estos',
            fraseFinal: 'haya superado la velocidad máxima permitida'
        }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];

    // --- CONFIGURACIONES NUMÉRICAS ---
    const configs = [
        { d: 10, t: 1.2, vLimit: 8.3 }, // v_min = 8.0 (No certeza)
        { d: 10, t: 1.1, vLimit: 8.3 }, // v_min = 8.695 (Sí certeza)
        { d: 20, t: 2.4, vLimit: 8.3 }, // v_min = 8.163 (No certeza)
        { d: 20, t: 2.2, vLimit: 8.3 }, // v_min = 8.889 (Sí certeza)
        { d: 50, t: 5.3, vLimit: 9.5 }, // v_min = 9.346 (No certeza)
        { d: 50, t: 5.0, vLimit: 9.5 }  // v_min = 9.901 (Sí certeza)
    ];

    const cfg = configs[Math.floor(Math.random() * configs.length)];
    const d = cfg.d;
    const t = cfg.t;
    const vLimit = cfg.vLimit;

    // Límites del tiempo
    const tMin = parseFloat((t - 0.05).toFixed(3));
    const tMax = parseFloat((t + 0.05).toFixed(3));

    // Límites de la velocidad
    const vMin = d / tMax;
    const vMax = d / tMin;

    const hayCerteza = vMin > vLimit;

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Se utiliza ${ctx.metodo} para determinar si ${ctx.sujeto} ${ctx.accion} $${vLimit}\\text{ m s}^{-1}$.</p>
            <p>Se señala una distancia exacta de $${d}\\text{ m}$. ${ctx.fraseRecorrido} $${d}\\text{ m}$ de distancia en $${t}$ segundos, redondeando al múltiplo de $0.1$ segundos más próximo.</p>
            <p>Determine si hay certeza (o no) de que ${ctx.sujeto} ${ctx.fraseFinal} de $${vLimit}\\text{ m s}^{-1}$. Justifique su respuesta.</p>
        </div>
        <tlacuache-renglon n="17" color="gray" alto="35"></tlacuache-renglon>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>Análisis de límites y cotas de error:</strong> <br>
                1. El tiempo de $t = ${t}\\text{ s}$ ha sido redondeado al décimo de segundo más cercano (múltiplo de $0.1\\text{ s}$). <br>
                El rango del valor real del tiempo es: <br>
                $${tMin}\\text{ s} \\le t_{\\text{real}} < ${tMax}\\text{ s}$. <br>
                2. La velocidad se calcula como $v = \\frac{d}{t} = \\frac{${d}}{t_{\\text{real}}}$. <br>
                3. Hallamos los límites superior e inferior de la velocidad: <br>
                * <strong>Velocidad mínima posible:</strong> <br>
                  $v_{\\text{mín}} = \\frac{${d}}{t_{\\text{máx}}} = \\frac{${d}}{${tMax}} \\approx$ <strong>$${vMin.toFixed(3)}\\text{ m s}^{-1}$</strong>. <br>
                * <strong>Velocidad máxima posible:</strong> <br>
                  $v_{\\text{máx}} = \\frac{${d}}{t_{\\text{mín}}} = \\frac{${d}}{${tMin}} \\approx$ <strong>$${vMax.toFixed(3)}\\text{ m s}^{-1}$</strong>.
            </li>
            <br>
            <li><strong>Conclusión:</strong> <br>
                ${hayCerteza ? `
                Dado que la velocidad mínima posible de la medición es $v_{\\text{mín}} \\approx ${vMin.toFixed(3)}\\text{ m s}^{-1}$, la cual es <strong>estrictamente mayor</strong> que el límite de velocidad de $${vLimit}\\text{ m s}^{-1}$, podemos concluir que <strong>sí hay certeza absoluta</strong> de que se superó dicho límite.
                ` : `
                Dado que la velocidad mínima posible de la medición es $v_{\\text{mín}} \\approx ${vMin.toFixed(3)}\\text{ m s}^{-1}$, la cual es <strong>menor</strong> que el límite de velocidad de $${vLimit}\\text{ m s}^{-1}$, el valor real de la velocidad podría ser inferior a la velocidad regulada. Por lo tanto, <strong>no hay certeza absoluta</strong> de que se haya superado dicho límite.
                `}
            </li>
        </ul>
    `;

    return { html, respuesta: respuestaHTML };
}
