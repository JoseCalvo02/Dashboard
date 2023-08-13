
function sendProfileData(data, fieldToUpdate){
    const dataProfile = {
        [fieldToUpdate]: data,
    };

    $.ajax({
        url: "/User/UpdateProfile",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(dataProfile), // Datos a enviar al servidor en formato JSON
        contentType: "application/json",
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "User Updated",
                text: response.message,
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "El usuario no se ha podido actualizar intentelo nuevamente",
                timer: 2000,
                showConfirmButton: false,
                  timerProgressBar: true,
            });
        },
    });
}

document.addEventListener("DOMContentLoaded", function(){
    const forms = document.querySelectorAll(".card");

    forms.forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("si");

            //Form para actualizar el nombre del usuario
            if (form.classList.contains("user-form")) {
                const NombreUsuario = document.getElementById("NombreUsuario").value;

                if(NombreUsuario === ''){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        text: 'Los campos no pueden enviarse vacios intentelo nuevamente.',
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                    });
                    return;
                }
                sendProfileData(NombreUsuario, "NombreUsuario");
            }
            //Form para actualizar la contraseña
            else if (form.classList.contains("password-form")) {
                const pass1 = document.getElementById("pass1").value;
                const pass2 = document.getElementById("pass2").value;

                if(pass1 !== pass2){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        text: 'Las contraseñas no coinciden. Por favor, vuelve a intentarlo.',
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                    });
                    return;
                }

                if(pass1 === ''){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Warning',
                        text: 'Los campos no pueden enviarse vacios intentelo nuevamente.',
                            timer: 2000,
                            showConfirmButton: false,
                            timerProgressBar: true,
                    });
                    return;
                }
                sendProfileData(pass1, "pass1");
            }
        });
    });
});