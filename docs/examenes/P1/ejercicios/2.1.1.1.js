import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "2. Funciones",
    subtema: "2.1 Conceptos básicos de funciones",
    seccion: "2.1.1 Notación de funciones",
    titulo: "Evaluación e inversa de una función discreta",
    puntos: 5, // 1 + 1 + 3
};

export async function generar(i) {
    const html = `
        <p><strong>${i}.</strong> Considere la función $f(x)$, que está definida en el dominio de los números enteros comprendidos entre 0 y 4 (ambos inclusive).</p>
        
        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                <tr>
                    <td style="padding: 8px; width: 16.6%;"><strong>$x$</strong></td>
                    <td style="padding: 8px; width: 16.6%;">0</td>
                    <td style="padding: 8px; width: 16.6%;">1</td>
                    <td style="padding: 8px; width: 16.6%;">2</td>
                    <td style="padding: 8px; width: 16.6%;">3</td>
                    <td style="padding: 8px; width: 16.6%;">4</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>$f(x)$</strong></td>
                    <td style="padding: 8px;">3</td>
                    <td style="padding: 8px;">1</td>
                    <td style="padding: 8px;">0</td>
                    <td style="padding: 8px;">4</td>
                    <td style="padding: 8px;">2</td>
                </tr>
            </table>
        </div>

        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">Resuelva $f(x) = 4$.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Resuelva $f(x) = x$.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Complete la siguiente tabla.</span>
                <span class="ib-mark" style="float: right;">[3]</span>
                
            </li>
            <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                        <tr>
                            <td style="padding: 8px; width: 16.6%;"><strong>$x$</strong></td>
                            <td style="padding: 8px; width: 16.6%;">0</td>
                            <td style="padding: 8px; width: 16.6%;">1</td>
                            <td style="padding: 8px; width: 16.6%;">2</td>
                            <td style="padding: 8px; width: 16.6%;">3</td>
                            <td style="padding: 8px; width: 16.6%;">4</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>$f^{-1}(x)$</strong></td>
                            <td style="padding: 8px;"></td>
                            <td style="padding: 8px;"></td>
                            <td style="padding: 8px;"></td>
                            <td style="padding: 8px;"></td>
                            <td style="padding: 8px;"></td>
                        </tr>
                    </table>
                </div>
            <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Buscamos en la tabla el valor de $x$ para el cual $f(x) = 4$.<br>
                Observando la tabla, $f(3) = 4$.<br>
                <strong>$x = 3$</strong>
            </li>
            <br>
            <li>
                Buscamos en la tabla un caso donde el valor de $x$ sea igual al valor de $f(x)$.<br>
                Al revisar las columnas, vemos que para $x = 1$, $f(1) = 1$.<br>
                <strong>$x = 1$</strong>
            </li>
            <br>
            <li>
                La función inversa $f^{-1}(x)$ nos pide encontrar el valor de entrada original que produce el valor de salida $x$. Es decir, buscamos en la fila de $f(x)$ y devolvemos el valor correspondiente en la fila de $x$:<br>
                <ul>
                    <li>Para $x = 0$, $f(2) = 0$, entonces $f^{-1}(0) = 2$.</li>
                    <li>Para $x = 1$, $f(1) = 1$, entonces $f^{-1}(1) = 1$.</li>
                    <li>Para $x = 2$, $f(4) = 2$, entonces $f^{-1}(2) = 4$.</li>
                    <li>Para $x = 3$, $f(0) = 3$, entonces $f^{-1}(3) = 0$.</li>
                    <li>Para $x = 4$, $f(3) = 4$, entonces $f^{-1}(4) = 3$.</li>
                </ul>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table border="1" style="border-collapse: collapse; text-align: center; width: 60%;">
                        <tr>
                            <td style="padding: 8px; width: 16.6%;"><strong>$x$</strong></td>
                            <td style="padding: 8px; width: 16.6%;">0</td>
                            <td style="padding: 8px; width: 16.6%;">1</td>
                            <td style="padding: 8px; width: 16.6%;">2</td>
                            <td style="padding: 8px; width: 16.6%;">3</td>
                            <td style="padding: 8px; width: 16.6%;">4</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>$f^{-1}(x)$</strong></td>
                            <td style="padding: 8px;">2</td>
                            <td style="padding: 8px;">1</td>
                            <td style="padding: 8px;">4</td>
                            <td style="padding: 8px;">0</td>
                            <td style="padding: 8px;">3</td>
                        </tr>
                    </table>
                </div>
            </li>
        </ol>
    `;

    return { html, respuesta };
}