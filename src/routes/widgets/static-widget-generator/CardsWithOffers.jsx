import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import WidgetContent from "../../../components/widgets/static-widget-generator/WidgetContent";
import { ShowMessage } from "../../../utils/ShowMessage";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../constants/alertMessages";
import { Button } from "antd";
import CodeDisplay from "../../../components/code-display/CodeDisplay";
import { CreateCardsWithOffers } from "../../../generators/widgets/static-widgets/cards-with-offers/CreateCardsWithOffers";
import WidgetStaticPreview from "../../../components/preview/widget-preview/static-preview/WidgetStaticPreview";

import cardsWithOffersDesktop from "../../../assets/images/widgets/cardsWithOffers-desktop.png";
import cardsWithOffersMobile from "../../../assets/images/widgets/cardsWithOffers-mobile.png";

export default function ExcursionPageGenerator() {
  const pageTitle = "Cards with offers";
  const widgetContentRef = useRef();
  const [generatedHtml, setGeneratedHtml] = useState("");
  const codeDisplayRef = useRef(null);
  const { contextHolder, showError, showSuccess } = ShowMessage();

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
      showError(generateErrorMessage);
      return;
    }
    const widgetContentValues = widgetContentRef.current?.getValues?.();

    const cardsWithOffersHtml = CreateCardsWithOffers({
      title: widgetContentValues.title,
      description: widgetContentValues.description,
      button: widgetContentValues.button,
      image: widgetContentValues.image,
    });

    setGeneratedHtml(cardsWithOffersHtml);

    setTimeout(() => {
      codeDisplayRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    showSuccess(generateSuccessMessage);
  };
  return (
    <>
      {contextHolder}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
      </Helmet>
      <h1 className="regular28">Cards with offers generator</h1>
      <WidgetStaticPreview
        desktopImage={cardsWithOffersDesktop}
        mobileImage={cardsWithOffersMobile}
      />
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
