import React from "react";
import { useState } from "react";
import { Popover, Button, Row, Col, Select } from "antd";
import { Box, Typography } from "@mui/material";
import { ClockCircleOutlined } from "@ant-design/icons";
import style from "../style.module.css";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const TaskModalDateContent = ({ hide, dates, setDates }) => {
  return (
    <>
      <Box
        sx={{
          width: "260px",
        }}
      >
        <Box>
          <Typography fontSize="0.9rem" fontWeight={500} sx={{ mb: 2 }}>
            Choose Date
          </Typography>
          <RangePicker
            defaultValue={dayjs(dates)}
            onChange={(value) => setDates(value)}
          />
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

const TaskModalDate = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState(taskDetails.dates);

  const hide = (actionType) => {
    if (actionType === "save") {
      setTaskDetails((prev) => ({
        ...prev,
        dates: dates,
      }));
      setOpen(false);
    } else if (actionType === "clear") {
      setDates(null);
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
          <TaskModalDateContent hide={hide} dates={dates} setDates={setDates} />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <div className={style.taskSidebar_box_btn}>
          <ClockCircleOutlined />
          <Typography fontSize={"0.9rem"}>Dates</Typography>
        </div>
      </Popover>
    </>
  );
};

export default TaskModalDate;
