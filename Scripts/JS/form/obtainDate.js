var star_date;

//Funcion para evitar seleccionar fecha antes de la fecha actual para el "due date"
document.addEventListener("DOMContentLoaded", function () {

    star_date = new Date().toISOString().split("T")[0];

    document.getElementById("dueDate").setAttribute("min", star_date);

});