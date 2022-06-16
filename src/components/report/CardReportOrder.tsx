import { Card } from "antd";
import { useContext, useEffect, useState } from "react";
import { IOrder } from "../../interfaces/IOrder";
import { AuthContext } from "../../context";
import { CardProductView } from "./CardProductView";
import { doc, getDoc } from "firebase/firestore";
import { IUserApp } from "../../interfaces/IUserApp";
import { db } from "../../config/firebase/firebase";

interface Props {
  order: IOrder;
}
export const CardReportOrder = ({ order }: Props) => {
  const [delivery, setDelivery] = useState<IUserApp>();

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
        order.delivery !== "" && !order.delivered ? (
          <p className="delivery">{delivery?.name} entregando el pedido...</p>
        ) : (
          <p className="delivery__success">
            {delivery?.name !== undefined ? (
              <>{delivery?.name} ha entregado el pedido</>
            ) : (
              <>No se ha asignado un delivery</>
            )}
          </p>
        )
      }
      className="card_order"
    >
      <div className="card">
        {order.orders.map((detail) => (
          <CardProductView key={detail.product?.id} detail={detail} />
        ))}
        <div className="total">Total: ${order.total}</div>

        <div className="address">
          <label className="address__title">Domicilio:</label>
          <label className="address__field"> {order.address}</label>
        </div>
      </div>
    </Card>
  );
};
