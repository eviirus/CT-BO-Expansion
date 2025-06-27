import { useState, useCallback } from "react";
import generateUniqueId from "../utils/GenerateUniqueId";

export function useRows(initialRows = []) {
  const [rows, setRows] = useState(initialRows);

  const addRow = useCallback((extraData = {}) => {
    setRows((prev) => [
      ...prev,
      {
        key: generateUniqueId(),
        ...extraData,
      },
    ]);
  }, []);

  const removeRow = useCallback((key) => {
    setRows((prev) => prev.filter((row) => row.key !== key));
  }, []);

  return { rows, addRow, removeRow };
}
