# Guide pour lier Lemon Squeezy avec votre application Next.js

Ce guide vous explique comment intégrer Lemon Squeezy comme plateforme de paiement dans votre application Next.js pour vendre des ebooks numériques.

## Prérequis

- Node.js installé sur votre machine
- Un compte Next.js fonctionnel
- Un compte email professionnel (Gmail, Outlook, etc.)

## Étape 1 : Créer un compte Lemon Squeezy

### 1.1 Inscription

1. Allez sur [lemonsqueezy.com](https://lemonsqueezy.com)
2. Cliquez sur "Sign Up"
3. Remplissez le formulaire d'inscription avec votre email professionnel
4. Vérifiez votre email en cliquant sur le lien de confirmation

### 1.2 Configuration de la boutique

1. Connectez-vous à votre compte
2. Allez dans **Settings → Store**
3. Remplissez les informations de votre entreprise :
   - Store Name : "Atlantis Education"
   - Store Email : votre-email@exemple.com
   - Currency : "EUR" (Euro)
   - Country : "France"
4. Cliquez sur "Save Changes"

## Étape 2 : Créer un produit

### 2.1 Création du produit

1. Allez dans **Products**
2. Cliquez sur "Create New Product"
3. Remplissez les informations :
   - **Product Name** : "Motiver les élèves à apprendre"
   - **Product Description** : "10 techniques simples et efficaces pour réveiller la motivation des élèves"
   - **Product Category** : "Education"
   - **Price** : 29,00 €
4. Cliquez sur "Create Product"

### 2.2 Configuration des variantes

1. Une fois le produit créé, allez dans l'onglet **Variants**
2. Cliquez sur "Create Variant"
3. Remplissez les informations :
   - **Variant Name** : "Ebook PDF"
   - **Variant Description** : "Version numérique au format PDF"
   - **Price** : 29,00 €
   - **Type** : "Digital Product"
4. Cliquez sur "Save Changes"

### 2.3 Téléchargement du produit

1. Dans la section **Downloads** de votre variante
2. Cliquez sur "Add Download"
3. Uploadez votre ebook PDF si vous l'avez déjà
4. Sinon, laissez cette étape pour plus tard (l'application générera le PDF dynamiquement)

## Étape 3 : Obtenir les clés API

### 3.1 Génération de la clé API

1. Allez dans **Settings → API Keys**
2. Cliquez sur "Create New API Key"
3. Remplissez le formulaire :
   - **Key Name** : "Application Next.js"
   - **Permissions** : Cochez toutes les permissions nécessaires
4. Cliquez sur "Create"
5. **Copiez la clé API générée** et conservez-la précieusement

### 3.2 Configuration du webhook

1. Allez dans **Settings → Webhooks**
2. Cliquez sur "Create New Webhook"
3. Remplissez le formulaire :
   - **Webhook Name** : "Paiements réussis"
   - **Endpoint URL** : `https://votreserveur.com/api/webhook/lemonsqueezy`
   - **Events to Subscribe** : Cochez "Order Paid"
4. Cliquez sur "Create"
5. **Copiez le secret du webhook** et conservez-le précieusement

## Étape 4 : Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet Next.js :

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

### Notes importantes :

- Remplacez `votre-email@gmail.com` par votre email professionnel
- Pour Gmail, utilisez un mot de passe d'application (voir section dépannage)
- Remplacez `lsk_votre_clé_api_ici` par votre vraie clé API
- Remplacez `lsw_votre_secret_webhook_ici` par votre vrai secret webhook
- Remplacez `id_de_la_variante_ici` par l'ID de votre variante de produit

## Étape 5 : Mise à jour du code

### 5.1 Mise à jour de l'API d'achat

Modifiez le fichier `/src/app/api/purchase/route.ts` pour intégrer Lemon Squeezy :

```javascript
// Configuration de Lemon Squeezy
const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const LEMON_SQUEEZY_WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

// Fonction pour créer un checkout Lemon Squeezy
async function createLemonSqueezyCheckout(email: string, name: string) {
  // Configuration du produit
  const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID; // ID de la variante du produit
  
  const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkout',
        attributes: {
          variant_id: variantId,
          email: email,
          name: name,
          // Redirection après paiement
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merci?email=${encodeURIComponent(email)}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
          // Webhook pour la confirmation
          webhook_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhook/lemonsqueezy`,
        },
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error('Erreur lors de la création du checkout');
  }
  
  const data = await response.json();
  return data.data.attributes.url;
}
```

### 5.2 Configuration du webhook

Assurez-vous que le webhook est correctement configuré dans le fichier `/src/app/api/webhook/lemonsqueezy/route.ts` :

```javascript
// Traiter l'événement de paiement réussi
if (event.event === 'order_paid') {
  const { data } = event;
  const { attributes } = data;
  const { customer_email, customer_name, order_number } = attributes;
  
  // Envoi des emails de confirmation et de livraison
  // ... le reste du code existant
}
```

## Étape 6 : Test en local

### 6.1 Démarrer le serveur

```bash
npm run dev
```

### 6.2 Tester le formulaire d'achat

1. Visitez `http://localhost:3000`
2. Cliquez sur "Acheter maintenant"
3. Remplissez le formulaire avec un email test
4. Vérifiez que vous recevez les emails de confirmation

