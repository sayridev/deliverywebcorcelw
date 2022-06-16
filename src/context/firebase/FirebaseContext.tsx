import { createContext } from "react";
import { db, storage } from "../../config/firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { alert } from "../../helpers/alert";
import { TYPE_ALERT } from "../../helpers/error";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
interface FirebaseContextProps {
  createCollection: (collectionDB: Collection, data: object) => void;
  updateCollection: (
    collectionDB: Collection,
    data: object,
    id: string
  ) => void;
  deleteCollection: (collectionDB: Collection, id: string) => void;
  uploadFile: (file: File) => Promise<string>;
  getData: (collectionDB: Collection) => Promise<any>;
}

export enum Collection {
  Users = "users",
  Categories = "categories",
  Stores = "stores",
  Products = "products",
  Orders = "orders",
}

export const FirebaseContext = createContext({} as FirebaseContextProps);

export const FirebaseProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const createCollection = async (collectionDB: Collection, data: object) => {
    const collectionRef = collection(db, collectionDB);
    try {
      await addDoc(collectionRef, data);
      alert("Se creo correctamente el documento.", TYPE_ALERT.SUCCESS);
    } catch (error) {
      alert("Ocurrio un error desconocido");
    }
  };

  const updateCollection = async (
    collectionDB: Collection,
    data: object,
    id: string
  ) => {
    try {
      const collectionDoc = doc(db, collectionDB, id);
      const newFields = data;
      await updateDoc(collectionDoc, newFields);
      alert("Se actualizo correctamente el documento.", TYPE_ALERT.SUCCESS);
    } catch (error) {
      alert("Ocurrio un error desconocido");
    }
  };

  const deleteCollection = async (collectionDB: Collection, id: string) => {
    try {
      const collectionDoc = doc(db, collectionDB, id);
      await deleteDoc(collectionDoc);
      alert("Se elimino correctamente el documento.", TYPE_ALERT.SUCCESS);
    } catch (error) {
      alert("Ocurrio un error desconocido");
    }
  };

  const uploadFile = async (image: File) => {
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    const urlDescarga = await getDownloadURL(imageRef);
    return urlDescarga;
  };

  const getData = async (collectionDB: Collection) => {
    const itemsCollection = collection(db, collectionDB);
    const result = await getDocs(query(itemsCollection));
    return result.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  };
  return (
    <FirebaseContext.Provider
      value={{
        updateCollection,
        createCollection,
        deleteCollection,
        uploadFile,
        getData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
