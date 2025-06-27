import TabButtons from "../../../buttons/TabButtons";

export default function WidgetStaticPreview({ desktopImage, mobileImage }) {
  const tabItems = [
    {
      label: "Desktop",
      children: (
        <img
          src={desktopImage}
          style={{ width: "100%", boxSizing: "border-box" }}
          loading="lazy"
          alt="Desktop preview"
        />
      ),
    },
    {
      label: "Mobile",
      children: (
        <img
          src={mobileImage}
          style={{
            width: "auto",
            maxWidth: "100%",
            height: "auto",
            boxSizing: "border-box",
          }}
          loading="lazy"
          alt="Mobile preview"
        />
      ),
    },
  ];

  return (
    <section className="widget-static-preview basic-col">
      <h2 className="regular24">Widget static preview</h2>
      <TabButtons items={tabItems} />
    </section>
  );
}
