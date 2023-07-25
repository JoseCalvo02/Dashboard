function loadTasksFromDB() {
    $.ajax({
        url: '/user/getTasks',
        method: 'GET',
        success: function (response) {
            console.log('Tareas obtenidas exitosamente:', response);

            if (response.length === 0) {
                console.log('No hay tareas disponibles');
            } else {
                response.forEach(task => {
                    const divItem = createTaskElement(task.taskName);
                    divItem.setAttribute('data-completed', task.status === 'Done');
                    divItem.dataset.taskId = task.id;
                    if (task.status === 'Done') {
                        toggleTaskCompletion.call({ closest: function () { return divItem; } });
                    }

                    // Agregar el nuevo elemento de tarea a la tabla
                    addTaskToTable(divItem);
                });

                // Después de cargar las tareas, inicializamos los íconos de eliminar
                initializeDeleteIcons();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener tareas:', error);
            console.log('No hay tareas disponibles');
        }
    });
}

// Llama a la función para cargar las tareas almacenadas en la base de datos al cargar la página
window.addEventListener('load', loadTasksFromDB);

// Función para agregar el nuevo elemento de tarea a la tabla
function addTaskToTable(divItem) {
    const addTaskRow = document.querySelector('.add-task');
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td');
    tableData.appendChild(divItem);
    tableRow.appendChild(tableData);

    const nextTableRow = addTaskRow.closest('tr');
    const tableBody = nextTableRow.parentNode;
    tableBody.insertBefore(tableRow, nextTableRow);

    addCloseEvent(divItem); // Agregar evento de eliminación al nuevo elemento

    console.log('Elemento de tarea agregado a la tabla.');

    // Verificar si el elemento con la clase "delete-icon" está presente en el nuevo elemento
    const deleteIconElements = divItem.querySelectorAll('.delete-icon');
    console.log(deleteIconElements);
}

// Función para agregar el evento de clic a los íconos de eliminar
function initializeDeleteIcons() {
    $(document).on('click', '.delete-icon', function () {
        const taskId = $(this).data('task-id');
        alert('Click en el icono de eliminar. ID de la tarea: ' + taskId); // Agregar este alert para verificar el evento
        console.log('Evento de clic en el icono de eliminar.');
        deleteTask(taskId);
        alert('Solicitud de eliminación enviada al servidor.');
    });
}