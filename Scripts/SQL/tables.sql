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

TRUNCATE table TodoTasks;
-- Tabla de to-do tasks
CREATE TABLE TodoTasks (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    taskName VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN('Done', 'Not Ready')),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Tabla de registro de proyectos
CREATE TABLE Projects (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    star_date DATE DEFAULT GETDATE(),
    end_date DATE
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Tabla del homepage de los proyectos
CREATE TABLE ProjectsHomepage (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    projectId INT NOT NULL,
    taskName VARCHAR(100) NOT NULL,
    priorityType VARCHAR (30),
    columnTask VARCHAR(20)
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (projectId) REFERENCES Projects(id)
);
