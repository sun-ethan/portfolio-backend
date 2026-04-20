#!/bin/bash
# Script pour démarrer le backend proxy

echo "🚀 Démarrage du backend proxy..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé"
    echo "Téléchargez-le sur https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node -v)"

# Vérifier que npm install a été exécuté
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier le fichier .env
if [ ! -f ".env" ]; then
    echo "⚠️  Fichier .env non trouvé"
    echo "Créez un fichier .env avec:"
    echo "BIN_ID=votre_bin_id"
    echo "API_KEY=votre_api_key"
    echo "PORT=3000"
    exit 1
fi

# Démarrer le serveur
echo "🎯 Backend proxy démarre..."
node server.js
