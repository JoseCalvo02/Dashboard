$(document).ready(function() {
    // Obtener la lista de tareas
    var taskList = $(".task-list");

    // Manejar el evento de doble clic (dblclick) en el contenedor del párrafo para activar el modo de edición
    taskList.on("dblclick", ".task-title p", function() {
        var paragraph = $(this);

        // Guardar el texto actual del párrafo
        var currentText = paragraph.text();

        // Crear un contenedor para el párrafo editable
        var editContainer = $("<div>", { class: "edit-container" });

        // Crear un input para la edición y establecer su valor como el texto actual
        var editInput = $("<input>", {
            type: "text",
            value: currentText
        });

        // Agregar el input al contenedor de edición
        editContainer.append(editInput);

        // Reemplazar el párrafo por el contenedor de edición
        paragraph.replaceWith(editContainer);

        // Focalizar en el input para permitir la edición inmediata
        editInput.focus();

        // Manejar el evento de pulsar la tecla "Enter" para guardar el nuevo texto
        editInput.on("keydown", function(e) {
            if (e.key === "Enter") {
                var editedText = editInput.val().trim();

                // Verificar si el nuevo texto no está vacío
                if (editedText !== "") {
                    // Crear un nuevo párrafo con el nuevo texto
                    var newParagraph = $("<p>").text(editedText);

                    // Reemplazar el contenedor de edición por el nuevo párrafo
                    editContainer.replaceWith(newParagraph);
                } else {
                    // Si el nuevo texto está vacío, restaurar el texto original
                    editContainer.replaceWith(paragraph);
                }
            }
        });

        // Manejar el evento de hacer clic fuera del input de edición para guardar el nuevo texto
        editInput.on("blur", function() {
            var editedText = editInput.val().trim();

            // Verificar si el nuevo texto no está vacío
            if (editedText !== "") {
                // Crear un nuevo párrafo con el nuevo texto
                var newParagraph = $("<p>").text(editedText);

                // Reemplazar el contenedor de edición por el nuevo párrafo
                editContainer.replaceWith(newParagraph);
            } else {
                // Si el nuevo texto está vacío, restaurar el texto original
                editContainer.replaceWith(paragraph);
            }
        });
    });

    //Manejar el evento de clic en la opción "Editar"
    $("#editTaskOption").on("click", function(e) {
        e.stopPropagation(); // Detener la propagación del evento clic para evitar interferencias con otros eventos clic

        var listItem = $(this).closest("li");
        var reminderParagraph = listItem.find(".task-title p");

        activateEditMode(reminderParagraph); // Llamada a la función activateEditMode
    });

});