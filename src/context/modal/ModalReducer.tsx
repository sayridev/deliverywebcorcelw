export interface ModalState {
  open: boolean;
  modal: string;
  model: object;
}

type ModalAction =
  | { type: "close" }
  | { type: "open"; payload: { modal: string; model: object } };

export const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "close":
      return {
        ...state,
        open: false,
        model: {},
      };
    case "open":
      return {
        ...state,
        open: true,
        modal: action.payload.modal,
        model: action.payload.model,
      };

    default:
      return state;
  }
};
