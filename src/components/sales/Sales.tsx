import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, Collection } from "../../context";
import { IOrder } from "../../interfaces/IOrder";
import { TypeAdmin } from "../../interfaces/IUserApp";
import { db } from "../../config/firebase/firebase";
import { Button, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { FilePdfOutlined } from "@ant-design/icons";

export const Sales = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { userApp } = useContext(AuthContext);
  const [date, setDate] = useState(moment().format("MM/DD/YY").toString());
  let q = query(collection(db, Collection.Orders));
  if (userApp!.type === TypeAdmin.Admin) {
    q = query(
      collection(db, Collection.Orders),
      where("sucursal", "==", userApp?.sucursal),
      where("date", "==", date)
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
  }, [date]);
  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(moment(dateString).format("MM/DD/YY").toString());
  };
  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          marginBlock: "20px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
        }}
      >
        <div>
          <label
            style={{ fontWeight: "bold", fontSize: "16px", marginRight: "5px" }}
          >
            Eliga una fecha:{" "}
          </label>
          <DatePicker defaultValue={moment()} onChange={onChange} />
        </div>
        <Button onClick={handlePrint} type="primary" size="middle" danger>
          <FilePdfOutlined /> Export to PDF{" "}
        </Button>
      </div>
      {orders.length > 0 ? (
        <div ref={componentRef}>
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
            Resume de ventas diarias
          </h3>
          <table
            style={{
              border: "1px solid gray",
              textAlign: "left",
              margin: "0 auto",
            }}
          >
            <thead>
              <tr style={{ border: "1px solid black", textAlign: "left" }}>
                <th>Codigo de pedido</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td width={200}>{order.id}</td>
                  <td width={200}>{order.user.name}</td>
                  <td width={200}>{order.address}</td>
                  <td width={200} style={{ fontWeight: "bold" }}>
                    ${order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            style={{
              fontWeight: "bold",
              textAlign: "right",
              maxWidth: "82%",
            }}
          >
            Ventas totales del dia: $
            {orders
              .reduce(
                (previusValue, currentValue) =>
                  previusValue + currentValue.total,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      ) : (
        <div>
          <h3>No existen datos de ventas para la fecha seleccionada.</h3>
        </div>
      )}
    </div>
  );
};
