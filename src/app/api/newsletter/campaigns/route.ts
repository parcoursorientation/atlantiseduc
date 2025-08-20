import { NextRequest, NextResponse } from 'next/server';
import { 
  createCampaign, 
  getAllCampaigns, 
  updateCampaignStatus,
  getActiveSubscribers 
} from '@/lib/newsletter';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';

export async function GET(request: NextRequest) {
  try {
    const campaigns = await getAllCampaigns();

    return NextResponse.json({ campaigns });

  } catch (error) {
    console.error('Newsletter campaigns API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des campagnes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, content, action } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Sujet et contenu sont requis' },
        { status: 400 }
      );
    }

    if (action === 'send') {
      // Créer et envoyer la campagne immédiatement
      const campaign = await createCampaign(subject, content);
      
      // Mettre à jour le statut à SENDING
      await updateCampaignStatus(campaign.id, 'SENDING');

      // Récupérer les abonnés actifs
      const subscribers = await getActiveSubscribers();

      // Envoyer les emails
      let successCount = 0;
      let failureCount = 0;

      for (const subscriber of subscribers) {
        try {
          const personalizedContent = content.replace('{{name}}', subscriber.name || 'cher abonné');
          const textContent = content.replace(/<[^>]*>/g, '').replace('{{name}}', subscriber.name || 'cher abonné');

          await sendEmail({
            to: subscriber.email,
            subject: subject,
            html: personalizedContent,
            text: textContent
          });
          successCount++;
        } catch (emailError) {
          console.error(`Erreur d'envoi à ${subscriber.email}:`, emailError);
          failureCount++;
        }
      }

      // Mettre à jour le statut final
      await updateCampaignStatus(campaign.id, failureCount === 0 ? 'SENT' : 'FAILED');

      return NextResponse.json({
        success: true,
        campaign,
        stats: {
          sent: successCount,
          failed: failureCount,
          total: subscribers.length
        }
      });
    } else {
      // Créer une campagne brouillon
      const campaign = await createCampaign(subject, content);

      return NextResponse.json({
        success: true,
        campaign
      });
    }

  } catch (error) {
    console.error('Newsletter campaign create API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de la campagne' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { campaignId, status } = await request.json();

    if (!campaignId || !status) {
      return NextResponse.json(
        { error: 'ID de campagne et statut sont requis' },
        { status: 400 }
      );
    }

    const campaign = await updateCampaignStatus(campaignId, status);

    return NextResponse.json({
      success: true,
      campaign
    });

  } catch (error) {
    console.error('Newsletter campaign update API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour de la campagne' },
      { status: 500 }
    );
  }
}