@echo off
REM Script pour démarrer le backend proxy (Windows)

echo 🚀 Demarrage du backend proxy...

REM Verifier que Node.js est installe
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installe
    echo Telechargez-le sur https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detecte: 
node --version

REM Verifier les dependances
if not exist "node_modules" (
    echo 📦 Installation des dependances...
    call npm install
)

REM Verifier le fichier .env
if not exist ".env" (
    echo ⚠️  Fichier .env non trouve
    echo Creez un fichier .env avec:
    echo BIN_ID=698a2867d0ea881f40adb018
    echo API_KEY=votre_api_key
    echo PORT=3000
    pause
    exit /b 1
)

REM Demarrer le serveur
echo 🎯 Backend proxy demarre...
echo.
echo 📍 Adresse: http://localhost:25608
echo 🔗 GET http://localhost:25608/api/get
echo 💾 PUT http://localhost:25608/api/save
echo.
node server.js

pause
