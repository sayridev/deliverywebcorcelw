import { Button, Space } from "antd";
import { IUserApp } from "../../interfaces/IUserApp";

interface Props {
  openModal: (modal: string, data: object) => void;
  deleteUser: (value: string) => void;
}

export const columnsDelivery = ({ openModal, deleteUser }: Props) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tipo de Usuario",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    key: "action",
    render: (data: IUserApp) => (
      <Space size="middle">
        <Button type="primary" onClick={() => openModal("delivery", data)}>
          Editar
        </Button>
        <Button type="primary" danger onClick={() => deleteUser(data.id)}>
          Eliminar
        </Button>
      </Space>
    ),
  },
];
