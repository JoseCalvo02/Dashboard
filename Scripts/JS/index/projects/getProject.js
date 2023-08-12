// Función para obtener los proyectos desde la base de datos
function getProjectsFromDatabase() {
    return $.ajax({
        url: '/getProjects', // Ajusta la ruta según tu configuración de servidor
        type: 'GET',
        dataType: 'json',
    });
}

// Función para formatear una fecha en el formato "dd/mm/yyyy"
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}