"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Download, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MerciPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    setIsMounted(true);
    // Récupérer l'email de l'URL
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleDownload = async () => {
    setIsDownloadLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/download-ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Créer un blob à partir de la réponse et déclencher le téléchargement
        const blob = await response.blob();
        if (typeof window !== "undefined") {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "motiver-eleves-apprendre.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }

        setIsDownloadLoading(false);
        setSuccessMessage("Téléchargement réussi !");
      } else {
        const data = await response.json();
        setApiError(data.error || "Une erreur est survenue");
        setIsDownloadLoading(false);
      }
    } catch (error) {
      setApiError("Erreur de connexion au serveur");
      setIsDownloadLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">
                Atlantis Education
              </span>
            </div>
            <Link
              href="/"
              className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Merci pour votre achat !
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Votre ebook "Motiver les élèves à apprendre" a été commandé avec
              succès. Vous devriez recevoir un email de confirmation dans les
              prochaines minutes.
            </p>

            {email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Prochaines étapes :
                </h3>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Vérifiez votre boîte email (et les spams)</li>
                  <li>• Téléchargez votre ebook PDF</li>
                  <li>• Commencez à appliquer les techniques dès demain !</li>
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Bouton de téléchargement */}
            <div className="text-center">
              <button
                onClick={handleDownload}
                disabled={isDownloadLoading}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isDownloadLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Téléchargement en cours...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Télécharger l'ebook</span>
                  </>
                )}
              </button>
            </div>

            {/* Messages */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">{successMessage}</p>
              </div>
            )}

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-center">{apiError}</p>
              </div>
            )}

            {/* Support */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Vous n'avez pas reçu l'email ou vous avez des questions ?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Nous contacter</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bonus */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎓 Offre spéciale pour vous
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Profitez d'une réduction exclusive sur notre application éducative
            pour compléter votre apprentissage.
          </p>
          <div className="text-center">
            <Link
              href="/app-educative"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold inline-block"
            >
              Découvrir l'app éducative
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerciPage;
