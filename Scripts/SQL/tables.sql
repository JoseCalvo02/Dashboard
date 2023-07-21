use Taskhub_db;

SELECT * from Users;

-- Tabla de registro de usuarios
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Tabla de registro de proyectos
CREATE TABLE Projects (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    star_date DATE DEFAULT GETDATE(),
    end_date DATE
);