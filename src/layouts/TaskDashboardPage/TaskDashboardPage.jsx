import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Col, Menu, Row } from "antd";
import {
  TableOutlined,
  BarsOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import style from "./style.module.css";
import TextEditor from "./TaskComponents/TextEditor";
import TaskSideBar from "./TaskSideBar";
import TaskMainSec from "./TaskMainSec";

const TaskDashboardPage = () => {
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
              Task 1
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
        <Card className={style.background_container_card}>
          <Row gutter={[48, 16]}>
            <Col xs={24} md={18} xxl={20}>
              <TaskMainSec />
            </Col>
            <Col xs={24} md={6} xxl={4}>
              <TaskSideBar />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default TaskDashboardPage;
