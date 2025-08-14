import { NextRequest, NextResponse } from 'next/server';
import { getPastEventsPage } from '@/data/events-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid page or limit parameters' },
        { status: 400 }
      );
    }

    const events = await getPastEventsPage(page, limit);

    return NextResponse.json({
      events,
      page,
      limit,
      hasMore: events.length === limit
    });
  } catch (error) {
    console.error('Error fetching past events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch past events' },
      { status: 500 }
    );
  }
}