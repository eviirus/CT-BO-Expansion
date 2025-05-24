import { Select, Input, Button } from "antd";
import "../BodyContent.css";
import { useState, forwardRef, useImperativeHandle } from "react";
import { useRows } from "../../../../hooks/useRows";

const { TextArea } = Input;

const BodyParagraphContent = forwardRef(({ content }, ref) => {
  const [selectedType, setSelectedType] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [classes, setClasses] = useState({});
  const [text, setText] = useState({});
  const { rows, addRow, removeRow } = useRows();
  const [errors, setErrors] = useState({ type: {}, text: {} });

  const types = content.map((item) => ({
    label: item.type,
    value: item.type,
  }));

  useImperativeHandle(ref, () => ({
    validate: () => {
      const newError = { type: {}, text: {} };

      if (rows.length !== 0) {
        rows.forEach((row) => {
          if (!selectedType[row.key]) {
            newError.type[row.key] = "Paragraph type is required";
          }

          if (!text[row.key]) {
            newError.text[row.key] = "Paragraph content is required";
          }
        });
      }

      setErrors(newError);
      console.log(errors.type);
      return (
        Object.keys(newError.type || {}).length === 0 &&
        Object.keys(newError.text || {}).length === 0
      );
    },
  }));

  const handleTypeChange = (key, typeValue) => {
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
  };

  const handleTextChange = (key, textValue) => {
    setText((prev) => ({ ...prev, [key]: textValue }));
    setErrors((prev) => ({
      ...prev,
      text: {
        ...(prev.text || {}),
        [key]: "",
      },
    }));
  };

  return (
    <section className="paragraph-content">
      {rows.map((row) => (
        <div className="basic-row" key={row.key}>
          <div className="col-gap-only">
            <label htmlFor={`paragraphType-${row.key}`}>Paragraph type</label>
            <Select
              id={`paragraphType-${row.key}`}
              style={{ width: "150px" }}
              allowClear
              options={types}
              onChange={(value) => handleTypeChange(row.key, value)}
              value={selectedType[row.key] || null}
            />
            {errors.type[row.key] && (
              <div className="error">{errors.type[row.key]}</div>
            )}
          </div>
          <div className="col-gap-only">
            <label htmlFor={`paragraphClass-${row.key}`}>Paragraph class</label>
            <Select
              id={`paragraphClass-${row.key}`}
              style={{ width: "300px" }}
              allowClear
              options={classes[row.key]}
              disabled={
                !selectedType[row.key] ||
                !classes[row.key] ||
                classes[row.key].length === 0
              }
              onChange={(value) =>
                setSelectedClass((prev) => ({ ...prev, [row.key]: value }))
              }
              value={selectedClass[row.key] || null}
            />
          </div>
          <div className="basic-col">
            <label htmlFor={`paragraphContent-${row.key}`}>
              Paragraph content
            </label>
            <TextArea
              id={`paragraphContent-${row.key}`}
              disabled={!selectedType[row.key]}
              rows={4}
              style={{ resize: "none" }}
              onChange={(e) => handleTextChange(row.key, e.target.value)}
            ></TextArea>
            {errors.text[row.key] && selectedType[row.key] && (
              <div className="error">{errors.text[row.key]}</div>
            )}
          </div>
          <Button
            color="red"
            variant="outlined"
            onClick={() => removeRow(row.key)}
            style={{ marginTop: "29px" }}
          >
            Remove paragraph row
          </Button>
        </div>
      ))}

      <Button color="default" variant="outlined" onClick={() => addRow()}>
        Add paragraph row
      </Button>
    </section>
  );
});

export default BodyParagraphContent;
