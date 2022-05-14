import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import UpdateEmploye from "./components/UpdateEmploye";
const initialValues = {
  name: "Şerif",
  age: "20",
  country: "Turkey",
  position: "Developer",
  salary: "8000",
};

function App() {
  const [data, setData] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [showImage, setShowImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    let newEmployee = {
      ...data,
      image: showImage,
    };
    console.log(newEmployee);
    axios
      .post("http://localhost:5000/api/new-user", newEmployee)
      .then((res) => {
        getEmployees();
      });
  }
  function getEmployees() {
    axios.get("http://localhost:5000/api/employees").then((res) => {
      setEmployees(res.data);
    });
  }
  // function getEmployee(id) {
  //   axios.get(`http://localhost:5000/api/employee/${id}`).then((res) => {
  //     console.log(res.data[0]);
  //   });
  // }
  function deleteEmployees(id) {
    axios.delete(`http://localhost:5000/api/employee/${id}`).then((res) => {
      getEmployees();
    });
  }
  function updateEmployee(employee) {
    setEmployee(employee);
    setIsEdit(true);
  }
  function uploadImage(e) {
    //console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    e.target.files[0] &&
      axios.post(`http://localhost:5000/api/image`, formData).then((res) => {
        setShowImage(res.data.image);
      });
  }
  React.useEffect(() => {
    getEmployees();
  }, [isEdit]);

  return (
    <div className="App">
      <h1>Employee System</h1>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(data).map((item, index) => (
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
        ))}
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

        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={getEmployees}>Get Employees</button> */}
      {employees.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "scroll",
            padding: "0 20px",
            gap: "30px",
          }}
        >
          <img
            src={`http://localhost:5000/images/${item.image}`}
            alt="server-logo"
            style={{
              borderRadius: "50%",
              border: "1px solid black",
            }}
            width={50}
            height={50}
          />
          <h3>{item.name}</h3>
          <p>{item.age}</p>
          <p>{item.country}</p>
          <p>{item.position}</p>
          <p>{item.salary}</p>
          <button onClick={() => updateEmployee(item)}>Update Employee</button>
          <button onClick={() => deleteEmployees(item.id)}>
            Delete Employee
          </button>
        </div>
      ))}
      {isEdit && (
        <UpdateEmploye
          employee={employee}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setEmployee={setEmployee}
          getEmployees={getEmployees}
        />
      )}
    </div>
  );
}

export default App;
