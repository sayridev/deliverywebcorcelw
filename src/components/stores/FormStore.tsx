import { Button, Form, Input, Modal } from "antd";
import { SaveFilled, CloseSquareFilled } from "@ant-design/icons";
import { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalContext";

import {
  Collection,
  FirebaseContext,
} from "../../context/firebase/FirebaseContext";

import { ModelInitial } from "../delivery/FormInitial";
import { InitialFieldStore } from "./FormInitial";
import { IStore } from "../../interfaces/IStore";
export const FormStore = () => {
  const { open, modal, closeModal, model } = useContext(ModalContext);
  const { createCollection, updateCollection } = useContext(FirebaseContext);

  let modelInitial: ModelInitial[] = Object.entries(model).map(
    ([key, value]) => {
      return {
        name: key,
        value,
      };
    }
  );

  const onFinish = async (values: IStore) => {
    let category: IStore =
      Object.keys(model).length === 0 ? values : (model as IStore);
    if (category.id) {
      category.name = values.name;
      category.address = values.address;
      category.phone = values.phone;
      const id = category.id;
      delete category.key;
      delete category.id;
      await updateCollection(Collection.Stores, category, id);
      closeModal();
    } else {
      delete category.key;
      await createCollection(Collection.Stores, category);
      closeModal();
    }
  };

  return (
    <Modal
      title={
        Object.keys(model).length === 0 ? "Nueva Tienda" : "Actualizar Tienda"
      }
      visible={modal === "store" && open}
      onCancel={closeModal}
      footer={[]}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        fields={
          Object.keys(model).length !== 0 ? modelInitial : InitialFieldStore
        }
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombre:"
          name="name"
          rules={[{ required: true, message: "Ingrese el nombre !" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefono:"
          name="phone"
          rules={[{ required: true, message: "Ingrese la descripcion !" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Direccion:"
          name="address"
          rules={[{ required: true, message: "Ingrese la imagen !" }]}
        >
          <Input />
        </Form.Item>

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
