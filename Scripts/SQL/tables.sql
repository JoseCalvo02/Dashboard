use TaskHub_DB;

CREATE TABLE registro_usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo_usuario VARCHAR(100) NOT NULL,
    contraseña_usuario VARCHAR(100) NOT NULL
);

CREATE TABLE proyectos (
    id_proyecto INT IDENTITY(1,1) PRIMARY KEY,
    nombre_proyecto VARCHAR(100) NOT NULL,
    descripcion_proyecto VARCHAR(100) NOT NULL,
    fecha_inicio_proyecto DATE DEFAULT GETDATE(),
    fecha_vencimiento_proyecto DATE
);