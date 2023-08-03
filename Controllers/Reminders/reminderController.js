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

// Función para obtener los reminders del usuario desde la base de datos
async function getReminders(userId) {
    try {
        const query = 'SELECT id, name, status FROM Reminders WHERE userId = @userId';
        const pool = await sql.connect(dbConfig);

        const request = pool.request();
        request.input('userId', sql.Int, userId);

        const result = await request.query(query);
        pool.close();

        // Mapear los resultados de la base de datos en el formato de objetos de reminders
        const reminders = result.recordset.map(record => ({
            id: record.id,
            name: record.name,
            status: record.status
        }));

        return reminders;
    } catch (error) {
        console.error('Error al obtener los reminders desde la base de datos:', error);
        throw error;
    }
}

// Función para actualizar el texto de los reminders del usuario desde la base de datos
async function editReminder(userId, editedText, reminderId) {
    try {
        console.log("userId: " + userId);
        console.log("editedText: " + editedText);
        console.log("remidnerId: " + reminderId);
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Verificar si el reminder existe y pertenece al usuario
        const query = `SELECT * FROM Reminders WHERE id = @reminderId AND userId = @userId`;
        const request = pool.request();
        request.input('userId', sql.Int, userId);
        request.input('reminderId', sql.Int, reminderId);
        const result = await request.query(query);
        const reminder = result.recordset[0];

        if (!reminder) {
            throw new Error('El reminder no existe o no pertenece al usuario');
        }

        // Actualizar el texto del reminder
        const updateQuery = `UPDATE Reminders SET name = @editedText WHERE id = @reminderId`;
        const updateRequest = pool.request();
        updateRequest.input('reminderId', sql.Int, reminderId);
        updateRequest.input('editedText', sql.VarChar(100), editedText);
        await updateRequest.query(updateQuery);
    } catch (error) {
        console.error('Error al editar el reminder:', error);
        throw error;
    }
}

module.exports = {
    createReminder,
    updateReminderStatus,
    getReminders,
    editReminder,
};