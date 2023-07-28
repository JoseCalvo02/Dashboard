document.addEventListener("DOMContentLoaded", function() {
    // Obtener el icono de agregar y el contenedor del input
    var addReminderIcon = document.getElementById("addReminderIcon");
    var addReminderInputContainer = document.getElementById("addReminderInputContainer");

    // Obtener la lista de tareas
    var taskList = document.querySelector(".task-list");

    // Manejar el evento de clic en el icono de agregar
    addReminderIcon.addEventListener("click", function() {
        // Mostrar u ocultar el contenedor del input según su estado actual
        if (addReminderInputContainer.style.display === "block") {
            addReminderIcon.classList.remove("bx-x");
            addReminderIcon.classList.add("bx-plus");
            addReminderInputContainer.style.display = "none";
        } else {
            addReminderIcon.classList.remove("bx-plus");
            addReminderIcon.classList.add("bx-x");
            addReminderInputContainer.style.display = "block";
        }
    });

    // Manejar el evento de clic en el botón de guardar
    var saveReminderButton = document.getElementById("saveReminderButton");
    saveReminderButton.addEventListener("click", function() {
        var reminderInputValue = document.getElementById("reminderInput").value.trim();

        // Verificar si el input tiene un valor válido (en este caso, si no está vacío)
        if (reminderInputValue === "") {
            alert("Please enter a valid reminder.");
            return;
        }

        // Crear un nuevo elemento li para el nuevo recordatorio
        var newTaskListItem = document.createElement("li");
        newTaskListItem.classList.add("not-completed");

        // Crear el div que contendrá el nuevo recordatorio
        var newReminderDiv = document.createElement("div");
        newReminderDiv.classList.add("task-title");

        // Crear el ícono "x" para el nuevo recordatorio
        var iconX = document.createElement("i");
        iconX.classList.add("bx", "bx-x-circle");

        // Crear el párrafo para el nuevo recordatorio y asignarle el valor del input
        var reminderParagraph = document.createElement("p");
        reminderParagraph.textContent = reminderInputValue;

        // Crear el ícono "dots-vertical" para el nuevo recordatorio
        var iconDots = document.createElement("i");
        iconDots.classList.add("bx", "bx-dots-vertical-rounded");

        // Agregar el ícono "x" y el párrafo al nuevo div
        newReminderDiv.appendChild(iconX);
        newReminderDiv.appendChild(reminderParagraph);

        // Agregar el div del nuevo recordatorio al nuevo elemento li
        newTaskListItem.appendChild(newReminderDiv);
        newTaskListItem.appendChild(iconDots);

        // Agregar el nuevo elemento li a la lista de tareas
        taskList.appendChild(newTaskListItem);

        // Ocultar el contenedor del input y cambiar el icono a bx-plus
        addReminderInputContainer.style.display = "none";
        addReminderIcon.classList.remove("bx-x");
        addReminderIcon.classList.add("bx-plus");

        // Restablecer el valor del input
        document.getElementById("reminderInput").value = "";
    });
});