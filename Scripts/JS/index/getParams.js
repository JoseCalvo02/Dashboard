function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const userJSON = params.get('user');
    if (userJSON) {
        return JSON.parse(decodeURIComponent(userJSON));
    }
    return null;
}

function displayUserName() {
    const userDetails = getURLParams();
    if (userDetails) {
        // Mostrar el nombre de usuario en el HTML
        document.getElementById('userNamePlaceholder').textContent = userDetails.username;
    }
}