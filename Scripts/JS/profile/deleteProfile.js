$(document).ready(function() {

    $('#deleteButton').click(function() {
        // Agregar un retraso de 4 segundos (4000 milisegundos) antes de mostrar la alerta de confirmación
        setTimeout(function() {
            // Mostrar una alerta de confirmación antes de eliminar el perfil
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará tu perfil, reminders, proyectos y tareas de forma permanente',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Realizar una solicitud AJAX para eliminar el perfil
                    $.ajax({
                        url: '/deleteProfile', // Cambia esto a la ruta correcta de tu servidor
                        method: 'DELETE', // Usa el método HTTP DELETE para eliminar el perfil
                        dataType: 'json',
                        success: function(data) {
                            // Manejar la respuesta del servidor si es necesario
                            Swal.fire('Perfil eliminado', 'Tu perfil ha sido eliminado correctamente', 'success');
                            setTimeout(function() {
                                window.location.href = '/user/logout';
                            }, 4000);
                        },
                        error: function(xhr, status, error) {
                            console.error('Error: ' + error);
                            // Mostrar un mensaje de error si la solicitud falla
                            Swal.fire('Error', 'No se pudo eliminar el perfil', 'error');
                        }
                    });
                }
            });
        }, 4000); // 4 segundos (4000 milisegundos)
    });
});
