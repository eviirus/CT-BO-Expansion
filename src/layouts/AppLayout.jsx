import { Layout } from "antd";
import SideBar from "../components/navigation/side-bar/SideBar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function AppLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideBar />
            <Layout>
                <Content style={{ padding: "16px", background: "#f5f5f5" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
