import React, { useState } from "react";
import { Popover, Button, Row, Col, Select } from "antd";
import { Box, Typography } from "@mui/material";
import { TagOutlined } from "@ant-design/icons";
import style from "../style.module.css";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Space, Tag } from "antd";
import { useRef } from "react";

let index = 0;
const LabelsSelectBox = ({
  labelsList,
  setLabelsList,
  allLabelsList,
  setAllLabelsList,
}) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setName("");
    setAllLabelsList([...allLabelsList, name || `New item ${index++}`]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      defaultValue={labelsList}
      onChange={(value) => setLabelsList(value)}
      mode="multiple"
      allowClear
      style={{
        width: "100%",
      }}
      placeholder="Select Labels"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Space
            style={{
              padding: "0 8px 4px",
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={allLabelsList.map((item) => ({
        label: item,
        value: item,
      }))}
    />
  );
};

const TaskModalLabelsContent = ({
  hide,
  labelsList,
  setLabelsList,
  allLabelsList,
  setAllLabelsList,
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
            Choose labels
          </Typography>
          <Box sx={{ mb: 2 }}>
            <LabelsSelectBox
              labelsList={labelsList}
              setLabelsList={setLabelsList}
              allLabelsList={allLabelsList}
              setAllLabelsList={setAllLabelsList}
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

const TaskModalLabels = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [labelsList, setLabelsList] = useState(taskDetails.labelsList);
  const [allLabelsList, setAllLabelsList] = useState(taskDetails.allLabelsList);

  const hide = (actionType) => {
    if (actionType === "save") {
      setTaskDetails((prev) => ({
        ...prev,
        allLabelsList: allLabelsList,
        labelsList: labelsList,
      }));
      setOpen(false);
    } else if (actionType === "clear") {
      setTaskDetails((prev) => ({
        ...prev,
        allLabelsList: [],
        labelsList: [],
      }));
      setLabelsList([]);
      setAllLabelsList([]);
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
          <TaskModalLabelsContent
            hide={hide}
            labelsList={labelsList}
            setLabelsList={setLabelsList}
            allLabelsList={allLabelsList}
            setAllLabelsList={setAllLabelsList}
          />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <div className={style.taskSidebar_box_btn}>
          <TagOutlined />
          <Typography fontSize={"0.9rem"}>Labels</Typography>
        </div>
      </Popover>
    </>
  );
};

export default TaskModalLabels;
