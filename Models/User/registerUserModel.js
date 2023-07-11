module.exports = {
    registerUser,
};

async function registerUser(nombre, correo, contraseña) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Ejecutar la consulta de inserción
        const query = `INSERT INTO registro_usuario (nombre, correo, contraseña) VALUES (@nombre, @correo, @contraseña)`;

        // Ejecutar consultas o operaciones en la base de datos
        const request = pool.request();
        request.input('nombre', sql.VarChar(100), nombre);
        request.input('correo', sql.VarChar(100), correo);
        request.input('contraseña', sql.VarChar(100), contraseña);
        const result = await request.query(query);

        console.log('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
}