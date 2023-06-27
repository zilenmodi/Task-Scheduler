import React from "react";
import { auto } from "@popperjs/core";
import { Space, Table, Tag, Button, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteProject } from "../../redux/projectsSlice/projectsSlice";
import { deleteUser } from "../../redux/usersSlice/usersSlice";

const departmentColors = {
  Python: "gold",
  Java: "orange",
  ".net": "magenta",
  PHP: "lime",
  "Vue.js": "green",
  ROR: "magenta",
  Frontend: "cyan",
  "UI/UX": "blue",
  "Data Engineering": "red",
  "React Native": "blue",
  Flutter: "geekblue",
  "Go Lang": "cyan",
  Mean: "green",
  Mern: "magenta",
  "React.js": "geekblue",
};

const UsersTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      minWidth: "500px",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Assigned Projects",
    //   dataIndex: "assignedProjects",
    //   key: "assignedProjects",
    // },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Added At",
      dataIndex: "addedAt",
      key: "addedAt",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "College Name",
      dataIndex: "collegeName",
      key: "collegeName",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key }) => (
        <Space size="middle">
          <NavLink to={`/users/${key}/edit`}>Edit</NavLink>
          <NavLink onClick={() => dispatch(deleteUser(key))}>Delete</NavLink>
        </Space>
      ),
    },
  ];

  const data = users?.map((user) => {
    return {
      key: user.userId,
      fname: user.firstName,
      lname: user.lastName,
      email: user.email,
      city: user.city,
      country: user.country,
      department: user.department,
      jobTitle: user.jobTitle,
      collegeName: user.collegeName,
      branchName: user.branchName,
      addedAt: new Date(user.addedAt).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
  });

  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {/* <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          options={options}
        /> */}
        <Button type="primary" onClick={() => navigate("/users/add")}>
          Add New Employee
        </Button>
      </div>
      <Table
        style={{ marginTop: "1rem", overflow: auto }}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10"],
        }}
        loading={status == "pending" ? true : false}
      />
    </>
  );
};

export default UsersTable;
