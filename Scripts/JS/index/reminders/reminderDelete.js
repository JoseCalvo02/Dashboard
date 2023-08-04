/*
!  Función para eliminar un recordatorio mediante AJAX
*/
function deleteReminder(reminderId) {

    // Eliminar el elemento li del DOM correspondiente al reminder eliminado
    $("li[data-reminder-id='" + reminderId + "']").remove();

    $.ajax({
        type: "DELETE",
        url: `/reminder/delete?id=${reminderId}`,
        success: function(response) {
            Swal.fire({
                icon: "success",
                title: "Reminder Deleted",
                text: "The remindes has been deleted successfully",
                timer: 2000,
                showConfirmButton: false,
            });
            console.log("Reminder eliminado exitosamente:", response);
            // Puedes realizar alguna acción adicional después de eliminar el reminder si es necesario
        },
        error: function(error) {
            // Aquí puedes manejar errores en la solicitud AJAX si es necesario
            console.error("Error al eliminar el reminder:", error);
        }
    });
}