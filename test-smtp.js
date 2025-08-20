#!/usr/bin/env node

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config({ path: '.env.local' });

console.log('📧 Test de configuration SMTP\n');

// Vérifier que les variables d'environnement sont configurées
const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_SECURE',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'SMTP_ADMIN'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
const defaultVars = requiredEnvVars.filter(varName => {
  const value = process.env[varName];
  return value && (value.includes('votre-') || value.includes('ici') || value.includes('example') || value.includes('votredomaine.com'));
});

if (missingVars.length > 0) {
  console.log('❌ Variables d\'environnement manquantes :');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\nVeuillez configurer le fichier .env.local avant de continuer.');
  process.exit(1);
}

if (defaultVars.length > 0) {
  console.log('⚠️  Variables d\'environnement avec valeurs par défaut :');
  defaultVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\nVeuillez remplacer les valeurs par défaut dans le fichier .env.local.');
}

// Créer le transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log('🔧 Configuration SMTP :');
console.log(`   Host: ${process.env.SMTP_HOST}`);
console.log(`   Port: ${process.env.SMTP_PORT}`);
console.log(`   Secure: ${process.env.SMTP_SECURE}`);
console.log(`   User: ${process.env.SMTP_USER}`);
console.log(`   From: ${process.env.SMTP_FROM}`);
console.log(`   Admin: ${process.env.SMTP_ADMIN}`);

// Email de test
const testEmail = {
  from: process.env.SMTP_FROM,
  to: process.env.SMTP_ADMIN,
  subject: 'Test de configuration SMTP - Atlantis Education',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1a73e8; margin-bottom: 10px;">Test de configuration SMTP</h2>
        <p style="margin-bottom: 8px;">Ceci est un email de test pour vérifier que votre configuration SMTP fonctionne correctement.</p>
        <p style="margin-bottom: 8px;"><strong>Date du test :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        <p style="margin-bottom: 8px;"><strong>Configuration :</strong></p>
        <ul style="margin-bottom: 8px;">
          <li>Host: ${process.env.SMTP_HOST}</li>
          <li>Port: ${process.env.SMTP_PORT}</li>
          <li>Secure: ${process.env.SMTP_SECURE}</li>
          <li>User: ${process.env.SMTP_USER}</li>
        </ul>
        <p style="margin-bottom: 8px;">Si vous recevez cet email, votre configuration SMTP est correcte ! 🎉</p>
      </div>
      <p style="color: #5f6368; font-size: 14px; text-align: center;">
        Cet email a été généré automatiquement pour tester la configuration SMTP.
      </p>
    </div>
  `,
  text: `Test de configuration SMTP\n\nCeci est un email de test pour vérifier que votre configuration SMTP fonctionne correctement.\n\nDate du test : ${new Date().toLocaleString('fr-FR')}\n\nConfiguration :\n- Host: ${process.env.SMTP_HOST}\n- Port: ${process.env.SMTP_PORT}\n- Secure: ${process.env.SMTP_SECURE}\n- User: ${process.env.SMTP_USER}\n\nSi vous recevez cet email, votre configuration SMTP est correcte ! 🎉\n\nCet email a été généré automatiquement pour tester la configuration SMTP.`
};

// Envoyer l'email de test
console.log('\n📤 Envoi de l\'email de test...');

transporter.sendMail(testEmail, (error, info) => {
  if (error) {
    console.log('❌ Erreur lors de l\'envoi de l\'email :');
    console.log('   Message:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - Vérifiez votre nom d\'utilisateur et mot de passe');
      console.log('   - Pour iFast.net, utilisez l\'adresse email complète comme nom d\'utilisateur');
      console.log('   - Vérifiez que l\'email existe bien dans cPanel');
      console.log('   - Essayez de vous connecter via webmail pour tester les identifiants');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - Vérifiez l\'adresse du serveur SMTP (doit être mail.votredomaine.com)');
      console.log('   - Vérifiez le port (587 pour STARTTLS, 465 pour SSL)');
      console.log('   - Essayez avec localhost:25 si vous êtes sur le même serveur');
      console.log('   - Contactez le support iFast.net pour vérifier les ports ouverts');
    } else if (error.code === 'ESOCKET') {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - Vérifiez la configuration SSL/TLS');
      console.log('   - Essayez de changer le port (587 pour STARTTLS, 465 pour SSL)');
      console.log('   - Vérifiez que votre pare-feu ne bloque pas la connexion');
    } else if (error.message.includes('Greeting failed')) {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - iFast.net peut nécessiter une authentification avant l\'envoi');
      console.log('   - Vérifiez que votre adresse IP n\'est pas bloquée');
      console.log('   - Contactez le support iFast.net pour vérifier les limites d\'envoi');
    } else if (error.message.includes('No recipients defined')) {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - Vérifiez la variable SMTP_ADMIN');
      console.log('   - Assurez-vous que l\'adresse email est valide');
    } else if (error.message.includes('Message size exceeds fixed limit')) {
      console.log('\n💡 Suggestions pour corriger l\'erreur :');
      console.log('   - Réduisez la taille de l\'email');
      console.log('   - Vérifiez les limites de taille de iFast.net');
    } else {
      console.log('\n💡 Suggestions générales :');
      console.log('   - Vérifiez toutes les variables d\'environnement');
      console.log('   - Essayez une configuration alternative (port 465)');
      console.log('   - Contactez le support de votre hébergeur');
    }
    
    process.exit(1);
  } else {
    console.log('✅ Email envoyé avec succès !');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Réponse: ${info.response}`);
    
    console.log('\n🎉 Votre configuration SMTP fonctionne correctement !');
    console.log('📧 Vérifiez votre boîte de réception (et les spams) pour confirmer.');
    
    console.log('\n📋 Prochaines étapes :');
    console.log('1. Testez le formulaire de contact sur votre site');
    console.log('2. Testez le formulaire d\'achat');
    console.log('3. Testez le formulaire de newsletter');
    console.log('4. Configurez Lemon Squeezy pour les paiements');
    
    process.exit(0);
  }
});