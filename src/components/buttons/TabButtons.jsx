import { Tabs } from "antd";

export default function TabButtons({ items }) {
  const tabItems = items.map((item, index) => ({
    key: String(index),
    label: item.label,
    children: item.children,
  }));

  return <Tabs defaultActiveKey="0" items={tabItems} />;
}
