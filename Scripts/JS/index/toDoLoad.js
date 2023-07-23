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
                });
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

