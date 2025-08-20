import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { createSubscriber, isEmailSubscribed } from '@/lib/newsletter';
import { randomUUID } from 'crypto';
import { welcomeNewsletterTemplate } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email est requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email est déjà abonné
    const alreadySubscribed = await isEmailSubscribed(email);
    if (alreadySubscribed) {
      return NextResponse.json(
        { error: 'Cet email est déjà abonné à notre newsletter' },
        { status: 400 }
      );
    }

    // Créer l'abonné dans la base de données
    const subscriber = await createSubscriber(email, name);

    // Générer un token de désabonnement
    const unsubscribeToken = subscriber.token;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const unsubscribeUrl = `${baseUrl}/api/unsubscribe?token=${unsubscribeToken}`;

    // Envoi de l'email d'inscription à l'administrateur
    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a73e8; margin-bottom: 10px;">Nouvelle inscription à la newsletter</h2>
            <p style="margin-bottom: 8px;"><strong>Nom:</strong> ${name || 'Non spécifié'}</p>
            <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p style="margin-bottom: 8px;"><strong>ID Abonné:</strong> ${subscriber.id}</p>
          </div>
          <p style="color: #5f6368; font-size: 14px; text-align: center;">
            Cet email a été généré automatiquement depuis le formulaire d'inscription à la newsletter.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
        subject: `Nouvelle inscription à la newsletter - ${name || email}`,
        html: adminEmailHtml,
        text: `Nouvelle inscription à la newsletter\n\nNom: ${name || 'Non spécifié'}\nEmail: ${email}\nDate: ${new Date().toLocaleString('fr-FR')}\nID Abonné: ${subscriber.id}\n\nCet email a été généré automatiquement depuis le formulaire d'inscription à la newsletter.`,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email d\'inscription:', emailError);
      // On continue même si l'email n'a pas pu être envoyé
    }

    // Envoi de l'email de confirmation à l'abonné avec template professionnel
    try {
      const template = welcomeNewsletterTemplate({
        name: name || undefined,
        email,
        unsubscribeUrl
      });

      await sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
    } catch (confirmationError) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', confirmationError);
      // On continue même si l'email de confirmation n'a pas pu être envoyé
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Vous recevrez bientôt nos actualités.',
      subscriberId: subscriber.id
    });

  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}

// Endpoint pour vérifier si un email est déjà abonné
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email est requis' },
        { status: 400 }
      );
    }

    const isSubscribed = await isEmailSubscribed(email);

    return NextResponse.json({
      subscribed: isSubscribed
    });

  } catch (error) {
    console.error('Subscribe check API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la vérification' },
      { status: 500 }
    );
  }
}