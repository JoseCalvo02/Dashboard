document.addEventListener('DOMContentLoaded', (event) => {
    var dragSrcEl = null;
    var taskCreate = document.querySelector('.task-create');
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

        if (dragSrcEl !== this) { // Comprueba si el elemento arrastrado es diferente al elemento sobre el que se suelta
            var droppedTask = dragSrcEl; // Guarda el elemento arrastrado en una variable
            var originalColumn = dragSrcEl.parentNode; // Guarda la columna original del elemento arrastrado

            if (this.classList.contains('task')) { // Si el elemento sobre el que se suelta es una tarea
                if (this.previousSibling === dragSrcEl) {
                    // No hacer nada si el elemento se suelta sobre sí mismo (el anterior es el mismo que el arrastrado)
                    return;
                }
                this.parentNode.insertBefore(droppedTask, this); // Inserta el elemento arrastrado antes del elemento sobre el que se suelta
            } else if (this.classList.contains('project-column') && this.querySelector('.task')) {
                // Si el elemento sobre el que se suelta es una columna de proyecto y contiene una tarea
                this.appendChild(droppedTask); // Añade el elemento arrastrado como último hijo del elemento sobre el que se suelta

            } else if (this.classList.contains('project-column') && !this.querySelector('.task')) {
                // Si el elemento sobre el que se suelta es una columna de proyecto y no contiene ninguna tarea
                if (this.nextSibling === taskCreate) {
                    this.parentNode.appendChild(droppedTask, taskCreate); // Inserta el elemento arrastrado antes del elemento "taskCreate"
                } else {
                    this.appendChild(droppedTask); // Añade el elemento arrastrado como último hijo del elemento sobre el que se suelta
                }
            } else {
                this.parentNode.insertBefore(droppedTask, this); // Inserta el elemento arrastrado antes del elemento sobre el que se suelta
            }
        }

        // Eliminar la clase de estilo de arrastre de la columna
        var columns = document.querySelectorAll('.project-column'); // Obtén todas las columnas de proyecto
        columns.forEach(function (column) {
            column.classList.remove('task-hover'); // Elimina la clase "task-hover" de cada columna
        });

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