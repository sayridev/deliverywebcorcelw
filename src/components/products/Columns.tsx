import { Button, Space, Image } from "antd";
import { IProduct } from "../../interfaces/IProduct";
interface Props {
  openModal: (modal: string, data: object) => void;
  deleteProduct: (value: string) => void;
}

export const columnsProduct = ({ openModal, deleteProduct }: Props) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Imagen",
    key: "image",
    render: (data: IProduct) => (
      <Image style={{ borderRadius: "5px" }} width={60} src={data.image} />
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (data: IProduct) => (
      <Space size="middle">
        <Button type="primary" onClick={() => openModal("product", data)}>
          Editar
        </Button>
        <Button type="primary" danger onClick={() => deleteProduct(data.id!)}>
          Eliminar
        </Button>
      </Space>
    ),
  },
];
