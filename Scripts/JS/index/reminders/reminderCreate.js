/*
! Función para crear un elemento li para el nuevo recordatorio
*/
function createTaskListItem(reminderInputValue, reminderId) {
    var newTaskListItem = $("<li>", { class: "not-completed", "data-reminder-id": reminderId });
    var newReminderDiv = $("<div>", { class: "task-title" });
    var iconX = $("<i>", { class: "bx bx-x-circle" });
    var reminderParagraph = $("<p>").text(reminderInputValue);
    var iconDots = $("<i>", { class: "bx bx-dots-vertical-rounded" });

    newReminderDiv.append(iconX);
    newReminderDiv.append(reminderParagraph);

    newTaskListItem.append(newReminderDiv);
    newTaskListItem.append(iconDots);

    return newTaskListItem;
}

/*
! Función para agregar el nuevo recordatorio a la lista de tareas
*/
function addReminder(reminderInputValue) {
    var newTaskListItem = createTaskListItem(reminderInputValue);

    // Obtener el texto dentro de la etiqueta <p> del reminderInputValue
    var reminderText = newTaskListItem.find('.task-title p').text();

    // Objeto que contiene los datos del reminder a guardar en la base de datos
    var reminderData = {
        name: reminderText,
        status: "not-completed"
    };

    // Realizar la solicitud AJAX para guardar el reminder en la base de datos
    $.ajax({
        type: "POST",
        url: "/reminder/create",
        data: JSON.stringify(reminderData), // Convertir el objeto a una cadena JSON
        contentType: "application/json", // Especificar el tipo de contenido como JSON
        success: function(response) {
            var newReminderId = response.newReminderId; // Obtener el ID del nuevo reminder desde la respuesta del servidor

            // Llamar a la función para agregar el nuevo reminder a la lista de tareas con el ID correspondiente
            addReminderToList(reminderInputValue, newReminderId);
        },
        error: function(error) {
            console.error("Error al guardar el reminder:", error.responseJSON.message); // Mostrar el mensaje de error proporcionado por el servidor
            // Manejar el error si es necesario, por ejemplo, mostrar un mensaje de error al usuario
        }
    });
}

/*
! Función para agregar el nuevo reminder a la lista de tareas con el ID correspondiente
*/
function addReminderToList(reminderInputValue, reminderId) {
    var newTaskListItem = createTaskListItem(reminderInputValue, reminderId);
    taskList.append(newTaskListItem);

}