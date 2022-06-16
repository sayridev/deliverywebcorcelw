import { Button, Form, Input, Modal } from "antd";
import { SaveFilled, CloseSquareFilled } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { ModelInitial } from "../delivery/FormInitial";
import { InitialFieldProduct } from "./FormInitial";
import { SelectV1 } from "../select/SelectV1";
import { Collection, FirebaseContext, ModalContext } from "../../context";

export const FormProduct = () => {
  const { open, modal, closeModal, model } = useContext(ModalContext);
  const [category, setCategory] = useState<string>("");
  const { createCollection, getData, updateCollection, uploadFile } =
    useContext(FirebaseContext);

  const [categories, setCategories] = useState<IProduct[]>();
  const [image, setImage] = useState<File>();

  let modelDelete: IProduct = model as IProduct;

  let modelInitial: ModelInitial[] = Object.entries(modelDelete).map(
    ([key, value]) => {
      return {
        name: key,
        value,
      };
    }
  );
  useEffect(() => {
    setCategory(modelDelete.category);
    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    const categories = async () => {
      const result = await getData(Collection.Categories);
      if (result) setCategories(result);
    };
    categories();
    // eslint-disable-next-line
  }, []);

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  const onFinish = async (values: IProduct) => {
    let product: IProduct =
      Object.keys(model).length === 0 ? values : (model as IProduct);
    if (product.id) {
      const id = product.id;
      product.name = values.name;
      product.description = values.description;
      product.price = values.price;
      product.category = category;
      delete product.key;
      delete product.id;
      product.image = await uploadFile(image!);
      await updateCollection(Collection.Products, product, id);
      closeModal();
    } else {
      delete product.key;
      product.category = category;
      product.image = await uploadFile(image!);
      await createCollection(Collection.Products, product);
      closeModal();
    }
  };

  return (
    <Modal
      title={
        Object.keys(model).length === 0
          ? "Nueva Producto"
          : "Actualizar Producto"
      }
      visible={modal === "product" && open}
      onCancel={closeModal}
      footer={[]}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        fields={
          Object.keys(model).length !== 0 ? modelInitial : InitialFieldProduct
        }
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombre:"
          name="name"
          rules={[
            {
              required: true,
              message: "Ingrese el nombre !",
            },
          ]}
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
          label="Precio:"
          name="price"
          rules={[
            { required: true, message: "Ingrese el precio del producto !" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Categoria:"
          name="category"
          rules={[
            {
              required: category !== "" ? false : true,
              message: "Ingrese la categoria !",
            },
          ]}
        >
          <SelectV1
            onHandleChange={onCategoryChange}
            data={categories!}
            initialValue={category}
          />
        </Form.Item>

        <Form.Item
          label="Imagen:"
          name="imageProduct"
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
