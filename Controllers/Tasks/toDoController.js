const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');

// Función para agregar una nueva tarea a la base de datos
async function addTaskToDatabase(userId, taskName, status) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para agregar una nueva tarea a la tabla TodoTasks
        const query = `INSERT INTO TodoTasks (userId, taskName, status) VALUES (@userId, @taskName, @status)`;
        const request = new pool.Request();
        request.input('userId', pool.Int, userId);
        request.input('taskName', pool.VarChar(100), taskName);
        request.input('status', pool.VarChar(50), status);
        await request.query(query);

        // Cerrar la conexión a la base de datos
        pool.close();
    } catch (error) {
        throw new Error('Error al agregar la tarea en la base de datos: ' + error.message);
    }
}

// Función para obtener todas las tareas de un usuario desde la base de datos
async function getTasksFromDatabase(userId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para obtener todas las tareas del usuario de la tabla TodoTasks
        const query = `SELECT id, taskName, status FROM TodoTasks WHERE userId = @userId`;
        const request = new pool.Request();
        request.input('userId', pool.Int, userId);
        const result = await request.query(query);

        // Cerrar la conexión a la base de datos
        pool.close();

        // Devolver el resultado de la consulta
        return result.recordset;
    } catch (error) {
        throw new Error('Error al obtener las tareas desde la base de datos: ' + error.message);
    }
}

// Exportar las funciones para usarlas en otros archivos
module.exports = {
    addTaskToDatabase,
    getTasksFromDatabase
};