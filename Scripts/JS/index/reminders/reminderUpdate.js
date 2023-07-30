/*
! Función para actualizar el status del reminder en el servidor
*/
function updateReminderStatus(reminderId, status) {
    // Objeto que contiene los datos del reminder a actualizar
    var reminderData = {
        id: reminderId,
        status: status
    };

    // Realizar la solicitud AJAX para actualizar el status del reminder en la base de datos
    $.ajax({
        type: "PUT",
        url: "/reminder/updateStatus",
        data: JSON.stringify(reminderData),
        contentType: "application/json",
        success: function(response) {
            console.log("Status del reminder actualizado con éxito");
            // Si deseas hacer algo después de actualizar el status, aquí es el lugar para hacerlo
        },
        error: function(error) {
            console.error("Error al actualizar el status del reminder:", error);
            // Manejar el error si es necesario
        }
    });
}

/*
! Definir la función activateEditMode para manejar el modo de edición de los reminders
*/
function activateEditMode(paragraph) {
    // Obtener el texto del párrafo
    var currentText = paragraph.text();
    console.log(currentText);

    // Crear un contenedor para el párrafo editable
    var editContainer = document.createElement("div");
    editContainer.classList.add("edit-container");

    // Crear un input para la edición y establecer su valor como el texto actual
    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;

    // Agregar el input al contenedor de edición
    editContainer.appendChild(editInput);

    // Reemplazar el párrafo por el contenedor de edición
    paragraph[0].parentNode.replaceChild(editContainer, paragraph[0]);

    // Focalizar en el input para permitir la edición inmediata
    editInput.focus();

    // Mantener referencia al párrafo original
    var originalParagraph = paragraph[0];

    // Manejar el evento de pulsar la tecla "Enter" para guardar el nuevo texto
    editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Evitar que el formulario se envíe

            var editedText = editInput.value.trim();

            // Verificar si el nuevo texto no está vacío y no excede los 25 caracteres
            if (editedText !== "" && editedText.length <= 25) {
                // Crear un nuevo párrafo con el nuevo texto
                var newParagraph = document.createElement("p");
                newParagraph.textContent = editedText;

                // Reemplazar el contenido del contenedor de edición con el nuevo párrafo
                editContainer.innerHTML = "";
                editContainer.appendChild(newParagraph);
            } else {
                // Si el nuevo texto está vacío o excede los 25 caracteres, restaurar el párrafo original
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "The reminder cannot exceed 25 caracteres or be empty.",
                });
                editContainer.innerHTML = "";
                editContainer.appendChild(originalParagraph);
            }
        }
    });

    // Manejar el evento de hacer clic fuera del input de edición para guardar el nuevo texto
    editInput.addEventListener("blur", function() {
        var editedText = editInput.value.trim();

        // Verificar si el nuevo texto no está vacío y no excede los 25 caracteres
        if (editedText !== "" && editedText.length <= 25) {
            // Crear un nuevo párrafo con el nuevo texto
            var newParagraph = document.createElement("p");
            newParagraph.textContent = editedText;

            // Reemplazar el contenedor de edición por el nuevo párrafo
            editContainer.parentNode.replaceChild(newParagraph, editContainer);
        } else {
            // Si el nuevo texto está vacío o excede los 25 caracteres, restaurar el texto original
            var originalParagraph = document.createElement("p");
            originalParagraph.textContent = currentText;
            editContainer.parentNode.replaceChild(originalParagraph, editContainer);
        }
    });
}