// Función para eliminar una tarea del servidor y de la tabla
function deleteTask(taskId, pool) {
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
    const item = this.closest('.item');
    const tableRow = item.closest('tr');
    const tableBody = tableRow.parentNode;

    tableRow.remove();

    if (tableBody.childElementCount === 1) {
        const addTaskRow = tableBody.querySelector('.add-task');
        addTaskRow.style.transform = 'none';
    }
}

// Función para agregar el evento de eliminación a un elemento
function addCloseEvent(element) {
    const closeBtn = element.querySelector('.close .material-icons-sharp');
    closeBtn.addEventListener('click', removeItem);

    // Agregar el evento de clic al icono de completado en el nuevo elemento de tarea
    const icon = element.querySelector('.icon .material-icons-sharp');
    icon.addEventListener('click', toggleTaskCompletion);
}

// Evento que se activa al hacer clic en el ícono "delete" en la tabla de to-do tasks
$(document).on('click', '.delete-icon', function () {
    const taskId = $(this).data('task-id');
    console.log('Eliminando tarea con ID:', taskId);
    deleteTask(taskId, pool);
    alert('Solicitud de eliminación enviada al servidor.');
});

// Agregar evento de eliminación a los elementos existentes
const existingItems = document.querySelectorAll('.item.online');
existingItems.forEach(function (item) {
    addCloseEvent(item);
})