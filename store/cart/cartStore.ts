import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Pick } from '@/app/api/_types/betsResponse';
import { Match } from '@/app/api/_types/matchesResponse';

interface CartMatch {
  match: Match;
  pick: Pick;
  stake: number | null;
  result?: number;
}
interface State {
  cartMatches: CartMatch[];
}

interface Actions {
  addMatch: (cartMatch: CartMatch) => void;
  removeMatch: (matchId: string) => void;
  changeStake: (matchId: string, stake: number | null) => void;
  reset: () => void;
}

const storeApi: StateCreator<State & Actions, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  cartMatches: [],

  // Actions
  addMatch: (cartMatch: CartMatch) => {
    const matchExists = get().cartMatches.some(
      (m) => m.match.id === cartMatch.match.id,
    );
    if (matchExists) return;
    set((prev) => ({
      cartMatches: [...prev.cartMatches, { ...cartMatch }],
    }));
  },
  removeMatch: (matchId: string) => {
    set((prev) => ({
      cartMatches: [...prev.cartMatches].filter((m) => m.match.id !== matchId),
    }));
  },
  changeStake: (matchId: string, stake: number | null) => {
    set((prev) => ({
      cartMatches: [...prev.cartMatches].map((m) => {
        if (m.match.id === matchId) {
          const odd =
            m.match.market.odds[
              m.pick.toLowerCase() as keyof typeof m.match.market.odds
            ];
          const result = stake ? (odd * 1000 * (stake * 1000)) / 1000 ** 2 : 0;
          return {
            ...m,
            stake,
            result: Number(result.toFixed(2)),
          };
        }
        return m;
      }),
    }));
  },
  reset: () => {
    set({ cartMatches: [] });
  },
});

export const useCartStore = create<State & Actions>()(
  persist(devtools(storeApi), { name: 'cart' }),
);
