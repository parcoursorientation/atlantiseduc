// Templates d'email professionnels pour Atlantis Education

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface TemplateData {
  name?: string;
  email: string;
  unsubscribeUrl?: string;
  [key: string]: any;
}

// Template de bienvenue pour la newsletter
export const welcomeNewsletterTemplate = (data: TemplateData): EmailTemplate => ({
  subject: 'Bienvenue dans la communauté Atlantis Education !',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
          Bienvenue ${data.name || 'cher abonné'} ! 🎉
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Nous sommes ravis de vous compter parmi nos abonnés
        </p>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">
            Ce qui vous attend chez Atlantis Education :
          </h2>
          <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
            <li style="margin-bottom: 8px;">📚 <strong>Conseils pédagogiques</strong> hebdomadaires pour motiver vos élèves</li>
            <li style="margin-bottom: 8px;">🎯 <strong>Techniques innovantes</strong> basées sur la psychologie de l'apprentissage</li>
            <li style="margin-bottom: 8px;">📈 <strong>Actualités</strong> sur les nouvelles méthodes éducatives</li>
            <li style="margin-bottom: 8px;">💡 <strong>Ressources exclusives</strong> et offres spéciales</li>
          </ul>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
          <h3 style="color: #155724; margin: 0 0 10px 0; font-size: 18px;">
            🎁 Votre cadeau de bienvenue
          </h3>
          <p style="color: #155724; margin: 0; line-height: 1.5;">
            En tant que nouvel abonné, recevez gratuitement notre guide 
            <strong>"5 techniques pour motiver les élèves récalcitrants"</strong> 
            dans notre prochain email !
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://atlantis-education.com" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Découvrir nos ressources
          </a>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
          Nous sommes impatients de partager avec vous notre passion pour l'éducation et 
          de vous aider à transformer l'expérience d'apprentissage de vos élèves.
        </p>

        <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
          À très bientôt dans votre boîte de réception !<br>
          <strong>L'équipe Atlantis Education</strong>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="color: #888; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés<br>
          ${data.unsubscribeUrl ? `<a href="${data.unsubscribeUrl}" style="color: #667eea; text-decoration: none;">Se désabonner</a>` : 'Contactez-nous pour vous désabonner'}
        </p>
      </div>
    </div>
  `,
  text: `Bienvenue ${data.name || 'cher abonné'} ! 🎉

Nous sommes ravis de vous compter parmi nos abonnés.

Ce qui vous attend chez Atlantis Education :
📚 Conseils pédagogiques hebdomadaires pour motiver vos élèves
🎯 Techniques innovantes basées sur la psychologie de l'apprentissage
📈 Actualités sur les nouvelles méthodes éducatives
💡 Ressources exclusives et offres spéciales

🎁 Votre cadeau de bienvenue :
En tant que nouvel abonné, recevez gratuitement notre guide "5 techniques pour motiver les élèves récalcitrants" dans notre prochain email !

Nous sommes impatients de partager avec vous notre passion pour l'éducation et de vous aider à transformer l'expérience d'apprentissage de vos élèves.

À très bientôt dans votre boîte de réception !
L'équipe Atlantis Education

© ${new Date().getFullYear()} Atlantis Education - Tous droits réservés
${data.unsubscribeUrl || 'Contactez-nous pour vous désabonner'}`
});

// Template de confirmation de désabonnement
export const unsubscribeTemplate = (data: TemplateData): EmailTemplate => ({
  subject: 'Désabonnement confirmé - Atlantis Education',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
          Au revoir ${data.name || ''} 😢
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Votre désabonnement a bien été pris en compte
        </p>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #ffc107;">
          <h2 style="color: #856404; margin: 0 0 15px 0; font-size: 20px;">
            Qu'est-ce qui vous a fait partir ?
          </h2>
          <p style="color: #856404; margin: 0; line-height: 1.5;">
            Nous sommes toujours en train d'améliorer notre contenu et nous aimerions 
            comprendre pourquoi vous vous désabonnez. Votre feedback nous aide à nous améliorer !
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">
            🔄 Vous pouvez revenir à tout moment
          </h3>
          <p style="color: #555; margin: 0; line-height: 1.5;">
            Si vous changez d'avis, vous pourrez vous réinscrire à tout moment sur notre site web. 
            Nous serons ravis de vous retrouver parmi nos abonnés !
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://atlantis-education.com" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Revenir sur le site
          </a>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
          Merci pour le temps que vous avez passé avec nous. Nous espérons avoir l'occasion 
          de vous revoir bientôt !<br>
          <strong>L'équipe Atlantis Education</strong>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="color: #888; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés<br>
          Pour vous réinscrire, visitez notre site web
        </p>
      </div>
    </div>
  `,
  text: `Au revoir ${data.name || ''} 😢

Votre désabonnement a bien été pris en compte.

Qu'est-ce qui vous a fait partir ?
Nous sommes toujours en train d'améliorer notre contenu et nous aimerions comprendre pourquoi vous vous désabonnez. Votre feedback nous aide à nous améliorer !

🔄 Vous pouvez revenir à tout moment
Si vous changez d'avis, vous pourrez vous réinscrire à tout moment sur notre site web. Nous serons ravis de vous retrouver parmi nos abonnés !

Merci pour le temps que vous avez passé avec nous. Nous espérons avoir l'occasion de vous revoir bientôt !
L'équipe Atlantis Education

© ${new Date().getFullYear()} Atlantis Education - Tous droits réservés
Pour vous réinscrire, visitez notre site web`
});

