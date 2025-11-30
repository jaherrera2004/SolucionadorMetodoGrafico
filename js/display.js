// Funciones para mostrar el procedimiento y la solución

function displayProcedure() {
    const c1 = parseFloat(document.getElementById('c1').value) || 0;
    const c2 = parseFloat(document.getElementById('c2').value) || 0;
    const objType = document.getElementById('objective-type').value === 'max' ? 'Maximizar' : 'Minimizar';

    let html = `<h3>Procedimiento Detallado del Método Gráfico</h3>`;

    // Paso 1: Formulación del problema
    html += `<div class="step">
        <strong>Paso 1: Identificación del Problema</strong><br>
        <strong>Función Objetivo:</strong> ${objType} Z = ${c1}x₁ + ${c2}x₂<br>
        <em>La función objetivo representa la cantidad que queremos ${objType.toLowerCase()} (beneficio, costo, etc.)</em>
    </div>`;

    // Paso 2: Restricciones
    html += `<div class="step">
        <strong>Paso 2: Restricciones del Problema</strong><br>
        <strong>Restricciones estructurales:</strong><br>`;
    constraints.slice(0, -2).forEach((c, i) => {
        html += `• ${c.a1}x₁ + ${c.a2}x₂ ${c.operator} ${c.b}<br>`;
    });
    html += `<strong>Restricciones de no negatividad:</strong><br>
        • x₁ ≥ 0 (la variable x₁ no puede ser negativa)<br>
        • x₂ ≥ 0 (la variable x₂ no puede ser negativa)<br>
        <em>Estas restricciones definen el espacio de soluciones factibles.</em>
    </div>`;

    // Paso 3: Conversión a ecuaciones
    html += `<div class="step">
        <strong>Paso 3: Conversión de Desigualdades a Ecuaciones</strong><br>
        Para encontrar los vértices, convertimos cada restricción en ecuación:<br>`;
    constraints.slice(0, -2).forEach((c, i) => {
        html += `• Línea ${i + 1}: ${c.a1}x₁ + ${c.a2}x₂ = ${c.b}<br>`;
    });
    html += `• Eje x₁: x₁ = 0<br>
        • Eje x₂: x₂ = 0<br>
        <em>Estas líneas forman los límites de la región factible.</em>
    </div>`;

    // Paso 4: Intersecciones
    html += `<div class="step">
        <strong>Paso 4: Cálculo de Intersecciones</strong><br>
        Se calculan las intersecciones entre todas las líneas para encontrar posibles vértices:<br>`;

    let intersectionCount = 0;
    for (let i = 0; i < constraints.length; i++) {
        for (let j = i + 1; j < constraints.length; j++) {
            const intersection = findIntersection(constraints[i], constraints[j]);
            if (intersection) {
                intersectionCount++;
                const feasible = isPointFeasible(intersection);
                const constraintName1 = i >= constraints.length - 2 ?
                    (i === constraints.length - 2 ? 'x₁ = 0' : 'x₂ = 0') :
                    `Restricción ${i + 1}`;
                const constraintName2 = j >= constraints.length - 2 ?
                    (j === constraints.length - 2 ? 'x₁ = 0' : 'x₂ = 0') :
                    `Restricción ${j + 1}`;

                html += `• ${constraintName1} ∩ ${constraintName2}: (${intersection.x1.toFixed(2)}, ${intersection.x2.toFixed(2)}) - ${feasible ? '✓ Factible' : '✗ No factible'}<br>`;
            }
        }
    }
    html += `<em>Solo los puntos factibles forman parte de la región de soluciones.</em>
    </div>`;

    // Paso 5: Vértices factibles
    html += `<div class="step">
        <strong>Paso 5: Vértices de la Región Factible</strong><br>
        Los vértices factibles son los puntos candidatos para la solución óptima:<br>`;
    vertices.forEach((v, i) => {
        const objValue = evaluateObjective(v);
        html += `• V${i + 1}: (${v.x1.toFixed(2)}, ${v.x2.toFixed(2)}) → Z = ${c1}(${v.x1.toFixed(2)}) + ${c2}(${v.x2.toFixed(2)}) = ${objValue.toFixed(2)}<br>`;
    });
    html += `<em>Según el teorema fundamental de programación lineal, la solución óptima se encuentra en uno de estos vértices.</em>
    </div>`;

    // Paso 6: Evaluación y solución
    const bestVertex = vertices.find(v => Math.abs(evaluateObjective(v) - solution.value) < 1e-8);
    const bestIndex = vertices.indexOf(bestVertex) + 1;
    html += `<div class="step">
        <strong>Paso 6: Selección de la Solución Óptima</strong><br>
        Comparando los valores de la función objetivo:<br>`;

    vertices.forEach((v, i) => {
        const objValue = evaluateObjective(v);
        const isBest = Math.abs(objValue - solution.value) < 1e-8;
        html += `• V${i + 1}: Z = ${objValue.toFixed(2)} ${isBest ? '← ÓPTIMO' : ''}<br>`;
    });

    html += `<br><strong>Conclusión:</strong> El vértice V${bestIndex} proporciona el valor ${objType.toLowerCase()} de Z = ${solution.value.toFixed(2)}<br>
        <em>Este es el punto donde se alcanza la solución óptima del problema.</em>
    </div>`;

    // Paso 7: Interpretación
    html += `<div class="step">
        <strong>Paso 7: Interpretación de Resultados</strong><br>
        <strong>Solución:</strong> x₁ = ${solution.point.x1.toFixed(2)}, x₂ = ${solution.point.x2.toFixed(2)}<br>
        <strong>Valor óptimo:</strong> Z = ${solution.value.toFixed(2)}<br>
        <em>Esta solución representa los valores óptimos de las variables de decisión que ${objType.toLowerCase()}n la función objetivo, respetando todas las restricciones del problema.</em>
    </div>`;

    document.getElementById('procedure').innerHTML = html;
}

function displaySolution() {
    if (!solution) return;

    const objType = document.getElementById('objective-type').value === 'max' ? 'máximo' : 'mínimo';
    const html = `
        <h3>Solución Óptima</h3>
        <p><strong>Punto óptimo:</strong> x₁ = ${solution.point.x1.toFixed(2)}, x₂ = ${solution.point.x2.toFixed(2)}</p>
        <p><strong>Valor ${objType}:</strong> Z = ${solution.value.toFixed(2)}</p>
    `;

    document.getElementById('solution').innerHTML = html;
}
