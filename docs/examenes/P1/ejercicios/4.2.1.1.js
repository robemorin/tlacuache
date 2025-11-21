import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.2. Estadística descriptiva",
    seccion: "4.2.1. Frecuencias simples y acumuladas",
    titulo: "Tabla de frecuencias relativas y probabilidad",
    tipo: 1, // 1 = Abierto
    puntos: 5
};

export async function generar(i) {
    // --- VARIABLES ---
    const nombreEscuela = "Instituto High Valley";
    const totalEstudiantes = 1200;
    
    // Datos de la tabla (Edades y Frecuencias)
    const datos = [
        { edad: 13, freq: 0.11 },
        { edad: 14, freq: 0.30 },
        { edad: 15, freq: 0.23 },
        { edad: 16, freq: 0.21 },
        { edad: 17, freq: 0.15 }
    ];

    // --- HTML DEL PROBLEMA ---
    // Construimos la tabla HTML dinámicamente o fija
    let tablaHTML = `
        <table style="margin: 20px auto; border-collapse: collapse; text-align: center; font-family: sans-serif; width: 60%; max-width: 300px;">
            <thead>
                <tr style="background-color: #f2f2f2; border: 1px solid #000;">
                    <th style="border: 1px solid #000; padding: 8px;">Edad<br><small>(en años)</small></th>
                    <th style="border: 1px solid #000; padding: 8px;">Frecuencia<br>Relativa</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    datos.forEach(d => {
        tablaHTML += `
            <tr>
                <td style="border: 1px solid #000; padding: 6px;">${d.edad}</td>
                <td style="border: 1px solid #000; padding: 6px;">${d.freq.toFixed(2)}</td>
            </tr>
        `;
    });
    
    // Fila de Total
    tablaHTML += `
            <tr style="font-weight: bold;">
                <td style="border: 1px solid #000; padding: 6px;">Total</td>
                <td style="border: 1px solid #000; padding: 6px;">1.00</td>
            </tr>
            </tbody>
        </table>
    `;

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> La siguiente tabla muestra las frecuencias relativas de las edades de los estudiantes del <em>${nombreEscuela}</em>.</p>
            
            ${tablaHTML}

            <ol class="ib-lista">
                <li>
                    <p>Si se selecciona un estudiante al azar de esta escuela, halle la probabilidad de que:</p>
                    <ol>
                        <li>
                            <span class="ib-texto">el estudiante tenga 15 años;</span>
                            <span class="ib-mark">[1]</span>
                        </li>
                        <li>
                            <span class="ib-texto">el estudiante tenga 16 años o más.</span>
                            <span class="ib-mark">[2]</span>
                        </li>
                    </ol>
                </li>
                <li>
                    <span class="ib-texto">Hay ${totalEstudiantes} estudiantes en el <em>${nombreEscuela}</em>. Calcule el número de estudiantes de 15 años.</span>
                    <span class="ib-mark">[2]</span>
                </li>
            </ol>
            
            <tlacuache-renglon n="15" color="gray" alto="25"></tlacuache-renglon>
        </div>
    `;

    // --- CÁLCULOS ---
    // (a)(i) P(15)
    const prob15 = datos.find(d => d.edad === 15).freq;

    // (a)(ii) P(>=16) = P(16) + P(17)
    const prob16 = datos.find(d => d.edad === 16).freq;
    const prob17 = datos.find(d => d.edad === 17).freq;
    const probMayor16 = (prob16 + prob17).toFixed(2); // 0.21 + 0.15 = 0.36

    // (b) Número esperado = Total * P(15)
    const numEstudiantes15 = Math.round(totalEstudiantes * prob15);

    // --- RESPUESTA ---
    const respuestaHTML = `
        <ul style="list-style:none; padding:0;">
            <li><strong>a) (i)</strong> Probabilidad simple: <br>
                La frecuencia relativa para 15 años es <strong>${prob15}</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>a) (ii)</strong> Probabilidad compuesta (suma): <br>
                $P(\\text{edad} \\ge 16) = P(16) + P(17)$ <br>
                $= ${prob16} + ${prob17} = $ <strong>${probMayor16}</strong>.
            </li>
            
            <li style="margin-top:10px;"><strong>b)</strong> Valor esperado / Frecuencia absoluta: <br>
                $N = \\text{Total} \\times \\text{Frecuencia Relativa}$ <br>
                $N = ${totalEstudiantes} \\times ${prob15}$ <br>
                $N = $ <strong>${numEstudiantes15} estudiantes</strong>.
            </li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuestaHTML
    };
}