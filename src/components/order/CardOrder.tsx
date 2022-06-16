import { Button, Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { CardProduct } from "./CardProduct";
import { CloseSquareFilled } from "@ant-design/icons";
import { IOrder } from "../../interfaces/IOrder";
import {
  AuthContext,
  Collection,
  FirebaseContext,
  ModalContext,
} from "../../context";
import { confirmAlert } from "../../helpers/alert";
import { IUserApp, TypeAdmin } from "../../interfaces/IUserApp";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
interface Props {
  order: IOrder;
}
export const CardOrder = ({ order }: Props) => {
  const { updateCollection } = useContext(FirebaseContext);
  const { userApp } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const [delivery, setDelivery] = useState<IUserApp>();
  const orderDelivery = async () => {
    order.send = true;
    const resp = await confirmAlert(
      "Desea solicitar un delivery?",
      "Si, solicitar!",
      "No, solicitar",
      "¿Solicitar?"
    );
    if (resp) {
      await updateCollection(Collection.Orders, order, order.id!);
    }
  };
  const updateOrder = async () => {
    order.status = false;
    order.send = false;
    const resp = await confirmAlert(
      "Esta seguro que desea rechazar este pedido?",
      "Si, cancelar!",
      "No, cancelar",
      "Rechazar?"
    );
    if (resp) {
      await updateCollection(Collection.Orders, order, order.id!);
    }
  };

  const acceptOrder = async () => {
    openModal("accept", order);
  };

  useEffect(() => {
    const getName = async () => {
      if (order.delivery !== "") {
        await getNameDelivery();
      }
    };
    getName();
  }, [order]);

  const getNameDelivery = async () => {
    const docRef = doc(db, "users", order.delivery);
    const docSnap = await getDoc(docRef);
    let user = docSnap.data() as IUserApp;
    setDelivery(user);
  };

  return (
    <Card
      title={order.user.name}
      style={{ width: 350 }}
      extra={
        order.delivery !== "" &&
        userApp?.type === TypeAdmin.Admin && (
          <p className="delivery">{delivery?.name} retirara el pedido</p>
        )
      }
      className="card_order"
    >
      <div className="card">
        {order.orders.map((detail) => (
          <CardProduct key={detail.product?.id} detail={detail} />
        ))}
        <div className="total">Total: ${order.total}</div>
        <div className="footer__button">
          {userApp?.type === TypeAdmin.Admin ? (
            <>
              <Button type="primary" onClick={() => orderDelivery()}>
                ACEPTAR
              </Button>
              {order.delivery === "" && (
                <Button
                  type="primary"
                  icon={<CloseSquareFilled />}
                  danger
                  onClick={() => updateOrder()}
                >
                  CANCELAR
                </Button>
              )}
            </>
          ) : (
            <Button type="primary" onClick={() => acceptOrder()}>
              ACEPTAR PEDIDO
            </Button>
          )}
        </div>
        <div className="address">
          <label className="address__title">Domicilio:</label>
          <label className="address__field"> {order.address}</label>
        </div>
      </div>
    </Card>
  );
};
