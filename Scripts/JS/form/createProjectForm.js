// Obtener una referencia al formulario
const projectForm = document.querySelector("#projectForm");

// Función para manejar el envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();

    const projectName = document.querySelector("#projectName").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;

    const project = {
        projectName,
        description,
        dueDate,
    };

    try {
        // Utilizar AJAX para enviar los datos del proyecto al servidor
        $.ajax({
            url: '/registerProject', // Nueva ruta para registrar el proyecto en el servidor
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(project),
        });

        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'El proyecto ha sido creado correctamente',
            allowOutsideClick: false,
        }).then(() => {
            // Update the table with the new project data
            fillProjects();
            // Redireccionar al index original
            window.location.href = "../../Views/Home/index.html";
        });
    } catch (error) {
        // Procesar el error si es necesario
        console.error('Error al guardar el proyecto en el servidor:', error);

        // Mostrar un mensaje de error al usuario
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error.',
        });
    }
}

// Agregar evento al formulario para capturar el envío
projectForm.addEventListener("submit", handleFormSubmit);

// Obtener la referencia al botón de regresar
const returnBtn = document.querySelector("#returnBtn");

// Agregar un evento de escucha para el clic en el botón de regresar
returnBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // Redireccionar al index original
    window.location.href = "../../Views/Home/index.html";

    // Cerrar la ventana del formulario
    window.close();
});