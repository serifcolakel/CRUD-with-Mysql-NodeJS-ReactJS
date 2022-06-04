import React from "react";
import "../index.css";
import { Link, Outlet } from "react-router-dom";
const style = {
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default function Layout() {
  return (
    <div>
      <nav
        style={{
          ...style.row,
          padding: "10px",
          maxWidth: "1240px",
          margin: "0 auto 80px auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Link to="/">Welcome to the app!</Link>
        <div
          style={{
            ...style.row,
            gap: "10px",
          }}
        >
          <Link to="user">Users</Link> | <Link to="blogs">Blogs</Link> |{" "}
          <Link to="blogs">Blogs</Link>
        </div>
      </nav>
      <div
        style={{
          ...style.col,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
