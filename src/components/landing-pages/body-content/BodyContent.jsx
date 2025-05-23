import { Button, Collapse, Tooltip } from "antd";
import BodyHeadingContent from "./heading-content/BodyHeadingContent";
import "./BodyContent.css";
import { useRows } from "../../../hooks/useRows";
import { DeleteOutlined } from "@ant-design/icons";
import { useRef, useImperativeHandle, forwardRef } from "react";

const BodyContent = forwardRef(({ content }, ref) => {
  const bodyHeadingContent = useRef({});
  const { rows, addRow, removeRow } = useRows();

  useImperativeHandle(ref, () => ({
    validate: () => {
      for (const key in bodyHeadingContent.current) {
        if (bodyHeadingContent.current[key]?.validate) {
          const valid = bodyHeadingContent.current[key].validate();
          if (!valid) return false;
        }
      }
      return true;
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
        {/* {paragraphContent && <BodyParagraphContent content={paragraphContent.items.paragraphs}} */}
        {paragraphContent && <p>paragraph row</p>}
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
