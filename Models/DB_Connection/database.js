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

// Función para establecer la conexión a la base de datos
async function connectToDatabase() {
    try {
        await sql.connect(dbConfig);
        console.log('Conexión exitosa a la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Función para obtener los proyectos desde la base de datos
async function getProjects() {
    try {
        const result = await sql.query`SELECT * FROM proyectos`;
        console.log('Proyectos obtenidos:', result.recordset);
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return [];
    }
}

module.exports = {
    connectToDatabase,
    getProjects,
};