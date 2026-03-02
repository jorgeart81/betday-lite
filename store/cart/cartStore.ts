import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Pick } from '@/app/api/_types/betsResponse';
import { Match } from '@/app/api/_types/matchesResponse';

interface CartMatch {
  match: Match;
  pick: Pick;
}
interface State {
  matches: CartMatch[];
}

interface Actions {
  addMatch: (cartMatch: CartMatch) => void;
  removeMatch: (matchId: string) => void;
}

const storeApi: StateCreator<State & Actions, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  matches: [],

  // Actions
  addMatch: (cartMatch: CartMatch) => {
    const matchExists = get().matches.some(
      (m) => m.match.id === cartMatch.match.id,
    );
    if (matchExists) return;
    set((prev) => ({ matches: [...prev.matches, cartMatch] }));
  },
  removeMatch: (matchId: string) => {
    set((prev) => ({
      matches: [...prev.matches].filter((m) => m.match.id !== matchId),
    }));
  },
});

export const useCartStore = create<State & Actions>()(
  persist(devtools(storeApi), { name: 'cart' }),
);
