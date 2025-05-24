import { forwardRef, useImperativeHandle, useState } from "react";
import { Input } from "antd";
import "./HeroContent.css";

const HeroContent = forwardRef(({ pageTitle, imageLink }, ref) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    pageTitle: "",
    imageLink: "",
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = {};

      if (imageLink && values.imageLink.trim() !== "") {
        const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!urlRegex.test(values.imageLink)) {
          newErrors.imageLink = "Please enter a valid URL";
        }
      } else if (imageLink && values.imageLink.trim() === "") {
        newErrors.imageLink = "Image link is required";
      }

      if (pageTitle && values.pageTitle.trim() === "") {
        newErrors.pageTitle = "Page title is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },

    getValues: () => values,
  }));

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const fields = [];

  if (pageTitle) {
    fields.push({ label: "Page title", key: "pageTitle" });
  }

  if (imageLink) {
    fields.push({ label: "Image link", key: "imageLink" });
  }

  return (
    <section className="hero-content basic-col">
      <h2 className="regular24">Hero content</h2>
      <div className="content">
        {fields.map((field) => (
          <div key={field.key} className="input">
            <label htmlFor={field.key}>{field.label}</label>
            <Input
              id={field.key}
              value={values[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
            {errors[field.key] && (
              <div className="error">{errors[field.key]}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});

export default HeroContent;
