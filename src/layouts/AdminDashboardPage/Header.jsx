import { Row, Col, Tag } from "antd";
import React from "react";
import { ProjectOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import { Card, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ComputerIcon from "@mui/icons-material/Computer";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  getProjectFromDatabase,
  getUsersFromDatabase,
} from "../../Helper/firebasedb";

const Header = () => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const { data: projects } = useQuery(["projects", adminId], () =>
    getProjectFromDatabase(adminId)
  );

  const { data: users } = useQuery(["users", adminId], () =>
    getUsersFromDatabase(adminId)
  );

  const totalTasks = 0;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="blue">
            <ListAltIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Projects</Typography>
            <Typography variant="h6">{projects?.length}</Typography>
          </Tag>
        </Col>
        <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="purple">
            <SupervisedUserCircleIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Employees</Typography>
            <Typography variant="h6">{users?.length}</Typography>
          </Tag>
        </Col>
        <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="magenta">
            <ComputerIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Total Tasks</Typography>
            <Typography variant="h6">{totalTasks}</Typography>
          </Tag>
        </Col>
        {/* <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="red">
            <FormatListNumberedIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Remain Tasks</Typography>
            <Typography variant="h6">43</Typography>
          </Tag>
        </Col>
        <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="gold">
            <AutoModeIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">In Progress</Typography>
            <Typography variant="h6">120</Typography>
          </Tag>
        </Col>
        <Col xs={12} md={8} lg={4}>
          <Tag className={style.dash_card_small} color="green">
            <CheckCircleOutlineIcon fontSize="medium" sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Finish</Typography>
            <Typography variant="h6">80</Typography>
          </Tag>
        </Col> */}
      </Row>
    </>
  );
};

export default Header;
