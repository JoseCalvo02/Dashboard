var dragSrcEl = null;
var projectColumns = document.querySelectorAll('.project-column');

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    e.stopPropagation(); // Evita que el evento se propague a elementos superiores

    var targetColumnIndex = Array.from(projectColumns).indexOf(this) + 1;

    if (dragSrcEl !== this) { // Comprueba si el elemento arrastrado es diferente al elemento sobre el que se suelta
        var droppedTask = dragSrcEl; // Guarda el elemento arrastrado en una variable
        const taskId = droppedTask.getAttribute('data-task-id');

        if (this.classList.contains('task')) { // Si el elemento sobre el que se suelta es una tarea
            if (this.previousSibling === dragSrcEl) {
                // No hacer nada si el elemento se suelta sobre sí mismo (el anterior es el mismo que el arrastrado)
                return;
            }
            const targetColumnIndex = Array.from(projectColumns).indexOf(this.parentNode) + 1; // Tomar la posición de la columna de destino
            this.parentNode.insertBefore(droppedTask, this); // Inserta el elemento arrastrado antes del elemento sobre el que se suelta
            saveTaskPositionInDatabase(taskId, targetColumnIndex);
        } else if (this.classList.contains('project-column') && this.querySelector('.task')) {
            // Si el elemento sobre el que se suelta es una columna de proyecto y contiene una tarea
            this.appendChild(droppedTask); // Añade el elemento arrastrado como último hijo del elemento sobre el que se suelta
            saveTaskPositionInDatabase(taskId, targetColumnIndex);
        } else if (this.classList.contains('project-column') && !this.querySelector('.task')) {
            // Si el elemento sobre el que se suelta es una columna de proyecto y no contiene ninguna tarea
            this.appendChild(droppedTask); // Añade el elemento arrastrado como último hijo del elemento sobre el que se suelta
            saveTaskPositionInDatabase(taskId, targetColumnIndex);
        } else {
            this.parentNode.insertBefore(droppedTask, this); // Inserta el elemento arrastrado antes del elemento sobre el que se suelta
            saveTaskPositionInDatabase(taskId, targetColumnIndex);
        }
    }

    // Eliminar la clase de estilo de arrastre de la columna
    projectColumns.forEach(function (column) {// Obtén todas las columnas de proyecto
        column.classList.remove('task-hover'); // Elimina la clase "task-hover" de cada columna
    });

    location.reload();
    return false; // Evita el comportamiento predeterminado del navegador
}

function handleDragEnter(e) {
    // Agregar la clase de estilo de arrastre a la columna
    this.classList.add('task-hover');
}

function handleDragLeave(e) {
    // Verificar si el puntero del mouse ha dejado realmente la columna
    if (!e.relatedTarget || !this.contains(e.relatedTarget)) {
        // Eliminar la clase de estilo de arrastre de la columna
        this.classList.remove('task-hover');
    }
}

function handleDragEnd(e) {
    var tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        task.classList.remove('task-hover');
    });
}

function saveTaskPositionInDatabase(taskId, columnIndex) {
    const taskMovement = {
        taskId: taskId,
        columnIndex: columnIndex
    };

    // Envía los datos al servidor mediante AJAX
    $.ajax({
        url: `/saveTaskPosition?id=${encodeURIComponent(selectedProjectID)}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(taskMovement),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error('Error al guardar el movimiento de tarea en la base de datos:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    var tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        task.addEventListener('dragstart', handleDragStart, false);
        task.addEventListener('dragenter', handleDragEnter, false);
        task.addEventListener('dragover', handleDragOver, false);
        task.addEventListener('dragleave', handleDragLeave, false);
        task.addEventListener('drop', handleDrop, false);
        task.addEventListener('dragend', handleDragEnd, false);
    });

    projectColumns.forEach(function (column) {
        column.addEventListener('dragover', handleDragOver, false);
        column.addEventListener('dragenter', handleDragEnter, false);
        column.addEventListener('dragleave', handleDragLeave, false);
        column.addEventListener('drop', handleDrop, false);
    });
});