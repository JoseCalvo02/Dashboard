const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../Controllers/User/userController');
const { getUserById } = require('../../Controllers/User/userUtils');
const isAuthenticated = require('../Middleware/authMiddleware');

// Ruta POST para registrar un nuevo usuario
router.post('/user/register', async (req, res) => {
    try {
        const { fullNameSignup, userSignup, emailSignup, pass1 } = req.body;
        await registerUser(fullNameSignup, userSignup, emailSignup, pass1);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        if (error.message === 'Usuario duplicado') {
            res.status(409).json({ message: 'Ya existe un usuario con el mismo nombre de usuario' });
        } else if(error.message === 'Correo electrónico duplicado') {
            res.status(409).json({ message: 'Ya existe un usuario con el mismo correo electrónico' });
        }else {
            res.status(500).json({ message: 'Se produjo un error al registrar el usuario' });
        }
    }
});

// Ruta POST para el inicio de sesión
router.post('/user/login', async (req, res) => {
    try {
        const { userLogin, passLogin } = req.body;

        console.log('Intento de inicio de sesión:', userLogin, passLogin); // Agregar este console.log
        const user = await loginUser(userLogin, passLogin);

        if (user) {
            // Configurar el objeto de sesión con el userId del usuario autenticado
            req.session.userId = user.id;

            // Obtener los detalles del usuario
            const userDetails = await getUserById(user.id);
            // Imprimir en la consola el id y los datos del usuario
            console.log('Datos del usuario:', userDetails);

            // Enviar los detalles del usuario junto con la respuesta
            res.status(200).json({ message: 'Inicio de sesión exitoso', userDetails });
        } else {
            // Las credenciales son incorrectas
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Ruta para cerrar sesión
router.get('/user/logout', (req, res) => {
    // Destruir la sesión para cerrar la sesión del usuario
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }

        // Redirigir al formulario de inicio de sesión después de cerrar sesión
        res.redirect('/'); // Puedes redirigir a otra página si lo prefieres
    });
});

// Ruta protegida que requiere inicio de sesión
router.get('/user/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        // Si el usuario ha iniciado sesión, redirigir a la página del perfil del usuario
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.sendFile(path.join(__dirname, '../Views/Home/index.html'));
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).json({ message: 'Error al obtener los detalles del usuario' });
    }
});

// Exporta el enrutador
module.exports = router;