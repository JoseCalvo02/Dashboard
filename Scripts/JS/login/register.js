$(document).ready(function() {
    // Asignar el evento de submit al formulario de registro
    $('#sign-up-form').submit(function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        const pass1 = $('#pass1').val();
        const pass2 = $('#pass2').val();

        if (pass1 !== pass2) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops..',
                text: 'Las contraseñas no coinciden. Por favor, vuelve a intentarlo.',
                customClass: {
                    icon: 'swal-icon--error',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-button--confirm',
                },
            });
        } else if (!validatePassword(pass1)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe cumplir con los siguientes requisitos: tener al menos un número, una letra y un carácter especial (por ejemplo: !@#$%^&*). Además, debe tener una longitud mayor a 6 caracteres.',
                customClass: {
                    icon: 'swal-icon--error',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-button--confirm',
                },
            });
        } else {
            // Llamar a la función de registro
            register();
        }
    });

    function validatePassword(password) {
        // Expresión regular para validar un número, una letra y un carácter especial, con longitud mayor a 6
        const regex = /^(?=.*[\d])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        return regex.test(password);
    }

    function register() {
        const fullNameSignup = $('#fullNameSignup').val();
        const userSignup = $('#userSignup').val();
        const emailSignup = $('#emailSignup').val();
        const pass1 = $('#pass1').val();

        $.ajax({
            url: '/user/register',
            method: 'POST',
            data: JSON.stringify({ fullNameSignup, userSignup, emailSignup, pass1 }),
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
                    allowOutsideClick: false,
                    customClass: {
                        icon: 'swal-icon--success',
                        title: 'swal-title',
                        text: 'swal-text',
                        confirmButton: 'swal-button--confirm',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Recargar la página
                        window.location.reload();
                    }
                });
            },
            error: function(xhr, status, error) {
                console.log('XHR status:', xhr.status);
                console.log('XHR responseJSON:', xhr.responseJSON);

                if (xhr.responseJSON || xhr.responseJSON.code === 409) {
                    // Usuario con el mismo correo electrónico ya existe
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: xhr.responseJSON.message,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
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
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
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
});