import React, { useState } from "react";
import { openNotification } from "../../utils/notification";
import { Button, Input, message, Space } from "antd";
import CustomTable from "../../components/CustomTable";
import CreateBlog from "./CreateBlog";
import UpdateBlog from "./UpdateBlog";
import instance from "../../auth/useAxios";

export default function Blogs() {
  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "İçerik",
      dataIndex: "content",
      key: "content",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              updateBlog(record);
            }}
          >
            Update Blog
          </Button>
          <Button type="danger" onClick={() => deleteBlog(record.id)}>
            Delete Blog
          </Button>
        </Space>
      ),
    },
  ];
  const { Search } = Input;

  const initialValues = {
    title: null,
  };

  const [data, setData] = useState(initialValues);
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  function handleSubmit(content) {
    let newBlog = {
      title: data.title,
      content: content,
    };
    try {
      instance
        .post("/new-blog", newBlog, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          getBlogs();
          setIsCreate(false);
        });
    } catch (error) {
      message.error("Error");
    }
  }

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
  // function getBlog(id) {
  //   instance.get(`http://localhost:5000/api/blog/${id}`).then((res) => {
  //     console.log(res.data[0]);
  //   });
  // }
  function deleteBlog(id) {
    instance
      .delete(`/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        getBlogs();
        openNotification("success", "Blog Başarıyla Silindi");
      });
  }
  function updateBlog(blog) {
    setBlog(blog);
    setIsEdit(true);
  }

  React.useEffect(() => {
    getBlogs();
  }, [isEdit]);
  return (
    <div className="App">
      <div className="container">
        <h5>Blogs Listesi</h5>
        <Search
          placeholder="Input search blogs"
          onSearch={() => console.log("HERE")}
          enterButton
        />
        <Button type="primary" onClick={() => setIsCreate(true)}>
          Create Blogs
        </Button>
      </div>
      {isCreate && (
        <CreateBlog
          data={data}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          handleSubmit={handleSubmit}
          setData={setData}
        />
      )}

      <CustomTable data={blogs} columns={columns} />

      {isEdit && (
        <UpdateBlog
          data={blog}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setUser={setBlog}
          setData={setBlog}
        />
      )}
    </div>
  );
}
