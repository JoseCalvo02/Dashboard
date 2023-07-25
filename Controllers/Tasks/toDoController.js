const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

// Función para agregar una nueva tarea a la base de datos
async function addTaskToDatabase(pool, userId, taskName, status) {
    try {
        // Consulta SQL para agregar una nueva tarea a la tabla TodoTasks
        const query = `INSERT INTO TodoTasks (userId, taskName, status) VALUES (@userId, @taskName, @status)`;
        const request = new pool.Request();
        request.input('userId', sql.Int, userId);
        request.input('taskName', pool.VarChar(100), taskName);
        request.input('status', pool.VarChar(50), status);
        await request.query(query);
    } catch (error) {
        throw new Error('Error al agregar la tarea en la base de datos: ' + error.message);
    }
}

// Función para obtener todas las tareas de un usuario desde la base de datos
async function getTasksFromDatabase(pool, userId) {
    try {
        // Consulta SQL para obtener todas las tareas del usuario de la tabla TodoTasks
        const query = `SELECT id, taskName, status FROM TodoTasks WHERE userId = @userId`;
        const request = new pool.Request();
        request.input('userId', sql.Int, userId);
        const result = await request.query(query);

        // Devolver el resultado de la consulta
        return result.recordset;
    } catch (error) {
        throw new Error('Error al obtener las tareas desde la base de datos: ' + error.message);
    }
}

// Función para verificar si una tarea pertenece al usuario actual
async function checkTaskBelongsToUser(taskId, userId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para verificar si la tarea pertenece al usuario actual
        const query = `SELECT COUNT(*) AS taskCount FROM TodoTasks WHERE id = @taskId AND userId = @userId`;
        const request = pool.request();
        request.input('taskId', sql.Int, taskId);
        request.input('userId', sql.Int, userId);
        const result = await request.query(query);

        // Cerrar la conexión a la base de datos
        pool.close();

        // Si el recuento de tareas es mayor a cero, la tarea pertenece al usuario actual
        return result.recordset[0].taskCount > 0;
    } catch (error) {
        throw new Error('Error al verificar la pertenencia de la tarea al usuario: ' + error.message);
    }
}

// Función para eliminar una tarea de la base de datos por su ID
async function deleteTaskFromDatabase(pool, taskId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para eliminar la tarea de la tabla TodoTasks
        const query = `DELETE FROM TodoTasks WHERE id = @taskId`;
        const request = pool.request();
        request.input('taskId', sql.Int, taskId);
        const result = await request.query(query);

        // Verificar si se eliminó algún registro
        if (result.rowsAffected[0] === 0) {
            throw new Error('No se encontró ninguna tarea con el ID proporcionado.');
        }

        // Cerrar la conexión a la base de datos
        pool.close();

        console.log('Tarea eliminada de la base de datos con ID:', taskId); // Agregar mensaje de consola
    } catch (error) {
        throw new Error('Error al eliminar la tarea de la base de datos: ' + error.message);
    }
}

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    addTaskToDatabase,
    getTasksFromDatabase,
    deleteTaskFromDatabase,
    checkTaskBelongsToUser,
};