import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Calendar, Shield, Scale } from 'lucide-react';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mentions Légales</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Éditeur du site */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Éditeur du site
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Raison sociale</p>
                  <p className="text-gray-900">Atlantis Education</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Forme juridique</p>
                  <p className="text-gray-900">Entreprise individuelle</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Nom du représentant</p>
                  <p className="text-gray-900">Atlantis</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Capital social</p>
                  <p className="text-gray-900">1 000 €</p>
                </div>
              </div>
            </div>
          </section>

          {/* Coordonnées */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Coordonnées
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">contact@atlantis-education.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Téléphone</p>
                  <p className="text-gray-900">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Adresse</p>
                  <p className="text-gray-900">
                    123 Avenue des Pédagogues<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Hébergeur
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Nom de l'hébergeur</p>
                  <p className="text-gray-900">Vercel, Inc.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Adresse</p>
                  <p className="text-gray-900">
                    340 S Lemon Ave #4133<br />
                    Walnut, CA 91789, USA
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Site web</p>
                  <p className="text-gray-900">https://vercel.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Support technique</p>
                  <p className="text-gray-900">support@vercel.com</p>
                </div>
              </div>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-blue-600" />
              Propriété intellectuelle
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive d'Atlantis Education et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="text-gray-700">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces éléments est strictement interdite sans l'autorisation écrite préalable d'Atlantis Education.
              </p>
              <p className="text-gray-700">
                Les marques, logos et noms de produits cités sur ce site appartiennent à leurs propriétaires respectifs.
              </p>
            </div>
          </section>

          {/* Limitations de responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Limitations de responsabilité
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Atlantis Education s'efforce de fournir des informations exactes et à jour sur ce site, mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations mises à disposition.
              </p>
              <p className="text-gray-700">
                En conséquence, Atlantis Education décline toute responsabilité :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Pour toute interruption du site ou toute inaccessibilité temporaire</li>
                <li>Pour toute erreur ou omission dans les informations présentées</li>
                <li>Pour tout dommage direct ou indirect résultant de l'utilisation du site ou de l'impossibilité d'y accéder</li>
                <li>Pour tout contenu téléchargé depuis le site</li>
              </ul>
              <p className="text-gray-700">
                Atlantis Education se réserve le droit de modifier, suspendre ou discontinuer temporairement ou définitivement le site, à tout moment et sans préavis.
              </p>
            </div>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Liens hypertextes
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Ce site peut contenir des liens hypertextes vers d'autres sites internet. Atlantis Education n'exerce aucun contrôle sur ces sites et ne peut être tenue responsable de leur contenu.
              </p>
              <p className="text-gray-700">
                L'établissement de liens hypertextes vers ce site est soumis à l'autorisation préalable et écrite d'Atlantis Education.
              </p>
            </div>
          </section>

          {/* Protection des données personnelles */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Protection des données personnelles
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, Atlantis Education s'engage à protéger la vie privée des utilisateurs de ce site.
              </p>
              <p className="text-gray-700">
                Les données personnelles collectées sur ce site sont traitées dans le respect des principes suivants :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Licéité, loyauté et transparence</li>
                <li>Limitation des finalités</li>
                <li>Minimisation des données</li>
                <li>Exactitude</li>
                <li>Limitation de la conservation</li>
                <li>Intégrité et confidentialité</li>
                <li>Responsabilité proactive</li>
              </ul>
              <p className="text-gray-700">
                Pour plus d'informations sur le traitement de vos données personnelles, consultez notre 
                <a href="/politique-confidentialite" className="text-blue-600 hover:text-blue-800 underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Cookies
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site.
              </p>
              <p className="text-gray-700">
                Vous pouvez configurer votre navigateur pour refuser les cookies ou pour vous avertir lorsque des cookies sont envoyés. Cependant, certaines parties du site pourraient ne pas fonctionner correctement sans cookies.
              </p>
            </div>
          </section>

          {/* Droit applicable et juridiction compétente */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-blue-600" />
              Droit applicable et juridiction compétente
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
              <p className="text-gray-700">
                Pour toute réclamation ou question concernant ces mentions légales, vous pouvez nous contacter à l'adresse suivante : contact@atlantis-education.com
              </p>
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
                Les présentes mentions légales ont été mises à jour le <strong>15 janvier 2025</strong>.
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