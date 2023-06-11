// Función para borrar el div y desplazar el div "add-product" hacia arriba
function removeItem() {
    const item = this.closest('.item');
    const tableRow = item.closest('tr');
    const tableBody = tableRow.parentNode;

    tableRow.remove();

    if (tableBody.childElementCount === 1) {
        const addTaskRow = tableBody.querySelector('.add-task');
        addTaskRow.style.transform = 'none';
    }
}

// Función para agregar el evento de eliminación a un elemento
function addCloseEvent(element) {
    const closeBtn = element.querySelector('.close .material-icons-sharp');
    closeBtn.addEventListener('click', removeItem);
}

// Agregar evento al span con el id "addToDoBtn"
const addToDoBtn = document.querySelector('#addToDoBtn');
addToDoBtn.addEventListener('click', function () {
    addTask();
});

// Función para agregar una tarea a la lista
function addTask() {
    // Solicitar el texto de la tarea mediante un prompt
    const taskText = prompt('Enter task text:');

    if (!taskText) {
        return; // Si no se ingresa ningún texto, se cancela la operación
    }

    // Crear el elemento con la estructura deseada
    const divItem = document.createElement('div');
    divItem.className = 'item online';

    const itemContent = `
        <div class="icon">
            <span class="material-icons-sharp">more_horiz</span>
        </div>
        <div class="right">
            <div class="info">
            <h3>${taskText}</h3>
            <small class="text-muted">Last 24 Hours</small>
            </div>
            <h5 class="success">+39%</h5>
            <div class="close" id="close-btn">
            <span class="material-icons-sharp">close</span>
            </div>
        </div>
    `;

    divItem.innerHTML = itemContent;

    const addTaskRow = document.querySelector('.add-task');
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td');
    tableData.appendChild(divItem);
    tableRow.appendChild(tableData);

    const nextTableRow = addTaskRow.closest('tr');
    const tableBody = nextTableRow.parentNode;
    tableBody.insertBefore(tableRow, nextTableRow);

    addCloseEvent(divItem); // Agregar evento de eliminación al nuevo elemento
}

// Agregar evento de eliminación a los elementos existentes
const existingItems = document.querySelectorAll('.item.online');
existingItems.forEach(function (item) {
    addCloseEvent(item);
});