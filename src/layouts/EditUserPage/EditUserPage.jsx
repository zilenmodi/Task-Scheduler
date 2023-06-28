import {
  Card,
  Typography,
  Row,
  Col,
  Form,
  Input,
  Button,
} from "antd";
import React from "react";
import style from "./style.module.css";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@tanstack/react-query";
import { getUsersFromDatabase } from "../../Helper/firebasedb";
import { useUpdateUsersMutation } from "../../Helper/usersMutations";

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

const EditUserPage = ({ projectOptions }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth.userDetails.uid);
  const navigate = useNavigate();
  const { data: users } = useQuery(["users"], () =>
    getUsersFromDatabase(adminId)
  );
  const updateUserMutate = useUpdateUsersMutation();

  const [userWithId] = users?.filter((user) => user.userId === id);

  const initialValue = {
    firstName: userWithId.firstName,
    lastName: userWithId.lastName,
    email: userWithId.email,
    assignProjects: userWithId.assignProjects,
    city: userWithId.city,
    country: userWithId.country,
    description: userWithId.description,
    addedAt: userWithId.addedAt,
    department: userWithId.department,
    jobTitle: userWithId.jobTitle,
    collegeName: userWithId.collegeName,
    branchName: userWithId.branchName,
  };

  const onFinishForm = (values) => {
    const updatedUser = {
      userId: userWithId.userId,
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
      createdBy: userWithId.createdBy,
    };

    updateUserMutate.mutate(updatedUser);
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className={style.container}>
        <Card>
          <Typography.Title level={3} className={style.form_heading}>
            Update Employee
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
      </div>
    </>
  );
};

export default EditUserPage;
