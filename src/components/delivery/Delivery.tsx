import { Button, Input, Table } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FormDelivery } from "./FormDelivery";
import { IUserApp } from "../../interfaces/IUserApp";
import { confirmAlert } from "../../helpers/alert";
import { Collection, FirebaseContext, ModalContext } from "../../context";
import { columnsDelivery } from "./Columns";
import { CSVLink } from "react-csv";
import { TableUser } from "../table/TableUser";

export const Delivery = () => {
  const [users, setUsers] = useState<IUserApp[]>([]);
  const { openModal } = useContext(ModalContext);
  const { deleteCollection } = useContext(FirebaseContext);
  const [search, setSearch] = useState<string>("");

  let q = query(collection(db, "users"), where("type", "==", "DELIVERY"));
  useEffect(() => {
    if (search !== "") {
      q = query(
        collection(db, Collection.Users),
        where("name", ">=", search),
        where("name", "<=", search + "\uf8ff")
      );
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IUserApp),
          key: doc.id,
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const deleteUser = async (id: string) => {
    const resp = await confirmAlert(
      "Esta seguro que desea eliminar el usuario?"
    );
    if (resp) {
      await deleteCollection(Collection.Users, id);
    }
  };

  const columns = columnsDelivery({ openModal, deleteUser });
  return (
    <>
      <Input
        placeholder="Busque por nombre de repartidor"
        size="large"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "22%", marginRight: "40%", display: "inline-block" }}
      />
      <Button
        size="large"
        type="primary"
        onClick={() => openModal("delivery", {})}
      >
        Nuevo Repartidor
      </Button>

      <Button type="primary" size="large" style={{ marginLeft: 5 }}>
        <CSVLink
          filename={"Expense_Table.csv"}
          data={users}
          className="btn btn-primary"
        >
          Export to CSV
        </CSVLink>
      </Button>
      <TableUser users={users} />
      <Table dataSource={users} columns={columns} />

      <FormDelivery />
    </>
  );
};
