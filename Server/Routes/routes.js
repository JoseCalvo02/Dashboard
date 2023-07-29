const express = require('express');
const router = express.Router();

// Importa los enrutadores específicos
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const projectRoutes = require('./projectRoutes');

// Usa los enrutadores
router.use(userRoutes);
router.use(taskRoutes);
router.use(projectRoutes);

// Exporta el enrutador
module.exports = router;