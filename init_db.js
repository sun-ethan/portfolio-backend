require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'changeme',
  database: process.env.DB_NAME || 'portfolio_sql'
});

async function initDatabase() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // Créer la table portfolio
    await conn.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INT PRIMARY KEY,
        data LONGTEXT NOT NULL
      )
    `);
    console.log('✅ Table portfolio créée/vérifiée');
    
    // Insérer une ligne par défaut (vierge)
    const defaultData = JSON.stringify({
      config: { hash: 'TURQU1VQRVI=', favicon: '' },
      sections: []
    });
    
    await conn.query(
      'INSERT INTO portfolio (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)',
      [defaultData]
    );
    console.log('✅ Données par défaut insérées');
    
    console.log('\n✨ Base de données initialisée avec succès !');
    process.exit(0);
  } catch (e) {
    console.error('❌ Erreur lors de l\'initialisation:', e);
    process.exit(1);
  } finally {
    if (conn) conn.end();
  }
}

initDatabase();
