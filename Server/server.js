const express = require('express');
const sql = require('mssql');
const path = require('path');
const { registerUser, loginUser } = require('../Controllers/User/userController');

const app = express();
const port = 443;

// La conexión a la base de datos
const dbConfig = require('./dbConfig');

// Conexión a la base de datos
sql.connect(dbConfig)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../')));

// Ruta principal que sirve el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/Home/index.html'));
});

// Ruta POST para registrar un nuevo usuario
app.post('/user/register', async (req, res) => {
    const { userSignup, emailSignup, pass1 } = req.body;

    try {
        await registerUser(userSignup, emailSignup, pass1);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        if (error.message === 'Correo electrónico duplicado') {
            res.status(409).json({ message: 'Ya existe un usuario con el mismo correo electrónico' });
        } else {
            res.status(500).json({ message: 'Se produjo un error al registrar el usuario' });
        }
    }
});

// Ruta POST para el inicio de sesión
app.post('/user/login', async (req, res) => {
    const { userLogin, passLogin } = req.body;

    try {
        const authenticated = await loginUser(userLogin, passLogin);
        if (authenticated) {
            // El inicio de sesión es exitoso
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Las credenciales son incorrectas
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Rutas
app.use(require('./routes'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});