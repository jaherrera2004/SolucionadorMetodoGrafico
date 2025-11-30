// Funciones para dibujar el gráfico

function drawGraph() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Configurar sistema de coordenadas
    const maxX = Math.max(...vertices.map(v => v.x1), 10);
    const maxY = Math.max(...vertices.map(v => v.x2), 10);
    const scaleX = (width - 80) / (maxX * 1.2);
    const scaleY = (height - 80) / (maxY * 1.2);
    const scale = Math.min(scaleX, scaleY);

    function toCanvasX(x) { return 40 + x * scale; }
    function toCanvasY(y) { return height - 40 - y * scale; }

    // Dibujar ejes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.moveTo(40, height - 40);
    ctx.lineTo(40, 20);
    ctx.stroke();

    // Etiquetas de ejes
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('x₁', width - 30, height - 20);
    ctx.fillText('x₂', 20, 30);
    ctx.fillText('0', 25, height - 25);

    // Dibujar líneas de restricciones
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    constraints.slice(0, -2).forEach((constraint, i) => {
        ctx.beginPath();

        if (Math.abs(constraint.a2) < 1e-10) {
            // Línea vertical
            const x = constraint.b / constraint.a1;
            ctx.moveTo(toCanvasX(x), 0);
            ctx.lineTo(toCanvasX(x), height);
        } else if (Math.abs(constraint.a1) < 1e-10) {
            // Línea horizontal
            const y = constraint.b / constraint.a2;
            ctx.moveTo(0, toCanvasY(y));
            ctx.lineTo(width, toCanvasY(y));
        } else {
            // Línea general
            const x1 = 0;
            const y1 = (constraint.b - constraint.a1 * x1) / constraint.a2;
            const x2 = maxX * 1.2;
            const y2 = (constraint.b - constraint.a1 * x2) / constraint.a2;

            ctx.moveTo(toCanvasX(x1), toCanvasY(y1));
            ctx.lineTo(toCanvasX(x2), toCanvasY(y2));
        }

        ctx.stroke();
    });

    // Dibujar región factible
    if (vertices.length > 0) {
        // Ordenar vértices por ángulo para formar polígono
        const centroid = vertices.reduce((sum, v) => ({
            x1: sum.x1 + v.x1,
            x2: sum.x2 + v.x2
        }), { x1: 0, x2: 0 });
        centroid.x1 /= vertices.length;
        centroid.x2 /= vertices.length;

        const sortedVertices = vertices.slice().sort((a, b) => {
            const angleA = Math.atan2(a.x2 - centroid.x2, a.x1 - centroid.x1);
            const angleB = Math.atan2(b.x2 - centroid.x2, b.x1 - centroid.x1);
            return angleA - angleB;
        });

        ctx.fillStyle = 'rgba(0, 123, 255, 0.3)';
        ctx.beginPath();
        sortedVertices.forEach((vertex, i) => {
            if (i === 0) {
                ctx.moveTo(toCanvasX(vertex.x1), toCanvasY(vertex.x2));
            } else {
                ctx.lineTo(toCanvasX(vertex.x1), toCanvasY(vertex.x2));
            }
        });
        ctx.closePath();
        ctx.fill();
    }

    // Dibujar vértices
    ctx.fillStyle = '#007bff';
    vertices.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(toCanvasX(vertex.x1), toCanvasY(vertex.x2), 5, 0, 2 * Math.PI);
        ctx.fill();

        // Etiqueta del vértice
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText(`(${vertex.x1.toFixed(1)}, ${vertex.x2.toFixed(1)})`,
            toCanvasX(vertex.x1) + 8, toCanvasY(vertex.x2) - 8);
        ctx.fillStyle = '#007bff';
    });

    // Destacar solución óptima
    if (solution) {
        ctx.fillStyle = '#dc3545';
        ctx.beginPath();
        ctx.arc(toCanvasX(solution.point.x1), toCanvasY(solution.point.x2), 8, 0, 2 * Math.PI);
        ctx.fill();
    }
}
