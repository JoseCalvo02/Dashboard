function DeleteTask(taskId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff7782',
        cancelButtonColor: '#6380ec',
        confirmButtonText: 'Sí, eliminar tarea'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/DeleteTask?id=${idProyecto}&taskId=${encodeURIComponent(taskId)}`,
                type: "DELETE",
                success: function(response) {
                    Swal.fire({
                        title: 'Tarea eliminada',
                        text: 'La tarea se ha eliminado exitosamente.',
                        icon: 'success'
                    }).then(() => {
                        location.reload(); // Recarga la página después de eliminar la tarea
                    });
                },
                error: function(error) {
                    console.error("Error deleting task:", error);
                }
            });
        }
    });
}