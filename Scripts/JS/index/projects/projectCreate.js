const projects = [];

// Función para llenar los proyectos en el array 'projects' y mostrarlos en la tabla
function fillProjects() {
    getProjectsFromDatabase()
        .done((projectsData) => {
            // Limpia el array 'projects' antes de llenarlo nuevamente
            projects.length = 0;

            // Agrega los proyectos obtenidos desde la base de datos al array 'projects'
            projectsData.forEach((project) => {
                projects.push(project);
            });

            const tableBody = document.getElementById("projectTableBody");
            tableBody.innerHTML = "";

            projects.forEach((project, index) => {
                const newRow = document.createElement("tr");

                const cell1 = document.createElement("td");
                cell1.textContent = index + 1;
                newRow.appendChild(cell1);

                const cell2 = document.createElement("td");
                cell2.textContent = project.name;
                newRow.appendChild(cell2);

                const cell3 = document.createElement("td");
                cell3.textContent = project.end_date;
                newRow.appendChild(cell3);

                const cell4 = document.createElement("td");
                cell4.textContent = project.description;
                newRow.appendChild(cell4);

                const cell5 = document.createElement("td");
                const link = document.createElement("a");
                link.href = "/Views/User/projects.html";
                link.textContent = "open";
                cell5.appendChild(link);
                newRow.appendChild(cell5);

                tableBody.appendChild(newRow);
            });
        })
        .fail((error) => {
            console.error('Error al obtener los proyectos desde la base de datos:', error);
        });
}

// Llama a la función fillProjects para llenar los proyectos al cargar la página
fillProjects();