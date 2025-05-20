import { NavElements } from "../NavElements";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={280}
            style={{ minHeight: "100vh" }}
            theme="light"
        >
            <Menu
                items={NavElements}
                mode="inline"
                inlineCollapsed={collapsed}
            />
        </Sider>
    );
}
