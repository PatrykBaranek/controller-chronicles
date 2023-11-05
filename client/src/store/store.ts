import { Games } from '#/types/types';
import { create } from 'zustand';

type Store = {
	isMenuOpen: boolean;
	toggleMenuOpen: () => void;
	isFiltersOpen: boolean;
	toggleFiltersOpen: () => void;
	isSeachbarVisible: boolean;
	changeSearchbarVisible: (isVisible: boolean) => void;
	games: Games[];
	storeGames: (games: Games[]) => void;
};

const useStore = create<Store>()(set => ({
	isMenuOpen: false,
	toggleMenuOpen: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
	isFiltersOpen: false,
	toggleFiltersOpen: () => set(state => ({ isFiltersOpen: !state.isFiltersOpen })),
	isSeachbarVisible: true,
	changeSearchbarVisible: isVisible => set(() => ({ isSeachbarVisible: isVisible })),
	games: [],
	storeGames: games => set({ games: [...games] }),
}));

export default useStore;
