const { registerUser } = require('../../../Models/User/registerUserModel');

const registerForm = document.querySelector('.sign-up-form');

registerForm.addEventListener('submit', async (event)=> {
    event.preventDefault();

    const name = registerForm.querySelector('#user').value;
    const email = registerForm.querySelector('#email').value;
    const password = registerForm.querySelector('#pass1').value;

    document.getElementById('output').innerHTML = 'Datos del formulario: ' + name + ', ' + email + ', ' + password;

    try {
        // Call the function to register the user
        await registerUser(name, email, password);
        document.getElementById('output').innerHTML = 'Usuario registrado exitosamente';
        alert('Usuario registrado exitosamente');
    } catch (error) {
        document.getElementById('output').innerHTML = 'Error al registrar el usuario';
        alert('Error al registrar el usuario');
    }
});