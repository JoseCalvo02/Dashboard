const sql = require('mssql');

// Configuración de la conexión a la base de datos
const dbConfig = {
    server: 'mysqlservermario.database.windows.net',
    user: 'admin1805',
    password: 'Mario1805',
    database: 'TaskHub_DB',
    options: {
        encrypt: true, // Si estás utilizando una conexión segura (SSL/TLS)
    },
};

// Crear el pool de conexiones
const pool = new sql.ConnectionPool(dbConfig);

// Conectar al pool
pool.connect().then(pool => {
    console.log('Conexión establecida');
    // Ejecutar consultas o operaciones en la base de datos
    const request = pool.request();
    request.query('SELECT * FROM proyectos').then(result => {
        console.log(result.recordset);
        // Cerrar la conexión al finalizar
        pool.close();
    }).catch(error => {
        console.log('Error:', error);
        // Cerrar la conexión en caso de error
        pool.close();
    });
}).catch(error => {
    console.log('Error al conectar:', error);
});