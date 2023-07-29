// Función para crear un elemento li para el nuevo recordatorio
function createTaskListItem(reminderInputValue) {
    var newTaskListItem = $("<li>", { class: "not-completed" });
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

// Función para agregar el nuevo recordatorio a la lista de tareas
function addReminder(reminderInputValue) {
    var newTaskListItem = createTaskListItem(reminderInputValue);
    taskList.append(newTaskListItem);

    // Obtener el texto dentro de la etiqueta <p> del reminderInputValue
    var reminderText = newTaskListItem.find('.task-title p').text();

    // Objeto que contiene los datos del reminder a guardar en la base de datos
    var reminderData = {
        name: reminderText,
        status: "not-completed" // Por defecto, los nuevos reminders se guardarán como "not-completed"
    };

    // Realizar la solicitud AJAX para guardar el reminder en la base de datos
    $.ajax({
        type: "POST",
        url: "/reminder/create",
        data: JSON.stringify(reminderData), // Convertir el objeto a una cadena JSON
        contentType: "application/json", // Especificar el tipo de contenido como JSON
        success: function(response) {
            console.log("Reminder guardado exitosamente con ID:", response);
            // Si deseas hacer algo con el ID del reminder guardado, aquí es el lugar para hacerlo
        },
        error: function(error) {
            console.error("Error al guardar el reminder:", error);
            // Manejar el error si es necesario
        }
    });
}