import { Button, Space } from "antd";
import { IStore } from "../../interfaces/IStore";
interface Props {
  openModal: (modal: string, data: object) => void;
  deleteStore: (value: string) => void;
}

export const columnsStore = ({ openModal, deleteStore }: Props) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Direccion",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (data: IStore) => (
      <Space size="middle">
        <Button type="primary" onClick={() => openModal("store", data)}>
          Editar
        </Button>
        <Button type="primary" danger onClick={() => deleteStore(data.id!)}>
          Eliminar
        </Button>
      </Space>
    ),
  },
];
