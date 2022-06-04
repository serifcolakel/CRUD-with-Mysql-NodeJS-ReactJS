import "./App.css";
import "antd/dist/antd.min.css";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { message, Spin } from "antd";
import Home from "./pages/home";
import jwtDecode from "jwt-decode";

const Users = React.lazy(() => import("./pages/users/index"));
const Sliders = React.lazy(() => import("./pages/sliders/index"));
const Blogs = React.lazy(() => import("./pages/blogs/index"));
const NoMatch = React.lazy(() => import("./components/NoMatch"));
const Layout = React.lazy(() => import("./components/Layout"));
const Login = React.lazy(() => import("./components/Login"));
function App() {
  const [user, setUser] = React.useState(null);
  const [auth, setAuth] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (jwtDecode(localStorage.getItem("token")).exp > Date.now() / 1000) {
        setUser(jwtDecode(localStorage.getItem("token")));
        setAuth(true);
      } else {
        setAuth(false);
        message.error("Token is Expired");
        localStorage.removeItem("token");
      }
    }
  }, [auth]);

  return (
    <Suspense
      fallback={
        <Spin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          size="large"
        />
      }
    >
      <Router>
        {auth ? (
          <Routes>
            <Route path="/" element={<Layout user={user} />}>
              <Route index element={<Home />} />
              <Route path="user" index element={<Users />} />
              <Route path="sliders" element={<Sliders />} />
              <Route path="blogs" element={<Blogs />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              index
              element={<Login setUser={setUser} setAuth={setAuth} />}
            />
            <Route path="*" element={<Login setUser={setUser} />} />
          </Routes>
        )}
      </Router>
    </Suspense>
  );
}

export default App;
