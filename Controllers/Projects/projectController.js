const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');
const star_date = new Date().toISOString(); //Proporciona la fecha actual

// Función para registrar un nuevo proyecto
async function registerProject(req, res, userId, projectName, description, dueDate) {
    try {
        const pool = await sql.connect(dbConfig);

        const query = `
        INSERT INTO Projects (name, description, end_date, star_date, user_id)
        VALUES (@projectName, @description, @dueDate, @star_date, @userId)
        `;

        await pool.request()
        .input('projectName', sql.NVarChar, projectName)
        .input('description', sql.NVarChar, description)
        .input('dueDate', sql.Date, dueDate)
        .input('star_date',sql.Date,star_date)
        .input('userId',sql.Int,userId)
        .query(query);

        res.status(201).json({ message: 'Proyecto registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        res.status(500).json({ message: 'Se produjo un error al registrar el proyecto' });
    }
}

async function getProjectsFromDatabase(userId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para obtener todas las tareas del usuario de la tabla Projects
        const query = `SELECT id, name, description, end_date FROM Projects WHERE user_Id = @userId`;
        const request = new sql.Request(pool);
        request.input('userId', sql.Int, userId);
        const result = await request.query(query);

        // Devolver el resultado de la consulta
        return result.recordset;
    } catch (error) {
        throw new Error('Error al obtener los proyectos desde la base de datos: ' + error.message);
    }
}

async function AddTaskProject(req, res, userId, projectId, taskName, priorityType, columnTask) {
    try {
        const pool = await sql.connect(dbConfig);

        const query = `
        INSERT INTO ProjectsHomepage(userId, projectId, taskName, priorityType,columnTask)
        VALUES (@userId, @projectId, @taskName, @priorityType,@columnTask);
        SELECT SCOPE_IDENTITY() AS taskId;
        `;

        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('projectId', sql.Int, projectId)
            .input('taskName', sql.NVarChar, taskName)
            .input('priorityType', sql.NVarChar, priorityType)
            .input('columnTask', sql.NVarChar, columnTask)
            .query(query);

        const taskId = result.recordset[0].taskId; // Obtener el taskId de la respuesta

        res.status(201).json({ taskId, message: 'Tarea registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar la tarea:', error);
        res.status(500).json({ message: 'Se produjo un error al registrar la tarea' });
    }
}

async function GetTaskProject(req, res ,userId, projectId){
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para obtener las tareas del Proyecto
        const query = `SELECT id, taskName, columnTask, priorityType FROM ProjectsHomepage WHERE userId = @userId AND projectId = @projectId`;
        const request = new sql.Request(pool);
        request.input('userId', sql.Int, userId);
        request.input('projectId', sql.Int, projectId);
        const result = await request.query(query);

        // Devolver el resultado de la consulta
        return result.recordset;
    } catch (error) {
        throw new Error('Error al obtener las tareas de proyecto de la base de datos: ' + error.message);
    }
}

async function SaveTaskMovement(userId, projectId, taskId, columnIndex) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para actualizar la columna de la tarea en función del contenido
        const query = `
            UPDATE ProjectsHomepage
            SET columnTask = @columnIndex
            WHERE userId = @userId AND projectId = @projectId AND id = @taskId
        `;

        const request = new sql.Request(pool);
        request.input('userId', sql.Int, userId);
        request.input('projectId', sql.Int, projectId);
        request.input('taskId', sql.Int, taskId);
        request.input('columnIndex', sql.Int, columnIndex);

        // Ejecutar la consulta de actualización
        const result = await request.query(query);

        // Devolver un mensaje de éxito
        return 'Movimiento de tarea guardado en la base de datos correctamente';
    } catch (error) {
        throw new Error('Error al guardar el movimiento en la base de datos: ' + error.message);
    }
}

module.exports = {
    registerProject,
    getProjectsFromDatabase,
    AddTaskProject,
    GetTaskProject,
    SaveTaskMovement,
};