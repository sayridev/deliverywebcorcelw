import { Button, Form, Input, Modal } from "antd";
import { SaveFilled, CloseSquareFilled } from "@ant-design/icons";
import { useContext } from "react";
import { IUserApp, TypeAdmin } from "../../interfaces/IUserApp";
import { AuthContext } from "../../context/auth/AuthContext";
import { IUser } from "../../interfaces/IUser";
import { InitialField, ModelInitial } from "./FormInitial";
import { Collection, FirebaseContext, ModalContext } from "../../context";

export const FormDelivery = () => {
  const { open, modal, closeModal, model } = useContext(ModalContext);
  const { createCollection, updateCollection } = useContext(FirebaseContext);
  const { registerUser } = useContext(AuthContext);

  let modelInitial: ModelInitial[] = Object.entries(model).map(
    ([key, value]) => {
      return {
        name: key,
        value,
      };
    }
  );

  const onFinish = async (values: IUserApp) => {
    let delivery: IUserApp =
      Object.keys(model).length === 0 ? values : (model as IUserApp);
    delivery.type = TypeAdmin.Delivery;
    if (delivery.id) {
      delivery.name = values.name;
      delivery.phone = values.phone;
      delete delivery.key;
      delete delivery.username;
      delete delivery.password;
      await updateCollection(Collection.Users, delivery, delivery.id);
      closeModal();
    } else {
      let user: IUser = {
        email: delivery.username!,
        password: delivery.password!,
      };
      const response = await registerUser(user);
      delete delivery.key;
      delete delivery.username;
      delete delivery.password;
      if (response) {
        delivery.uid = response;
        await createCollection(Collection.Users, delivery);
        closeModal();
      }
    }
  };

  return (
    <Modal
      title={
        Object.keys(model).length === 0
          ? "Nuevo Repartidor"
          : "Actualizar Repartidor"
      }
      visible={modal === "delivery" && open}
      onCancel={closeModal}
      footer={[]}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        fields={Object.keys(model).length !== 0 ? modelInitial : InitialField}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombres Completos:"
          name="name"
          rules={[{ required: true, message: "Ingrese el nombre completo!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono:"
          name="phone"
          rules={[
            { required: true, message: "Ingrese el numero de telefono!" },
          ]}
          requiredMark
        >
          <Input type="number" />
        </Form.Item>
        {Object.keys(model).length === 0 ? (
          <>
            <Form.Item
              label="Correo Electrónico:"
              name="username"
              rules={[{ required: true, message: "Ingrese el usuario!" }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Contraseña:"
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "La contraseña es requerida!",
                },
              ]}
            >
              <Input.Password autoComplete="false" />
            </Form.Item>
          </>
        ) : (
          ""
        )}

        <Form.Item wrapperCol={{ offset: 2, span: 30 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveFilled />}
            style={{ marginRight: "200px" }}
          >
            Guardar
          </Button>
          <Button
            type="primary"
            icon={<CloseSquareFilled />}
            danger
            onClick={closeModal}
          >
            Cerrar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
