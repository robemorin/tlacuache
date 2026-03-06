import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Probabilidad",
    seccion: "Diagramas de Venn",
    titulo: "Deportes en la escuela (Venn y Probabilidad Condicionada)",
    puntos: 12,
};

export async function generar(i) {
    const total = 120;
    const ninguno = 13;
    const nS = 60; // Fútbol
    const nB = 45; // Baloncesto
    const nV = 30; // Voleibol
    const nSB = 15;
    const nSV = 10;
    const nBV = 8;
    // Intersección triple = 5

    const html = `
    <div class="ib-texto">
        <p><strong>\${i}.</strong> En una escuela preparatoria de $\${total}$ estudiantes, se realizó una encuesta sobre los deportes que practican: Fútbol ($F$), Baloncesto ($B$) y Voleibol ($V$). Los resultados mostraron que:</p>
        <ul>
            <li>$\${nS}$ estudiantes practican Fútbol.</li>
            <li>$\${nB}$ estudiantes practican Baloncesto.</li>
            <li>$\${nV}$ estudiantes practican Voleibol.</li>
            <li>$\${nSB}$ estudiantes practican Fútbol y Baloncesto.</li>
            <li>$\${nSV}$ estudiantes practican Fútbol y Voleibol.</li>
            <li>$\${nBV}$ estudiantes practican Baloncesto y Voleibol.</li>
            <li>$\${ninguno}$ estudiantes no practican ninguno de estos tres deportes.</li>
        </ul>
        <ol class="ib-lista" type="a">
            <li>Demuestre que el número de estudiantes que practican los tres deportes es $5$.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>Dibuje un diagrama de Venn para representar esta información.
                <div class="ib-mark">[4]</div>
                <div style="height: 250px; border: 2px dashed #999; margin-top: 15px; border-radius: 5px; background-color: #fcfcfc; width: 100%; display: flex; align-items: center; justify-content: center; color: #aaa;">
                    (Espacio para dibujar el diagrama de Venn)
                </div>
            </li>
            <li>Halle la probabilidad de que un estudiante elegido al azar practique solo Voleibol.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>Dado que un estudiante practica Fútbol, determine la probabilidad de que no practique Baloncesto.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
            <li>Halle la probabilidad de que un estudiante practique Fútbol o Voleibol, pero no ambos.
                <div class="ib-mark">[2]</div>
                <tlacuache-renglon></tlacuache-renglon>
                <tlacuache-renglon></tlacuache-renglon>
            </li>
        </ol>
    </div>
    `;

    const respuesta = `
    <div class="ib-texto">
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Cálculo del total en la unión: $n(F \\cup B \\cup V) = \${total} - \${ninguno} = 107$<br>
                Usando la fórmula de inclusión-exclusión: <br>
                $n(F \\cup B \\cup V) = n(F) + n(B) + n(V) - n(F \\cap B) - n(F \\cap V) - n(B \\cap V) + n(F \\cap B \\cap V)$<br>
                $107 = \${nS} + \${nB} + \${nV} - \${nSB} - \${nSV} - \${nBV} + x$<br>
                $107 = 135 - 33 + x$<br>
                $107 = 102 + x \\Rightarrow x = 5$
            </li>
            <li>
                (Se otorgarán puntos por un diagrama de Venn con un rectángulo universal y 3 círculos intersecados, con los siguientes valores en cada región):<br>
                <ul>
                    <li>Intersección central ($F \\cap B \\cap V$): $5$</li>
                    <li>Solo $F \\cap B$: $\${nSB} - 5 = 10$</li>
                    <li>Solo $F \\cap V$: $\${nSV} - 5 = 5$</li>
                    <li>Solo $B \\cap V$: $\${nBV} - 5 = 3$</li>
                    <li>Solo $F$: $\${nS} - (10 + 5 + 5) = 40$</li>
                    <li>Solo $B$: $\${nB} - (10 + 3 + 5) = 27$</li>
                    <li>Solo $V$: $\${nV} - (5 + 3 + 5) = 17$</li>
                    <li>Exterior (Ninguno): $\${ninguno}$</li>
                </ul>
            </li>
            <li>
                $P(\\text{solo V}) = \\frac{17}{120} \\approx 0.142$
            </li>
            <li>
                $P(B' | F) = \\frac{n(B' \\cap F)}{n(F)}$<br>
                $n(B' \\cap F) = \\text{estudiantes en F pero no en B} = 40 (solo F) + 5 (solo F \\cap V) = 45$<br>
                $P(B' | F) = \\frac{45}{60} = \\frac{3}{4} = 0.75$
            </li>
            <li>
                Estudiantes en $F$ o $V$: $n(F \\cup V) = n(F) + n(V) - n(F \\cap V) = \${nS} + \${nV} - \${nSV} = 80$<br>
                Estudiantes en ambos ($F \\cap V$): $\${nSV} = 10$<br>
                $n(F \\cup V) - n(F \\cap V) = 80 - 10 = 70$<br>
                $P(\\text{F o V, no ambos}) = \\frac{70}{120} = \\frac{7}{12} \\approx 0.583$
            </li>
        </ol>
    </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
