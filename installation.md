# Guide d'Installation

## Table des Matières
1. [Prérequis](#prérequis)
2. [Installation du Projet](#installation-du-projet)
3. [Configuration de la Base de Données](#configuration-de-la-base-de-données)
4. [Variables d'Environnement](#variables-denvironnement)
5. [Lancement de l'Application](#lancement-de-lapplication)
6. [Déploiement](#déploiement)
7. [Dépannage](#dépannage)

## Prérequis

Avant de commencer l'installation, assurez-vous d'avoir les éléments suivants :

- **Node.js** version 18.0 ou supérieure
- **npm** version 8.0 ou supérieure
- **Git** pour le contrôle de version
- Un éditeur de code comme VS Code

### Vérification des prérequis

```bash
# Vérifier Node.js et npm
node --version
npm --version

# Vérifier Git
git --version
```

## Installation du Projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-organisation/ebook-landing-page.git
cd ebook-landing-page
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires définies dans `package.json`, y compris :

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- NextAuth.js
- Et bien d'autres...

### 3. Configuration initiale

```bash
# Lancer le linter pour vérifier la qualité du code
npm run lint
```

## Configuration de la Base de Données

### 1. Configurer Prisma

Le projet utilise Prisma ORM avec SQLite comme base de données par défaut.

```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers la base de données
npm run db:push
```

### 2. Structure de la base de données

Le schéma de la base de données est défini dans `prisma/schema.prisma`. Il inclut :

- Utilisateurs
- Commandes
- Abonnements à la newsletter
- Messages de contact

### 3. Migration (si nécessaire)

Si vous avez besoin de mettre à jour le schéma :

```bash
npx prisma migrate dev --name nom-de-la-migration
```

## Variables d'Environnement

### 1. Créer le fichier `.env.local`

Copiez le fichier d'exemple :

```bash
cp .env.example .env.local
```

### 2. Configurer les variables obligatoires

```env
# URL de l'application
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-ici

# Configuration de la base de données
DATABASE_URL="file:./dev.db"

# Configuration des services externes
LEMON_SQUEEZY_API_KEY=votre-cle-api-lemon-squeezy
EMAIL_SERVICE_API_KEY=votre-cle-api-email

# Configuration Z-AI SDK
ZAI_API_KEY=votre-cle-api-z-ai
```

### 3. Variables optionnelles

```env
# Configuration du mode développement
NODE_ENV=development

# Configuration des emails
EMAIL_FROM=noreply@votredomaine.com
SUPPORT_EMAIL=support@votredomaine.com
```

## Lancement de l'Application

### 1. En mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:3000`.

### 2. Vérifier les logs de développement

```bash
# Sur Linux/macOS
tail -f dev.log

# Sur Windows
Get-Content dev.log -Wait
```

### 3. Mode production (local)

```bash
npm run build
npm start
```

## Déploiement

### 1. Déploiement sur Vercel (recommandé)

1. Poussez votre code vers GitHub/GitLab
2. Connectez votre dépôt à Vercel
3. Configurez les variables d'environnement dans Vercel
4. Déployez automatiquement à chaque push

### 2. Déploiement sur d'autres plateformes

#### Netlify

```bash
# Build command
npm run build

# Publish directory
out
```

#### Docker

Créez un `Dockerfile` :

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 3. Configuration post-déploiement

1. Mettre à jour `NEXTAUTH_URL` avec l'URL de production
2. Configurer les domaines autorisés pour l'authentification
3. Tester toutes les fonctionnalités en production

## Dépannage

### Problèmes courants

#### 1. Erreurs de dépendances

```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

#### 2. Problèmes de base de données

```bash
# Réinitialiser la base de données
rm -f prisma/dev.db
npm run db:push

# Régénérer le client Prisma
npx prisma generate
```

#### 3. Erreurs de build

```bash
# Vérifier les erreurs TypeScript
npm run type-check

# Vérifier les erreurs ESLint
npm run lint
```

#### 4. Problèmes d'environnement

```bash
# Vérifier les variables d'environnement
echo $NEXTAUTH_URL
echo $DATABASE_URL
```

### Logs utiles

```bash
# Logs Next.js
npm run dev -- --verbose

# Logs Prisma
npx prisma studio

# Logs système
journalctl -u nodejs -f
```

### Support

Si vous rencontrez des problèmes :

1. Consultez les logs de développement dans `dev.log`
2. Vérifiez la console du navigateur pour les erreurs frontend
3. Consultez la documentation Next.js et Prisma
4. Créez une issue sur le dépôt GitHub

---

**Note :** Ce guide est spécifique à l'application de page d'atterrissage d'ebook. Assurez-vous de suivre toutes les étapes dans l'ordre pour une installation réussie.