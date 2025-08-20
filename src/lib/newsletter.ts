import { db } from '@/lib/db';
import { randomUUID } from 'crypto';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED' | 'BOUNCED';
  token: string;
  createdAt: Date;
  updatedAt: Date;
  unsubscribedAt?: Date;
}

export interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  status: 'DRAFT' | 'SENDING' | 'SENT' | 'FAILED';
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Créer un nouvel abonné
export async function createSubscriber(email: string, name?: string): Promise<NewsletterSubscriber> {
  const existingSubscriber = await db.newsletterSubscriber.findUnique({
    where: { email }
  });

  if (existingSubscriber) {
    if (existingSubscriber.status === 'UNSUBSCRIBED') {
      // Réactiver l'abonné
      return await db.newsletterSubscriber.update({
        where: { email },
        data: {
          status: 'ACTIVE',
          name: name || existingSubscriber.name,
          unsubscribedAt: null,
          updatedAt: new Date()
        }
      });
    }
    return existingSubscriber;
  }

  const token = randomUUID();
  const subscriber = await db.newsletterSubscriber.create({
    data: {
      email,
      name,
      token,
      status: 'ACTIVE'
    }
  });

  return subscriber;
}

// Récupérer tous les abonnés actifs
export async function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  return await db.newsletterSubscriber.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' }
  });
}

// Désabonner un utilisateur
export async function unsubscribeSubscriber(token: string): Promise<boolean> {
  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { token }
  });

  if (!subscriber || subscriber.status === 'UNSUBSCRIBED') {
    return false;
  }

  await db.newsletterSubscriber.update({
    where: { token },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date(),
      updatedAt: new Date()
    }
  });

  return true;
}

// Désabonner par email
export async function unsubscribeByEmail(email: string): Promise<boolean> {
  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { email }
  });

  if (!subscriber || subscriber.status === 'UNSUBSCRIBED') {
    return false;
  }

  await db.newsletterSubscriber.update({
    where: { email },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date(),
      updatedAt: new Date()
    }
  });

  return true;
}

// Vérifier si un email est déjà abonné
export async function isEmailSubscribed(email: string): Promise<boolean> {
  const subscriber = await db.newsletterSubscriber.findUnique({
    where: { email }
  });

  return subscriber && subscriber.status === 'ACTIVE';
}

// Créer une campagne
export async function createCampaign(subject: string, content: string): Promise<NewsletterCampaign> {
  return await db.newsletterCampaign.create({
    data: {
      subject,
      content,
      status: 'DRAFT'
    }
  });
}

// Récupérer toutes les campagnes
export async function getAllCampaigns(): Promise<NewsletterCampaign[]> {
  return await db.newsletterCampaign.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

// Mettre à jour le statut d'une campagne
export async function updateCampaignStatus(
  campaignId: string,
  status: 'DRAFT' | 'SENDING' | 'SENT' | 'FAILED'
): Promise<NewsletterCampaign> {
  const updateData: any = { status, updatedAt: new Date() };
  
  if (status === 'SENT') {
    updateData.sentAt = new Date();
  }

  return await db.newsletterCampaign.update({
    where: { id: campaignId },
    data: updateData
  });
}

// Supprimer un abonné
export async function deleteSubscriber(email: string): Promise<boolean> {
  try {
    await db.newsletterSubscriber.delete({
      where: { email }
    });
    return true;
  } catch {
    return false;
  }
}

// Obtenir les statistiques
export async function getNewsletterStats() {
  const total = await db.newsletterSubscriber.count();
  const active = await db.newsletterSubscriber.count({
    where: { status: 'ACTIVE' }
  });
  const unsubscribed = await db.newsletterSubscriber.count({
    where: { status: 'UNSUBSCRIBED' }
  });
  const bounced = await db.newsletterSubscriber.count({
    where: { status: 'BOUNCED' }
  });

  const campaigns = await db.newsletterCampaign.count();
  const sentCampaigns = await db.newsletterCampaign.count({
    where: { status: 'SENT' }
  });

  return {
    totalSubscribers: total,
    activeSubscribers: active,
    unsubscribedSubscribers: unsubscribed,
    bouncedSubscribers: bounced,
    totalCampaigns: campaigns,
    sentCampaigns: sentCampaigns
  };
}