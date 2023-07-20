// Configuración de la conexión a la base de datos
const dbConfig = {
    server: 'mssql-136035-0.cloudclusters.net,19822',
    user: 'admin1805',
    password: 'Mario1805',
    database: 'Taskhub_db',
    options: {
        encrypt: true, // Si es necesario, establece esto en true para conexiones seguras
        trustServerCertificate: true // Si es necesario, establece esto en true para conexiones seguras
    },
};

module.exports = dbConfig;