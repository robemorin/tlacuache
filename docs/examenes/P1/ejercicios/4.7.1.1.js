import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Prueba t",
    titulo: "Prueba t de Student - Cálculo manual y Conclusión",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES DINÁMICAS ---
    const n1 = Math.floor(Math.random() * 5) + 10; // entre 10 y 14
    const n2 = Math.floor(Math.random() * 5) + 10; // entre 10 y 14
    
    // Grados de libertad para 2 muestras (varianzas combinadas)
    const gl = n1 + n2 - 2;
    
    // Valores de estadísticos (inventados para lógica procedimental)
    const t_calc = (Math.random() * 0.8 + 1.2).toFixed(2); // entre 1.20 y 2.00
    // Siempre haremos que el crítico sea un poco mayor o menor para variar.
    const esSignificativo = Math.random() > 0.5;
    
    const t_crit = esSignificativo ? (parseFloat(t_calc) - 0.2).toFixed(2) : (parseFloat(t_calc) + 0.2).toFixed(2);

    const signo_comparacion = esSignificativo ? ">" : "<";
    const conclusion = esSignificativo 
        ? "Se rechaza $H_0$ (hay evidencia de una diferencia significativa)." 
        : "No se rechaza $H_0$ (no hay evidencia sucifiente de una diferencia significativa).";

    // --- HTML DEL PROBLEMA ---
    const html = `
        <div class="problema-ib">            
            <p><strong>${i}.</strong> Un investigador realiza una prueba $t$ de Student de dos colas para muestras independientes, con el objetivo de comparar las medias de dos poblaciones que se asume tienen varianzas iguales.</p>
            <p>El investigador extrae una muestra de tamaño $n_1 = ${n1}$ de la primera población y una muestra de tamaño $n_2 = ${n2}$ de la segunda población. Un análisis parcial de los datos produce un estadístico de prueba calculado $t = ${t_calc}$. El valor crítico asociado para el nivel de significancia del $5\\%$ es igual a $${t_crit}$.</p>
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba la hipótesis nula, $H_0$, para esta prueba.</span>
                    <span class="ib-mark">[1]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Halle el número de grados de libertad de esta prueba.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                <li>
                    <span class="ib-texto">Indique, justificando su respuesta, la conclusión de la prueba $t$.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            <tlacuache-renglon n="6" color="gray" alto="30"></tlacuache-renglon>
        </div>
    `;

    // --- RESPUESTA FORMATEADA (Solucionario) ---
    const respuestaHTML = `
        <ul style="list-style: none; padding:0; margin:0;">
            <li><strong>a)</strong> $H_0: \\mu_1 = \\mu_2$ (o equivalente, "No hay diferencia entre las medias poblacionales").</li>
            <li><strong>b)</strong> $\\text{gl} = n_1 + n_2 - 2$<br>
                $\\text{gl} = ${n1} + ${n2} - 2 = $ <strong>${gl}</strong>
            </li>
            <li><strong>c)</strong> Como $|t_{calc}| = ${t_calc}$ y el valor crítico es $${t_crit}$:<br>
                $${t_calc} ${signo_comparacion} ${t_crit}$<br>
                <strong>${conclusion}</strong>
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}
