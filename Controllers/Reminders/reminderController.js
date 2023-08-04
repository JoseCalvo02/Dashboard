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

        // Verificar si hay algún reminder en la tabla
        const checkEmptyQuery = 'SELECT TOP 1 * FROM Reminders';
        const checkEmptyResult = await pool.request().query(checkEmptyQuery);

        const request = pool.request();
        request.input('userId', sql.Int, userId);
        request.input('name', sql.VarChar(100), name);
        request.input('status', sql.VarChar(50), status);

        let newReminderId;

        if (checkEmptyResult.recordset.length === 0) {
            // No hay ningún reminder en la tabla, reiniciar la secuencia de IDs a 0
            const resetIdentityQuery = 'DBCC CHECKIDENT (Reminders, RESEED, 1)';
            await pool.request().query(resetIdentityQuery);

            // Insertar el nuevo reminder
            const result = await request.query(query);
            newReminderId = result.recordset[0].id;
        } else {
            // Insertar el nuevo reminder sin reiniciar la secuencia de IDs
            const result = await request.query(query);
            newReminderId = result.recordset[0].id;
        }

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

async function deleteReminder(userId, reminderId) {
    try {
        // Realizar la conexión a la base de datos usando dbConfig
        const pool = await sql.connect(dbConfig);

        // Iniciar una transacción para asegurar que todas las operaciones se realicen de manera segura
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Verificar si el reminder pertenece al usuario antes de eliminarlo
        const verifyQuery = 'SELECT * FROM Reminders WHERE id = @reminderId AND userId = @userId';
        const verifyResult = await pool.request()
            .input('reminderId', sql.Int, reminderId)
            .input('userId', sql.Int, userId)
            .query(verifyQuery);

        if (verifyResult.recordset.length === 0) {
            throw new Error('El reminder no existe o no pertenece al usuario');
        }

        // Eliminar el reminder de la base de datos
        const deleteQuery = 'DELETE FROM Reminders WHERE id = @reminderId';
        await pool.request()
            .input('reminderId', sql.Int, reminderId)
            .query(deleteQuery);

        // Confirmar la transacción
        await transaction.commit();

        // Cerrar la conexión a la base de datos
        await sql.close();

        // En caso de éxito, no necesitas devolver nada, ya que el status 200 en la respuesta indica éxito
    } catch (error) {
        // En caso de error, puedes lanzar una excepción o devolver un mensaje de error al cliente
        throw error;
    }
}

module.exports = {
    createReminder,
    updateReminderStatus,
    getReminders,
    editReminder,
    deleteReminder
};