# Guide de configuration des emails

Ce guide explique comment configurer l'envoi d'emails pour votre application Next.js avec Lemon Squeezy.

## Méthodes de configuration

### 1. Gmail (Recommandé pour débuter)

#### Étape 1 : Activer l'accès moins sécurisé
1. Allez dans [les paramètres de sécurité Google](https://myaccount.google.com/security)
2. Faites défiler jusqu'à "Accès moins sécurisé aux applications"
3. Activez cette option

#### Étape 2 : Créer un mot de passe d'application (Méthode recommandée)
1. Allez dans [les paramètres de sécurité Google](https://myaccount.google.com/security)
2. Faites défiler jusqu'à "Mot de passe d'application"
3. Cliquez sur "Mot de passe d'application"
4. Sélectionnez "Autre (nom personnalisé)"
5. Donnez un nom : "Application Next.js"
6. Cliquez sur "Générer"
7. Copiez le mot de passe généré

#### Étape 3 : Configuration du fichier .env.local
```bash
# Configuration SMTP pour les emails avec Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
SMTP_FROM="Votre Nom" <votre-email@gmail.com>
SMTP_ADMIN=votre-email@gmail.com
```

### 2. SendGrid (Plus professionnel)

#### Étape 1 : Créer un compte SendGrid
1. Inscrivez-vous sur [SendGrid](https://sendgrid.com)
2. Vérifiez votre email
3. Créez une clé API :
   - Allez dans Settings → API Keys
   - Cliquez sur "Create API Key"
   - Donnez un nom : "Application Next.js"
   - Sélectionnez les permissions "Full Access"
   - Copiez la clé API

#### Étape 2 : Configuration du fichier .env.local
```bash
# Configuration SMTP pour les emails avec SendGrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.votre_clé_api_sendgrid_ici
SMTP_FROM="Votre Nom" <votre-email@votredomaine.com>
SMTP_ADMIN=votre-email@votredomaine.com
```

### 3. Mailtrap (Pour les tests)

#### Étape 1 : Créer un compte Mailtrap
1. Inscrivez-vous sur [Mailtrap](https://mailtrap.io)
2. Connectez-vous à votre compte
3. Allez dans SMTP Settings
4. Copiez les paramètres SMTP

#### Étape 2 : Configuration du fichier .env.local
```bash
# Configuration SMTP pour les emails avec Mailtrap (tests)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=votre_user_mailtrap
SMTP_PASS=votre_password_mailtrap
SMTP_FROM="Votre Nom" <votre-email@test.com>
SMTP_ADMIN=votre-email@test.com
```

### 4. Email de votre hébergeur (OVH, Gandi, etc.)

#### Exemple avec OVH
```bash
# Configuration SMTP pour les emails avec OVH
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=votre-email@votredomaine.com
SMTP_PASS=votre-mot-de-passe-ovh
SMTP_FROM="Votre Nom" <votre-email@votredomaine.com>
SMTP_ADMIN=votre-email@votredomaine.com
```

## Test de la configuration

### Étape 1 : Configurez votre fichier .env.local
Copiez le fichier d'exemple correspondant à votre méthode :
```bash
# Pour Gmail
cp .env.local.gmail.example .env.local

# Pour SendGrid
cp .env.local.sendgrid.example .env.local

# Pour Mailtrap
cp .env.local.mailtrap.example .env.local
```

### Étape 2 : Remplacez les valeurs par défaut
Modifiez le fichier `.env.local` avec vos informations réelles.

### Étape 3 : Testez la configuration
Exécutez le script de test :
```bash
node test-smtp.js
```

Le script enverra un email de test à l'adresse configurée dans `SMTP_ADMIN`.

## Dépannage

### Problèmes courants

#### 1. Erreur d'authentification (EAUTH)
**Symptôme** : `EAUTH: 535-5.7.8 Username and Password not accepted`

**Solutions** :
- Pour Gmail : utilisez un mot de passe d'application
- Vérifiez que l'accès moins sécurisé est activé
- Vérifiez que le nom d'utilisateur et le mot de passe sont corrects

#### 2. Erreur de connexion (ECONNREFUSED)
**Symptôme** : `ECONNREFUSED: Connection refused`

**Solutions** :
- Vérifiez l'adresse du serveur SMTP
- Vérifiez le port
- Vérifiez que votre pare-feu ne bloque pas la connexion

#### 3. Erreur de socket (ESOCKET)
**Symptôme** : `ESOCKET: socket hang up`

**Solutions** :
- Vérifiez la configuration SSL/TLS
- Essayez de changer le port (587 pour STARTTLS, 465 pour SSL)
- Vérifiez que `SMTP_SECURE` est correctement configuré

#### 4. Email reçu dans les spams
**Solutions** :
- Configurez correctement les enregistrements SPF, DKIM et DMARC
- Utilisez un domaine d'envoi vérifié
- Évitez les mots et expressions spam dans vos emails

### Solutions spécifiques par fournisseur

#### Gmail
- **Problème** : "L'application moins sécurisée n'est pas disponible"
- **Solution** : Utilisez un mot de passe d'application à la place

#### SendGrid
- **Problème** : "Domain not verified"
- **Solution** : Configurez votre domaine dans les paramètres SendGrid

#### OVH
- **Problème** : "Relay access denied"
- **Solution** : Utilisez l'authentification SMTP avec votre email OVH

## Bonnes pratiques

### 1. Utilisez un email professionnel
- Évitez les adresses Gmail pour les emails professionnels
- Utilisez un email de votre domaine (ex: contact@votredomaine.com)

### 2. Configurez les enregistrements DNS
- **SPF** : Permet de spécifier quels serveurs peuvent envoyer des emails depuis votre domaine
- **DKIM** : Ajoute une signature numérique à vos emails
- **DMARC** : Combine SPF et DKIM pour une meilleure délivrabilité

### 3. Utilisez un service professionnel
- Pour la production, utilisez SendGrid, Mailgun ou un service similaire
- Évitez d'utiliser Gmail pour les envois en masse

### 4. Testez régulièrement
- Testez votre configuration régulièrement
- Surveillez les taux de délivrabilité
- Vérifiez les rapports de bounce

## Configuration finale

Une fois votre configuration testée et validée, votre fichier `.env.local` devrait ressembler à ceci :

```bash
# Configuration SMTP pour les emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
SMTP_FROM="Votre Nom" <votre-email@gmail.com>
SMTP_ADMIN=votre-email@gmail.com

# Configuration Lemon Squeezy
LEMON_SQUEEZY_API_KEY=lsk_votre_clé_api_ici
LEMON_SQUEEZY_WEBHOOK_SECRET=lsw_votre_secret_webhook_ici
LEMON_SQUEEZY_VARIANT_ID=id_de_la_variante_ici

# Configuration de l'URL de votre application
NEXT_PUBLIC_BASE_URL=https://votreserveur.com
```

## Prochaines étapes

1. **Testez tous les formulaires** :
   - Formulaire de contact
   - Formulaire d'achat
   - Formulaire de newsletter

2. **Configurez Lemon Squeezy** :
   - Créez un compte sur lemonsqueezy.com
   - Configurez votre produit
   - Mettez à jour les variables d'environnement

3. **Déployez votre application** :
   - Choisissez une plateforme d'hébergement
   - Configurez les variables d'environnement
   - Testez le processus complet

Votre application est maintenant prête à envoyer des emails ! 🎉