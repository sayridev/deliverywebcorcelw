import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { AuthContext, Collection } from "../../context";
import { TypeAdmin } from "../../interfaces/IUserApp";
import moment from "moment";
import { IOrder } from "../../interfaces/IOrder";
import "../order/order.css";
import { CardReportOrder } from "./CardReportOrder";
export const ViewDelivered = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { userApp } = useContext(AuthContext);

  let q = query(collection(db, Collection.Orders));
  if (userApp!.type === TypeAdmin.Admin) {
    q = query(
      collection(db, Collection.Orders),
      where("date", "==", moment().format("MM/DD/YY").toString()),
      where("status", "==", true),
      where("sucursal", "==", userApp?.sucursal)
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
          orders.map((order) => (
            <CardReportOrder order={order} key={order.id} />
          ))}
      </div>
    </div>
  );
};
