const sql = require('mssql');
const dbConfig = require('../Server/dbConfig');

async function registerUser(name, email, password) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Ejecutar la consulta de inserción
        const query = `INSERT INTO registro_usuario (name, email, password) VALUES (@nombre, @correo, @contraseña)`;

        // Ejecutar consultas o operaciones en la base de datos
        const request = pool.request();
        request.input('nombre', sql.VarChar(100), name);
        request.input('correo', sql.VarChar(100), email);
        request.input('contraseña', sql.VarChar(100), password);
        const result = await request.query(query);

        console.log('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}

module.exports = {
    registerUser,
};