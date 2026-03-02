import { Bet, BetStatus, Pick } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export interface NewBetOptions {
  matchId: string;
  pick: Pick;
  odd: number;
  stake: number;
}

export class BetDatasource {
  static async create(data: NewBetOptions, userId: string): Promise<Bet> {
    const statuses = Object.values(BetStatus);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const calcReturn = (
      odd: number,
      stake: number,
    ): Record<BetStatus, number | null> => ({
      LOST: 0,
      PENDING: null,
      WON: Number(((odd * 1000 * (stake * 1000)) / 1000 ** 2).toFixed(2)),
    });

    return await prisma.bet.create({
      data: {
        matchId: data.matchId,
        pick: data.pick,
        odd: data.odd,
        stake: data.stake,
        user: { connect: { id: userId } },
        status: randomStatus,
        return: calcReturn(data.odd, data.stake)[randomStatus],
      },
    });
  }

  static async findAllByUserId(id: string): Promise<Bet[]> {
    return await prisma.bet.findMany({ where: { userId: id } });
  }

  static async findById(id: string): Promise<Bet | null> {
    return await prisma.bet.findUnique({ where: { id } });
  }
}
