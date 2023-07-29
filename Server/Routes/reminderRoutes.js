const express = require('express');
const router = express.Router();
const reminderController = require('../../Controllers/Reminders/reminderController');

// Ruta para crear un nuevo reminder
router.post('/reminder/create', async (req, res) => {
    try {
        const { name, status } = req.body;
        const { userId } = req.session;

        console.log(name);

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Pasar la instancia de pool a la función createReminder en el controlador
        await reminderController.createReminder(userId, name, status);

        res.status(201).json({ message: 'Reminder creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el reminder:', error);
        res.status(500).json({ message: 'Error al crear el reminder' });
    }
});

module.exports = router;