import React from "react";
import { Table, Tag, Space, Button } from "antd";

export default function CustomTable({ users, deleteUser, updateUser }) {
  const columns = [
    {
      title: "İmage",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000/images/${image}`}
          alt="server-logo"
          style={{
            borderRadius: "50%",
            border: "1px solid black",
          }}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Ülke",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (tag) => (
        <Tag color={tag.length > 10 ? "cyan" : "blue"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => <Tag color="green">{salary} $</Tag>,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              updateUser(record);
              console.log(record);
            }}
          >
            Update User
          </Button>
          <Button type="danger" onClick={() => deleteUser(record.id)}>
            Delete User
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      style={{
        overflow: window.innerWidth > 768 ? "none" : "scroll",
      }}
      columns={columns}
      dataSource={users}
    />
  );
}
