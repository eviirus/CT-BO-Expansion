import { Helmet } from "react-helmet-async";

export default function Homepage(){
    const pageTitle = "CO BO Expansion"

    return(
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle}/>
            </Helmet>
            <main>
                Homepage
            </main>
        </>
    )
}