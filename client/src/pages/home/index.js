import axios from "axios";
import React from "react";

export default function Home() {
  const [blogs, setBlogs] = React.useState([]);
  function getBlogs() {
    axios.get("http://localhost:5000/api/blog").then((res) => {
      setBlogs(res.data);
    });
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
