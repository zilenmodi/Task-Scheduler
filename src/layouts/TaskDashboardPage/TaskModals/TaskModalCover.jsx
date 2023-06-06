import React, { useState } from "react";
import { Popover, Button, Row, Col } from "antd";
import { Box, Typography } from "@mui/material";
import { PicCenterOutlined } from "@ant-design/icons";
import style from "../style.module.css";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";

const backgroundCoverColor = [
  "#4BCE97",
  "#FAA53D",
  "#F87462",
  "#9F8FEF",
  "#579DFF",
  "#E2B203",
  "#60C6D2",
  "#94c748",
  "#E774BB",
  "#8590A2",
];

const ImageUploadBox = ({ setCoverImageUrl, fileList, setFileList }) => {
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setCoverImageUrl(info.fileList.length ? url : "");
    });
    info.file.status = "done";
    setFileList(info.fileList);
  };

  return (
    <>
      <Upload
        fileList={fileList}
        maxCount={1}
        name="image"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        accept=".png,.jpg,.jpeg"
        customRequest={() => {
          return;
        }}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

const TaskModalCoverContent = ({
  hide,
  coverImageUrl,
  setCoverImageUrl,
  fileList,
  setFileList,
}) => {
  return (
    <>
      <Box
        sx={{
          width: "260px",
        }}
      >
        <Box>
          <Typography fontSize="0.9rem" fontWeight={500} sx={{ mb: 2 }}>
            Choose Cover Image
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography
              fontSize="0.9rem"
              fontWeight={500}
              color="grayText"
              sx={{ mb: 1 }}
            >
              Colors
            </Typography>
            <Row gutter={[8, 8]}>
              {backgroundCoverColor.map((bgcolor, index) => {
                return (
                  <Col key={index}>
                    <div
                      className={style.color_cover_box}
                      style={{
                        background: bgcolor,
                      }}
                      onClick={() => {
                        setCoverImageUrl(bgcolor);
                        setFileList([]);
                      }}
                    ></div>
                  </Col>
                );
              })}
            </Row>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              fontSize="0.9rem"
              fontWeight={500}
              color="grayText"
              sx={{ mb: 1 }}
            >
              Select Image
            </Typography>
            <ImageUploadBox
              setCoverImageUrl={setCoverImageUrl}
              coverImageUrl={coverImageUrl}
              fileList={fileList}
              setFileList={setFileList}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            type="primary"
            style={{ marginRight: "1rem" }}
            onClick={() => hide("save")}
          >
            Save
          </Button>
          <Button onClick={() => hide("clear")}>Clear</Button>
        </Box>
      </Box>
    </>
  );
};

const TaskModalCover = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState(taskDetails.coverImage);
  const [fileList, setFileList] = useState(taskDetails.imageFileList);

  const hide = (actionType) => {
    if (actionType === "save") {
      setTaskDetails((prev) => ({
        ...prev,
        coverImage: coverImageUrl,
        imageFileList: fileList,
      }));
      setOpen(false);
    } else if (actionType === "clear") {
      setCoverImageUrl("");
      setFileList([]);
    } else {
      setOpen(false);
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Popover
        content={
          <TaskModalCoverContent
            hide={hide}
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            fileList={fileList}
            setFileList={setFileList}
          />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <div className={style.taskSidebar_box_btn}>
          <PicCenterOutlined />
          <Typography fontSize={"0.9rem"}>Cover</Typography>
        </div>
      </Popover>
    </>
  );
};

export default TaskModalCover;
