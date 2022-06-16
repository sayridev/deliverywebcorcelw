import { Button, Form, Input, Modal } from "antd";
import { SaveFilled, CloseSquareFilled } from "@ant-design/icons";
import { useContext } from "react";
import {
  AuthContext,
  Collection,
  FirebaseContext,
  ModalContext,
} from "../../context";
import { IOrder } from "../../interfaces/IOrder";

export const FormOrder = () => {
  const { open, modal, model, closeModal } = useContext(ModalContext);
  const { userApp } = useContext(AuthContext);
  const { updateCollection } = useContext(FirebaseContext);
  const onFinish = async ({ time }: { time: number }) => {
    let order: IOrder = model as IOrder;
    order.delivery = userApp!.id;
    order.time = parseInt(time.toString());
    closeModal();
    await updateCollection(Collection.Orders, order, order.id!);
  };
  return (
    <Modal
      title="Aceptar Pedido"
      visible={modal === "accept" && open}
      width={380}
      onCancel={() => closeModal}
      footer={[]}
    >
      <Form
        labelCol={{ span: 13 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Tiempo de entrega (min):"
          name="time"
          rules={[{ required: true, message: "Ingrese el tiempo !" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveFilled />}
            style={{ marginRight: 50 }}
          >
            ACEPTAR
          </Button>

          <Button
            type="primary"
            icon={<CloseSquareFilled />}
            danger
            onClick={closeModal}
          >
            CERRAR
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
