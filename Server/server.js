const express = require('express');
const sql = require('mssql');
const path = require('path');
const session = require('express-session');
const { registerUser, loginUser } = require('../Controllers/User/userController');
const { getUserById } = require('../Controllers/User/userUtils');

const app = express();
const port = 443;

const sessionSecret = process.env.SESSION_SECRET || 'default-secret';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

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
    res.sendFile(path.join(__dirname, '../Views/Home/login.html'));
});

// Ruta POST para registrar un nuevo usuario
app.post('/user/register', async (req, res) => {
    const { fullNameSignup, userSignup, emailSignup, pass1 } = req.body;

    try {
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
app.post('/user/login', async (req, res) => {
    const { userLogin, passLogin } = req.body;

    try {
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

// Rutas
app.use(require('./routes'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});