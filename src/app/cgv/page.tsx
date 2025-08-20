import React from 'react';
import { FileText, ShoppingCart, Shield, Clock, RotateCcw, XCircle, CreditCard, Download, Mail, Scale } from 'lucide-react';

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Conditions Générales de Vente (CGV)</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Préambule */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-blue-600" />
              Préambule
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits numériques (ebooks) proposés par Atlantis Education sur son site web https://atlantis-education.com.
              </p>
              <p className="text-gray-700">
                Toute commande passée sur le site implique l'acceptation sans réserve des présentes CGV par le client. Atlantis Education se réserve le droit de modifier ses CGV à tout moment. Les CGV applicables sont celles en vigueur au jour de la commande.
              </p>
            </div>
          </section>

          {/* Article 1 - Objet */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Article 1 - Objet
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de produits numériques (ebooks) proposés par Atlantis Education sur son site web.
              </p>
            </div>
          </section>

          {/* Article 2 - Produits */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="h-5 w-5 mr-2 text-blue-600" />
              Article 2 - Produits
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les produits proposés à la vente sont des ebooks au format PDF, contenant du contenu pédagogique sur la motivation des élèves. Les caractéristiques essentielles des produits sont présentées sur la fiche produit de chaque ebook.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Caractéristiques des produits :</h3>
                <ul className="list-disc pl-5 text-blue-800 space-y-1">
                  <li>Format : PDF numérique</li>
                  <li>Compatibilité : Tous les supports de lecture PDF</li>
                  <li>Langue : Français</li>
                  <li>Mise à jour : Les ebooks ne sont pas mis à jour automatiquement</li>
                  <li>Accès : Téléchargement immédiat après paiement</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4">
                Atlantis Education s'engage à fournir des produits exempts de vices cachés et conformes à leur description. Les illustrations et photos des produits ne sont pas contractuelles.
              </p>
            </div>
          </section>

          {/* Article 3 - Prix */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Article 3 - Prix
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les prix des produits sont indiqués en euros (€) TTC. Ils comprennent la TVA au taux en vigueur pour les produits numériques.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-green-900 mb-2">TVA applicable :</h3>
                <ul className="list-disc pl-5 text-green-800 space-y-1">
                  <li>Particuliers résidents en France : 20%</li>
                  <li>Particuliers résidents dans l'UE : Taux du pays de résidence</li>
                  <li>Professionnels : Taux du pays de résidence (avec numéro de TVA intracommunautaire)</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4">
                Atlantis Education se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés au tarif en vigueur au moment de la validation de la commande.
              </p>
              <p className="text-gray-700">
                Les frais de livraison ne s'appliquent pas aux produits numériques, ceux-ci étant disponibles en téléchargement immédiat.
              </p>
            </div>
          </section>

          {/* Article 4 - Commande */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              Article 4 - Commande
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Le client peut sélectionner un ou plusieurs produits et les ajouter à son panier. Pour valider sa commande, le client doit :
              </p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                <li>Créer un compte ou se connecter</li>
                <li>Valider le contenu de son panier</li>
                <li>Fournir les informations nécessaires au traitement de la commande</li>
                <li>Choisir son mode de paiement</li>
                <li>Accepter les présentes CGV</li>
                <li>Valider définitivement sa commande</li>
              </ol>
              <p className="text-gray-700 mt-4">
                La validation de la commande vaut acceptation des prix, des caractéristiques des produits et des présentes CGV. Un récapitulatif de la commande est envoyé par email à l'adresse fournie par le client.
              </p>
            </div>
          </section>

          {/* Article 5 - Paiement */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Article 5 - Paiement
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Le paiement s'effectue en ligne via notre partenaire de paiement sécurisé Lemon Squeezy. Les modes de paiement acceptés sont :
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-purple-900 mb-2">Modes de paiement acceptés :</h3>
                <ul className="list-disc pl-5 text-purple-800 space-y-1">
                  <li>Carte bancaire (Visa, Mastercard, etc.)</li>
                  <li>PayPal</li>
                  <li>Apple Pay</li>
                  <li>Google Pay</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4">
                Le paiement est débité immédiatement après validation de la commande. La transaction est sécurisée et cryptée. Atlantis Education n'a pas accès aux informations bancaires complètes du client.
              </p>
              <p className="text-gray-700">
                En cas de paiement refusé par l'établissement bancaire, la commande sera annulée et le client en sera informé par email.
              </p>
            </div>
          </section>

          {/* Article 6 - Livraison numérique */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="h-5 w-5 mr-2 text-blue-600" />
              Article 6 - Livraison numérique
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les produits numériques sont disponibles en téléchargement immédiat après validation du paiement.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-orange-900 mb-2">Processus de livraison :</h3>
                <ol className="list-decimal pl-5 text-orange-800 space-y-1">
                  <li>Validation du paiement</li>
                  <li>Envoi d'un email de confirmation avec lien de téléchargement</li>
                  <li>Accès au produit via le compte client</li>
                  <li>Téléchargement du fichier PDF</li>
                </ol>
              </div>
              <p className="text-gray-700 mt-4">
                Le client dispose d'un accès illimité dans le temps aux produits achetés via son compte client. Les liens de téléchargement restent actifs pendant une durée minimale de 2 ans.
              </p>
              <p className="text-gray-700">
                Atlantis Education ne peut être tenue responsable des problèmes techniques liés à l'équipement du client ou à sa connexion internet empêchant le téléchargement ou l'accès aux produits.
              </p>
            </div>
          </section>

          {/* Article 7 - Droit de rétractation */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <RotateCcw className="h-5 w-5 mr-2 text-blue-600" />
              Article 7 - Droit de rétractation
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai de 14 jours à compter de la conclusion du contrat pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-red-900 mb-2">Exception au droit de rétractation :</h3>
                <p className="text-red-800 text-sm">
                  Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contrats de fourniture de contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                En cochant la case prévue à cet effet lors de la commande, le client reconnaît avoir été informé de cette exception et consent à ce que la fourniture du contenu numérique commence immédiatement après la conclusion du contrat, et renonce par conséquent à son droit de rétractation.
              </p>
            </div>
          </section>

          {/* Article 8 - Garantie */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Article 8 - Garantie
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Atlantis Education garantit que les produits numériques sont conformes à leur description et exempts de vices cachés au moment de l'achat.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-green-900 mb-2">Garantie "Satisfait ou Remboursé" - 30 jours :</h3>
                <p className="text-green-800 text-sm">
                  Si vous n'êtes pas satisfait de votre achat pour une raison quelconque, contactez-nous dans les 30 jours suivant votre achat. Nous nous engageons à vous rembourser intégralement ou à vous proposer une solution alternative.
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                Pour faire valoir la garantie, le client doit contacter le service client à l'adresse contact@atlantis-education.com en fournissant :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Le numéro de commande</li>
                <li>L'adresse email utilisée pour l'achat</li>
                <li>La raison de l'insatisfaction</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Le remboursement sera effectué dans un délai de 14 jours à compter de la réception de la demande, par le même moyen de paiement que celui utilisé pour l'achat.
              </p>
            </div>
          </section>

          {/* Article 9 - Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Article 9 - Propriété intellectuelle
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Tous les droits de propriété intellectuelle relatifs aux produits numériques vendus sur le site appartiennent exclusivement à Atlantis Education ou à ses partenaires.
              </p>
              <p className="text-gray-700">
                L'achat d'un produit numérique confère au client un droit d'utilisation personnel et non exclusif. Le client s'engage à ne pas :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Reproduire, copier ou distribuer le produit</li>
                <li>Modifier, adapter ou traduire le produit</li>
                <li>Revendre ou commercialiser le produit</li>
                <li>Publier le produit sur des plateformes de partage</li>
                <li>Utiliser le produit à des fins commerciales sans autorisation</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Toute violation de ces droits expose le client à des poursuites judiciaires et des dommages-intérêts.
              </p>
            </div>
          </section>

          {/* Article 10 - Responsabilité */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Article 10 - Responsabilité
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Atlantis Education ne peut être tenue responsable des dommages directs ou indirects résultant de :
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>L'utilisation inappropriée des produits par le client</li>
                <li>Problèmes techniques liés à l'équipement du client</li>
                <li>Indisponibilité temporaire du site</li>
                <li>Erreurs ou omissions dans le contenu des produits</li>
                <li>Perte de données par le client</li>
              </ul>
              <p className="text-gray-700 mt-4">
                La responsabilité d'Atlantis Education est limitée au montant de la commande du client.
              </p>
            </div>
          </section>

          {/* Article 11 - Données personnelles */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Article 11 - Données personnelles
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les données personnelles collectées lors de la commande sont traitées conformément à notre Politique de Confidentialité et au RGPD.
              </p>
              <p className="text-gray-700">
                Les données collectées sont nécessaires au traitement de la commande et à la fourniture des services. Le client dispose d'un droit d'accès, de rectification, de suppression et d'opposition sur ses données personnelles.
              </p>
              <p className="text-gray-700">
                Pour plus d'informations, consultez notre 
                <a href="/politique-confidentialite" className="text-blue-600 hover:text-blue-800 underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </div>
          </section>

          {/* Article 12 - Service client */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Article 12 - Service client
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Le service client d'Atlantis Education est disponible pour répondre à toutes vos questions concernant vos commandes, les produits ou les présentes CGV.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Contact du service client :</h3>
                <div className="space-y-2">
                  <p className="text-blue-800"><strong>Email :</strong> support@atlantis-education.com</p>
                  <p className="text-blue-800"><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                  <p className="text-blue-800"><strong>Horaires :</strong> Lundi au vendredi, 9h-18h</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                Le service client s'engage à répondre dans un délai de 24 heures ouvrées.
              </p>
            </div>
          </section>

          {/* Article 13 - Force majeure */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <XCircle className="h-5 w-5 mr-2 text-blue-600" />
              Article 13 - Force majeure
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Atlantis Education ne pourra être tenue responsable de l'inexécution ou du retard dans l'exécution de ses obligations lorsque la cause est due à un cas de force majeure.
              </p>
              <p className="text-gray-700">
                Sont considérés comme cas de force majeure : guerres, émeutes, incendies, grèves, inondations, perturbations des réseaux de télécommunications, et plus généralement tout événement imprévisible et irrésistible.
              </p>
            </div>
          </section>

          {/* Article 14 - Loi applicable et juridiction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-blue-600" />
              Article 14 - Loi applicable et juridiction
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700">
                Les présentes CGV sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
              <p className="text-gray-700">
                Avant toute action en justice, le client est invité à contacter le service client pour tenter de trouver une solution amiable au litige.
              </p>
            </div>
          </section>

          {/* Article 15 - Entrée en vigueur */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Article 15 - Entrée en vigueur
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900">
                Les présentes Conditions Générales de Vente entrent en vigueur le <strong>15 janvier 2025</strong>.
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