# 🛡️ Portfolio Dynamic - Backend Proxy

Ce dépôt contient le backend (proxy API) indispensable au fonctionnement du portfolio dynamique. Il sert de pont sécurisé entre le frontend et le stockage cloud (JSONBin.io).

## ✨ Rôle du Backend

- **Sécurité** : Cache les clés d'API privées du service de stockage.
- **CORS** : Gère les autorisations d'accès depuis vos domaines spécifiques.
- **Persistance** : Permet de lire (`GET`) et sauvegarder (`PUT`) les données du portfolio.

## 🛠️ Stack Technique

- **Runtime** : Node.js
- **Framework** : Express.js
- **Outils** : CORS, Dotenv, Fetch.

## 🚀 Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/sun-ethan/portfolio-backend.git
   cd portfolio-backend
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configuration** :
   Créez un fichier `.env` à la racine (utilisez `.env.example` comme modèle) :
   ```env
   PORT=3000
   BIN_ID=votre_id_jsonbin
   API_KEY=votre_master_key_jsonbin
   ALLOWED_ORIGINS=https://votre-portfolio.com
   ```
4. **Lancer le serveur** :
   ```bash
   npm start
   ```

## ☁️ Stockage (JSONBin.io)

Ce backend est configuré pour fonctionner avec [JSONBin.io](https://jsonbin.io/).
1. Créez un compte gratuit.
2. Créez un nouveau "Bin" avec la structure présente dans `data.sample.json` (côté frontend).
3. Récupérez votre `Bin ID` et votre `X-Master-Key`.

---
*Made by Ethan*
