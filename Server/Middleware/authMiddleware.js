// Este middleware se asegurará de que el usuario haya iniciado sesión antes de permitir el acceso a las páginas protegidas
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        // El usuario ha iniciado sesión, permitir el acceso a la página
        next();
    } else {
        // El usuario no ha iniciado sesión, redirigirlo al formulario de inicio de sesión
        res.redirect('/');
    }
}

module.exports = isAuthenticated;