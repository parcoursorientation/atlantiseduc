import nodemailer from 'nodemailer';

// Interface pour les options d'email
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

// Interface pour les options SMTP
export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Configuration SMTP par défaut (iFast.net)
const defaultSMTPConfig: SMTPConfig = {
  host: process.env.SMTP_HOST || 'mail.atlantiseducation.parcours-orientation.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // false pour TLS, true pour SSL
  auth: {
    user: process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
    pass: process.env.SMTP_PASS || '',
  },
};

// Classe Mailer pour gérer l'envoi d'emails
export class Mailer {
  private transporter: nodemailer.Transporter;
  private config: SMTPConfig;

  constructor(config?: Partial<SMTPConfig>) {
    this.config = { ...defaultSMTPConfig, ...config };
    this.transporter = nodemailer.createTransport(this.config);
  }

  /**
   * Envoyer un email
   */
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      // Vérifier que les informations nécessaires sont présentes
      if (!this.config.auth.user || !this.config.auth.pass) {
        throw new Error('Configuration SMTP incomplète: utilisateur ou mot de passe manquant');
      }

      if (!options.to || !options.subject || !options.html) {
        throw new Error('Paramètres manquants: destinataire, sujet ou contenu HTML');
      }

      // En développement, si l'email de test n'est pas configuré, utiliser une adresse par défaut
      const toEmail = process.env.NODE_ENV === 'development' && options.to === 'contact@atlantiseducation.parcours-orientation.net'
        ? process.env.SMTP_ADMIN || 'test@example.com'
        : options.to;

      const mailOptions = {
        from: options.from || process.env.SMTP_FROM || `"Atlantis Education" <${this.config.auth.user}>`,
        to: toEmail,
        subject: options.subject,
        html: options.html,
        text: options.text || this.generateTextFromHtml(options.html),
      };

      const info = await this.transporter.sendMail(mailOptions);

      console.log('Email envoyé avec succès:', {
        messageId: info.messageId,
        to: toEmail,
        subject: options.subject,
      });

      return {
        success: true,
        message: `Email envoyé avec succès. Message ID: ${info.messageId}`,
      };

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      
      // Gestion des erreurs spécifiques avec messages plus clairs
      if (error.code === 'EDNS' || error.code === 'ENOTFOUND') {
        return {
          success: false,
          error: `Erreur DNS: Le serveur SMTP "${this.config.host}" est introuvable. Vérifiez le nom d'hôte et votre connexion internet.`,
        };
      } else if (error.code === 'ECONNREFUSED') {
        return {
          success: false,
          error: `Erreur de connexion: Le serveur SMTP "${this.config.host}:${this.config.port}" refuse la connexion. Vérifiez le port et le pare-feu.`,
        };
      } else if (error.code === 'EAUTH') {
        return {
          success: false,
          error: `Erreur d'authentification: Nom d'utilisateur ou mot de passe incorrect pour ${this.config.auth.user}.`,
        };
      } else if (error.code === 'ESOCKET') {
        return {
          success: false,
          error: `Erreur de socket: Problème de connexion SSL/TLS. Essayez de changer le port ou la configuration sécurisée.`,
        };
      } else {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'envoi de l\'email',
        };
      }
    }
  }

  /**
   * Tester la connexion SMTP
   */
  async testConnection(): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      await this.transporter.verify();
      return {
        success: true,
        message: 'Connexion SMTP vérifiée avec succès',
      };
    } catch (error) {
      console.error('Erreur de connexion SMTP:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion SMTP',
      };
    }
  }

  /**
   * Générer une version texte à partir du HTML
   */
  private generateTextFromHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Supprimer les balises HTML
      .replace(/&nbsp;/g, ' ') // Remplacer les espaces insécables
      .replace(/&amp;/g, '&') // Remplacer les entités HTML
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }

  /**
   * Obtenir la configuration actuelle
   */
  getConfig(): SMTPConfig {
    return { ...this.config };
  }

  /**
   * Mettre à jour la configuration
   */
  updateConfig(newConfig: Partial<SMTPConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.transporter = nodemailer.createTransport(this.config);
  }
}

// Instance singleton du mailer
let mailerInstance: Mailer | null = null;

/**
 * Obtenir l'instance du mailer (singleton)
 */
export function getMailer(): Mailer {
  if (!mailerInstance) {
    mailerInstance = new Mailer();
  }
  return mailerInstance;
}

/**
 * Créer une nouvelle instance de mailer avec une configuration personnalisée
 */
export function createMailer(config?: Partial<SMTPConfig>): Mailer {
  return new Mailer(config);
}

/**
 * Envoyer un email rapidement avec l'instance par défaut
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; message?: string; error?: string }> {
  const mailer = getMailer();
  return await mailer.sendEmail(options);
}

/**
 * Tester la connexion SMTP avec la configuration par défaut
 */
export async function testSMTPConnection(): Promise<{ success: boolean; message?: string; error?: string }> {
  const mailer = getMailer();
  return await mailer.testConnection();
}