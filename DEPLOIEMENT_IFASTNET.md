# Guide de Déploiement sur iFast.net

## Déploiement de l'application Next.js sur iFast.net

### Domaine cible : https://atlantiseducation.parcours-orientation.net/

## Prérequis

1. **Compte iFast.net** actif avec accès FTP/SSH
2. **Domaine configuré** : atlantiseducation.parcours-orientation.net
3. **Node.js** disponible sur le serveur iFast.net
4. **Accès à la base de données** (MySQL/PostgreSQL selon votre plan)

## Étape 1: Préparation de l'application pour la production

### 1.1 Configuration des variables d'environnement

Créez un fichier `.env.production` sur le serveur avec les mêmes variables que `.env.local` mais adaptées pour la production :

```bash
# Configuration SMTP iFast.net pour la production
SMTP_HOST=mail.votredomaine.com
SMTP_PORT=587
SMTP_USER=contact@atlantiseducation.parcours-orientation.net
SMTP_PASS=votre_mot_de_passe_email
SMTP_FROM="Atlantis Education <contact@atlantiseducation.parcours-orientation.net>"

# Configuration Lemon Squeezy
LEMONSQUEEZY_API_KEY=votre_cle_api_lemonsqueezy
LEMONSQUEEZY_WEBHOOK_SECRET=votre_webhook_secret

# Configuration base de données
DATABASE_URL="mysql://user:password@localhost:3306/nom_base_donnees"

# URL de l'application en production
NEXT_PUBLIC_APP_URL=https://atlantiseducation.parcours-orientation.net
```

### 1.2 Build de l'application

Exécutez localement pour vérifier que tout fonctionne :

```bash
# Installer les dépendances
npm install

# Build de l'application
npm run build

# Test en production locale
npm start
```

## Étape 2: Méthodes de déploiement sur iFast.net

### Méthode A: Déploiement via FTP (Recommandée)

#### 2.1 Préparation des fichiers

1. **Build local** :
```bash
npm run build
```

2. **Créer une archive** :
```bash
# Créer un dossier de déploiement
mkdir -p deploy
cp -r .next deploy/
cp -r public deploy/
cp -r node_modules deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp .env.production deploy/.env.local

# Archiver
cd deploy
tar -czf ../app-production.tar.gz .
```

#### 2.2 Transfert via FTP

1. **Connectez-vous à votre FTP** iFast.net :
   - Hôte : ftp.atlantiseducation.parcours-orientation.net
   - Utilisateur : votre_nom_utilisateur
   - Mot de passe : votre_mot_de_passe

2. **Créez la structure de dossiers** :
```
/home/votre_compte/
├── atlantis-education/
│   ├── .next/
│   ├── public/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.local
│   └── server.js (fichier de démarrage)
```

3. **Uploadez les fichiers** :
```bash
# Via FTP client (FileZilla, Cyberduck, etc.)
# Uploadez le contenu du dossier deploy vers /atlantis-education/
```

#### 2.3 Configuration du serveur

Créez un fichier `server.js` pour le démarrage :

```javascript
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handler(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
```

### Méthode B: Déploiement via SSH (si disponible)

Si vous avez accès SSH à votre serveur iFast.net :

```bash
# Connectez-vous au serveur
ssh votre_utilisateur@atlantiseducation.parcours-orientation.net

# Naviguez vers votre dossier
cd /home/votre_compte/

# Clonez votre projet (si vous avez un dépôt Git)
git clone https://github.com/votre-repo/atlantis-education.git
cd atlantis-education

# Installez les dépendances
npm install

# Build de l'application
npm run build

# Configurez les variables d'environnement
cp .env.example .env.local
# Éditez .env.local avec vos valeurs de production

# Démarrez l'application
npm start
```

## Étape 3: Configuration du domaine et du proxy

### 3.1 Configuration Apache/Nginx

