import React, { useState } from "react";
import { Button, Drawer, Form, Input, Switch } from "antd";
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
  const [content, setContent] = useState("<p>Blog için İçerik Giriniz</p>");
  const handleCancel = () => {
    setIsCreate(false);
    openNotification("info", "Kayıt İşlemi Başarıyla İptal Edildi22");
  };
  const [form] = Form.useForm();
  return (
    <Drawer
      width={window.innerWidth > 600 ? "50%" : "100%"}
      title="Blog Ekle"
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
              handleSubmit({
                ...form.getFieldsValue(),
                content,
              });
            }}
          >
            Kaydet
          </Button>
        </div>
      }
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          //console.log(form.getFieldsValue());
        }}
        onChange={(e) => {
          //console.log(form.getFieldsValue());
        }}
        onFinishFailed={(errorInfo) => {
          //console.log("Failed:", errorInfo);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Başlık"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Düzenlenebilir mi ?"
          name="editable"
          valuePropName="editable"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Silinebilir mi    ?"
          name="deletable"
          valuePropName="deletable"
        >
          <Switch />
        </Form.Item>
      </Form>
      {/* <form className="form">
        {Object.keys(data).map(
          (item, index) =>
            item === "title" && (
              <div className="form" key={index}>
                <label htmlFor={item}>{item}</label>
                <Input
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
      </form> */}
      <CustomEditor data={content} setData={setContent} />
    </Drawer>
  );
}
