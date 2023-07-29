var star_date;

document.addEventListener("DOMContentLoaded", function () {

    star_date = new Date().toISOString().split("T")[0];

    document.getElementById("dueDate").setAttribute("min", star_date);

});