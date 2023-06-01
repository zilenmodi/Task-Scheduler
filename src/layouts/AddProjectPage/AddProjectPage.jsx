import {
  Card,
  Typography,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
} from "antd";
import React, { useState } from "react";
import style from "./style.module.css";
import { Select, Space } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewProject } from "../../redux/projectsSlice/projectsSlice";
import { useNavigate } from "react-router";

// const employessOptions = [
//   {
//     label: "Vivek",
//     value: "Vivek",
//   },
//   {
//     label: "Zilen",
//     value: "Zilen",
//   },
//   {
//     label: "Abhishek",
//     value: "Abhishek",
//   },
//   {
//     label: "Ritesh",
//     value: "Ritesh",
//   },
//   {
//     label: "Honey",
//     value: "Honey",
//   },
//   {
//     label: "Kashyap",
//     value: "Kashyap",
//   },
//   {
//     label: "Vanshita",
//     value: "Vanshita",
//   },
//   {
//     label: "Prince",
//     value: "Prince",
//   },
//   {
//     label: "Gunjan",
//     value: "Gunjan",
//   },
//   {
//     label: "Harsh",
//     value: "Harsh",
//   },
//   {
//     label: "Jupin",
//     value: "Jupin",
//   },
//   {
//     label: "Vatsal",
//     value: "Vatsal",
//   },
// ];

const priorityOptions = [
  {
    label: "High",
    value: "High",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Low",
    value: "Low",
  },
  {
    label: "None",
    value: "None",
  },
];

const technologiesOptions = [
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "React", value: "React" },
  { label: "Angular", value: "Angular" },
  { label: "Vue.js", value: "Vue.js" },
  { label: "Node.js", value: "Node.js" },
  { label: "Express.js", value: "Express.js" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "MySQL", value: "MySQL" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C#", value: "C#" },
  { label: "PHP", value: "PHP" },
  { label: "Ruby", value: "Ruby" },
  { label: "Swift", value: "Swift" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Django", value: "Django" },
  { label: "Flask", value: "Flask" },
  { label: "ASP.NET", value: "ASP.NET" },
  { label: "Laravel", value: "Laravel" },
  { label: "Spring Boot", value: "Spring Boot" },
  { label: "Bootstrap", value: "Bootstrap" },
  { label: "Sass", value: "Sass" },
  { label: "Less", value: "Less" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "GraphQL", value: "GraphQL" },
  { label: "RESTful API", value: "RESTful API" },
  { label: "Git", value: "Git" },
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "AWS (Amazon Web Services)", value: "AWS (Amazon Web Services)" },
  { label: "Azure", value: "Azure" },
  { label: "Google Cloud Platform", value: "Google Cloud Platform" },
  { label: "Firebase", value: "Firebase" },
  { label: "TensorFlow", value: "TensorFlow" },
  { label: "PyTorch", value: "PyTorch" },
  { label: "Unity", value: "Unity" },
  { label: "Unreal Engine", value: "Unreal Engine" },
  { label: "Xamarin", value: "Xamarin" },
  { label: "Flutter", value: "Flutter" },
  { label: "Ionic", value: "Ionic" },
  { label: "Electron", value: "Electron" },
  { label: "Apache Kafka", value: "Apache Kafka" },
  { label: "Redis", value: "Redis" },
  { label: "Elasticsearch", value: "Elasticsearch" },
  { label: "Jenkins", value: "Jenkins" },
  { label: "Ansible", value: "Ansible" },
];

const AddProjectPage = ({ employeeOptions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    projectName: "",
    assignTo: [],
    priority: null,
    technologies: [],
    dueDate: null,
  };

  const onFinishForm = (values) => {
    const newProject = {
      projectId: nanoid(),
      projectName: values.projectName,
      createBy: "Zilen Modi",
      createAt: new Date().toString(),
      dueDate: values.dueDate ? values.dueDate.toString() : null,
      boards: [],
      tags: values.technologies,
      assignTo: values.assignTo,
      priority: values.priority,
    };

    dispatch(addNewProject(newProject));

    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className={style.container}>
        <Card>
          <Typography.Title level={3} className={style.form_heading}>
            Add New Project
          </Typography.Title>
          <Form
            layout="vertical"
            onFinish={onFinishForm}
            initialValues={initialValue}
          >
            <Row gutter={[16]} style={{ width: "100%" }}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="projectName"
                  label="Project Name"
                  rules={[
                    { required: true, message: "Please enter project name" },
                    { min: 2, message: "Name must be at least 2 characters" },
                    {
                      whitespace: true,
                      message: "Whitespace-only input is not allowed",
                    },
                  ]}
                  required
                >
                  <Input placeholder="Project name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="assignTo" label="Assign To">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select employess"
                    options={employeeOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="priority"
                  label="Priority"
                  required
                  rules={[{ required: true, message: "Please select options" }]}
                >
                  <Select
                    placeholder="Please select priority"
                    style={{
                      width: "100%",
                    }}
                    options={priorityOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="technologies"
                  label="Technologies"
                  required
                  rules={[{ required: true, message: "Please select options" }]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select technologies"
                    options={technologiesOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="dueDate" label="Due date">
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={(date) => date < new Date()}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "1rem" }}
              >
                Create
              </Button>
              <Button
                onClick={() => navigate("/admin/dashboard")}
                htmlType="submit"
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
              >
                Back
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AddProjectPage;
