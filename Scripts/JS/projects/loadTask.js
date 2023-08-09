var addedTaskIDs = [];

function getProjectsTasks() {
    $.ajax({
        url: `/getProjectTasks?id=${encodeURIComponent(selectedProjectID)}`,
        type: "GET",
        dataType: "json",
        success: function (response) {
            console.log("Tareas obtenidas exitosamente:", response);

            var newTasks = response.filter(task => !addedTaskIDs.includes(task.id));

            // Crear un nuevo elemento de tarea para cada tarea en la respuesta
            newTasks.forEach(task => {
                // Ajustar el valor de columnTask para que coincida con los valores numéricos
                // 1: "Task Ready", 2: "In Progress", 3: "Needs Review", 4: "Done"
                let columnIndex = 0;
                switch (task.columnTask) {
                    case "1":
                        columnIndex = 0;
                        break;
                    case "2":
                        columnIndex = 1;
                        break;
                    case "3":
                        columnIndex = 2;
                        break;
                    case "4":
                        columnIndex = 3;
                        break;
                    default:
                        columnIndex = 1;
                }

                const newTaskElement = createTaskToList(task.taskName, task.priorityType, task.id);
                addedTaskIDs.push(task.id);

                // Ubicar la tarea en la columna correspondiente
                const targetColumn = projectColumns[columnIndex];
                targetColumn.appendChild(newTaskElement);
            });
        },
        error: function (error) {
            console.error("Error obteniendo las tareas:", error);
        },
    });
}