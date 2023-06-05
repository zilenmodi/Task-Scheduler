import { Box, Typography } from "@mui/material";
import { Col, Row } from "antd";
import React from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import TextEditor from "./TextEditor";

const TaskMainSec = () => {
  return (
    <>
      <Box>
        <Row gutter={[16]}>
          <Col xs={24} md={12}>
            <h3>Cover</h3>
          </Col>
          <Col xs={24} md={12}>
            <h3>Members</h3>
          </Col>
          <Col xs={24} md={12}>
            <h3>Labels</h3>
          </Col>
          <Col xs={24} md={12}>
            <h3>Date</h3>
          </Col>
          <Col xs={24} md={12}>
            <h3>Attachment</h3>
          </Col>
          <Col xs={24}>
            <h3>Checklists</h3>
          </Col>
          <Col
            xs={24}
            style={{
              width: "80%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <MenuUnfoldOutlined /> Description
            </Typography>
            <TextEditor />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default TaskMainSec;
