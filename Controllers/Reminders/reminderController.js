const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

// Función para crear un nuevo reminder
async function createReminder(userId, name, status) {
    try {
        if (!name) {
            throw new Error('El nombre del reminder no puede estar vacío');
        }

        const query = 'INSERT INTO Reminders (userId, name, status) VALUES (@userId, @name, @status)';
        const pool = await sql.connect(dbConfig);

        const request = pool.request();
        request.input('userId', sql.Int, userId);
        request.input('name', sql.VarChar(100), name);
        request.input('status', sql.VarChar(50), status);

        await request.query(query);
        pool.close(); // Importante cerrar la conexión después de usarla
    } catch (error) {
        console.error('Error al guardar el reminder en la base de datos:', error);
        throw error;
    }
}

module.exports = {
    createReminder
};