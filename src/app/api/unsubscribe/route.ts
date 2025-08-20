import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeSubscriber, unsubscribeByEmail } from '@/lib/newsletter';
import { sendEmail } from '@/lib/mailer';
import { db } from '@/lib/db';
import { unsubscribeTemplate } from '@/lib/email-templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token ou email est requis' },
        { status: 400 }
      );
    }

    let success = false;
    let subscriberEmail = '';

    if (token) {
      // Désabonnement par token
      const subscriber = await db.newsletterSubscriber.findUnique({
        where: { token }
      });

      if (!subscriber) {
        return NextResponse.json(
          { error: 'Token invalide' },
          { status: 400 }
        );
      }

      success = await unsubscribeSubscriber(token);
      subscriberEmail = subscriber.email;
    } else if (email) {
      // Désabonnement par email
      success = await unsubscribeByEmail(email);
      subscriberEmail = email;
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Échec du désabonnement ou déjà désabonné' },
        { status: 400 }
      );
    }

    // Envoyer un email de confirmation de désabonnement avec template professionnel
    try {
      const template = unsubscribeTemplate({
        email: subscriberEmail
      });

      await sendEmail({
        to: subscriberEmail,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de désabonnement:', emailError);
      // On continue même si l'email n'a pas pu être envoyé
    }

    // Notifier l'administrateur
    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #856404; margin-bottom: 10px;">Désabonnement de la newsletter</h2>
            <p style="margin-bottom: 8px;"><strong>Email:</strong> ${subscriberEmail}</p>
            <p style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p style="margin-bottom: 8px;"><strong>Méthode:</strong> ${token ? 'Lien de désabonnement' : 'Désabonnement manuel'}</p>
          </div>
          <p style="color: #5f6368; font-size: 14px; text-align: center;">
            Cet email a été généré automatiquement suite à un désabonnement de la newsletter.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
        subject: `Désabonnement de la newsletter - ${subscriberEmail}`,
        html: adminEmailHtml,
        text: `Désabonnement de la newsletter\n\nEmail: ${subscriberEmail}\nDate: ${new Date().toLocaleString('fr-FR')}\nMéthode: ${token ? 'Lien de désabonnement' : 'Désabonnement manuel'}\n\nCet email a été généré automatiquement suite à un désabonnement de la newsletter.`,
      });
    } catch (adminEmailError) {
      console.error('Erreur lors de l\'envoi de l\'email à l\'administrateur:', adminEmailError);
      // On continue même si l'email n'a pas pu être envoyé
    }

    return NextResponse.json({
      success: true,
      message: 'Désabonnement réussi ! Vous ne recevrez plus nos emails.'
    });

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du désabonnement' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email est requis' },
        { status: 400 }
      );
    }

    const success = await unsubscribeByEmail(email);

    if (!success) {
      return NextResponse.json(
        { error: 'Échec du désabonnement ou déjà désabonné' },
        { status: 400 }
      );
    }

    // Envoyer un email de confirmation de désabonnement avec template professionnel
    try {
      const template = unsubscribeTemplate({
        email
      });

      await sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de désabonnement:', emailError);
      // On continue même si l'email n'a pas pu être envoyé
    }

    return NextResponse.json({
      success: true,
      message: 'Désabonnement réussi ! Vous ne recevrez plus nos emails.'
    });

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du désabonnement' },
      { status: 500 }
    );
  }
}