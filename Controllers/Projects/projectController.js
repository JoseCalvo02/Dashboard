// projectController.js
const sql = require('mssql');
const dbConfig = require('../../Server/dbConfig');
const star_date = new Date().toISOString(); //Proporciona la fecha actual

// Función para registrar un nuevo proyecto
async function registerProject(req, res) {
    const { projectName, description, dueDate} = req.body;

    try {
        const pool = await sql.connect(dbConfig);

        const query = `
        INSERT INTO Projects (name, description,end_date,star_date)
        VALUES (@projectName, @description, @dueDate,@star_date)
        `;

        await pool.request()
        .input('projectName', sql.NVarChar, projectName)
        .input('description', sql.NVarChar, description)
        .input('dueDate', sql.Date, dueDate)
        .input('star_date',sql.Date,star_date)
        .query(query);

        res.status(201).json({ message: 'Proyecto registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el proyecto:', error);
        res.status(500).json({ message: 'Se produjo un error al registrar el proyecto' });
    }
}

module.exports = {
  registerProject,
};