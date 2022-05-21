import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { openNotification } from "../../utils/notification";
import CustomEditor from "../../components/CustomEditor";
export default function CreateBlog({
  data,
  setData,
  handleSubmit,
  uploadImage,
  isCreate,
  setIsCreate,
}) {
  const [content, setContent] = useState("<p>İçerik</p>");
  const handleCancel = () => {
    setIsCreate(false);
    openNotification("info", "Kayıt İşlemi Başarıyla İptal Edildi");
  };
  return (
    <Drawer
      width={window.innerWidth > 600 ? "50%" : "100%"}
      title="Basic Drawer"
      placement={"right"}
      closable={false}
      onClose={handleCancel}
      visible={isCreate}
      key={isCreate}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="danger"
            onClick={() => {
              setIsCreate(false);
              openNotification("info", "Kayıt İşlemi İptal Edildi");
            }}
          >
            İptal Et
          </Button>

          <Button
            type="primary"
            onClick={() => {
              handleSubmit(content);
            }}
          >
            Kaydet
          </Button>
        </div>
      }
    >
      <form className="form">
        {Object.keys(data).map(
          (item, index) =>
            item === "title" && (
              <div className="form" key={index}>
                <label htmlFor={item}>{item}</label>
                <input
                  type="text"
                  placeholder={`Enter ${item}`}
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
    </Drawer>
  );
}
