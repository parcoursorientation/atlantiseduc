import axios from 'axios';
import { createHmac } from 'crypto';

// Configuration de Lemon Squeezy
const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const LEMON_SQUEEZY_WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
const LEMON_SQUEEZY_API_BASE = 'https://api.lemonsqueezy.com/v1';

// Configuration de l'API
const api = axios.create({
  baseURL: LEMON_SQUEEZY_API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`,
  },
});

export interface LemonSqueezyCustomer {
  name: string;
  email: string;
}

export interface LemonSqueezyCheckout {
  variant_id: string;
  email: string;
  name: string;
  success_url: string;
  cancel_url: string;
  webhook_url: string;
}

export interface LemonSqueezyOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  order_number: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
}

export interface LemonSqueezyWebhookEvent {
  event: string;
  data: {
    type: string;
    id: string;
    attributes: LemonSqueezyOrder;
  };
}

// Fonction pour créer un checkout
export async function createCheckout(checkout: LemonSqueezyCheckout): Promise<string> {
  try {
    const response = await api.post('/checkouts', {
      data: {
        type: 'checkout',
        attributes: checkout,
      },
    });
    
    return response.data.data.attributes.url;
  } catch (error) {
    console.error('Erreur lors de la création du checkout:', error);
    throw new Error('Impossible de créer le checkout Lemon Squeezy');
  }
}

// Fonction pour vérifier la signature du webhook
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!LEMON_SQUEEZY_WEBHOOK_SECRET) {
    console.error('LEMON_SQUEEZY_WEBHOOK_SECRET non configuré');
    return false;
  }

  const hmac = createHmac('sha256', LEMON_SQUEEZY_WEBHOOK_SECRET);
  hmac.update(payload);
  const digest = hmac.digest('hex');
  
  return signature === digest;
}

// Fonction pour parser l'événement du webhook
export function parseWebhookEvent(payload: string): LemonSqueezyWebhookEvent {
  try {
    return JSON.parse(payload);
  } catch (error) {
    console.error('Erreur lors du parsing du webhook:', error);
    throw new Error('Impossible de parser l\'événement du webhook');
  }
}

// Fonction pour récupérer les informations d'une commande
export async function getOrder(orderId: string): Promise<LemonSqueezyOrder> {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data.attributes;
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    throw new Error('Impossible de récupérer la commande');
  }
}

// Fonction pour vérifier si une commande est payée
export function isOrderPaid(order: LemonSqueezyOrder): boolean {
  return order.status === 'paid';
}

// Fonction pour formater le montant en euros
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Fonction pour générer un ID de commande unique
export function generateOrderId(): string {
  return `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Fonction pour valider l'email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour nettoyer les données du client
export function sanitizeCustomerData(customer: LemonSqueezyCustomer): LemonSqueezyCustomer {
  return {
    name: customer.name.trim().replace(/[<>]/g, ''),
    email: customer.email.trim().toLowerCase(),
  };
}

// Fonction pour logger les erreurs de manière structurée
export function logError(context: string, error: any, additionalData?: any): void {
  console.error(`[${context}] Erreur:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
}

// Fonction pour créer un lien de checkout avec les paramètres par défaut
export function createDefaultCheckout(
  customer: LemonSqueezyCustomer,
  variantId: string,
  baseUrl: string
): LemonSqueezyCheckout {
  const sanitizedCustomer = sanitizeCustomerData(customer);
  
  return {
    variant_id: variantId,
    email: sanitizedCustomer.email,
    name: sanitizedCustomer.name,
    success_url: `${baseUrl}/merci?email=${encodeURIComponent(sanitizedCustomer.email)}`,
    cancel_url: `${baseUrl}/`,
    webhook_url: `${baseUrl}/api/webhook/lemonsqueezy`,
  };
}