document.addEventListener('DOMContentLoaded', (event) => {
    var taskCreate = document.querySelector('.task-create');
    var descriptionInput = document.getElementById('description');
    var doneButton = taskCreate.querySelector('.task-create__button button');

    function createTask() {
        var taskName = descriptionInput.value;
        if (taskName.trim() !== '') {
            var tagSelect = document.getElementById('tagSelect');
            var selectedTag = tagSelect.options[tagSelect.selectedIndex].value;
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
                <div class='task' draggable='true'>
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

    doneButton.addEventListener('click', createTask);
    descriptionInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            createTask();
        }
    });
});