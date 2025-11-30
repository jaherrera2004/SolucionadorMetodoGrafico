// Funciones relacionadas con las restricciones

function addConstraint() {
    const constraintsDiv = document.getElementById('constraints');
    const newConstraint = document.createElement('div');
    newConstraint.className = 'constraint-input';
    newConstraint.innerHTML = `
        <input type="number" class="a1" value="1" step="0.1">x₁ + 
        <input type="number" class="a2" value="1" step="0.1">x₂ 
        <select class="operator">
            <option value="<=">≤</option>
            <option value=">=">≥</option>
            <option value="=">=</option>
        </select>
        <input type="number" class="b" value="10" step="0.1">
        <button onclick="this.parentElement.remove()" style="background-color: #dc3545; margin-left: 10px;">Eliminar</button>
    `;
    constraintsDiv.appendChild(newConstraint);
}

function getConstraints() {
    const constraintInputs = document.querySelectorAll('.constraint-input');
    constraints = [];

    constraintInputs.forEach(input => {
        const a1 = parseFloat(input.querySelector('.a1').value) || 0;
        const a2 = parseFloat(input.querySelector('.a2').value) || 0;
        const operator = input.querySelector('.operator').value;
        const b = parseFloat(input.querySelector('.b').value) || 0;

        constraints.push({ a1, a2, operator, b });
    });

    // Agregar restricciones de no negatividad
    constraints.push({ a1: 1, a2: 0, operator: '>=', b: 0 }); // x1 >= 0
    constraints.push({ a1: 0, a2: 1, operator: '>=', b: 0 }); // x2 >= 0
}
