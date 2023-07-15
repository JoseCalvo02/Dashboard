const sql = require('mssql');
const dbConfig = require('../Server/dbConfig');

async function registerUser(name, email, password) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Ejecutar la consulta de inserción
        const query = `INSERT INTO registro_usuario (nombre, correo, contraseña) VALUES (@name, @email, @password)`;

        // Ejecutar consultas o operaciones en la base de datos
        request.input('name', sql.VarChar(100), name);
        request.input('email', sql.VarChar(100), email);
        request.input('password', sql.VarChar(100), password);
        const result = await request.query(query);

        console.log('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}

module.exports = {
    registerUser,
};