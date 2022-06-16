import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { createContext, useEffect, useReducer } from "react";
import { auth, db } from "../../config/firebase/firebase";
import { alert } from "../../helpers/alert";
import { TYPE_ALERT } from "../../helpers/error";
import { IUser } from "../../interfaces/IUser";
import { IUserApp } from "../../interfaces/IUserApp";
import { Collection } from "../firebase/FirebaseContext";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
  errorMessage: string;
  user: User | null;
  userApp: IUserApp | null;
  status: "checking" | "authenticated" | "not-authenticated";
  checking: boolean;
  sigIn: (data: IUser) => void;
  logout: () => void;
  registerUser: (data: IUser) => Promise<string>;
};

const authInitialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: "",
  checking: true,
  userApp: null,
};

export const AuthContext = createContext({} as AuthContextProps);

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        await promiseSigIn(user);
      } else {
        dispatch({
          type: "notAuthenticated",
        });
      }
    });
    unsuscribe();
  }, []);

  const promiseSigIn = async (user: User) => {
    dispatch({
      type: "signIn",
      payload: {
        user: user,
        userApp: (await getDocFirebase(user.uid, Collection.Users)) as IUserApp,
      },
    });
  };

  const sigIn = async ({ email, password }: IUser) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const result = await getDocFirebase(response.user.uid, Collection.Users);
      dispatch({
        type: "signIn",
        payload: {
          user: response.user,
          userApp: result as IUserApp,
        },
      });
    } catch (error) {
      dispatch({
        type: "notAuthenticated",
      });
      alert("Credenciales Incorrectas");
    }
  };

  const registerUser = async ({ email, password }: IUser): Promise<string> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Usuario creado correctamente", TYPE_ALERT.SUCCESS);
      return response.user.uid;
    } catch (error) {
      alert("El usuario posiblemente ya fue creado");
      return "";
    }
  };

  const logout = () => {
    signOut(auth);
    dispatch({
      type: "logout",
    });
  };

  const getDocFirebase = async (id: string, collectionDB: Collection) => {
    const q = query(
      collection(db, collectionDB),
      where("uid", "==", id),
      limit(1)
    );
    const result = await getDocs(query(q));
    const doc = result.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return doc[0];
  };

  return (
    <AuthContext.Provider value={{ ...state, sigIn, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
