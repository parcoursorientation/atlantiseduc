# Guide de Configuration Email - Atlantis Education

Ce guide complet explique comment configurer l'envoi d'emails pour votre application Atlantis Education avec différents fournisseurs d'email.

## Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Configuration avec iFast.net](#configuration-avec-ifastnet)
3. [Configuration avec Gmail](#configuration-avec-gmail)
4. [Configuration avec SendGrid](#configuration-avec-sendgrid)
5. [Configuration avec Mailtrap](#configuration-avec-mailtrap)
6. [Test de la Configuration](#test-de-la-configuration)
7. [Dépannage Courant](#dépannage-courant)
8. [Bonnes Pratiques](#bonnes-pratiques)

---

## Vue d'ensemble

Votre application Atlantis Education utilise Nodemailer pour envoyer différents types d'emails :

- **Emails de contact**: Notifications lorsque les utilisateurs vous contactent
- **Emails de newsletter**: Confirmations d'abonnement à la newsletter
- **Emails de commande**: Confirmations d'achat et livraison d'ebooks
- **Emails d'administration**: Notifications système

### Prérequis

- Node.js et npm installés
- Accès au fichier `.env.local`
- Un compte email fonctionnel

---

## Configuration avec iFast.net

### Étape 1: Créer l'adresse email dans cPanel

1. Connectez-vous à votre cPanel iFast.net
2. Allez dans "Email" → "Comptes Email"
3. Cliquez sur "+ Créer"
4. Configurez votre email :
   - **Nom d'utilisateur**: `contact` (ou autre)
   - **Domaine**: `votredomaine.com`
   - **Mot de passe**: Choisissez un mot de passe sécurisé
   - **Quota**: Laissez par défaut

### Étape 2: Configuration SMTP

Mettez à jour votre fichier `.env.local` :

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

### Étape 3: Configuration Alternative

Si la configuration principale ne fonctionne pas :

```bash
SMTP_HOST=mail.votredomaine.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@votredomaine.com
SMTP_PASS=votre_mot_de_passe_email
```

---

## Configuration avec Gmail

### Étape 1: Activer l'authentification en deux étapes

1. Allez dans votre [Compte Google](https://myaccount.google.com/)
2. Sécurité → Authentification en deux étapes → Activer
3. Suivez les instructions pour configurer

### Étape 2: Créer un mot de passe d'application

1. Allez dans [Mots de passe d'application](https://myaccount.google.com/apppasswords)
2. Sélectionnez :
   - **Application**: "Autre (nom personnalisé)"
   - **Nom**: "Atlantis Education"
3. Cliquez sur "Générer"
4. Copiez le mot de passe généré (16 caractères)

### Étape 3: Configuration SMTP

Mettez à jour votre fichier `.env.local` :

```bash
# Configuration SMTP pour les emails - Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre_mot_de_passe_app
SMTP_FROM="Votre Nom" <votre-email@gmail.com>
SMTP_ADMIN=votre-email@gmail.com
```

---

## Configuration avec SendGrid

### Étape 1: Créer un compte SendGrid

1. Inscrivez-vous sur [SendGrid](https://sendgrid.com/)
2. Vérifiez votre domaine et votre adresse email
3. Créez une clé API

### Étape 2: Configurer le domaine

1. Allez dans "Settings" → "Sender Authentication"
2. Configurez votre domaine (DKIM, SPF, DMARC)
3. Ajoutez les enregistrements DNS dans votre cPanel

### Étape 3: Créer une clé API

1. Allez dans "Settings" → "API Keys"
2. Cliquez sur "Create API Key"
3. Donnez un nom à votre clé (ex: "Atlantis Education")
4. Sélectionnez les permissions "Full Access"
5. Copiez la clé API

### Étape 4: Configuration SMTP

Mettez à jour votre fichier `.env.local` :

```bash
# Configuration SMTP pour les emails - SendGrid
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.votre_clé_api_sendgrid
SMTP_FROM="Votre Nom" <votre-email@votredomaine.com>
SMTP_ADMIN=votre-email@votredomaine.com
```

---

## Configuration avec Mailtrap

### Étape 1: Créer un compte Mailtrap

1. Inscrivez-vous sur [Mailtrap](https://mailtrap.io/)
2. Créez un nouveau projet "Atlantis Education"
3. Créez une nouvelle inbox "Development"

### Étape 2: Obtenir les identifiants SMTP

1. Allez dans votre inbox "Development"
2. Cliquez sur "SMTP Settings"
3. Copiez les identifiants (Nodemailer)

### Étape 3: Configuration SMTP

Mettez à jour votre fichier `.env.local` :

```bash
# Configuration SMTP pour les emails - Mailtrap (Test uniquement)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=votre_user_id_mailtrap
SMTP_PASS=votre_password_mailtrap
SMTP_FROM="Votre Nom" <votre-email@votredomaine.com>
SMTP_ADMIN=votre-email@votredomaine.com
```

---

## Test de la Configuration

### Utiliser le script de test

Exécutez le script de test pour vérifier votre configuration :

```bash
node test-smtp.js
```

Le script va :
- Vérifier que toutes les variables d'environnement sont configurées
- Envoyer un email de test à l'adresse `SMTP_ADMIN`
- Afficher les résultats et suggestions de dépannage

### Résultats attendus

**Succès :**
```
✅ Email envoyé avec succès !
   Message ID: <message-id>
   Réponse: 250 2.0.0 OK

🎉 Votre configuration SMTP fonctionne correctement !
📧 Vérifiez votre boîte de réception (et les spams) pour confirmer.
```

**Échec :**
```
❌ Erreur lors de l'envoi de l'email :
   Message: ECONNREFUSED Connection refused

💡 Suggestions pour corriger l'erreur :
   - Vérifiez l'adresse du serveur SMTP
   - Vérifiez le port
   - Vérifiez que votre pare-feu ne bloque pas la connexion
```

---

## Dépannage Courant

### Erreur: ECONNREFUSED - Connection refused

**Causes possibles :**
- Adresse du serveur SMTP incorrecte
- Port bloqué ou incorrect
- Pare-feu bloquant la connexion

**Solutions :**
- Vérifiez l'adresse du serveur SMTP
- Essayez différents ports (587, 465, 25)
- Désactivez temporairement le pare-feu pour tester

### Erreur: EAUTH - Authentication failed

**Causes possibles :**
- Nom d'utilisateur ou mot de passe incorrect
- Authentification à deux facteurs non configurée (Gmail)
- Adresse email non vérifiée (SendGrid)

**Solutions :**
- Vérifiez les identifiants
- Pour Gmail, utilisez un mot de passe d'application
- Vérifiez que l'email est vérifiée chez le fournisseur

### Erreur: Greeting failed

**Causes possibles :**
- Serveur SMTP surchargé
- Adresse IP bloquée
- Limite d'envoi dépassée

**Solutions :**
- Attendez quelques minutes et réessayez
- Contactez le support du fournisseur
- Vérifiez les limites d'envoi

### Emails dans les spams

**Causes possibles :**
- Configuration SPF/DKIM incorrecte
- Contenu du email considéré comme spam
- Mauvaise réputation du domaine

**Solutions :**
- Configurez correctement SPF/DKIM/DMARC
- Évitez les mots déclencheurs de spam
- Utilisez un template email professionnel

---

## Bonnes Pratiques

### 1. Utilisez une adresse email professionnelle

**Bon :**
```
contact@votredomaine.com
support@votredomaine.com
```

**À éviter :**
```
info@votredomaine.com
admin@votredomaine.com
```

### 2. Configurez correctement votre domaine

**Enregistrements DNS nécessaires :**
```dns
; Enregistrement SPF
v=spf1 mx -all

; Enregistrement DKIM
k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...

; Enregistrement DMARC
_dmarc.votredomaine.com. IN TXT "v=DMARC1; p=quarantine; rua=mailto:admin@votredomaine.com"
```

### 3. Limitez l'envoi d'emails

**Limites recommandées :**
- **Début**: 10 emails par heure
- **Progression**: 50 emails par heure après 1 semaine
- **Maximum**: 100 emails par heure après 1 mois

### 4. Utilisez des templates professionnels

**Structure recommandée :**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <header style="background-color: #1a73e8; color: white; padding: 20px; text-align: center;">
    <h1>Atlantis Education</h1>
  </header>
  
  <main style="padding: 20px;">
    <h2>Titre de l'email</h2>
    <p>Contenu de l'email...</p>
  </main>
  
  <footer style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px;">
    <p>&copy; 2024 Atlantis Education. Tous droits réservés.</p>
  </footer>
</div>
```

### 5. Surveillez les statistiques d'envoi

**Métriques à surveiller :**
- Taux d'ouverture
- Taux de clics
- Taux de rebond
- Taux de spam

### 6. Testez régulièrement

**Fréquence recommandée :**
- **Quotidien**: Test de base avec `node test-smtp.js`
- **Hebdomadaire**: Test complet de toutes les fonctionnalités
- **Mensuel**: Vérification des configurations et limites

---

## Conclusion

La configuration de l'envoi d'emails est une étape cruciale pour votre application Atlantis Education. Que vous utilisiez iFast.net, Gmail, SendGrid ou Mailtrap, suivez attentivement les étapes de configuration et effectuez des tests réguliers.

N'oubliez pas :
- De toujours tester après une modification
- De surveiller les limites d'envoi
- De maintenir une bonne réputation d'envoi
- De mettre à jour régulièrement votre configuration

Pour toute question ou problème supplémentaire, consultez la documentation de votre fournisseur d'email ou contactez le support technique.

---

**Ressources utiles :**
- [Documentation Nodemailer](https://nodemailer.com/)
- [Documentation iFast.net](https://www.ifast.net/)
- [Documentation SendGrid](https://docs.sendgrid.com/)
- [Documentation Mailtrap](https://mailtrap.io/docs/)