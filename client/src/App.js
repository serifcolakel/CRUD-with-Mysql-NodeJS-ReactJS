import "./App.css";
import "antd/dist/antd.min.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";

const Users = React.lazy(() => import("./pages/users/index"));
const Sliders = React.lazy(() => import("./pages/sliders/index"));
const Blogs = React.lazy(() => import("./pages/blogs/index"));
const NoMatch = React.lazy(() => import("./components/NoMatch"));
const Layout = React.lazy(() => import("./components/Layout"));

function App() {
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="user" element={<Users />} />
            <Route path="sliders" element={<Sliders />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
