import { Input, Tooltip, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;

export default function CodeDisplay({ content, scrollRef }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      message.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy!");
    }
  };

  return (
    <section
      ref={scrollRef}
      className="code-display basic-col"
      id="codeDisplay"
      style={{ marginTop: "20px", width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h2 className="regular24">Generated code</h2>
        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            type="text"
            size="large"
          />
        </Tooltip>
      </div>

      <TextArea value={content} style={{ resize: "none" }} rows={6} readOnly />
    </section>
  );
}
