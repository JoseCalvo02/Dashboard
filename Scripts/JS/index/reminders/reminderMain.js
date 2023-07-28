document.addEventListener("DOMContentLoaded", function() {
    var taskOptionsDropdown = document.querySelector("#taskOptionsDropdown");
    var taskList = document.querySelector(".task-list");
    var isMenuOpen = false;

    taskList.addEventListener("click", function(e) {
        // Manejar clic en el icono de edición
        if (e.target.classList.contains("bx-dots-vertical-rounded")) {
            e.stopPropagation();

            if (isMenuOpen) {
                taskOptionsDropdown.style.display = "none";
            } else {
                var iconPosition = e.target.getBoundingClientRect();
                var dropdownWidth = taskOptionsDropdown.offsetWidth;
                var leftPosition = iconPosition.left + e.target.offsetWidth;

                // Ajustar la posición izquierda para mostrar el menú más a la izquierda
                if (leftPosition + dropdownWidth > window.innerWidth) {
                    leftPosition = window.innerWidth - dropdownWidth;
                }

                taskOptionsDropdown.style.display = "block";
                taskOptionsDropdown.style.top = iconPosition.top + e.target.offsetHeight + "px";
                taskOptionsDropdown.style.left = leftPosition + "px";
            }

            isMenuOpen = !isMenuOpen;
        } else if (e.target.classList.contains("bx-x-circle")) {
            // Alternar entre los íconos bx-x-circle y bx-check-circle
            e.target.classList.remove("bx-x-circle");
            e.target.classList.add("bx-check-circle");

            // Alternar entre las clases de completado y no completado en el elemento li
            if (e.target.closest("li")) {
                e.target.closest("li").classList.toggle("completed");
                e.target.closest("li").classList.toggle("not-completed");
            }
        } else if (e.target.classList.contains("bx-check-circle")) {
            // Alternar entre los íconos bx-check-circle y bx-x-circle
            e.target.classList.remove("bx-check-circle");
            e.target.classList.add("bx-x-circle");

            // Alternar entre las clases de completado y no completado en el elemento li
            if (e.target.closest("li")) {
                e.target.closest("li").classList.toggle("completed");
                e.target.closest("li").classList.toggle("not-completed");
            }
        } else {
            taskOptionsDropdown.style.display = "none";
            isMenuOpen = false;
        }
    });

    // Manejar el evento de clic en la opción "Editar"
    var editTaskOption = document.getElementById("editTaskOption");
    editTaskOption.addEventListener("click", function(e) {
        e.stopPropagation();
        var listItem = this.closest("li");
        var reminderParagraph = listItem.querySelector(".task-title p");

        console.log("Reminder Paragraph:", reminderParagraph);

        if (reminderParagraph) {
            activateEditMode(reminderParagraph); // Llamada a la función activateEditMode
        } else {
            console.log("Reminder paragraph not found.");
        }
    });
});