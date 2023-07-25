// Función para eliminar una tarea del servidor y de la tabla
function deleteTask(taskId) {
    console.log('Eliminando tarea del servidor con ID:', taskId);
    // Eliminar la tarea del servidor
    $.ajax({
        url: `/user/deleteTask/${taskId}`,
        method: 'DELETE',
        success: function (response) {
            console.log('Tarea eliminada exitosamente:', response);

            // Buscar el elemento div del task eliminado
            const divItem = document.querySelector(`[data-task-id="${taskId}"]`);

            // Si se encuentra el elemento, eliminarlo de la interfaz
            if (divItem) {
                divItem.closest('tr').remove(); // Eliminar la fila del task en la tabla
            } else {
                console.log('El elemento de tarea no se encontró en la tabla.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar la tarea:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar la tarea.',
                customClass: {
                    icon: 'swal-icon--error',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-button--confirm',
                },
            });
        }
    });
}

// Función para borrar el div y desplazar el div "add-product" hacia arriba
function removeItem() {
    console.log('Solicitud de eliminar enviada al servidor.');
    const item = this.closest('.item');
    const tableRow = item.closest('tr');
    const tableBody = tableRow.parentNode;

    tableRow.remove();

    if (tableBody.childElementCount === 1) {
        const addTaskRow = tableBody.querySelector('.add-task');
        addTaskRow.style.transform = 'none';
    }
}