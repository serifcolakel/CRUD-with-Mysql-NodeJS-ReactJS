import React from "react";
import { Table } from "antd";

export default function CustomTable({ data, columns }) {
  return (
    <Table
      style={{
        overflow: window.innerWidth > 768 ? "none" : "scroll",
        width: window.innerWidth > 768 ? "80%" : "100%",
      }}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Toplam ${total} kayıt`,
        // itemRender: (current, type, originalElement) => {
        //   if (type === "prev") {
        //     return <a>Önceki</a>;
        //   }
        //   if (type === "next") {
        //     return <a>Sonraki</a>;
        //   }
        //   return originalElement;
        // },
        //nextIcon: <a>Sonraki</a>,
        //prevIcon: <a>Önceki</a>,
      }}
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
    />
  );
}
