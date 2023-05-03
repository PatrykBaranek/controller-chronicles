import { create } from 'zustand';

type Store = {
  isMenuOpen: boolean;
  toggleMenuOpen: () => void;
};

const useStore = create<Store>()(set => ({
  isMenuOpen: false,
  toggleMenuOpen: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useStore;
