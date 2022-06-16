import { Button, Form, Input, Modal } from "antd";
import { SaveFilled, CloseSquareFilled } from "@ant-design/icons";
import { useContext, useState } from "react";
import { ICategory } from "../../interfaces/ICategory";
import { ModelInitial } from "../delivery/FormInitial";
import { InitialFieldCategory } from "./FormInitial";
import { Collection, FirebaseContext, ModalContext } from "../../context";

export const FormCategory = () => {
  const { open, modal, closeModal, model } = useContext(ModalContext);
  const { createCollection, updateCollection, uploadFile } =
    useContext(FirebaseContext);
  const [image, setImage] = useState<File>();
  let modelDelete: ICategory = model as ICategory;
  let modelInitial: ModelInitial[] = Object.entries(modelDelete).map(
    ([key, value]) => {
      return {
        name: key,
        value,
      };
    }
  );

  const onFinish = async (values: ICategory) => {
    let category: ICategory =
      Object.keys(model).length === 0 ? values : (model as ICategory);
    if (category.id) {
      const id = category.id;
      category.name = values.name;
      category.description = values.description;
      delete category.key;
      delete category.id;
      category.image = await uploadFile(image!);
      await updateCollection(Collection.Categories, category, id);
      closeModal();
    } else {
      delete category.key;
      category.image = await uploadFile(image!);
      await createCollection(Collection.Categories, category);
      closeModal();
    }
  };

  return (
    <Modal
      title={
        Object.keys(model).length === 0
          ? "Nueva Categoria"
          : "Actualizar Categoria"
      }
      visible={modal === "category" && open}
      onCancel={closeModal}
      footer={[]}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        fields={
          Object.keys(model).length !== 0 ? modelInitial : InitialFieldCategory
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
          label="Descripcion:"
          name="description"
          rules={[{ required: true, message: "Ingrese la descripcion !" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Imagen:"
          name="imageCategory"
          rules={[{ required: true, message: "Ingrese la imagen !" }]}
        >
          <Input type="file" onChange={(ev) => setImage(ev.target.files![0])} />
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
