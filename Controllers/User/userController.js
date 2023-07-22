const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

async function registerUser(fullNameSignup, userSignup, emailSignup, pass1) {
    try {
        console.log('Valores recibidos:', fullNameSignup, userSignup, emailSignup, pass1);
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Verificar si el usuario ya existe en la base de datos
        const checkUsernameQuery = `SELECT COUNT(*) AS count FROM Users WHERE username = @username`;
        const checkUsernameRequest = pool.request();
        checkUsernameRequest.input('username', sql.VarChar(100), userSignup);
        const checkUsernameResult = await checkUsernameRequest.query(checkUsernameQuery);
        const usernameCount = checkUsernameResult.recordset[0].count;

        if (usernameCount > 0) {
            // Usuario con el mismo nombre de usuario ya existe
            throw new Error('Usuario duplicado');
        }

        // Verificar si el correo electrónico ya existe en la base de datos
        const checkEmailQuery = `SELECT COUNT(*) AS count FROM Users WHERE email = @email`;
        const checkEmailRequest = pool.request();
        checkEmailRequest.input('email', sql.VarChar(100), emailSignup);
        const checkEmailResult = await checkEmailRequest.query(checkEmailQuery);
        const emailCount = checkEmailResult.recordset[0].count;

        if (emailCount > 0) {
            // Usuario con el mismo correo electrónico ya existe
            throw new Error('Correo electrónico duplicado');
        }

        // Ejecutar la consulta de inserción
        const query = `INSERT INTO Users (fullname, username, email, password) VALUES (@fullname, @username, @email, @password)`;

        // Ejecutar consultas o operaciones en la base de datos
        const request = pool.request();
        request.input('fullname', sql.VarChar(100), fullNameSignup);
        request.input('username', sql.VarChar(100), userSignup);
        request.input('email', sql.VarChar(100), emailSignup);
        request.input('password', sql.VarChar(100), pass1);
        const result = await request.query(query);

        console.log('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);

        // Verificar si es un error de valor duplicado
        if (error.message === 'Correo electrónico duplicado') {
            throw new Error('Correo electrónico duplicado');
        } else {
            throw error;
        }
    }
}

async function loginUser(userLogin, passLogin) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Verificar si el usuario y la contraseña coinciden en la base de datos
        const query = `SELECT * FROM Users WHERE username = @username AND password = @password`;
        const request = pool.request();
        request.input('username', sql.VarChar(100), userLogin);
        request.input('password', sql.VarChar(100), passLogin);
        const result = await request.query(query);
        const user = result.recordset[0];

        if (user) {
            // Las credenciales son correctas, devolver el objeto con el recuento de filas
            return user;
        } else {
            // Las credenciales son incorrectas
            return null;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
};