import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "4. Estadística y Probabilidad",
    subtema: "4.4. Probabilidad",
    seccion: "4.4.2. Probabilidad simple",
    titulo: "Ficha: Conceptos de Probabilidad Simple",
    puntos: 10,
};

export async function generar(i) {
    // ==========================================
    // EJERCICIO 1: SELECCIÓN DE BOLAS EN URNA (4 PUNTOS)
    // ==========================================
    // Generación de cantidades aleatorias
    const rojas = Math.floor(Math.random() * 4) + 5; // 5 a 8
    const azules = Math.floor(Math.random() * 4) + 6; // 6 a 9
    const verdes = Math.floor(Math.random() * 3) + 3; // 3 a 5
    const totalUrna = rojas + azules + verdes;

    const probAzul = azules / totalUrna;
    const probNoRoja = (azules + verdes) / totalUrna;

    // ==========================================
    // EJERCICIO 2: ESTUDIANTES Y MATERIAS (4 PUNTOS)
    // ==========================================
    const totalEstudiantes = 30;
    const mate = Math.floor(Math.random() * 5) + 15; // 15 a 19
    const fisica = Math.floor(Math.random() * 4) + 12; // 12 a 15
    const ambos = Math.floor(Math.random() * 3) + 5; // 5 a 7

    // Cálculos de teoría de conjuntos
    const soloMate = mate - ambos;
    const soloFisica = fisica - ambos;
    const ninguno = totalEstudiantes - (soloMate + soloFisica + ambos);

    const probSoloFisica = soloFisica / totalEstudiantes;
    const probNinguno = ninguno / totalEstudiantes;

    // ==========================================
    // EJERCICIO 3: ENFOQUE ALGEBRAICO CON CHOCOLATES (2 PUNTOS)
    // ==========================================
    // En una caja hay x chocolates con leche y 2x + 2 chocolates amargos.
    // La probabilidad de elegir uno con leche es 1/4.
    // x / (3x + 2) = 1/4 => 4x = 3x + 2 => x = 2.
    // Para variar el multiplicador y el denominador:
    // x chocolates con leche, cx + d amargos.
    // Total = (c+1)x + d.
    // Probabilidad = x / ((c+1)x + d) = 1 / K.
    // K x = (c+1)x + d => x (K - c - 1) = d.
    // Queremos que x sea entero. Elegimos K, c tal que K - c - 1 = 1 => K = c + 2.
    // Entonces x = d.
    // E.g., c = 2, d = 4 => K = 4.
    // x con leche, 2x + 4 amargos. Probabilidad leche = 1/4.
    // Solución: x = 4. Total = 3x + 4 = 16.
    const c = 2;
    const d = Math.floor(Math.random() * 3) + 3; // 3 a 5
    const K = c + 2; // siempre c + 2 = 4
    const x_sol = d;
    const amargos_expr = `${c}x + ${d}`;
    const total_expr = `${c+1}x + ${d}`;
    const total_chocolates = (c+1)*x_sol + d;

    const html = `
        <div class="problema-ib" style="margin-bottom: 20px; font-family: 'Outfit', sans-serif;">
            <!-- SECCIÓN DE ENUNCIADOS -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #222; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 1.45em; text-transform: uppercase;">Ficha de Trabajo: Probabilidad Simple</h2>
                    <p style="margin: 3px 0; font-size: 0.9em; color: #555;">Tema: Probabilidad Teórica y Enfoque Algebraico</p>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; border: 2px solid #222; padding: 6px 12px; border-radius: 4px; font-size: 1.1em;">Puntos: 10</span>
                </div>
            </div>

            <!-- Ejercicio 1 -->
            <div style="margin-bottom: 25px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 1.</strong> Una urna contiene exclusivamente $${rojas}$ bolas rojas, $${azules}$ bolas azules y $${verdes}$ bolas verdes. Se extrae una bola al azar de la urna.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Halle la probabilidad de que la bola extraída sea de color azul.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Halle la probabilidad de que la bola extraída no sea de color rojo.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="3" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <div style="page-break-before: always; break-before: page;"></div>

            <!-- Ejercicio 2 -->
            <div style="margin-bottom: 25px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 2.</strong> En un grupo de $${totalEstudiantes}$ estudiantes de bachillerato, $${mate}$ estudian Matemáticas, $${fisica}$ estudian Física y $${ambos}$ estudian ambas asignaturas. Se elige un estudiante al azar del grupo.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        a) Calcule la probabilidad de que el estudiante elegido estudie Física pero no Matemáticas.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                </div>

                <div style="margin-left: 10px; margin-top: 20px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        b) Calcule la probabilidad de que el estudiante elegido no estudie ninguna de las dos asignaturas.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="4" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>

            <!-- Ejercicio 3 -->
            <div style="margin-bottom: 25px; margin-top: 15px;">
                <p style="font-size: 1.05em; line-height: 1.5; margin: 0 0 15px 0;">
                    <strong>Ejercicio 3.</strong> Una caja contiene $x$ chocolates con leche y $${amargos_expr}$ chocolates amargos. Se sabe que la probabilidad de extraer al azar un chocolate con leche es exactamente de $\\frac{1}{${K}}$.
                </p>

                <div style="margin-left: 10px; margin-top: 15px;">
                    <p style="font-weight: bold; margin-bottom: 8px;">
                        Halle el valor de $x$ y determine la cantidad total de chocolates en la caja.
                        <span style="float: right; font-weight: normal; color: #555;">[2 puntos]</span>
                    </p>
                    <tlacuache-renglon n="5" color="gray" alto="25"></tlacuache-renglon>
                </div>
            </div>
        </div>
    `;

    const respuesta = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p style="font-size: 1.1em; border-bottom: 2px solid #333; padding-bottom: 5px;">
                <strong>Solucionario Oficial y Esquema de Calificación (Ficha ${i})</strong>
            </p>

            <div style="margin-bottom: 20px; border-left: 3px solid #3d85c6; padding-left: 10px;">
                <strong>Ejercicio 1 [4 Puntos]:</strong><br>
                * Total de bolas en la urna: $Total = ${rojas} + ${azules} + ${verdes} = ${totalUrna}$.<br>
                * <strong>a) Bola azul [2 puntos]</strong>: $P(\\text{Azul}) = \\frac{${azules}}{${totalUrna}} \\approx \\mathbf{${probAzul.toFixed(3)}}$.<br>
                * <strong>b) Bola no roja [2 puntos]</strong>: $P(\\text{No Roja}) = 1 - P(\\text{Roja}) = \\frac{${azules} + ${verdes}}{${totalUrna}} = \\frac{${azules + verdes}}{${totalUrna}} \\approx \\mathbf{${probNoRoja.toFixed(3)}}$.
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #e06666; padding-left: 10px;">
                <strong>Ejercicio 2 [4 Puntos]:</strong><br>
                * Estudiantes que solo estudian Física: $SoloFisica = Fisica - Ambos = ${fisica} - ${ambos} = ${soloFisica}$.<br>
                * Estudiantes que solo estudian Matemáticas: $SoloMate = Mate - Ambos = ${mate} - ${ambos} = ${soloMate}$.<br>
                * Estudiantes que estudian al menos una materia: $${soloMate} + ${soloFisica} + ${ambos} = ${soloMate + soloFisica + ambos}$.<br>
                * Estudiantes que no estudian ninguna: $Ninguno = ${totalEstudiantes} - ${soloMate + soloFisica + ambos} = ${ninguno}$.<br>
                * <strong>a) Física pero no Matemáticas [2 puntos]</strong>: $P(\\text{Solo Física}) = \\frac{${soloFisica}}{${totalEstudiantes}} \\approx \\mathbf{${probSoloFisica.toFixed(3)}}$ (o $\\frac{${soloFisica}}{30}$).<br>
                * <strong>b) Ninguna asignatura [2 puntos]</strong>: $P(\\text{Ninguna}) = \\frac{${ninguno}}{${totalEstudiantes}} \\approx \\mathbf{${probNinguno.toFixed(3)}}$ (o $\\frac{${ninguno}}{30}$).
            </div>

            <div style="margin-bottom: 20px; border-left: 3px solid #6aa84f; padding-left: 10px;">
                <strong>Ejercicio 3 [2 Puntos]:</strong><br>
                * Escribir el total de chocolates en términos de $x$: $Total = x + (${amargos_expr}) = ${total_expr}$.<br>
                * Plantear la ecuación de la probabilidad simple:<br>
                $P(\\text{Leche}) = \\frac{x}{${total_expr}} = \\frac{1}{${K}}$ [1 punto]<br>
                * Resolver la ecuación:<br>
                $${K}x = ${total_expr} \\implies ${K}x - ${c+1}x = ${d} \\implies x = \\mathbf{${x_sol}}$ [1 punto]<br>
                * Total de chocolates en la caja: $Total = ${c+1}(${x_sol}) + ${d} = \\mathbf{${total_chocolates}\\text{ chocolates}}$.
            </div>
        </div>
    `;

    return { html, respuesta, numPreguntas: 1 };
}
