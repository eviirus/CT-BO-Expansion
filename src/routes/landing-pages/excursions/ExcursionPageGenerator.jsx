import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import HeroContent from "../../../components/landing-pages/hero-content/HeroContent";
import BodyContent from "../../../components/landing-pages/body-content/BodyContent";
import PagePrevNextLinking from "../../../components/landing-pages/page-prev-next-linking/PagePrevNextLinking";
import { toast } from "react-toastify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../../../constants/alertMessages";
import { Button } from "antd";
import { CreateExcursionPage } from "../../../generators/landing-pages/create-excursion-page/CreateExcursionPage";
import CodeDisplay from "../../../components/code-display/CodeDisplay";

export default function ExcursionPageGenerator() {
  const pageTitle = "Excursion page generator";
  const heroRef = useRef();
  const bodyContentRef = useRef();
  const pagePrevNextLinkingRef = useRef();
  const [generatedHtml, setGeneratedHtml] = useState("");
  const codeDisplayRef = useRef(null);

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

    const excursionPageHtml = CreateExcursionPage({
      heroContent: heroRefValues,
      bodyContent: bodyContentValues,
      pagePrevNextLinkingContent: pagePrevNextLinkingValues,
    });

    setGeneratedHtml(excursionPageHtml);

    setTimeout(() => {
      codeDisplayRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    toast.success(generateSuccessMessage);
  };
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
      </Helmet>
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
      {generatedHtml && (
        <CodeDisplay content={generatedHtml} scrollRef={codeDisplayRef} />
      )}
    </>
  );
}
