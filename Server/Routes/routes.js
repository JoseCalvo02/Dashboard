const express = require('express');
const router = express.Router();

// Importa los enrutadores específicos
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');

// Usa los enrutadores
router.use(userRoutes);
router.use(taskRoutes);

// Exporta el enrutador
module.exports = router;