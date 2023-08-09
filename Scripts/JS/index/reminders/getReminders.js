/*
! Función para mostrar los reminders en el apartado de los reminders
*/
function displayReminders(reminders) {
    // Obtener el contenedor de la lista de tareas (ul)
    var taskList = $("#task-list");

    // Limpiar la lista actual de reminders
    taskList.empty();

    // Recorrer cada reminder recibido y agregarlo a la lista de tareas
    reminders.forEach(function(reminder) {
        // Crear el elemento li para el reminder con el nombre y el ID
        var newTaskListItem = createTaskListItem(reminder.name, reminder.id);

        // Agregar el reminder a la lista de tareas
        taskList.append(newTaskListItem);

        // Asignar la clase correspondiente al reminder según su estado (completed o not-completed)
        if (reminder.status === "completed") {
            newTaskListItem.addClass("completed").removeClass("not-completed");
            newTaskListItem.find(".bx-x-circle").removeClass("bx-x-circle").addClass("bx-check-circle");
        } else {
            newTaskListItem.addClass("not-completed").removeClass("completed");
            newTaskListItem.find(".bx-check-circle").removeClass("bx-check-circle").addClass("bx-x-circle");
        }
    });
}

/*
! Función para cargar los reminders del usuario desde la base de datos
*/
function loadRemindersFromDB() {
    // Realizar la solicitud AJAX para obtener los reminders del usuario
    $.ajax({
        type: "GET",
        url: "/reminder/getReminders",
        success: function(response) {
            console.log("Respuesta del servidor:", response);
            // Llamar a la función para mostrar los reminders en el apartado de los reminders
            displayReminders(response.reminders);
        },
        error: function(error) {
            console.error("Error al obtener los reminders:", error.responseJSON.message);
        }
    });
}

