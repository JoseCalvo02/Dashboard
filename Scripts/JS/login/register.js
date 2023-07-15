function register() {
    const userSignup = $('#userSignup').val();
    const emailSignup = $('#emailSignup').val();
    const pass1 = $('#pass1').val();

    $.ajax({
        url: '/user/register',
        method: 'POST',
        data: JSON.stringify({ userSignup, emailSignup, pass1 }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // Procesar la respuesta exitosa
            console.log(response);
        },
        error: function(error) {
            // Procesar el error
            console.error(error);
        }
    });
}