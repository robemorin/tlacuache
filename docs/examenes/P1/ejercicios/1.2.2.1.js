import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.2. Sucesiones y series",
    seccion: "1.2.2. Sucesiones geométricas y sumas parciales",
    titulo: "Sucesiones geométricas - Crecimiento poblacional",
    tipo: 1, // 1 = Abierto
    puntos: 6 // Asignado: [3] para inciso a, [3] para inciso b
};

export async function generar(i) {
    // --- VARIABLES DINÁMICAS ---
    const contextos = [
        {
            tipo: 'hormiguero',
            entidadSingular: 'hormiga',
            entidadPlural: 'hormigas',
            lugar: 'un hormiguero',
            accionInicial: 'se construye un hormiguero y se observa',
            tiempoSingular: 'semana',
            tiempoPlural: 'semanas',
            fraseInicio: 'Al comienzo de la semana 1',
            fraseCrecimiento: 'cada semana',
            frasePreguntaA: 'al comienzo de la semana',
            frasePreguntaB: 'en la semana'
        },
        {
            tipo: 'reserva',
            entidadSingular: 'koala',
            entidadPlural: 'koalas',
            lugar: 'una reserva natural',
            accionInicial: 'se establece un programa de protección de koalas',
            tiempoSingular: 'año',
            tiempoPlural: 'años',
            fraseInicio: 'Al comienzo del año 1',
            fraseCrecimiento: 'cada año',
            frasePreguntaA: 'al comienzo del año',
            frasePreguntaB: 'en el año'
        },
        {
            tipo: 'red_social',
            entidadSingular: 'usuario activo',
            entidadPlural: 'usuarios activos',
            lugar: 'una nueva plataforma web',
            accionInicial: 'se lanza una nueva red social al mercado',
            tiempoSingular: 'mes',
            tiempoPlural: 'meses',
            fraseInicio: 'Al comienzo del mes 1',
            fraseCrecimiento: 'cada mes',
            frasePreguntaA: 'al comienzo del mes',
            frasePreguntaB: 'en el mes'
        }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];

    // Población inicial u1: múltiplos de 10 entre 150 y 350
    const u1 = (Math.floor(Math.random() * 21) + 15) * 10;

    // Tasa de crecimiento porcentual p: entre 8% y 18%
    const p = [8, 10, 12, 15, 16, 18][Math.floor(Math.random() * 6)];
    const r = 1 + (p / 100);

    // Semana/mes/año de evaluación para inciso a (entre 9 y 12)
    const n_eval = Math.floor(Math.random() * 4) + 9;

    // Umbral de población para inciso b (múltiplos de 500 entre 2000 y 4500)
    const target_pop = (Math.floor(Math.random() * 6) + 4) * 500;

    // --- CÁLCULOS ---
    // a) u_n = u1 * r^(n-1)
    const term_a_exacto = u1 * Math.pow(r, n_eval - 1);
    const term_a_redondeado = Math.round(term_a_exacto);

    // Formatear a 3 cifras significativas (estándar IB) si difiere del entero redondeado
    const term_a_3cs = parseFloat(term_a_exacto.toPrecision(3));

    // b) u1 * r^(k-1) > target_pop
    const exact_k = Math.log(target_pop / u1) / Math.log(r) + 1;
    const k = Math.ceil(exact_k);

    // Verificaciones de términos cercanos para el solucionario
    const u_k_minus_1 = u1 * Math.pow(r, k - 2);
    const u_k = u1 * Math.pow(r, k - 1);

    // --- RENDERIZACIÓN HTML ---
    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Como parte de un experimento, ${ctx.accionInicial}. ${ctx.fraseInicio}, se observó que había $${u1}$ ${ctx.entidadPlural}. El número de ${ctx.entidadPlural} fue aumentando un $${p}\\%$ ${ctx.fraseCrecimiento}.</p>
            
            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Calcule el número de ${ctx.entidadPlural} que hay ${ctx.frasePreguntaA} $${n_eval}$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <li>
                    <span class="ib-texto">El número de ${ctx.entidadPlural} superó por primera vez las $${target_pop.toLocaleString()}$ ${ctx.frasePreguntaB} $k$. Halle el valor de $k$.</span>
                    <span class="ib-mark">[3]</span>
                </li>
                <tlacuache-renglon n="17" color="gray" alto="25"></tlacuache-renglon>
            </ol>
        </div>
    `;

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li><strong>Identificación del modelo:</strong> <br>
                El crecimiento de la población sigue una progresión geométrica donde: <br>
                El primer término es $u_1 = ${u1}$. <br>
                La razón común es $r = 1 + \\frac{${p}}{100} = ${r}$.
            </li>
            <br>
            <li><strong>a)</strong> Calcular el término $u_{${n_eval}}$: <br>
                Usando la fórmula del término general $u_n = u_1 \\cdot r^{n-1}$: <br>
                $u_{${n_eval}} = ${u1} \\cdot (${r})^{${n_eval} - 1}$ <br>
                $u_{${n_eval}} = ${u1} \\cdot (${r})^{${n_eval - 1}} \\approx ${term_a_exacto.toFixed(2)}$ <br>
                $u_{${n_eval}} \\approx$ <strong>$${term_a_redondeado}$</strong> (o <strong>$${term_a_3cs}$</strong> si se redondea a 3 cifras significativas).
            </li>
            <br>
            <li><strong>b)</strong> Plantear la desigualdad $u_k > ${target_pop}$: <br>
                $${u1} \\cdot (${r})^{k-1} > ${target_pop}$ <br>
                $(${r})^{k-1} > \\frac{${target_pop}}{${u1}} = ${parseFloat((target_pop / u1).toFixed(4))}$ <br>
                Tomando logaritmos en ambos miembros: <br>
                $(k-1) \\ln(${r}) > \\ln(${parseFloat((target_pop / u1).toFixed(4))})$ <br>
                $k-1 > \\frac{\\ln(${parseFloat((target_pop / u1).toFixed(4))})}{\\ln(${r})} \\approx \\frac{${Math.log(target_pop / u1).toFixed(5)}}{${Math.log(r).toFixed(5)}} \\approx ${parseFloat((exact_k - 1).toFixed(3))}$ <br>
                $k > ${parseFloat(exact_k.toFixed(3))}$ <br>
                Dado que $k$ debe ser un número entero, la población supera las $${target_pop.toLocaleString()}$ por primera vez en la semana/año/mes: <br>
                $k = $ <strong>$${k}$</strong>.
                <br><br>
                <em>Verificación de términos:</em> <br>
                $u_{${k - 1}} = ${u1} \\cdot (${r})^{${k - 2}} \\approx ${Math.round(u_k_minus_1)}$ <br>
                $u_{${k}} = ${u1} \\cdot (${r})^{${k - 1}} \\approx ${Math.round(u_k)}$ (superando el umbral de $${target_pop}$).
            </li>
        </ul>
    `;

    return { html, respuesta: respuestaHTML };
}
