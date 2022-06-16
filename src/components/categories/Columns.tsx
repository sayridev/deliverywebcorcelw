import { Button, Space, Image } from "antd";
import { ICategory } from "../../interfaces/ICategory";
interface Props {
  openModal: (modal: string, data: object) => void;
  deleteCategory: (value: string) => void;
}
export const columnsCategory = ({ openModal, deleteCategory }: Props) => [
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
    title: "Imagen",
    key: "image",
    render: (data: ICategory) => (
      <Image
        preview={{ visible: false }}
        style={{ borderRadius: "5px" }}
        width={80}
        src={data.image}
      />
    ),
  },

  {
    title: "Action",
    key: "action",
    render: (data: ICategory) => (
      <Space size="middle">
        <Button type="primary" onClick={() => openModal("category", data)}>
          Editar
        </Button>
        <Button type="primary" danger onClick={() => deleteCategory(data.id!)}>
          Eliminar
        </Button>
      </Space>
    ),
  },
];
