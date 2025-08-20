import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont requis' },
        { status: 400 }
      );
    }

    // Préparation de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: #2c3e50; margin: 0; font-size: 24px;">Nouveau Message de Contact</h2>
          <p style="color: #7f8c8d; margin: 10px 0 0 0; font-size: 14px;">Depuis le site Atlantis Education</p>
        </div>
        <div style="padding: 20px;">
          <p style="margin: 0 0 15px 0; font-size: 16px; color: #2c3e50;">
            <strong>Nom :</strong> ${name}
          </p>
          <p style="margin: 0 0 15px 0; font-size: 16px; color: #2c3e50;">
            <strong>Email :</strong> ${email}
          </p>
          <p style="margin: 0 0 15px 0; font-size: 16px; color: #2c3e50;">
            <strong>Sujet :</strong> ${subject || 'Non spécifié'}
          </p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 0 0 15px 0;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: #2c3e50;">
              <strong>Message :</strong>
            </p>
            <p style="margin: 0; font-size: 14px; color: #34495e; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          <p style="margin: 20px 0 0 0; font-size: 14px; color: #7f8c8d;">
            Ce message a été envoyé depuis le formulaire de contact du site Atlantis Education.
          </p>
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
            © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés
          </p>
        </div>
      </div>
    `;

    // Envoyer l'email
    const emailResult = await sendEmail({
      to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
      subject: subject || `Nouveau message de contact de ${name}`,
      html: emailHtml,
      from: `"Contact Atlantis" <${process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net'}>`,
    });

    if (!emailResult.success) {
      console.error('Email sending error:', emailResult.error);
      return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' },
        { status: 500 }
      );
    }

    // Journaliser la soumission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}