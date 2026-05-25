# 🛡️ Portfolio SQL - Backend Express

Ce dépôt contient le backend (API REST) indispensable au fonctionnement du portfolio dynamique SQL. Il sert de passerelle sécurisée entre l'interface utilisateur et votre base de données MariaDB.

## ✨ Rôle du Backend

- **Sécurité** : Assure la gestion et la persistance sécurisées des configurations et des données de contenu.
- **CORS** : Gère les autorisations et les requêtes d'accès multi-origines depuis le client frontend.
- **Persistance** : Permet de lire (`GET /api/get`) et sauvegarder (`PUT /api/save`) le contenu complet du portfolio (au format JSON) dans une table unique MariaDB.

## 🛠️ Stack Technique

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MariaDB (driver `mariadb`)
- **Outils** : CORS, Dotenv.

## 🚀 Installation

### 1. Installer les dépendances

Placez-vous dans le dossier `Backend` et installez les modules requis :
```bash
cd Backend
npm install
```

### 2. Configurer la base de données

Créez votre fichier d'environnement `.env` à partir du fichier d'exemple :
```bash
cp .env.example .env
```

Éditez le fichier `.env` avec vos accès MariaDB :
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=portfolio_sql
PORT=3001
```

### 3. Initialiser la base de données

Exécutez le script d'initialisation pour créer la table et insérer l'enregistrement par défaut :
```bash
npm run init-db
```

### 4. Lancer le serveur

Démarrez l'application Express :
```bash
npm start
```

✅ Serveur lancé sur le port configuré (ex : http://localhost:3001).

## 🗄️ Structure de la base de données

Le backend stocke les données dans une structure de table simplifiée et hautement performante :

### Table `portfolio`
- `id` (INT, PRIMARY KEY) : Identifiant unique de la ligne de données (toujours fixé à `1` pour ce modèle mono-portfolio).
- `data` (LONGTEXT) : Contenu global structuré en JSON stringifié (contient l'arbre complet des onglets, sous-onglets, composants et configurations de sécurité).

## 📡 API Endpoints

- **GET `/api/get`** : Récupère la structure et les données complètes du portfolio.
- **PUT `/api/save`** : Enregistre et met à jour l'état complet du portfolio.
- **GET `/api/health`** : Vérifie l'état de santé du serveur.

---
*Made by Ethan*
