$(document).ready(function() {
    // Obtener el icono de agregar y el contenedor del input
    var addReminderIcon = $("#addReminderIcon");
    var addReminderInputContainer = $("#addReminderInputContainer");

    // Obtener la lista de tareas
    var taskList = $(".task-list");

    //Manejar el evento de clic en el icono de agregar
    addReminderIcon.on("click", function() {
        // Mostrar u ocultar el contenedor del input según su estado actual
        if (addReminderInputContainer.is(":visible")) {
            addReminderIcon.removeClass("bx-x").addClass("bx-plus");
            addReminderInputContainer.hide();
        } else {
            addReminderIcon.removeClass("bx-plus").addClass("bx-x");
            addReminderInputContainer.show();
        }
    });

    //Manejar el evento de clic en el botón de guardar
    $("#saveReminderButton").on("click", function() {
        var reminderInputValue = $("#reminderInput").val();

        // Verificar si el input tiene un valor válido (en este caso, si no está vacío)
        if (reminderInputValue.trim() === "") {
            alert("Please enter a valid reminder.");
            return;
        }

        // Crear un nuevo elemento li para el nuevo recordatorio
        var newTaskListItem = $("<li>", { class: "not-completed" });
        // Crear el div que contendrá el nuevo recordatorio
        var newReminderDiv = $("<div>", { class: "task-title" });
        // Crear el ícono "x" para el nuevo recordatorio
        var iconX = $("<i>", { class: "bx bx-x-circle" });
        // Crear el párrafo para el nuevo recordatorio y asignarle el valor del input
        var reminderParagraph = $("<p>").text(reminderInputValue);
        // Crear el el ícono "dots-vertical" para el nuevo recordatorio
        var iconDots = $("<i>", { class: "bx bx-dots-vertical-rounded" });

        // Agregar el ícono "x" y el párrafo al nuevo div
        newReminderDiv.append(iconX);
        newReminderDiv.append(reminderParagraph);

        // Agregar el div del nuevo recordatorio al nuevo elemento li
        newTaskListItem.append(newReminderDiv);
        // Agregar el div del nuevo recordatorio al nuevo elemento li
        newTaskListItem.append(iconDots);

        // Agregar el nuevo elemento li a la lista de tareas
        taskList.append(newTaskListItem);

        // Ocultar el contenedor del input y cambiar el icono a bx-plus
        addReminderInputContainer.hide();
        addReminderIcon.removeClass("bx-x").addClass("bx-plus");

        // Restablecer el valor del input
        $("#reminderInput").val("");
    });
});