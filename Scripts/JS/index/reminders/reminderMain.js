//Global Variables
var taskList = $(".task-list"); // Variable global para almacenar el taskList
var selectedReminderId; // Variable global para almacenar el ID del recordatorio seleccionado

/*
! Query para el inicio del index
*/
$(document).ready(function() {

    // Obtener las opciones del dropdown
    var taskOptionsDropdown = $("#taskOptionsDropdown");

    // Obtener el icono de agregar y el contenedor del input
    var addReminderIcon = $("#addReminderIcon");
    var addReminderInputContainer = $("#addReminderInputContainer");

    /*
    ! Manejar el evento de clic en el icono de agregar
    */
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

    /*
    ! Manejar el evento de clic en el botón de guardar
    */
    $("#saveReminderButton").on("click", function() {
        var reminderInputValue = $("#reminderInput").val().trim();


        // TODO: Don't let the text be greater than 25 caracteres
        // Verificar si el input tiene un valor válido (en este caso, si no está vacío)
        if (reminderInputValue === "" ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter text to create the reminder.",
            });
            return;
        }

        // Agregar el nuevo recordatorio a la lista de tareas
        addReminder(reminderInputValue);

        // Ocultar el contenedor del input y cambiar el icono a bx-plus
        addReminderInputContainer.hide();
        addReminderIcon.removeClass("bx-x").addClass("bx-plus");

        // Restablecer el valor del input
        $("#reminderInput").val("");
    });

    /*
    ! Manejar el evento de clic en el ícono de completar o no completar
    */
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

    /*
    ! Mostrar el menú desplegable cuando se hace clic en el ícono de opciones
    */
    taskList.on("click", ".bx-dots-vertical-rounded", function(e) {
        e.stopPropagation(); // Detener la propagación del evento clic para evitar interferencias con otros eventos clic

        // Buscar el elemento li que contiene el ícono de opciones (padre del ícono clicado)
        selectedReminderId = $(this).closest("li");

        // Obtener la posición del ícono de opciones
        var iconPosition = $(this).offset();

        // Calcular la posición izquierda del menú desplegable desplazándolo 50px a la izquierda
        var dropdownLeftPosition = iconPosition.left - 50;

        // Mostrar el menú desplegable en la posición del ícono con el desplazamiento a la izquierda
        taskOptionsDropdown.css({
            display: "block",
            top: iconPosition.top + $(this).height(),
            left: dropdownLeftPosition
        });
    });

    /*
    ! Ocultar el menú desplegable cuando se hace clic en cualquier parte de la página
    */
    $(document).on("click", function() {
        taskOptionsDropdown.hide();
    });

    /*
    ! Manejar el evento de doble clic (dblclick) en el contenedor del párrafo para activar el modo de edición
    */
    taskList.on("dblclick", ".task-title p", function() {
        // Llamar a la función activateEditMode y pasarle el párrafo actual
        activateEditMode($(this));
    });

    /*
    ! Manejar el evento de clic en la opción "Editar"
    */
    $("#editReminderOption").on("click", function(e) {
        e.stopPropagation(); // Detener la propagación del evento clic para evitar interferencias con otros eventos clic

        // Ocultar el menú desplegable después de clicar "Editar"
        taskOptionsDropdown.hide();

        // Obtener el párrafo (reminder) dentro del elemento li
        var reminderParagraph = selectedReminderId.find(".task-title p");

        activateEditMode(reminderParagraph); // Llamada a la función activateEditMode
    });

    /*
    ! Manejar el evento de clic en la opción "Borrar"
    */
    $("#deleteReminderOption").on("click", function(e) {
        e.stopPropagation();
        deleteReminder();
        // Ocultar el menú desplegable después de borrar
        taskOptionsDropdown.hide();
    });

});