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

    // Agregar el evento de clic al icono de completado en el nuevo elemento de tarea
    const icon = element.querySelector('.icon .material-icons-sharp');
    icon.addEventListener('click', toggleTaskCompletion);
}

// Agregar evento al span con el id "addToDoBtn"
const addToDoBtn = document.querySelector('#addToDoBtn');
addToDoBtn.addEventListener('click', function () {
    const input = document.querySelector('#taskInput');
    if (input) {
        const taskText = input.value.trim();
        if (taskText.length > 0 && taskText.length <= 23) {
            addTask(taskText);
            input.value = '';
            input.parentNode.replaceChild(addTaskHeading, input);
            input.blur(); // Quitar el enfoque del campo de entrada
        } else {
            alert('El texto de la tarea debe tener entre 1 y 23 caracteres.');
        }
    } else {
        convertToInput(addTaskHeading);
    }
    const newInput = document.querySelector('#taskInput');
    if (newInput) {
        newInput.focus(); // Agregar el enfoque al nuevo input después de la operación
        newInput.select(); // Seleccionar el texto del nuevo input
    }
});

// Agregar evento al h3 con el id "addTaskHeading"
const addTaskHeading = document.querySelector('#addTaskHeading');
addTaskHeading.addEventListener('click', function () {
    convertToInput(addTaskHeading);
    const input = document.querySelector('#taskInput');
    input.focus(); // Agregar el enfoque al input después de convertirlo en editable
    input.select(); // Seleccionar el texto del input
});

function toggleTaskCompletion() {
    const item = this.closest('.item');
    const isCompleted = item.getAttribute('data-completed') === 'true';

    item.setAttribute('data-completed', !isCompleted);

    const icon = item.querySelector('.icon .material-icons-sharp');
    const taskText = item.querySelector('.info h3'); // Obtener referencia al elemento <h3>

    if (isCompleted) {
        icon.textContent = 'close';
        icon.style.color = 'var(--color-white)';
        icon.parentElement.style.backgroundColor = 'var(--color-danger)';
        taskText.style.textDecoration = 'none'; // Quitar línea de tachado
    } else {
        icon.textContent = 'check';
        icon.style.color = 'var(--color-white)';
        icon.parentElement.style.backgroundColor = 'var(--color-success)';
        taskText.style.textDecoration = 'line-through'; // Aplicar línea de tachado
    }
}

// Función para agregar una tarea a la lista
function addTask(taskText) {
    if (!taskText) {
        taskText = prompt('Enter task text:');
    }

    if (!taskText) {
        return;
    }

    const divItem = createTaskElement(taskText);
    divItem.setAttribute('data-completed', 'false');

    // Agregar el evento de clic al icono de la nueva tarea
    const icon = divItem.querySelector('.icon .material-icons-sharp');
    icon.addEventListener('click', toggleTaskCompletion);
}

// Función para convertir un elemento en un campo de entrada
function convertToInput(element) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = element.textContent.trim();
    input.id = 'taskInput';
    input.maxLength = 23; // Establecer el límite máximo de caracteres
    input.style.color = 'var(--color-primary)'; // Establecer el color del texto
    input.style.fontWeight = 'bold'; // Establecer el estilo del texto

    const addTaskRow = document.querySelector('.add-task');
    const tableRow = addTaskRow.closest('tr');
    const tableBody = tableRow.parentNode;

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el envío del formulario al presionar Enter
            const taskText = input.value.trim();
            if (taskText.length > 0 && taskText.length <= 23) {
                addTask(taskText);
                input.parentNode.replaceChild(addTaskHeading, input);
                input.blur(); // Quitar el enfoque del campo de entrada después del reemplazo
            } else {
                alert('El texto de la tarea debe tener entre 1 y 23 caracteres.');
            }
        } else if (event.key === 'Escape') {
            input.parentNode.replaceChild(addTaskHeading, input);
        }
    });

    input.addEventListener('blur', function () {
        setTimeout(function () {
            const taskInput = document.querySelector('#taskInput');
            if (taskInput && document.activeElement !== taskInput) {
                taskInput.parentNode.replaceChild(addTaskHeading, taskInput);
            }
        }, 100);
    });

    element.parentNode.replaceChild(input, element);
    input.focus();
    input.select(); // Seleccionar el texto del input

    // Evento clic en el documento para cerrar el campo de entrada si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        const taskInput = document.querySelector('#taskInput');
        if (taskInput && event.target !== taskInput && !taskInput.contains(event.target)) {
            setTimeout(function () {
                if (document.activeElement !== taskInput) {
                    taskInput.parentNode.replaceChild(addTaskHeading, taskInput);
                }
            }, 100);
        }
    });

    // Evento clic en la fila de agregar tarea para cerrar el campo de entrada si se hace clic en ella
    addTaskRow.addEventListener('click', function (event) {
        const taskInput = document.querySelector('#taskInput');
        if (taskInput && event.target === addTaskRow) {
            taskInput.parentNode.replaceChild(addTaskHeading, taskInput);
        }
    });
}

let taskId = 0; // Variable para asignar ID único a cada tarea

// Función para crear un nuevo elemento de tarea
function createTaskElement(taskText) {
    // Incrementar el ID único para la siguiente tarea
    taskId++;

    const divItem = document.createElement('div');
    divItem.className = 'item online';
    divItem.setAttribute('data-completed', 'false');

    divItem.dataset.taskId = taskId; // Asignar el ID único a través del atributo dataset

    const itemContent = `
        <div class="icon">
            <span class="material-icons-sharp">close</span>
        </div>
        <div class="right">
            <div class="info">
                <h3>${taskText}</h3>
            </div>
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