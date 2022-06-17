import "./App.css";
import "antd/dist/antd.min.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import Home from "./pages/home";
import authReducer from "./auth/authReducer";

const Users = React.lazy(() => import("./pages/users/index"));
const Sliders = React.lazy(() => import("./pages/sliders/index"));
const Blogs = React.lazy(() => import("./pages/blogs/index"));
const NoMatch = React.lazy(() => import("./components/NoMatch"));
const Layout = React.lazy(() => import("./components/Layout"));
const Login = React.lazy(() => import("./components/Login"));
const Faqs = React.lazy(() => import("./pages/faqs/index"));
const Menu = React.lazy(() => import("./pages/menu/index"));
const Content = React.lazy(() => import("./pages/contents/index"));
function App() {
  const [auth, dispatch] = React.useReducer(authReducer, {
    authenticated: false,
    user: null,
    error: null,
  });
  console.log(auth);
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
        {auth.authenticated ? (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="blogs" element={<Blogs user={auth.user} />} />
              <Route path="sliders" element={<Sliders />} />
              <Route path="faqs" element={<Faqs />} />
              <Route path="menu" element={<Menu />} />
              <Route path="content" element={<Content />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              index
              element={<Login dispatch={dispatch} auth={auth.authenticated} />}
            />
            <Route
              path="*"
              element={<Login dispatch={dispatch} auth={auth.authenticated} />}
            />
          </Routes>
        )}
      </Router>
    </Suspense>
  );
}

export default App;
