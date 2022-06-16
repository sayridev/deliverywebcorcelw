import { Button, Table, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { IProduct } from "../../interfaces/IProduct";
import { confirmAlert } from "../../helpers/alert";
import { FormProduct } from "./FormProduct";
import { Collection, FirebaseContext, ModalContext } from "../../context";
import { columnsProduct } from "./Columns";

export const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { openModal } = useContext(ModalContext);
  const { deleteCollection } = useContext(FirebaseContext);
  const [search, setSearch] = useState<string>("");
  let q = query(collection(db, Collection.Products));
  useEffect(() => {
    if (search !== "") {
      q = query(
        collection(db, Collection.Products),
        where("name", ">=", search),
        where("name", "<=", search + "\uf8ff")
      );
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IProduct),
          key: doc.id,
          id: doc.id,
        }))
      );
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const deleteProduct = async (id: string) => {
    const resp = await confirmAlert(
      "Esta seguro que desea eliminar el producto?"
    );
    if (resp) {
      await deleteCollection(Collection.Products, id);
    }
  };
  const columns = columnsProduct({ openModal, deleteProduct });
  return (
    <>
      <Input
        placeholder="Busque por nombre de producto"
        size="large"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "300px", marginRight: "65%", display: "inline-block" }}
      />
      <Button
        size="large"
        type="primary"
        onClick={() => openModal("product", {})}
      >
        Nuevo Producto
      </Button>
      <Table dataSource={products} columns={columns} />
      <FormProduct />
    </>
  );
};
