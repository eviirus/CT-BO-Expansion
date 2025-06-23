import { forwardRef, useImperativeHandle, useState } from "react";
import { urlRegex } from "../../../../../constants/urlRegex";
import { Input } from "antd";
import { useTextChange } from "../../../../../hooks/useTextChange";

const ImageContent = forwardRef(({ rowKey }, ref) => {
  const [link, setLink] = useState({});
  const [errors, setErrors] = useState({ link: {} });

  const { handleTextChange: handleLinkChange } = useTextChange({
    setText: setLink,
    setErrors,
    field: "link",
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newError = { text: {}, link: {} };

      if (!link[rowKey]) {
        newError.link[rowKey] = "Button link is required";
      }

      if (link[rowKey]) {
        if (!urlRegex.test(link[rowKey])) {
          newError.link[rowKey] = "Please enter a valid URL";
        }
      }

      setErrors(newError);
      return Object.keys(newError.link || {}).length === 0;
    },

    getValues: () => {
      const values = {};

      values[rowKey] = {
        link: link[rowKey].trim(),
      };

      return values;
    },
  }));
  return (
    <section className="image-content" style={{ marginBottom: "10px" }}>
      <div className="basic-row">
        <div className="basic-col">
          <label htmlFor={`imageLink-${rowKey}`}>Background image link</label>
          <Input
            id={`imageLink-${rowKey}`}
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

export default ImageContent;
