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
}