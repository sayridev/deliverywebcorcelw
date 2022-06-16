import { Button, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { ICategory } from "../../interfaces/ICategory";
import { confirmAlert } from "../../helpers/alert";
import { FormCategory } from "./FormCategory";
import { Collection, FirebaseContext, ModalContext } from "../../context";
import { columnsCategory } from "./Columns";

export const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { openModal } = useContext(ModalContext);
  const { deleteCollection } = useContext(FirebaseContext);

  const q = query(collection(db, Collection.Categories));
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCategories(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as ICategory),
          key: doc.id,
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCategory = async (id: string) => {
    const resp = await confirmAlert(
      "Esta seguro que desea eliminar el usuario?"
    );
    if (resp) {
      await deleteCollection(Collection.Categories, id);
    }
  };

  const columns = columnsCategory({ openModal, deleteCategory });

  return (
    <>
      <Button type="primary" onClick={() => openModal("category", {})}>
        Nueva Categoria
      </Button>
      <Table dataSource={categories} columns={columns} />
      <FormCategory />
    </>
  );
};
