import { useState } from "react";
import { Button, Collapse } from "antd";

export default function BodyContent({ content }) {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        key: prev.length,
        title: `Row ${prev.length + 1}`,
      },
    ]);
  };

  const renderContent = () => {
    const headingContent = content.find((c) => c.rowType === "heading");
    const paragraphContent = content.find((c) => c.rowType === "paragraph");

    return (
      <>
        {/* {headingContent && <BodyHeadingContent content={headingContent.items.headings}} */}
        {/* {paragraphContent && <BodyParagraphContent content={paragraphContent.items.paragraphs}} */}
        {headingContent && <p>heading row</p>}
        {paragraphContent && <p>paragraph row</p>}
      </>
    );
  };

  return (
    <section className="body-content basic-col">
      <h2 className="regular24">Body content</h2>
      {rows.map((row) => (
        <Collapse
          key={row.key}
          items={[
            {
              key: row.key,
              label: row.title,
              children: renderContent(),
            },
          ]}
        />
      ))}

      <Button color="default" variant="outlined" onClick={() => addRow()}>
        Add row
      </Button>
    </section>
  );
}
