import { Spin } from "antd";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { Layout } from "../layout/Layout";
import { Login } from "../layout/Login";
import { routes } from "./routes";

export const Navigation = () => {
  const { status, checking } = useContext(AuthContext);
  if (checking)
    return (
      <Spin
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
        size="large"
        tip="Loading..."
      ></Spin>
    );
  return (
    <BrowserRouter>
      {status === "authenticated" ? (
        <Layout>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.Component />}
              />
            ))}
            <Route path="/*" element={<Navigate to="/order" replace />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
