/*
! Función para crear un elemento un project task para la vista
*/
function createTaskToList(taskName, selectedTag, taskId) {
    if (taskName.trim() !== '') {
        var tagClass = '';

        switch (selectedTag) {
            case 'Low Priority':
                tagClass = 'task__tag--low';
                break;
            case 'Medium Priority':
                tagClass = 'task__tag--medium';
                break;
            case 'High Priority':
                tagClass = 'task__tag--high';
                break;
            default:
                tagClass = 'task__tag--default';
                break;
        }

        var taskTemplate = `
            <div class='task' draggable='true' data-task-id='${taskId}'>
                <div class='task__stats'>
                    <div class='task__tags'>
                        <span class='task__tag ${tagClass}'>${selectedTag}</span>
                        <button class='task__options'><i class="fas fa-ellipsis-h"></i></button>
                    </div>
                </div>
                <p>${taskName}</p>
                <div class='task__stats'>
                    <span><time datetime="2021-11-24T20:00:00"><i class="fas fa-flag"></i>Nov 24</time></span>
                    <span><i class="fas fa-comment"></i>3</span>
                    <span><i class="fas fa-paperclip"></i>7</span>
                    <span class='task__owner'></span>
                </div>
            </div>
        `;

        var taskCreateParent = taskCreate.parentElement;
        var newTask = createElementFromHTML(taskTemplate);
        taskCreateParent.appendChild(newTask);

        // Agregar los eventos de arrastre al nuevo task
        newTask.addEventListener('dragstart', handleDragStart, false);
        newTask.addEventListener('dragenter', handleDragEnter, false);
        newTask.addEventListener('dragover', handleDragOver, false);
        newTask.addEventListener('dragleave', handleDragLeave, false);
        newTask.addEventListener('drop', handleDrop, false);
        newTask.addEventListener('dragend', handleDragEnd, false);
    }

    return newTask;
}

/*
! Función para crear un elemento de project task para la vista
*/
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

/*
! Función para crear un elemento de project task en la BD
*/
function createTask(taskName, selectedTag){
    return new Promise((resolve, reject) => {
        // Crear un objeto con los datos a enviar al servidor
        const formData = {
            taskName,
            selectedTag,
            selectedProjectID
        };

        // Realizar una solicitud AJAX al servidor
        $.ajax({
            url: "/CreateProjectTask", // Ruta de la API para guardar la tarea
            type: "POST", // Método HTTP POST
            dataType: "json", // Esperamos una respuesta en formato JSON
            data: JSON.stringify(formData), // Datos a enviar al servidor en formato JSON
            contentType: "application/json", // Tipo de contenido de la solicitud
            success: function (response) {
                const taskId = response.taskId;

                Swal.fire({
                    icon: "success",
                    title: "Task Created",
                    text: "The task was created successfully",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });

                resolve(taskId); // Resolvemos la promesa con el taskId
            },
            error: function (error) {
                reject(error); // Rechazamos la promesa si ocurre un error
            },
        });
    });
}

/*
! Función para separar el texto en cadenas de texto sin espacios
*/
function separateTextIntoChunks(text) {
    const maxLength = 17;
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        let chunk;
        if (i === 0) {
            chunk = text.substring(i, i + maxLength);
            i += maxLength;
        } else {
            chunk = text.substring(i, i + maxLength);
            i += maxLength - 1;
        }
        chunks.push(chunk);
    }
    return chunks.join('\n');
}