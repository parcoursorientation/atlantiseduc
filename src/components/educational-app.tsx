'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Download, RefreshCw, Calendar, Target, Heart, Trophy } from 'lucide-react';
import jsPDF from 'jspdf';
import ErrorModal from './error-modal';

// Types pour notre application
interface DailyEntry {
  id: string;
  date: string;
  objective: string;
  effort: string;
  encouragement: string;
  success: string;
}

interface EducationalAppProps {
  isDarkMode?: boolean;
}

const EducationalApp: React.FC<EducationalAppProps> = ({ isDarkMode = false }) => {
  // États pour la checklist quotidienne
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Omit<DailyEntry, 'id' | 'date'>>({
    objective: '',
    effort: '',
    encouragement: '',
    success: ''
  });
  
  // État pour le générateur de phrases
  const [motivationalPhrase, setMotivationalPhrase] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // État pour la modal d'erreur
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Liste de phrases motivantes
  const motivationalPhrases = [
    "Bravo pour tes efforts, chaque pas compte !",
    "Tu as déjà fait beaucoup de progrès, continue comme ça.",
    "Je vois que tu as persévéré, c'est impressionnant !",
    "Tu peux y arriver, fais confiance à tes capacités.",
    "Même une petite avancée est une grande victoire.",
    "L'important n'est pas d'être parfait, mais de continuer d'apprendre.",
    "Chaque erreur est une occasion d'apprendre quelque chose de nouveau.",
    "Tu es capable de grandes choses, crois en toi.",
    "Je suis fier/fière de ton engagement.",
    "Ton travail d'aujourd'hui prépare tes réussites de demain.",
    "Chaque jour est une nouvelle chance de progresser.",
    "Tu as surmonté une difficulté, c'est une belle réussite !",
    "La clé, c'est d'essayer encore une fois de plus.",
    "Ce n'est pas la vitesse qui compte, mais la régularité.",
    "Tu apprends à ton rythme, et c'est très bien ainsi.",
    "Tu as montré du courage en continuant malgré la difficulté.",
    "Tu construis ton avenir pas à pas, et tu avances bien.",
    "Tes efforts d'aujourd'hui sont les succès de demain.",
    "Je crois en ton potentiel.",
    "Continue, tu es sur la bonne voie !"
  ];

  // Charger les données depuis LocalStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEntries = localStorage.getItem('dailyEntries');
      if (savedEntries) {
        setDailyEntries(JSON.parse(savedEntries));
      }
    }
  }, []);

  // Sauvegarder les données dans LocalStorage à chaque modification
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dailyEntries', JSON.stringify(dailyEntries));
    }
  }, [dailyEntries]);

  // Générer une phrase motivante aléatoire
  const generateMotivationalPhrase = () => {
    setIsGenerating(true);
    
    // Simuler un petit délai pour l'effet visuel
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
      setMotivationalPhrase(motivationalPhrases[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

  // Ajouter une entrée quotidienne
  const addDailyEntry = () => {
    if (!currentEntry.objective.trim() || !currentEntry.effort.trim()) {
      setErrorMessage('Veuillez remplir au moins l\'objectif du jour et l\'effort observé.');
      setShowErrorModal(true);
      return;
    }

    const newEntry: DailyEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR'),
      ...currentEntry
    };

    setDailyEntries([newEntry, ...dailyEntries]);
    
    // Réinitialiser le formulaire
    setCurrentEntry({
      objective: '',
      effort: '',
      encouragement: '',
      success: ''
    });
  };

  // Supprimer une entrée
  const deleteEntry = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette entrée ?')) {
      setDailyEntries(dailyEntries.filter(entry => entry.id !== id));
    }
  };

  // Exporter en PDF
  const exportToPDF = () => {
    if (dailyEntries.length === 0) {
      alert('Aucune donnée à exporter. Veuillez d\'abord ajouter des entrées.');
      return;
    }

    const doc = new jsPDF();
    
    // Configuration du document
    doc.setFontSize(20);
    doc.text('Journal de Motivation Quotidienne', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 30);
    
    let yPosition = 50;
    
    dailyEntries.forEach((entry, index) => {
      // Vérifier si on a besoin d'une nouvelle page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // En-tête de l'entrée
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`Entrée ${index + 1} - ${entry.date}`, 20, yPosition);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      yPosition += 10;
      
      // Objectif du jour
      doc.text('Objectif du jour:', 20, yPosition);
      yPosition += 5;
      doc.text(entry.objective, 25, yPosition);
      yPosition += 10;
      
      // Effort observé
      doc.text('Effort observé:', 20, yPosition);
      yPosition += 5;
      doc.text(entry.effort, 25, yPosition);
      yPosition += 10;
      
      // Encouragement donné
      if (entry.encouragement) {
        doc.text('Encouragement donné:', 20, yPosition);
        yPosition += 5;
        doc.text(entry.encouragement, 25, yPosition);
        yPosition += 10;
      }
      
      // Petit succès célébré
      if (entry.success) {
        doc.text('Petit succès célébré:', 20, yPosition);
        yPosition += 5;
        doc.text(entry.success, 25, yPosition);
        yPosition += 10;
      }
      
      yPosition += 10; // Espace entre les entrées
    });
    
    // Sauvegarder le PDF
    doc.save('journal-motivation-quotidienne.pdf');
  };

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* En-tête */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Application de Motivation Éducative
            </h1>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Outil compagnon pour l'ebook "Motiver les élèves à apprendre" - Aidez les élèves à progresser chaque jour !
          </p>
        </div>

        {/* Générateur de phrases motivantes */}
        <div className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">Phrase Motivante du Jour</h2>
          </div>
          
          <div className="text-center space-y-4">
            {motivationalPhrase && (
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-100 to-orange-100'}`}>
                <p className="text-lg font-medium text-gray-800 italic">
                  "{motivationalPhrase}"
                </p>
              </div>
            )}
            
            <button
              onClick={generateMotivationalPhrase}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transform hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Génération...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5" />
                  <span>Obtenir une phrase motivante</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Checklist quotidienne */}
        <div className={`rounded-2xl p-6 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">Checklist Quotidienne</h2>
            </div>
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exporter PDF</span>
            </button>
          </div>

          {/* Formulaire */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="inline h-4 w-4 mr-1" />
                Objectif du jour *
              </label>
              <input
                type="text"
                value={currentEntry.objective}
                onChange={(e) => setCurrentEntry({...currentEntry, objective: e.target.value})}
                placeholder="Ex: Lire 15 minutes, Finir un exercice de maths..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-">
                Effort observé *
              </label>
              <textarea
                value={currentEntry.effort}
                onChange={(e) => setCurrentEntry({...currentEntry, effort: e.target.value})}
                placeholder="Décrivez l'effort que vous avez observé chez l'élève..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="inline h-4 w-4 mr-1" />
                Encouragement donné
              </label>
              <textarea
                value={currentEntry.encouragement}
                onChange={(e) => setCurrentEntry({...currentEntry, encouragement: e.target.value})}
                placeholder="Quel encouragement avez-vous donné ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Trophy className="inline h-4 w-4 mr-1" />
                Petit succès célébré
              </label>
              <textarea
                value={currentEntry.success}
                onChange={(e) => setCurrentEntry({...currentEntry, success: e.target.value})}
                placeholder="Quel petit succès avez-vous célébré aujourd'hui ?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
              />
            </div>

            <button
              onClick={addDailyEntry}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Ajouter l'entrée du jour
            </button>
          </div>

          {/* Liste des entrées */}
          {dailyEntries.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Entrées récentes ({dailyEntries.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dailyEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">{entry.date}</span>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Objectif:</span>
                        <p className="text-sm text-gray-800">{entry.objective}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium text-gray-500">Effort:</span>
                        <p className="text-sm text-gray-800">{entry.effort}</p>
                      </div>
                      
                      {entry.encouragement && (
                        <div>
                          <span className="text-xs font-medium text-gray-500">Encouragement:</span>
                          <p className="text-sm text-gray-800">{entry.encouragement}</p>
                        </div>
                      )}
                      
                      {entry.success && (
                        <div>
                          <span className="text-xs font-medium text-gray-500">Succès:</span>
                          <p className="text-sm text-gray-800">{entry.success}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dailyEntries.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Commencez à ajouter vos premières entrées pour suivre la motivation quotidienne !
              </p>
            </div>
          )}
        </div>

        {/* Pied de page */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Application bonus pour l'ebook "Motiver les élèves à apprendre" - 
            Les données sont sauvegardées localement sur votre appareil.
          </p>
        </div>
      </div>

      {/* Modal d'erreur */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Champs requis"
        message={errorMessage}
        type="warning"
      />
    </div>
  );
};

export default EducationalApp;