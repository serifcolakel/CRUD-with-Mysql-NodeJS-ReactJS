import { Button, Input, message } from "antd";
import jwt_decode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import instance from "../auth/useAxios";
const initialValues = {
  userName: "serif",
  password: "123456",
};

export default function Login({ auth, dispatch }) {
  const [login, setLogin] = React.useState(initialValues);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await instance.post("/login", login).then((res) => {
        localStorage.setItem("token", res.data.token);
        const decoded = jwt_decode(res.data.token);
        message.success("Giriş Başarılı");
        dispatch({ type: "AUTH_USER", payload: decoded });
        navigate("/");
      });
    } catch (error) {
      dispatch({ type: "UNAUTH_USER" });
      message.error("Kullanıcı Adı veya Şifre Yanlış", error.message);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      if (jwt_decode(localStorage.getItem("token")).exp > Date.now() / 1000) {
        dispatch({
          type: "AUTH_USER",
          payload: jwt_decode(localStorage.getItem("token")),
        });
        navigate("/");
      } else {
        message.error("Token is Expired");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
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
