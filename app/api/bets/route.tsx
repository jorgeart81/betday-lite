import { auth } from '@/config/auth';
import { BetDatasource } from '@/data/datasources/betDatasource';

export async function GET() {
  const session = await auth();
  console.log({ session });
  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return Response.json(BetDatasource.findAllByUserId(session.user.id), {
    status: 200,
  });
}
