const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

async function registerUser(userSignup, emailSignup, pass1) {
    try {
        console.log('Valores recibidos:', userSignup, emailSignup, pass1);
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Ejecutar la consulta de inserción
        const query = `INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)`;

        // Ejecutar consultas o operaciones en la base de datos
        const request = pool.request();
        request.input('name', sql.VarChar(100), userSignup);
        request.input('email', sql.VarChar(100), emailSignup);
        request.input('password', sql.VarChar(100), pass1);
        const result = await request.query(query);

        console.log('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}

module.exports = {
    registerUser,
};