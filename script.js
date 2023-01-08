const slider = document.getElementById('size');
const gridValue = document.querySelector('.value');
const chooseColor = document.getElementById('etch-color');
const colorBtn = document.getElementById('color');
const rainbowBtn = document.getElementById('rainbow');
const eraserBtn = document.getElementById('eraser');
const grid = document.getElementById('grid');
const clearBtn = document.getElementById('clear');

let gridSize = slider.value;
let chooseButton = 'color'
let color = '#ffffff'


gridValue.textContent = gridSize + ' x ' + gridSize;

chooseColor.oninput = (e) => updateColor(e.target.value);
colorBtn.onclick = () => pressButton('color');
rainbowBtn.onclick = () => pressButton('rainbow');
eraserBtn.onclick = () => pressButton('eraser');
clearBtn.onclick = () => clearGrid();
slider.onmousemove = (e) => {gridValue.textContent = e.target.value + ' x ' + e.target.value};
slider.onchange = (e) => updateGrid(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function updateGrid(value) {
    gridSize = value;
    gridValue.textContent = value + ' x ' + value;
    clearGrid();
}

function clearGrid() {
    grid.innerHTML = '';
    setupGrid(gridSize);
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < gridSize*gridSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', colorGrid);
        gridElement.addEventListener('mousedown', colorGrid);
        grid.appendChild(gridElement);
    }
}

function colorGrid(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    }
    if (chooseButton === 'rainbow') {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    if (chooseButton === 'color') {
        e.target.style.backgroundColor = color;
    }
    if (chooseButton === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function updateColor(newColor) {
    color = newColor;
}

function pressButton(mode) {
    if (chooseButton === 'color' ) {
        colorBtn.classList.remove('active');
    }

    if (chooseButton === 'rainbow') {
        rainbowBtn.classList.remove('active');
    }

    if (chooseButton === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    chooseButton = mode;
    if (mode === 'color') {
        colorBtn.classList.add('active');
    }
    if (mode === 'rainbow') {
        rainbowBtn.classList.add('active');
    }

    if (mode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    setupGrid(gridSize);
    pressButton(chooseButton);
}


