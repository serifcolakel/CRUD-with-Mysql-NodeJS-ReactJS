import React, { useState } from "react";
import { openNotification } from "../../utils/notification";
import { Button, Input, message } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import CustomTable from "../../components/CustomTable";
import CreateFaq from "./CreateFaq";
import UpdateFaq from "./UpdateFaq";
import instance from "../../auth/useAxios";

export default function Faqs({ user }) {
  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "İçerik",
      dataIndex: "answer",
      key: "answer",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
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
            updateFaq(record);
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
          onClick={() => deletefaq(record.id)}
        >
          Sil
        </Button>
      ),
    },
  ];
  const { Search } = Input;

  const initialValues = {
    title: null,
    answer: null,
    editable: false,
    deletetable: false,
  };

  const [data, setData] = useState(initialValues);
  const [faqs, setFaqs] = useState([]);
  const [faq, setFaq] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  function handleSubmit(content) {
    try {
      instance
        .post("/new-faq", content, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          getFaqs();
          setIsCreate(false);
        });
    } catch (error) {
      message.error("Error");
    }
  }

  async function getFaqs() {
    try {
      await instance.get("/faqs").then((res) => {
        setFaqs(res.data);
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
  // function getFaq(id) {
  //   instance.get(`http://localhost:5000/api/faq/${id}`).then((res) => {
  //     console.log(res.data[0]);
  //   });
  // }
  function deletefaq(id) {
    instance.delete(`/faq/${id}`).then((res) => {
      getFaqs();
      openNotification("success", "faq Başarıyla Silindi");
    });
  }
  function updateFaq(faq) {
    setFaq(faq);
    setIsEdit(true);
  }

  React.useEffect(() => {
    getFaqs();
  }, [isEdit]);
  return (
    <div className="App">
      <div className="container">
        <h5>faqs Listesi</h5>
        <Search
          placeholder="Input search faqs"
          onSearch={() => console.log("HERE")}
          enterButton
        />
        <Button type="primary" onClick={() => setIsCreate(true)}>
          Create faqs
        </Button>
      </div>
      <CustomTable data={faqs} columns={columns} />

      {isCreate && (
        <CreateFaq
          data={data}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          handleSubmit={handleSubmit}
          setData={setData}
        />
      )}

      {isEdit && (
        <UpdateFaq
          data={faq}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setUser={setFaq}
          setData={setFaq}
        />
      )}
    </div>
  );
}
