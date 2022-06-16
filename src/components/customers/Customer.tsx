import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { IUserApp } from "../../interfaces/IUserApp";
import { Collection } from "../../context";
import { columnsCustomers } from "./Columns";
import { CSVLink } from "react-csv";
import { TableUser } from "../table/TableUser";
export const Customer = () => {
  const [users, setUsers] = useState<IUserApp[]>([]);
  const [search, setSearch] = useState<string>("");

  let q = query(collection(db, "users"), where("type", "==", "CUSTOMER"));
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

  const columns = columnsCustomers();
  return (
    <>
      <Input
        placeholder="Busque por nombre de cliente"
        size="large"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "22%", marginRight: "55%", display: "inline-block" }}
      />
      <Button type="primary" size="large">
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
    </>
  );
};
