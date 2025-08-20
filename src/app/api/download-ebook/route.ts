import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

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

    // Création du PDF (simulé pour l'exemple)
    const pdfContent = `
      %PDF-1.4
      1 0 obj
      << /Type /Catalog /Pages 2 0 R >>
      endobj
      2 0 obj
      << /Type /Pages /Kids [3 0 R] /Count 1 >>
      endobj
      3 0 obj
      << /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
      endobj
      4 0 obj
      << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
      endobj
      5 0 obj
      << /Length 44 >>
      stream
      BT
      /F1 12 Tf
      100 700 Td
      (Motiver les élèves à apprendre) Tj
      0 -20 Td
      (Par Atlantis) Tj
      0 -40 Td
      (Merci pour votre achat !) Tj
      ET
      endstream
      endobj
      xref
      0 6
      0000000000 65535 f 
      0000000009 00000 n 
      0000000058 00000 n 
      0000000113 00000 n 
      0000000219 00000 n 
      0000000334 00000 n 
      trailer
      << /Size 6 /Root 1 0 R >>
      startxref
      438
      %%EOF
    `;

    // Envoi de l'email de notification
    try {
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a73e8; margin-bottom: 10px;">Téléchargement de l'ebook</h2>
            <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 8px;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p style="margin-bottom: 8px;"><strong>Action:</strong> Téléchargement de l'ebook "Motiver les élèves à apprendre"</p>
          </div>
          <p style="color: #5f6368; font-size: 14px; text-align: center;">
            Cet email a été généré automatiquement lors du téléchargement de l'ebook.
          </p>
        </div>
      `;

      await sendEmail({
        to: process.env.SMTP_ADMIN || process.env.SMTP_USER || 'contact@atlantiseducation.parcours-orientation.net',
        subject: `Téléchargement de l'ebook - ${email}`,
        html: adminEmailHtml,
        text: `Téléchargement de l'ebook\n\nEmail: ${email}\nDate: ${new Date().toLocaleString('fr-FR')}\nAction: Téléchargement de l'ebook "Motiver les élèves à apprendre"\n\nCet email a été généré automatiquement lors du téléchargement de l'ebook.`,
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de notification:', emailError);
      // On continue même si l'email n'a pas pu être envoyé
    }

    // Envoi du PDF
    const pdfBuffer = Buffer.from(pdfContent, 'binary');
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="motiver-eleves-apprendre.pdf"',
      },
    });

  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du téléchargement' },
      { status: 500 }
    );
  }
}