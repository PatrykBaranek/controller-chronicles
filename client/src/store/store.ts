import { Games } from '#/types/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Store = {
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
  isFiltersOpen: boolean;
  toggleFiltersOpen: () => void;
  games: Games[];
  storeGames: (games: Games[]) => void;
};

type SpotifyStore = {
  isAuth: boolean;
  setAuth: (val: boolean) => void;
};

const useStore = create<Store>()((set) => ({
  isMenuOpen: false,
  toggleMenuOpen: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  isFiltersOpen: false,
  toggleFiltersOpen: () => set((state) => ({ isFiltersOpen: !state.isFiltersOpen })),
  games: [],
  storeGames: (games) => set({ games: [...games] }),
}));

export const useSpotifyStore = create<SpotifyStore>()(
  persist(
    (set, get) => ({
      isAuth: false,
      setAuth: (val) => set({ isAuth: val }),
    }),
    {
      partialize: (state) => ({
        isAuth: state.isAuth,
      }),
      name: 'spotifyAuth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
