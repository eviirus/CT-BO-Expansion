import { useState, useCallback } from "react";

export function useRows(initialRows = []) {
  const [rows, setRows] = useState(initialRows);

  const addRow = useCallback((extraData = {}) => {
    setRows((prev) => [
      ...prev,
      {
        key: prev.length,
        ...extraData,
      },
    ]);
  }, []);

  const removeRow = useCallback((key) => {
    setRows((prev) => prev.filter((row) => row.key !== key));
  }, []);

  return { rows, addRow, removeRow };
}
