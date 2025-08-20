import React from 'react';
import { Shield, Eye, Lock, Database, Trash2, Mail, User, FileText, Calendar, Scale } from 'lucide-react';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Politique de Confidentialité</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Introduction
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Atlantis Education s'engage à protéger la vie privée des utilisateurs de son site web. Cette politique de confidentialité explique quelles données personnelles nous collectons, comment nous les utilisons, et quels sont vos droits concernant ces données.
              </p>
              <p className="text-gray-700">
                En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés.
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              Données personnelles collectées
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Données que vous nous fournissez volontairement :</h3>
                <ul className="list-disc pl-5 text-blue-800 space-y-1">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Coordonnées de paiement (pour les achats)</li>
                  <li>Messages de contact</li>
                  <li>Réponses aux questionnaires ou sondages</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Données collectées automatiquement :</h3>
                <ul className="list-disc pl-5 text-green-800 space-y-1">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et version</li>
                  <li>Système d'exploitation</li>
                  <li>Pages visitées et temps passé</li>
                  <li>Site web d'origine</li>
                  <li>Données de cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Finalités du traitement */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Finalités du traitement des données
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Gestion des achats</h3>
                <p className="text-gray-700">
                  Traitement des coordonnées et informations de paiement pour finaliser vos achats d'ebooks et vous envoyer les produits numériques.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Bases légales :</strong> Exécution du contrat et consentement
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Communication et support</h3>
                <p className="text-gray-700">
                  Réponse à vos demandes via le formulaire de contact et support client.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Bases légales :</strong> Intérêt légitime et consentement
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Marketing et newsletter</h3>
                <p className="text-gray-700">
                  Envoi d'informations pédagogiques, conseils et offres promotionnelles si vous avez souscrit à notre newsletter.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Bases légales :</strong> Consentement
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Amélioration du service</h3>
                <p className="text-gray-700">
                  Analyse des données d'utilisation pour améliorer notre site web et nos services.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Bases légales :</strong> Intérêt légitime
                </p>
              </div>
            </div>
          </section>

          {/* Conservation des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Durée de conservation des données
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données clients</h3>
                  <p className="text-gray-700 text-sm">
                    10 ans pour les données comptables et fiscales<br/>
                    3 ans pour les données de transaction<br/>
                    5 ans pour les preuves de consentement
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Newsletter</h3>
                  <p className="text-gray-700 text-sm">
                    Jusqu'à votre désabonnement<br/>
                    Maximum 3 ans sans activité
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Données techniques</h3>
                  <p className="text-gray-700 text-sm">
                    13 mois pour les logs<br/>
                    2 ans pour les données analytiques
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-700 text-sm">
                    2 ans après le dernier échange<br/>
                    Ou jusqu'à résolution de votre demande
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Partage des données avec des tiers
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. Nous ne partageons vos données que dans les cas suivants :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Prestataires de services :</strong> Nous utilisons des sous-traitants pour le paiement (Lemon Squeezy), l'hébergement (Vercel), et l'envoi d'emails. Ces sociétés n'accèdent à vos données que dans la mesure nécessaire pour fournir leurs services.</li>
                <li><strong>Obligations légales :</strong> Si la loi l'exige ou pour protéger nos droits, nous pouvons divulguer vos données aux autorités compétentes.</li>
                <li><strong>Transfert d'entreprise :</strong> En cas de fusion, acquisition ou vente, vos données pourraient être transférées à la société acquéreuse.</li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note :</strong> Tous nos sous-traitants signent des contrats garantissant un niveau de protection des données équivalent au nôtre.
                </p>
              </div>
            </div>
          </section>

          {/* Sécurité des données */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-blue-600" />
              Sécurité des données
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>L'accès non autorisé</li>
                <li>La modification, la destruction ou la perte accidentelle</li>
                <li>La divulgation non autorisée</li>
                <li>L'utilisation abusive</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Ces mesures incluent :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Chiffrement des données sensibles</li>
                <li>Contrôle d'accès strict</li>
                <li>Formations régulières du personnel</li>
                <li>Audits de sécurité réguliers</li>
                <li>Protocoles de communication sécurisés (HTTPS)</li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Vos droits concernant vos données
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Droit d'accès</h3>
                <p className="text-blue-800 text-sm">
                  Vous avez le droit de savoir quelles données personnelles nous détenons à votre sujet et de recevoir une copie de ces données.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Droit de rectification</h3>
                <p className="text-green-800 text-sm">
                  Vous pouvez demander la correction de données inexactes ou incomplètes vous concernant.
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Droit à l'effacement</h3>
                <p className="text-purple-800 text-sm">
                  Vous pouvez demander la suppression de vos données personnelles dans certaines conditions.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Droit à la limitation du traitement</h3>
                <p className="text-orange-800 text-sm">
                  Vous pouvez demander de limiter l'utilisation de vos données dans certaines situations.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">Droit à la portabilité</h3>
                <p className="text-red-800 text-sm">
                  Vous pouvez recevoir vos données dans un format structuré et les transférer à un autre responsable de traitement.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Droit d'opposition</h3>
                <p className="text-gray-800 text-sm">
                  Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.
                </p>
              </div>
            </div>
          </section>

          {/* Comment exercer vos droits */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Comment exercer vos droits
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Pour exercer l'un de vos droits ou poser une question sur le traitement de vos données, contactez-nous :
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-700">dpo@atlantis-education.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse postale</p>
                    <p className="text-gray-700">
                      Délégué à la protection des données<br/>
                      Atlantis Education<br/>
                      123 Avenue des Pédagogues<br/>
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                Nous nous engageons à répondre à votre demande dans un délai d'un mois à compter de sa réception. Ce délai peut être prolongé de deux mois en cas de demandes complexes.
              </p>
            </div>
          </section>

          {/* Cookies et technologies similaires */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              Cookies et technologies similaires
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience et analyser l'utilisation du site. Les types de cookies utilisés sont :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de performance :</strong> Pour analyser et améliorer les performances du site</li>
                <li><strong>Cookies de fonctionnalité :</strong> Pour mémoriser vos préférences</li>
                <li><strong>Cookies de marketing :</strong> Pour personnaliser les publicités (avec votre consentement)</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Vous pouvez gérer vos préférences de cookies via notre bandeau de consentement ou les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Modifications de la politique */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Modifications de cette politique
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur le site.
              </p>
              <p className="text-gray-700">
                Nous vous informerons des modifications significatives par email ou via un avis sur notre site. Nous vous encourageons à consulter régulièrement cette page pour rester informé.
              </p>
            </div>
          </section>

          {/* Contact DPO */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Contact du Délégué à la Protection des Données
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-900 mb-4">
                Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez contacter notre Délégué à la Protection des Données (DPO) :
              </p>
              <div className="space-y-2">
                <p className="text-blue-800"><strong>Email :</strong> dpo@atlantis-education.com</p>
                <p className="text-blue-800"><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                <p className="text-blue-800"><strong>Adresse :</strong> 123 Avenue des Pédagogues, 75001 Paris, France</p>
              </div>
            </div>
          </section>

          {/* Réclamation auprès de l'autorité de contrôle */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-blue-600" />
              Réclamation auprès de l'autorité de contrôle
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Si vous estimez que le traitement de vos données personnelles enfreint la réglementation, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente :
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <p className="text-gray-900 font-semibold">CNIL - Commission Nationale de l'Informatique et des Libertés</p>
                <p className="text-gray-700">3 Place de Fontenoy - TSA 80715 - 75334 Paris Cedex 07</p>
                <p className="text-gray-700">Téléphone : 01 53 73 22 22</p>
                <p className="text-gray-700">Site web : www.cnil.fr</p>
              </div>
            </div>
          </section>

          {/* Mise à jour */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Mise à jour
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                Cette politique de confidentialité a été mise à jour le <strong>15 janvier 2025</strong>.
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Atlantis Education. Tous droits réservés.
          </p>
          <div className="mt-4 space-x-6">
            <a href="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="/cgv" className="text-gray-400 hover:text-white text-sm transition-colors">
              CGV
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}