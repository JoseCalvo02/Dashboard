const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

async function getUserById(userId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consultar los detalles del usuario por su ID
        const query = `SELECT * FROM Users WHERE id = @userId`;
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(query);
        const user = result.recordset[0];

        return user;
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        throw error;
    }
}

module.exports = {
    getUserById,
};