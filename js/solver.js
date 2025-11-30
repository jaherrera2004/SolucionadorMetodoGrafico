// Funciones para resolver el problema de programación lineal

function findIntersection(c1, c2) {
    // Resuelve el sistema de ecuaciones para encontrar intersección
    const det = c1.a1 * c2.a2 - c1.a2 * c2.a1;

    if (Math.abs(det) < 1e-10) return null; // Líneas paralelas

    const x1 = (c1.b * c2.a2 - c1.a2 * c2.b) / det;
    const x2 = (c1.a1 * c2.b - c1.b * c2.a1) / det;

    return { x1, x2 };
}

function isPointFeasible(point) {
    for (let constraint of constraints) {
        const value = constraint.a1 * point.x1 + constraint.a2 * point.x2;

        if (constraint.operator === '<=' && value > constraint.b + 1e-10) return false;
        if (constraint.operator === '>=' && value < constraint.b - 1e-10) return false;
        if (constraint.operator === '=' && Math.abs(value - constraint.b) > 1e-10) return false;
    }
    return true;
}

function findVertices() {
    vertices = [];

    // Encontrar intersecciones de todas las combinaciones de restricciones
    for (let i = 0; i < constraints.length; i++) {
        for (let j = i + 1; j < constraints.length; j++) {
            const intersection = findIntersection(constraints[i], constraints[j]);

            if (intersection && isPointFeasible(intersection)) {
                // Verificar si ya existe este vértice
                const exists = vertices.some(v =>
                    Math.abs(v.x1 - intersection.x1) < 1e-8 &&
                    Math.abs(v.x2 - intersection.x2) < 1e-8
                );

                if (!exists) {
                    vertices.push(intersection);
                }
            }
        }
    }
}

function evaluateObjective(point) {
    const c1 = parseFloat(document.getElementById('c1').value) || 0;
    const c2 = parseFloat(document.getElementById('c2').value) || 0;
    return c1 * point.x1 + c2 * point.x2;
}

function solve() {
    getConstraints();
    findVertices();

    if (vertices.length === 0) {
        document.getElementById('solution').innerHTML = '<h3>No hay solución factible</h3>';
        return;
    }

    const objectiveType = document.getElementById('objective-type').value;
    let bestValue = objectiveType === 'max' ? -Infinity : Infinity;
    let bestPoint = null;

    vertices.forEach(vertex => {
        const value = evaluateObjective(vertex);
        if ((objectiveType === 'max' && value > bestValue) ||
            (objectiveType === 'min' && value < bestValue)) {
            bestValue = value;
            bestPoint = vertex;
        }
    });

    solution = { point: bestPoint, value: bestValue };

    displayProcedure();
    displaySolution();
    drawGraph();
}
