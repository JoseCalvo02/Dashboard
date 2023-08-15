
$(document).ready(function() {
    $.ajax({
        url: '/getUserData',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            document.getElementById('NombreUsuario').value = data.fullName;
            document.getElementById('usuario').value = data.username;
            document.getElementById('email').value = data.email;
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
});

