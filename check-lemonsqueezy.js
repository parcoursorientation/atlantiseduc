#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Vérifier si le fichier .env.local existe
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.local.example');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  Le fichier .env.local n\'existe pas.');
  console.log('📋 Création du fichier .env.local à partir de .env.local.example...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Fichier .env.local créé avec succès !');
    console.log('🔧 N\'oubliez de modifier les valeurs dans le fichier .env.local');
  } else {
    console.log('❌ Le fichier .env.local.example n\'existe pas');
  }
}

// Vérifier les dépendances
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

console.log('\n📦 Vérification des dépendances installées :');

const requiredDeps = ['axios', 'crypto-js', 'nodemailer'];
const requiredDevDeps = ['@types/crypto-js'];

requiredDeps.forEach(dep => {
  if (dependencies[dep]) {
    console.log(`✅ ${dep} : ${dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} : Non installé`);
  }
});

requiredDevDeps.forEach(dep => {
  if (devDependencies[dep]) {
    console.log(`✅ ${dep} : ${devDependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} : Non installé`);
  }
});

// Vérifier les fichiers clés
console.log('\n📁 Vérification des fichiers clés :');

const filesToCheck = [
  'src/lib/lemonsqueezy.ts',
  'src/app/api/purchase/route.ts',
  'src/app/api/webhook/lemonsqueezy/route.ts',
  'src/app/merci/page.tsx',
  'src/app/api/download-ebook/route.ts'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} : Existe`);
  } else {
    console.log(`❌ ${file} : Manquant`);
  }
});

console.log('\n🔍 Vérification de la configuration :');

// Vérifier si les variables d'environnement sont configurées
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_SECURE',
    'SMTP_USER',
    'SMTP_PASS',
    'SMTP_FROM',
    'SMTP_ADMIN',
    'LEMON_SQUEEZY_API_KEY',
    'LEMON_SQUEEZY_WEBHOOK_SECRET',
    'LEMON_SQUEEZY_VARIANT_ID',
    'NEXT_PUBLIC_BASE_URL'
  ];
  
  const configuredVars = [];
  const missingVars = [];
  
  requiredEnvVars.forEach(varName => {
    const hasVar = envLines.some(line => line.startsWith(varName + '='));
    if (hasVar) {
      const value = envLines.find(line => line.startsWith(varName + '=')).split('=')[1];
      if (value && value !== 'votre-email@gmail.com' && value !== 'lsk_votre_clé_api_ici' && value !== 'lsw_votre_secret_webhook_ici' && value !== 'id_de_la_variante_ici' && value !== 'https://votreserveur.com') {
        configuredVars.push(varName);
      } else {
        missingVars.push(varName + ' (valeur par défaut)');
      }
    } else {
      missingVars.push(varName);
    }
  });
  
  if (configuredVars.length > 0) {
    console.log('✅ Variables configurées :');
    configuredVars.forEach(varName => console.log(`   - ${varName}`));
  }
  
  if (missingVars.length > 0) {
    console.log('❌ Variables à configurer :');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
  }
} else {
  console.log('❌ Fichier .env.local non trouvé');
}

console.log('\n📋 Instructions pour configurer Lemon Squeezy :');
console.log('1. Créez un compte sur https://lemonsqueezy.com');
console.log('2. Créez un produit "Motiver les élèves à apprendre" à 29€');
console.log('3. Générez une clé API dans Settings → API Keys');
console.log('4. Configurez un webhook dans Settings → Webhooks');
console.log('5. Mettez à jour le fichier .env.local avec vos informations');
console.log('6. Déployez votre application sur un serveur');
console.log('7. Testez le processus complet');

console.log('\n🚀 Lemon Squeezy est prêt à être utilisé !');