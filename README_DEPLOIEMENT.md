# Déploiement sur iFast.net

## Instructions rapides

### 1. Préparation locale
```bash
# Build de l'application
npm run deploy:prepare
```

### 2. Configuration du serveur
1. Connectez-vous à votre compte iFast.net via FTP
2. Créez le dossier `/atlantis-education/`
3. Uploadez tous les fichiers du dossier `deploy/` (créé par le script)

### 3. Configuration de l'environnement
1. Renommez `.env.production.example` en `.env.local`
2. Modifiez les variables d'environnement avec vos vraies valeurs

### 4. Démarrage de l'application
```bash
# Via SSH sur le serveur
cd /atlantis-education
chmod +x deploy.sh
./deploy.sh
```

## Accès à l'application

- **Site principal** : https://atlantiseducation.parcours-orientation.net/
- **Admin newsletter** : https://atlantiseducation.parcours-orientation.net/newsletter-admin
- **API health check** : https://atlantiseducation.parcours-orientation.net/api/health

## Fichiers importants

- `DEPLOIEMENT_IFASTNET.md` : Guide complet de déploiement
- `deploy.sh` : Script automatisé de déploiement
- `ecosystem.config.js` : Configuration PM2
- `server.js` : Serveur de production
- `.htaccess` : Configuration Apache

## Support

Pour toute question technique, consultez le guide complet `DEPLOIEMENT_IFASTNET.md` ou contactez le support iFast.net.