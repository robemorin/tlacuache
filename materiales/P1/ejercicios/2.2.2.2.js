import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.2. Modelos lineales",
    seccion: "2.2.1. Ecuaciones de la recta",
    titulo: "Modelo Lineal (Temperatura)",
    tipo: 1,
    puntos: 6
};

export async function generar(i) {
    // Contexto: Calentamiento de un líquido
    // m = tasa de cambio (grados por minuto). Aleatorio entre 2 y 5.
    const m = Math.floor(Math.random() * 4) + 2;

    // Punto conocido: En el tiempo t1, la temperatura es T1.
    const t1 = Math.floor(Math.random() * 5) + 3; // 3 a 7 minutos
    const c_real = Math.floor(Math.random() * 15) + 10; // Temperatura inicial 10-24
    const T1 = m * t1 + c_real;

    // Objetivo para la parte b (predicción)
    const t2 = t1 + Math.floor(Math.random() * 10) + 5;

    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Un líquido se está calentando en un experimento de laboratorio. 
            La temperatura del líquido, $T$ grados Celsius ($^\\circ$C), aumenta a una razón constante de 
            $${m}^\\circ$C por minuto.</p>
            <p>Se sabe que después de ${t1} minutos, la temperatura es de ${T1}$^\\circ$C.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Halle una expresión para $T$ en función del tiempo $t$ (en minutos).</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcule la temperatura del líquido después de ${t2} minutos.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <p><strong>a)</strong></p>
        <p>Sabemos que la razón de cambio es constante, por lo que es un modelo lineal de la forma $T(t) = mt + c$.</p>
        <p>La pendiente (razón de cambio) es $m = ${m}$.</p>
        <p>Usamos el punto dado $(t, T) = (${t1}, ${T1})$ para hallar $c$:</p>
        <p>$$${T1} = ${m}(${t1}) + c$$</p>
        <p>$$${T1} = ${m * t1} + c$$</p>
        <p>$$c = ${T1} - ${m * t1} = ${c_real}$$</p>
        <p>Por lo tanto, la expresión es: <strong>$T = ${m}t + ${c_real}$</strong>.</p>
        <hr>
        <p><strong>b)</strong></p>
        <p>Sustituimos $t = ${t2}$ en la ecuación encontrada:</p>
        <p>$$T(${t2}) = ${m}(${t2}) + ${c_real}$$</p>
        <p>$$T(${t2}) = ${m * t2} + ${c_real}$$</p>
        <p>$$T(${t2}) = ${m * t2 + c_real}$$</p>
        <p>La temperatura es <strong>${m * t2 + c_real}$^\\circ$C</strong>.</p>
    `;

    return { html, respuesta };
}
