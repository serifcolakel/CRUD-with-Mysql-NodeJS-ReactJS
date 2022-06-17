import React from "react";
import { Form, Input, message, Modal, Switch } from "antd";
import "../../App.css";
import { openNotification } from "../../utils/notification";
import CustomEditor from "../../components/CustomEditor";
import instance from "../../auth/useAxios";
export default function UpdateFaq({ data, isEdit, setIsEdit, setData }) {
  const handleOk = (e) => {
    e.preventDefault();
    let updateBlog = {
      ...form.getFieldsValue(),
      answer: content,
    };
    instance.put(`/faq/${data.id}`, updateBlog).then((res) => {
      setIsEdit(false);
      openNotification("success", "Sıkça Sorulan Soru Başarıyla Güncellendi");
    });
  };
  const handleCancel = () => {
    setIsEdit(false);
    message.info("Sıkça Sorulan Soru Güncelleme İşlemi İptal Edildi");
  };
  const [content, setContent] = React.useState(data.answer);
  const [form] = Form.useForm();
  React.useEffect(() => {
    form.setFieldsValue({
      ...data,
    });
    // eslint-disable-next-line
  }, [data]);
  console.log("124124", form.getFieldValue());
  return (
    <Modal
      title="Güncelle Sıkça Sorulan Soru"
      visible={isEdit}
      width={"50%"}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="normal_login"
        form={form}
        initialValues={{ remember: true }}
        onFinish={(values) => {
          console.log(form.getFieldsValue());
        }}
        onFinishFailed={(errorInfo) => {
          console.log("Failed:", errorInfo);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Başlık"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Düzenlenebilir mi ?"
          name="editable"
          valuePropName="editable"
        >
          <Switch defaultChecked={data.editable === 1 ? true : false} />
        </Form.Item>
        <Form.Item
          label="Silinebilir mi    ?"
          name="deletable"
          valuePropName="deletable"
        >
          <Switch defaultChecked={data.deletable === 1 ? true : false} />
        </Form.Item>
      </Form>

      <CustomEditor data={content} setData={setContent} />
    </Modal>
  );
}
