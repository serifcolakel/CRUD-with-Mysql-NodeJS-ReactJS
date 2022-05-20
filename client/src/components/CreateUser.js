import React from "react";
import { Modal } from "antd";
import { openNotification } from "../utils/notification";
export default function CreateUser({
  data,
  setData,
  handleSubmit,
  uploadImage,
  isCreate,
  setIsCreate,
}) {
  const handleCancel = () => {
    setIsCreate(false);
    openNotification("info", "Kayıt İşlemi Başarıyla İptal Edildi");
  };
  return (
    <Modal
      title="Create User"
      visible={isCreate}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <form className="form">
        {Object.keys(data).map((item, index) => (
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
        ))}
        <input
          type="file"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
          }}
          onChange={uploadImage}
          multiple={false}
        />
      </form>
    </Modal>
  );
}