### 6.3 Tester le webhook avec ngrok

Pour tester le webhook en local, utilisez ngrok :

1. **Installez ngrok** :
   ```bash
   # Sur Mac avec brew
   brew install ngrok
   
   # Sur Windows avec chocolatey
   choco install ngrok
   
   # Sur Linux avec snap
   sudo snap install ngrok
   ```

2. **Lancez ngrok** :
   ```bash
   ngrok http 3000
   ```

3. **Copiez l'URL ngrok** et configurez-la temporairement dans Lemon Squeezy pour les tests

## Étape 7 : Déploiement en production

### 7.1 Déploiement de l'application

Déployez votre application sur une plateforme d'hébergement (Vercel, Netlify, etc.).

### 7.2 Configuration des variables d'environnement

Configurez les variables d'environnement sur votre plateforme d'hébergement :

- **Vercel** : Project Settings → Environment Variables
- **Netlify** : Site Settings → Build & Deploy → Environment
- **Autres** : Consultez la documentation de votre hébergeur

### 7.3 Configuration du webhook en production

1. Allez dans Lemon Squeezy → Settings → Webhooks
2. Modifiez l'URL du webhook avec votre URL de production :
   ```
   https://votreserveur.com/api/webhook/lemonsqueezy
   ```
3. Cliquez sur "Save Changes"

## Étape 8 : Vérification finale

### 8.1 Test du processus complet

1. Visitez votre page d'accueil en production
2. Cliquez sur "Acheter maintenant"
3. Remplissez le formulaire avec un email test
4. Effectuez un paiement test (en mode test si disponible)

### 8.2 Vérification des emails

- Vous devriez recevoir un email de confirmation de commande
- Après le paiement, vous devriez recevoir un email de livraison
- Vérifiez également les dossiers de spam

### 8.3 Vérification du téléchargement

1. Accédez à la page de merci : `https://votreserveur.com/merci?email=votre-email@test.com`
2. Cliquez sur "Télécharger l'ebook"
3. Vérifiez que le PDF se télécharge correctement

## Configuration Gmail

### Pour utiliser Gmail comme serveur SMTP :

1. **Activez l'accès moins sécurisé** :
   - Allez dans les paramètres de votre compte Google
   - Activez "Accès moins sécurisé aux applications"

2. **Créez un mot de passe d'application** :
   - Allez dans les paramètres de sécurité
   - Générez un mot de passe d'application
   - Utilisez ce mot de passe dans votre configuration SMTP

3. **Configuration SMTP pour Gmail** :
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=votre-email@gmail.com
   SMTP_PASS=votre-mot-de-passe-app
   ```

## Dépannage

### Problèmes courants

#### 1. Erreur de signature de webhook

**Symptôme** : Les webhooks échouent avec une erreur de signature

**Solution** :
- Vérifiez que votre secret webhook est correct
- Vérifiez que l'URL du webhook est accessible
- Vérifiez les logs du serveur pour les erreurs

#### 2. Emails non reçus

**Symptôme** : Les clients ne reçoivent pas les emails de confirmation

**Solution** :
- Vérifiez votre configuration SMTP
- Vérifiez les dossiers de spam
- Vérifiez les logs du serveur pour les erreurs d'envoi
- Testez votre configuration SMTP avec un outil comme Mailtrap

#### 3. Paiement non confirmé

**Symptôme** : Les paiements ne sont pas confirmés automatiquement

**Solution** :
- Vérifiez que votre webhook est bien configuré
- Vérifiez les logs de Lemon Squeezy pour les erreurs
- Vérifiez que l'URL du webhook est correcte et accessible

### Outils de test

#### Ngrok

Pour exposer votre serveur local lors des tests :

```bash
# Installation
brew install ngrok  # Mac
choco install ngrok  # Windows
sudo snap install ngrok  # Linux

# Utilisation
ngrok http 3000
```

#### Postman

Pour tester vos API endpoints :

1. Installez Postman
2. Créez une nouvelle requête POST
3. Entrez l'URL : `http://localhost:3000/api/purchase`
4. Ajoutez un header : `Content-Type: application/json`
5. Ajoutez un body JSON :
   ```json
   {
     "email": "test@example.com",
     "name": "Test User"
   }
   ```

#### Mailtrap

Pour tester les emails sans envoyer de vrais emails :

1. Créez un compte sur [mailtrap.io](https://mailtrap.io)
2. Configurez votre application avec les paramètres fournis par Mailtrap
3. Envoyez des emails de test et consultez-les dans l'interface de Mailtrap

## Conclusion

Votre application Next.js est maintenant intégrée avec Lemon Squeezy et prête à vendre des ebooks numériques de manière automatisée. Le processus complet fonctionne comme suit :

1. **Client** visite votre site → Remplit le formulaire d'achat
2. **Application** crée un checkout Lemon Squeezy → Envoie les emails de confirmation
3. **Client** paie sur Lemon Squeezy → Redirection vers la page de merci
4. **Webhook** reçoit la confirmation → Envoie les emails de livraison
5. **Client** peut télécharger l'ebook directement depuis la page de merci

Pour toute question ou problème, consultez la documentation de [Lemon Squeezy](https://docs.lemonsqueezy.com) ou la documentation de [Next.js](https://nextjs.org/docs).