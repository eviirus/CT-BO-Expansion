import { forwardRef, useImperativeHandle, useState } from "react";
import { useTextChange } from "../../../../../hooks/useTextChange";
import { Input } from "antd";
import { urlRegex } from "../../../../../constants/urlRegex";

const ButtonContent = forwardRef(({ rowKey }, ref) => {
  const [text, setText] = useState({});
  const [link, setLink] = useState({});
  const [errors, setErrors] = useState({ text: {}, link: {} });

  const { handleTextChange } = useTextChange({
    setText,
    setErrors,
  });

  const { handleTextChange: handleLinkChange } = useTextChange({
    setText: setLink,
    setErrors,
    field: "link",
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newError = { text: {}, link: {} };

      if (!text[rowKey]) {
        newError.text[rowKey] = "Button text is required";
      }

      if (!link[rowKey]) {
        newError.link[rowKey] = "Button link is required";
      }

      if (link[rowKey]) {
        if (!urlRegex.test(link[rowKey])) {
          newError.link[rowKey] = "Please enter a valid URL";
        }
      }

      setErrors(newError);
      return (
        Object.keys(newError.text || {}).length === 0 &&
        Object.keys(newError.link || {}).length === 0
      );
    },

    getValues: () => {
      const values = {};

      values[rowKey] = {
        text: text[rowKey].trim(),
        link: link[rowKey].trim(),
      };

      return values;
    },
  }));

  return (
    <section className="button-content" style={{ marginBottom: "10px" }}>
      <div className="basic-row">
        <div className="col-gap-only">
          <label htmlFor={`buttonText-${rowKey}`}>Button text</label>
          <Input
            id={`buttonText-${rowKey}`}
            style={{ width: "320px" }}
            allowClear
            onChange={(e) => handleTextChange(rowKey, e.target.value.trim())}
          />
          {errors.text[rowKey] && (
            <div className="error">{errors.text[rowKey]}</div>
          )}
        </div>
        <div className="basic-col">
          <label htmlFor={`buttonLink-${rowKey}`}>Button link</label>
          <Input
            id={`buttonLink-${rowKey}`}
            allowClear
            onChange={(e) => handleLinkChange(rowKey, e.target.value.trim())}
          />
          {errors.link[rowKey] && (
            <div className="error">{errors.link[rowKey]}</div>
          )}
        </div>
      </div>
    </section>
  );
});

export default ButtonContent;
