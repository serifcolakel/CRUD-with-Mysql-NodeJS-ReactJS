import axios from "axios";
import React from "react";
import "../App.css";
export default function UpdateEmploye({
  employee,
  isEdit,
  setIsEdit,
  setEmployee,
}) {
  const style = {
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "110vh",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const [data, setData] = React.useState(employee);
  const [image, setImage] = React.useState(employee.image);
  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/employee/${employee.id}`, data)
      .then((res) => {
        console.log(res);
        setIsEdit(false);
      });
  }
  function uploadImage(e) {
    //console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    e.target.files[0] &&
      axios.post(`http://localhost:5000/api/image`, formData).then((res) => {
        setImage(res.data.image);
      });
  }
  return (
    <div style={style}>
      <h1>Update Employee</h1>
      <form className="form" onSubmit={handleUpdate}>
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
                setImage(employee.image);
              }
            }}
          >
            <img
              src={`http://localhost:5000/images/${employee.image}`}
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
                  top: "-40%",
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
              width: "10%",
            }}
            onChange={uploadImage}
            multiple={false}
          />
        )}
        {Object.keys(employee).map(
          (item, index) =>
            item !== "id" &&
            item !== "image" && (
              <div className="form" style={{ width: "500px" }} key={index}>
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

        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setIsEdit(!isEdit);
          setEmployee({});
        }}
      >
        Close
      </button>
    </div>
  );
}
