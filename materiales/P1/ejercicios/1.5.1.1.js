import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "1. Número y Álgebra",
    subtema: "1.5. Sistemas de ecuaciones",
    seccion: "1.5.1. Resolución de sistemas lineales",
    titulo: "Venta de Boletos (Sistemas)",
    tipo: 1,
    puntos: 4,
};

export async function generar(i) {
    // --- VARIABLES ALEATORIAS ---
    // Contexto: Boletos de cine o concierto.
    // Precio Adulto (A): 100 - 200
    const priceA = (Math.floor(Math.random() * 11) + 10) * 10; // 100, 110, ... 200

    // Precio Niño (C): 50 - 90
    const priceC = (Math.floor(Math.random() * 5) + 5) * 10; // 50, 60, ... 90

    // Cantidad Adultos (x): 50 - 150
    const x_real = Math.floor(Math.random() * 101) + 50;

    // Cantidad Niños (y): 30 - 100
    const y_real = Math.floor(Math.random() * 71) + 30;

    // Totales
    const totalTickets = x_real + y_real;
    const totalMoney = (x_real * priceA) + (y_real * priceC);

    const html = `
        <div class="problema-ib">
            <div class="totalMarks">[Total: ${metadata.puntos}]</div>
            <p><strong>${i}.</strong> Un grupo de estudiantes organiza un concierto benéfico.</p>
            <p>Se venden dos tipos de boletos: Boletos para <strong>Adultos</strong> a <strong>$${priceA}</strong> cada uno y boletos para <strong>Niños</strong> a <strong>$${priceC}</strong> cada uno.</p>
            <p>En total, se vendieron <strong>${totalTickets}</strong> boletos y la recaudación total fue de <strong>$${totalMoney.toLocaleString('es-MX')}</strong>.</p>
            
            <p>Sean $x$ el número de boletos de adulto vendidos y $y$ el número de boletos de niño vendidos.</p>

            <ol class="ib-lista">
                <li>
                    <span class="ib-texto">Escriba un sistema de dos ecuaciones lineales que represente esta información.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>

                <li>
                    <span class="ib-texto">Halle el número de boletos de adulto y el número de boletos de niño que se vendieron.</span>
                    <span class="ib-mark">[2]</span>
                </li>
                <tlacuache-renglon n="6" color="gray" alto="25"></tlacuache-renglon>
                
            </ol>
        </div>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        
        <p><strong>a) Sistema de Ecuaciones:</strong></p>
        <p>1. Total de boletos: $x + y = ${totalTickets}$</p>
        <p>2. Total de dinero: $${priceA}x + ${priceC}y = ${totalMoney}$</p>
        <hr>
        
        <p><strong>b) Solución:</strong></p>
        <p>Podemos usar el método de sustitución, eliminación o GDC (PolySimult 2).</p>
        <p>De (1): $y = ${totalTickets} - x$</p>
        <p>Sustituyendo en (2):</p>
        <p>$${priceA}x + ${priceC}(${totalTickets} - x) = ${totalMoney}$</p>
        <p>$${priceA}x + ${priceC * totalTickets} - ${priceC}x = ${totalMoney}$</p>
        <p>$${priceA - priceC}x = ${totalMoney} - ${priceC * totalTickets}$</p>
        <p>$${priceA - priceC}x = ${totalMoney - priceC * totalTickets}$</p>
        <p>$x = \\frac{${totalMoney - priceC * totalTickets}}{${priceA - priceC}} = <strong>${x_real}</strong>$</p>
        <p>Entonces $y = ${totalTickets} - ${x_real} = <strong>${y_real}</strong>$</p>
        <p>Se vendieron <strong>${x_real} boletos de adulto</strong> y <strong>${y_real} boletos de niño</strong>.</p>
        <hr>
        
        <p><strong>c) Dinero faltante:</strong></p>
        <p>Meta: $${(totalMoney * 1.1).toLocaleString('es-MX')}$</p>
        <p>Recaudado: $${totalMoney.toLocaleString('es-MX')}$</p>
        <p>Diferencia: $${(totalMoney * 1.1 - totalMoney).toLocaleString('es-MX')}$</p>
        <p>Hacía falta recaudar <strong>$${(totalMoney * 0.1).toLocaleString('es-MX')}</strong> más.</p>
    `;

    return {
        html: html,
        respuesta: respuesta
    };
}