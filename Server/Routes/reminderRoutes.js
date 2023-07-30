const express = require('express');
const router = express.Router();
const reminderController = require('../../Controllers/Reminders/reminderController');

// Ruta para crear un nuevo reminder
router.post('/reminder/create', async (req, res) => {
    try {
        const { name, status } = req.body;
        const { userId } = req.session;

        if (!userId) {
            // Si el usuario no ha iniciado sesión, enviar una respuesta de error
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Pasar la instancia de pool a la función createReminder en el controlador
        const newReminderId = await reminderController.createReminder(userId, name, status);

        res.status(201).json({ message: 'Reminder creado exitosamente', newReminderId });
    } catch (error) {
        console.error('Error al crear el reminder:', error);
        res.status(500).json({ message: 'Error al crear el reminder' });
    }
});

// Ruta para actualizar el status de un reminder
router.put('/reminder/updateStatus', async (req, res) => {
    try {
        const { id, status } = req.body;
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Si la validación pasa, el usuario tiene permiso para actualizar el reminder
        await reminderController.updateReminderStatus(id, status);

        res.status(200).json({ message: 'Status del reminder actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el status del reminder:', error);
        res.status(500).json({ message: 'Error al actualizar el status del reminder' });
    }
});

module.exports = router;