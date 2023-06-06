import React from "react";
import { useState } from "react";
import { Popover, Button, Form } from "antd";
import { Box, Typography } from "@mui/material";
import { LinkOutlined } from "@ant-design/icons";
import style from "../style.module.css";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";
import { Input } from "antd";

const UrlInput = ({ hide, attachmentUrl, setAttachmentUrl }) => {
  const [form] = Form.useForm();
  const onFinish = (value) => {
    hide("save", value);
  };

  const validateUrl = (_, value) => {
    if (value && !/^(ftp|http|https):\/\/[^ "]+$/i.test(value)) {
      return Promise.reject("Please enter a valid URL");
    }
    return Promise.resolve();
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ url: attachmentUrl }}
      form={form}
    >
      <Form.Item name="url" label="URL" rules={[{ validator: validateUrl }]}>
        <Input />
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Button
          type="primary"
          style={{ marginRight: "1rem" }}
          htmlType="submit"
        >
          Save
        </Button>
        <Button
          onClick={() => {
            form.setFieldValue("url", "");
          }}
        >
          Clear
        </Button>
      </Form.Item>
    </Form>
  );
};

const TaskModalAttachmentContent = ({
  hide,
  attachmentUrl,
  setAttachmentUrl,
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
            Add Attachment
          </Typography>
          <UrlInput
            hide={hide}
            attachmentUrl={attachmentUrl}
            setAttachmentUrl={setAttachmentUrl}
          />
        </Box>
      </Box>
    </>
  );
};

const TaskModalAttachment = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState(taskDetails.attachmentUrl);

  const hide = (actionType, value = "") => {
    if (actionType === "save") {
      setTaskDetails((prev) => ({
        ...prev,
        attachmentUrl: value.url,
      }));
      setOpen(false);
    } else if (actionType === "clear") {
      setAttachmentUrl("");
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
          <TaskModalAttachmentContent
            hide={hide}
            attachmentUrl={attachmentUrl}
            setAttachmentUrl={setAttachmentUrl}
          />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <div className={style.taskSidebar_box_btn}>
          <LinkOutlined />
          <Typography fontSize={"0.9rem"}>Attachment</Typography>
        </div>
      </Popover>
    </>
  );
};

export default TaskModalAttachment;
