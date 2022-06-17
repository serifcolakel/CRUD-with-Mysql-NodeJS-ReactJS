import { message } from "antd";
import React from "react";
import instance from "../../auth/useAxios";

export default function Home() {
  const [blogs, setBlogs] = React.useState([]);
  async function getBlogs() {
    try {
      await instance.get("/blog").then((res) => {
        setBlogs(res.data);
      });
    } catch (error) {
      if (error.response.data) {
        message.error(
          "Oturum süreniz sona erdi. Anasayfaya yönlendiriliyorsunuz."
        );
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    }
  }
  React.useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        gap: "20px",
      }}
    >
      {blogs.map((blog, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid black",
            width: "100%",
            padding: "10px",
            height: "auto",
            overflow: "hidden",
          }}
        >
          <h2>{blog.title}</h2>
          <br />
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      ))}
    </div>
  );
}
