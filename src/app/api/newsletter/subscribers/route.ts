import { NextRequest, NextResponse } from 'next/server';
import { 
  getActiveSubscribers, 
  deleteSubscriber, 
  getNewsletterStats 
} from '@/lib/newsletter';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const offset = (page - 1) * limit;

    // Construire la clause where
    const where = status ? { status: status as any } : {};

    // Récupérer les abonnés avec pagination
    const [subscribers, total] = await Promise.all([
      db.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      db.newsletterSubscriber.count({ where })
    ]);

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Newsletter subscribers API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des abonnés' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email est requis' },
        { status: 400 }
      );
    }

    const success = await deleteSubscriber(email);

    if (!success) {
      return NextResponse.json(
        { error: 'Abonné non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Abonné supprimé avec succès'
    });

  } catch (error) {
    console.error('Newsletter subscriber delete API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression de l\'abonné' },
      { status: 500 }
    );
  }
}