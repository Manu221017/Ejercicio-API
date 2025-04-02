const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const Joi = require('joi');

const app = express();
const PORT = 3000;
app.use(express.json());

let db;
(async () => {
    db = await open({
        filename: './incidents.db',
        driver: sqlite3.Database
    });
    await db.run(`CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reporter TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT CHECK(status IN ('pendiente', 'en proceso', 'resuelto')) DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
})();

const incidentSchema = Joi.object({
    reporter: Joi.string().required(),
    description: Joi.string().min(10).required()
});

// 🔹 POST - Crear un incidente
app.post('/incidents', async (req, res) => {
    console.log(req.body); // Debug: Verifica si los datos llegan correctamente

    const { error } = incidentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { reporter, description } = req.body;
    const result = await db.run('INSERT INTO incidents (reporter, description) VALUES (?, ?)', [reporter, description]);
    
    res.status(201).json({
        id: result.lastID,
        reporter,
        description,
        status: 'pendiente',
        created_at: new Date().toISOString()
    });
});

// 🔹 GET - Obtener todos los incidentes
app.get('/incidents', async (req, res) => {
    const incidents = await db.all('SELECT * FROM incidents');
    res.json(incidents);
});

// 🔹 GET - Obtener un incidente específico
app.get('/incidents/:id', async (req, res) => {
    const incident = await db.get('SELECT * FROM incidents WHERE id = ?', [req.params.id]);
    if (!incident) return res.status(404).json({ error: 'Incidente no encontrado' });
    res.json(incident);
});

// 🔹 PUT - Actualizar el estado de un incidente
app.put('/incidents/:id', async (req, res) => {
    const { status } = req.body;

    // Validamos que el estado sea válido
    if (!['pendiente', 'en proceso', 'resuelto'].includes(status)) {
        return res.status(400).json({ error: 'Estado inválido, usa: pendiente, en proceso, resuelto' });
    }

    // Verificamos si el incidente existe antes de actualizarlo
    const incident = await db.get('SELECT * FROM incidents WHERE id = ?', [req.params.id]);
    if (!incident) {
        return res.status(404).json({ error: 'Incidente no encontrado' });
    }

    await db.run('UPDATE incidents SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Estado actualizado correctamente', id: req.params.id, new_status: status });
});

// 🔹 DELETE - Eliminar un incidente
app.delete('/incidents/:id', async (req, res) => {
    const result = await db.run('DELETE FROM incidents WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Incidente no encontrado' });

    res.json({ message: 'Incidente eliminado correctamente' });
});

// Servidor en puerto 3000
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
