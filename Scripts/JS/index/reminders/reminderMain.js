$(document).ready(function() {

    // Obtener las opciones del dropdown
    var taskOptionsDropdown = $("#taskOptionsDropdown");

    // Obtener la lista de tareas
    var taskList = $(".task-list");
    // Variable para controlar el estado del menú desplegable
    var isMenuOpen = false;

    //Manejar el evento de clic en el ícono de completar o no completar
    taskList.on("click", ".bx-x-circle, .bx-check-circle", function() {
        var listItem = $(this).closest("li");
        var icon = $(this);

        // Alternar entre los íconos bx-x-circle y bx-check-circle
        if (icon.hasClass("bx-x-circle")) {
            icon.removeClass("bx-x-circle").addClass("bx-check-circle");
        } else {
            icon.removeClass("bx-check-circle").addClass("bx-x-circle");
        }

        // Alternar entre las clases de completado y no completado en el elemento li
        listItem.toggleClass("completed").toggleClass("not-completed");
    });

    // Mostrar el menú desplegable cuando se hace clic en el ícono de opciones
    taskList.on("click", ".bx-dots-vertical-rounded", function(e) {
        e.stopPropagation(); // Detener la propagación del evento clic para evitar interferencias con otros eventos clic

        // Verificar si el menú está abierto
        if (isMenuOpen) {
            taskOptionsDropdown.hide(); // Si está abierto, lo ocultamos
        } else {
            // Si está cerrado, obtenemos la posición del ícono de opciones y el ancho del menú
            var iconPosition = $(this).offset();
            var dropdownWidth = taskOptionsDropdown.outerWidth();
            // Calculamos la posición izquierda para mostrar el menú más a la izquierda
            var leftPosition = iconPosition.left - dropdownWidth + $(this).width();
            // Mostramos el menú desplegable en la posición calculada
            taskOptionsDropdown.css({
                display: "block",
                top: iconPosition.top + $(this).height(),
                left: leftPosition
            });
        }

        // Cambiar el estado del menú
        isMenuOpen = !isMenuOpen;
    });

    // Ocultar el menú desplegable cuando se hace clic en cualquier parte de la página
    $(document).on("click", function() {
        taskOptionsDropdown.hide();
    });

});