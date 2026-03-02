'use server';

import { auth } from '@/config/auth';
import { BetDatasource, NewBetOptions } from '@/data/datasources/betDatasource';

export const placeOrder = async (bets: NewBetOptions[]) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: 'Sesión expirada, por favor vuelva a iniciar sesión.',
    };
  }

  try {
    const results = await Promise.all(
      bets.map((bet) => BetDatasource.create(bet, userId)),
    );

    return {
      success: true,
      message: 'Compra completada',
      data: results,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: 'Ocurrió un error al procesar tu compra. Inténtalo nuevamente.',
    };
  }
};
