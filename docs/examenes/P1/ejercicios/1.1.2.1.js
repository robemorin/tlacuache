import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Álgebra",
    subtema: "Fundamentos",
    seccion: "Exponentes y Logaritmos",
    titulo: "pH del Café (Logaritmos)",
    tipo: 1,
    puntos: 5
};

export async function generar(i) {
    // 1. Generar datos aleatorios
    // Concentración C = a * 10^-b
    // a entre 1.1 y 9.9
    const a = (Math.floor(Math.random() * 89) + 11) / 10;
    // b entre 4 y 6 (para pH típico de café entre 4 y 6 aprox)
    const b = Math.floor(Math.random() * 3) + 4;

    const C_str = `${a} \\times 10^{-${b}}`;
    const C_val = a * Math.pow(10, -b);

    // Factor para parte b (10, 100, 0.1, etc.)
    // Opciones: 10, 100, 0.1, 0.01
    const factores = [10, 100, 0.1, 0.01];
    const k = factores[Math.floor(Math.random() * factores.length)];

    // 2. Cálculos
    // a) pH
    // pH = -log10(C)
    const pH = -Math.log10(C_val);

    // b) Nuevo líquido
    // C_new = k * C
    // pH_new = -log10(k * C) = pH - log10(k)
    const log_k = Math.log10(k);
    const pH_new = pH - log_k;

    const comparacion = pH_new < pH ? "más ácido" : "menos ácido";
    const justificacion = k > 1 ?
        `Al ser la concentración de iones hidronio mayor ($k=${k} > 1$), el pH disminuye, por lo que es más ácido.` :
        `Al ser la concentración de iones hidronio menor ($k=${k} < 1$), el pH aumenta, por lo que es menos ácido.`;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> El pH de una solución mide su acidez y puede determinarse usando la fórmula $pH = -\\log_{10} C$, donde $C$ es la concentración de iones de hidronio en la solución, medida en moles por litro. Un pH más bajo indica una solución más ácida.</p>
            <p>La concentración de iones de hidronio en un tipo particular de café es $${C_str}$ moles por litro.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el pH del café.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="8" color="gray" alto="25"></tlacuache-renglon>
                
                <div style="margin-bottom: 15px;">
                    <p>Un líquido diferente y desconocido tiene ${k} veces la concentración de iones de hidronio del café de la parte (a).</p>
                </div>

                <li>
                    <span class="ib-texto">Determine si el líquido desconocido es más o menos ácido que el café. Justifique su respuesta matemáticamente.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="12" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p><strong>a)</strong> Cálculo del pH</p>
        <p>$$C = ${a} \\times 10^{-${b}}$$</p>
        <p>$$pH = -\\log_{10}(${a} \\times 10^{-${b}})$$</p>
        <p>$$pH = -(\\log_{10}(${a}) + \\log_{10}(10^{-${b}}))$$</p>
        <p>$$pH = -(\\log_{10}(${a}) - ${b})$$</p>
        <p>$$pH \\approx -(${Math.log10(a).toFixed(3)} - ${b})$$</p>
        <p>$$pH \\approx ${pH.toFixed(2)}$$</p>
        <hr>
        <p><strong>b)</strong> Comparación</p>
        <p>Nueva concentración $C' = ${k} \\times C$.</p>
        <p>$$pH' = -\\log_{10}(${k}C) = -(\\log_{10}(${k}) + \\log_{10}(C))$$</p>
        <p>$$pH' = -\\log_{10}(${k}) + pH$$</p>
        <p>$$pH' = -(${log_k}) + ${pH.toFixed(2)} = ${pH_new.toFixed(2)}$$</p>
        <p>El líquido desconocido es <strong>${comparacion}</strong> que el café.</p>
        <p>Justificación: ${justificacion}</p>
    `;

    return { html, respuesta };
}
