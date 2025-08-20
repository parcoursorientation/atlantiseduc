import { NextRequest, NextResponse } from 'next/server';
import { getNewsletterStats } from '@/lib/newsletter';

export async function GET(request: NextRequest) {
  try {
    const stats = await getNewsletterStats();

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Newsletter stats API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}