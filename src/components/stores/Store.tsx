import { Button, Table } from "antd";

import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { IStore } from "../../interfaces/IStore";
import { confirmAlert } from "../../helpers/alert";

import { FormStore } from "./FormStore";
import { Collection, FirebaseContext, ModalContext } from "../../context";
import { columnsStore } from "./Columns";
export const Store = () => {
  const [stores, setStores] = useState<IStore[]>([]);
  const { openModal } = useContext(ModalContext);
  const { deleteCollection } = useContext(FirebaseContext);

  const q = query(collection(db, Collection.Stores));
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setStores(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IStore),
          key: doc.id,
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteStore = async (id: string) => {
    const resp = await confirmAlert(
      "Esta seguro que desea eliminar el usuario?"
    );
    if (resp) {
      await deleteCollection(Collection.Stores, id);
    }
  };
  const columns = columnsStore({ openModal, deleteStore });
  return (
    <>
      <Button type="primary" onClick={() => openModal("store", {})}>
        Nueva Tienda
      </Button>
      <Table dataSource={stores} columns={columns} />
      <FormStore />
    </>
  );
};
