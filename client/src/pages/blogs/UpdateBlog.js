import React from "react";
import { Form, Input, message, Modal, Switch } from "antd";
import "../../App.css";
import { openNotification } from "../../utils/notification";
import CustomEditor from "../../components/CustomEditor";
import instance from "../../auth/useAxios";
export default function UpdateBlog({ data, isEdit, setIsEdit, setData }) {
  const handleOk = (e) => {
    e.preventDefault();
    let updateBlog = {
      ...form.getFieldsValue(),
      content: content,
    };
    try {
      instance.put(`/blog/${data.id}`, updateBlog).then((res) => {
        setIsEdit(false);
        openNotification("success", "Blog Başarıyla Güncellendi");
      });
    } catch (error) {
      openNotification("error", error.message);
    }
  };
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsEdit(false);
    message.info("Blog Güncelleme İşlemi İptal Edildi");
    //openNotification("info", "Blog Güncelleme İşlemi İptal Edildi");
  };
  React.useEffect(() => {
    form.setFieldsValue({
      ...data,
    });
    // eslint-disable-next-line
  }, [data]);
  const [content, setContent] = React.useState(data.content);
  return (
    <Modal
      title="Update Blog"
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
      {/* <form className="form">
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
      </form> */}
      <CustomEditor data={content} setData={setContent} />
    </Modal>
  );
}
