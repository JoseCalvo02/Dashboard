const express = require('express');
const router = express.Router();
const projectController = require('../../Controllers/Projects/projectController');

//Ruta POST para agregar un nuevo proyecto a la base de datos
router.post('/registerProject', async (req, res) => {
    const { projectName, description, dueDate } = req.body;

    try {
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        // Pasar el userId como un argumento adicional a la función
        await projectController.registerProject(req, res, userId, projectName, description, dueDate);
        // Resto del código...
    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        res.status(500).json({ message: 'Se produjo un error al registrar el proyecto' });
    }
});

// Ruta GET para obtener los proyectos
router.get('/getProjects', async (req, res) => {
    try {
        const userId = req.session.userId; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        // Llamar a la función getProjectsFromDatabase pasando el userId
        const projects = await projectController.getProjectsFromDatabase(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
});

// Ruta GET para eliminar los proyectos
router.delete('/deleteProjects', async (req, res) => {
    return;
});

// Ruta POST para crear tareas para los proyectos
router.post('/CreateProjectTask', async (req, res) => {
    try {
        const { taskName, selectedTag ,selectedProjectID} = req.body;
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        await projectController.AddTaskProject(
            req,
            res,
            userId,
            selectedProjectID,
            taskName,
            selectedTag,
            "1"
        );
    } catch (error) {
        console.error('Error al registrar la tarea', error);
        res.status(500).json({ message: 'Se produjo un error al registrar la tarea' });
    }
});

// Ruta GET para obtener las tareas de los proyectos
router.get('/getProjectTasks', async(req, res) => {
    try {
        // Obtener el userId del usuario desde la sesión después de iniciar sesión
        const { userId } = req.session;
        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        const projectId = req.query.id; //Recibe como parametro el ID del proyecto seleccionado desde la URL

        // Llamar a la función GetTaskProject pasando el userId
        const projectsTask = await projectController.GetTaskProject(req, res, userId, projectId);
        res.status(200).json(projectsTask);
    } catch (error) {
        console.error('Error al obtener los las tareas del proyecto:', error);
        res.status(500).json({ message: 'Error al obtener las tareas del proyecto' });
    }
});

// Ruta PUT para modificar las columnas de los proyectos
router.put('/saveTaskPosition', async (req, res) => {
    try {
        const { userId } = req.session;

        if (!userId) {
            return res.redirect('/'); // Redirigir al formulario de inicio de sesión si el usuario no ha iniciado sesión
        }

        const projectId = req.query.id;
        const { taskId, columnIndex  } = req.body;

        const thisMovement = await projectController.SaveTaskMovement(userId, projectId, taskId, columnIndex);
        res.status(200).json(thisMovement);
    } catch (error) {
        console.error('Error al guardar el movimiento de tarea:', error);
        res.status(500).json({ message: 'Error al guardar el movimiento de tarea:' });
    }
});

// Exporta el enrutador
module.exports = router;