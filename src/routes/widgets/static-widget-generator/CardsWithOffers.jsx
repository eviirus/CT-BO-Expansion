import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import WidgetContent from "../../../components/widgets/static-widget-generator/WidgetContent";
import { toast } from "react-toastify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../constants/alertMessages";
import { Button } from "antd";
import CodeDisplay from "../../../components/code-display/CodeDisplay";

export default function ExcursionPageGenerator() {
  const pageTitle = "Cards with offers";
  const widgetContentRef = useRef();
  const [generatedHtml, setGeneratedHtml] = useState("");
  const codeDisplayRef = useRef(null);

  const content = [
    {
      rowType: "title",
      items: {
        titles: [
          {
            type: "p",
            class: "",
          },
          {
            type: "h2",
            class: "",
          },
          {
            type: "h3",
            class: "",
          },
          {
            type: "h4",
            class: "",
          },
        ],
      },
    },
    {
      rowType: "description",
      items: {
        descriptions: [
          {
            type: "p",
            class: "",
          },
          {
            type: "span",
            class: "",
          },
        ],
      },
    },
    {
      rowType: "button",
    },
    {
      rowType: "image",
    },
  ];

  const handleSubmit = () => {
    const isWidgetContentValid = widgetContentRef.current?.validate?.();
    if (!isWidgetContentValid) {
      toast.error(generateErrorMessage);
      return;
    }
    const widgetContentValues = widgetContentRef.current?.getValues?.();
    console.log("content", widgetContentValues);
    // const excursionPageHtml = CreateExcursionPage({
    //   heroContent: heroRefValues,
    //   bodyContent: bodyContentValues,
    //   pagePrevNextLinkingContent: pagePrevNextLinkingValues,
    // });
    // setGeneratedHtml(excursionPageHtml);
    // setTimeout(() => {
    //   codeDisplayRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, 100);
    toast.success(generateSuccessMessage);
  };
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
      </Helmet>
      <h1 className="regular28">Cards with offers generator</h1>
      <WidgetContent ref={widgetContentRef} content={content} />
      <Button
        onClick={handleSubmit}
        type="primary"
        style={{ marginTop: "20px", width: "100%" }}
      >
        Generate cards with offers
      </Button>
      {generatedHtml && (
        <CodeDisplay content={generatedHtml} scrollRef={codeDisplayRef} />
      )}
    </>
  );
}
