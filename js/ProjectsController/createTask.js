document.addEventListener('DOMContentLoaded', (event) => {
    var taskCreate = document.querySelector('.task-create');
    var descriptionInput = document.getElementById('description');

    function createTask() {
        var taskName = descriptionInput.value;
        if (taskName.trim() !== '') {
            var taskTemplate = `
                <div class='task' draggable='true'>
                    <div class='task__tags'>
                        <span class='task__tag task__tag--design'>UI Design</span>
                        <button class='task__options'><i class="fas fa-ellipsis-h"></i></button>
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
            var taskContainer = document.querySelector('.project-column:first-child');
            var taskCreateParent = taskCreate.parentElement;
            var newTask = createElementFromHTML(taskTemplate);
            taskCreateParent.insertBefore(newTask, taskCreate.nextSibling);
            descriptionInput.value = '';

            // Agregar los eventos de arrastre al nuevo task
            newTask.addEventListener('dragstart', handleDragStart, false);
            newTask.addEventListener('dragenter', handleDragEnter, false);
            newTask.addEventListener('dragover', handleDragOver, false);
            newTask.addEventListener('dragleave', handleDragLeave, false);
            newTask.addEventListener('drop', handleDrop, false);
            newTask.addEventListener('dragend', handleDragEnd, false);
        }
    }

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    taskCreate.addEventListener('click', createTask);
    descriptionInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            createTask();
        }
    });
});