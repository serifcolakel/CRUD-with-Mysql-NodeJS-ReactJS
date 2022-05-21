import axios from "axios";
import React from "react";
import { Modal } from "antd";
import "../../App.css";
import { openNotification } from "../../utils/notification";
import CustomEditor from "../../components/CustomEditor";
export default function UpdateBlog({ data, isEdit, setIsEdit, setData }) {
  const handleOk = (e) => {
    e.preventDefault();
    let updateBlog = {
      title: data.title,
      content: content,
    };
    axios
      .put(`http://localhost:5000/api/blog/${data.id}`, updateBlog)
      .then((res) => {
        setIsEdit(false);
        openNotification("success", "Blog Başarıyla Güncellendi");
      });
  };
  const handleCancel = () => {
    setIsEdit(false);
    openNotification("info", "Blog Güncelleme İşlemi İptal Edildi");
  };
  const [content, setContent] = React.useState(data.content);
  return (
    <Modal
      title="Update Blog"
      visible={isEdit}
      width={"50%"}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form className="form">
        {Object.keys(data).map(
          (item, index) =>
            item !== "id" &&
            item !== "content" && (
              <div className="form" key={index}>
                <label htmlFor={item}>{item}</label>
                <input
                  type="text"
                  value={data[item]}
                  id={item}
                  name={item}
                  onChange={(e) => setData({ ...data, [item]: e.target.value })}
                />
              </div>
            )
        )}
        <CustomEditor data={content} setData={setContent} />
      </form>
    </Modal>
  );
}
