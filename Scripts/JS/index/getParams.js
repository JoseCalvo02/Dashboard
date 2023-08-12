function displayUserName() {
    // Recupera los detalles del usuario de localStorage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedUserDetails) {
        // Mostrar el nombre de usuario en el HTML
        document.getElementById('userNamePlaceholder').textContent = storedUserDetails.username;
    }
}

// Agrega un controlador de eventos al evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para mostrar el nombre de usuario cuando la página se carga
    displayUserName();
});