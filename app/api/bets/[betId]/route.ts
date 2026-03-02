import { auth } from '@/config/auth';
import { BetDatasource } from '@/data/datasources/betDatasource';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ betId: string }> },
) {
  const session = await auth();

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { betId } = await params;
  const bet = await BetDatasource.findById(betId, session.user.id);

  if (!bet) {
    return Response.json({ message: 'Bet not found' }, { status: 404 });
  }

  return Response.json(bet, { status: 200 });
}