// Template de campagne newsletter
export const campaignTemplate = (subject: string, content: string, data: TemplateData): EmailTemplate => ({
  subject,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">
          ${subject}
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Atlantis Education
        </p>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <div style="margin-bottom: 25px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Bonjour ${data.name || 'cher abonné'},
          </p>
          <div style="color: #555; line-height: 1.6;">
            ${content}
          </div>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
          <h3 style="color: #155724; margin: 0 0 10px 0; font-size: 18px;">
            💡 Un conseil pour vous
          </h3>
          <p style="color: #155724; margin: 0; line-height: 1.5;">
            La motivation des élèves passe par la reconnaissance de leurs efforts, 
            même les plus petits. Célébrez chaque progrès pour créer un cercle vertueux !
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://atlantis-education.com" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            Découvrir nos ressources
          </a>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
          Continuez à inspirer et à motiver vos élèves chaque jour !<br>
          <strong>L'équipe Atlantis Education</strong>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
        <p style="color: #888; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Atlantis Education - Tous droits réservés<br>
          ${data.unsubscribeUrl ? `<a href="${data.unsubscribeUrl}" style="color: #667eea; text-decoration: none;">Se désabonner</a>` : 'Contactez-nous pour vous désabonner'}
        </p>
      </div>
    </div>
  `,
  text: `${subject}

Atlantis Education

Bonjour ${data.name || 'cher abonné'},

${content}

💡 Un conseil pour vous
La motivation des élèves passe par la reconnaissance de leurs efforts, même les plus petits. Célébrez chaque progrès pour créer un cercle vertueux !

Continuez à inspirer et à motiver vos élèves chaque jour !
L'équipe Atlantis Education

© ${new Date().getFullYear()} Atlantis Education - Tous droits réservés
${data.unsubscribeUrl || 'Contactez-nous pour vous désabonner'}`
});

// Template de notification d'administration
export const adminNotificationTemplate = (type: string, data: TemplateData): EmailTemplate => ({
  subject: `Notification ${type} - Atlantis Education`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #007bff;">
        <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">
          Notification ${type}
        </h2>
        <div style="color: #555; line-height: 1.6;">
          ${Object.entries(data).map(([key, value]) => 
            `<p style="margin: 5px 0;"><strong>${key}:</strong> ${value}</p>`
          ).join('')}
        </div>
      </div>
      <p style="color: #888; font-size: 12px; text-align: center;">
        Cet email a été généré automatiquement par le système Atlantis Education.
      </p>
    </div>
  `,
  text: `Notification ${type}

${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}

Cet email a été généré automatiquement par le système Atlantis Education.`
});