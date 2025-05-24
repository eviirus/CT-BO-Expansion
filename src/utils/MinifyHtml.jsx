export const MinifyHtml = ({ html }) => {
  return html
    .replace(/\n/g, "") // Remove newlines
    .replace(/\s{2,}/g, " ") // Collapse multiple spaces
    .replace(/>\s+</g, "><") // Remove space between tags
    .trim(); // Remove leading/trailing whitespace
};
