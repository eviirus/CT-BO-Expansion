import { FileAddOutlined, HomeOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NavElements = [
  {
    key: "sub1",
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "grp1",
    label: "Landing pages",
    type: "group",
    children: [
      {
        key: "g",
        label: "Excursions",
        icon: <FileAddOutlined />,
        children: [
          {
            key: "1",
            label: (
              <Link to="/landing-pages/excursions/excursion-page-generator">
                Excursion page generator
              </Link>
            ),
          },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "grp2",
    label: "Widgets",
    type: "group",
    children: [
      {
        key: "g2",
        label: "Static widget generator",
        icon: <EditOutlined />,
        children: [
          {
            key: "2",
            label: (
              <Link to="/widgets/static-widget-generator/cards-with-offers">
                Cards with offers
              </Link>
            ),
          },
        ],
      },
    ],
  },
];
