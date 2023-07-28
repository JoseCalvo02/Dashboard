const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { getTasksFromDatabase, addTaskToDatabase, checkTaskBelongsToUser, deleteTaskFromDatabase } = require('../../Controllers/Tasks/toDoController');

// Ruta POST para agregar una nueva tarea a la base de datos
router.post('/user/addTask', async (req, res) => {
    try {
        console.log('Tried to login');
        const { taskName, status } = req.body;
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Pasar la instancia de pool a la función addTaskToDatabase
        await addTaskToDatabase(sql, userId, taskName, status);
        res.status(201).json({ message: 'Tarea agregada exitosamente' });
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        res.status(500).json({ message: 'Error al agregar la tarea' });
    }
});

// Ruta GET para obtener todas las tareas del usuario desde la base de datos
router.get('/user/getTasks', async (req, res) => {
    try {
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Pasar la instancia de pool a la función getTasksFromDatabase
        const tasks = await getTasksFromDatabase(sql, userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
});

// Ruta DELETE para eliminar una tarea de la base de datos por su ID
router.delete('/user/deleteTask/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        console.log('Solicitud DELETE recibida para eliminar la tarea con ID:', taskId);
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Verificar si la tarea pertenece al usuario actual antes de eliminarla
        const taskBelongsToUser = await checkTaskBelongsToUser(taskId, userId);

        console.log('La tarea pertenece al usuario actual:', taskBelongsToUser); // Agregar este registro para verificar

        if (!taskBelongsToUser) {
            // Si la tarea no pertenece al usuario actual, enviar una respuesta de error
            return res.status(403).json({ message: 'La tarea no pertenece al usuario actual' });
        }

        // Eliminar la tarea de la base de datos
        await deleteTaskFromDatabase(taskId);
        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

// Exporta el enrutador
module.exports = router;