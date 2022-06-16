import { IDetailOrder } from "../../interfaces/IOrder";
interface Props {
  detail: IDetailOrder;
}
export const CardProductDelivered = ({ detail }: Props) => {
  return (
    <div className="product">
      <div className="product__amount">
        <p className="title_amount">Cantidad:</p>
        <p className="amount">{detail.amount}</p>
      </div>
      <div className="product__food">
        <p className="title__food">{detail.product?.name}</p>
      </div>
    </div>
  );
};
