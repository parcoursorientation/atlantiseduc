import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email est requis' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Store the email in your database for marketing
    // 2. Send the actual PDF file
    // 3. Track the download

    // For now, we'll simulate the process
    // This would be replaced with actual PDF file serving
    console.log('Sample download requested:', { email, timestamp: new Date().toISOString() });

    // Create a simple PDF content (in real implementation, you'd serve an actual file)
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
    << /Length 200 >>
    stream
    BT
    /F1 24 Tf
    100 700 Td
    (Extrait Gratuit - Motiver les élèves à apprendre) Tj
    /F1 12 Tf
    100 650 Td
    (Technique #1: L'effet de surprise) Tj
    /F1 10 Tf
    100 620 Td
    (Comment captiver l'attention dès les premières minutes...) Tj
    ET
    endstream
    endobj
    xref
    0 6
    0000000000 65535 f 
    0000000009 00000 n 
    0000000058 00000 n 
    0000000115 00000 n 
    0000000274 00000 n 
    0000000361 00000 n 
    trailer
    << /Size 6 /Root 1 0 R >>
    startxref
    612
    %%EOF
    `;

    // Return the PDF as a downloadable file
    return new NextResponse(pdfContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="motiver-eleves-extrait.pdf"',
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