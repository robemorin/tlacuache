import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.4. Modelos exponenciales",
    seccion: "2.4.2. Funciones de surgimiento",
    titulo: "Concentración de Medicamento (Surgimiento)",
    tipo: 1,
    puntos: 7,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // E(t) = A * t * B^(-t)
    // A: Coeficiente de escala. 
    const A = (Math.floor(Math.random() * 6) + 4) * 100; // 400, 500, ..., 900. Original 640 -> usemos 640 aprox
    // Hagamos algo como 500-800
    // Mejor valores más "limpios":
    const scale = Math.floor(Math.random() * 5) + 5; // 5-9
    const A_val = scale * 80; // Ej: 400, 480, 560, 640...

    // B: Base del decaimiento.
    // Para que el pico no sea tan rápido, B cercano a 1 o mayor.
    // Original: 4^(-t) = (1/4)^t = e^(-ln4 * t). Pico en t = 1/ln4 ~ 0.72.
    // Probemos B entre 2 y 5.
    const B_val = Math.floor(Math.random() * 3) + 2; // 2, 3, 4

    // Función JS para evaluar
    const E = (t) => A_val * t * Math.pow(B_val, -t);

    // --- CÁLCULOS ---
    // a) E(1) y E(t2)
    const t2 = 4; // Fijo 4 como en el ejemplo, o random. 4 es buen punto lejano.
    // Usaremos t_eval_1 = 1, t_eval_2 = ? 
    // Si B=2, max en 1/ln2 ~ 1.44. t=4 está bien en la cola.
    const val_1 = E(1);
    const val_4 = E(t2);

    // b) Gráfica.
    // Generamos puntos para tlacuache-plot
    const xPoints = [];
    const yPoints = [];
    for (let j = 0; j <= 50; j++) {
        const x = j * 0.1; // 0 to 5
        xPoints.push(x.toFixed(2));
        yPoints.push(E(x).toFixed(2));
    }

    // c) Turning Point (Máximo)
    // Derivada de t * B^-t:
    // f'(t) = B^-t + t * B^-t * ln(B) * (-1)
    // f'(t) = B^-t * (1 - t ln B)
    // Cero cuando 1 - t ln B = 0 -> t_max = 1 / ln B
    const t_max = 1 / Math.log(B_val);
    const max_val = E(t_max);

    // Significance: It's the max effect.

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Cuando se administra un anestésico, su efecto en el cuerpo se modela mediante la función:</p>
            <p style="text-align:center; font-size:1.1em;">$$E(t) = ${A_val}t \\times ${B_val}^{-t}$$</p>
            <p>donde $t \\ge 0$ es el tiempo en horas después de la inyección.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">
                        Halle:
                        <ol style="margin-top:5px;">
                            <li style="justify-content: flex-start;">$E(1)$</li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                            <li style="justify-content: flex-start;">$E(${t2})$</li><tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                        </ol>
                    </span>
                    <span class="ib-mark">[3]</span>
                </li>
                <br>
                <li>
                    <span class="ib-texto">Interprete sus respuestas del inciso (a) en el contexto del problema.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="1" color="gray" alto="25"></tlacuache-renglon>
                
                <li>
                    <span class="ib-texto">Bosqueje la gráfica de $E(t)$ para $0 \\le t \\le 5$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <center>
                <tlacuache-milimetrado size="166,400" cuadricula="5,12"  n="5" color = 'RGB(200, 64, 64)'  stroke = ".7" stroke2 = ".1">
                </tlacuache-milimetrado>
                </center>
                <br>
                
                <li>
                    <span class="ib-texto">Escriba las coordenadas del punto máximo (punto de inflexión de la curva) de $E(t)$. Explique el significado de este punto.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="2" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Evaluación:</strong></p>
        <ul>
            <li>(i) $t=1$: $E(1) = ${A_val}(1) \\times ${B_val}^{-1} = \\frac{${A_val}}{${B_val}} = $ <strong>${val_1.toFixed(2)}</strong> unidades.</li>
            <li>(ii) $t=${t2}$: $E(${t2}) = ${A_val}(${t2}) \\times ${B_val}^{-${t2}}$<br>
                $E(${t2}) = ${A_val * t2} \\times \\frac{1}{${Math.pow(B_val, t2)}}$<br>
                $E(${t2}) \\approx $ <strong>${val_4.toFixed(2)}</strong> unidades.
            </li>
        </ul>
        <hr>
        
        <p><strong>b) Interpretación:</strong></p>
        <p>Los valores representan el nivel de efectividad (o concentración) del anestésico en el cuerpo 1 hora y 4 horas después de la inyección, respectivamente.</p>
        <hr>
        
        <p><strong>c) Gráfica:</strong></p>
        <p>La curva debe iniciar en $(0,0)$, subir hasta un máximo cerca de $t=${t_max.toFixed(2)}$ y luego descender asintóticamente hacia 0.</p>
        <div style="display:flex; justify-content:center; margin:10px 0;">
            <tlacuache-ejes size="200, 300" xlim="-0.5, 5.5" ylim="-10, ${Math.ceil(max_val * 1.2)}" xlabel="t" ylabel="E">
                <tlacuache-plot x="[${xPoints}]" y="[${yPoints}]" color="blue" width="2"></tlacuache-plot>
            </tlacuache-ejes>
        </div>
        <hr>
        
        <p><strong>d) Punto Máximo:</strong></p>
        <p>Usando la CPG (Calculadora de Pantalla Gráfica) o derivadas:</p>
        <p>El máximo ocurre cuando $t = \\frac{1}{\\ln ${B_val}} \\approx ${t_max.toFixed(4)}$ horas.</p>
        <p>Valor máximo $E(${t_max.toFixed(2)}) \\approx ${max_val.toFixed(2)}$.</p>
        <p>Punto: <strong>(${t_max.toFixed(2)}, ${max_val.toFixed(2)})</strong>.</p>
        <p><strong>Significado:</strong> Es el momento en que el anestésico tiene su <strong>máximo efecto</strong> en el cuerpo.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
