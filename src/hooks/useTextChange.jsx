import { useCallback } from "react";

export const useTextChange = ({ setText, setErrors, field = "text" }) => {
  const handleTextChange = useCallback(
    (key, textValue) => {
      setText((prev) => ({ ...prev, [key]: textValue }));
      setErrors((prev) => ({
        ...prev,
        [field]: {
          ...(prev.text || {}),
          [key]: "",
        },
      }));
    },
    [setText, setErrors]
  );

  return { handleTextChange };
};
