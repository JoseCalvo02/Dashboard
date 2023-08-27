// Función para obtener los proyectos desde la base de datos
function getProjectsFromDatabase() {
    return $.ajax({
        url: '/getProjects', // Ajusta la ruta según tu configuración de servidor
        type: 'GET',
        dataType: 'json',
    });
}

function formatDateWithClasses(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Obtener la fecha actual sin horas, minutos y segundos
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Obtener los valores de día, mes y año de la fecha actual y de la fecha en cuestión
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const dateDay = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    // Comparar las fechas sin tener en cuenta las horas, minutos y segundos
    if (dateYear > currentYear || (dateYear === currentYear && dateMonth > currentMonth) || (dateYear === currentYear && dateMonth === currentMonth && dateDay > currentDay)) {
        return `<span class="success">${formattedDate}</span>`;
    } else if (dateYear === currentYear && dateMonth === currentMonth && dateDay === currentDay) {
        return `<span class="warning">${formattedDate}</span>`;
    } else {
        return `<span class="danger">${formattedDate}</span>`;
    }
}