import { Select } from "antd";
import "./BodyHeadingContent.css";

export default function BodyHeadingContent({ content }) {
  console.log(content);

  return (
    <section className="heading-content basic-row">
      <Select
        style={{ width: "100%" }}
        allowClear
        options={[{ value: "lucy", label: "lucy" }]}
        placeholder="someval"
      />
    </section>
  );
}
