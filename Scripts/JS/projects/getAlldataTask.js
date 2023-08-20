let columnData = []; // Variable global para almacenar los datos de las tareas obtenidad y sus porcentajes 

$(document).ready(function() {
    $.ajax({
        url: "/getAllTask",
        type: "GET",
        success: function(response) {
            // Manejar la respuesta exitosa aquí
            console.log("Respuesta: ", response);

            const totalTaskCount = response.find(entry => entry.columnTask === 'Total').taskCount;

            // Iterar a través de la respuesta y guardar los datos en columnData
            for (const item of response) {
                const percentage = (item.taskCount / totalTaskCount) * 100;

                const columnItem = {
                    columnTask: item.columnTask,
                    taskCount: item.taskCount,
                    percentage: percentage.toFixed(2),
                    totalTaskCount: totalTaskCount
                };

                columnData.push(columnItem);
              
            }

            // Llamada a la función para mostrar el contenido de columnData
            LoadDataTask(totalTaskCount);
        },
        error: function(xhr, status, error) {
            // Manejar errores aquí
            console.log("Error: ", error);
        }
    });
});

// Función para mostrar y asignar los porcentajes para cada circulo
function LoadDataTask(totalTaskCount) {

    
    // Filtrar las entradas de columnData para excluir 'Total'
    const columnasSinTotal = columnData.filter(item => item.columnTask !== 'Total');

    // Obtener los porcentajes correspondientes segun cada columna
    const nuevoPorcentajePending = obtenerPorcentajePorColumna(columnasSinTotal, '1');
    const nuevoPorcentajeProgress = obtenerPorcentajePorColumna(columnasSinTotal, '2');
    const nuevoPorcentajeDone = obtenerPorcentajePorColumna(columnasSinTotal, '4');
    const nuevoPorcentajeNeedsReview = obtenerPorcentajePorColumna(columnasSinTotal, '3');
  
    // Actualizar los contenidos de los elementos <p>
    const percentagePendingText = document.getElementById("percentagePending");
    percentagePendingText.textContent = `${nuevoPorcentajePending}%`;

    
    const sumaPorcentajesProgressyNeedsReview = parseFloat(nuevoPorcentajeProgress) + parseFloat(nuevoPorcentajeNeedsReview);//Se suman ambos porcentajes ya que cuentan para la misma columna
    const percentageProgressText = document.getElementById("percentageProgress");
    percentageProgressText.textContent = `${sumaPorcentajesProgressyNeedsReview}%`;

    const percentageDoneText = document.getElementById("percentageDone");
    percentageDoneText.textContent = `${nuevoPorcentajeDone}%`;

    

    // Actualizar los círculos utilizando la función updateCircle
    updateCircle(circlePending, nuevoPorcentajePending);
    updateCircle(circleProgress, sumaPorcentajesProgressyNeedsReview);
    updateCircle(circleDone, nuevoPorcentajeDone);

    //Actualiza el HTML con el numero total de tareas en proyectos 
    const totalTaskCountSpan = document.getElementById("totalTaskCountPlaceholder");
    totalTaskCountSpan.textContent = totalTaskCount;


    const totalTareasPorColumna = {};

    // Iterar a través de columnData y almacenar el total de tareas por columna en el objeto
    for (const columna of columnData) {
        totalTareasPorColumna[columna.columnTask] = columna.taskCount;
    }
    
    // Modificar el HTML con los totales de tareas por columna
    const totalTaskColumns = document.querySelectorAll('.totalTaskColumn');
    totalTaskColumns.forEach(element => {
        const columnaTask = element.getAttribute('data-columna-task');
    
        if (columnaTask === '2' || columnaTask === '3') {        //Hace las validaciones resecto al nuevo de columna
            const totalTareas2 = totalTareasPorColumna['2'] || 0;
            const totalTareas3 = totalTareasPorColumna['3'] || 0;
            const totalTareasSum = parseInt(totalTareas2) + parseInt(totalTareas3);
            element.textContent = `Cant(${totalTareasSum})`;
        } else {
            const totalTareas = totalTareasPorColumna[columnaTask] || 0;
            element.textContent = `Cant(${totalTareas})`;
        }
    });
    
}

// Función para obtener el porcentaje por columna
function obtenerPorcentajePorColumna(columnas, columnaTask) {
    const columna = columnas.find(item => item.columnTask === columnaTask);
    if (columna) {
        return columna.percentage;
    } else {
        return 0;
    }
}








