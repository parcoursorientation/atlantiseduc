# Configuration SMTP pour iFast.net

Ce guide explique comment configurer l'envoi d'emails avec votre hébergement iFast.net.

## Étape 1: Configuration des emails dans cPanel

1. **Connectez-vous à votre cPanel iFast.net**
   - Accédez à `https://votredomaine.com/cpanel`
   - Utilisez vos identifiants cPanel

2. **Créez une adresse email**
   - Dans cPanel, cherchez la section "Email"
   - Cliquez sur "Comptes Email"
   - Cliquez sur "+ Créer"
   - Configurez votre email :
     - **Nom d'utilisateur**: `contact` (ou autre nom de votre choix)
     - **Domaine**: `votredomaine.com` (sélectionnez votre domaine)
     - **Mot de passe**: Choisissez un mot de passe sécurisé
     - **Quota d'espace**: Laissez la valeur par défaut
   - Cliquez sur "+ Créer"

3. **Vérifiez la configuration du serveur de messagerie**
   - Dans cPanel, cherchez "Configuration du serveur de messagerie"
   - Vous trouverez les informations nécessaires :
     - **Serveur entrant**: `mail.votredomaine.com`
     - **Serveur sortant**: `mail.votredomaine.com`
     - **Port SMTP**: 587 (STARTTLS) ou 465 (SSL/TLS)

## Étape 2: Configuration du fichier .env.local

Mettez à jour votre fichier `.env.local` avec les informations de iFast.net :

```bash
# Configuration SMTP pour les emails - iFast.net
SMTP_HOST=mail.votredomaine.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@votredomaine.com
SMTP_PASS=votre_mot_de_passe_email
SMTP_FROM="Votre Nom" <contact@votredomaine.com>
SMTP_ADMIN=contact@votredomaine.com
```

**Explications des paramètres :**
- `SMTP_HOST`: `mail.votredomaine.com` (serveur SMTP iFast.net)
- `SMTP_PORT`: `587` (port pour STARTTLS)
- `SMTP_SECURE`: `false` (car on utilise STARTTLS, pas SSL direct)
- `SMTP_USER`: Votre adresse email complète
- `SMTP_PASS`: Le mot de passe de votre email
- `SMTP_FROM`: L'adresse email d'envoi (format "Nom" <email>)
- `SMTP_ADMIN`: L'adresse email pour recevoir les notifications

## Étape 3: Test de la configuration

1. **Exécutez le script de test**
   ```bash
   node test-smtp.js
   ```

2. **Vérifiez les résultats**
   - Si le test réussit, vous recevrez un email de test
   - Si le test échoue, vérifiez les points suivants

## Étape 4: Dépannage courant

### Problème: "ECONNREFUSED - Connection refused"
**Solutions:**
- Vérifiez que le nom d'hôte est correct: `mail.votredomaine.com`
- Vérifiez que le port 587 est ouvert
- Essayez avec le port 465 et `SMTP_SECURE=true`

### Problème: "EAUTH - Authentication failed"
**Solutions:**
- Vérifiez que l'adresse email et le mot de passe sont corrects
- Assurez-vous que l'email existe bien dans cPanel
- Essayez de vous connecter via webmail pour vérifier les identifiants

### Problème: "Greeting failed"
**Solutions:**
- iFast.net peut nécessiter une authentification avant l'envoi
- Vérifiez que votre adresse IP n'est pas bloquée
- Contactez le support iFast.net pour vérifier les limites d'envoi

## Étape 5: Configuration alternative (si nécessaire)

Si la configuration standard ne fonctionne pas, essayez ces alternatives :

### Option 1: Utiliser le port 465 (SSL/TLS)
```bash
SMTP_HOST=mail.votredomaine.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@votredomaine.com
SMTP_PASS=votre_mot_de_passe_email
```

### Option 2: Utiliser le domaine local
```bash
SMTP_HOST=localhost
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=contact@votredomaine.com
SMTP_PASS=votre_mot_de_passe_email
```

## Étape 6: Limites et bonnes pratiques

### Limites iFast.net
- **Limite d'envoi**: Vérifiez les limites d'envoi horaires dans cPanel
- **Anti-spam**: Évitez d'envoyer trop d'emails en peu de temps
- **Authentification**: Utilisez toujours l'authentification SMTP

### Bonnes pratiques
1. **Utilisez une adresse email professionnelle**
   - Évitez les adresses comme `info@` ou `admin@`
   - Préférez `contact@` ou `support@`

2. **Configurez le SPF**
   - Dans cPanel, cherchez "Zone DNS"
   - Ajoutez un enregistrement SPF pour autoriser votre serveur

3. **Testez régulièrement**
   - Exécutez `node test-smtp.js` périodiquement
   - Vérifiez que les emails arrivent bien dans les boîtes de réception

## Étape 7: Support iFast.net

Si vous rencontrez des problèmes persistants :

1. **Contactez le support iFast.net**
   - Expliquez que vous utilisez SMTP pour une application web
   - Demandez les paramètres SMTP exacts
   - Vérifiez s'il y a des restrictions d'envoi

2. **Vérifiez la documentation iFast.net**
   - Cherchez "SMTP configuration" dans la base de connaissances
   - Consultez les guides sur l'envoi d'emails

## Configuration finale

Une fois la configuration terminée, votre application pourra :
- Envoyer des emails de confirmation de contact
- Envoyer des newsletters aux abonnés
- Envoyer des confirmations de commande et de livraison d'ebooks
- Recevoir des notifications d'administration

N'oubliez pas de tester chaque fonctionnalité après la configuration !