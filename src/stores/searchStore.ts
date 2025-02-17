import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  activeSearchQuery: string;
  setSearchQuery: (query: string) => void;
  executeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  activeSearchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  executeSearch: () => set((state) => ({ activeSearchQuery: state.searchQuery })),
}));
