'use client';

import React, { useState, useEffect } from 'react';
import { Download, User, CheckCircle, Star, BookOpen, Target, Users, Award, Mail, Phone, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';

const EbookLandingPage = () => {
  // Add state to track hydration
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [currentPage, setCurrentPage] = useState('home');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  
  // Form states
  const [purchaseForm, setPurchaseForm] = useState({ name: '', email: '' });
  const [downloadForm, setDownloadForm] = useState({ email: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterForm, setNewsletterForm] = useState({ email: '', name: '' });
  
  // Error states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Real Lemon Squeezy integration - only run on client after mount
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Setup Lemon Squeezy event handlers
      const handleLemonSqueezyEvent = (event: any) => {
        if (event.event === 'Checkout.Success') {
          setCurrentPage('thank-you');
          setIsCheckoutLoading(false);
        }
      };
      
      window.addEventListener('lemonsqueezyEvent', handleLemonSqueezyEvent);
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        window.removeEventListener('lemonsqueezyEvent', handleLemonSqueezyEvent);
      };
    }
  }, [isMounted]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!purchaseForm.name.trim()) newErrors.name = 'Le nom est requis';
    if (!purchaseForm.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!validateEmail(purchaseForm.email)) newErrors.email = 'Email invalide';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsCheckoutLoading(true);
    
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // In real implementation, redirect to Lemon Squeezy checkout
        // window.location.href = data.checkoutUrl;
        
        // For demo, simulate successful purchase
        setTimeout(() => {
          setIsCheckoutLoading(false);
          setShowPurchaseModal(false);
          setCurrentPage('thank-you');
        }, 2000);
      } else {
        setApiError(data.error || 'Une erreur est survenue');
        setIsCheckoutLoading(false);
      }
    } catch (error) {
      setApiError('Erreur de connexion au serveur');
      setIsCheckoutLoading(false);
    }
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!downloadForm.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!validateEmail(downloadForm.email)) newErrors.email = 'Email invalide';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsDownloadLoading(true);
    
    try {
      const response = await fetch('/api/download-sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(downloadForm)
      });
      
      if (response.ok) {
        // Create blob from response and trigger download
        const blob = await response.blob();
        if (typeof window !== 'undefined') {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'motiver-eleves-extrait.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        
        setIsDownloadLoading(false);
        setShowDownloadModal(false);
        setCurrentPage('thank-you-download');
      } else {
        const data = await response.json();
        setApiError(data.error || 'Une erreur est survenue');
        setIsDownloadLoading(false);
      }
    } catch (error) {
      setApiError('Erreur de connexion au serveur');
      setIsDownloadLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!contactForm.name.trim()) newErrors.name = 'Le nom est requis';
    if (!contactForm.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!validateEmail(contactForm.email)) newErrors.email = 'Email invalide';
    if (!contactForm.message.trim()) newErrors.message = 'Le message est requis';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsContactLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(data.message);
        setContactForm({ name: '', email: '', subject: '', message: '' });
        setIsContactLoading(false);
        setTimeout(() => {
          setShowContactModal(false);
          setSuccessMessage('');
        }, 3000);
      } else {
        setApiError(data.error || 'Une erreur est survenue');
        setIsContactLoading(false);
      }
    } catch (error) {
      setApiError('Erreur de connexion au serveur');
      setIsContactLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!newsletterForm.email.trim()) newErrors.email = 'L\'email est requis';
    else if (!validateEmail(newsletterForm.email)) newErrors.email = 'Email invalide';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsNewsletterLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage(data.message);
        setNewsletterForm({ email: '', name: '' });
        setIsNewsletterLoading(false);
        setTimeout(() => {
          setShowNewsletterModal(false);
          setSuccessMessage('');
        }, 3000);
      } else {
        setApiError(data.error || 'Une erreur est survenue');
        setIsNewsletterLoading(false);
      }
    } catch (error) {
      setApiError('Erreur de connexion au serveur');
      setIsNewsletterLoading(false);
    }
  };

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const handleDownloadSample = () => {
    setShowDownloadModal(true);
  };

  if (currentPage === 'thank-you') {
    return <ThankYouPage type="purchase" onBackToHome={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'thank-you-download') {
    return <ThankYouPage type="download" onBackToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* SEO Meta Tags would be handled by Next.js Head component in a real app */}
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Atlantis Education</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/app-educative"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                🎓 App Éducative
              </Link>
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => setShowNewsletterModal(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Newsletter
              </button>
              <button 
                onClick={handlePurchase}
                disabled={isCheckoutLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isCheckoutLoading ? 'Chargement...' : 'Acheter maintenant'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                Nouveau bestseller éducatif
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Motiver les élèves à
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500"> apprendre</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                10 techniques simples et efficaces pour réveiller la motivation
              </p>
              <p className="text-lg text-gray-500">
                Par <span className="font-semibold text-blue-600">Atlantis</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePurchase}
                disabled={isCheckoutLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
              >
                {isCheckoutLoading ? 'Traitement...' : '🚀 Acheter maintenant - 29€'}
              </button>
              <button 
                onClick={handleDownloadSample}
                className="border-2 border-orange-400 text-orange-600 px-8 py-4 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Télécharger l'extrait gratuit</span>
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>PDF instantané</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>120 pages</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Garantie 30 jours</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
              <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 text-white">
                  <div className="space-y-6">
                    <div className="text-center">
                      <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-90" />
                      <h3 className="text-2xl font-bold mb-2">Motiver les élèves à apprendre</h3>
                      <p className="text-blue-100">10 techniques simples et efficaces</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>Stratégies pratiques</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>Cas d'étude réels</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Résultats garantis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Découvrez un aperçu du contenu
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Téléchargez gratuitement les 3 premières techniques et découvrez comment transformer l'apprentissage de vos élèves dès aujourd'hui.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Extrait gratuit disponible
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Technique #1 : L'effet de surprise</h4>
                      <p className="text-gray-600">Comment captiver l'attention dès les premières minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Technique #2 : La gamification simple</h4>
                      <p className="text-gray-600">Transformer l'apprentissage en jeu sans effort</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Technique #3 : Le feedback positif</h4>
                      <p className="text-gray-600">Renforcer la confiance et l'engagement</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 mb-6">
                  <Download className="h-12 w-12 text-white mx-auto mb-4" />
                  <p className="text-white font-semibold">25 pages d'aperçu</p>
                  <p className="text-orange-100 text-sm">Format PDF haute qualité</p>
                </div>
                <button 
                  onClick={handleDownloadSample}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Télécharger l'extrait gratuit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Author Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 mx-auto lg:mx-0">
                <User className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                À propos d'<span className="text-blue-600">Atlantis</span>
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Atlantis est un expert reconnu dans le domaine de l'éducation et de la pédagogie moderne. Fort de plus de 15 ans d'expérience en classe et en formation d'enseignants, il a développé des méthodes innovantes qui ont transformé l'apprentissage de milliers d'élèves.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ses recherches sur la motivation scolaire et l'engagement des élèves ont été publiées dans plusieurs revues spécialisées. Aujourd'hui, il partage son expertise à travers ses ouvrages pratiques, conçus pour donner aux enseignants des outils concrets et efficaces.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">50k+</div>
                  <div className="text-sm text-gray-600">élèves impactés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">200+</div>
                  <div className="text-sm text-gray-600">enseignants formés</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational App CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-lg font-semibold mb-6">
              <span className="text-2xl mr-3">🎓</span>
              NOUVEAU : Application Bonus Gratuite
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Accompagnez votre ebook avec un outil pratique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez notre application éducative gratuite pour suivre la motivation quotidienne de vos élèves. 
              Parfaite pour mettre en pratique les techniques de l'ebook au quotidien !
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Checklist Quotidienne</h3>
              <p className="text-gray-600 text-center">
                Suivez les objectifs, efforts, encouragements et succès de chaque jour avec un formulaire simple et intuitif.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Phrases Motivantes</h3>
              <p className="text-gray-600 text-center">
                Générez des phrases encourageantes aléatoires pour motiver vos élèves et célébrer leurs progrès.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Export PDF</h3>
              <p className="text-gray-600 text-center">
                Exportez votre suivi hebdomadaire en PDF pour archiver les progrès ou partager avec les parents.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/app-educative"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="text-2xl">🚀</span>
              <span>Essayer l'application gratuite</span>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              100% gratuit • Aucune inscription requise • Données sauvegardées localement
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Transformez votre approche pédagogique dès aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d'enseignants qui ont déjà révolutionné leur classe grâce à ces techniques éprouvées.
          </p>
          <button 
            onClick={handlePurchase}
            disabled={isCheckoutLoading}
            className="bg-white text-blue-700 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
          >
            {isCheckoutLoading ? 'Traitement en cours...' : '🎯 Obtenir l\'ebook maintenant - 29€'}
          </button>
          <p className="text-blue-200 text-sm mt-4">
            Téléchargement instantané • Garantie satisfait ou remboursé 30 jours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Atlantis Education</span>
              </div>
              <p className="text-gray-400 mb-6">
                Révolutionner l'apprentissage, un élève à la fois.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowNewsletterModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  S'inscrire à la newsletter
                </button>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Nous contacter
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={handlePurchase}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Acheter l'ebook
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleDownloadSample}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Télécharger l'extrait
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowNewsletterModal(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Newsletter
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">contact@atlantis-education.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 Atlantis Education. Tous droits réservés.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mentions légales
                </a>
                <a href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Politique de confidentialité
                </a>
                <a href="/cgv" className="text-gray-400 hover:text-white transition-colors text-sm">
                  CGV
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Finaliser votre achat</h3>
              <p className="text-gray-600">Motiver les élèves à apprendre - 29€</p>
            </div>
            
            <form onSubmit={handlePurchaseSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={purchaseForm.name}
                  onChange={(e) => setPurchaseForm({...purchaseForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={purchaseForm.email}
                  onChange={(e) => setPurchaseForm({...purchaseForm, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{apiError}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isCheckoutLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isCheckoutLoading ? 'Traitement...' : 'Payer 29€'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Paiement sécurisé via Lemon Squeezy • Garantie 30 jours
              </p>
            </form>
          </div>
        </div>
      )}
      
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Télécharger l'extrait gratuit</h3>
              <p className="text-gray-600">25 pages d'aperçu en PDF</p>
            </div>
            
            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={downloadForm.email}
                  onChange={(e) => setDownloadForm({...downloadForm, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{apiError}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isDownloadLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isDownloadLoading ? 'Téléchargement...' : 'Télécharger gratuitement'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Vous recevrez également nos conseils pédagogiques par email
              </p>
            </form>
          </div>
        </div>
      )}
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Contactez-nous</h3>
              <p className="text-gray-600">Nous sommes là pour vous aider</p>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sujet
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sujet de votre message"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="Votre message..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{apiError}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowNewsletterModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Newsletter</h3>
              <p className="text-gray-600">Recevez nos conseils pédagogiques</p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newsletterForm.email}
                  onChange={(e) => setNewsletterForm({...newsletterForm, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                  placeholder="votre@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom (optionnel)
                </label>
                <input
                  type="text"
                  value={newsletterForm.name}
                  onChange={(e) => setNewsletterForm({...newsletterForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre prénom"
                />
              </div>
              
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">{apiError}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isNewsletterLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isNewsletterLoading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Nous respectons votre vie privée. Désabonnez-vous à tout moment.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ThankYouPage = ({ type, onBackToHome }: { type: 'purchase' | 'download'; onBackToHome: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {type === 'purchase' ? 'Merci pour votre achat !' : 'Merci pour votre téléchargement !'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            {type === 'purchase' 
              ? "Votre ebook \"Motiver les élèves à apprendre\" a été envoyé à votre adresse email. Vous devriez le recevoir dans les prochaines minutes."
              : "L'extrait gratuit de \"Motiver les élèves à apprendre\" a été téléchargé avec succès. Nous espérons qu'il vous donnera envie de découvrir l'ouvrage complet !"
            }
          </p>
          
          <div className="space-y-4">
            {type === 'purchase' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Prochaines étapes :</h3>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Vérifiez votre boîte email (et les spams)</li>
                  <li>• Téléchargez votre ebook PDF</li>
                  <li>• Commencez à appliquer les techniques dès demain !</li>
                </ul>
              </div>
            )}
            
            <button 
              onClick={onBackToHome}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold"
            >
              Retour à l'accueil
            </button>
          </div>
          
          {type === 'download' && (
            <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800 font-medium mb-3">
                Envie d'aller plus loin ?
              </p>
              <button 
                onClick={() => {
                  onBackToHome();
                  // Simulate scroll to purchase section
                  if (typeof window !== 'undefined') {
                    setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 100);
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-sm"
              >
                Obtenir l'ebook complet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookLandingPage;