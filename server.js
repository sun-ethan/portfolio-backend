require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Pool de connexion MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'changeme',
  database: process.env.DB_NAME || 'portfolio_sql',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

// Fonction helper pour exécuter les requêtes
async function query(sql, params = []) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(sql, params);
  } finally {
    if (conn) conn.end();
  }
}

// ===== ROUTES API =====

// GET /api/get - Récupère le portfolio
app.get('/api/get', async (req, res) => {
  try {
    const result = await query('SELECT data FROM portfolio WHERE id = 1');
    if (result.length > 0) {
      res.json(JSON.parse(result[0].data));
    } else {
      res.json({ config: { hash: 'TURQU1VQRVI=', favicon: '' }, sections: [] });
    }
  } catch (e) {
    console.error('Erreur GET:', e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /api/save - Sauvegarde le portfolio
app.put('/api/save', async (req, res) => {
  try {
    const portfolioData = req.body;
    const dataStr = JSON.stringify(portfolioData);
    
    await query('INSERT INTO portfolio (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)', [dataStr]);
    res.json({ success: true, message: 'Portfolio sauvegardé' });
  } catch (e) {
    console.error('Erreur PUT:', e);
    res.status(500).json({ error: 'Erreur sauvegarde' });
  }
});

// GET /api/health - Vérification de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ===== DÉMARRAGE DU SERVEUR =====

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio SQL backend listening on ${PORT}`);
});
