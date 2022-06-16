import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { AuthContext, Collection } from "../../context";
import { IOrder } from "../../interfaces/IOrder";
import { CardOrder } from "./CardOrder";
import "./order.css";
import moment from "moment";
import { TypeAdmin } from "../../interfaces/IUserApp";
import { FormOrder } from "./FormOrder";

export const Order = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { userApp } = useContext(AuthContext);

  let q = query(collection(db, Collection.Orders));
  if (userApp!.type === TypeAdmin.Admin) {
    q = query(
      collection(db, Collection.Orders),
      where("date", "==", moment().format("MM/DD/YY").toString()),
      where("status", "==", true),
      where("delivery", "==", ""),
      where("sucursal", "==", userApp?.sucursal)
    );
  }

  if (userApp!.type === TypeAdmin.Delivery) {
    q = query(
      collection(db, Collection.Orders),
      where("date", "==", moment().format("MM/DD/YY").toString()),
      where("send", "==", true),
      where("delivery", "==", "")
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
          orders.map((order) => <CardOrder key={order.id} order={order} />)}
      </div>
      <FormOrder />
    </div>
  );
};
