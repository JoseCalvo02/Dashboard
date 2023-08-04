//Global Variables
var consultIDproject= new URLSearchParams(window.location.search); //Consulta la URL actual
var selectedProjectID = consultIDproject.get('id');
var taskCreate = document.querySelector('.task-create');


/*
! Evento que se activa cuando la página se carga completamente
*/
document.addEventListener('DOMContentLoaded', (event) => {
    // Obtener una referencia al botón de guardar
    const saveButton = document.getElementById("saveButton");
    const descriptionInput = document.getElementById('description');

    /*
    ! Evento que se activa cuando la página se carga completamente
    */
    // Función para crear una tarea tanto en la vista como en la base de datos
    function createTaskAndSave() {
        const tagSelect = document.getElementById('tagSelect');
        const selectedTag = tagSelect.options[tagSelect.selectedIndex].value;
        const taskName = descriptionInput.value.trim();

        // Verificamos si el texto tiene más de 32 caracteres sin espacios
        if (taskName !== '') {
            // Separar el texto en cadenas de máximo 32 caracteres
            const separatedText = separateTextIntoChunks(taskName);

            createTaskToList(separatedText, selectedTag);
            createTask(separatedText, selectedTag);

        }
        else{
            // Si el nuevo texto está vacío
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The task cannot exceed 32 caracteres or be empty.",
            });
        }
    }

    /*
    ! Agregar un evento click al botón de guardar
    */
    saveButton.addEventListener("click", createTaskAndSave);

    /*
    ! Agregar un evento click al botón de "enter"
    */
    descriptionInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Previene el comportamiento predeterminado (agregar una nueva línea)
            createTaskAndSave();
        }
    });

    /*
    ! Agregar un evento click al botón de refrescar
    */
    getProjectsTasks();
});
