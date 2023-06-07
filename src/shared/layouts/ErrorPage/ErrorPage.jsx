import React from "react";
import { Button, Card, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import style from "./style.module.css";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box className={style.container}>
        <Card>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button
                type="primary"
                onClick={() => navigate(`/admin/dashboard`)}
              >
                Back Home
              </Button>
            }
          />
        </Card>
      </Box>
    </>
  );
};

export default ErrorPage;
