const express = require('express');
const router = express.Router();

// Importa los enrutadores específicos
const userRoutes = require('./userRoutes');
const reminderRoutes = require('./reminderRoutes');
const projectRoutes = require('./projectRoutes');

// Usa los enrutadores
router.use(userRoutes);
router.use(reminderRoutes);
router.use(projectRoutes);

// Exporta el enrutador
module.exports = router;