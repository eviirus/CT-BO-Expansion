import { useState } from "react";
import { Button, Collapse } from "antd";

const { Panel } = Collapse;

export default function BodyContent() {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        key: prev.length,
        title: `Row ${prev.length + 1}`,
        content: "This is row",
      },
    ]);
  };

  return (
    <section className="body-content basic-col">
      <h2 className="regular24">Body content</h2>
      {rows.map((row) => (
        <Collapse key={row.id}>
          <Panel header={row.title}>{row.content}</Panel>
        </Collapse>
      ))}

      <Button color="default" variant="outlined" onClick={() => addRow()}>
        Add row
      </Button>
    </section>
  );
}
