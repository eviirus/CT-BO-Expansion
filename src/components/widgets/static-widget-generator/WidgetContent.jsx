import { useRef, useImperativeHandle, forwardRef } from "react";
import { useRows } from "../../../hooks/useRows";
import { Collapse, Button } from "antd";
import RemoveButton from "../../buttons/RemoveButton";
import TitleContent from "./widget-content/title-content/TitleContent";
import DescriptionContent from "./widget-content/description-content/DescriptionContent";
import ButtonContent from "./widget-content/button-content/ButtonContent";
import ImageContent from "./widget-content/image-content/ImageContent";

const WidgetContent = forwardRef(({ content }, ref) => {
  const { rows, addRow, removeRow } = useRows();
  const titleContent = useRef({});
  const descriptionContent = useRef({});
  const buttonContent = useRef({});
  const imageContent = useRef({});

  useImperativeHandle(ref, () => ({
    validate: () => {
      const contentRefs = [
        titleContent,
        descriptionContent,
        buttonContent,
        imageContent,
      ];

      for (const ref of contentRefs) {
        for (const key in ref.current) {
          if (ref.current[key]?.validate && !ref.current[key].validate()) {
            return false;
          }
        }
      }

      return true;
    },

    getValues: () => {
      const values = {
        title: {},
        description: {},
        button: {},
        image: {},
      };

      for (const key of Object.keys(titleContent.current)) {
        values.title[key] = titleContent.current[key]?.getValues();
        values.description[key] = descriptionContent.current[key]?.getValues();
        values.button[key] = buttonContent.current[key]?.getValues();
        values.image[key] = imageContent.current[key]?.getValues();
      }

      return values;
    },
  }));

  const handleAddRow = () => {
    addRow({ title: `Item ${rows.length + 1}` });
  };

  const renderContent = (rowKey) => {
    const title = content.find((c) => c.rowType === "title");
    const description = content.find((c) => c.rowType === "description");
    const button = content.find((c) => c.rowType === "button");
    const image = content.find((c) => c.rowType === "image");

    return (
      <>
        {title && (
          <TitleContent
            ref={(el) => (titleContent.current[rowKey] = el)}
            content={title.items.titles}
            rowKey={rowKey}
          />
        )}
        {description && (
          <DescriptionContent
            ref={(el) => (descriptionContent.current[rowKey] = el)}
            content={description.items.descriptions}
            rowKey={rowKey}
          />
        )}
        {button && (
          <ButtonContent
            ref={(el) => (buttonContent.current[rowKey] = el)}
            rowKey={rowKey}
          />
        )}
        {image && (
          <ImageContent
            ref={(el) => (imageContent.current[rowKey] = el)}
            rowKey={rowKey}
          />
        )}
      </>
    );
  };

  return (
    <section className="widget-content basic-col">
      <h2 className="regular24">Widget content</h2>
      {rows.map((row) => (
        <Collapse
          style={{ backgroundColor: "#fff" }}
          key={row.key}
          items={[
            {
              key: row.key,
              label: row.title,
              children: renderContent(row.key),
              extra: <RemoveButton rowKey={row.key} removeRow={removeRow} />,
            },
          ]}
        />
      ))}

      <Button color="default" variant="outlined" onClick={handleAddRow}>
        Add item
      </Button>
    </section>
  );
});

export default WidgetContent;
