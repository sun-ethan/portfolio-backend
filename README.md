# 🛡️ Portfolio Dynamic - Backend Proxy

Ce dépôt contient le backend (proxy API) indispensable au fonctionnement du portfolio dynamique. Il sert de pont sécurisé entre le frontend et le stockage cloud (JSONBin.io).

## 📋 Prérequis

- **Node.js** v14+ (avec npm)
- Un compte gratuit sur [JSONBin.io](https://jsonbin.io/)

## 🚀 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/sun-ethan/portfolio-backend.git
cd portfolio-backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration

Créez un fichier `.env` à la racine (utilisez `.env.example` comme modèle) :

```bash
cp .env.example .env
```

Éditer le fichier `.env` :
```env
PORT=3000
BIN_ID=votre_id_jsonbin
API_KEY=votre_master_key_jsonbin
ALLOWED_ORIGINS=https://votre-portfolio.com
```

### 4. Lancer le serveur

```bash
npm start
```

✅ Serveur lancé sur le port configuré (ex: http://localhost:3000)

## 📡 API Endpoints

### GET `/api/get`
Récupère le portfolio complet depuis JSONBin.io.

**Response:**
```json
{
  "config": {
    "hash": "TURQU1VQRVI=",
    "favicon": ""
  },
  "sections": []
}
```

### PUT `/api/save`
Sauvegarde le portfolio complet dans JSONBin.io.

**Body:**
```json
{
  "config": {
    "hash": "...",
    "favicon": "..."
  },
  "sections": [...]
}
```

### GET `/api/health`
Vérification de santé du serveur.

**Response:**
```json
{ "status": "ok" }
```

## ☁️ Stockage (JSONBin.io)

Ce backend est configuré pour fonctionner avec [JSONBin.io](https://jsonbin.io/).
1. Créez un compte gratuit.
2. Créez un nouveau "Bin" avec la structure présente dans `data.sample.json` (côté frontend).
3. Récupérez votre `Bin ID` et votre `X-Master-Key` (Master Key).

## 🔐 Notes de sécurité

- Le `.env` contient vos identifiants => **Ne pas commiter en git**
- Les clés privées de JSONBin.io restent cachées côté serveur.
- Configurez correctement `ALLOWED_ORIGINS` dans `.env` pour restreindre l'accès à votre frontend.
- Le hash du mot de passe admin est en base64 simple (btoa) => à remplacer par du vrai hachage en prod.

## 🛠️ Troubleshooting

**Erreur: "connect ECONNREFUSED" ou problèmes de connexion**
- Vérifier que votre clé API et votre Bin ID sont corrects dans le `.env`
- Vérifier votre connexion internet (nécessaire pour contacter JSONBin.io)

**Port déjà utilisé**
- Changer `PORT` dans `.env`
- Ou killer le processus occupant le port (ex: `netstat -ano | findstr :3000` sous Windows)

**CORS Error**
- Assurez-vous que l'URL de votre frontend est bien renseignée dans `ALLOWED_ORIGINS` dans votre fichier `.env`.

## 📚 Intégration Frontend

Le Frontend communique avec ce backend via:
```javascript
const BACKEND_URL = 'http://localhost:3000/api';

// Charger le portfolio
fetch(`${BACKEND_URL}/get`).then(r => r.json()).then(data => {...});

// Sauvegarder
fetch(`${BACKEND_URL}/save`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(portfolioData)
});
```

Adapter le `BACKEND_URL` dans le Frontend selon votre déploiement.

---
*Made by Ethan*
