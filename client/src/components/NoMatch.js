import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <Result
      style={{
        display: "flex",
        width: "100%",
        height: window.innerWidth > 768 ? "80vh" : "90vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
}
