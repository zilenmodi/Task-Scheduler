import { Form, Button, Input, Radio } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../../redux/authSlice/authSlice";
import style from "./style.module.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOrganisation, setIsOrganisation] = useState(false);
  const onFinish = (values) => {
    dispatch(signUpUser({ values, navigate }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRadioChange = (e) => {
    if (e.target.value === "Organisation") {
      setIsOrganisation(true);
    } else {
      setIsOrganisation(false);
    }
  };

  return (
    <div className={style.login_page}>
      <div className={style.login_box}>
        <div className={style.illustration_wrapper}>
          <img
            src="https://img.freepik.com/free-vector/employer-meeting-job-applicant-pre-employment-assessment-employee-evaluation-assessment-form-report-performance-review-concept-illustration_335657-2058.jpg?w=1380&t=st=1687511759~exp=1687512359~hmac=c0e001bda953e69b92ce924bf5aa77887ac7cc7c630f49863d6acbc5d1d5d94d"
            alt="Signup"
          />
        </div>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={style.login_form}
        >
          <p className={style.form_title}>Sign Up</p>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item
            name="accountType"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(new Error("Please select an option"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Radio.Group onChange={handleRadioChange}>
              <Radio value={"Personal"}>Personal</Radio>
              <Radio value={"Organisation"}>Organisation</Radio>
            </Radio.Group>
          </Form.Item>

          {isOrganisation && (
            <Form.Item
              name="orgname"
              rules={[
                { required: true, message: "Please input your org name!" },
              ]}
            >
              <Input placeholder="Organisation Name" />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please enter your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={style.login_form_button}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const SignupPage = () => {
  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
