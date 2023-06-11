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
    const input = document.querySelector('#taskInput');
    if (input) {
        const taskText = input.value.trim();
        if (taskText.length > 0 && taskText.length <= 25) {
            addTask(taskText);
            input.value = '';
            input.parentNode.replaceChild(addTaskHeading, input);
        } else {
            alert('El texto de la tarea debe tener entre 1 y 25 caracteres.');
        }
    } else {
        convertToInput(addTaskHeading);
    }
    input.focus(); // Agregar el enfoque al input después de la operación
});

// Agregar evento al h3 con el id "addTaskHeading"
const addTaskHeading = document.querySelector('#addTaskHeading');
addTaskHeading.addEventListener('click', function () {
    convertToInput(addTaskHeading);
    const input = document.querySelector('#taskInput');
    input.focus(); // Agregar el enfoque al input después de convertirlo en editable
    input.select(); // Seleccionar el texto del input
});

// Función para agregar una tarea a la lista
function addTask(taskText) {
    if (!taskText) {
        taskText = prompt('Enter task text:');
    }

    if (!taskText) {
        return;
    }

    createTaskElement(taskText);
}

// Función para convertir un elemento en un campo de entrada
function convertToInput(element) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = element.textContent.trim();
    input.id = 'taskInput';
    input.maxLength = 25; // Establecer el límite máximo de caracteres
    input.style.color = '#6380ec'; // Establecer el color del texto
    input.style.fontWeight = 'bold'; // Establecer el estilo del texto
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const taskText = input.value.trim();
            if (taskText.length > 0 && taskText.length <= 25) {
                addTask(taskText);
                input.parentNode.replaceChild(addTaskHeading, input);
            } else {
                alert('El texto de la tarea debe tener entre 1 y 25 caracteres.');
            }
        } else if (event.key === 'Escape') {
            input.parentNode.replaceChild(addTaskHeading, input);
        }
    });
    element.parentNode.replaceChild(input, element);
    input.focus();
    input.select(); // Seleccionar el texto del input
}

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskText) {
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

    addTaskHeading.textContent = 'Add Task';
}

// Agregar evento de eliminación a los elementos existentes
const existingItems = document.querySelectorAll('.item.online');
existingItems.forEach(function (item) {
    addCloseEvent(item);
});