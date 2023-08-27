//Global Variables
var urlParams = new URLSearchParams(window.location.search);
var idProyecto = atob(decodeURIComponent(urlParams.get("id")));
var nombreProyecto = atob(decodeURIComponent(urlParams.get("proyecto")));

var taskCreate = document.querySelector('.task-create');

/*
! Evento que se activa cuando la página se carga completamente
*/
document.addEventListener('DOMContentLoaded', (event) => {
    // Obtener una referencia al botón de guardar
    const saveButton = document.getElementById("saveButton");
    const descriptionInput = document.getElementById('description');

    /*
    ! Evento que se activa cuando se guarda una tarea
    */
    async function createTaskAndSave() {
        const tagSelect = document.getElementById('tagSelect');
        const selectedTag = tagSelect.options[tagSelect.selectedIndex].value;
        const taskName = descriptionInput.value.trim();

        // Verificamos si el texto tiene más de 32 caracteres sin espacios
        if (taskName !== '') {
            // Separar el texto en cadenas de máximo 32 caracteres
            const separatedText = separateTextIntoChunks(taskName);

            try {
                // Llamamos a createTask y esperamos a que devuelva el taskId
                const taskId = await createTask(separatedText, selectedTag);

                createTaskToList(separatedText, selectedTag, taskId);
            } catch (error) {
                console.error("Error guardando la tarea:", error);
            }
        }
        else{
            // Si el nuevo texto está vacío
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The task cannot be empty.",
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
    ! Obtener las tareas de los proyectos
    */
    getProjectsTasks();
});
