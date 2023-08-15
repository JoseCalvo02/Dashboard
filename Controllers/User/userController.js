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

        // Execute the insertion query
        await request.query(query);

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
        const query = `SELECT * FROM Users WHERE username COLLATE SQL_Latin1_General_CP1_CS_AS = @username AND password COLLATE SQL_Latin1_General_CP1_CS_AS = @password`;
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

async function UpdateUserNombre(NombreUsuario, userId) {
    try {
        const pool = await sql.connect(dbConfig);

        const query = 'UPDATE Users SET fullName = @NombreUsuario WHERE id = @userId;';
        const request = pool.request();
        request.input('NombreUsuario', sql.VarChar(100), NombreUsuario);
        request.input('userId', sql.Int, userId);
        await request.query(query);
        pool.close();

        return 'Nombre de usuario actualizado correctamente';
    } catch (error) {
        console.error('Error al actualizar el nombre de usuario:', error);
        throw error;
    }
}

async function UpdateUserPass(pass1, userId) {
    try {
        const pool = await sql.connect(dbConfig);

        const query = 'UPDATE Users SET password = @pass1 WHERE id = @userId;';
        const request = pool.request();
        request.input('pass1', sql.VarChar(100), pass1);
        request.input('userId', sql.Int, userId);
        await request.query(query);
        pool.close();

        return 'Contraseña actualizada correctamente';
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw error;
    }
}

async function getUserData(userId) {
    try {
        const pool = await sql.connect(dbConfig);

        const query = 'SELECT fullName, username, email FROM Users WHERE id = @userId;';
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        
        const result = await request.query(query);
        pool.close();

        if (result.recordset.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        return result.recordset[0]; // El resultado debe ser un objeto con las propiedades fullName, username y email

    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        throw error;
    }
}

async function deleteUserProfile(userId) {
    try {
        const pool = await sql.connect(dbConfig);

        // Eliminar datos de la tabla ProjectsHomepage que hacen referencia a los registros en Projects
        const deleteProjectsHomepageQuery = 'DELETE FROM ProjectsHomepage WHERE projectId IN (SELECT id FROM Projects WHERE user_id = @userId);';
        const deleteProjectsHomepageRequest = pool.request();
        deleteProjectsHomepageRequest.input('userId', sql.Int, userId);
        await deleteProjectsHomepageRequest.query(deleteProjectsHomepageQuery);

        // Eliminar datos de la tabla Projects
        const deleteProjectsQuery = 'DELETE FROM Projects WHERE user_id = @userId;';
        const deleteProjectsRequest = pool.request();
        deleteProjectsRequest.input('userId', sql.Int, userId);
        await deleteProjectsRequest.query(deleteProjectsQuery);

        // Eliminar datos de la tabla Reminders
        const deleteRemindersQuery = 'DELETE FROM Reminders WHERE userId = @userId;';
        const deleteRemindersRequest = pool.request();
        deleteRemindersRequest.input('userId', sql.Int, userId);
        await deleteRemindersRequest.query(deleteRemindersQuery);

        // Finalmente, eliminar el perfil de la tabla Users
        const deleteUserQuery = 'DELETE FROM Users WHERE id = @userId;';
        const deleteUserRequest = pool.request();
        deleteUserRequest.input('userId', sql.Int, userId);
        await deleteUserRequest.query(deleteUserQuery);

        pool.close();

        console.log('Perfil y datos asociados eliminados correctamente');
        return true; 

    } catch (error) {
        console.error('Error al eliminar el perfil y datos asociados:', error);
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
    UpdateUserNombre,
    UpdateUserPass,  
    getUserData,
    deleteUserProfile

};