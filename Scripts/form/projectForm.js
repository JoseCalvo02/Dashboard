// Obtener una referencia al formulario
const projectForm = document.querySelector("#projectForm");

// Agregar evento al formulario para capturar el envío
projectForm.addEventListener("submit", handleFormSubmit);

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();

    const projectName = document.querySelector("#projectName").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;

    const project = {
        projectName,
        description,
        dueDate,
    };

    // Añadir el nuevo proyecto a la lista de proyectos en la página principal
    window.opener.addProject(project);

    // Cerrar la ventana del formulario
    window.close();
}

// Obtener la referencia al botón de regresar
const returnBtn = document.querySelector("#returnBtn");

// Agregar un evento de escucha para el clic en el botón de regresar
returnBtn.addEventListener("click", handleReturn);

// Función para manejar el clic en el botón de regresar
function handleReturn(event) {
    event.preventDefault();

    // Redireccionar al index original
    window.location.href = "../../../Views/Home/index.html";

    // Cerrar la ventana del formulario
    window.close();
}

// Obtener la referencia al formulario
const form = document.querySelector("#projectForm");

// Agregar un evento de escucha para el envío del formulario
form.addEventListener("submit", handleFormSubmit);