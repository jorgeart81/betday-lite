import { Bet, BetStatus, Pick } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

interface Create {
  matchId: string;
  pick: Pick;
  odd: number;
  stake: number;
  userId: string;
}

export class BetDatasource {
  static async create(data: Create): Promise<Bet> {
    const statuses = Object.values(BetStatus);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const calcReturn = (
      odd: number,
      stake: number,
    ): Record<BetStatus, number | null> => ({
      LOST: 0,
      PENDING: null,
      WON: (odd * 1000 * (stake * 1000)) / 1000 ** 2,
    });

    return await prisma.bet.create({
      data: {
        matchId: data.matchId,
        pick: data.pick,
        odd: data.odd,
        stake: data.stake,
        user: { connect: { id: data.userId } },
        status: randomStatus,
        return: calcReturn(data.odd, data.stake)[randomStatus],
      },
    });
  }

  static async findById(id: string): Promise<Bet | null> {
    return await prisma.bet.findUnique({ where: { id } });
  }
}
