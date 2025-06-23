import { Input } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { urlRegex } from "../../../constants/urlRegex";

const PagePrevNextLinking = forwardRef((props, ref) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    prevPageTitle: "",
    prevPageLink: "",
    nextPageTitle: "",
    nextPageLink: "",
  });

  const handleChange = (key, value) => {
    setValues((prev) => {
      const newValues = { ...prev, [key]: value };

      if (
        (key === "prevPageTitle" || key === "nextPageTitle") &&
        value === ""
      ) {
        if (key === "prevPageTitle") {
          newValues.prevPageLink = "";
        } else if (key === "nextPageTitle") {
          newValues.nextPageLink = "";
        }
      }

      return newValues;
    });
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = {};

      if (values.prevPageTitle.trim() !== "") {
        if (values.prevPageLink.trim() === "") {
          newErrors.prevPageLink =
            "Previous page link is required. Add it or remove previous page title";
        } else if (values.prevPageLink.trim() !== "") {
          if (!urlRegex.test(values.prevPageLink)) {
            newErrors.prevPageLink = "Please enter a valid URL";
          }
        }
      }

      if (values.nextPageTitle.trim() !== "") {
        if (values.nextPageLink.trim() === "") {
          newErrors.nextPageLink =
            "Next page link is required. Add it or remove next page title";
        } else if (values.nextPageLink.trim() !== "") {
          if (!urlRegex.test(values.nextPageLink)) {
            newErrors.nextPageLink = "Please enter a valid URL";
          }
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },

    getValues: () => values,
  }));

  return (
    <section className="page-prev-next-linking basic-col">
      <h2 className="regular24">Linking</h2>
      <div className="basic-row">
        <div className="basic-col">
          <div className="basic-col">
            <label htmlFor="prevPageTitle">Previous page title</label>
            <Input
              value={values.prevPageTitle}
              onChange={(value) =>
                handleChange("prevPageTitle", value.target.value)
              }
              allowClear
            />
          </div>
          <div className="basic-col">
            <label htmlFor="prevPageLink">Previous page link</label>
            <Input
              value={values.prevPageLink}
              onChange={(value) =>
                handleChange("prevPageLink", value.target.value)
              }
              disabled={!values.prevPageTitle.trim()}
              allowClear
            />
            {errors.prevPageLink && (
              <div className="error">{errors.prevPageLink}</div>
            )}
          </div>
        </div>
        <div className="basic-col">
          <div className="basic-col">
            <label htmlFor="nextPageTitle">Next page title</label>
            <Input
              value={values.nextPageTitle}
              onChange={(value) =>
                handleChange("nextPageTitle", value.target.value)
              }
              allowClear
            />
          </div>
          <div className="basic-col">
            <label htmlFor="nextPageLink">Next page link</label>
            <Input
              value={values.nextPageLink}
              onChange={(value) =>
                handleChange("nextPageLink", value.target.value)
              }
              disabled={!values.nextPageTitle.trim()}
              allowClear
            />
            {errors.nextPageLink && (
              <div className="error">{errors.nextPageLink}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default PagePrevNextLinking;
