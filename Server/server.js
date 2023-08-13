const express = require('express');
const sql = require('mssql');
const path = require('path');
const session = require('express-session');
const routes = require('./Routes/routes');
const isAuthenticated  = require('./Middleware/authMiddleware'); // Importar el nuevo middleware
const app = express();
const port = 443;

const sessionSecret = process.env.SESSION_SECRET || 'default-secret';

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

// La conexión a la base de datos
const dbConfig = require('./dbConfig');

// Conexión a la base de datos
sql.connect(dbConfig)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
        // Después de establecer la conexión, pasamos la instancia de sql a las rutas
        app.use((req, res, next) => {
            req.sql = sql;
            next();
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "Content" (CSS, JS, imágenes, etc.)
app.use('/Content', express.static(path.join(__dirname, '../Content')));

// Ruta principal que redirige a la página de inicio de sesión o a la página principal según si el usuario ha iniciado sesión o no
app.get('/', (req, res) => {
    // Verificar si el usuario ha iniciado sesión
    if (req.session && req.session.userId) {
        // Si el usuario ha iniciado sesión, redirigir a la página principal
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.sendFile(path.join(__dirname, '../Views/Home/index.html'));
    } else {
        // Si el usuario no ha iniciado sesión, servir la página de inicio de sesión (login.html)
        res.sendFile(path.join(__dirname, '../Views/Home/login.html'));
    }
});

// Middleware para proteger rutas que requieren inicio de sesión
app.use('/Views/Home', isAuthenticated, express.static(path.join(__dirname, '../Views/Home')));

// Proteger rutas bajo el directorio "Views/User"
app.use('/Views/User', isAuthenticated, express.static(path.join(__dirname, '../Views/User')));

// Usamos el enrutador que definimos en routes.js
app.use(routes);

// Middleware para servir los archivos estáticos restantes (excepto "Content" y "Views/Home")
app.use(express.static(path.join(__dirname, '../'), {
    fallthrough: false // Ignorar las rutas no coincidentes con archivos estáticos
}));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});