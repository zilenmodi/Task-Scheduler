import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import BoardsView from "./BoardsView/BoardsView";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromDatabase } from "../../Helper/firebasedb";

const items = [
  {
    label: "Boards",
    key: "boardsView",
    icon: <BarsOutlined />,
  },
  // {
  //   label: "Table",
  //   key: "tableView",
  //   icon: <TableOutlined />,
  // },
  // {
  //   label: "Cards",
  //   key: "cardsView",
  //   icon: <AppstoreOutlined />,
  // },
  // { label: "Calender", key: "calenderView", icon: <CalendarOutlined /> },
];

const ProjectDashboardPage = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const [current, setCurrent] = useState("boardsView");
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const {
    data: projectsData,
    error,
    isLoading,
  } = useQuery(["projects"], () => getProjectFromDatabase(adminId));
  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const [projectWithId] = projectsData?.filter((project) => {
    if (project?.projectId === id) {
      return project;
    }
  });

  return (
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
              {projectWithId?.projectName}
            </Typography>
            <Box>
              <Button
                style={{ marginRight: "0.4rem" }}
                onClick={() => navigate(`/projects/${id}/edit`)}
              >
                <EditOutlined />
              </Button>
            </Box>
          </Box>
        </Card>
        <Card className={style.background_container}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          {current === "boardsView" && (
            <BoardsView projectWithId={projectWithId} />
          )}
          {/* {current === "employees" && <UsersTable />} */}
        </Card>
      </div>
    </>
  );
};

export default ProjectDashboardPage;
