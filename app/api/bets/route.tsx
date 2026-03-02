import { auth } from '@/config/auth';
import { BetDatasource } from '@/data/datasources/betDatasource';

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const bets = await BetDatasource.findAllByUserId(session.user.id);

  return Response.json(bets, {
    status: 200,
  });
}
