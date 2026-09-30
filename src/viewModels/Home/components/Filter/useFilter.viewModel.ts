import { useGetProductCategoriesQuery } from "../../../../shared/queries/product/use-get-product-categories";
import { useBottomSheetStore } from "../../../../shared/store/bottomSheet-store";
import { useFilterStore } from "../../../../shared/store/use-filter-store";

export const useFilterViewModel = () => {
  const { data: productCategory, isLoading } = useGetProductCategoriesQuery();

  const { updateFilter, filterState, applyFilters, resetFilter } =
    useFilterStore();
  const { close } = useBottomSheetStore();

  const handleValueMaxChange = (value: number) => {
    updateFilter({ key: "valueMax", value });
  };

  const handleValueMinChange = (value: number) => {
    updateFilter({ key: "valueMin", value });
  };

  const handleCategoryToggle = (categoryId: number) => {
    const isSelected = filterState.selectedCategory.includes(categoryId);

    if (isSelected) {
      const updatedCategories = filterState.selectedCategory.filter(
        (id) => id !== categoryId,
      );
      updateFilter({ key: "selectedCategory", value: updatedCategories });
    } else {
      updateFilter({
        key: "selectedCategory",
        value: [...filterState.selectedCategory, categoryId],
      });
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
    close();
  };

  const handleResetFilters = () => {
    close();
    resetFilter();
  };

  return {
    productCategory,
    isLoading,
    handleValueMaxChange,
    handleValueMinChange,
    handleCategoryToggle,
    selectedCategories: filterState.selectedCategory,
    handleApplyFilters,
    handleResetFilters,
    close,
  };
};
