var addedTaskIDs = [];

function getProjectsTasks(){
    $.ajax({
        url: `/getProjectTasks?id=${encodeURIComponent(selectedProjectID)}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log("Tareas obtenidas exitosamente:", response);

            var newTasks = response.filter(task => !addedTaskIDs.includes(task.id));

            // Crear un nuevo elemento de tarea para cada tarea en la respuesta
            newTasks.forEach(task => {
                console.log(task.priorityType);
                createTaskToList(task.taskName, task.priorityType);
                addedTaskIDs.push(task.id);
            });
        },
        error: function (error) {
            console.error("Error obteniendo las tareas:", error);
        },
    });
}