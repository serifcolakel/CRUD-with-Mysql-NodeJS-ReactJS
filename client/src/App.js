import "./App.css";
import "antd/dist/antd.min.css";
import React, { useState } from "react";
import axios from "axios";
import UpdateUser from "./components/UpdateUser";
import CreateUser from "./components/CreateUser";
import CustomTable from "./components/CustomTable";
import { openNotification } from "./utils/notification";
import { Button, Input } from "antd";
const { Search } = Input;

const initialValues = {
  fullName: "Şerif",
  userName: "serif",
  email: "serif@gmail.com",
  password: "123456",
  age: "20",
  country: "Turkey",
  position: "Developer",
  salary: "8000",
};

function App() {
  const [data, setData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [showImage, setShowImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    let newEmployee = {
      ...data,
      image: showImage,
    };
    axios.post("http://localhost:5000/api/new-user", newEmployee).then(() => {
      getUser();
      setIsCreate(false);
    });
  }

  function getUser() {
    axios.get("http://localhost:5000/api/user").then((res) => {
      setUsers(res.data);
    });
  }
  // function getEmployee(id) {
  //   axios.get(`http://localhost:5000/api/user/${id}`).then((res) => {
  //     console.log(res.data[0]);
  //   });
  // }
  function deleteUser(id) {
    axios.delete(`http://localhost:5000/api/user/${id}`).then((res) => {
      getUser();
    });
  }
  function updateUser(user) {
    setUser(user);
    setIsEdit(true);
  }
  function uploadImage(e) {
    //console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    e.target.files[0] &&
      axios.post(`http://localhost:5000/api/image`, formData).then((res) => {
        setShowImage(res.data.image);
        openNotification("success", "Resim Başarıyla Yüklendi");
      });
  }
  React.useEffect(() => {
    getUser();
  }, [isEdit]);

  return (
    <div className="App">
      <div className="container">
        <h5>Kullanıcı Listesi</h5>
        <Search
          placeholder="input search text"
          onSearch={() => console.log("HERE")}
          enterButton
        />
        <Button type="primary" onClick={() => setIsCreate(true)}>
          Create User
        </Button>
      </div>
      {isCreate && (
        <CreateUser
          data={data}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          handleSubmit={handleSubmit}
          setData={setData}
          uploadImage={uploadImage}
        />
      )}

      <CustomTable
        users={users}
        deleteUser={deleteUser}
        updateUser={updateUser}
      />

      {isEdit && (
        <UpdateUser
          user={user}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setUser={setUser}
          getUser={getUser}
        />
      )}
    </div>
  );
}

export default App;
