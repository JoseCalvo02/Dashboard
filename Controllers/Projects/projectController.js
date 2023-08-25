const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');
const star_date = new Date().toISOString(); //Proporciona la fecha actual

// Función para registrar un nuevo proyecto
async function registerProject(res, userId, projectName, description, dueDate) {
    try {
        const pool = await sql.connect(dbConfig);

        const request = pool.request();
        request.input('projectName', sql.NVarChar, projectName)
        request.input('description', sql.NVarChar, description)
        request.input('dueDate', sql.Date, dueDate)
        request.input('star_date',sql.Date,star_date)
        request.input('userId',sql.Int,userId)

        // Obtener el máximo valor del ID de los proyectos
        const getMaxIdQuery = 'SELECT ISNULL(MAX(id), 0) as maxId FROM Projects';
        const { recordset: maxIdResult } = await pool.request().query(getMaxIdQuery);
        const maxId = maxIdResult[0].maxId;

        // Reiniciar la secuencia de IDs al máximo ID actual + 1
        const resetIdentityQuery = `DBCC CHECKIDENT (Projects, RESEED, ${maxId})`;
        await pool.request().query(resetIdentityQuery);

        const query = `
            INSERT INTO Projects (name, description, end_date, user_id)
            OUTPUT INSERTED.id
            VALUES (@projectName, @description, @dueDate, @userId)
        `;
        const result = await request.query(query);
        result.recordset[0].id;

        pool.close();

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

        // Obtener el número de tareas en cada categoría de prioridad
        const highPriorityCount = result.recordset.filter(task => task.priorityType === 'High Priority').length;
        const mediumPriorityCount = result.recordset.filter(task => task.priorityType === 'Medium Priority').length;
        const lowPriorityCount = result.recordset.filter(task => task.priorityType === 'Low Priority').length;

        // Contar las tareas de cada prioridad que están en la columna 4 ("Done")
        const highPriorityDoneCount = result.recordset.filter(task => task.priorityType === 'High Priority' && task.columnTask === '4').length;
        const mediumPriorityDoneCount = result.recordset.filter(task => task.priorityType === 'Medium Priority' && task.columnTask === '4').length;
        const lowPriorityDoneCount = result.recordset.filter(task => task.priorityType === 'Low Priority' && task.columnTask === '4').length;

        // Crear un objeto con los totales de tareas por categoría de prioridad
        const taskCounts = {
            highPriority: highPriorityCount,
            mediumPriority: mediumPriorityCount,
            lowPriority: lowPriorityCount,
            highPriorityDone: highPriorityDoneCount,
            mediumPriorityDone: mediumPriorityDoneCount,
            lowPriorityDone: lowPriorityDoneCount
        };

        // Devolver el resultado de la consulta y los totales de tareas
        return { tasks: result.recordset, taskCounts };
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

async function DeleteTask(userId, projectId, taskId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para actualizar la columna de la tarea en función del contenido
        const query = `
            DELETE FROM ProjectsHomepage
            WHERE userId = @userId AND projectId = @projectId AND id = @taskId
        `;

        const request = new sql.Request(pool);
        request.input('userId', sql.Int, userId);
        request.input('projectId', sql.Int, projectId);
        request.input('taskId', sql.Int, taskId);

        // Ejecutar la consulta de actualización
        await request.query(query);

        // Devolver un mensaje de éxito
        return 'Se elimino la tarea ';
    } catch (error) {
        throw new Error('Error al eliminar la tarea: ' + error.message);
    }
}

async function DeleteProject(req, res, userId, projectId) {
    console.log("Este es el project id ", projectId);
    console.log("Este es el userId ", userId);

    try {
        const pool = await sql.connect(dbConfig);

        // Consulta SQL eliminar tareas relacionadas
        const deleteTasksQuery = `
            DELETE FROM ProjectsHomepage
            WHERE projectId = @projectId AND userId = @userId
        `;
        const taskRequest = new sql.Request(pool);
        taskRequest.input('userId', sql.Int, userId);
        taskRequest.input('projectId', sql.Int, projectId);
        await taskRequest.query(deleteTasksQuery);

        const deleteProjectQuery = `
            DELETE FROM Projects
            WHERE user_id = @userId AND id = @projectId
        `;
        const projectRequest = new sql.Request(pool);
        projectRequest.input('userId', sql.Int, userId);
        projectRequest.input('projectId', sql.Int, projectId);
        const projectResult = await projectRequest.query(deleteProjectQuery);

        // Verificar si se eliminó el proyecto correctamente
        if (projectResult.rowsAffected[0] > 0) {
            // Proyecto y tareas relacionadas eliminadas con éxito
            res.json({ message: 'Proyecto y tareas relacionadas eliminadas exitosamente' });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto y tareas: ' + error.message });
    }
}

async function AllTaskUser(req, res, userId) {
    try {
        // Conectar a la base de datos
        const pool = await sql.connect(dbConfig);

        // Consulta SQL para obtener el conteo de tareas por columnTask y el conteo total
        const query = `
            SELECT
                columnTask,
                COUNT(*) AS taskCount
            FROM ProjectsHomepage
            WHERE userId = @userId
            GROUP BY columnTask
            UNION ALL
            SELECT
                'Total' AS columnTask,
                COUNT(*) AS taskCount
            FROM ProjectsHomepage
            WHERE userId = @userId
        `;
        const request = new sql.Request(pool);
        request.input('userId', sql.Int, userId);
        const result = await request.query(query);

        // Devolver el resultado del conteo
        return result.recordset;
    } catch (error) {
        throw new Error('Error al obtener el conteo de tareas por columnTask: ' + error.message);
    }
}

module.exports = {
    registerProject,
    getProjectsFromDatabase,
    AddTaskProject,
    GetTaskProject,
    SaveTaskMovement,
    DeleteTask,
    DeleteProject,
    AllTaskUser
};