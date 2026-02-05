import { NextResponse } from 'next/server';
import { dataFactory } from '@/services/DataFactory';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const nights = parseInt(searchParams.get('nights') || '1');

    if (!destination) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const hotelService = dataFactory.getService();
        const hotels = await hotelService.searchHotels(destination, nights);
        return NextResponse.json(hotels);
    } catch (error) {
        console.error("Hotel Search Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
