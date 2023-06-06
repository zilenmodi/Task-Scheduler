import React, { useState } from "react";
import { Popover, Button, Row, Col, Select } from "antd";
import { Box, Typography } from "@mui/material";
import { UserOutlined } from "@ant-design/icons";
import style from "../style.module.css";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../redux/usersSlice/usersSlice";

const TaskModalMembersContent = ({ hide, membersList, setMembersList }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users);

  return (
    <>
      <Box
        sx={{
          width: "260px",
        }}
      >
        <Box>
          <Typography fontSize="0.9rem" fontWeight={500} sx={{ mb: 2 }}>
            Choose members
          </Typography>
          <Box sx={{ mb: 2 }}></Box>
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

const TaskModalMembers = () => {
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [open, setOpen] = useState(false);
  const [membersList, setMembersList] = useState(taskDetails.membersList);

  const hide = (actionType) => {
    if (actionType === "save") {
      setTaskDetails((prev) => ({ ...prev, membersList: membersList }));
      setOpen(false);
    } else if (actionType === "clear") {
      setTaskDetails((prev) => ({ ...prev, membersList: [] }));
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
          <TaskModalMembersContent
            hide={hide}
            membersList={membersList}
            setMembersList={setMembersList}
          />
        }
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <div className={style.taskSidebar_box_btn}>
          <UserOutlined />
          <Typography fontSize={"0.9rem"}>Members</Typography>
        </div>
      </Popover>
    </>
  );
};

export default TaskModalMembers;
