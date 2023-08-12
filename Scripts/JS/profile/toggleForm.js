document.addEventListener('DOMContentLoaded', function() {
    const userLink = document.getElementById('user-link');
    const notificationLink = document.getElementById('password-link');

    const userForm = document.querySelector('.user-form');
    const notificationForm = document.querySelector('.password-form');

    userLink.addEventListener('click', function() {
        userForm.style.display = 'block';
        notificationForm.style.display = 'none';
    });

    notificationLink.addEventListener('click', function() {
        userForm.style.display = 'none';
        notificationForm.style.display = 'block';
    });
});