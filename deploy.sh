#!/bin/bash

# Script de déploiement pour iFast.net
# Atlantis Education - https://atlantiseducation.parcours-orientation.net/

echo "🚀 Début du déploiement d'Atlantis Education sur iFast.net"

# Variables de configuration
APP_NAME="atlantis-education"
DEPLOY_DIR="/home/votre_compte/atlantis-education"
BACKUP_DIR="/home/votre_compte/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Création des répertoires nécessaires
echo "📁 Création des répertoires..."
mkdir -p $DEPLOY_DIR
mkdir -p $BACKUP_DIR
mkdir -p $DEPLOY_DIR/logs

# Backup de l'ancienne version si elle existe
if [ -d "$DEPLOY_DIR" ]; then
    echo "💾 Sauvegarde de l'ancienne version..."
    cp -r $DEPLOY_DIR $BACKUP_DIR/$APP_NAME-$DATE
fi

# Nettoyage du répertoire de déploiement
echo "🧹 Nettoyage du répertoire de déploiement..."
rm -rf $DEPLOY_DIR/*
mkdir -p $DEPLOY_DIR

# Copie des fichiers de build
echo "📦 Copie des fichiers de build..."
cp -r .next $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp -r node_modules $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp server.js $DEPLOY_DIR/
cp ecosystem.config.js $DEPLOY_DIR/
cp .htaccess $DEPLOY_DIR/

# Création du fichier .env.local (à adapter selon votre environnement)
echo "⚙️  Configuration des variables d'environnement..."
cat > $DEPLOY_DIR/.env.local << EOF
# Configuration SMTP iFast.net
SMTP_HOST=mail.atlantiseducation.parcours-orientation.net
SMTP_PORT=587
SMTP_USER=contact@atlantiseducation.parcours-orientation.net
SMTP_PASS=votre_mot_de_passe_email
SMTP_FROM="Atlantis Education <contact@atlantiseducation.parcours-orientation.net>"

# Configuration Lemon Squeezy
LEMONSQUEEZY_API_KEY=votre_cle_api_lemonsqueezy
LEMONSQUEEZY_WEBHOOK_SECRET=votre_webhook_secret

# Configuration base de données
DATABASE_URL="mysql://user:password@localhost:3306/atlantis_education"

# URL de l'application
NEXT_PUBLIC_APP_URL=https://atlantiseducation.parcours-orientation.net

# Configuration Node.js
NODE_ENV=production
PORT=3000
EOF

# Permissions
echo "🔐 Configuration des permissions..."
chmod 600 $DEPLOY_DIR/.env.local
chmod +x $DEPLOY_DIR/server.js

# Installation de PM2 si nécessaire
echo "📦 Vérification de PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "Installation de PM2..."
    npm install -g pm2
fi

# Arrêt de l'ancienne instance si elle existe
echo "🛑 Arrêt de l'ancienne instance..."
cd $DEPLOY_DIR
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true

# Démarrage de la nouvelle instance
echo "🚀 Démarrage de la nouvelle instance..."
pm2 start ecosystem.config.js
pm2 save

# Configuration du démarrage automatique
echo "⚙️  Configuration du démarrage automatique..."
pm2 startup
pm2 save

# Vérification du statut
echo "📊 Vérification du statut..."
pm2 status $APP_NAME

# Affichage des logs
echo "📋 Affichage des logs récents..."
pm2 logs $APP_NAME --lines 20

echo "✅ Déploiement terminé !"
echo "🌐 Votre application est disponible à : https://atlantiseducation.parcours-orientation.net/"
echo "📊 Admin panel : https://atlantiseducation.parcours-orientation.net/newsletter-admin"
echo "📝 Logs : pm2 logs $APP_NAME"