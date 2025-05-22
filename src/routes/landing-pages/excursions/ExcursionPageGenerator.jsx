import { useRef } from "react";
import HeroContent from "../../../components/landing-pages/hero-content/HeroContent";
import BodyContent from "../../../components/landing-pages/body-content/BodyContent";
import { toast } from "react-toastify";
import { generateErrorMessage } from "../../../constants/alertMessages";

export default function ExcursionPageGenerator() {
  const heroRef = useRef();

  const handleSubmit = () => {
    const isHeroValid = heroRef.current?.validate?.();

    if (!isHeroValid) {
      toast.error(generateErrorMessage);
    }
  };
  return (
    <main>
      <h1 className="regular28">Excursion page generator</h1>
      <HeroContent ref={heroRef} pageTitle={true} imageLink={true} />
      <BodyContent />
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
}
