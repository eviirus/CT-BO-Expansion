import { CreateExcursionPageStyles } from "./CreateExcursionPageStyles";
import { MinifyHtml } from "../../../utils/MinifyHtml";

export const CreateExcursionPage = ({
  heroContent,
  bodyContent,
  pagePrevNextLinkingContent,
}) => {
  const { pageTitle, imageLink } = heroContent;

  const renderArticle = () => {
    const heading = bodyContent.heading || {};
    const paragraph = bodyContent.paragraph || {};

    return Object.keys(heading).map((groupKey) => {
      return `
        <article>
          ${Object.values(heading[groupKey])
            .map(({ type, text, class: className }) => {
              if (type === "p" && className) {
                return `<p><strong class="${className}">${text}</strong></p>`;
              }
              return `<${type}>${text}</${type}>`;
            })
            .join("\n")}
          ${
            paragraph[groupKey]
              ? Object.values(paragraph[groupKey])
                  .map(({ type, text }) => {
                    return `<${type}>${text}</${type}>`;
                  })
                  .join("\n")
              : ""
          }
        </article>
      `;
    });
  };

  const renderLinks = () => {
    const { prevPageTitle, prevPageLink, nextPageTitle, nextPageLink } =
      pagePrevNextLinkingContent;

    const linksHtml = [];

    if (prevPageTitle) {
      linksHtml.push(`
        <a class="prev-excursion-container" href=${prevPageLink} style="text-decoration:none;color:#000">
            <div class="prev-excursion-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path d="M15 6L9 12L15 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg></div>
                <span class="prev-excursion-title">${prevPageTitle}</span>
        </a>
        `);
    }

    if (nextPageTitle) {
      linksHtml.push(`
        <a class="next-excursion-container" href=${nextPageLink} style="text-decoration:none;color:#000">
            
                <span class="next-excursion-title">${nextPageTitle}</span>
                <div class="next-excursion-icon"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6L15 12L9 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg></div>
        </a>
        `);
    }

    return linksHtml.join("\n");
  };

  return MinifyHtml({
    html: `
  ${CreateExcursionPageStyles}
    <section class="excursion-main-container">
      <h1 class="excursion-heading">${pageTitle}</h1>
      <div class="excursion-image-container">
        <img
          src="${imageLink}"
          loading="eager"
          fetchpriority="high"
          alt="${pageTitle}"
        />
      </div>

      <article class="excursion-article-section">
        ${renderArticle().join("\n")}
      </article>

      <div class="buttons-container">
        ${renderLinks()}
      </div>
    </section>
  `,
  });
};
