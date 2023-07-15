const express = require('express');
const sql = require('mssql');
const path = require('path');
const { registerUser } = require('../User/registerUserModel');

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
app.use('/static', express.static(path.join(__dirname, '../../Content')));
app.use('/assets', express.static(path.join(__dirname, '../../Assets')));
app.use('/scripts', express.static(path.join(__dirname, '../../Scripts')));
app.use(express.static(path.join(__dirname, '../../Views')));

// Ruta principal que sirve el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Views/Home/index.html'));
});

// Ruta POST para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        await registerUser(name, email, password);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});