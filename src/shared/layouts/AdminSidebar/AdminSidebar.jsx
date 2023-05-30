import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "../../../assets/dark-logo.svg";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);

  if (status === "pending") {
    return <h1>Loading</h1>;
  }

  const items = [
    getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),
    getItem("Today's Task", "/todays-tasks", <DesktopOutlined />),
    getItem("Notes", "/notes", <ContainerOutlined />),
    getItem(
      "Teams Projects",
      "sub1",
      <ProjectOutlined />,
      projects.map((project) => {
        return getItem(project.projectName, `/projects/${project.projectId}`);
      })
    ),
    getItem("My Projects", "sub2", <AppstoreOutlined />, [
      getItem("Project 1", "9"),
      getItem("Project 2", "10"),
      getItem("Submenu", "sub3", null, [
        getItem("Subtask 1", "11"),
        getItem("Subtask 2", "12"),
      ]),
    ]),
  ];

  return (
    <>
      <div
        style={{
          width: 260,
        }}
      >
        <Menu
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          style={{
            height: "100vh",
            padding: "2rem 0",
          }}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </div>
    </>
  );
};
export default AdminSidebar;
