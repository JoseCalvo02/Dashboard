const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

// Función para crear un nuevo reminder y devolver el ID del nuevo reminder
async function createReminder(userId, name, status) {
    try {
        if (!name) {
            throw new Error('El nombre del reminder no puede estar vacío');
        }

        const query = 'INSERT INTO Reminders (userId, name, status) OUTPUT INSERTED.id VALUES (@userId, @name, @status)';
        const pool = await sql.connect(dbConfig);

        const request = pool.request();
        request.input('userId', sql.Int, userId);
        request.input('name', sql.VarChar(100), name);
        request.input('status', sql.VarChar(50), status);

        const result = await request.query(query);
        const newReminderId = result.recordset[0].id;
        pool.close();

        if (newReminderId) {
            return newReminderId;
        } else {
            throw new Error('La inserción en la base de datos no devolvió el ID del nuevo reminder');
        }
    } catch (error) {
        console.error('Error al guardar el reminder en la base de datos:', error);
        throw error;
    }
}

// Función para actualizar el status de un reminder
async function updateReminderStatus(reminderId, status) {
    try {
        const query = 'UPDATE Reminders SET status = @status WHERE id = @reminderId';
        const pool = await sql.connect(dbConfig);

        const request = pool.request();
        request.input('status', sql.VarChar(50), status);
        request.input('reminderId', sql.Int, reminderId);

        await request.query(query);
        pool.close();
    } catch (error) {
        console.error('Error al actualizar el status del reminder en la base de datos:', error);
        throw error;
    }
}


module.exports = {
    createReminder,
    updateReminderStatus,
};