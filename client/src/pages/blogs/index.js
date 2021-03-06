import React, { useState } from "react";
import { openNotification } from "../../utils/notification";
import { Button, Input, message } from "antd";
import CustomTable from "../../components/CustomTable";
import CreateBlog from "./CreateBlog";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import UpdateBlog from "./UpdateBlog";
import instance from "../../auth/useAxios";

export default function Blogs({ user }) {
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
      render: (text) => (
        <div dangerouslySetInnerHTML={{ __html: text.slice(0, 50) + "..." }} />
      ),
    },
    {
      title: "Güncelle",
      key: "update",
      render: (text, record) => (
        <Button
          style={{
            backgroundColor: "#FF9F43",
            borderColor: "#FF9F43",
            color: "white",
          }}
          icon={<EditOutlined />}
          shape="round"
          onClick={() => {
            updateBlog(record);
          }}
        >
          Güncelle
        </Button>
      ),
    },
    {
      title: "Sil",
      key: "delete",
      render: (text, record) => (
        <Button
          style={{
            color: "white",
          }}
          icon={<DeleteFilled />}
          shape="round"
          type="danger"
          onClick={() => deleteBlog(record.id)}
        >
          Sil
        </Button>
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
      ...content,
      user_id: user.id,
    };
    try {
      instance.post("/new-blog", newBlog).then((res) => {
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
    try {
      instance.delete(`/blog/${id}`).then((res) => {
        getBlogs();
        openNotification("success", "Blog Başarıyla Silindi");
      });
    } catch (error) {
      openNotification("error", error.message);
    }
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
