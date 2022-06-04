import React, { useState } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import CustomTable from "../../components/CustomTable";
import { openNotification } from "../../utils/notification";
import { Button, Input, Tag, Space } from "antd";
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
export default function Users() {
  const columns = [
    {
      title: "İmage",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000/images/user/${image}`}
          alt="server-logo"
          style={{
            borderRadius: "50%",
            border: "1px solid black",
          }}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Ülke",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (tag) => (
        <Tag color={tag.length > 10 ? "cyan" : "blue"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => <Tag color="green">{salary} $</Tag>,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              updateUser(record);
            }}
          >
            Update User
          </Button>
          <Button type="danger" onClick={() => deleteUser(record.id)}>
            Delete User
          </Button>
        </Space>
      ),
    },
  ];
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
    axios
      .post("http://localhost:5000/api/new-user", newEmployee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
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
    axios
      .delete(`http://localhost:5000/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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
      axios
        .post(`http://localhost:5000/api/image/user`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
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
      <CustomTable data={users} columns={columns} />
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
