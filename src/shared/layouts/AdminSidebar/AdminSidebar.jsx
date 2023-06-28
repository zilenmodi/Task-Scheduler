import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Menu, Drawer, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "../../../assets/dark-logo.svg";
import style from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromDatabase } from "../../../Helper/firebasedb";

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
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {
    data: projectsData,
    error,
    isLoading,
  } = useQuery(["projects"], () => getProjectFromDatabase(adminId));

  const items = [
    getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),
    getItem("Today's Task", "/todays-tasks", <DesktopOutlined />),
    getItem("Notes", "/notes", <ContainerOutlined />),
    getItem(
      "Teams Projects",
      "sub1",
      <ProjectOutlined />,
      projectsData?.map((project) => {
        return getItem(project.projectName, `/projects/${project.projectId}`);
      })
    ),
    // getItem("My Projects", "sub2", <AppstoreOutlined />, [
    //   getItem("Project 1", "9"),
    //   getItem("Project 2", "10"),
    //   getItem("Submenu", "sub3", null, [
    //     getItem("Subtask 1", "11"),
    //     getItem("Subtask 2", "12"),
    //   ]),
    // ]),
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div
        style={{
          width: 240,
        }}
        className={style.AdminSidebar_container}
      >
        <Menu
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
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
      <div className={style.mobile_navbar}>
        <Button
          type="primary"
          onClick={showDrawer}
          className={style.nav_humburger}
          icon={<MenuOutlined />}
        ></Button>
        <Avatar
          src={
            "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
          }
          style={{
            height: "2.2rem",
            width: "2.2rem",
          }}
        />
        <Drawer
          placement={"left"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"left"}
          width={"250px"}
          bodyStyle={{
            padding: "0",
          }}
        >
          <Menu
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="light"
            items={items}
            style={{
              padding: "2rem 0",
              width: "100%",
              overflow: "auto",
              height: "100%",
            }}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Drawer>
      </div>
    </>
  );
};
export default AdminSidebar;
