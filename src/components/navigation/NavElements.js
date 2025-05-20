import { FileAddOutlined, HomeOutlined } from "@ant-design/icons";
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
    key: "grp",
    label: "Landing pages",
    type: "group",
    children: [
      {
        key: "g1",
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
];
