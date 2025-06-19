import { useCallback } from "react";

export const useTypeChange = ({
  content,
  setSelectedType,
  setErrors,
  setClasses,
}) => {
  const handleTypeChange = useCallback(
    (key, typeValue) => {
      setSelectedType((prev) => ({ ...prev, [key]: typeValue }));
      setErrors((prev) => ({
        ...prev,
        type: {
          ...(prev.type || {}),
          [key]: "",
        },
      }));

      const rowClasses = content
        .filter((item) => item.type === typeValue && item.class !== "")
        .map((item) => ({
          label: item.class,
          value: item.class,
        }));

      setClasses((prev) => ({ ...prev, [key]: rowClasses }));
    },
    [content, setSelectedType, setErrors, setClasses]
  );
  return { handleTypeChange };
};
