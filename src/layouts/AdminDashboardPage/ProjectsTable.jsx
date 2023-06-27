import React from "react";
import { auto } from "@popperjs/core";
import { Space, Table, Tag, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteProject } from "../../redux/projectsSlice/projectsSlice";
import { VALUE_SPLIT } from "rc-cascader/lib/utils/commonUtil";

const technologiesColors = {
  HTML: "magenta",
  CSS: "lime",
  JavaScript: "green",
  React: "orange",
  Angular: "gold",
  "Vue.js": "cyan",
  "Node.js": "blue",
  "Express.js": "geekblue",
  MongoDB: "volcano",
  MySQL: "red",
  PostgreSQL: "magenta",
  Python: "lime",
  Java: "green",
  "C#": "orange",
  PHP: "gold",
  Ruby: "cyan",
  Swift: "blue",
  Kotlin: "geekblue",
  TypeScript: "volcano",
  Django: "red",
  Flask: "magenta",
  "ASP.NET": "lime",
  Laravel: "green",
  "Spring Boot": "orange",
  Bootstrap: "gold",
  Sass: "cyan",
  Less: "blue",
  "Tailwind CSS": "geekblue",
  GraphQL: "volcano",
  "RESTful API": "red",
  Git: "magenta",
  Docker: "lime",
  Kubernetes: "green",
  "AWS (Amazon Web Services)": "orange",
  Azure: "gold",
  "Google Cloud Platform": "cyan",
  Firebase: "blue",
  TensorFlow: "geekblue",
  PyTorch: "volcano",
  Unity: "red",
  "Unreal Engine": "magenta",
  Xamarin: "lime",
  Flutter: "green",
  Ionic: "orange",
  Electron: "gold",
  "Apache Kafka": "cyan",
  Redis: "blue",
  Elasticsearch: "geekblue",
  Jenkins: "volcano",
  Ansible: "red",
};

const propertiesOptions = [
  {
    label: "createBy",
    value: "createBy",
  },
  {
    label: "assignedTo",
    value: "assignedTo",
  },
  {
    label: "priority",
    value: "priority",
  },
  {
    label: "tags",
    value: "tags",
  },
  {
    label: "createAt",
    value: "createAt",
  },
  {
    label: "dueDate",
    value: "dueDate",
  },
];

const ProjectsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const status = useSelector((state) => state.projects.status);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      render: (text, { key }) => (
        <NavLink to={`/projects/${key}`}>{text}</NavLink>
      ),
    },
    // {
    //   title: "Create By",
    //   dataIndex: "createBy",
    //   key: "createBy",
    // },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      filters: [
        { text: "High", value: "High" },
        { text: "Medium", value: "Medium" },
        { text: "Low", value: "Low" },
        { text: "None", value: "None" },
      ],
      onFilter: (value, record) => record.priority === value,
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
                {priority}
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
      filters: [
        { text: "HTML", value: "HTML" },
        { text: "CSS", value: "CSS" },
        { text: "JavaScript", value: "JavaScript" },
        { text: "React", value: "React" },
        { text: "Angular", value: "Angular" },
        { text: "Vue.js", value: "Vue.js" },
        { text: "Node.js", value: "Node.js" },
        { text: "Express.js", value: "Express.js" },
        { text: "MongoDB", value: "MongoDB" },
        { text: "MySQL", value: "MySQL" },
        { text: "PostgreSQL", value: "PostgreSQL" },
        { text: "Python", value: "Python" },
        { text: "Java", value: "Java" },
        { text: "C#", value: "C#" },
        { text: "PHP", value: "PHP" },
        { text: "Ruby", value: "Ruby" },
        { text: "Swift", value: "Swift" },
        { text: "Kotlin", value: "Kotlin" },
        { text: "TypeScript", value: "TypeScript" },
        { text: "Django", value: "Django" },
        { text: "Flask", value: "Flask" },
        { text: "ASP.NET", value: "ASP.NET" },
        { text: "Laravel", value: "Laravel" },
        { text: "Spring Boot", value: "Spring Boot" },
        { text: "Bootstrap", value: "Bootstrap" },
        { text: "Sass", value: "Sass" },
        { text: "Less", value: "Less" },
        { text: "Tailwind CSS", value: "Tailwind CSS" },
        { text: "GraphQL", value: "GraphQL" },
        { text: "RESTful API", value: "RESTful API" },
        { text: "Git", value: "Git" },
        { text: "Docker", value: "Docker" },
        { text: "Kubernetes", value: "Kubernetes" },
        {
          text: "AWS (Amazon Web Services)",
          value: "AWS (Amazon Web Services)",
        },
        { text: "Azure", value: "Azure" },
        { text: "Google Cloud Platform", value: "Google Cloud Platform" },
        { text: "Firebase", value: "Firebase" },
        { text: "TensorFlow", value: "TensorFlow" },
        { text: "PyTorch", value: "PyTorch" },
        { text: "Unity", value: "Unity" },
        { text: "Unreal Engine", value: "Unreal Engine" },
        { text: "Xamarin", value: "Xamarin" },
        { text: "Flutter", value: "Flutter" },
        { text: "Ionic", value: "Ionic" },
        { text: "Electron", value: "Electron" },
        { text: "Apache Kafka", value: "Apache Kafka" },
        { text: "Redis", value: "Redis" },
        { text: "Elasticsearch", value: "Elasticsearch" },
        { text: "Jenkins", value: "Jenkins" },
        { text: "Ansible", value: "Ansible" },
      ],
      onFilter: (value, record) => record.tags.includes(value),
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            let color = technologiesColors[tag];

            return (
              <Tag color={color} key={tag} style={{ margin: "3px" }}>
                {tag}
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
      sorter: (a, b) => {
        const date1 = a.dueDate !== "No Due" ? new Date(a.dueDate) : new Date();
        const date2 = b.dueDate !== "No Due" ? new Date(b.dueDate) : new Date();
        return date1 - date2;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, { key }) => (
        <Space size="middle">
          <NavLink to={`/projects/${key}/edit`}>Edit</NavLink>
          <NavLink onClick={() => dispatch(deleteProject(key))}>Delete</NavLink>
        </Space>
      ),
    },
  ];

  const [currentColumns, setCurrentColumns] = useState(columns);

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

  const handleChangeSelectProperties = (values) => {
    const newProperties = ["name", ...values, "action"];
    const newColumnsData = columns.filter((column) => {
      if (newProperties.includes(column.key)) {
        return column;
      }
    });
    setCurrentColumns(values.length ? newColumnsData : columns);
  };

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
        <Select
          mode="multiple"
          allowClear
          style={{ marginRight: "1rem", width: "200px" }}
          placeholder="Please select properties"
          onChange={handleChangeSelectProperties}
          options={propertiesOptions}
        />
        <Button type="primary" onClick={() => navigate("/projects/add")}>
          Add New Project
        </Button>
      </div>
      <Table
        style={{ marginTop: "1rem", overflow: auto }}
        columns={currentColumns}
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

export default ProjectsTable;
