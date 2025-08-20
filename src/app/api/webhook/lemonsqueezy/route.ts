import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { verifyWebhookSignature, parseWebhookEvent, isOrderPaid, logError } from '@/lib/lemonsqueezy';

export async function POST(request: NextRequest) {
  try {
    // Récupérer les headers
    const signature = request.headers.get('x-signature') || '';
    
    // Récupérer le corps brut pour la vérification
    const rawBody = await request.text();
    
    // Vérifier la signature du webhook
    if (!verifyWebhookSignature(rawBody, signature)) {
      logError('Webhook - Signature invalide', null, { signature, bodyLength: rawBody.length });
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      );
    }

    // Parser l'événement
    const event = parseWebhookEvent(rawBody);
    
    // Traiter l'événement de paiement réussi
    if (event.event === 'order_paid') {
      const { data } = event;
      const { attributes } = data;
      const { customer_email, customer_name, order_number } = attributes;
      
      // Vérifier que la commande est bien payée
      if (!isOrderPaid(attributes)) {
        logError('Webhook - Commande non payée', null, { order_number, customer_email });
        return NextResponse.json({
          success: false,
          message: 'Commande non payée'
        });
      }

      // Envoi de l'email de confirmation de paiement
      try {
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1a73e8; margin-bottom: 10px;">Paiement confirmé</h2>
              <p style="margin-bottom: 8px;"><strong>Nom:</strong> ${customer_name}</p>
              <p style="margin-bottom: 8px;"><strong>Email:</strong> ${customer_email}</p>
              <p style="margin-bottom: 8px;"><strong>Numéro de commande:</strong> ${order_number}</p>
              <p style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              <p style="margin-bottom: 8px;"><strong>Statut:</strong> Paiement réussi</p>
              <p style="margin-bottom: 8px;"><strong>Montant:</strong> ${attributes.total} ${attributes.currency}</p>
            </div>
            <p style="color: #5f6368; font-size: 14px; text-align: center;">
              Cet email a été généré automatiquement lors de la confirmation de paiement.
            </p>
          </div>
        `;

        await sendEmail({
          to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
          subject: `Paiement confirmé - ${customer_name}`,
          html: adminEmailHtml,
          text: `Paiement confirmé\n\nNom: ${customer_name}\nEmail: ${customer_email}\nNuméro de commande: ${order_number}\nDate: ${new Date().toLocaleString('fr-FR')}\nStatut: Paiement réussi\nMontant: ${attributes.total} ${attributes.currency}\n\nCet email a été généré automatiquement lors de la confirmation de paiement.`,
        });
      } catch (emailError) {
        logError('Webhook - Email admin', emailError, { order_number, customer_email });
        // On continue même si l'email n'a pas pu être envoyé
      }

      // Envoi de l'email de livraison au client
      try {
        const clientEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1a73e8; margin-bottom: 10px;">Votre ebook est prêt</h2>
              <p style="margin-bottom: 8px;">Bonjour ${customer_name},</p>
              <p style="margin-bottom: 8px;">Merci pour votre paiement !</p>
              <p style="margin-bottom: 8px;">Votre ebook "Motiver les élèves à apprendre" est prêt à être téléchargé.</p>
              <p style="margin-bottom: 8px;">Pour le télécharger, veuillez vous rendre sur la page de remerciement :</p>
              <p style="margin-bottom: 8px;"><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merci?email=${encodeURIComponent(customer_email)}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">Télécharger mon ebook</a></p>
              <p style="margin-bottom: 8px;">Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 15px;">
                <h3 style="color: #1976d2; margin-bottom: 8px;">Détails de votre commande :</h3>
                <p style="margin-bottom: 4px;"><strong>Numéro de commande :</strong> ${order_number}</p>
                <p style="margin-bottom: 4px;"><strong>Montant payé :</strong> ${attributes.total} ${attributes.currency}</p>
                <p style="margin-bottom: 4px;"><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
            </div>
            <p style="color: #5f6368; font-size: 14px; text-align: center;">
              © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés<br>
              Contact : ${process.env.SMTP_FROM || process.env.SMTP_USER}
            </p>
          </div>
        `;

        await sendEmail({
          to: customer_email,
          subject: 'Votre ebook est prêt - Atlantis Education',
          html: clientEmailHtml,
          text: `Votre ebook est prêt\n\nBonjour ${customer_name},\n\nMerci pour votre paiement !\n\nVotre ebook "Motiver les élèves à apprendre" est prêt à être téléchargé.\n\nPour le télécharger, veuillez vous rendre sur la page de remerciement :\n${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/merci?email=${encodeURIComponent(customer_email)}\n\nSi vous avez des questions, n'hésitez pas à nous contacter.\n\nDétails de votre commande :\nNuméro de commande : ${order_number}\nMontant payé : ${attributes.total} ${attributes.currency}\nDate : ${new Date().toLocaleString('fr-FR')}\n\n© ${new Date().getFullYear()} Atlantis Education - Tous droits réservés\nContact : ${process.env.SMTP_FROM || process.env.SMTP_USER}`,
        });
      } catch (deliveryError) {
        logError('Webhook - Email client', deliveryError, { order_number, customer_email });
        // On continue même si l'email de livraison n'a pas pu être envoyé
      }

      // Log de la commande réussie
      console.log('Commande payée:', { 
        customer_name, 
        customer_email, 
        order_number, 
        amount: attributes.total,
        currency: attributes.currency,
        timestamp: new Date().toISOString() 
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook traité avec succès'
    });

  } catch (error) {
    logError('Webhook - Global', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement du webhook' },
      { status: 500 }
    );
  }
}