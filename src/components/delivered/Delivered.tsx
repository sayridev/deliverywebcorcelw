import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { AuthContext, Collection } from "../../context";
import { TypeAdmin } from "../../interfaces/IUserApp";
import moment from "moment";
import { IOrder } from "../../interfaces/IOrder";
import { CardDelivered } from "./CardDelivered";
import "../order/order.css";
export const Delivered = () => {
  const { userApp } = useContext(AuthContext);
  const [orders, setOrders] = useState<IOrder[]>([]);

  let q = query(collection(db, Collection.Orders));
  if (userApp!.type === TypeAdmin.Delivery) {
    q = query(
      collection(db, Collection.Orders),
      where("delivery", "==", userApp?.id),
      where("date", "==", moment().format("MM/DD/YY").toString())
    );
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOrders(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IOrder),
          key: doc.id,
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ backgroundColor: "white", height: "80vh", overflowY: "scroll" }}
    >
      <div className="order__content">
        {orders.length > 0 &&
          orders.map((order) => <CardDelivered order={order} key={order.id} />)}
      </div>
    </div>
  );
};
