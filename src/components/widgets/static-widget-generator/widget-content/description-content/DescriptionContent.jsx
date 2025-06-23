import { forwardRef, useImperativeHandle, useState } from "react";
import { useTypeChange } from "../../../../../hooks/useTypeChange";
import { useTextChange } from "../../../../../hooks/useTextChange";
import { Select, Input } from "antd";
import { useSetFirstType } from "../../../../../hooks/useSetFirstType";

const { TextArea } = Input;

const DescriptionContent = forwardRef(({ content, rowKey }, ref) => {
  const [selectedType, setSelectedType] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [classes, setClasses] = useState({});
  const [text, setText] = useState({});
  const [errors, setErrors] = useState({ type: {}, text: {} });

  const types = content.map((item) => ({
    label: item.type,
    value: item.type,
  }));

  const { handleTypeChange } = useTypeChange({
    content,
    setSelectedType,
    setErrors,
    setClasses,
  });

  const { handleTextChange } = useTextChange({
    setText,
    setErrors,
  });

  useSetFirstType({
    types,
    rowKey,
    selectedType,
    setSelectedType,
    handleTypeChange,
  });

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newError = { type: {}, text: {} };

      if (!selectedType[rowKey]) {
        newError.type[rowKey] = "Description type is required";
      }

      if (!text[rowKey]) {
        newError.text[rowKey] = "Description content is required";
      }

      setErrors(newError);
      return (
        Object.keys(newError.type || {}).length === 0 &&
        Object.keys(newError.text || {}).length === 0
      );
    },

    getValues: () => {
      const values = {};

      values[rowKey] = {
        type: selectedType[rowKey],
        class: selectedClass[rowKey],
        text: text[rowKey].trim(),
      };
      return values;
    },
  }));

  return (
    <section className="description-content" style={{ marginBottom: "10px" }}>
      <div className="basic-row">
        <div className="col-gap-only">
          <label htmlFor={`descriptionType-${rowKey}`}>Description type</label>
          <Select
            id={`descriptionType-${rowKey}`}
            style={{ width: "150px" }}
            allowClear
            options={types}
            onChange={(value) => handleTypeChange(rowKey, value)}
            value={selectedType[rowKey] || null}
          />
          {errors.type[rowKey] && (
            <div className="error">{errors.type[rowKey]}</div>
          )}
        </div>
        <div className="col-gap-only">
          <label htmlFor={`descriptionClass-${rowKey}`}>
            Description class
          </label>
          <Select
            id={`descriptionClass-${rowKey}`}
            style={{ width: "150px" }}
            allowClear
            options={classes[rowKey]}
            disabled={
              !selectedType[rowKey] ||
              !classes[rowKey] ||
              classes[rowKey].length === 0
            }
            onChange={(value) =>
              setSelectedClass((prev) => ({ ...prev, [rowKey]: value }))
            }
            value={selectedClass[rowKey] || null}
          />
        </div>
        <div className="basic-col">
          <label htmlFor={`descriptionContent-${rowKey}`}>
            Description content
          </label>
          <TextArea
            id={`descriptionContent-${rowKey}`}
            disabled={!selectedType[rowKey]}
            rows={1}
            style={{ resize: "none" }}
            onChange={(e) => handleTextChange(rowKey, e.target.value.trim())}
          ></TextArea>
          {errors.text[rowKey] && selectedType[rowKey] && (
            <div className="error">{errors.text[rowKey]}</div>
          )}
        </div>
      </div>
    </section>
  );
});

export default DescriptionContent;
