import { DemoData } from '@/data/demo';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ betId: string }> },
) {
  const { betId } = await params;
  const bet = DemoData.betsMe.bets.find((b) => b.id === betId);

  if (!bet) {
    return Response.json({ message: 'Bet not found' }, { status: 404 });
  }

  return Response.json(bet, { status: 200 });
}
