import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Álgebra",
    subtema: "1.3. Modelos Financieros",
    seccion: "1.3.1. Interés Compuesto",
    titulo: "Decisión de Inversión a Plazo Fijo",
    puntos: 7,
};

export async function generar(i) {
    const html = `
        <div class="problema-ib">
            <p><strong>${i}.</strong> Ana ha ganado un premio de $50,000 y decide invertirlo en su totalidad durante 5 años para el enganche de un auto. Ha recibido dos ofertas de inversión de diferentes instituciones financieras.</p>
            <ul>
                <li><strong>Banco Confianza:</strong> Ofrece una cuenta de inversión con una tasa de interés del 6% anual, compuesto <strong>mensualmente</strong>.</li>
                <li><strong>Banco Futuro:</strong> Ofrece una cuenta de inversión con una tasa de interés del 5.9% anual, compuesto <strong>diariamente</strong> (considere un año de 365 días).</li>
            </ul>
             
            <br>
            <ol class="ib-lista" type="a">
                <li>
                    <span class="ib-texto">Calcula el valor futuro de la inversión si Ana elige la oferta del Banco Confianza.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Calcula el valor futuro de la inversión si Ana elige la oferta del Banco Futuro.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <li>
                    <span class="ib-texto">Determina qué banco le ofrece un mejor rendimiento a Ana y calcula la diferencia monetaria entre las dos opciones al final del plazo de 5 años.</span>
                    <span class="ib-mark">[3]</span>
                </li>
            </ol>
            <tlacuache-renglon n="16" color="gray" alto="35"></tlacuache-renglon>
        </div>
    `;

    const respuesta = `
        <p><strong>a) Cálculo para Banco Confianza:</strong></p>
        <ul>
            <li>$PV = 50,000$</li>
            <li>$r = 0.06$</li>
            <li>$n = 12$ (capitalización mensual)</li>
            <li>$t = 5$</li>
        </ul>
        <p>$FV = \\$67,442.51$</p>
        <p>El valor futuro con Banco Confianza será de **$67,442.51**.</p>
        <hr>
        <p><strong>b) Cálculo para Banco Futuro:</strong></p>
        <ul>
            <li>$PV = 50,000$</li>
            <li>$r = 0.059$</li>
            <li>$n = 365$ (capitalización diaria)</li>
            <li>$t = 5$</li>
        </ul>
        <p>$FV = $67,154.72.</p>
        <hr>
        <p><strong>c) Comparación y Decisión:</strong></p>
        <p>Al comparar los valores futuros:</p>
        <ul>
            <li>Banco Confianza: $67,442.51</li>
            <li>Banco Futuro: $67,154.72</li>
        </ul>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}
