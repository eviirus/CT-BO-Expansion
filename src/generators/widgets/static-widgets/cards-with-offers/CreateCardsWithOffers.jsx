import { CreateCardsWithOffersStyles } from "./CreateCardsWithOffersStyles";
import { MinifyHtml } from "../../../../utils/MinifyHtml";

export const CreateCardsWithOffers = ({
  title,
  description,
  button,
  image,
}) => {
  const titles = Object.values(title || {}).filter(Boolean);
  const descriptions = Object.values(description || {}).filter(Boolean);
  const buttons = Object.values(button || {}).filter(Boolean);
  const images = Object.values(image || {}).filter(Boolean);

  const renderCards = () => {
    return titles
      .map((_, index) => {
        const tit = Object.values(titles[index] || {})[0];
        const desc = Object.values(descriptions[index] || {})[0];
        const btn = Object.values(buttons[index] || {})[0];

        if (!tit || !desc || !btn) return "";

        return `
        <div class="item">
          <div class="content">
              <div class="upper">
                  <${tit.type} class=${tit.class || "title"}>${tit.text}</${
          tit.type
        }>
                  <${desc.type} class=${desc.class || "subtitle"}>${
          desc.text
        }</${desc.type}>
              </div><a class="button" href="${btn.link}">${btn.text}</a>
          </div>
      </div>`;
      })
      .join("");
  };

  const generateImageStyles = () => {
    let styles = `<style>`;

    images.forEach((imgs, index) => {
      const img = Object.values(imgs || {})[0];
      if (img?.link) {
        styles += `.sr-offers .item:nth-child(${index + 1}) {
          background-image: url(${img.link});
        }`;
      }
    });

    styles += `</style>`;
    return styles;
  };

  return MinifyHtml({
    html: `
    ${CreateCardsWithOffersStyles}
    ${generateImageStyles()}
    <section class="sr-offers">
      ${renderCards()}
    </section>
    `,
  });
};
