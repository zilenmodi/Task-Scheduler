import { Form, Input, Row, Col, Select, Button } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const DropdownInput = ({ type }) => {
  const [currentTags, setCurrentTags] = useState([]);
  const [form] = Form.useForm();
  return (
    <>
      <Form form={form}>
        <Row gutter={[16]} style={{ width: "100%", position: "relative" }}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={`Enter Label`}
              name="label"
              rules={[
                { required: true, message: "Please enter label name" },
                { min: 2, message: "Label must be at least 2 characters" },
                { max: 15, message: "Label must be at most 15 characters" },
                {
                  whitespace: true,
                  message: "Whitespace-only input is not allowed",
                },
              ]}
              required
            >
              <Input placeholder="Enter label for field" />
            </Form.Item>
            <DeleteOutlined
              style={{
                position: "absolute",
                right: "68%",
                top: "15%",
                cursor: "pointer",
              }}
            />
          </Col>
        </Row>
        <Row gutter={[16]} style={{ width: "100%", position: "relative" }}>
          <Col xs={24} md={12} lg={8} style={{ display: "flex" }}>
            <Form.Item
              label={`Enter tag value`}
              name="tag"
              rules={[
                { required: true, message: "Please enter label name" },
                { min: 2, message: "Label must be at least 2 characters" },
                { max: 15, message: "Label must be at most 15 characters" },
                {
                  whitespace: true,
                  message: "Whitespace-only input is not allowed",
                },
              ]}
              required
            >
              <Input placeholder="Enter label for field" />
            </Form.Item>
            <Form.Item name="button">
              <Button
                style={{ marginLeft: "1rem" }}
                type="primary"
                onClick={() => {
                  console.log(form.getFieldError("tag"));
                  if (form.getFieldError("tag").length === 0) {
                    setCurrentTags((prev) => [
                      ...prev,
                      {
                        label: form.getFieldValue("tag"),
                        value: form.getFieldValue("tag"),
                      },
                    ]);
                    form.setFieldValue("tag", "");
                  }
                }}
              >
                <PlusOutlined />
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Select placeholder="See tags" options={currentTags} />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DropdownInput;
