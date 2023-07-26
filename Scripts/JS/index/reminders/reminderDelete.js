$(document).ready(function() {
    // Obtener las opciones del dropdown
    var taskOptionsDropdown = $("#taskOptionsDropdown");

    // Manejar el evento de clic en la opción "Borrar"
    $("#deleteTaskOption").on("click", function(e) {
        e.stopPropagation(); // Detener la propagación del evento clic para evitar interferencias con otros eventos clic

        // Obtener el elemento li padre del ícono de opciones
        var listItem = $(this).closest("li");

        // Eliminar el elemento li (es decir, el recordatorio)
        listItem.remove();

        // Ocultar el menú desplegable después de borrar
        taskOptionsDropdown.hide();
    });
});