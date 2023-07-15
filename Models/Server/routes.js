const express = require('express');
const router = express.Router();

// Define las rutas y los controladores
router.post('/user/register', (req, res) => {

    // utilizando el modelo `registerUserModel.js` y otros archivos necesarios
    res.send('Registro exitoso'); // Ejemplo de respuesta exitosa
});

// Exporta el enrutador
module.exports = router;