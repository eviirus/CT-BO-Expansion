import { useRef } from "react";
import HeroContent from "../../../components/landing-pages/hero-content/HeroContent";
import BodyContent from "../../../components/landing-pages/body-content/BodyContent";
import { toast } from "react-toastify";
import { generateErrorMessage } from "../../../constants/alertMessages";

export default function ExcursionPageGenerator() {
  const heroRef = useRef();
  const bodyContentRef = useRef();

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
    const bodyValidation = bodyContentRef.current?.validate?.();

    if (!isHeroValid || !bodyValidation) {
      toast.error(generateErrorMessage);
      return;
    }

    toast.success("good");
  };
  return (
    <>
      <h1 className="regular28">Excursion page generator</h1>
      <HeroContent ref={heroRef} pageTitle={true} imageLink={true} />
      <BodyContent ref={bodyContentRef} content={content} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
