import { create } from "zustand";

export interface FilterState {
  valueMin: number | null;
  valueMax: number | null;
  selectedCategory: number[];
  searchText: string;
}

interface FilterStore {
  appliedFilterState: FilterState;
  filterState: FilterState;
  updateFilter: (props: {
    key: keyof FilterState;
    value: string | number | number[];
  }) => void;

  resetFilter: () => void;
  applyFilters: () => void;
}

const defaultFilterState: FilterState = {
  valueMin: null,
  valueMax: null,
  selectedCategory: [],
  searchText: "",
};

export const useFilterStore = create<FilterStore>((set) => ({
  appliedFilterState: defaultFilterState,
  filterState: defaultFilterState,

  updateFilter: (props) => {
    set((state) => ({
      filterState: {
        ...state.filterState,
        [props.key]: props.value,
      },
    }));
  },

  resetFilter: () => {
    set(() => ({
      appliedFilterState: defaultFilterState,
      filterState: defaultFilterState,
    }));
  },

  applyFilters: () => {
    set((state) => ({
      appliedFilterState: state.filterState,
    }));
  },
}));
