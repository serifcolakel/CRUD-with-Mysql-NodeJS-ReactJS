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
        display: "grid",
        gridTemplateRows: "repeat(auto-fit, minmax(800px, 1024px))",
        maxWidth: "1240px",
        padding: "10px",
        height: "100%",
        gap: "20px",
      }}
    >
      {blogs.map((blog, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid black",
            width: "100%",
          }}
        >
          <p>{blog.title}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      ))}
    </div>
  );
}
