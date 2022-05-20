import axios from "axios";
import React from "react";
import { Modal } from "antd";
import "../App.css";
export default function UpdateUser({ user, isEdit, setIsEdit, setUser }) {
  const [data, setData] = React.useState(user);
  const [image, setImage] = React.useState(user.image);

  function uploadImage(e) {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    e.target.files[0] &&
      axios.post(`http://localhost:5000/api/image`, formData).then((res) => {
        setImage(res.data.image);
      });
  }
  const handleOk = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/user/${user.id}`, data).then((res) => {
      console.log(res);
      setIsEdit(false);
    });
  };
  const handleCancel = () => {
    setIsEdit(false);
  };
  return (
    <Modal
      title="Update User"
      visible={isEdit}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form className="form">
        {image.length > 0 ? (
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              if (image.length > 0) {
                setImage("");
              } else {
                setImage(user.image);
              }
            }}
          >
            <img
              src={`http://localhost:5000/images/${user.image}`}
              alt="employee"
              style={{
                borderRadius: "50%",
                border: "1px solid black",
              }}
              width={50}
              height={50}
            />
            {image.length < 1 ? (
              <p
                style={{
                  position: "absolute",
                  top: "-40%",
                  left: "35%",
                  fontSize: "30px",
                  fontWeight: "bolder",
                  color: "red",
                }}
              >
                X
              </p>
            ) : (
              <p
                style={{
                  position: "absolute",
                  top: "0%",
                  left: "35%",
                  fontSize: "30px",
                  fontWeight: "bolder",
                  color: "green",
                }}
              >
                ✓
              </p>
            )}
          </div>
        ) : (
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
        )}
        {Object.keys(user).map(
          (item, index) =>
            item !== "id" &&
            item !== "image" && (
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
      </form>
    </Modal>
  );
}
