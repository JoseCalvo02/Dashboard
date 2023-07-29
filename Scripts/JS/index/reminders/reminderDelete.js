// Función para eliminar un recordatorio
function deleteReminder() {
    if (!selectedReminderId) {
        // Si no se ha seleccionado ningún recordatorio, no se puede borrar
        alert("Please select a reminder to delete.");
        return;
    }

    // Eliminar el elemento li (es decir, el recordatorio)
    selectedReminderId.remove();


}