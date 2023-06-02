import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Menu } from "antd";
import {
  TableOutlined,
  BarsOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import style from "./style.module.css";
import BoardsView from "./BoardsView";

const items = [
  {
    label: "Boards",
    key: "boardsView",
    icon: <BarsOutlined />,
  },
  {
    label: "Table",
    key: "tableView",
    icon: <TableOutlined />,
  },
  {
    label: "Cards",
    key: "cardsView",
    icon: <AppstoreOutlined />,
  },
  { label: "Calender", key: "calenderView", icon: <CalendarOutlined /> },
];

const ProjectDashboardPage = () => {
  const [current, setCurrent] = useState("boardsView");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    // <div className="layout__wrapper">
    //   <LeadsOverview />
    // </div>
    <>
      <div className={style.container}>
        <Card>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" className={style.project_title_heading}>
              Project 1
            </Typography>
            <Box>
              <Button style={{ marginRight: "0.4rem" }}>
                <EditOutlined />
              </Button>
              <Button>
                <DeleteOutlined />
              </Button>
            </Box>
          </Box>
        </Card>
        <Card>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          {current === "boardsView" && <BoardsView />}
          {/* {current === "employees" && <UsersTable />} */}
        </Card>
      </div>
    </>
  );
};

export default ProjectDashboardPage;
