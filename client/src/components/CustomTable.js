import React from "react";
import { Table } from "antd";

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
          <b>Toplam sayı : </b> {data.length}
        </p>
      )}
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
    />
  );
}
