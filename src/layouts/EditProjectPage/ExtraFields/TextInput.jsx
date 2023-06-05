import { Form, Input, Row, Col, Button } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const TextInput = ({ cp, commonProperties, setCommonProperties }) => {
  const [valueSave, setValueSave] = useState(true);
  const [form] = Form.useForm();
  const { id, type, label } = cp;
  const handleDeleteProperty = () => {
    const filterProperties = commonProperties.filter((cp) => cp.id !== id);
    setCommonProperties(filterProperties);
  };
  const initialValue = {
    label: label,
  };

  return (
    <>
      <Form
        initialValues={initialValue}
        form={form}
        layout="vertical"
        onFinish={(e) => {
          setValueSave(true);
          const filterProperties = commonProperties.map((cp) => {
            if (cp.id === id) {
              return { ...cp, label: e.label };
            }
            return cp;
          });
          setCommonProperties(filterProperties);
        }}
      >
        <Row gutter={[16]}>
          <Col
            xs={24}
            md={12}
            lg={8}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Form.Item
              label={`${type.charAt(0).toUpperCase()}${type.slice(1)} Label`}
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
              style={{
                width: "100%",
              }}
              required
            >
              <Input
                placeholder="Enter label for field"
                onClick={() => setValueSave(false)}
              />
            </Form.Item>
            <DeleteOutlined onClick={handleDeleteProperty} />
            <Button
              type="primary"
              disabled={valueSave === true ? true : false}
              htmlType="submit"
            >
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default TextInput;
