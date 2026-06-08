import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export const metadata = {
    tema: "Estadística y Probabilidad",
    subtema: "Correlación y regresión",
    seccion: "Coeficiente de correlación de rangos de Spearman",
    titulo: "Ranking de perros pastores",
    puntos: 6, // 1 + 4 + 1
};

export async function generar(i) {
    const html = `
        <p><strong>${i}.</strong> Dos jueces —Brett y Clarence— elaboran un ranking con los niveles de habilidad de ocho perros pastores en una competición. Los perros pastores están etiquetados de la A a la H y los jueces clasifican a los perros concediéndoles los rangos que se muestran en la tabla.</p>
        
        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <table border="1" style="border-collapse: collapse; text-align: center; width: 90%;">
                <tr>
                    <td style="padding: 8px;"><strong>Posición en el ranking</strong></td>
                    <td style="padding: 8px;">1</td>
                    <td style="padding: 8px;">2</td>
                    <td style="padding: 8px;">3</td>
                    <td style="padding: 8px;">4</td>
                    <td style="padding: 8px;">5</td>
                    <td style="padding: 8px;">6</td>
                    <td style="padding: 8px;">7</td>
                    <td style="padding: 8px;">8</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Brett</strong></td>
                    <td style="padding: 8px;">A</td>
                    <td style="padding: 8px;">C</td>
                    <td style="padding: 8px;">D</td>
                    <td style="padding: 8px;">B</td>
                    <td style="padding: 8px;">E</td>
                    <td style="padding: 8px;">F</td>
                    <td style="padding: 8px;">G</td>
                    <td style="padding: 8px;">H</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Clarence</strong></td>
                    <td style="padding: 8px;">A</td>
                    <td style="padding: 8px;">B</td>
                    <td style="padding: 8px;">D</td>
                    <td style="padding: 8px;">C</td>
                    <td style="padding: 8px;">E</td>
                    <td style="padding: 8px;">G</td>
                    <td style="padding: 8px;">F</td>
                    <td style="padding: 8px;">H</td>
                </tr>
            </table>
        </div>

        <ol class="ib-lista" type="a">
            <li>
                <span class="ib-texto">Escriba el rango que Brett ha concedido al perro pastor B.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="2" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Calcule, para estos datos, el coeficiente de correlación por rangos de Spearman.</span>
                <span class="ib-mark">[4]</span>
            </li>
            <tlacuache-renglon n="12" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>

            <li>
                <span class="ib-texto">Comente la respuesta que ha dado en el apartado (b) en función de los rangos concedidos por Brett y por Clarence.</span>
                <span class="ib-mark">[1]</span>
            </li>
            <tlacuache-renglon n="3" color="gray" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
        </ol>
    `;

    const respuesta = `
        <p><strong>Solución:</strong></p>
        <ol class="ib-lista" type="a">
            <li>
                Observando la fila de Brett, el perro B se encuentra en la posición 4.<br>
                <strong>Rango = 4</strong>
            </li>
            <br>
            <li>
                Primero, tabulamos los rangos asignados a cada perro por ambos jueces para calcular las diferencias $d$ y sus cuadrados $d^2$:
                <div style="display: flex; justify-content: center; margin: 10px 0;">
                    <table border="1" style="border-collapse: collapse; text-align: center; width: 70%;">
                        <tr>
                            <td style="padding: 5px;"><strong>Perro</strong></td>
                            <td style="padding: 5px;">A</td>
                            <td style="padding: 5px;">B</td>
                            <td style="padding: 5px;">C</td>
                            <td style="padding: 5px;">D</td>
                            <td style="padding: 5px;">E</td>
                            <td style="padding: 5px;">F</td>
                            <td style="padding: 5px;">G</td>
                            <td style="padding: 5px;">H</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Brett</strong></td>
                            <td style="padding: 5px;">1</td>
                            <td style="padding: 5px;">4</td>
                            <td style="padding: 5px;">2</td>
                            <td style="padding: 5px;">3</td>
                            <td style="padding: 5px;">5</td>
                            <td style="padding: 5px;">6</td>
                            <td style="padding: 5px;">7</td>
                            <td style="padding: 5px;">8</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Clarence</strong></td>
                            <td style="padding: 5px;">1</td>
                            <td style="padding: 5px;">2</td>
                            <td style="padding: 5px;">4</td>
                            <td style="padding: 5px;">3</td>
                            <td style="padding: 5px;">5</td>
                            <td style="padding: 5px;">7</td>
                            <td style="padding: 5px;">6</td>
                            <td style="padding: 5px;">8</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>$d$</strong></td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">2</td>
                            <td style="padding: 5px;">-2</td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">-1</td>
                            <td style="padding: 5px;">1</td>
                            <td style="padding: 5px;">0</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>$d^2$</strong></td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">4</td>
                            <td style="padding: 5px;">4</td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">0</td>
                            <td style="padding: 5px;">1</td>
                            <td style="padding: 5px;">1</td>
                            <td style="padding: 5px;">0</td>
                        </tr>
                    </table>
                </div>
                Sumatoria de $d^2 = 0 + 4 + 4 + 0 + 0 + 1 + 1 + 0 = 10$<br>
                Utilizando la fórmula (o la calculadora gráfica):<br>
                $r_s = 1 - \\frac{6 \\sum d^2}{n(n^2 - 1)}$<br>
                $r_s = 1 - \\frac{6(10)}{8(8^2 - 1)}$<br>
                $r_s = 1 - \\frac{60}{8(63)}$<br>
                $r_s = 1 - \\frac{60}{504} \\approx 0.88095...$<br>
                <strong>$r_s \\approx 0.881$</strong>
            </li>
            <br>
            <li>
                <strong>Comentario:</strong> Existe una correlación positiva fuerte (cercana a 1). Esto indica que hay un nivel de acuerdo alto entre Brett y Clarence respecto a los niveles de habilidad de los perros pastores.
            </li>
        </ol>
    `;

    return { html, respuesta };
}