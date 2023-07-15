// Configuración de la conexión a la base de datos
const dbConfig = {
    server: 'mysqlservermario.database.windows.net',
    user: 'admin1805',
    password: 'Mario1805',
    database: 'TaskHub_DB',
    options: {
        encrypt: true, // Si es necesario, establece esto en true para conexiones seguras
        trustServerCertificate: true // Si es necesario, establece esto en true para conexiones seguras
    },
};

module.exports = dbConfig;