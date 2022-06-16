import { Layout, Form, Input, Button } from "antd";
import { useContext, useState } from "react";
import { CarouselImg } from "../components/caurosel/CarouselImg";
import { AuthContext } from "../context/auth/AuthContext";
import { IUser } from "../interfaces/IUser";

export const Login = () => {
  const [login, setUser] = useState<IUser>({} as IUser);
  const { sigIn } = useContext(AuthContext);
  const onChange = (value: string, name: string) => {
    setUser({
      ...login,
      [name]: value,
    });
  };

  return (
    <Layout>
      <main className="header background">
        <div className="content-header">
          <div className="title">
            <h1>Corcel Negro</h1>
          </div>
          <CarouselImg />
          <div style={{ display: "flex" }}>
            <Form
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <h4 style={{ textAlign: "center" }}>Corcel Negro</h4>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Ingrese el usuario!" }]}
              >
                <Input onChange={(ev) => onChange(ev.target.value, "email")} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "La contraseña es requerida!" },
                ]}
              >
                <Input.Password
                  autoComplete="false"
                  onChange={(ev) => onChange(ev.target.value, "password")}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => sigIn(login)}
                >
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
            <Form
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px",
              }}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <h4 style={{ textAlign: "center" }}>Delivery</h4>

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Ingrese el usuario!" }]}
              >
                <Input onChange={(ev) => onChange(ev.target.value, "email")} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "La contraseña es requerida!" },
                ]}
              >
                <Input.Password
                  autoComplete="false"
                  onChange={(ev) => onChange(ev.target.value, "password")}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => sigIn(login)}
                >
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </Layout>
  );
};
