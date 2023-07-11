const express = require('express');
const sql = require('mssql');
const { registerUser } = require('../User/registerUserModel');

const app = express();
const port = 3000;

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