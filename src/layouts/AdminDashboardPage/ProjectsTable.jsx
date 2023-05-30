import React from "react";
import { auto } from "@popperjs/core";
import { Space, Table, Tag, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

let colors = [
  "magenta",
  "lime",
  "green",
  "orange",
  "gold",
  "cyan",
  "blue",
  "geekblue",
  "volcano",
];

const columns = [
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Create By",
    dataIndex: "createBy",
    key: "createBy",
  },
  {
    title: "Assigned To",
    dataIndex: "assignedTo",
    key: "assignedTo",
  },
  {
    title: "Priority",
    key: "priority",
    dataIndex: "priority",
    render: (_, { priority }) => {
      let color = "blue";
      switch (priority) {
        case "High":
          color = "red";
          break;
        case "Medium":
          color = "gold";
          break;
        case "Low":
          color = "green";
          break;
      }

      return (
        <>
          {priority?.length && (
            <Tag color={color} key={priority}>
              {priority?.toUpperCase()}
            </Tag>
          )}
        </>
      );
    },
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    width: 300,
    render: (_, { tags }) => (
      <>
        {tags?.map((tag) => {
          let random = Math.floor(Math.random() * 9);
          let color = colors[random];

          return (
            <Tag color={color} key={tag} style={{ margin: "3px" }}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Create At",
    dataIndex: "createAt",
    key: "createAt",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const ProjectsTable = () => {
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);

  if (status === "pending") {
    return <h1>Loading</h1>;
  }

  const data = projects?.map((project) => {
    return {
      key: project.projectId,
      name: project.projectName,
      createBy: project.createBy,
      assignedTo: project.assignTo.length,
      priority: project.priority,
      tags: project.tags,
      createAt: new Date(project.createAt).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      dueDate: project.dueDate
        ? new Date(project.dueDate).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "No Due",
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
        <Button type="primary" onClick={() => navigate("/projects/add")}>
          Add New Project
        </Button>
      </div>
      <Table
        style={{ marginTop: "1rem", overflow: auto }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default ProjectsTable;
