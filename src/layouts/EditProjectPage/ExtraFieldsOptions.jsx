import { Select, Form, Row, Col, Button } from "antd";
import React, { useState } from "react";
import TextInput from "./ExtraFields/TextInput";
import { nanoid } from "@reduxjs/toolkit";
import DropdownInput from "./ExtraFields/DropdownInput";

const typesOptions = [
  {
    label: "Text Field",
    value: "text",
  },
  {
    label: "Board Values",
    value: "multiple",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Url",
    value: "url",
  },
];

const ExtraFieldsOptions = ({ commonProperties, setCommonProperties }) => {
  const [form] = Form.useForm();
  const initialValue = {
    properties: null,
  };

  const onFinishForm = (e) => {
    setCommonProperties([
      ...commonProperties,
      {
        id: nanoid(),
        type: e.properties,
        label: e.properties.charAt(0) + e.properties.slice(1),
      },
    ]);
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishForm}
        initialValues={initialValue}
      >
        <Row gutter={[16]} style={{ width: "100%" }}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item name="properties" label="Properties">
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select property"
                options={typesOptions}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                + Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {commonProperties.map((cp) => {
        return (
          <TextInput
            key={cp.id}
            cp={cp}
            commonProperties={commonProperties}
            setCommonProperties={setCommonProperties}
          />
        );
      })}
    </>
  );
};

export default ExtraFieldsOptions;
