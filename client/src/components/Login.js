import { Button, Input, message } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
const initialValues = {
  userName: "serif",
  password: "123456",
};
export default function Login({ setUser, setAuth }) {
  const [login, setLogin] = React.useState(initialValues);

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/api/login", login).then((res) => {
        localStorage.setItem("token", res.data.token);
        const decoded = jwt_decode(res.data.token);
        message.success("Giriş Başarılı");
        setUser(decoded);
        setAuth(true);
        window.location.reload();
      });
    } catch (error) {
      message.error("Kullanıcı Adı veya Şifre Yanlış", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        gap: "10px",
        padding: "10px",
      }}
    >
      <Input
        style={{
          width: "50%",
          gap: "10px",
          padding: "10px",
        }}
        value={login.userName}
        name="userName"
        onChange={(e) =>
          setLogin({ ...login, [e.target.name]: e.target.value })
        }
        placeholder="userName"
      />

      <br />
      <Input
        style={{
          width: "50%",
          gap: "10px",
          padding: "10px",
        }}
        value={login.password}
        name="password"
        type="password"
        onChange={(e) =>
          setLogin({ ...login, [e.target.name]: e.target.value })
        }
        placeholder="Şifrenizi Giriniz"
      />

      <br />
      <Button
        style={{
          width: "50%",
          color: "green",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        }}
        type="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}
