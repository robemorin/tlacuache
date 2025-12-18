import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1. Conceptos básicos de funciones",
    seccion: "2.1.5. Composición de funciones",
    titulo: "Funciones inversas y compuestas",
    tipo: 1, // 1 = Abierto
    puntos: 6
};

export async function generar(i) {
    // --- VARIABLES ---
    // f(x) = 2x + 3
    const a = 2;
    const b = 3;
    
    // g(x) = x - 5
    const c = 5;
    
    // Valores a evaluar
    const val_i = -3;
    const val_ii = 6;

    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Las funciones $f$ y $g$ se definen como:</p>
            $$ f: x \\mapsto ${a}x + ${b} $$
            $$ g: x \\mapsto x - ${c} $$
            <p>para $x \\in \\mathbb{R}$.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle $g^{-1}(x)$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <p>Evalúe:</p>
                    <ol>
                        <li>
                            <span class="ib-texto">$f(${val_i})$</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                        <li>
                            <span class="ib-texto">$(f \\circ g)(${val_ii})$</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // a) Inversa de g(x) = x - c  ->  y = x - c  ->  x = y + c  ->  g^-1(x) = x + c
    
    // b)(i) f(val_i)
    const res_bi = (a * val_i) + b; // 2(-3) + 3 = -3

    // b)(ii) f(g(val_ii))
    const g_val = val_ii - c;       // 6 - 5 = 1
    const res_bii = (a * g_val) + b; // 2(1) + 3 = 5

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a)</strong> Para hallar la inversa de $g(x) = x - ${c}$: <br>
                Sea $y = x - ${c}$. Intercambiamos variables: $x = y - ${c}$. <br>
                Despejamos $y$: $y = x + ${c}$. <br>
                $g^{-1}(x) =$ <strong>$x + ${c}$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b) (i)</strong> Sustituir $x = ${val_i}$ en $f(x)$: <br>
                $f(${val_i}) = ${a}(${val_i}) + ${b} = ${a*val_i} + ${b} =$ <strong>$${res_bi}$</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b) (ii)</strong> Composición $(f \\circ g)(${val_ii}) = f(g(${val_ii}))$: <br>
                Primero hallamos $g(${val_ii}) = ${val_ii} - ${c} = ${g_val}$. <br>
                Luego hallamos $f(${g_val}) = ${a}(${g_val}) + ${b} = ${a*g_val} + ${b} =$ <strong>$${res_bii}$</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}