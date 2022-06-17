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
          backgroundColor: "#2855AC",
          overflow: window.innerWidth > 600 ? "hidden" : "scroll",
          color: "white",
        }}
      >
        <Link
          style={{
            color: "white",
          }}
          to="/"
        >
          Welcome to the app!
        </Link>
        <div
          style={{
            ...style.row,
            gap: "10px",
          }}
        >
          <Link
            style={{
              color: "white",
            }}
            to="users"
          >
            Kullanıcılar
          </Link>{" "}
          |{" "}
          <Link
            style={{
              color: "white",
            }}
            to="blogs"
          >
            Blog
          </Link>{" "}
          |{" "}
          <Link
            style={{
              color: "white",
            }}
            to="sliders"
          >
            Slider
          </Link>
          |{" "}
          <Link
            style={{
              color: "white",
            }}
            to="faqs"
          >
            Sık Sorulan Sorular
          </Link>
          |{" "}
          <Link
            style={{
              color: "white",
            }}
            to="menu"
          >
            Menü
          </Link>
          |{" "}
          <Link
            style={{
              color: "white",
            }}
            to="content"
          >
            İçerik
          </Link>
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
