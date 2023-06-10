const projects = [];

function fillProjects() {
    const tableBody = document.getElementById("projectTableBody");
    tableBody.innerHTML = "";

    projects.forEach((project, index) => {
        const newRow = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = index + 1;
        newRow.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.textContent = project.projectName;
        newRow.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.textContent = project.dueDate;
        newRow.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.textContent = project.description;
        newRow.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = "open";
        newRow.appendChild(cell5);

        tableBody.appendChild(newRow);
    });
}

function addProject(project) {
    projects.push(project);
    fillProjects();
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
    window.open("projectForm.html", "_blank");
});

fillProjects();
