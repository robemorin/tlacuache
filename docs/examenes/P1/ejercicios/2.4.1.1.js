import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.4. Modelos exponenciales",
    seccion: "2.4.1. Funciones de crecimiento y decaimiento exponencial",
    titulo: "Crecimiento bacteriano",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    const N_inicial = 150;
    const base = 2;
    
    const horas_b = 3;
    const objetivo_c = 19200;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> En un experimento, los investigadores encontraron que un cultivo específico de bacterias aumenta en número según la fórmula:</p>
            
            $$ N = ${N_inicial} \\times ${base}^t $$
            
            <p>donde $N$ es el número de bacterias presentes y $t$ es el número de horas desde que comenzó el experimento.</p>
            <p>Utilice esta fórmula para calcular:</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">el número de bacterias presentes al inicio del experimento;</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <li>
                    <span class="ib-texto">el número de bacterias presentes después de ${horas_b} horas;</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">el número de horas que tomaría para que el número de bacterias alcance ${objetivo_c}.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // a) t=0
    const resA = N_inicial; 

    // b) t=3
    const resB = N_inicial * Math.pow(base, horas_b); // 150 * 8 = 1200

    // c) N = 19200, despejar t
    // 19200 = 150 * 2^t  =>  2^t = 19200 / 150 = 128
    // t = log2(128)
    const cociente = objetivo_c / N_inicial;
    const resC = Math.log(cociente) / Math.log(base); // Debería dar 7 exacto

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Al inicio del experimento, $t = 0$. <br>
                $N = ${N_inicial} \\times ${base}^0 = ${N_inicial} \\times 1 =$ <strong>${resA} bacterias</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Sustituimos $t = ${horas_b}$: <br>
                $N = ${N_inicial} \\times ${base}^${horas_b} = ${N_inicial} \\times ${Math.pow(base, horas_b)} =$ <strong>${resB} bacterias</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>c)</strong> Igualamos $N$ a ${objetivo_c} y despejamos $t$: <br>
                $${objetivo_c} = ${N_inicial} \\times ${base}^t$ <br>
                $\\frac{${objetivo_c}}{${N_inicial}} = ${base}^t$ <br>
                $${cociente} = ${base}^t$ <br>
                $t = \\log_${base}(${cociente}) = $ <strong>${resC} horas</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
