use TaskHub_DB;

-- Tabla de registro de usuarios
CREATE TABLE registro_usuario (
    id_user INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL
);

-- Tabla de registro de proyectos
CREATE TABLE proyectos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    fecha_inicio DATE DEFAULT GETDATE(),
    fecha_vencimiento DATE
);