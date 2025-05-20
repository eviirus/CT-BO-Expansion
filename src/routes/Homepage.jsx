import { Helmet } from "react-helmet-async";
import SideBar from "../components/navigation/side-bar/SideBar";
import { Layout } from "antd";

const { Content } = Layout;

export default function Homepage(){
    const pageTitle = "CO BO Expansion"

    return(
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle}/>
            </Helmet>
            <Layout style={{ minHeight: "100vh" }}>
            <SideBar />
            <Layout>
                <Content style={{padding: "16px", backgroundColor: "#fff"}}>
                    <h1 className="regular24">Welcome to CT BO Expansion</h1>
                    <p className="regular14">Use the side menu to select a tool</p>
                </Content>
            </Layout>
        </Layout>
        </>
    )
}