import React from "react";
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
  {
    label: "Tasks",
    key: "tasks",
    icon: <RadarChartOutlined />,
  },
];

const AdminDashboardPage = () => {
  const [current, setCurrent] = useState("projects");
  const onClick = (e) => {
    setCurrent(e.key);
  };

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
