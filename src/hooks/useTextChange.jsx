import { useCallback } from "react";

export const useTextChange = ({ setText, setErrors }) => {
  const handleTextChange = useCallback(
    (key, textValue) => {
      setText((prev) => ({ ...prev, [key]: textValue }));
      setErrors((prev) => ({
        ...prev,
        text: {
          ...(prev.text || {}),
          [key]: "",
        },
      }));
    },
    [setText, setErrors]
  );

  return { handleTextChange };
};
