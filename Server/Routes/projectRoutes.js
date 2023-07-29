const express = require('express');
const router = express.Router();
const { registerProject } = require('../../Controllers/Projects/projectController');
const{getProjectsFromDatabase}=require('../../Controllers/Projects/projectController');

//Ruta POST para agregar un nuevo proyecto a la base de datos
router.post('/registerProject', async (req, res) => {
    const { projectName, description, dueDate } = req.body;

    try {
        const { userId } = req.session; // Obtener el userId del usuario desde la sesión después de iniciar sesión

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Pasar el userId como un argumento adicional a la función
        await registerProject(req, res, userId, projectName, description, dueDate);
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
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Llamar a la función getProjectsFromDatabase pasando el userId
        const projects = await getProjectsFromDatabase(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        res.status(500).json({ message: 'Error al obtener los proyectos' });
    }
});

// Exporta el enrutador
module.exports = router;