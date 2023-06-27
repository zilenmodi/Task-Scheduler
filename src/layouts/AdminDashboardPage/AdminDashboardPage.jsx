import React, { useEffect } from "react";
import style from "./style.module.css";
import Header from "./Header";
import { Card } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  RadarChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import ProjectsTable from "./ProjectsTable";
import UsersTable from "./UsersTable";
import { fetchUsers } from "../../redux/usersSlice/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProjects } from "../../redux/projectsSlice/projectsSlice";

const items = [
  {
    label: "Projects",
    key: "projects",
    icon: <ProjectOutlined />,
  },
  {
    label: "Employees",
    key: "employees",
    icon: <UserOutlined />,
  },
  // {
  //   label: "Tasks",
  //   key: "tasks",
  //   icon: <RadarChartOutlined />,
  // },
];

const AdminDashboardPage = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("projects");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    dispatch(fetchProjects(adminId));
    dispatch(fetchUsers(adminId));
  }, []);

  return (
    <>
      <div className={style.container}>
        <Header />
        <Card>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          {current === "projects" && <ProjectsTable />}
          {current === "employees" && <UsersTable />}
        </Card>
      </div>
    </>
  );
};

export default AdminDashboardPage;
