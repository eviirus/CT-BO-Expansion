import { useRef } from "react";
import HeroContent from "../../../components/landing-pages/hero-content/HeroContent";
import BodyContent from "../../../components/landing-pages/body-content/BodyContent";
import PagePrevNextLinking from "../../../components/landing-pages/page-prev-next-linking/PagePrevNextLinking";
import { toast } from "react-toastify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../constants/alertMessages";
import { Button } from "antd";

export default function ExcursionPageGenerator() {
  const heroRef = useRef();
  const bodyContentRef = useRef();
  const pagePrevNextLinkingRef = useRef();

  const content = [
    {
      rowType: "heading",
      items: {
        headings: [
          {
            type: "h1",
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
          {
            type: "p",
            class: "paragraph-to-heading",
          },
        ],
      },
    },
    {
      rowType: "paragraph",
      items: {
        paragraphs: [
          {
            type: "p",
            class: "",
          },
          {
            type: "li",
            class: "",
          },
        ],
      },
    },
  ];

  const handleSubmit = () => {
    const isHeroValid = heroRef.current?.validate?.();
    const isBodyValid = bodyContentRef.current?.validate?.();
    const isPagePrevNextLinkingValid =
      pagePrevNextLinkingRef.current?.validate?.();

    if (!isHeroValid || !isBodyValid || !isPagePrevNextLinkingValid) {
      toast.error(generateErrorMessage);
      return;
    }

    const heroRefValues = heroRef.current?.getValues?.();
    const bodyContentValues = bodyContentRef.current?.getValues?.();
    const pagePrevNextLinkingValues =
      pagePrevNextLinkingRef.current?.getValues?.();

    console.log("heroRefValues", heroRefValues);
    console.log("bodyContentValues", bodyContentValues);
    console.log("pagePrevNextLinkingValues", pagePrevNextLinkingValues);

    toast.success(generateSuccessMessage);
  };
  return (
    <>
      <h1 className="regular28">Excursion page generator</h1>
      <HeroContent ref={heroRef} pageTitle={true} imageLink={true} />
      <BodyContent ref={bodyContentRef} content={content} />
      <PagePrevNextLinking ref={pagePrevNextLinkingRef} />
      <Button
        onClick={handleSubmit}
        type="primary"
        style={{ marginTop: "20px", width: "100%" }}
      >
        Generate excursion page
      </Button>
    </>
  );
}
