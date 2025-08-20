# Guide de Configuration de l'Envoi d'Emails

## Configuration Requise

Pour que le formulaire de contact envoie réellement des emails, vous devez configurer les variables d'environnement SMTP.

### Étape 1 : Créer un fichier `.env.local`

Créez un fichier `.env.local` à la racine de votre projet avec les informations suivantes :

```bash
# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Identifiants Gmail (recommandé pour commencer)
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-d-application

# Email d'expéditeur
SMTP_FROM="Contact Atlantis" <votre-email@gmail.com>

# Email de réception
CONTACT_EMAIL=votre-email@gmail.com
```

### Étape 2 : Configurer Gmail

Pour utiliser Gmail avec nodemailer, vous devez :

1. **Activer l'authentification en deux étapes** sur votre compte Gmail
2. **Créer un mot de passe d'application** :
   - Allez dans les paramètres de votre compte Google
   - Sélectionnez "Sécurité"
   - Faites défiler jusqu'à "Mot de passe d'application"
   - Créez un nouveau mot de passe d'application pour "Autres (nom personnalisé)"
   - Notez ce mot de passe et utilisez-le comme `SMTP_PASS`

### Étape 3 : Alternatives de Configuration

#### Option A : Utiliser un service SMTP professionnel

```bash
# Pour un service professionnel (SendGrid, Mailgun, etc.)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=votre-cle-api-sendgrid
SMTP_FROM="Contact Atlantis" <contact@votredomaine.com>
CONTACT_EMAIL=contact@votredomaine.com
```

#### Option B : Utiliser Outlook

```bash
# Pour Outlook/Hotmail
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@outlook.com
SMTP_PASS=votre-mot-de-passe
SMTP_FROM="Contact Atlantis" <votre-email@outlook.com>
CONTACT_EMAIL=votre-email@outlook.com
```

### Étape 4 : Tester la Configuration

Après avoir configuré vos variables d'environnement, redémarrez le serveur de développement :

```bash
# Arrêter le serveur
Ctrl+C

# Redémarrer
npm run dev
```

Puis testez le formulaire de contact sur votre site.

### Dépannage

#### Problèmes courants :

1. **Erreur d'authentification Gmail**
   - Vérifiez que vous utilisez un mot de passe d'application
   - Activez l'accès "moins sécurisé" si nécessaire (non recommandé)

2. **Email non reçu**
   - Vérifiez le dossier spam
   - Vérifiez la configuration du `CONTACT_EMAIL`
   - Consultez les logs du serveur

3. **Erreur de connexion**
   - Vérifiez l'hôte et le port SMTP
   - Vérifiez votre connexion Internet
   - Vérifiez les identifiants SMTP

#### Variables d'environnement supportées :

| Variable | Description | Requise |
|----------|-------------|---------|
| `SMTP_HOST` | Serveur SMTP | Oui |
| `SMTP_PORT` | Port SMTP | Oui |
| `SMTP_SECURE` | Connexion sécurisée (true/false) | Non |
| `SMTP_USER` | Nom d'utilisateur SMTP | Oui |
| `SMTP_PASS` | Mot de passe SMTP | Oui |
| `SMTP_FROM` | Email d'expéditeur | Non |
| `CONTACT_EMAIL` | Email de réception | Non |

### Notes importantes :

- Le mot de passe d'application est requis pour Gmail
- Utilisez toujours des variables d'environnement pour les informations sensibles
- Ne commettez jamais vos identifiants SMTP dans le code
- Testez toujours dans un environnement de développement avant de passer en production