import { Button, Card } from "antd";
import { useContext } from "react";
import { CardProductDelivered } from "./CardProductDelivered";
import { IOrder } from "../../interfaces/IOrder";
import { Collection, FirebaseContext } from "../../context";

interface Props {
  order: IOrder;
}
export const CardDelivered = ({ order }: Props) => {
  const { updateCollection } = useContext(FirebaseContext);
  const updateOrder = async () => {
    order.delivered = true;
    await updateCollection(Collection.Orders, order, order.id!);
  };

  return (
    <Card
      title={"Cliente: " + order.user.name}
      style={{ width: 350 }}
      className="card_order"
    >
      <div className="card">
        {order.orders.map((detail) => (
          <CardProductDelivered key={detail.product?.id} detail={detail} />
        ))}
        <div className="total">Total: ${order.total}</div>
        <div className="footer__button">
          {!order.delivered ? (
            <Button type="primary" onClick={() => updateOrder()}>
              PEDIDO ENTREGADO
            </Button>
          ) : (
            <label className="delivered">Has entregado el pedido</label>
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
