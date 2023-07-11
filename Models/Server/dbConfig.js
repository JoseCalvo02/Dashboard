const sql = require('mssql');

// Configuración de la conexión a la base de datos
const dbConfig = {
    server: 'mysqlservermario.database.windows.net',
    user: 'admin1805',
    password: 'Mario1805',
    database: 'TaskHub_DB',
    options: {
        trustedConnection: true // Si utilizas la autenticación de Windows
    },
};