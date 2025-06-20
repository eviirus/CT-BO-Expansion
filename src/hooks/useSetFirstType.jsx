import { useEffect } from "react";

export const useSetFirstType = ({
  types,
  rowKey,
  selectedType,
  setSelectedType,
  handleTypeChange,
}) => {
  useEffect(() => {
    if (types.length > 0 && !selectedType[rowKey]) {
      const firstType = types[0].value;
      setSelectedType((prev) => ({ ...prev, [rowKey]: firstType }));
      handleTypeChange(rowKey, firstType);
    }
  }, [types, rowKey, selectedType, setSelectedType, handleTypeChange]);
};