Si iFast.net utilise Apache, créez un fichier `.htaccess` :

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Rediriger tout le trafic vers le serveur Next.js
  RewriteCond %{HTTP_HOST} ^atlantiseducation\.parcours-orientation\.net$ [NC]
  RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

### 3.2 Configuration du port

Assurez-vous que le port 3000 est ouvert et accessible. Si nécessaire, configurez un port différent dans votre `.env.local` :

```bash
PORT=3001
```

## Étape 4: Processus de démarrage automatique

### 4.1 Utilisation de PM2 (Recommandé)

1. **Installez PM2 globalement** (si possible sur iFast.net) :
```bash
npm install -g pm2
```

2. **Créez un fichier ecosystem.config.js** :

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'atlantis-education',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

3. **Démarrez l'application avec PM2** :
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4.2 Alternative : Script de démarrage

Si PM2 n'est pas disponible, créez un script de démarrage :

```bash
#!/bin/bash
# start.sh

cd /home/votre_compte/atlantis-education
export NODE_ENV=production
nohup npm start > /dev/null 2>&1 &
echo $! > app.pid
```

## Étape 5: Configuration de la base de données

### 5.1 Création de la base de données

1. **Via cPanel iFast.net** :
   - Accédez à "Bases de données MySQL"
   - Créez une nouvelle base de données : `atlantis_education`
   - Créez un utilisateur avec tous les privilèges

2. **Migrate Prisma** :
```bash
# Sur le serveur
cd /home/votre_compte/atlantis-education
npx prisma migrate deploy
npx prisma generate
```

## Étape 6: Tests et vérifications

### 6.1 Vérification du déploiement

1. **Accédez à votre application** :
   ```
   https://atlantiseducation.parcours-orientation.net/
   ```

2. **Testez les fonctionnalités clés** :
   - Page d'accueil
   - Formulaire de contact
   - Newsletter (inscription/désinscription)
   - Page admin : `/newsletter-admin`
   - Téléchargement d'échantillon

3. **Vérifiez les logs** :
```bash
# Avec PM2
pm2 logs atlantis-education

# Sans PM2
tail -f logs/out.log
```

### 6.2 Tests d'envoi d'emails

Testez l'envoi d'emails via :
- Le formulaire de contact
- L'inscription à la newsletter
- L'envoi de campagne depuis l'admin

## Étape 7: Maintenance et monitoring

### 7.1 Scripts de maintenance

Créez un script de redémarrage automatique :

```bash
#!/bin/bash
# restart.sh

cd /home/votre_compte/atlantis-education
pm2 restart atlantis-education
```

### 7.2 Monitoring

- **Vérifiez l'espace disque** régulièrement
- **Surveillez les logs** pour les erreurs
- **Vérifiez l'utilisation** de la base de données

## Dépannage courant

### Problème : L'application ne démarre pas
```bash
# Vérifiez les logs
pm2 logs

# Vérifiez les dépendances
npm install

# Vérifiez le build
npm run build
```

### Problème : Les emails ne s'envoient pas
- Vérifiez la configuration SMTP dans `.env.local`
- Testez avec le script `test-smtp.js`
- Vérifiez les ports SMTP (587, 465)

### Problème : Erreur de base de données
- Vérifiez les identifiants dans `DATABASE_URL`
- Assurez-vous que la base de données existe
- Exécutez `npx prisma migrate deploy`

## Support iFast.net

- **Documentation** : https://www.ifast.net/support
- **Support technique** : support@ifast.net
- **Téléphone** : +33 (0)1 23 45 67 89

## Résumé des étapes

1. ✅ Préparer l'application pour la production
2. ✅ Uploader les fichiers via FTP/SSH
3. ✅ Configurer les variables d'environnement
4. ✅ Configurer le domaine et le proxy
5. ✅ Mettre en place le démarrage automatique
6. ✅ Configurer la base de données
7. ✅ Tester et vérifier le déploiement

Votre application Next.js sera alors disponible à : **https://atlantiseducation.parcours-orientation.net/**