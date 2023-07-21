$(document).ready(function() {
    // Asignar el evento de submit al formulario de inicio de sesión
    $('#sign-in-form').submit(function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        login(); // Llamar a la función de inicio de sesión
    });

    function login() {
        const userLogin = $('#userLogin').val();
        const passLogin = $('#passLogin').val();

        $.ajax({
            url: '/user/login', // Nueva ruta para el inicio de sesión
            method: 'POST',
            data: JSON.stringify({ userLogin, passLogin }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(response) {
                // Procesar la respuesta exitosa
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido de nuevo!',
                    customClass: {
                        icon: 'swal-icon--success',
                        title: 'swal-title',
                        text: 'swal-text',
                        confirmButton: 'swal-button--confirm',
                    },
                });
                // Redirigir al usuario a la página principal después del inicio de sesión
                window.location.href = './index.html';
            },
            error: function(xhr, status, error) {
                console.log('XHR status:', xhr.status);
                console.log('XHR responseJSON:', xhr.responseJSON);

                // Mostrar un mensaje de error al usuario
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Credenciales incorrectas. Por favor, verifica tus datos.',
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
});