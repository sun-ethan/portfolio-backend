require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const BIN_ID = process.env.BIN_ID;
const API_KEY = process.env.API_KEY;
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    credentials: true
}));
app.use(express.json());

// Route pour charger les données
app.get('/api/get', async (req, res) => {
    try {
        const response = await fetch(`${URL}/latest`, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        res.json(data.record || {});
    } catch (error) {
        console.error('Erreur lors de la récupération:', error);
        res.status(500).json({ error: 'Erreur de connexion cloud' });
    }
});

// Route pour sauvegarder les données
app.put('/api/save', async (req, res) => {
    try {
        const data = req.body;
        const response = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            res.json({ success: true, message: 'Données sauvegardées' });
        } else {
            res.status(500).json({ error: 'Erreur de sauvegarde' });
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        res.status(500).json({ error: 'Erreur de sauvegarde' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend proxy actif ✅' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend proxy en écoute sur le port ${PORT}`);
    if (process.env.ALLOWED_ORIGINS) {
        console.log(`🔗 Frontends autorisés: ${process.env.ALLOWED_ORIGINS}`);
    }
});
