import { Form, Button, Input, Checkbox } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/authSlice/authSlice";
import style from "./style.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(loginUser({ values, navigate }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={style.login_page}>
      <div className={style.login_box}>
        <div className={style.illustration_wrapper}>
          <img
            src="https://img.freepik.com/free-vector/blogging-isometric-concept-with-content-plan-making-process-3d-illustration_1284-55140.jpg?w=826&t=st=1687508016~exp=1687508616~hmac=d8c6e6a69eae06985607fd0efe0a7d19c03bfc52ca0889f1e9bced0dd8172210"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={style.login_form}
        >
          <p className={style.form_title}>Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
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

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
