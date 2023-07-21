const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/User/userController');

// Define las rutas y los controladores
router.post('/register', async (req, res) => {
    const { fullNameSignup, userSignup, emailSignup, pass1 } = req.body;

    console.log('Valores recibidos:', fullNameSignup, userSignup, emailSignup, pass1);

    try {
        await registerUser(fullNameSignup, userSignup, emailSignup, pass1);
        res.send('Registro exitoso');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Exporta el enrutador
module.exports = router;