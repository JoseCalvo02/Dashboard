// Evento que se activa al hacer clic en el botón "Add To-Do Task"
$('#addToDoBtn').click(function () {
    const input = document.querySelector('#taskInput');
    if (input) {
        const taskText = input.value.trim();
        if (taskText.length > 0 && taskText.length <= 23) {
            const divItem = createTaskElement(taskText); // Crear el elemento divItem aquí
            addTask(divItem); // Pasar el divItem a la función addTask (¡corregido!)
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
    const input = document.querySelector('#taskInput');
    if (!input) {
        convertToInput(addTaskHeading);
        const newInput = document.querySelector('#taskInput');
        if (newInput) {
            newInput.focus(); // Agregar el enfoque al input después de convertirlo en editable
            newInput.select(); // Seleccionar el texto del input
        }
    }
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
function addTask(divItem) {
    // Obtener el estado de la tarea basado en el atributo "data-completed" del elemento
    const isCompleted = divItem.getAttribute('data-completed') === 'true';
    const status = isCompleted ? 'Done' : 'Not Ready';

    const taskText = divItem.querySelector('.info h3').textContent.trim(); // Obtener el texto del input

    divItem.querySelector('.info h3').textContent = taskText; // Actualizar el texto de la tarea en el divItem

    if (!taskText) {
        return; // Si el usuario no proporciona el texto de la tarea, salir de la función
    }

    // Agregar el evento de clic al icono de la nueva tarea
    const icon = divItem.querySelector('.icon .material-icons-sharp');
    icon.addEventListener('click', toggleTaskCompletion);

    // Enviar la nueva tarea al servidor
    $.ajax({
        url: '/user/addTask',
        method: 'POST',
        data: JSON.stringify({ taskName: taskText, status }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            console.log('Tarea agregada exitosamente:', response);
        },
        error: function (xhr, status, error) {
            console.error('Error al agregar tarea:', error);
        }
    });
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
                const divItem = createTaskElement(taskText); // Crear el elemento divItem aquí
                addTask(divItem); // Pasar el divItem a la función addTask
                input.parentNode.replaceChild(addTaskHeading, input);
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

    return divItem;
}