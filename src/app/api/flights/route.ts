import { NextResponse } from 'next/server';
import { dataFactory } from '@/services/DataFactory';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    if (!destination || !date) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const flightService = dataFactory.getService();
        // Default origin 'GRU' for now as per V1 requirements
        const flights = await flightService.searchFlights('GRU', destination, date);
        return NextResponse.json(flights);
    } catch (error) {
        console.error("Flight Search Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
