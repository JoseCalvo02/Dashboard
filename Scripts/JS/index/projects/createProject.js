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

            projects.forEach((project) => {
                const newRow = document.createElement("tr");

                const cell1 = document.createElement("td");
                cell1.textContent = project.id;
                newRow.appendChild(cell1);

                const cell2 = document.createElement("td");
                cell2.textContent = project.name;
                newRow.appendChild(cell2);

                const cell3 = document.createElement("td");
                cell3.innerHTML = formatDateWithClasses(project.end_date); // Formatear la fecha con clases
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

                // Agrega el nombre del proyecto como un atributo de datos al elemento de enlace
                link.setAttribute("data-nombre-proyecto", project.name);
                link.setAttribute("data-id-proyecto", project.id);
            });
            // agrega el evento de clic a los enlaces "open"
            addOpenLinkEventListeners();
        })
        .fail((error) => {
            console.error('Error al obtener los proyectos desde la base de datos:', error);
        });
}

// Llama a la función fillProjects para llenar los proyectos al cargar la página
fillProjects();

// Función para manejar los clics en el enlace "open"
function addOpenLinkEventListeners() {
    const openLinks = document.querySelectorAll("a[data-nombre-proyecto]");

    openLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            // Obtén el nombre del proyecto desde el atributo de datos
            const nombreProyecto = link.getAttribute("data-nombre-proyecto");
            const idProyecto = link.getAttribute("data-id-proyecto");

            // Codifica los parámetros antes de agregarlos a la URL
            const encodedNombre = encodeURIComponent(btoa(nombreProyecto));
            const encodedId = encodeURIComponent(btoa(idProyecto));

            // Cambia la ubicación actual a la nueva página, reemplazando la página actual
            window.location.href = `../User/projects.html?proyecto=${encodedNombre}&id=${encodedId}`;
        });
    });
}