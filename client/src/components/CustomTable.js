import React from "react";
import { Table, Tag, Space, Button } from "antd";

export default function CustomTable({ data, columns }) {
  return (
    <Table
      style={{
        overflow: window.innerWidth > 768 ? "none" : "scroll",
        width: window.innerWidth > 768 ? "80%" : "100%",
      }}
      pagination={() => {
        return {
          pageSize: window.innerWidth > 768 ? 10 : 5,
        };
      }}
      footer={() => (
        <p>
          <b>Kullanıcı Sayısı : </b> {data.length}
        </p>
      )}
      columns={columns}
      dataSource={data}
    />
  );
}
