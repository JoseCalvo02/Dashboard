const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Obtener el campo de fecha por su ID
const dateField = document.getElementById('dateField');

// Obtener la fecha actual
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Aseguramos dos dígitos para el mes
const day = String(currentDate.getDate()).padStart(2, '0'); // Aseguramos dos dígitos para el día

// Formatear la fecha en el formato requerido por el input de tipo "date"
const formattedDate = `${year}-${month}-${day}`;

// Asignar la fecha actual al campo de fecha
dateField.value = formattedDate;
// Deshabilitar la interacción con el calendario emergente
dateField.addEventListener('click', (e) => e.preventDefault());

//Show Sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

//Close Sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

// Función para mostrar u ocultar el sidebar al cambiar el tamaño de la ventana
function toggleSidebar() {
    if (window.innerWidth >= 768) {
        sideMenu.style.display = 'block';
    } else {
        sideMenu.style.display = 'none';
    }
}

// Evento que se activa al cargar la página
window.addEventListener('load', function() {
    toggleSidebar(); // Mostrar u ocultar el sidebar al cargar la página
});

// Evento que se activa al cambiar el tamaño de la ventana
window.addEventListener('resize', toggleSidebar);

//Change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
    window.location.replace("../User/projectForm.html");
});

// Función para aplicar el estilo y el porcentaje a los círculos
function updateCircle(circle, percentage) {

    // Calculate the circumference of the circle
    const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
    // Calculate the dash offset
    const dashOffset = circumference * (1 - percentage / 100);

    /*
    ! Aplicar estilos y porcentaje a los circulos
    */
    // Apply the dasharray and dashoffset to the circle's stroke
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = dashOffset;

    // Use CSS variables for colors
    if (percentage > 80) {
        circle.style.stroke = "var(--color-success)";
    } else if (percentage > 40) {
        circle.style.stroke = "var(--color-warning)";
    } else {
        circle.style.stroke = "var(--color-danger)";
    }
}
/*
! Constantes para el funcionamiento de los procentajes de los circulos
*/
// Get the circle and percentage elements
const circlePending = document.getElementById("circlePending");
const percentagePendingText = document.getElementById("percentagePending");

const circleProgress = document.getElementById("circleProgress");
const percentageProgressText = document.getElementById("percentageProgress");

const circleDone = document.getElementById("circleDone");
const percentageDoneText = document.getElementById("percentageDone");

// Get the percentage value (remove the '%' sign and convert to a number)
const percentagePending = parseFloat(percentagePendingText.innerText);
const percentageProgress = parseFloat(percentageProgressText.innerText);
const percentageDone = parseFloat(percentageDoneText.innerText);

updateCircle(circlePending, percentagePending);
updateCircle(circleProgress, percentageProgress);
updateCircle(circleDone, percentageDone);