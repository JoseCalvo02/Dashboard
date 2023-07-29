// Función para obtener los proyectos desde la base de datos
function getProjectsFromDatabase() {
    return $.ajax({
        url: '/getProjects', // Ajusta la ruta según tu configuración de servidor
        type: 'GET',
        dataType: 'json',
    });
}