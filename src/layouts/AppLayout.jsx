import { Layout } from "antd";
import SideBar from "../components/navigation/side-bar/SideBar";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <Content style={{ padding: "16px", backgroundColor: "#f5f5f5" }}>
          <Outlet />
        </Content>
        <Footer style={{ backgroundColor: "#fff" }}>
          <p className="regular14">©2025</p>
        </Footer>
      </Layout>
    </Layout>
  );
}
