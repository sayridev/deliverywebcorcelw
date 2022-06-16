import { ReactElement, useContext, useState } from "react";
import { Avatar, Button, Layout as LayoutAnt, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { routes } from "../routes/routes";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth/AuthContext";
import { HasPermision } from "./Permission";
import { TypeAdmin } from "../interfaces/IUserApp";
const { Header, Content, Footer, Sider } = LayoutAnt;

interface Props {
  children: JSX.Element | JSX.Element[];
}
interface MenuItems {
  key: string;
  label: ReactElement;
  icon?: ReactElement;
}
export const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, userApp } = useContext(AuthContext);
  const menuItems: MenuItems[] = [];

  routes.map((route) => {
    if (HasPermision(userApp!)!.includes(route.path)) {
      return menuItems.push({
        key: route.to,
        label: <NavLink to={route.to}>{route.name}</NavLink>,
        icon: <route.icon />,
      });
    }
  });

  return (
    <LayoutAnt
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo"></div>

        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <LayoutAnt className="site-layout">
        <Header
          className="site-layout-background header-layout"
          style={{ padding: 0 }}
        >
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            icon={<LogoutOutlined />}
            onClick={() => logout()}
          >
            Salir
          </Button>
          <h4 style={{ color: "white", marginRight: 20 }}>
            {userApp?.type === TypeAdmin.Admin
              ? "Corcel Negro"
              : "Bienvenido " + userApp?.name}
          </h4>
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Todos los derechos reservados &copy;
        </Footer>
      </LayoutAnt>
    </LayoutAnt>
  );
};
