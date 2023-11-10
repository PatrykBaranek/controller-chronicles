import { Games } from '#/types/types';
import { create } from 'zustand';

type Store = {
	isMenuOpen: boolean;
	toggleMenuOpen: () => void;
	isFiltersOpen: boolean;
	toggleFiltersOpen: () => void;
	games: Games[];
	storeGames: (games: Games[]) => void;
};

const useStore = create<Store>()(set => ({
	isMenuOpen: false,
	toggleMenuOpen: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
	isFiltersOpen: false,
	toggleFiltersOpen: () => set(state => ({ isFiltersOpen: !state.isFiltersOpen })),
	games: [],
	storeGames: games => set({ games: [...games] }),
}));

export default useStore;
