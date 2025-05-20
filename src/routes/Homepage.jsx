import { Helmet } from "react-helmet-async";

export default function Homepage() {
  const pageTitle = "CO BO Expansion";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
      </Helmet>
      <h1 className="regular24">Welcome to CT BO Expansion</h1>
      <p className="regular14">Use the side menu to select a tool</p>
    </>
  );
}
