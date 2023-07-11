const { registerUser } = require('../../Models/Users/registerUserModel');

const registerForm = document.querySelector('.sign-up-form');

registerForm.addEventListener('submit', async (event)=> {
    event.preventDefault();

    const name = registerForm.querySelector('#name').value;
    const email = registerForm.querySelector('#email').value;
    const password = registerForm.querySelector('#pass1').value;

    //Call the function to register the user
    await registerUser(name, email, password);
    prompt("Valio madre");
});