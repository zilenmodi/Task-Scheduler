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
import { Select } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { useUpdateProjectsMutation } from "../../Helper/projectsMutations";
import { getProjectFromDatabase } from "../../Helper/firebasedb";
import { useQuery } from "@tanstack/react-query";

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

const EditProjectPage = ({ employeeOptions }) => {
  const { id } = useParams();
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const navigate = useNavigate();
  const { data: projectsData, isLoading } = useQuery(
    ["projects"],
    () => getProjectFromDatabase(adminId)
  );
  const updateProjectMutate = useUpdateProjectsMutation();

  const [projectWithId] = projectsData?.filter(
    (project) => project.projectId === id
  );

  const initialValue = {
    projectName: projectWithId.projectName,
    assignTo: projectWithId.assignTo,
    priority: projectWithId.priority,
    technologies: projectWithId.tags,
    dueDate: projectWithId.dueDate ? dayjs(projectWithId.dueDate) : null,
  };

  const onFinishForm = (values) => {
    const updatedProject = {
      projectId: id,
      projectName: values.projectName,
      createdBy: projectWithId.createdBy,
      createAt: projectWithId.createAt,
      dueDate: values.dueDate ? values.dueDate.toString() : null,
      boards: projectWithId.boards,
      tasks: projectWithId.tasks,
      tags: values.technologies,
      assignTo: values.assignTo,
      priority: values.priority,
    };

    updateProjectMutate.mutate(updatedProject);
    navigate("/admin/dashboard");
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className={style.container}>
        <Card>
          <Typography.Title level={3} className={style.form_heading}>
            Edit Project
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
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select priority"
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
                Save
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
        {/* <Card>
          <Typography.Title level={3} className={style.form_heading}>
            Extra Fields for Tasks
          </Typography.Title>
          <ExtraFieldsOptions
            commonProperties={commonProperties}
            setCommonProperties={setCommonProperties}
          />
        </Card> */}
      </div>
    </>
  );
};

export default EditProjectPage;
