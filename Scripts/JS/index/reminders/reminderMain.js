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
                var leftPosition = iconPosition.left - dropdownWidth - 45;// Cambiar aquí para restar el ancho del dropdown

                // Verificar si el dropdown se sale de la pantalla por la izquierda
                if (leftPosition < 0) {
                    leftPosition = 0;
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

      // Agregar event listener para cerrar el dropdown al hacer clic fuera de él
    document.addEventListener("click", function(e) {
        if (!taskOptionsDropdown.contains(e.target)) {
            taskOptionsDropdown.style.display = "none";
            isMenuOpen = false;
        }
    });

    // Event listener para ajustar posición izquierda del dropdown en pantallas más grandes
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            var iconPosition = taskList.querySelector(".bx-dots-vertical-rounded").getBoundingClientRect();
            var dropdownWidth = taskOptionsDropdown.offsetWidth;
            var leftPosition = iconPosition.left - dropdownWidth - 45;

            if (leftPosition < 0) {
                leftPosition = 0;
            }

            taskOptionsDropdown.style.left = leftPosition + "px";
        } else {
            taskOptionsDropdown.style.left = "0";
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