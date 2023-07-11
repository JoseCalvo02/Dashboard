use TaskHub_DB;

-- Tabla de registro de usuarios
CREATE TABLE registro_usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo_usuario VARCHAR(100) NOT NULL UNIQUE,
    contraseña_usuario VARCHAR(100) NOT NULL
);

-- Tabla de inicio de sesión
CREATE TABLE login_usuario (
    id_login INT IDENTITY(1,1) PRIMARY KEY,
    id_usuario INT NOT NULL,
    correo_usuario VARCHAR(100) NOT NULL UNIQUE,
    contraseña_usuario VARCHAR(100) NOT NULL,

    CONSTRAINT FK_login_usuario_registro_usuario FOREIGN KEY (id_usuario)
        REFERENCES registro_usuario (id_usuario)
        ON DELETE CASCADE
);

-- Tabla de registro de proyectos
CREATE TABLE proyectos (
    id_proyecto INT IDENTITY(1,1) PRIMARY KEY,
    nombre_proyecto VARCHAR(100) NOT NULL,
    descripcion_proyecto VARCHAR(100) NOT NULL,
    fecha_inicio_proyecto DATE DEFAULT GETDATE(),
    fecha_vencimiento_proyecto DATE
);