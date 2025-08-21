import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { 
  createCheckout, 
  createDefaultCheckout, 
  validateEmail, 
  sanitizeCustomerData, 
  logError 
} from '@/lib/lemonsqueezy';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email et nom sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Sanitization des données
    const sanitizedCustomer = sanitizeCustomerData({ name, email });

    // Création du checkout Lemon Squeezy
    let checkoutUrl;
    try {
      const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
      const checkout = createDefaultCheckout(sanitizedCustomer, variantId, baseUrl);
      checkoutUrl = await createCheckout(checkout);
    } catch (error) {
      logError('Purchase API - Lemon Squeezy', error, { customer: sanitizedCustomer });
      
      // Utiliser une URL de démo pour le développement
      checkoutUrl = `https://atlantis-education.lemonsqueezy.com/checkout/buy/your-product-id?email=${encodeURIComponent(sanitizedCustomer.email)}&name=${encodeURIComponent(sanitizedCustomer.name)}`;
    }

    // Envoi de l'email de commande
    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a73e8; margin-bottom: 10px;">Nouvelle commande</h2>
            <p style="margin-bottom: 8px;"><strong>Nom:</strong> ${sanitizedCustomer.name}</p>
            <p style="margin-bottom: 8px;"><strong>Email:</strong> ${sanitizedCustomer.email}</p>
            <p style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p style="margin-bottom: 8px;"><strong>Statut:</strong> En attente de paiement</p>
            <p style="margin-bottom: 8px;"><strong>Lien de paiement:</strong> <a href="${checkoutUrl}" style="color: #1a73e8;">Payer maintenant</a></p>
          </div>
          <p style="color: #5f6368; font-size: 14px; text-align: center;">
            Cet email a été généré automatiquement depuis le formulaire de commande.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
        subject: `Nouvelle commande - ${sanitizedCustomer.name}`,
        html: adminEmailHtml,
        text: `Nouvelle commande\n\nNom: ${sanitizedCustomer.name}\nEmail: ${sanitizedCustomer.email}\nDate: ${new Date().toLocaleString('fr-FR')}\nStatut: En attente de paiement\nLien de paiement: ${checkoutUrl}\n\nCet email a été généré automatiquement depuis le formulaire de commande.`,
      });
    } catch (emailError) {
      logError('Purchase API - Email admin', emailError, { customer: sanitizedCustomer });
      // On continue même si l'email n'a pas pu être envoyé
    }

    // Envoi de l'email de confirmation au client
    try {
      const clientEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a73e8; margin-bottom: 10px;">Confirmation de votre commande</h2>
            <p style="margin-bottom: 8px;">Bonjour ${sanitizedCustomer.name},</p>
            <p style="margin-bottom: 8px;">Merci pour votre achat !</p>
            <p style="margin-bottom: 8px;">Vous avez commandé l'ebook "Motiver les élèves à apprendre" pour 7€.</p>
            <p style="margin-bottom: 8px;">Pour finaliser votre commande, veuillez cliquer sur le lien ci-dessous :</p>
            <p style="margin-bottom: 8px;"><a href="${checkoutUrl}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">Finaliser ma commande</a></p>
            <p style="margin-bottom: 8px;">Une fois le paiement effectué, vous recevrez un email avec le lien de téléchargement de l'ebook.</p>
            <p style="margin-bottom: 8px;">Si vous avez des questions, n'hésitez pas à nous contacter.</p>
          </div>
          <p style="color: #5f6368; font-size: 14px; text-align: center;">
            © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés<br>
            Contact : ${process.env.SMTP_FROM || process.env.SMTP_USER}
          </p>
        </div>
      `;

      await sendEmail({
        to: sanitizedCustomer.email,
        subject: 'Confirmation de votre commande - Atlantis Education',
        html: clientEmailHtml,
        text: `Confirmation de votre commande\n\nBonjour ${sanitizedCustomer.name},\n\nMerci pour votre achat !\n\nVous avez commandé l'ebook "Motiver les élèves à apprendre" pour 29€.\n\nPour finaliser votre commande, veuillez cliquer sur le lien ci-dessous :\n${checkoutUrl}\n\nUne fois le paiement effectué, vous recevrez un email avec le lien de téléchargement de l'ebook.\n\nSi vous avez des questions, n'hésitez pas à nous contacter.\n\n© ${new Date().getFullYear()} Atlantis Education - Tous droits réservés\nContact : ${process.env.SMTP_FROM || process.env.SMTP_USER}`,
      });
    } catch (confirmationError) {
      logError('Purchase API - Email client', confirmationError, { customer: sanitizedCustomer });
      // On continue même si l'email de confirmation n'a pas pu être envoyé
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      message: 'Redirection vers le paiement...'
    });

  } catch (error) {
    logError('Purchase API - Global', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'initialisation du paiement' },
      { status: 500 }
    );
  }
}
