
function sendProfileData(NombreUsuario, pass1){
    const dataProfile = {
        NombreUsuario:NombreUsuario,
        pass1:pass1,
    };

    $.ajax({
        url: "/User/UpdateProfile", // Ruta de la API para guardar la tarea *********************
        type: "POST", // Método HTTP POST
        dataType: "json", // Esperamos una respuesta en formato JSON
        data: JSON.stringify(dataProfile), // Datos a enviar al servidor en formato JSON
        contentType: "application/json", 
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "User Updated",
                text: "El usuario ha sido actualizado correctamente en el sistema",
                timer: 3000,
                showConfirmButton: false,
                  timerProgressBar: true,
            });
        },
        error: function (error) {
            // Ocurrió un error durante la solicitud, manejarlo aquí
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "El usuario no se ha podido actualizar intentelo nuevamente",
                timer: 3000,
                showConfirmButton: false,
                  timerProgressBar: true,
            });
        },
    });
    
}

document.addEventListener("DOMContentLoaded", function(){
    const form = this.querySelector("form")
     form.addEventListener("submit", function(event){
        event.preventDefault();
        const NombreUsuario = document.getElementById("NombreUsuario").value;
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

            if(NombreUsuario === ''  ||  pass1 === ''){
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
            
            sendProfileData(NombreUsuario, pass1, pass2);
     });
});