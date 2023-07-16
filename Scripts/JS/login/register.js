function register() {
    const userSignup = $('#userSignup').val();
    const emailSignup = $('#emailSignup').val();
    const pass1 = $('#pass1').val();

    $.ajax({
        url: '/user/register',
        method: 'POST',
        data: JSON.stringify({ userSignup, emailSignup, pass1 }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // Procesar la respuesta exitosa
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'El usuario se ha registrado exitosamente.',
                customClass: {
                    icon: 'swal-icon--success',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-button--confirm',
                },
            });
        },
        error: function(xhr, status, error) {
            console.log('XHR status:', xhr.status);
            console.log('XHR responseJSON:', xhr.responseJSON);

            if (xhr.responseJSON.code === 409) {
                // Usuario con el mismo correo electrónico ya existe
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseJSON.message,
                    customClass: {
                        icon: 'swal-icon--error',
                        title: 'swal-title',
                        text: 'swal-text',
                        confirmButton: 'swal-button--confirm',
                    },
                });
            } else {
                // Otro error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Se produjo un error al registrar el usuario.',
                    customClass: {
                        icon: 'swal-icon--error',
                        title: 'swal-title',
                        text: 'swal-text',
                        confirmButton: 'swal-button--confirm',
                    },
                });
            }
        }
    });
}

// Asignar el evento de submit al formulario de registro
$('#sign-up-form').submit(function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    register(); // Llamar a la función de registro
});