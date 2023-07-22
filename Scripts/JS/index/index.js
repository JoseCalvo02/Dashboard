const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

const themeToggler = document.querySelector(".theme-toggler");


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
    displayUserName(); // Mostrar el nombre de usuario al cargar la página
});

// Evento que se activa al cambiar el tamaño de la ventana
window.addEventListener('resize', toggleSidebar);

//Change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})