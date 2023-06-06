import React, { useState } from "react";
import { Popover, Button } from "antd";
import { Box, Typography } from "@mui/material";
import { PicCenterOutlined } from "@ant-design/icons";
import style from "../style.module.css";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
        fileList={fileList}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

const TaskModalCoverContent = ({ hide }) => {
  return (
    <>
      <Box
        sx={{
          width: "250px",
        }}
      >
        <h3>Modal</h3>
        <App />
        <Box sx={{ mt: 2 }}>
          <Button type="primary" style={{ marginRight: "1rem" }} onClick={hide}>
            Save
          </Button>
          <Button onClick={hide}>Discard</Button>
        </Box>
      </Box>
    </>
  );
};

const TaskModalCover = () => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Popover
        content={<TaskModalCoverContent hide={hide} />}
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
