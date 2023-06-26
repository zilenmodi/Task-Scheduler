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
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addNewUser } from "../../redux/usersSlice/usersSlice";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

const jobTitleOptions = [
  {
    label: "Trainee Engineer",
    value: "Trainee Engineer",
  },
  {
    label: "Software Engineer",
    value: "Software Engineer",
  },
  {
    label: "Senior Software Engineer",
    value: "Senior Software Engineer",
  },
  {
    label: "Team Lead",
    value: "Team Lead",
  },
  {
    label: "Team Manager",
    value: "Team Manager",
  },
];

const departmentOptions = [
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: ".net", value: ".net" },
  { label: "PHP", value: "PHP" },
  { label: "Vue.js", value: "Vue.js" },
  { label: "ROR", value: "ROR" },
  { label: "Frontend", value: "Frontend" },
  { label: "UI/UX", value: "UI/UX" },
  { label: "Data Engineering", value: "Data Engineering" },
  { label: "React Native", value: "React Native" },
  { label: "Flutter", value: "Flutter" },
  { label: "Go Lang", value: "Go Lang" },
  { label: "Mean", value: "Mean" },
  { label: "Mern", value: "Mern" },
  { label: "React.js", value: "React.js" },
];

const cityOptions = [
  {
    label: "Ahemdabad",
    value: "Ahemdabad",
  },
  {
    label: "Surat",
    value: "Surat",
  },
  {
    label: "Gandhinagar",
    value: "Gandhinagar",
  },
  {
    label: "Bharuch",
    value: "Bharuch",
  },
  {
    label: "Rajkot",
    value: "Rajkot",
  },
];

const collegeOptions = [
  {
    label: "Vishwakarma Government Engineering College",
    value: "Vishwakarma Government Engineering College",
  },
  {
    label: "L.D College of Engineering",
    value: "L.D College of Engineering",
  },
  {
    label: "GEC Modasa",
    value: "GEC Modasa",
  },
  {
    label: "GIT",
    value: "GIT",
  },
  {
    label: "G.H Patel College",
    value: "G.H Patel College",
  },
  {
    label: "DDIT",
    value: "DDIT",
  },
  {
    label: "Charusat University",
    value: "Charusat University",
  },
  {
    label: "Parul University",
    value: "Parul University",
  },
];

const branchOptions = [
  {
    label: "Computer Engineering",
    value: "Computer Engineering",
  },
  {
    label: "Information Technology",
    value: "Information Technology",
  },
  {
    label: "E.C",
    value: "E.C",
  },
  {
    label: "Civil Engineering",
    value: "Civil Engineering",
  },
  {
    label: "Electrical Engineering",
    value: "Electrical Engineering",
  },
];

const AddUserPage = ({ projectOptions }) => {
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  console.log(adminId, addNewUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    lastname: "",
    email: "",
    assignProjects: [],
    city: null,
    country: null,
    description: "",
    addedAt: null,
    department: null,
    jobTitle: null,
    collegeName: null,
    branchName: null,
  };

  const onFinishForm = (values) => {
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      assignProjects: values.assignProjects,
      city: values.city,
      country: "India",
      description: values.description,
      addedAt: new Date().toString(),
      department: values.department,
      jobTitle: values.jobTitle,
      collegeName: values.collegeName,
      branchName: values.branchName,
      createdBy: adminId,
    };

    console.log(newUser);

    dispatch(addNewUser({ newUser, navigate }));

    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className={style.container}>
        <Card>
          <Typography.Title level={3} className={style.form_heading}>
            Add New Employee
          </Typography.Title>
          <Form
            layout="vertical"
            onFinish={onFinishForm}
            initialValues={initialValue}
          >
            <Row gutter={[16]} style={{ width: "100%" }}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter user's first name",
                    },
                    { min: 2, message: "Name must be at least 2 characters" },
                    {
                      whitespace: true,
                      message: "Whitespace-only input is not allowed",
                    },
                  ]}
                  required
                >
                  <Input placeholder="User first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter user's last name",
                    },
                    { min: 2, message: "Name must be at least 2 characters" },
                    {
                      whitespace: true,
                      message: "Whitespace-only input is not allowed",
                    },
                  ]}
                  required
                >
                  <Input placeholder="User last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter user's email",
                    },
                    {
                      whitespace: true,
                      message: "Whitespace-only input is not allowed",
                    },
                  ]}
                  required
                >
                  <Input type="email" placeholder="User email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="city"
                  label="City"
                  required
                  rules={[{ required: true, message: "Please select option" }]}
                >
                  <Select
                    allowClear
                    placeholder="Please select city"
                    style={{
                      width: "100%",
                    }}
                    options={cityOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="department"
                  label="department"
                  required
                  rules={[{ required: true, message: "Please select option" }]}
                >
                  <Select
                    allowClear
                    placeholder="Please select department"
                    style={{
                      width: "100%",
                    }}
                    options={departmentOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="jobTitle"
                  label="Job Title"
                  required
                  rules={[{ required: true, message: "Please select option" }]}
                >
                  <Select
                    allowClear
                    placeholder="Please select job title"
                    style={{
                      width: "100%",
                    }}
                    options={jobTitleOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="collegeName"
                  label="College Name"
                  required
                  rules={[{ required: true, message: "Please select option" }]}
                >
                  <Select
                    allowClear
                    placeholder="Please select college name"
                    style={{
                      width: "100%",
                    }}
                    options={collegeOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  name="branchName"
                  label="Branch Name"
                  required
                  rules={[{ required: true, message: "Please select option" }]}
                >
                  <Select
                    allowClear
                    placeholder="Please select branch name"
                    style={{
                      width: "100%",
                    }}
                    options={branchOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="assignProjects" label="Assign Projects">
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please assign projects"
                    style={{
                      width: "100%",
                    }}
                    options={projectOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      whitespace: true,
                      message: "Whitespace-only input is not allowed",
                    },
                  ]}
                >
                  <TextArea
                    type="description"
                    placeholder="User description (Optional)"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
              {/* <Col xs={24} md={12} lg={8}>
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
              </Col> */}
              {/* <Col xs={24} md={12} lg={8}>
                <Form.Item name="dueDate" label="Due date">
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={(date) => date < new Date()}
                  />
                </Form.Item>
              </Col> */}
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

export default AddUserPage;
