const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(
      path.join(__dirname, '..', 'data', 'incidents.db'),
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error('Database connection error:', err.message);
          process.exit(1); // Salir si no hay conexión a la DB
        }
        console.log('Connected to SQLite database');
        this.initializeDatabase();
      }
    );

    // Promisificar métodos para usar async/await
    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));
  }

  async initializeDatabase() {
    try {
      await this.run(`CREATE TABLE IF NOT EXISTS incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reporter TEXT NOT NULL,
        equipment_type TEXT NOT NULL,
        description TEXT NOT NULL,
        priority TEXT CHECK(priority IN ('baja', 'media', 'alta')) DEFAULT 'media',
        status TEXT CHECK(status IN ('pendiente', 'en proceso', 'resuelto', 'cerrado')) DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP
      )`);

      await this.run(`CREATE TRIGGER IF NOT EXISTS update_incident_timestamp
        AFTER UPDATE ON incidents
        FOR EACH ROW
        BEGIN
          UPDATE incidents SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
          UPDATE incidents SET resolved_at = CASE 
            WHEN NEW.status = 'resuelto' AND OLD.status != 'resuelto' THEN CURRENT_TIMESTAMP
            ELSE resolved_at 
          END WHERE id = old.id;
        END;`);
    } catch (err) {
      console.error('Database initialization error:', err);
    }
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = new Database();