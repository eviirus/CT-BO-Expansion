import { Button, Collapse, Tooltip } from "antd";
import BodyHeadingContent from "./heading-content/BodyHeadingContent";
import BodyParagraphContent from "./paragraph-content/BodyParagraphContent";
import "./BodyContent.css";
import { useRows } from "../../../hooks/useRows";
import { DeleteOutlined } from "@ant-design/icons";
import { useRef, useImperativeHandle, forwardRef } from "react";

const BodyContent = forwardRef(({ content }, ref) => {
  const bodyHeadingContent = useRef({});
  const bodyParagraphContent = useRef({});
  const { rows, addRow, removeRow } = useRows();

  useImperativeHandle(ref, () => ({
    validate: () => {
      for (const key in bodyHeadingContent.current) {
        if (bodyHeadingContent.current[key]?.validate) {
          const valid = bodyHeadingContent.current[key].validate();
          if (!valid) return false;
        }
      }

      for (const key in bodyParagraphContent.current) {
        if (bodyParagraphContent.current[key]?.validate) {
          const valid = bodyParagraphContent.current[key].validate();
          if (!valid) return false;
        }
      }
      return true;
    },

    getValues: () => {
      const values = {
        heading: {},
        paragraph: {},
      };
      for (const key in bodyHeadingContent.current) {
        if (bodyHeadingContent.current[key]?.getValues) {
          values.heading[key] = bodyHeadingContent.current[key].getValues();
        }
      }

      for (const key in bodyParagraphContent.current) {
        if (bodyParagraphContent.current[key]?.getValues) {
          values.paragraph[key] = bodyParagraphContent.current[key].getValues();
        }
      }
      return values;
    },
  }));

  const handleAddRow = () => {
    addRow({ title: `Row ${rows.length + 1}` });
  };

  const removeButton = (key) => {
    return (
      <Tooltip title="Remove row" placement="left">
        <Button
          icon={<DeleteOutlined />}
          onClick={() => removeRow(key)}
          color="red"
          variant="outlined"
        ></Button>
      </Tooltip>
    );
  };

  const renderContent = (rowKey) => {
    const headingContent = content.find((c) => c.rowType === "heading");
    const paragraphContent = content.find((c) => c.rowType === "paragraph");

    return (
      <>
        {headingContent && (
          <BodyHeadingContent
            ref={(el) => (bodyHeadingContent.current[rowKey] = el)}
            content={headingContent.items.headings}
          />
        )}
        {paragraphContent && (
          <BodyParagraphContent
            ref={(el) => (bodyParagraphContent.current[rowKey] = el)}
            content={paragraphContent.items.paragraphs}
          />
        )}
      </>
    );
  };

  return (
    <section className="body-content basic-col">
      <h2 className="regular24">Body content</h2>
      {rows.map((row) => (
        <Collapse
          style={{ backgroundColor: "#fff" }}
          key={row.key}
          items={[
            {
              key: row.key,
              label: row.title,
              children: renderContent(row.key),
              extra: removeButton(row.key),
            },
          ]}
        />
      ))}

      <Button color="default" variant="outlined" onClick={handleAddRow}>
        Add row
      </Button>
    </section>
  );
});

export default BodyContent;
