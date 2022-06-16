import { createContext, useReducer } from "react";
import { modalReducer, ModalState } from "./ModalReducer";

interface ModalContextProps {
  open: boolean;
  modal: string | "";
  model: object;
  openModal: (modal: string, model: object) => void;
  closeModal: () => void;
}

const modalInitialState: ModalState = {
  open: false,
  modal: "",
  model: {},
};

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(modalReducer, modalInitialState);
  const openModal = (modal: string, model: object) => {
    dispatch({
      type: "open",
      payload: {
        modal,
        model,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: "close",
    });
  };
  return (
    <ModalContext.Provider
      value={{
        ...state,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
